# Dexie Cloud Landing Page — Complete Redesign Plan

## Executive Summary

The `/cloud` page is one of Dexie's most important landing pages — it's where developers deciding on a sync/backend solution arrive. Currently, it's a functional but generic page that doesn't differentiate Dexie Cloud from competitors or communicate its unique value proposition clearly. This plan transforms it into a world-class product page that converts visitors into users.

---

## Research & Analysis

### What Developers Think About Dexie & Dexie Cloud

**Positive sentiment (from testimonials, GitHub discussions, npm):**
- "Dexie Cloud gave Fablehenge a truly backendless experience" — Dusty Phillips
- "In just one year, I've single-handedly built a hybrid web and mobile application" — Bennie Forss
- "Within minutes, I had my application fully synchronized and authenticated" — Alba Rincon
- Active GitHub Discussions community with responsive maintainer (dfahlander)
- 11.8K+ GitHub stars on Dexie.js, trusted by 100K+ developers
- Weekly npm downloads of dexie-cloud-addon: ~550 (growing)
- Used by startups building real SaaS products (To-Do, Fablehenge, Routickr, Birdlist)

**What developers search for:**
- "offline first database", "indexeddb sync", "local first database"
- "offline sync javascript", "no backend required"
- "firebase alternative offline first", "real-time sync without backend"
- "how to build SaaS without backend", "SaaS-ify my app"
- "dexie cloud pricing", "dexie cloud vs firebase"

**Pain points developers have (from HN, Reddit, GitHub):**
- Fear of cloud vendor lock-in and surprise billing
- Complexity of building sync from scratch
- Firebase/Supabase complexity for offline-first
- State management fatigue (Redux, TanStack Query, etc.)
- Need for auth but hate setting it up
- Want to ship fast as solo developers or tiny teams

### Competitor Analysis

| Feature | Dexie Cloud | PowerSync | ElectricSQL | Firebase | Supabase |
|---------|------------|-----------|-------------|----------|----------|
| **Offline-first by design** | ✅ Core architecture | ✅ SQLite-based | ⚠️ Sync focus | ❌ Online-first | ❌ Online-first |
| **No backend needed** | ✅ Zero backend | ❌ Needs backend API | ❌ Needs Postgres | ❌ Google infra | ❌ Postgres backend |
| **Built-in auth** | ✅ OTP + OAuth | ❌ BYOA | ❌ BYOA | ✅ Firebase Auth | ✅ Supabase Auth |
| **Access control** | ✅ Per-object realms | ❌ Sync rules only | ❌ Row-level security | ✅ Security rules | ✅ RLS |
| **Y.js/CRDT support** | ✅ Native integration | ❌ No | ❌ No | ❌ No | ❌ No |
| **Self-hosted option** | ✅ Node.js + Postgres | ✅ Open source | ✅ Open source | ❌ Google only | ✅ Docker |
| **Client: IndexedDB** | ✅ Native | ❌ SQLite WASM | ❌ PGlite | ❌ Custom SDK | ❌ REST/Realtime |
| **SaaS-ready** | ✅ Seats + subscriptions | ❌ DIY | ❌ DIY | ⚠️ Complex | ⚠️ Complex |
| **Pricing model** | Per-seat, transparent | Usage-based | Usage-based | Pay-as-you-go | Fixed + usage |
| **Vendor lock-in risk** | Low (self-host option) | Low | Low | High | Medium |

### Dexie Cloud's Unique Differentiators

1. **The fastest path from idea to SaaS** — Add `dexie-cloud-addon`, configure, done. No backend to build.
2. **True offline-first** — Not an afterthought. The app works completely offline; sync is the bonus.
3. **Built-in user management** — Auth + seats + access control + invitations out of the box.
4. **Y.js ecosystem** — Rich collaborative editing (TipTap, tldraw, Monaco) with offline support.
5. **Per-object access control** — Realms model is simpler and more powerful than row-level security.
6. **Predictable pricing** — Per-seat model, no surprise bills. Free tier forever.
7. **Self-hostable** — Buy the server software when you need full control.

---

## Target Audiences

1. **Solo developer / indie hacker** — Wants to ship a SaaS ASAP without building a backend
2. **Small team (2-10)** — Building a collaborative app, needs sync + auth + sharing
3. **Enterprise evaluator** — Needs GDPR, self-hosting, scalability assurance
4. **Firebase/Supabase refugee** — Frustrated with complexity, vendor lock-in, or billing surprises
5. **Existing Dexie.js user** — Already uses Dexie locally, ready to add cloud features

---

## Page Structure (New Design)

