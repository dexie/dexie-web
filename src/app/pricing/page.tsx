import type { Metadata } from "next"
import CallToActionWidget from "@/components/content/CallToActionWidget"
import FAQWidget from "@/components/content/FAQWidget"

export const metadata: Metadata = {
  metadataBase: new URL("https://dexie.org"),
  title: "Dexie Cloud Pricing - Free Offline-First Database with Sync Plans",
  description:
    "Dexie Cloud pricing: Start free with 3 users and 100MB storage. Production plans from $0.12/user/month. On-premises options available. No backend setup required for offline-first apps with real-time sync.",
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
      "Free tier: 3 users, 100MB storage. Production plans from $0.12/user/month. On-premises available. Perfect for offline-first applications.",
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
      "Start free with 3 users. Production plans from $0.12/user/month. On-premises options for full control.",
    images: ["/assets/images/og-images/og-base.png"],
  },
  alternates: {
    canonical: "https://dexie.org/pricing",
  },
}
import PricingWidget, {
  type PricingPlan,
} from "@/components/content/PricingWidget"
import SupportPlansWidget, {
  type SupportPlan,
} from "@/components/content/SupportPlansWidget"
import OpenSourceSupportWidget, {
  type OpenSourceSupportPlan,
} from "@/components/content/OpenSourceSupportWidget"
import PreferredPartnersWidget from "@/components/content/PreferredPartnersWidget"
import PricingTableWidget, {
  type TableColumn,
  type TableRow,
} from "@/components/content/PricingTableWidget"
import StorageLimitsWidget, {
  type StorageLimit,
  type AdditionalStorage,
} from "@/components/content/StorageLimitsWidget"
import { Divider } from "@mui/material"

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
    question: "Free",
    answer:
      "This edition is hosted and forever free. Let your app accept unlimited number of evaluation users and up to 3 production users. An end user's evaluation period will be paused on days when there are no sync requests from that user. After a user's evaluation period ends (30 active days), they can continue using your application offline, but data syncing will stop unless the user is upgraded to production. Upgrading a user can be done manually or programmatically. If more than 3 production seats are needed, existing databases can be upgraded to the Production edition.",
  },
  {
    id: 4,
    question: "Production",
    answer:
      "This edition is hosted and starts at USD $3 per month for 25 seats. It works similarly to the Free edition but with more seats, storage and more generous API rate limits. Continue enjoying free evaluation users on top of the 100 production seats. You control which users occupy production seats via the Dexie Cloud Management app or REST API. Integrate this REST API with the web hooks of your payment gateway (e.g., Stripe, Paypal) to manage seats based on your subscription with customers. When the number of production end users reaches 100, you can manually purchase more seat-packs or let the subscription automatically upgrade or downgrade as needed.",
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
    answer:
      `To replace the default OTP authentication with your own authentication of choice,
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
]

// Cloud pricing plans data
const cloudPlans = [
  {
    id: "free",
    title: "Free",
    subtitle: "Perfect for passion projects & simple websites.",
    price: "$0",
    priceNote: "per month",
    buttonText: "Start for Free",
    buttonLink: {
      url: "/docs/cloud/quickstart",
      querystring: "",
      title: "Start for Free",
      target: "_self",
    },
    sectionTitle: "Get started with:",
    features: [
      { text: "3 production users" },
      {
        text: "50,000 evaluation users",
        subtext: "With user management and authentication.",
      },
      { text: "Online authentication" },
      { text: "10 databases" },
      { text: "10 connections" },
      { text: "Community support" },
      { text: "100 MB storage" },
      {
        text: "Rate limits",
        subtext: "20 requests per second.",
      },
    ],
  },
  {
    id: "pro",
    title: "Pro",
    subtitle: "For scalable production applications.",
    price: "$0.12",
    priceNote: "per user / month",
    buttonText: "Buy Now",
    buttonLink: {
      url: "https://buy.stripe.com/14k9CEgSne5D1BS8ww",
      querystring: "",
      title: "Buy Now",
      target: "_self",
    },
    isPopular: true,
    badge: {
      text: "Popular",
      variant: "outlined" as const,
      color: "#c77dff",
      borderColor: "#c77dff",
    },
    sectionTitle: "Everything in the Free Plan, plus:",
    features: [
      { text: "Unlimited production users" },
      { text: "Unlimited evaluation users" },
      { text: "Unlimited databases" },
      { text: "Email support" },
      {
        text: "Increased rate limits per user"
      },
      {
        text: "Increased storage limits", subtext: "See Storage Limits for details."
      },
    ],
  },
  {
    id: "business",
    title: "Business",
    subtitle: "When you need control over your data and infrastructure.",
    price: "$3,495",
    priceNote: "forever",
    buttonText: "Buy now",
    buttonLink: {
      url: "https://buy.stripe.com/8wM8yAfOjf9HbcsfZ0",
      querystring: "",
      title: "Buy now",
      target: "_self",
    },
    sectionTitle: "Host everything yourself:",
    features: [
      {
        text: "Install on your own server",
        subtext: "Delivered as a Docker image.",
      },
      { text: "No limits or recurring costs" },
      { text: "5 years of updates" },
      { text: "1 year of limited support" },
      { text: "Dedicated account manager" },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    subtitle: "When you need full control, source code and vendor independence.",
    price: "$7,995",
    priceNote: "forever",
    buttonText: "Buy now",
    buttonLink: {
      url: "https://buy.stripe.com/cN21680Tp2mVeoE9AD",
      querystring: "",
      title: "Buy now",
      target: "_self",
    },
    badge: {
      text: "Bestseller",
      variant: "outlined" as const,
      color: "#c77dff",
      borderColor: "#c77dff",
    },
    sectionTitle: "Everything in Business, plus:",
    features: [
      {
        text: "Full source code",
        subtext: "Ten years of problem-solving—delivered to you on day one.",
      },
      {
        text: "Vendor independence",
        subtext:
          "Modify, integrate, and maintain without external dependencies.",
      },
      { text: "1 year of full support" },
      { text: "Priority support" },
      {
        text: "Future-proof investment",
        subtext: "Own your technology stack—no licensing fees, no vendor lock-in, ever.",
      },
    ],
  },
]

// On-premises plans (for future use)
const onPremisesPlans: PricingPlan[] = []

// Support plans data
const supportPlans: SupportPlan[] = [
  {
    title: "Prod Support",
    price: "Included",
    description:
      "This support option is included when subscribing to Dexie Cloud Production (SaaS) and includes email and chat support.",
    features: ["Email support", "Chat support"],
  },
  {
    title: "Business Support",
    price: "$695 / year",
    description:
      "This support option is available for the On-Prem Business Edition. One year of Business Support is included when purchasing Dexie Cloud On-Prem Business.",
    features: [
      "Chat support",
      "Email support",
      "Prioritized tickets",
      "Software updates",
      "Github issues",
    ],
  },
  {
    title: "Enterprise Support",
    price: "$3,495 / year",
    description:
      "Every customer is different and require different levels of support. With the Gold Support package, we can dedicate our support to your team, tailor SLAs and be available at the levels of customer's requirements.",
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
    ctaHref: "mailto:business@dexie.org?subject=Dexie.js Starter Support",
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
    ctaHref: "mailto:business@dexie.org?subject=Dexie.js Professional Support",
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
    ctaHref: "mailto:business@dexie.org?subject=Dexie.js Enterprise Support",
  },
]

// Professional Services data
const professionalServices: SupportPlan[] = [
  {
    title: "Kickstart & Onboarding",
    price: "$2,500",
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
    price: "$5,000 - $15,000",
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
  { key: "free", label: "Free (SaaS)", align: "center" },
  { key: "production", label: "Production (SaaS)", align: "center" },
  { key: "onPrem", label: "On-prem Business / Enterprise", align: "center" },
]

const comparisonRows: TableRow[] = [
  {
    feature: "Easy setup: npx dexie-cloud create",
    free: true,
    production: true,
    onPrem: "See docs",
  },
  {
    feature: "All main features included",
    free: true,
    production: true,
    onPrem: true,
  },
  {
    feature: "Customizable authentication",
    free: true,
    production: true,
    onPrem: true,
  },
  {
    feature: "Replaceable authentication",
    free: true,
    production: true,
    onPrem: true,
  },
  {
    feature: "Custom email templates",
    free: false,
    production: true,
    onPrem: true,
  },
  {
    feature: "Vertically scalable",
    free: false,
    production: true,
    onPrem: true,
  },
  {
    feature: "Horizontally scalable",
    free: false,
    production: true,
    onPrem: true,
  },
  {
    feature: "Max Number of databases",
    free: "Unlimited, free",
    production: "Unlimited, free",
    onPrem: "Unlimited",
  },
  {
    feature: "Evaluation users (your end users)",
    free: "Unlimited, free",
    production: "Unlimited, free",
    onPrem: "Unlimited",
  },
  {
    feature: "Demo accounts (for showcasing app)",
    free: "Unlimited, free",
    production: "Unlimited, free",
    onPrem: "Unlimited",
  },
  {
    feature: "Production users (your end users)",
    free: "3 seats, free",
    production: "USD $3/mo per 25 seats",
    onPrem: "Unlimited",
  },
  {
    feature: "Storage",
    free: "100 MB",
    production: "See storage limits",
    onPrem: "Unlimited",
  },
  {
    feature: "Simultaneous Client Connections",
    free: "10",
    production: "200 per 100 users",
    onPrem: "Unlimited",
  },
  {
    feature: "Sync rate-limits",
    free: "50 per 5 mins per user",
    production: "200 per 5 minutes per user",
    onPrem: "Configurable",
  },
  {
    feature: "Software updates (client)",
    free: "✔ (via npm)",
    production: "✔ (via npm)",
    onPrem: "✔ (via npm)",
  },
  {
    feature: "Software updates (server)",
    free: "N/A",
    production: "N/A",
    onPrem: "✔ (via git, npm or download)",
  },
  {
    feature: "Full source code",
    free: false,
    production: false,
    onPrem: "On-Prem Gold",
  },
  {
    feature: "Access to private Git repo",
    free: false,
    production: false,
    onPrem: "On-Prem Gold",
  },
  {
    feature: "Support options",
    free: "Github or Stackoverflow",
    production: "Email / chat",
    onPrem: "Silver- or Gold Support",
  },
]

// Storage limits data
const storageLimits: StorageLimit[] = [
  {
    seats: "Free edition",
    objectStorage: "25 MB",
    blobStorage: "75 MB",
    blobWrites: "1,000 / mo",
  },
  {
    seats: "25",
    objectStorage: "1 GB",
    blobStorage: "20 GB",
    blobWrites: "50,000 / mo",
  },
  {
    seats: "50",
    objectStorage: "2 GB",
    blobStorage: "40 GB",
    blobWrites: "100,000 / mo",
  },
  {
    seats: "75",
    objectStorage: "3 GB",
    blobStorage: "60 GB",
    blobWrites: "150,000 / mo",
  },
  {
    seats: "100",
    objectStorage: "4 GB",
    blobStorage: "80 GB",
    blobWrites: "200,000 / mo",
  },
  { seats: "...", objectStorage: "...", blobStorage: "...", blobWrites: "..." },
  {
    seats: "1,000",
    objectStorage: "20 GB",
    blobStorage: "800 GB",
    blobWrites: "2,000,000 / mo",
  },
  {
    seats: "10,000",
    objectStorage: "200 GB",
    blobStorage: "8 TB",
    blobWrites: "20,000,000 / mo",
  },
  {
    seats: "100,000",
    objectStorage: "2 TB",
    blobStorage: "80 TB",
    blobWrites: "200,000,000 / mo",
  },
]

// Additional storage pricing
const additionalStorageData: AdditionalStorage[] = [
  {
    storageType: "Blob Storage",
    storageCost: "USD $0.05 / extra GB / mo",
    syncCosts: "USD $0.5 per 10,000 additional write operations",
  },
  {
    storageType: "Object Storage",
    storageCost: "USD $2 / extra GB / mo",
    syncCosts: "-",
  },
]

export default function PricingPage() {
  return (
    <>
      {/* Pricing Widget */}
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

      <Divider />

      {/* Dexie.js Open Source Support */}
      <OpenSourceSupportWidget
        plans={openSourceSupportPlans}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "Dexie.js Professional Support",
          sectionSubtitle:
            "Direct support from the author and core team — for teams building production applications on Dexie.js open source.",
          note:
            "All plans are annual subscriptions invoiced upfront. Response times apply during CET business hours (Mon–Fri). Contact us to discuss your needs — we're happy to tailor a package.",
        }}
      />

      <Divider />

      {/* Support Plans Section */}
      <SupportPlansWidget
        plans={supportPlans}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "Support Options",
          sectionSubtitle:
            "Choose the right level of support for your team and requirements",
        }}
      />
      <Divider />

      {/* Detailed Pricing Table Section */}
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
      <Divider />

      {/* Storage Limits Section */}
      <StorageLimitsWidget
        storageLimits={storageLimits}
        additionalStorage={additionalStorageData}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
        }}
      />
      <Divider />

      {/* Professional Services Section */}
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
      <Divider />

      {/* Preferred Partners Section */}
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
      <Divider />

      {/* FAQ Section */}
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
      <Divider />

      {/* Call to Action Section */}
      <CallToActionWidget
        text="Join thousands of developers building amazing offline-first applications with Dexie."
        title="Ready to Get Started?"
        buttonText="Start Free"
        textColor="#dee2e6"
        backgroundColor="#000000"
        containerWidth="big"
      />
    </>
  )
}
