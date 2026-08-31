---
layout: docs-dexie-cloud
title: 'Dexie Cloud in Browser Extensions'
description: How to use Dexie Cloud inside a Chrome / Manifest V3 browser extension - whitelisting, multi-context setup, and paid-tier enforcement.
---

Dexie Cloud works well inside browser extensions, including Manifest V3 (MV3) Chrome extensions with a non-persistent background service worker, a popup, and one or more full extension pages (e.g. a dashboard/options page). This page covers the parts that are specific to running inside an extension rather than a regular web app or PWA.

## Whitelisting your extension origin

Extension pages have an origin of the form `chrome-extension://<extension-id>`. This is an officially supported origin pattern for Dexie Cloud - it does not require `--force`:

```
npx dexie-cloud whitelist chrome-extension://<your-extension-id>
```

The Dexie Cloud server validates whitelist origins against an allow-list of patterns that includes `https://`, `http://localhost:<port>`, `capacitor://`, `ionic://`, `chrome-extension://`, and `app:<name>`. A `chrome-extension://` origin whitelisted this way is treated identically to any other origin for CORS purposes - there is no fallback or "incidental" behavior involved.

Since your extension ID is fixed (as long as you keep the same key/publish through the same listing), the whitelisted origin is stable across releases.

## Using the same db module from every context

An MV3 extension typically has several separate JavaScript execution contexts that may all want access to the database:

- the background service worker
- the popup
- one or more full extension pages (options/dashboard)

The recommended pattern is the same as for web workers: import the exact same db module, with the exact same `db.cloud.configure()` call, from every context that needs it. Don't centralize sync initialization in a single "main" page and strip cloud config from the others - each context that opens the database should configure Dexie Cloud identically.

```ts
// db.ts - imported identically from background.ts, popup.ts, and dashboard.ts
import Dexie from 'dexie'
import dexieCloud from 'dexie-cloud-addon'

export const db = new Dexie('myExtensionDB', { addons: [dexieCloud] })
db.version(1).stores({
  items: '@id',
})
db.cloud.configure({
  databaseUrl: 'https://your-db.dexie.cloud',
  requireAuth: true,
})
```

Each context that opens the db this way runs its own independent sync worker and observes/pushes changes on its own. This is expected and safe - Dexie Cloud does not require a single elected "owner" context.

## Background service worker termination and pending writes

MV3 background service workers are intentionally non-persistent - Chrome may terminate one at any time while it's idle, including shortly after it finishes handling an event. This is normal Chrome behavior, not something specific to Dexie Cloud, and Dexie Cloud is designed to tolerate it:

- Writes are recorded in Dexie's local mutation log immediately, synchronously with the transaction. They do not depend on the writing context staying alive to be persisted locally.
- When any context (background worker, popup, or dashboard) calls `db.open()`, Dexie Cloud starts a sync worker for that context and triggers a push sync as part of startup.

This means that if the background service worker writes a record and is then terminated before it manages to sync, the pending change is not lost - it will be picked up and pushed automatically the next time **any** context (including a subsequent wake of the background worker itself, the popup, or the dashboard) opens the database. You do not need to manually call [db.cloud.sync()](<db.cloud.sync()>) after background writes for correctness. Calling it explicitly from the dashboard/popup on open is a reasonable, purely optional way to make sync happen at the earliest possible moment rather than waiting for the normal trigger, but it isn't required.

One practical implication: don't design background logic around the assumption that a `db.cloud.sync.on('statuschange')` subscription (or similar) will keep firing continuously forever in the background context. It will pause whenever the service worker is asleep, and pick back up when the worker wakes - same as any other in-memory state in a non-persistent service worker.

## CSP and permissions

Dexie Cloud sync uses standard HTTPS `fetch`/WebSocket calls to your `*.dexie.cloud` database URL. We have not needed to document extension-specific `host_permissions` or CSP requirements because Dexie Cloud has no server-push mechanism outside of that - if your extension's manifest and CSP already allow it to make network requests from its own pages, no additional Dexie-specific permission is required for that to keep working today.

That said, if you have a restrictive CSP or want to be explicit, adding your database's origin to `connect-src` (and/or `host_permissions` if you rely on it for other reasons) is a reasonable defensive step:

```json
{
  "host_permissions": ["https://*.dexie.cloud/*"]
}
```

## Enforcing a paid sync tier

A common pattern for extensions that offer cloud sync as a paid upgrade over free local-only usage:

1. Users authenticate with Dexie Cloud's built-in OTP (email) login from within the extension.
2. Your backend (server-side only, never in the extension) holds a `dexie-cloud.key` API client credential and listens for billing webhooks (e.g. from Stripe).
3. On a successful subscription, the backend calls the [REST API](rest-api) `/users` endpoint to set the user's `type` to `"prod"`.
4. On cancellation or lapse, the backend deactivates the user (rather than deleting them), so they retain their data and can be reactivated without data loss if they resubscribe.

This is the same mechanism Dexie Cloud's own paid tiers use internally, and is the recommended approach when you're already using native OTP login. The [`fetchTokens`](DexieCloudOptions#fetchtokens) custom-auth callback is only needed if you want to replace Dexie Cloud's built-in authentication with your own external identity provider - it is not required just to gate a paid feature.

Never ship your `dexie-cloud.key` API client secret inside the extension bundle - it must stay server-side.