### Section 1: Hero
**Component:** `HeroWidget` with `contentRight` (animated code snippet or visual)
**Message:** "Turn Your App into a SaaS in Minutes"
**Sub:** "Dexie Cloud adds sync, auth, and multi-user collaboration to your Dexie.js app. No backend. No complexity. Start free."
**CTA:** "Start Building Free" + "See How It Works"
**Visual:** TypeWriter cycling through "Sync · Auth · Sharing · Offline · Collaboration · SaaS"

### Section 2: Social Proof Bar
**Component:** `Brands` (or custom stats bar)
**Content:** Key stats — "11.8K+ GitHub Stars · 100K+ Developers · Trusted by companies worldwide"

### Section 3: The Problem → Solution Story
**Custom section** with 3 columns showing the pain of building SaaS the traditional way vs. the Dexie Cloud way:
- **Traditional:** Build API → Set up auth → Design sync protocol → Handle offline → Manage conflicts → Deploy infrastructure
- **Dexie Cloud:** Write your app → Add addon → Configure → Ship SaaS ✅

### Section 4: "From App to SaaS in 4 Steps" (Code Walkthrough)
**Component:** Custom stepped code blocks (reuse from /product page pattern)
1. `npm install dexie dexie-cloud-addon`
2. Declare your database with cloud addon
3. Configure cloud URL
4. Your app now syncs, authenticates, and scales

### Section 5: Key Capabilities
**Component:** `Benefits` widget
Six capabilities:
1. **Automatic Sync** — Two-way sync that just works
2. **Built-in Authentication** — OTP + OAuth, no backend needed
3. **Access Control & Sharing** — Per-object realms, roles, invitations
4. **Y.js & CRDT** — Rich collaborative editing
5. **Cross-Platform** — Web, Mobile (PWA, Capacitor), Desktop (Electron)
6. **Self-Hostable** — SaaS or on-premises with full source code

### Section 6: "Why Developers Choose Dexie Cloud" (Comparison)
**Custom section** — Visual comparison grid against common alternatives
- vs. Building your own sync
- vs. Firebase
- vs. Supabase
- vs. Other sync engines

### Section 7: Feature Deep Dives
**Component:** `FeatureScreenshotWidget` (reuse from homepage)
Slides showing:
1. Login/Auth experience
2. Sharing & collaboration
3. Real-time reactive queries
4. Account & payment integration
5. Dashboard & analytics

### Section 8: Testimonials
**Component:** `TestimonialsWidget`
Longer, more impactful testimonials from real users building real SaaS products

### Section 9: Starter Templates
**Component:** `BlogPostsWidget`
Show quickstart, Dexie Cloud Starter, and Svelte boilerplate

### Section 10: Pricing Preview
**Custom section** — Simplified pricing snapshot with link to /pricing
"Start Free → Scale as you grow"
- Free: 3 users, 100MB
- Production: From €0.12/user/month
- Self-hosted: Full control

### Section 11: FAQ
**Component:** `FAQWidget`
Targeted questions:
- "Do I need to build a backend?"
- "How does offline sync work?"
- "Can I use my own authentication?"
- "How does pricing work?"
- "Is it production-ready?"
- "Can I self-host?"

### Section 12: Final CTA
**Component:** `CallToActionWidget` or custom
"Ready to SaaS-ify Your App?"
Two CTAs: "Start Building Free" + "Talk to Us"

---

## Key Messaging Principles

1. **Lead with the outcome** — "Turn your app into a SaaS" not "Sync service for IndexedDB"
2. **Show, don't tell** — Code examples, screenshots, real testimonials
3. **Address fears** — No vendor lock-in, predictable pricing, GDPR-ready
4. **Make it feel easy** — "Minutes, not months" — show how little code is needed
5. **Social proof everywhere** — Stars, downloads, real companies, real quotes
6. **Clear comparison** — Help visitors understand why Dexie Cloud vs alternatives
7. **Multiple CTAs** — Never more than 1 scroll away from an action

---

## Implementation Notes

- Reuse existing components: `HeroWidget`, `Benefits`, `TestimonialsWidget`, `BlogPostsWidget`, `FAQWidget`, `FeatureScreenshotWidget`, `CodeBlock`, `TypeWriter`, `CallToActionWidget`
- Custom sections for: Problem/Solution story, Comparison grid, Pricing preview, Stats bar
- Keep dark theme consistent with rest of site (black backgrounds, white/gray text, purple accents)
- Maintain existing metadata/SEO structure but update keywords for SaaS-focused audience
- Mobile-responsive throughout

---

## Files to Change

| File | Action |
|------|--------|
| `src/app/cloud/page.tsx` | Complete rewrite |

No new component files needed — we'll use existing components and inline custom sections.
