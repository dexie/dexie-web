import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://dexie.org"),
  title: "Dexie.js Features - IndexedDB Wrapper & Dexie Cloud Sync Platform",
  description:
    "Discover Dexie.js features: Easy IndexedDB wrapper, reactive queries, and Dexie Cloud for real-time sync. Build offline-first apps with React, Vue, Angular, Svelte. Local-first development made simple with authentication and collaboration.",
  keywords: [
    "dexie.js features",
    "indexeddb wrapper benefits",
    "dexie cloud sync",
    "offline first framework",
    "javascript database features",
    "react offline database",
    "vue offline database",
    "angular offline storage",
    "svelte offline database",
    "local first development",
    "browser database sync",
    "real time database sync",
    "offline collaboration",
    "indexeddb react hooks",
    "javascript client database",
    "progressive web app storage",
    "offline first architecture",
    "browser storage solution",
  ],
  openGraph: {
    title: "Dexie.js Features - The Smarter Way to Use IndexedDB",
    description:
      "Easy IndexedDB wrapper with reactive queries + Dexie Cloud for real-time sync. Works with any JavaScript framework. Local-first development simplified.",
    url: "https://dexie.org/product",
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
    title: "Dexie.js Features - IndexedDB Wrapper & Cloud Sync",
    description:
      "Easy IndexedDB wrapper + Cloud sync. Works with React, Vue, Angular, Svelte. Local-first development made simple.",
    images: ["/assets/images/og-images/og-base.png"],
  },
  alternates: {
    canonical: "https://dexie.org/product",
  },
}

import { Box, Typography, Button, Divider } from "@mui/material"
import CodeIcon from "@mui/icons-material/Code"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import CustomProductHero from "./CustomProductHero"
import Benefits, {
  BenefitItem,
} from "@/components/content/Benefits/BenefitsWidget"
import CallToActionWidget from "@/components/content/CallToActionWidget"
import BlogPostsWidget from "@/components/content/BlogPostsWidget"
import { blogPostsData } from "../page"
import CodeBlock from "@/components/content/shared/CodeBlock"

