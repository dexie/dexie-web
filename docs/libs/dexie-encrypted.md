---
layout: docs
title: 'dexie-encrypted'
---

Dexie-encrypted provides transparent encryption for IndexedDB using [Dexie.js](https://dexie.org/). It encrypts sensitive data while keeping indices searchable, ensuring your application's performance isn't compromised.

## Installation

**For Dexie 4.x projects** (recommended):

```bash
npm install dexie-encrypted@beta
```

This installs `dexie-encrypted@4.2.0-beta.1` which supports both Dexie 3.x and 4.x.

**For Dexie 3.x projects**:

```bash
npm install dexie-encrypted@2.0.0
```

## Basic Usage

```typescript
import Dexie from 'dexie';
import { applyEncryptionMiddleware } from 'dexie-encrypted';

const db = new Dexie('MyDatabase');

// Apply encryption middleware before defining schema
applyEncryptionMiddleware(db, symmetricKey, {
  friends: encrypt.NON_INDEXED_FIELDS,
});

// Bump version when first adding encryption
db.version(2).stores({
  friends: '++id, name, age',
});

await db.open();

const friend = {
  name: 'Alice',
  age: 25,
  street: 'East 13th Street', // Will be encrypted
  picture: 'alice.png',       // Will be encrypted
};

// Only non-indexed fields (street, picture) get encrypted
// Indexed fields (id, name, age) remain searchable
await db.friends.add(friend);
```

## Configuration Options

### Table-Level Configuration

Dexie-encrypted encrypts only the tables you specify. You can configure encryption at different levels:

#### `encrypt.NON_INDEXED_FIELDS`
Encrypts all data except indexed properties:

```typescript
applyEncryptionMiddleware(db, symmetricKey, {
  users: encrypt.NON_INDEXED_FIELDS,
});
```

#### `encrypt.UNENCRYPTED_LIST`
Encrypts all data except indices and specified fields:

```typescript
applyEncryptionMiddleware(db, symmetricKey, {
  friends: {
    type: encrypt.UNENCRYPTED_LIST,
    fields: ['street', 'picture'], // These fields + indices will be plain text
  },
});
```

#### `encrypt.ENCRYPT_LIST`
Encrypts only the specified fields:

```typescript
applyEncryptionMiddleware(db, symmetricKey, {
  enemies: {
    type: encrypt.ENCRYPT_LIST,
    fields: ['picture', 'secretPlan'], // Only these fields get encrypted
  },
});
```

## API Reference

### applyEncryptionMiddleware

```typescript
applyEncryptionMiddleware(db, key, config, onKeyChange?)
```

**Parameters:**

- **`db`** - A Dexie database that has not had `.version()` called yet
- **`key`** - A `Uint8Array` of length 32, or a Promise that resolves to one
- **`config`** - Table-level configuration object
- **`onKeyChange(db): Promise`** - Optional callback when the database cannot be decrypted

**Key Error Utilities:**

- **`clearAllTables(db): Promise`** - Clears all data from the database
- **`clearEncryptedTables(db): Promise`** - Clears only encrypted tables

## Custom Encryption Methods

You can use your own encryption algorithms instead of the default tweetnacl:

```typescript
import { applyMiddlewareWithCustomEncryption } from 'dexie-encrypted/dist/applyMiddleware';

applyMiddlewareWithCustomEncryption({
  db,
  encryptionKey,
  tableSettings,
  encrypt: myCustomEncryptionMethod,
  decrypt: myCustomDecryptionMethod,
  onKeyChange,
});
```

**Custom Method Signatures:**

```typescript
// Encrypt: receives object with fields to encrypt
function myCustomEncryptionMethod(key: Uint8Array, object: any): Uint8Array

// Decrypt: receives encrypted data, returns decrypted object
function myCustomDecryptionMethod(key: Uint8Array, encryptedData: Uint8Array): any
```

## Key Management

**⚠️ Security Warning:** Never store encryption keys in localStorage, cookies, or any unencrypted local storage.

### Recommended Strategies

#### Backend-Generated Keys
The most secure approach:

```typescript
// Fetch key from your authenticated backend
const encryptionKey = await fetch('/api/encryption-key', {
  headers: { 'Authorization': `Bearer ${accessToken}` }
}).then(res => res.arrayBuffer()).then(buf => new Uint8Array(buf));

applyEncryptionMiddleware(db, encryptionKey, config);
```

#### Password-Derived Keys
For offline scenarios:

```typescript
// Derive key from user password (use a proper key derivation function)
import { deriveKey } from 'your-crypto-utils';

const encryptionKey = await deriveKey(userPassword, salt);
applyEncryptionMiddleware(db, encryptionKey, config);
```

## Using with Dexie Cloud

Dexie-encrypted works with [Dexie Cloud](../cloud/) but requires special configuration to ensure data remains encrypted during sync.

### Step 1: Basic Configuration

```typescript
import Dexie from 'dexie';
import dexieCloud from 'dexie-cloud-addon';
import { applyEncryptionMiddleware } from 'dexie-encrypted';

const db = new Dexie('MyCloudDB', { addons: [dexieCloud] });

// Apply encryption first
applyEncryptionMiddleware(db, encryptionKey, {
  messages: encrypt.NON_INDEXED_FIELDS,
});

// Configure Dexie Cloud
db.cloud.configure({
  databaseUrl: 'https://your-db.dexie.cloud',
  // IMPORTANT: Exclude encryption settings from sync
  unsyncedTables: ['_encryptionSettings'],
});

db.version(1).stores({
  messages: '@id, title, category',
});
```

### Step 2: Reorder Encryption Middleware

To ensure data remains encrypted in the cloud, you must reorder the encryption middleware to run **above** the sync layer:

```typescript
function reorderDexieEncrypted(db: Dexie) {
  // @ts-ignore
  const mw = db._middlewares.dbcore.find(mw => mw.name === 'encryption');
  if (!mw) throw new Error("Dexie encrypted not applied");
  
  db.use({
    name: "encryption",
    stack: "dbcore",
    level: 2,  // Above sync layer (level 1)
    create: mw.create
  });
}

// Call AFTER applying encryption middleware
applyEncryptionMiddleware(db, encryptionKey, config);
reorderDexieEncrypted(db);

// Now configure Dexie Cloud
db.cloud.configure({ /* ... */ });
```

### Complete Dexie Cloud Example

```typescript
import Dexie from 'dexie';
import dexieCloud from 'dexie-cloud-addon';
import { applyEncryptionMiddleware, encrypt } from 'dexie-encrypted';

const db = new Dexie('SecureCloudApp', { addons: [dexieCloud] });

// Apply encryption
applyEncryptionMiddleware(db, encryptionKey, {
  messages: encrypt.NON_INDEXED_FIELDS,
  documents: {
    type: encrypt.ENCRYPT_LIST,
    fields: ['content', 'metadata']
  }
});

// Reorder encryption to run above sync
function reorderDexieEncrypted(db: Dexie) {
  // @ts-ignore
  const mw = db._middlewares.dbcore.find(mw => mw.name === 'encryption');
  if (!mw) throw new Error("Dexie encrypted not applied");
  
  db.use({
    name: "encryption",
    stack: "dbcore",
    level: 2,
    create: mw.create
  });
}

reorderDexieEncrypted(db);

// Configure Dexie Cloud
db.cloud.configure({
  databaseUrl: 'https://your-app.dexie.cloud',
  unsyncedTables: ['_encryptionSettings'],
  tryUseServiceWorker: false, // Recommended for encryption
});

db.version(1).stores({
  messages: '@id, title, category',
  documents: '@id, title, type'
});

await db.open();
```

## Important Notes

- **Indices cannot be encrypted** - Encryption would make them unsearchable
- **Object shapes are preserved** - Encrypted strings become empty strings, numbers become 0, booleans become false (optimization for browser performance)
- **Tables not in your configuration remain unencrypted**
- **TweetnaCl is used by default** - Often faster than WebCrypto API
- **Service workers may have issues** - Consider setting `tryUseServiceWorker: false` in Dexie Cloud configuration

## Version Compatibility

| dexie-encrypted | Dexie Support | Status |
|-----------------|---------------|---------|
| 4.2.0-beta.1    | 3.x, 4.x     | ✅ Recommended for new projects |
| 2.0.0           | 3.x only     | Stable (legacy) |

## Migration Notes

When upgrading your encryption configuration, dexie-encrypted will trigger the `onKeyChanged` callback. Use this opportunity to clear existing data or migrate to new encryption settings.

## Links

- [GitHub Repository](https://github.com/dexie/dexie-encrypted)
- [Dexie Cloud Configuration](../cloud/db.cloud.configure())
- [Working Example with Dexie Cloud](https://github.com/dfahlander/poc-dexie-cloud-encryption)