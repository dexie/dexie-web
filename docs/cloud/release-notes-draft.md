# Dexie Cloud Server — Release Notes (Draft)

## What's New

### 🗄️ Blob Storage & Offloading

Dexie Cloud now supports **blob offloading** — large binary data (images, files, videos) is automatically stored in dedicated blob storage instead of inline in the database.

**Key features:**

- **PostgreSQL-based blob storage** with support for S3-compatible backends
- **Versioned storage backends** — migrate between storage providers without downtime
- **Automatic garbage collection** — unreferenced blobs are cleaned up after a grace period
- **Realm-based access control** — blob downloads are authorized through the same access control system as regular data

**How it works:**

When clients sync objects containing binary data, the server:
1. Stores the binary payload in blob storage
2. Replaces the inline data with a lightweight BlobRef
3. Tracks blob-to-realm relationships in `blob_refs` for access control and GC
4. Serves blobs through authenticated download endpoints

**Endpoints:**
- `PUT /blob/:blobId` — Upload blob data
- `GET /blob/:ref` — Download blob (with realm access check)

### 📤 Streaming Export/Import

Export and import large databases without running out of memory:

- **Export**: PostgreSQL cursors stream data in batches of 500 rows
- **Import**: SAX-style JSON parsing processes data without loading the entire file
- **BlobRef expansion**: Export automatically converts BlobRefs to inline base64 for self-contained files
- **Y.js support**: Dedicated endpoints for Y.js document export/import

**Endpoints:**
- `GET /export/stream` — Streaming JSON export
- `POST /import/stream` — Streaming JSON import

### 🔔 REST API Realm Notifications

When adding or removing members via the REST API, realm change notifications are now sent to connected clients via WebSocket. Previously, only the sync flow triggered these notifications.

### 🏗️ Architecture & Reliability

- **blob_refs tracking**: Insert, update, and delete operations in the sync flow now maintain the `blob_refs` table within the same SQL transaction
- **Prepack hooks**: Package builds are automatically triggered before pack/publish, ensuring CI always tests against built artifacts
- **Type safety**: Added `pg-cursor` type declaration

## Migration

The server automatically creates the `blob_refs` table on first database creation. For existing databases, the migration runs automatically when a database is accessed after upgrade.

## Configuration

Blob storage is configured via `blob-storage.json`:

```json
{
  "provider": "postgresql",
  "version": 1
}
```

See `blob-storage.example.json` and `blob-storage.s3.example.json` for configuration templates.

---

# Dexie.js — Release Notes (Draft)

## What's New

### 🗄️ Client-Side Blob Offloading

The `dexie-cloud-addon` now supports automatic blob offloading:

- **Transparent**: Store Blob, File, Uint8Array, ArrayBuffer, etc. — offloading happens automatically on sync
- **Lazy resolution**: BlobRefs are resolved to real data only when accessed
- **Eager download**: Background download of blobs after sync (up to 6 parallel)
- **Progress tracking**: Subscribe to upload/download progress via `blobProgress`

```ts
import { blobProgress } from 'dexie-cloud-addon';

// Store binary data — offloaded automatically
await db.photos.add({
  title: 'Sunset',
  image: file  // Blob/File object
});

// Track progress
blobProgress.subscribe(p => {
  if (p) console.log(`${p.phase}: ${p.loaded}/${p.total}`);
});
```

### 🔧 BlobRef Format

Binary properties are replaced with lightweight references:

```ts
{
  _bt: "Blob",           // Original type
  ref: "1:abc123",       // Storage reference
  size: 524288,          // Size in bytes
  ct: "image/jpeg"       // Content type
}
```

Objects containing BlobRefs are marked with `_hasBlobRefs: 1` for quick detection.

### TSON Improvements

- TSON is now fully transparent to BlobRefs — no special type definitions needed
- Simplified type definitions: removed blob-ref-aware variants
- `$t` convention renamed to `_bt` for BlobRefs (avoids confusion with TSON's own `$t`)

### Other Changes

- `get-object-diff`: Special-cases BlobRefs (same ref = no diff)
- Prepack hooks added to workspace packages (dexie, dexie-cloud, y-dexie)

## Docs

- [Blob Offloading Guide](https://dexie.org/cloud/docs/blob-offloading)
- [SDK Documentation](https://dexie.org/cloud/docs/sdk)
