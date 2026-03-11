---
layout: docs-dexie-cloud
title: 'Blob Offloading'
---

# Blob Offloading

Dexie Cloud supports **blob offloading** — automatically moving large binary data (images, files, videos) from IndexedDB to server-side blob storage. This keeps your local database small and fast while still allowing seamless access to binary data.

## How It Works

When you store binary data (Blob, Uint8Array, ArrayBuffer, etc.) in a Dexie Cloud table, the sync engine automatically:

1. **Uploads** the binary data to blob storage on the server
2. **Replaces** the original data with a lightweight **BlobRef** (a small reference object)
3. **Resolves** BlobRefs back to real data when you read the object

This happens transparently — your application code doesn't need to change.

## Quick Start

```ts
import Dexie from 'dexie';
import dexieCloud from 'dexie-cloud-addon';

const db = new Dexie('mydb', { addons: [dexieCloud] });

db.version(1).stores({
  photos: '@id, title, date'
});

db.cloud.configure({
  databaseUrl: 'https://xxxxxxxx.dexie.cloud',
  requireAuth: true
});

// Store a photo with binary data — offloading happens automatically on sync
const file = document.querySelector('input[type=file]').files[0];
await db.photos.add({
  title: 'My Photo',
  date: new Date(),
  image: file  // Blob — will be offloaded to blob storage
});
```

## What Gets Offloaded

**Blob and File objects** are always offloaded to blob storage during sync, regardless of size. This ensures they are never stored inline in IndexedDB, avoiding issues with synchronous blob reading in service workers.

**ArrayBuffer and typed arrays** (Uint8Array, etc.) are offloaded when they are **4 KB or larger**. Smaller binary buffers are kept inline.

| Type | Offloading Rule |
|------|----------------|
| `Blob` | Always offloaded |
| `File` | Always offloaded |
| `ArrayBuffer` | ≥ 4 KB |
| `Uint8Array`, `Int8Array`, etc. | ≥ 4 KB |
| `DataView` | ≥ 4 KB |

> **Why always offload Blob/File?** Storing Blob objects inline in IndexedDB requires synchronous reading via `XMLHttpRequest` during sync, which is not available in service worker contexts. By always offloading, Dexie Cloud avoids this limitation entirely.

## BlobRef — The Reference Object

After offloading, binary properties are replaced with a **BlobRef**:

```ts
// Before sync (local):
{ title: "Photo", image: Blob(524288) }

// After sync (stored):
{
  title: "Photo",
  image: {
    _bt: "Blob",          // Original type
    ref: "1:abc123def",    // Storage reference
    size: 524288,          // Original size in bytes
    ct: "image/jpeg"       // Content type (Blob only)
  },
  _hasBlobRefs: 1          // Marker for quick detection
}
```

## Lazy Resolution

By default, BlobRefs are resolved **lazily** — the actual binary data is downloaded when you access the object. This means:

- **List views** are fast — BlobRefs are small metadata objects
- **Detail views** trigger downloads — when you actually need the data
- **Offline access** — previously downloaded blobs are cached in IndexedDB

### Eager Download

You can also eagerly download blobs in the background after sync:

```ts
db.cloud.configure({
  databaseUrl: 'https://xxxxxxxx.dexie.cloud',
  // Blobs are downloaded eagerly in the background after sync
  // Up to 6 parallel downloads
});
```

## Progress Tracking

Track upload and download progress:

```ts
import { blobProgress } from 'dexie-cloud-addon';

// Subscribe to progress updates
blobProgress.subscribe(progress => {
  if (progress) {
    console.log(`${progress.phase}: ${progress.loaded}/${progress.total} bytes`);
    // phase: 'upload' | 'download'
  }
});
```

## Architecture

```
┌─────────────────┐
│   Application   │
│  (Blob/File)    │
└────────┬────────┘
         │ store
┌────────▼────────┐
│    IndexedDB    │
│  (local cache)  │
└────────┬────────┘
         │ sync
┌────────▼────────┐    ┌──────────────┐
│  Dexie Cloud    │───▶│ Blob Storage │
│    Server       │    │ (PostgreSQL  │
│                 │    │  or S3)      │
└─────────────────┘    └──────────────┘
```

### Server-Side Storage

Blobs are stored in PostgreSQL (default) or S3-compatible storage. The server supports **versioned storage backends**, allowing migration between storage providers without downtime.

### Access Control

Blob access is controlled through the same realm-based system as regular data:

- Upload requires authentication
- Download checks that the user has access to a realm that references the blob
- When objects are deleted, their blob references are soft-deleted for garbage collection

### Garbage Collection

The server runs automatic garbage collection:

1. **Soft delete**: When an object's blob reference is removed, it's marked for deletion
2. **Grace period**: Soft-deleted references are kept for 1 hour (handles sync race conditions)
3. **Cleanup**: After the grace period, unreferenced blobs are permanently deleted

## Export / Import

When exporting a database with `dexie-cloud export`, BlobRefs are automatically expanded to inline base64 data. This makes exports self-contained — you can import them to any Dexie Cloud instance.

```bash
# Export (BlobRefs → inline base64)
npx dexie-cloud export my-database.json

# Import (inline base64 → uploaded as blobs)
npx dexie-cloud import my-database.json
```

## Limitations

- No resumable uploads yet — very large uploads may fail on unreliable connections

## See Also

- [REST API](/cloud/docs/rest-api) — programmatic blob upload/download
- [Access Control](/cloud/docs/access-control) — realm-based security
- [Best Practices](/cloud/docs/best-practices) — general Dexie Cloud guidelines
