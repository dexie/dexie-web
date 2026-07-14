import type { Metadata } from "next"
import CallToActionWidget from "@/components/content/CallToActionWidget"
import FAQWidget from "@/components/content/FAQWidget"

export const metadata: Metadata = {
  metadataBase: new URL("https://dexie.org"),
  title: "Dexie Cloud Pricing - Free Offline-First Database with Sync Plans",
  description:
    "Dexie Cloud pricing: Start free with 3 users and 3GB storage. Flat-rate plans for Indie, Pro, and Gold starting at $25/month with unlimited users and pay-as-you-grow overages. No seat caps.",
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
      "Free tier: 3 users, 3GB storage. Flat-rate Indie/Pro/Gold plans from $25/month with unlimited users and pay-as-you-grow overages.",
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
      "Start free with 3 users and 3GB storage. Production flat-rate plans starting at $25/month with unlimited users.",
    images: ["/assets/images/og-images/og-base.png"],
  },
  alternates: {
    canonical: "https://dexie.org/pricing",
  },
}
import PricingWidget, {
  type PricingPlan,
} from "@/components/content/PricingWidget"
import { type SupportPlan } from "@/components/content/SupportPlansWidget"
import SupportPlansWidget from "@/components/content/SupportPlansWidget"
import { type OpenSourceSupportPlan } from "@/components/content/OpenSourceSupportWidget"
import SupportZone from "@/components/content/SupportZone"
import PricingStickyNav from "@/components/content/PricingStickyNav"
import PreferredPartnersWidget from "@/components/content/PreferredPartnersWidget"
import PricingTableWidget, {
  type TableColumn,
  type TableRow,
} from "@/components/content/PricingTableWidget"
import StorageLimitsWidget, {
  type StorageLimit,
  type AdditionalStorage,
} from "@/components/content/StorageLimitsWidget"
import { Box, Divider } from "@mui/material"

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
      "The Free Plan is designed for passion projects, prototyping, and evaluation. It includes 3 production seats, unlimited evaluation users, 3 GB Postgres storage, and 5 GB Blob storage. If you need more resources, you can easily upgrade to Indie, Pro, or Gold. All database syncing features are identical across all plans.",
  },
  {
    id: 4,
    question: "Are there any hard limits on storage or sync operations?",
    answer:
      "No! We follow a 'Build Without Limits' philosophy. All paid plans (Indie, Pro, and Gold) have generous included quotas, but there are no hard limits or automatic service shut-offs when you exceed them. Extra storage and sync operations are billed transparently as pay-as-you-grow overages. You can configure spend caps in your settings to avoid unexpected charges.",
  },
  {
    id: 5,
    question: "Dexie Cloud Server Software",
    answer:
      "Purchase the software (optionally with full source code and private Git access) and utilize it as you wish (modify source code or taylor it for your systems - anything except competing with us). Serve millions of users without additional fees. Host it on a cloud provider of your choice or your own hardware. The server is compatible with cloud platforms like Amazon AWS and Microsoft Azure. The package includes one year of chat- and email support and software updates. For continuous support, the yearly fee covers ongoing updates, chat- and email support.\n\nRead more… »",
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
      "Evaluation users are free time-limited end user accounts for your app, that can be upgraded to production at any time. By default, Dexie Cloud allows anyone to authenticate (configurable). Unknown users do not occupy seats but receive an evaluation license for up to 30 active days. Evaluation accounts are paused on inactive days (configurable). After an evaluation period ends, the user can continue using the app but won't be able to sync data. You can indicate the user's evaluation status and prompt them to upgrade. Upgrade evaluation users to production via the Dexie Cloud Management app or REST API.",
  },
  {
    id: 8,
    question: "Production Users",
    answer:
      "A production user occupies one of the production seats. The Evaluation edition includes 3 free production seats, while the Production edition comes in 25-seat packs. Manage production seat occupancy via the Dexie Cloud Management app or REST API. Integrate this API with payment gateway web hooks to manage seats based on your customer subscriptions.",
  },
  {
    id: 9,
    question: "Demo Accounts",
    answer:
      "Demo accounts are for testing and demoing your app. They lack login credentials and are useful for showcasing data sharing. Like any other user account, demo accounts do not have access to any private data that hasn't been actively shared to it. Enable or disable demo accounts as needed. Demo accounts do not occupy seats and do not expire.\n\nFind more about Dexie Cloud and its features by visiting the Dexie Cloud Documentation.",
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
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes, both Pro and Enterprise plans come with a 14-day free trial. No credit card required to start your trial.",
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
]

// Cloud pricing plans data (handled dynamically inside PricingWidget)
const cloudPlans: PricingPlan[] = []

// On-premises plans (for future use)
const onPremisesPlans: PricingPlan[] = []

