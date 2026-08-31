---
layout: docs-dexie-cloud
title: 'Dexie Cloud Documentation'
description: Complete documentation for Dexie Cloud - sync, authentication, access control, and real-time collaboration for Dexie.js applications.
---

**Dexie Cloud** is an optional cloud service for Dexie.js that adds sync, authentication, access control, and real-time collaboration to your offline-first applications.

🤖 **AI/LLM?** For a structured documentation summary optimized for AI assistants, see [llms.txt](/llms.txt).

---

## Getting Started

- **[Get started with Dexie Cloud](/docs/Tutorial/Dexie-Cloud)** — Step-by-step guide to add sync
- **[Quickstart](/docs/cloud/quickstart)** — Fastest path to a syncing app
- **[Best Practices](/docs/cloud/best-practices)** — Including [primary keys](/docs/cloud/best-practices#primary-keys)

### Example Applications

- **[Dexie Cloud To-do App](https://github.com/dexie/Dexie.js/tree/master/samples/dexie-cloud-todo-app)** — Full PWA with sharing (Vite + React)
- **[Dexie Cloud Starter (Next.js)](https://github.com/dexie/dexie-cloud-starter)** — Next.js app with Y.js integration

---

## Core Concepts

### Authentication

- **[Authentication Overview](/docs/cloud/authentication)** — Login flows, OAuth, OTP
- **[db.cloud.login()](/docs/cloud/db.cloud.login())** — Trigger login
- **[db.cloud.logout()](/docs/cloud/db.cloud.logout())** — Logout current user
- **[db.cloud.currentUser](/docs/cloud/db.cloud.currentUser)** — Get logged-in user info
- **[Add Demo Users](/docs/cloud/add-demo-users)** — Test without real emails

### Access Control

- **[Access Control Overview](/docs/cloud/access-control)** — Realms, roles, permissions
- **[Realms](/docs/cloud/Realm)** — Isolated data compartments
- **[Roles](/docs/cloud/Role)** — Permission sets for users
- **[Members](/docs/cloud/Member)** — Users with access to realms
- **[DBPermissionSet](/docs/cloud/DBPermissionSet)** — Permission definitions
- **[db.cloud.permissions()](/docs/cloud/db.cloud.permissions())** — Check permissions on objects

### Sync & Consistency

- **[Consistency Models](/docs/cloud/consistency)** — Server-authoritative vs CRDT
- **[db.cloud.sync()](/docs/cloud/db.cloud.sync())** — Force a sync
- **[SyncState](/docs/cloud/SyncState)** — Current sync status
- **[db.cloud.syncState](/docs/cloud/db.cloud.syncState)** — Observable sync state

### Y.js Integration (Real-time Collaboration)

- **[Y.js with Dexie](/docs/Y.js/Y.js)** — Overview of Y.js integration
- **[y-dexie](/docs/Y.js/y-dexie)** — Store Y.Doc in Dexie tables

---

## Client-side API

### Configuration

- **[dexie-cloud-addon](/docs/cloud/dexie-cloud-addon)** — The addon package
- **[db.cloud.configure()](/docs/cloud/db.cloud.configure())** — Configure cloud connection
- **[DexieCloudOptions](/docs/cloud/DexieCloudOptions)** — Configuration options

### Tables

- **[db.members](/docs/cloud/db.members)** — Members table
- **[db.realms](/docs/cloud/db.realms)** — Realms table
- **[db.roles](/docs/cloud/db.roles)** — Roles table

### Observables

- **[db.cloud.currentUser](/docs/cloud/db.cloud.currentUser)** — Current user observable
- **[db.cloud.syncState](/docs/cloud/db.cloud.syncState)** — Sync state observable
- **[db.cloud.invites](/docs/cloud/db.cloud.invites)** — Pending invites observable
- **[db.cloud.webSocketStatus](/docs/cloud/db.cloud.webSocketStatus)** — WebSocket connection status

---

## Server-side & Infrastructure

- **[REST API](/docs/cloud/rest-api)** — Server-to-server integration
- **[Web Hooks](/docs/cloud/web-hooks)** — Event notifications
- **[CLI](/docs/cloud/cli)** — Command-line interface
- **[API Limits](/docs/cloud/limits)** — Rate limits and quotas
- **[Sharding & Scalability](/docs/cloud/scaling)** — Architecture for scale
- **[Self-hosted (Premium)](/docs/cloud/premium-software)** — Run on your own servers

---

## Compliance & Privacy

- **[GDPR Compliance](/docs/cloud/gdpr-compliance)** — Data protection, user rights, and compliance guidance

---

## Additional Topics

- **[Custom Emails](/docs/cloud/custom-emails)** — Customize email templates
- **[Add Public Data](/docs/cloud/add-public-data)** — Data visible to all users
- **[Browser Extensions](/docs/cloud/browser-extensions)** — Using Dexie Cloud in Chrome / Manifest V3 extensions

---

_Have questions? Ask on [Stack Overflow](https://stackoverflow.com/questions/ask?tags=dexie) or [Discord](https://discord.gg/huhre7MHBF)._
