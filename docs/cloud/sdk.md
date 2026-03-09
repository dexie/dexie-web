---
layout: docs-dexie-cloud
title: 'Dexie Cloud SDK'
---

# Dexie Cloud SDK

The **Dexie Cloud SDK** (`dexie-cloud-sdk`) is a lightweight TypeScript/JavaScript client for interacting with Dexie Cloud services programmatically — without Dexie.js or IndexedDB.

Use it for:

- **Server-side applications** (Node.js, Deno, edge functions)
- **CLI tools and scripts**
- **Admin dashboards**
- **Data migration and import/export**
- **Any environment** where you need REST API access to Dexie Cloud data

## Installation

```bash
npm install dexie-cloud-sdk
```

## Quick Start

```ts
import { DexieCloudClient } from 'dexie-cloud-sdk';

// Initialize client
const client = new DexieCloudClient({
  serviceUrl: 'https://dexie.cloud',
  dbUrl: 'https://xxxxxxxx.dexie.cloud'
});

// Authenticate
const { accessToken } = await client.auth.authenticateWithOTP(
  'user@example.com',
  async () => prompt('Enter OTP: '),
  ['ACCESS_DB']
);

// CRUD operations
const items = await client.data.list('todoItems', accessToken);
const item = await client.data.create('todoItems', {
  title: 'Buy milk',
  done: false
}, accessToken);
```

## Configuration

```ts
const client = new DexieCloudClient({
  serviceUrl: 'https://dexie.cloud',     // Required: Dexie Cloud service URL
  dbUrl: 'https://xxx.dexie.cloud',      // Required for data operations
  blobHandling: 'auto',                   // 'auto' (default) | 'lazy'
  timeout: 30000,                         // Request timeout (ms)
  debug: false                            // Enable debug logging
});
```

### Blob Handling Modes

| Mode | Behavior |
|------|----------|
| `auto` (default) | Binary data is automatically uploaded as blobs on write, and BlobRefs are resolved to data on read |
| `lazy` | Write works like auto, but read returns BlobRef metadata. Call `client.blobs.download(ref)` explicitly |

## Authentication

```ts
// OTP-based authentication
const { accessToken } = await client.auth.authenticateWithOTP(
  'user@example.com',
  async () => {
    // Get OTP from email
    return readline.question('Enter OTP: ');
  },
  ['ACCESS_DB']  // Requested scopes
);

// Token refresh
const { accessToken: newToken } = await client.auth.refresh(refreshToken);
```

## Data Operations

All data operations use [TSON](/cloud/docs/tson) serialization, preserving rich types like Date, Map, Set, and binary data.

### Read

```ts
// List all items in a table
const items = await client.data.list('todoItems', accessToken);

// Get single item by ID
const item = await client.data.get('todoItems', 'item-123', accessToken);

// Filter by realm
const realmItems = await client.data.list('todoItems', accessToken, {
  realm: 'rlm-my-realm'
});
```

### Write

```ts
// Create
const newItem = await client.data.create('todoItems', {
  title: 'Buy milk',
  done: false
}, accessToken);

// Update
await client.data.update('todoItems', 'item-123', {
  done: true
}, accessToken);

// Delete
await client.data.delete('todoItems', 'item-123', accessToken);

// Bulk create
const items = await client.data.bulkCreate('todoItems', [
  { title: 'Task 1', done: false },
  { title: 'Task 2', done: false }
], accessToken);
```

### Binary Data

With `blobHandling: 'auto'` (default), binary data is handled transparently:

```ts
// Write — binary data is uploaded to blob storage automatically
await client.data.create('photos', {
  title: 'Sunset',
  image: new Uint8Array(imageData)  // Uploaded as blob
}, accessToken);

// Read — BlobRefs are resolved to real data automatically
const photo = await client.data.get('photos', 'photo-123', accessToken);
console.log(photo.image);  // Uint8Array with actual data
```

With `blobHandling: 'lazy'`:

```ts
const client = new DexieCloudClient({
  serviceUrl: 'https://dexie.cloud',
  dbUrl: 'https://xxx.dexie.cloud',
  blobHandling: 'lazy'
});

// Read returns BlobRef metadata
const photo = await client.data.get('photos', 'photo-123', accessToken);
console.log(photo.image);
// { _bt: 'Uint8Array', ref: '1:abc123', size: 524288 }

// Download explicitly when needed
const blob = await client.blobs.download(photo.image.ref, accessToken);
console.log(blob.data);  // Uint8Array
```

## Blob Operations

Direct blob management:

```ts
// Upload a blob
const ref = await client.blobs.upload(
  new Uint8Array([1, 2, 3]),
  accessToken,
  'application/octet-stream'
);

// Download a blob
const { data, contentType } = await client.blobs.download(ref, accessToken);
```

## Health Check

```ts
// Quick check
const isReady = await client.isReady();

// Detailed status
const status = await client.getStatus();
console.log(status.healthy, status.ready);

// Wait for service
await client.waitForReady(30000);  // 30s timeout
```

## TSON Support

The SDK uses [TSON](https://github.com/niclas-nickleback/tson) (Typed JSON) for all data serialization. This means rich JavaScript types survive round-trips:

```ts
// These types are preserved automatically:
await client.data.create('events', {
  name: 'Meeting',
  date: new Date(),           // Date object — not a string
  attendees: new Set(['A']),  // Set — not an array
  metadata: new Map([         // Map — not an object
    ['key', 'value']
  ]),
  bigNumber: 123456789n       // BigInt
}, accessToken);
```

## Error Handling

```ts
import { DexieCloudError, DexieCloudAuthError } from 'dexie-cloud-sdk';

try {
  await client.data.get('items', 'id', token);
} catch (error) {
  if (error instanceof DexieCloudAuthError) {
    // Authentication failed — refresh token or re-authenticate
  } else if (error instanceof DexieCloudError) {
    console.log(error.status);   // HTTP status code
    console.log(error.message);  // Error description
  }
}
```

## See Also

- [Blob Offloading](/cloud/docs/blob-offloading) — how binary data is managed
- [REST API](/cloud/docs/rest-api) — raw REST API reference
- [Access Control](/cloud/docs/access-control) — realm-based security
- [TSON](/cloud/docs/tson) — typed JSON serialization