// Why Dexie.js? - Benefits data
const dexieJsBenefits: BenefitItem[] = [
  {
    id: 1,
    className: "col-md-6 col-lg-4 d-flex align-items-stretch mb-sm-30",
    title: "The Smarter IndexedDB",
    description:
      "Dexie is a lightweight API over IndexedDB that removes callback complexity and exposes a promise/async-friendly API.",
    keyPoints: [
      "Less code, better error handling",
      "Higher readability",
      "Promise-based operations",
    ],
    svgPath:
      "M24 11.374c0 4.55-3.783 6.96-7.146 6.796-.151 1.448.061 2.642.384 3.641l-3.72 1.189c-.338-1.129-.993-3.822-2.752-5.279-2.728.802-4.969-.646-5.784-2.627-2.833.046-4.982-1.836-4.982-4.553 0-4.199 4.604-9.541 11.99-9.541 7.532 0 12.01 5.377 12.01 10.374zm-21.992-1.069c-.145 2.352 2.179 3.07 4.44 2.826.336 2.429 2.806 3.279 4.652 2.396 1.551.74 2.747 2.37 3.729 4.967l.002.006.111-.036c-.219-1.579-.09-3.324.36-4.528 3.907.686 6.849-1.153 6.69-4.828-.166-3.829-3.657-8.011-9.843-8.109-6.302-.041-9.957 4.255-10.141 7.306zm8.165-2.484c-.692-.314-1.173-1.012-1.173-1.821 0-1.104.896-2 2-2s2 .896 2 2c0 .26-.05.509-.141.738 1.215.911 2.405 1.855 3.6 2.794.424-.333.96-.532 1.541-.532 1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5c-1.171 0-2.155-.807-2.426-1.895-1.201.098-2.404.173-3.606.254-.17.933-.987 1.641-1.968 1.641-1.104 0-2-.896-2-2 0-1.033.784-1.884 1.79-1.989.12-.731.252-1.46.383-2.19zm2.059-.246c-.296.232-.66.383-1.057.417l-.363 2.18c.504.224.898.651 1.079 1.177l3.648-.289c.047-.267.137-.519.262-.749l-3.569-2.736z",
  },
  {
    id: 2,
    className: "col-md-6 col-lg-4 d-flex align-items-stretch mb-sm-30",
    title: "Built-in Reactivity",
    description:
      "liveQuery() keeps UI in sync with DB in real-time – components update when relevant records change, even across multiple tabs.",
    keyPoints: [
      "Real-time UI updates",
      "Cross-tab synchronization",
      "Automatic re-rendering",
    ],
    svgPath:
      "M18 15.422v.983c0 .771-1.862 1.396-4 1.396s-4-.625-4-1.396v-.983c.968.695 2.801.902 4 .902 1.202 0 3.035-.208 4-.902zm-4-1.363c-1.202 0-3.035-.209-4-.902v.973c0 .771 1.862 1.396 4 1.396s4-.625 4-1.396v-.973c-.968.695-2.801.902-4 .902zm0-5.86c-2.138 0-4 .625-4 1.396 0 .77 1.862 1.395 4 1.395s4-.625 4-1.395c0-.771-1.862-1.396-4-1.396zm0 3.591c-1.202 0-3.035-.209-4-.902v.977c0 .77 1.862 1.395 4 1.395s4-.625 4-1.395v-.977c-.968.695-2.801.902-4 .902zm-.5-9.79c-5.288 0-9.649 3.914-10.377 9h-3.123l4 5.917 4-5.917h-2.847c.711-3.972 4.174-7 8.347-7 4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5c-3.015 0-5.662-1.583-7.171-3.957l-1.2 1.775c1.916 2.536 4.948 4.182 8.371 4.182 5.797 0 10.5-4.702 10.5-10.5s-4.703-10.5-10.5-10.5z",
  },
  {
    id: 3,
    className: "col-md-6 col-lg-4 d-flex align-items-stretch mb-sm-30",
    title: "Performance & Modeling",
    description:
      "Indexes, transactions, and clear schema definition make it fast to query and safe to write – without wrestling with IndexedDB's raw API.",
    keyPoints: [
      "Optimized querying with indexes",
      "Transaction safety",
      "Clear schema definition",
    ],
    svgPath:
      "M15.91 13.34l2.636-4.026-.454-.406-3.673 3.099c-.675-.138-1.402.068-1.894.618-.736.823-.665 2.088.159 2.824.824.736 2.088.665 2.824-.159.492-.55.615-1.295.402-1.95zm-3.91-10.646v-2.694h4v2.694c-1.439-.243-2.592-.238-4 0zm8.851 2.064l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.927-1.5-1.328zm-18.851 4.242h8v2h-8v-2zm-2 4h8v2h-8v-2zm3 4h7v2h-7v-2zm21-3c0 5.523-4.477 10-10 10-2.79 0-5.3-1.155-7.111-3h3.28c1.138.631 2.439 1 3.831 1 4.411 0 8-3.589 8-8s-3.589-8-8-8c-1.392 0-2.693.369-3.831 1h-3.28c1.811-1.845 4.321-3 7.111-3 5.523 0 10 4.477 10 10z",
  },
]

