# Pricing Page Restructure Plan

## Goal

Reorganize the `/pricing` page into four distinct **visual zones** — Cloud Product, Support Plans, Services, FAQ — separated by clear zone dividers, connected by a sticky sub-navigation bar, and enhanced with cross-sell callouts.

Cloud Support and Dexie.js Support are brought together in a unified "Support Plans" zone with a tab switcher so the two offerings are visually compared side-by-side but never confused.

---

## Current Problems

1. **Dexie.js Support (Section 2) interrupts the Cloud story** — sits between Cloud Plans and the Cloud comparison table
2. **Cloud Support Plans (Section 3) is orphaned** — separated from both Cloud plans and Dexie.js support
3. **Feature comparison table too far from Cloud plans** — the table that helps decide between Free/Pro/Business/Enterprise is 3 sections away
4. **No navigation on a 9-section page** — visitors can't jump to what interests them
5. **No anchors** — impossible to deep-link to specific sections
6. **CTA at bottom is broken** — `CallToActionWidget` has `buttonText` but no `buttonLink`
7. **Cloud Enterprise sells via self-serve only** — no "Contact Sales" option
8. **All 15 FAQs are Cloud-only** — nothing about Dexie.js support

---

## New Zone Structure

### ZONE A — Dexie Cloud (`#cloud`)

| Step | Component             | Changes                                                                 |
| ---- | --------------------- | ----------------------------------------------------------------------- |
| A1   | `PricingWidget`       | Add "Contact Sales" secondary link on Enterprise card. Add `id="cloud"` |
| A2   | `PricingTableWidget`  | **Moved up** directly below Cloud plans. Add `id="comparison"`          |
| A3   | `StorageLimitsWidget` | Add `id="storage"`                                                      |

### ZONE DIVIDER

Full-width gradient line (`#7b2cbf → #c77dff → transparent`) + extra vertical padding.

### ZONE B — Support Plans (`#support`)

| Step | Component                   | Changes                                         |
| ---- | --------------------------- | ----------------------------------------------- |
| B1   | Zone heading                | "Support Plans" with tab switcher               |
| B2   | Tab: "Dexie Cloud"          | `SupportPlansWidget` with cloud support plans   |
| B3   | Tab: "Dexie.js Open Source" | `OpenSourceSupportWidget` with OS support tiers |
| B4   | Cross-sell card             | "Need both? Contact us for a combined package"  |

### ZONE C — Services & Partners (`#services`)

| Step | Component                                    | Changes             |
| ---- | -------------------------------------------- | ------------------- |
| C1   | `SupportPlansWidget` (Professional Services) | Add `id="services"` |
| C2   | `PreferredPartnersWidget`                    | No changes          |

### ZONE D — FAQ & CTA (`#faq`)

| Step | Component            | Changes                           |
| ---- | -------------------- | --------------------------------- |
| D1   | `FAQWidget`          | Add 4 new FAQ items about support |
| D2   | `CallToActionWidget` | Fix: add `buttonLink`             |

---

## New Components

### `PricingStickyNav` (`src/components/content/PricingStickyNav.tsx`)

- Sticky bar that appears when scrolling past hero
- Anchor links: Cloud Plans | Comparison | Support | Services | FAQ
- IntersectionObserver tracks active section
- Mobile: horizontally scrollable

### `SupportZone` (`src/components/content/SupportZone.tsx`)

- MUI Tabs: "Dexie Cloud" / "Dexie.js Open Source"
- Both panels in DOM for SEO (`display: none` for inactive)
- Cross-sell callout card below tabs

---

## New FAQ Items

1. "Do I need Dexie.js support if I use Dexie Cloud?"
2. "What if I only use the open-source Dexie.js library?"
3. "Can I get a combined Cloud + Dexie.js support package?"
4. "What does 'response time' mean in the support plans?"

---

## Files Changed

| File                                          | Action                                                |
| --------------------------------------------- | ----------------------------------------------------- |
| `src/app/pricing/page.tsx`                    | Reorder sections, add anchors, add FAQ items, fix CTA |
| `src/components/content/PricingStickyNav.tsx` | **New** — sticky nav component                        |
| `src/components/content/SupportZone.tsx`      | **New** — tab switcher wrapping both support widgets  |
| `src/components/content/PricingWidget.tsx`    | Add "Contact Sales" link on Enterprise card           |

---

## Decision Log

- **One page**: keeps SEO consolidated (per user preference)
- **Sticky sub-nav**: standard for long pricing pages
- **Tab switcher for support**: prevents visual overload vs side-by-side 6-card wall
- **Cross-sell as soft callout**: opens bundling door without requiring new Stripe products
- **Enterprise dual-CTA**: self-serve + Contact Sales = industry standard
- **Pricing adjustments**: deferred to separate discussion
