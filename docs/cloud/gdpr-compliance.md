---
layout: docs-dexie-cloud
title: 'GDPR Compliance'
---

Dexie Cloud can be used to store personal data in compliance with GDPR. This page describes how data is stored, what tools are available for fulfilling data subject rights, and how GDPR roles typically apply.

## Deployment Options

### Dexie Cloud (Hosted Service)

| Aspect | Details |
|---|---|
| **Data storage** | Azure-managed PostgreSQL (DBaaS), US East region |
| **Encryption in transit** | HTTPS/TLS for all client–server and database connections |
| **GDPR roles** | You (app provider) = **data controller**; Dexie Cloud = **data processor** |
| **International transfer** | Covered by the EU-US Data Privacy Framework (DPF) and Azure's Standard Contractual Clauses (SCCs). See [International Data Transfers](#international-data-transfers) below. |

### Dexie Cloud On-Premise (Self-hosted)

With the [self-hosted (premium)](/docs/cloud/premium-software) version you run Dexie Cloud yourself:

- **You choose** the hosting environment, geographic location, and PostgreSQL server (e.g. EU-based infrastructure).
- **Full control** over where data is stored and how it is managed — simplifying compliance for organizations with strict data-residency requirements.
- In this setup Dexie Cloud is software you operate, rather than a hosted processing service.

## International Data Transfers

Since the hosted version of Dexie Cloud stores data in the US, GDPR rules for transfers to "third countries" apply. Two legal mechanisms cover this:

### EU-US Data Privacy Framework (DPF)

The [EU-US Data Privacy Framework](https://www.dataprivacyframework.gov/) is an adequacy decision adopted by the European Commission in July 2023. Organizations certified under the DPF may receive personal data from the EU without additional transfer mechanisms. **Microsoft (Azure) is certified under the DPF**, which provides the primary legal basis for data transfers in Dexie Cloud's hosted service.

### Standard Contractual Clauses (SCCs)

Azure's service agreements include EU Commission-approved [Standard Contractual Clauses](https://learn.microsoft.com/en-us/compliance/regulatory/offering-eu-model-clauses). These pre-approved contract terms serve as an additional safeguard and would continue to protect data transfers if the DPF were ever invalidated (as happened with its predecessor, Privacy Shield, in 2020).

### Your Responsibilities as Data Controller

While the transfer mechanisms above cover the Dexie Cloud infrastructure, you as the data controller still need to:

- Maintain a **privacy policy** informing your end users that data may be processed in the US.
- Keep a **record of processing activities** (Article 30 ROPA).
- Conduct a **Transfer Impact Assessment (TIA)** if required by your DPA or local supervisory authority.

If EU data residency is a hard requirement, consider the [self-hosted option](/docs/cloud/premium-software) where you control the hosting location.

## Data Subject Rights

GDPR grants individuals the right to access, rectify, and delete their personal data. Dexie Cloud provides built-in support for these rights through its [REST API](/docs/cloud/rest-api).

### Right to Erasure (Right to Be Forgotten)

Any user can delete their own account and all associated personal data via the REST API:

```http
DELETE /users/<userId>
Host: xxxx.dexie.cloud
Authorization: Bearer <user token>
```

Once deleted, the user's private data is **permanently removed**. Shared data belonging to realms with other members is kept for those members, but the deleted user is removed from the realm. See [Delete user](/docs/cloud/rest-api#delete-user) for full details.

### Right of Access & Portability

Use the REST API to retrieve all data belonging to a user, enabling data-access requests and data portability:

```http
GET /my/<table>
Host: xxxx.dexie.cloud
Authorization: Bearer <user token>
```

See the [REST API — Read operations](/docs/cloud/rest-api#read-operations) documentation for details.

### Deactivation vs. Deletion

If you need to disable a user without erasing their data (e.g. during an investigation or for record-keeping), you can [deactivate a user](/docs/cloud/rest-api#deactivate-user) instead — a soft delete that preserves all data and allows reactivation later.

## Summary

| Concern | Hosted Service | Self-hosted (On-Premise) |
|---|---|---|
| Data location | US East (Azure) | Your choice |
| Data processor | Dexie Cloud | You |
| User self-deletion | ✅ REST API | ✅ REST API |
| Data export | ✅ REST API | ✅ REST API |
| EU data residency | Via DPF + SCCs | Native |

## Questions?

If you need help evaluating which deployment option fits your GDPR requirements, reach out on [Discord](https://discord.gg/huhre7MHBF) or contact [support](mailto:support@dexie.org).