// Support plans data
const supportPlans: SupportPlan[] = [
  {
    title: "Production",
    price: "Included",
    description:
      "This support option is included when subscribing to Dexie Cloud Production (SaaS) and includes email and chat support.",
    features: ["Email support", "Chat support"],
    ctaText: "Get started",
    ctaHref: "/docs/cloud/quickstart",
  },
  {
    title: "Business",
    price: "€695 / year",
    description:
      "This support option is available for the On-Prem Business Edition. One year of Business Support is included when purchasing Dexie Cloud On-Prem Business.",
    features: [
      "Chat support",
      "Email support",
      "Prioritized tickets",
      "Software updates",
      "Github issues",
    ],
    ctaText: "Contact us",
    ctaHref: "https://calendly.com/david-fahlander-awarica/30min",
  },
  {
    title: "Enterprise",
    price: "€3,495 / year",
    description:
      "Every customer is different and require different levels of support. With the Gold Support package, we can dedicate our support to your team, tailor SLAs and be available at the levels of customer's requirements.",
    highlighted: true,
    badge: "Most popular",
    features: [
      "SLA 16 business hours",
      "Access to private GIT repo of Dexie Cloud Server for source code updates",
      "Prioritized tickets",
      "Private Github issues",
      "Software updates",
      "Chat support",
      "Email support",
      "Video meetings",
      "Dedication",
    ],
    ctaText: "Contact us",
    ctaHref: "https://calendly.com/david-fahlander-awarica/30min",
  },
]

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
]

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
]

// Preferred Partners data
interface PreferredPartner {
  name: string
  description: string
  website: string
  logo?: string
  services: string[]
  contact: {
    email: string
    phone?: string
  }
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
]

// Detailed comparison table data
const comparisonColumns: TableColumn[] = [
  { key: "feature", label: "Feature" },
  { key: "free", label: "Free Plan", align: "center" },
  { key: "indie", label: "Indie Plan", align: "center" },
  { key: "pro", label: "Pro Plan", align: "center" },
  { key: "gold", label: "Gold Plan", align: "center" },
]

const comparisonRows: TableRow[] = [
  {
    feature: "Easy setup: npx dexie-cloud create",
    free: true,
    indie: true,
    pro: true,
    gold: true,
  },
  {
    feature: "All core database sync features included",
    free: true,
    indie: true,
    pro: true,
    gold: true,
  },
  {
    feature: "Customizable OTP authentication",
    free: true,
    indie: true,
    pro: true,
    gold: true,
  },
  {
    feature: "Replaceable authentication (BFF)",
    free: true,
    indie: true,
    pro: true,
    gold: true,
  },
  {
    feature: "Max Number of databases",
    free: "Unlimited",
    indie: "Unlimited",
    pro: "Unlimited",
    gold: "Unlimited",
  },
  {
    feature: "Evaluation users (your end users)",
    free: "Unlimited, free",
    indie: "Unlimited, free",
    pro: "Unlimited, free",
    gold: "Unlimited, free",
  },
  {
    feature: "Demo accounts (for showcasing app)",
    free: "Unlimited, free",
    indie: "Unlimited, free",
    pro: "Unlimited, free",
    gold: "Unlimited, free",
  },
  {
    feature: "Included Postgres Storage",
    free: "3 GB",
    indie: "10 GB",
    pro: "50 GB",
    gold: "200 GB",
  },
  {
    feature: "Included Blob Storage",
    free: "5 GB",
    indie: "25 GB",
    pro: "100 GB",
    gold: "500 GB",
  },
  {
    feature: "Included Sync Operations / mo",
    free: "1 Million",
    indie: "5 Million",
    pro: "25 Million",
    gold: "100 Million",
  },
  {
    feature: "Point-In-Time-Recovery (PITR)",
    free: "7 days",
    indie: "7 days",
    pro: "30 days",
    gold: "30 days",
  },
  {
    feature: "Support options",
    free: "Github/Stackoverflow",
    indie: "Email Support",
    pro: "Priority Support",
    gold: "Premium Support (AI + Human, 1 business day SLA)",
  },
]

// Storage limits data
const storageLimits: StorageLimit[] = [
  {
    seats: "Free Tier",
    objectStorage: "3 GB",
    blobStorage: "5 GB",
    blobWrites: "1M sync-ops / mo",
  },
  {
    seats: "Indie Tier",
    objectStorage: "10 GB",
    blobStorage: "25 GB",
    blobWrites: "5M sync-ops / mo",
  },
  {
    seats: "Pro Tier",
    objectStorage: "50 GB",
    blobStorage: "100 GB",
    blobWrites: "25M sync-ops / mo",
  },
  {
    seats: "Gold Tier",
    objectStorage: "200 GB",
    blobStorage: "500 GB",
    blobWrites: "100M sync-ops / mo",
  },
]

// Additional storage pricing
const additionalStorageData: AdditionalStorage[] = [
  {
    storageType: "Postgres Database Storage (overage)",
    storageCost: "€0.15 / extra GB / mo ($0.18 for USD)",
    syncCosts: "€0.12 / extra GB / mo on Gold ($0.14 for USD)",
  },
  {
    storageType: "Blob Storage / Files (overage)",
    storageCost: "€0.03 / extra GB / mo ($0.035 for USD)",
    syncCosts: "€0.025 / extra GB / mo on Gold ($0.03 for USD)",
  },
  {
    storageType: "Sync Operations (overage per 1M ops)",
    storageCost: "Indie: €4 / 1M ($4.5), Pro: €3 / 1M ($3.5)",
    syncCosts: "Gold: €2 / 1M ($2.5)",
  },
]

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
            sectionTitle: "Cloud and on-premises with",
            sectionSubtitle:
              "Fully managed cloud solution for seamless scaling and automatic hosting, or host everything yourself for full control over your backend and infrastructure.",
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
          subtitle="For more details, check out this blog post."
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
  )
}