// Why Dexie Cloud? - Benefits data
const dexieCloudBenefits: BenefitItem[] = [
  {
    id: 1,
    className: "col-md-6 col-lg-4 d-flex align-items-stretch mb-sm-30",
    title: "Local-First Without Backend Building",
    description:
      "Add two-way sync, user auth, and access control on top of Dexie – without having to develop and maintain your own sync API.",
    keyPoints: [
      "No backend development needed",
      "Built-in sync infrastructure",
      "Focus on your app, not plumbing",
    ],
    svgPath:
      "M22 18.055v2.458c0 1.925-4.655 3.487-10 3.487-5.344 0-10-1.562-10-3.487v-2.458c2.418 1.738 7.005 2.256 10 2.256 3.006 0 7.588-.523 10-2.256zm-10-18.055c-5.344 0-10 1.562-10 3.488s4.656 3.487 10 3.487c5.345 0 10-1.562 10-3.487 0-1.926-4.655-3.488-10-3.488zm0 8.975c-3.006 0-7.588-.523-10-2.256v2.44c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.44c-2.418 1.738-7.005 2.256-10 2.256zm-6.023 5.02l-.495 3.473c.373.112.772.215 1.192.308l.505-3.535c-.414-.073-.816-.155-1.202-.246zm8.564.54l-.527 3.706c.429-.03.845-.071 1.251-.12l.529-3.722c-.409.054-.827.099-1.253.136zm2.197-.28l-.53 3.732c.439-.071.862-.153 1.266-.246l.532-3.743c-.407.097-.831.182-1.268.257zm-4.37.384l-.521 3.672c.428 0 .721 0 1.235-.02l.525-3.691c-.408.021-.822.034-1.239.039zm8.353 1.892c.813-.505 1.279-1.087 1.279-1.707v-2.439c-.23.16-.482.313-.755.458l-.524 3.688zm-16.819-3.168l-.468 3.26c.337.195.725.377 1.162.544l.487-3.407c-.395-.114-.804-.249-1.181-.397zm6.314 1.226l-.517 3.629c.399.033.808.057 1.224.073l.521-3.655c-.414-.007-.824-.023-1.228-.047zm-8.216-2.204v2.439c0 .415.21.813.592 1.183l.436-3.024c-.381-.187-.723-.386-1.028-.598zm6.085 1.997l-.51 3.569c.391.067.794.126 1.211.175l.514-3.605c-.413-.038-.819-.084-1.215-.139zm10.88-.636l-.533 3.748c.471-.138.904-.291 1.296-.457l.531-3.737c-.427.17-.808.303-1.294.446z",
  },
  {
    id: 2,
    className: "col-md-6 col-lg-4 d-flex align-items-stretch mb-sm-30",
    title: "Security & Permissions",
    description:
      "Data is private by default; share selectively via 'realms', roles, and members with fine-grained access control.",
    keyPoints: [
      "Private by default",
      "Flexible sharing with realms",
      "Role-based permissions",
    ],
    svgPath:
      "M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z",
  },
  {
    id: 3,
    className: "col-md-6 col-lg-4 d-flex align-items-stretch mb-sm-30",
    title: "Developer Experience",
    description:
      "Start free with OTP login out-of-the-box, scale up as users grow; manage seats in Cloud Manager with transparent pricing.",
    keyPoints: [
      "Free tier for getting started",
      "Built-in authentication",
      "Simple scaling model",
    ],
    svgPath:
      "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 16l-6-2.935v-2.131l6-2.934v2.199l-3.64 1.801 3.64 1.796v2.204zm2-8v2.199l3.64 1.801-3.64 1.796v2.204l6-2.935v-2.131l-6-2.934z",
  },
  {
    id: 4,
    className: "col-md-6 col-lg-4 d-flex align-items-stretch mb-sm-30",
    title: "Deployment Flexibility",
    description:
      "Run as SaaS or self-hosted (Node.js + PostgreSQL) when you need full control over your infrastructure.",
    keyPoints: [
      "SaaS for simplicity",
      "Self-hosted option available",
      "Full infrastructure control",
      "Full source code access available",
    ],
    svgPath:
      "M15 10c3.753 0 3.844 3.922 3.701 4.822 1.033.053 3.299.246 3.299 2.206 0 1.087-.953 1.972-2.125 1.972h-9.75c-1.172 0-2.125-.885-2.125-1.972 0-1.94 2.235-2.151 3.299-2.206-.127-.797-.171-4.822 3.701-4.822zm0-2c-3.004 0-5.45 2.268-5.609 5.123-1.928.333-3.391 1.954-3.391 3.905 0 2.193 1.848 3.972 4.125 3.972h9.75c2.277 0 4.125-1.779 4.125-3.972 0-1.951-1.463-3.572-3.391-3.905-.159-2.855-2.605-5.123-5.609-5.123zm-7.382 3.58c.766-2.932 3.325-5.126 6.445-5.502-.905-1.82-2.828-3.078-5.063-3.078-3.004 0-5.45 2.268-5.609 5.123-1.928.333-3.391 1.954-3.391 3.905 0 2.185 1.835 3.957 4.101 3.97.349-1.959 1.671-3.615 3.517-4.418z",
  },
]

