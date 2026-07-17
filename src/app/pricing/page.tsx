import type { Metadata } from "next";
import CallToActionWidget from "@/components/content/CallToActionWidget";
import FAQWidget from "@/components/content/FAQWidget";

export const metadata: Metadata = {
  metadataBase: new URL("https://dexie.org"),
  title: "Dexie Cloud Pricing - Free Offline-First Database with Sync Plans",
  description:
    "Dexie Cloud pricing: Start free with unlimited users and 1GB storage. Flat-rate plans for Indie, Pro, and Scale starting at $25/month with unlimited users and pay-as-you-grow overages. No seat caps.",
  keywords: [
    "dexie cloud pricing",
    "offline database pricing",
    "dexie.js cost",
    "offline first database cost",
    "indexeddb sync pricing",
    "database sync pricing",
    "offline sync cost",
    "real time sync pricing",
    "javascript database pricing",
    "browser database cost",
    "local first pricing",
    "offline collaboration pricing",
    "pwa database pricing",
    "client database hosting",
    "offline storage pricing",
    "database as a service pricing",
    "offline first hosting",
  ],
  openGraph: {
    title: "Dexie Cloud Pricing - Start Free, Scale as Needed",
    description:
      "Free tier: Unlimited users, 1GB storage. Flat-rate Indie/Pro/Scale plans from $25/month with unlimited users and pay-as-you-grow overages.",
    url: "https://dexie.org/pricing",
    images: [
      {
        url: "/assets/images/og-images/og-base.png",
        width: 1200,
        height: 630,
        alt: "Build synced offline-first apps with Dexie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dexie Cloud Pricing - Free Tier Available",
    description:
      "Start free with unlimited users and 1GB storage. Flat-rate plans starting at $25/month with unlimited users.",
    images: ["/assets/images/og-images/og-base.png"],
  },
  alternates: {
    canonical: "https://dexie.org/pricing",
  },
};
import PricingWidget, {
  type PricingPlan,
} from "@/components/content/PricingWidget";
import { type SupportPlan } from "@/components/content/SupportPlansWidget";
import SupportPlansWidget from "@/components/content/SupportPlansWidget";
import { type OpenSourceSupportPlan } from "@/components/content/OpenSourceSupportWidget";
import SupportZone from "@/components/content/SupportZone";
import PricingStickyNav from "@/components/content/PricingStickyNav";
import PreferredPartnersWidget from "@/components/content/PreferredPartnersWidget";
import PricingTableWidget, {
  type TableColumn,
  type TableRow,
} from "@/components/content/PricingTableWidget";
import StorageLimitsWidget, {
  type StorageLimit,
  type AdditionalStorage,
} from "@/components/content/StorageLimitsWidget";
import { Box, Divider } from "@mui/material";

// FAQ data
const faqData = [
  {
    id: 1,
    question: "What is Dexie Cloud?",
    answer:
      "Dexie Cloud is a cloud service that adds real-time synchronization, authentication, and collaboration features to your Dexie.js applications. It enables offline-first applications with seamless sync when online.",
  },
  {
    id: 2,
    question: "Blob- vs Object Storage",
    answer:
      "To make use of the cheaper Blob storage, save large binary data such as images, songs, videos etc in Blobs rather than base64 encoded strings or UInt8Arrays. The storage type can be affected already at the client side by using the Blob datatype in Dexie.js. The rest is handled by dexie-cloud:\n```typescript\nasync function addMp3Song(title: string, genre: string, mp3Blob: Blob) {\n  await db.songs.add({\n    title, // goes into object storage at sync time\n    genre, // goes into object storage at sync time\n    songData: mp3Blob // goes into blob storage at sync time\n  });\n}\n```Note however, that unlike object storage, blob storage has a limit / cost associated with write operations. Every time a blob is added or replaced is considered a write operation.",
  },
  {
    id: 3,
    question: "How does the Free Plan work?",
    answer:
      "The Free Plan is designed for passion projects, prototyping, and evaluation. It includes unlimited production & evaluation users, 1 GB Postgres storage, and 5 GB Blob storage. Unlike paid plans, the Free plan has a hard limit on resources and does not support overages. If you approach these limits, we will send you warning emails so you can easily upgrade to Indie, Pro, or Scale to keep syncing without interruption. All database syncing features are identical across all plans.",
  },
  {
    id: 4,
    question: "Are there any hard limits on storage or Sync Units?",
    answer:
      "Paid plans (Indie, Pro, and Scale) follow a 'Build Without Limits' philosophy with generous included quotas, no hard limits, and no automatic service shut-offs when you exceed them. Extra storage and Sync Units on paid plans are billed transparently as pay-as-you-grow overages (billed in EUR). On the Free plan, overages are not supported, and database syncing will temporarily pause if included quotas are exceeded until you upgrade or free up space. Generous fair-use limits apply to network egress (Indie: 50 GB, Pro: 250 GB, Scale: 1 TB per month) and concurrent WebSocket connections (Free: 100, Indie: 1,000, Pro: 5,000, Scale: 20,000) to protect shared infrastructure — casual overages on these connections are never met with a hard cutoff. Paid plans also let you configure spend caps in your settings to avoid unexpected charges.",
  },
  {
    id: 5,
    question: "What is the On-Premises Enterprise license?",
    answer:
      "The On-Premises Enterprise license (€7,995 one-time) gives you full server source code access, unlimited databases and production users, and complete control to self-host on your own infrastructure or any cloud provider (AWS, Azure, etc.) — with zero recurring software licensing fees. It includes 1 year of Priority Support and software updates; renew annually for €1,495/yr to keep receiving updates and support.\n\nRead more… »",
  },
  {
    id: 6,
    question: "End User Types",
    answer:
      "This section outlines the distinctions between Evaluation, Production, and Demo users as referenced in the pricing table. Dexie Cloud provides a security layer of authentication and access control directly between end-user and database. End users will authenticate directly with Dexie Cloud database but via a customizable authentication experience for the end user.",
  },
  {
    id: 7,
    question: "Evaluation Users",
    answer:
      "Evaluation users are free time-limited end user accounts for your app, that can be upgraded to production at any time. By default, Dexie Cloud allows anyone to authenticate (configurable). Unknown users receive an evaluation license for up to 30 active days (no per-user charges apply). Evaluation accounts are paused on inactive days (configurable). After an evaluation period ends, the user can continue using the app but won't be able to sync data. You can indicate the user's evaluation status and prompt them to upgrade. Upgrade evaluation users to production via the Dexie Cloud Management app or REST API.",
  },
  {
    id: 8,
    question: "Production Users",
    answer:
      "All plans, including the Free plan, include unlimited production users — there are no seat packs, no per-seat pricing, and no user limits. You can manage production user status via the Dexie Cloud Management app or REST API, and integrate this API with your payment gateway webhooks to activate users based on customer subscriptions.",
  },
  {
    id: 9,
    question: "Demo Accounts",
    answer:
      "Demo accounts are for testing and demoing your app. They lack login credentials and are useful for showcasing data sharing. Like any other user account, demo accounts do not have access to any private data that hasn't been actively shared to it. Enable or disable demo accounts as needed. Demo accounts don't count toward your user limits and do not expire.\n\nFind more about Dexie Cloud and its features by visiting the Dexie Cloud Documentation.",
  },
  {
    id: 10,
    question: "Customized Authentication",
    answer:
      "In all editions, it is possible to replace or customize end-user authentication. Dexie Cloud comes with OTP authentication and a default GUI that prompts the user for email and One-time password. There's no need to write any backend or even front-end code for this. However, customers may want to either customise the user interface, or integrate with an existing authentication solution instead of using the built-in OTP authentication from Dexie Cloud.",
  },
  {
    id: 11,
    question: "Customizable Authentication",
    answer:
      "To customize the default GUI for our OTP authentication, configure {customLoginGui: true} and let a component use the db.cloud.userInteraction observable to display dialogs with your own look and feel. Customized authentication does not need a custom backend but can be served the way you prefer, and even from a static web site.",
  },
  {
    id: 12,
    question: "Replaceable Authentication",
    answer: `To replace the default OTP authentication with your own authentication of choice,
      you'll need a backend-for-frontend (BFF) server side app to serve your client application.
      The server-side app needs to serve a dedicated token endpoint for dexie-cloud client that
      integrates with your authentication solution. See
      /docs/cloud/db.cloud.configure()#example-integrate-custom-authentication
      on how it can be accomplished.`,
  },
  {
    id: 13,
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing adjustments are prorated.",
  },
  {
    id: 14,
    question: "What happens to my data if I cancel?",
    answer:
      "Your data remains accessible for 30 days after cancellation. You can export your data or reactivate your account during this period. After 30 days, data is permanently deleted.",
  },
  {
    id: 15,
    question: "Is there a free trial?",
    answer:
      "No credit card or trial is needed to get started. Our Free plan is permanent and comes with unlimited production users, unlimited evaluation users, and generous storage/sync quotas. You can start building today and upgrade to a paid tier (Indie, Pro, or Scale) when you need larger quotas.",
  },
  {
    id: 16,
    question: "Do I need Dexie.js support if I use Dexie Cloud?",
    answer:
      "If you're a Dexie Cloud customer, your plan already includes support for the full stack including the Dexie.js client library. The standalone Dexie.js support plans are designed for teams who use the open-source library without Dexie Cloud.",
  },
  {
    id: 17,
    question: "What if I only use the open-source Dexie.js library?",
    answer:
      "Many large companies build production applications on Dexie.js with their own backend and sync solutions. Our Dexie.js Professional Support plans give you direct access to the author and core team for architecture guidance, prioritized bug fixes, and peace of mind.",
  },
  {
    id: 18,
    question: "Can I get a combined Cloud + Dexie.js support package?",
    answer:
      "Yes. Contact us at business@dexie.org to discuss a tailored package that covers both your Dexie Cloud deployment and broader Dexie.js usage across your organization.",
  },
  {
    id: 19,
    question: "What does 'response time' mean in the support plans?",
    answer:
      "Response times indicate when you'll receive an initial substantive reply from the core team. Times apply during CET business hours (Mon–Fri, 9:00–17:00). Enterprise plans can include custom SLA hours.",
  },
  {
    id: 20,
    question: "What is a Sync Unit (SU)?",
    answer:
      "A Sync Unit is our metering unit for sync throughput: 1 SU equals one created or modified object synced, up to 10 KB in size. Larger objects count as multiple units (e.g. a 25 KB object = 3 SU). This keeps billing predictable and protects shared infrastructure from abuse via oversized bulk writes.",
  },
  {
    id: 21,
    question: "What if my needs go beyond the Scale plan?",
    answer:
      "Founder's Circle offers white-glove, custom-tailored service — custom storage and Sync Unit limits, a dedicated Slack channel with the core team, and negotiable SLAs — for teams operating at very large scale. If you need full data sovereignty or self-hosting instead, our On-Premises Enterprise license may be a better fit. Contact us to discuss your requirements.",
  },
];

// Cloud pricing plans data (handled dynamically inside PricingWidget)
const cloudPlans: PricingPlan[] = [];

// On-premises plans (for future use)
const onPremisesPlans: PricingPlan[] = [];

// Support plans data
const supportPlans: SupportPlan[] = [
  {
    title: "Dexie Cloud SaaS",
    price: "Included",
    description:
      "Support is bundled into every Dexie Cloud SaaS plan — no separate purchase needed. The level of support scales with your plan.",
    features: [
      "Free: Community support (GitHub/Stack Overflow)",
      "Indie: Email support",
      "Pro: Priority support (faster response)",
      "Scale: Premium email support (AI-assisted + human review, 1 business day SLA target; incidents excluded)",
    ],
    ctaText: "View Cloud Plans",
    ctaHref: "#cloud",
  },
  {
    title: "On-Premises Enterprise",
    price: "1 year included",
    description:
      "Every On-Premises Enterprise license includes a full year of Priority Support and software updates. Renew annually to keep support and updates flowing.",
    highlighted: true,
    badge: "Renewal",
    features: [
      "Priority support (chat & email)",
      "Software updates for the license term",
      "Access to private GitHub repo for source updates",
      "Year 2+ renewal: €1,495/yr",
    ],
    ctaText: "Contact us",
    ctaHref: "https://calendly.com/david-fahlander-awarica/30min",
  },
];

// Dexie.js Open Source Support plans
const openSourceSupportPlans: OpenSourceSupportPlan[] = [
  {
    title: "Starter",
    price: "€2,990",
    priceNote: "/ year",
    description:
      "For teams adopting Dexie.js who want confidence and direct access to the author when things get tricky.",
    features: [
      "Email support, 48h response time",
      "Up to 10 support tickets / year",
      "1 architecture review session (1h video)",
      "Access to private bug tracker",
      "Dexie.js version upgrade guidance",
    ],
    ctaText: "Contact us",
    ctaHref: "https://calendly.com/david-fahlander-awarica/30min",
  },
  {
    title: "Professional",
    price: "€7,490",
    priceNote: "/ year",
    description:
      "For production teams who depend on Dexie.js and need faster response, architectural guidance, and a direct line to the core team.",
    features: [
      "Email & video support, 24h response time",
      "Up to 25 support tickets / year",
      "3 architecture review sessions / year",
      "Prioritized bug fixes",
      "Access to private bug tracker",
      "Dexie.js roadmap input",
      "Named contact on the core team",
    ],
    ctaText: "Contact us",
    ctaHref: "https://calendly.com/david-fahlander-awarica/30min",
    highlighted: true,
    badge: "Most popular",
  },
  {
    title: "Enterprise",
    price: "Custom",
    description:
      "For large organizations or teams with demanding SLA requirements, regulatory constraints, or complex integration needs. Tailored to your situation.",
    features: [
      "Dedicated Slack channel",
      "SLA-backed response time (custom)",
      "Unlimited support tickets",
      "Quarterly strategy calls",
      "Architecture consulting",
      "Influence on roadmap",
      "Custom contract & NDA available",
      "On-site or video workshops (optional)",
    ],
    ctaText: "Get a quote",
    ctaHref: "https://calendly.com/david-fahlander-awarica/30min",
  },
];

// Professional Services data
const professionalServices: SupportPlan[] = [
  {
    title: "Kickstart & Onboarding",
    price: "€2,500",
    description:
      "Get up and running fast with 1-2 days of expert guidance. Perfect for teams new to offline-first concepts and Dexie Cloud sync patterns.",
    features: [
      "1-2 days with Dexie Cloud expert",
      "Offline-first architecture guidance",
      "Sync patterns and best practices",
      "Authentication setup assistance",
      "Q&A and troubleshooting session",
      "Follow-up documentation",
    ],
  },
  {
    title: "Setup & Integration",
    price: "€5,000 - €15,000",
    description:
      "Complete implementation support for your production environment. We help you set up authentication, access control, and integrate with your existing systems.",
    features: [
      "Complete Dexie Cloud setup",
      "Custom authentication integration",
      "Access control and permissions setup",
      "Integration with existing backend",
      "Performance optimization",
      "Production deployment guidance",
      "Team handover session",
    ],
  },
  {
    title: "Team Training",
    price: "Contact us",
    description:
      "Comprehensive 1-5-day remote training program for your development team. Master offline-first architecture and advanced Dexie Cloud patterns.",
    features: [
      "1-5 days remote training program",
      "Offline-first architecture deep dive",
      "Advanced sync patterns",
      "Performance optimization techniques",
      "Best practices and common pitfalls",
      "Hands-on workshops",
      "Custom training materials",
    ],
  },
  {
    title: "Development Services",
    price: "Contact Us",
    description:
      "Need help building your MVP or migrating from another database? Our experts can help you with proof-of-concepts, prototypes, and migration projects.",
    features: [
      "MVP/POC development",
      "Database migration services",
      "Custom feature development",
      "Architecture consulting",
      "Code review and optimization",
      "Ongoing development support",
    ],
  },
];

// Preferred Partners data
interface PreferredPartner {
  name: string;
  description: string;
  website: string;
  logo?: string;
  services: string[];
  contact: {
    email: string;
    phone?: string;
  };
}

const preferredPartners: PreferredPartner[] = [
  {
    name: "Zenta AB",
    description:
      "Expert Dexie Cloud implementation and development services with deep offline-first expertise",
    website: "https://www.zenta.se",
    services: [
      "Dexie Cloud Implementation",
      "Offline-First Development",
      "Custom Application Development",
      "Migration Services",
      "Training & Consulting",
      "Enterprise Integration",
    ],
    contact: {
      email: "info@zenta.se",
    },
  },
];

// Detailed comparison table data
const comparisonColumns: TableColumn[] = [
  { key: "feature", label: "Feature" },
  { key: "free", label: "Free Plan", align: "center" },
  { key: "indie", label: "Indie Plan", align: "center" },
  { key: "pro", label: "Pro Plan", align: "center" },
  { key: "scale", label: "Scale Plan", align: "center" },
];

const comparisonRows: TableRow[] = [
  {
    feature: "Easy setup: npx dexie-cloud create",
    free: true,
    indie: true,
    pro: true,
    scale: true,
  },
  {
    feature: "All core database sync features included",
    free: true,
    indie: true,
    pro: true,
    scale: true,
  },
  {
    feature: "Customizable OTP authentication",
    free: true,
    indie: true,
    pro: true,
    scale: true,
  },
  {
    feature: "Replaceable authentication (BFF)",
    free: true,
    indie: true,
    pro: true,
    scale: true,
  },
  {
    feature: "Max Number of databases",
    free: "Unlimited",
    indie: "Unlimited",
    pro: "Unlimited",
    scale: "Unlimited",
  },
  {
    feature: "Evaluation users (your end users)",
    free: "Unlimited, free",
    indie: "Unlimited, free",
    pro: "Unlimited, free",
    scale: "Unlimited, free",
  },
  {
    feature: "Production users (your end users)",
    free: "Unlimited, free",
    indie: "Unlimited, free",
    pro: "Unlimited, free",
    scale: "Unlimited, free",
  },
  {
    feature: "Demo accounts (for showcasing app)",
    free: "Unlimited, free",
    indie: "Unlimited, free",
    pro: "Unlimited, free",
    scale: "Unlimited, free",
  },
  {
    feature: "Included Postgres Storage (no hard limit, pay-as-you-grow)",
    free: "1 GB",
    indie: "10 GB",
    pro: "50 GB",
    scale: "200 GB",
  },
  {
    feature: "Included Blob Storage (no hard limit, pay-as-you-grow)",
    free: "5 GB",
    indie: "25 GB",
    pro: "100 GB",
    scale: "500 GB",
  },
  {
    feature: "Included Sync Units (SU) / mo (no hard limit, pay-as-you-grow)",
    free: "1 Million",
    indie: "5 Million",
    pro: "25 Million",
    scale: "100 Million",
  },
  {
    feature: "Point-In-Time-Recovery (PITR)",
    free: "7 days",
    indie: "7 days",
    pro: "30 days",
    scale: "30 days",
  },
  {
    feature: "Support options",
    free: "Github/Stackoverflow",
    indie: "Email Support",
    pro: "Priority Support",
    scale: "Premium email support (AI + human review, 1 business day SLA target)",
  },
];

// Storage limits data
const storageLimits: StorageLimit[] = [
  {
    plan: "Free Plan",
    objectStorage: "1 GB",
    blobStorage: "5 GB",
    blobWrites: "1M SU / mo",
  },
  {
    plan: "Indie Plan",
    objectStorage: "10 GB",
    blobStorage: "25 GB",
    blobWrites: "5M SU / mo",
  },
  {
    plan: "Pro Plan",
    objectStorage: "50 GB",
    blobStorage: "100 GB",
    blobWrites: "25M SU / mo",
  },
  {
    plan: "Scale Plan",
    objectStorage: "200 GB",
    blobStorage: "500 GB",
    blobWrites: "100M SU / mo",
  },
];

// Additional storage pricing
const additionalStorageData: AdditionalStorage[] = [
  {
    storageType: "Postgres Database Storage (overage)",
    storageCost: "€0.15 / extra GB / mo",
    syncCosts: "€0.12 / extra GB / mo on Scale",
  },
  {
    storageType: "Blob Storage / Files (overage)",
    storageCost: "€0.03 / extra GB / mo",
    syncCosts: "€0.025 / extra GB / mo on Scale",
  },
  {
    storageType: "Sync Units (overage per 1M SU)",
    storageCost: "Indie: €4 / 1M, Pro: €3 / 1M",
    syncCosts: "Scale: €2 / 1M",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Sticky Sub-Navigation */}
      <PricingStickyNav />

      {/* ============================================ */}
      {/* ZONE A — Dexie Cloud                        */}
      {/* ============================================ */}

      {/* A1: Cloud Plans */}
      <Box id="cloud">
        <PricingWidget
          cloudPlans={cloudPlans}
          onPremisesPlans={onPremisesPlans}
          settings={{
            textColor: "#dee2e6",
            backgroundColor: "#000000",
            containerWidth: "big",
            sectionTitle: "Build without limits.",
            sectionSubtitle:
              "Your app can grow to any size — the platform won't hold it back. No seat caps. Unlimited connections (soft fair-use guidelines apply). No 'contact sales to scale.' You grow, you pay for what you use, and we scale with you.",
            typewriterStrings: [
              "full backend control",
              "IndexedDB simplified",
              "local-first by design",
              "source code available",
              "server-free coding",
              "zero server costs",
            ],
          }}
          sx={{
            paddingTop: "200px !important",
            background:
              "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('/assets/images/dexie-bg.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </Box>

      <Divider />

      {/* A2: Detailed Pricing Table (moved up from section 4) */}
      <Box id="comparison">
        <PricingTableWidget
          title="Detailed Pricing Table"
          subtitle="For more details, check out this blog post. Need more than Scale offers? See Founder's Circle and On-Premises Enterprise above."
          columns={comparisonColumns}
          rows={comparisonRows}
          settings={{
            textColor: "#dee2e6",
            backgroundColor: "#000000",
            containerWidth: "big",
          }}
        />
      </Box>

      <Divider />

      {/* A3: Storage Limits */}
      <Box id="storage">
        <StorageLimitsWidget
          storageLimits={storageLimits}
          additionalStorage={additionalStorageData}
          settings={{
            textColor: "#dee2e6",
            backgroundColor: "#000000",
            containerWidth: "big",
            additionalStorageDescription: "If more storage or sync throughput than what's included in the plan is required, a subscription can be extended with additional storage and sync operations (overages are billed in EUR for all customers):",
          }}
        />
      </Box>

      {/* ============================================ */}
      {/* ZONE DIVIDER — Cloud → Support               */}
      {/* ============================================ */}
      <Box
        sx={{
          py: 2,
          position: "relative",
          backgroundColor: "#000000",
          "&::after": {
            content: '""',
            position: "absolute",
            left: "10%",
            right: "10%",
            top: "50%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #7b2cbf, #c77dff, #7b2cbf, transparent)",
            opacity: 0.6,
          },
        }}
      />

      {/* ============================================ */}
      {/* ZONE B — Support Plans                       */}
      {/* ============================================ */}

      <Box id="support" sx={{ py: 8, backgroundColor: "#000000" }}>
        <SupportZone
          cloudSupportPlans={supportPlans}
          openSourceSupportPlans={openSourceSupportPlans}
          settings={{
            textColor: "#dee2e6",
            backgroundColor: "#000000",
            containerWidth: "big",
          }}
        />
      </Box>

      {/* ============================================ */}
      {/* ZONE DIVIDER — Support → Services            */}
      {/* ============================================ */}
      <Box
        sx={{
          py: 2,
          position: "relative",
          backgroundColor: "#000000",
          "&::after": {
            content: '""',
            position: "absolute",
            left: "10%",
            right: "10%",
            top: "50%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #7b2cbf, #c77dff, #7b2cbf, transparent)",
            opacity: 0.6,
          },
        }}
      />

      {/* ============================================ */}
      {/* ZONE C — Services & Partners                 */}
      {/* ============================================ */}

      <Box id="services">
        <SupportPlansWidget
          plans={professionalServices}
          settings={{
            textColor: "#dee2e6",
            backgroundColor: "#000000",
            containerWidth: "big",
            sectionTitle: "Professional Services",
            sectionSubtitle:
              "Get expert help to implement, optimize, and scale your Dexie Cloud applications with our professional services",
          }}
        />
      </Box>

      <Divider />

      {/* Partners */}
      <PreferredPartnersWidget
        partners={preferredPartners}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "Preferred Partners",
          sectionSubtitle:
            "Work with certified Dexie Cloud experts who can help you implement, migrate, and optimize your offline-first applications",
        }}
      />

      {/* ============================================ */}
      {/* ZONE DIVIDER — Services → FAQ                */}
      {/* ============================================ */}
      <Box
        sx={{
          py: 2,
          position: "relative",
          backgroundColor: "#000000",
          "&::after": {
            content: '""',
            position: "absolute",
            left: "10%",
            right: "10%",
            top: "50%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #7b2cbf, #c77dff, #7b2cbf, transparent)",
            opacity: 0.6,
          },
        }}
      />

      {/* ============================================ */}
      {/* ZONE D — FAQ & CTA                           */}
      {/* ============================================ */}

      <Box id="faq">
        <FAQWidget
          items={faqData}
          settings={{
            textColor: "#dee2e6",
            backgroundColor: "#000000",
            containerWidth: "big",
            sectionTitle: "Frequently Asked Questions",
            sectionSubtitle: "",
          }}
        />
      </Box>

      <Divider />

      {/* Call to Action */}
      <CallToActionWidget
        text="Join thousands of developers building amazing offline-first applications with Dexie."
        title="Ready to Get Started?"
        buttonText="Start Free"
        buttonLink={{
          url: "/docs/cloud/quickstart",
          querystring: "",
          title: "Start Free",
          target: "_self",
        }}
        secondaryButtonText="Contact Sales"
        secondaryButtonLink={{
          url: "/contact",
          querystring: "",
          title: "Contact Sales",
          target: "_self",
        }}
        textColor="#dee2e6"
        backgroundColor="#000000"
        containerWidth="big"
      />
    </>
  );
}