export default function ProductPage() {
  return (
    <>
      {/* Custom Product Hero with Framework Examples */}
      <CustomProductHero />

      {/* Why Dexie.js? Benefits Section */}
      <Benefits
        items={dexieJsBenefits}
        settings={{
          textColor: "var(--dexie-text)",
          backgroundColor: "var(--dexie-bg)",
          containerWidth: "big",
          sectionTitle: "What is Dexie.js?",
          sectionSubtitle: "The Smarter Way to Use IndexedDB",
        }}
      />

      <Divider />

      {/* Why Dexie Cloud? Benefits Section */}
      <Benefits
        items={dexieCloudBenefits}
        settings={{
          textColor: "var(--dexie-text)",
          backgroundColor: "var(--dexie-bg)",
          containerWidth: "big",
          sectionTitle: "What is Dexie Cloud?",
          sectionSubtitle: "Offline-First Sync Without the Complexity",
        }}
      />

      <Divider />

      {/* Key Benefits Section */}
      <Box
        sx={{
          color: "var(--dexie-text)",
          py: 8,
          pt: 18,
          backgroundImage: `linear-gradient(var(--dexie-hero-overlay), var(--dexie-hero-overlay)), url("/assets/images/dexie-bg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: 3 }}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            sx={{ mb: 2, color: "var(--dexie-bright)" }}
          >
            Why choose Dexie?
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ mb: 6, opacity: 0.8, fontWeight: 300 }}
          >
            Three powerful advantages that make IndexedDB development a breeze
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: 4,
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              mb: 8,
            }}
          >
            {/* Reactive */}
            <Box sx={{ textAlign: "left", p: 3 }}>
              <Box sx={{ mb: 4 }}>
                <svg
                  width="60"
                  height="60"
                  fill="rgba(255, 255, 255, 0.8)"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 18l1.291-4h-4.291l6.584-7-1.375 4h3.791l-6 7zm1.5-16c-5.288 0-9.649 3.914-10.377 9h-3.123l4 5.917 4-5.917h-2.847c.711-3.972 4.174-7 8.347-7 4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5c-3.015 0-5.662-1.583-7.171-3.957l-1.2 1.775c1.916 2.536 4.948 4.182 8.371 4.182 5.797 0 10.5-4.702 10.5-10.5s-4.703-10.5-10.5-10.5z" />
                </svg>
              </Box>
              <Typography variant="h5" sx={{ mb: 2, color: "var(--dexie-bright)" }}>
                Reactive
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Dexie 4 integrates better with front-end frameworks. Query the
                db without boilerplate and let your components mirror the
                database in real time.
              </Typography>
            </Box>

            {/* Easy to learn */}
            <Box sx={{ textAlign: "left", p: 3 }}>
              <Box sx={{ mb: 4 }}>
                <svg
                  width="60"
                  height="60"
                  fill="rgba(255, 255, 255, 0.8)"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.996 23.999h-12.605s.734-3.931.633-5.686c-.041-.724-.161-1.474-.54-2.104-.645-1-2.636-3.72-2.475-7.43.224-5.209 4.693-8.779 10.126-8.779 5.098 0 8.507 3.001 9.858 7.483.328 1.079.311 1.541-.151 2.607l-.006.013 1.751 2.142c.26.381.413.791.413 1.239 0 .547-.233 1.045-.61 1.399-.368.345-.767.452-1.248.642 0 0-.576 2.592-.873 3.291-.7 1.643-1.97 1.659-2.97 1.849-.394.083-.49.133-.681.681-.208.591-.363 1.435-.622 2.653m-4.842-22c-4.285.048-7.74 2.548-8.121 6.488-.192 1.991.463 3.986 1.516 5.705.611 1 1.305 1.592 1.464 3.875.091 1.313-.05 2.636-.241 3.932h8.604c.141-.645.35-1.485.687-2.057.449-.766 1.097-1.099 1.926-1.254.838-.148 1.238-.059 1.489-.785.212-.579.612-2.221.831-3.902 1.203-.335.612-.161 1.671-.559-.206-.234-1.918-2.314-2.045-2.6-.336-.759-.046-1.19.225-1.913.086-.251.06-.357-.009-.613-1.049-3.949-3.891-6.317-7.997-6.317m.52 3c.242.684.312 1.122.841 1.341h.001c.53.221.893-.044 1.543-.353l.953.952c-.312.655-.573 1.016-.354 1.544v.001c.219.528.653.597 1.342.841v1.347c-.681.243-1.123.313-1.342.843-.22.529.043.891.354 1.544l-.953.952c-.657-.313-1.014-.574-1.541-.355h-.001c-.531.222-.601.661-.843 1.343h-1.348c-.242-.684-.312-1.122-.841-1.34l-.001-.001c-.529-.221-.892.043-1.544.353l-.952-.952c.305-.643.574-1.011.353-1.545-.22-.529-.661-.599-1.341-.842v-1.347c.681-.242 1.121-.312 1.341-.841.22-.531-.042-.891-.353-1.545l.952-.952c.657.312 1.015.573 1.544.353h.001c.529-.219.599-.661.841-1.341h1.348zm-.674 6.667c-.92 0-1.667-.746-1.667-1.667s.747-1.667 1.667-1.667 1.666.746 1.666 1.667-.746 1.667-1.666 1.667" />
                </svg>
              </Box>
              <Typography variant="h5" sx={{ mb: 2, color: "var(--dexie-bright)" }}>
                Easy to learn
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Dexie was written to be straightforward and easy to learn. If
                you&apos;ve ever had to work with native IndexedDB then
                you&apos;ll certainly appreciate Dexie&apos;s concise API.
              </Typography>
            </Box>

            {/* Easy to sync */}
            <Box sx={{ textAlign: "left", p: 3 }}>
              <Box sx={{ mb: 4 }}>
                <svg
                  width="60"
                  height="60"
                  fill="rgba(255, 255, 255, 0.8)"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.408 21h-9.908c-3.037 0-5.5-2.463-5.5-5.5 0-2.702 1.951-4.945 4.521-5.408.212-3.951 3.473-7.092 7.479-7.092 3.267 0 6.037 2.089 7.063 5.003l-.063-.003c-.681 0-1.336.102-1.958.283-.878-2.025-2.73-3.283-5.042-3.283-3.359 0-5.734 2.562-5.567 6.78-1.954-.113-4.433.923-4.433 3.72 0 1.93 1.57 3.5 3.5 3.5h7.76c.566.81 1.3 1.49 2.148 2zm2.257-8.669c.402-.206.852-.331 1.335-.331 1.455 0 2.67 1.042 2.941 2.418l1.96-.398c-.456-2.291-2.475-4.02-4.901-4.02-.957 0-1.845.278-2.604.745l-1.396-1.745-1 5h5l-1.335-1.669zm5.335 8.669l-1.396-1.745c-.759.467-1.647.745-2.604.745-2.426 0-4.445-1.729-4.901-4.02l1.96-.398c.271 1.376 1.486 2.418 2.941 2.418.483 0 .933-.125 1.335-.331l-1.335-1.669h5l-1 5z" />
                </svg>
              </Box>
              <Typography variant="h5" sx={{ mb: 2, color: "var(--dexie-bright)" }}>
                Easy to sync
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                With only a few lines of extra code, you can build a consistent,
                authenticated and access controlled local-first app!
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* 4-Step Guide */}
      <Box
        sx={{
          color: "var(--dexie-text)",
          py: 8,
        }}
        id="from-local-to-global"
      >
        <Box sx={{ maxWidth: "1400px", margin: "0 auto", px: 3 }}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            sx={{ mb: 2, color: "var(--dexie-bright)" }}
          >
            From local to global in 4 steps
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ mb: 6, opacity: 0.8, fontWeight: 300 }}
          >
            Start local, add reactivity and scale with sync and collaboration
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: 4,
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              alignItems: "start",
            }}
          >
            {/* Step 1: Declare your database */}
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    color: "var(--dexie-bright)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      border: "2px solid rgba(255,255,255, 0.5)",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 2,
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                    1
                  </Box>
                  Declare your database
                </Typography>
              </Box>
              <Box sx={{ zoom: 0.8, overflow: { xs: "auto", md: "hidden" } }}>
                <CodeBlock
                  language="javascript"
                  showLineNumbers={true}
                  code={`const db = new Dexie('MyDatabase');

// Declare tables, IDs and indexes
db.version(1).stores({
  friends: 'id, name, age'
});`}
                />
              </Box>
            </Box>

            {/* Step 2: Run some queries */}
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    color: "var(--dexie-bright)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      border: "2px solid rgba(255,255,255, 0.5)",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 2,
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                    2
                  </Box>
                  Then run some queries
                </Typography>
              </Box>
              <Box sx={{ zoom: 0.8, overflow: { xs: "auto", md: "hidden" } }}>
                <CodeBlock
                  language="javascript"
                  showLineNumbers={true}
                  code={`// Find some old friends
const oldFriends = await db.friends
  .where('age').above(75)
  .toArray();

// or make a new one
await db.friends.add({
  id: uuidv7(), // import { v7 as uuidv7 } from "uuid"
  name: 'Camilla',
  age: 25,
  street: 'East 13:th Street',
  picture: await getBlob('camilla.png')
});`}
                />
              </Box>
            </Box>

            {/* Step 3: Live Queries */}
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    color: "var(--dexie-bright)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      border: "2px solid rgba(255,255,255, 0.5)",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 2,
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                    3
                  </Box>
                  Live Queries
                </Typography>
              </Box>
              <Box sx={{ zoom: 0.8, overflow: { xs: "auto", md: "hidden" } }}>
                <CodeBlock
                  language="javascript"
                  showLineNumbers={true}
                  code={`import { useLiveQuery } from "dexie-react-hooks";

function FriendList() {
  const friends = useLiveQuery(
    () => db.friends
      .where("age")
      .between(18, 65)
      .toArray()
  );

  return (
    <ul>
      {friends?.map(friend =>
        <li key={friend.id}>
          {friend.name}, {friend.age}
        </li>
      )}
    </ul>
  );
}`}
                />
              </Box>
            </Box>

            {/* Step 4: Sync */}
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    color: "var(--dexie-bright)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      border: "2px solid rgba(255,255,255, 0.5)",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 2,
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                    4
                  </Box>
                  Sync
                </Typography>
              </Box>
              <Box sx={{ zoom: 0.8, overflow: { xs: "auto", md: "hidden" } }}>
                <CodeBlock
                  language="javascript"
                  showLineNumbers={true}
                  code={`import dexieCloud from "dexie-cloud-addon";

const db = new Dexie('SyncedDB', {
  addons: [dexieCloud]
});

db.version(1).stores({
  friends: 'id, name, age'
});

db.cloud.configure({
  databaseUrl: "https://yourdatabase.dexie.cloud",
  requireAuth: true
});

// Now it syncs automatically! 🚀`}
                />
              </Box>
            </Box>
          </Box>

          {/* Progress indicator */}
          <Box sx={{ mt: 6, textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                mb: 4,
              }}
            >
              <Typography variant="body2">Local Storage</Typography>
              <ArrowForwardIcon sx={{ color: "#666" }} />
              <Typography variant="body2">Queries</Typography>
              <ArrowForwardIcon sx={{ color: "#666" }} />
              <Typography variant="body2">Reactivity</Typography>
              <ArrowForwardIcon sx={{ color: "#666" }} />
              <Typography variant="body2">Global Sync</Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrowIcon />}
                color="secondary"
                sx={{ mr: 2, mb: 2 }}
                href="https://jsfiddle.net/dfahlander/w2zqxn49/"
                target="_blank"
              >
                Try in JSFiddle
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<CodeIcon />}
                color="secondary"
                sx={{ mb: 2 }}
                href="/docs/Tutorial"
              >
                Follow Tutorial
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Getting Started Guides */}
      <BlogPostsWidget
        items={blogPostsData}
        sectionTitle="Kickstart with templates"
        sectionSubtitle="From local storage to global sync - choose your path"
        textColor="var(--dexie-text)"
        backgroundColor="var(--dexie-bg)"
        containerWidth="big"
      />

      {/* Call to Action */}
      <CallToActionWidget
        text="Ready to build offline-first apps? Start with Dexie.js for local storage, add Dexie Cloud when you need sync, auth, and collaboration. No backend required."
        buttonText="Start Building"
        textColor="var(--dexie-text)"
        backgroundColor="var(--dexie-bg)"
        containerWidth="big"
      />
    </>
  )
}
