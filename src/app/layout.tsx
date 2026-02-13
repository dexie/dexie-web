import type { Metadata } from "next"
import { Geist, Geist_Mono, Roboto } from "next/font/google"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import theme from "../theme"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration"
import OfflineStatusIndicator from "../components/OfflineStatusIndicator"
import CookieConsentManager from "../components/CookieConsentManager"
import "./globals.css"
import "../../public/assets/css/prism.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://dexie.org"),
  title: {
    default:
      "Dexie.js - The IndexedDB Wrapper for JavaScript | Offline-First Database",
    template: "%s | Dexie.js - Offline-First Database for JavaScript",
  },
  description:
    "Dexie.js is the easiest way to use IndexedDB. Build offline-first web apps with real-time sync, authentication, and collaboration. Works with React, Vue, Angular, and any JavaScript framework.",
  keywords: [
    "dexie",
    "dexie.js",
    "indexeddb",
    "offline first database",
    "javascript database",
    "browser database",
    "offline sync",
    "local first",
    "pwa database",
    "react offline",
    "vue offline",
    "angular offline",
    "client side database",
    "indexeddb wrapper",
    "offline storage",
    "real time sync",
    "collaborative apps",
    "progressive web app",
  ],
  authors: [{ name: "David Fahlander" }, { name: "Dexie.js Team" }],
  creator: "David Fahlander",
  publisher: "Dexie.js",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dexie.org",
    siteName: "Dexie.js",
    title:
      "Dexie.js - The IndexedDB Wrapper for JavaScript | Offline-First Database",
    description:
      "Build offline-first web apps with Dexie.js. Easy IndexedDB wrapper with real-time sync, authentication, and collaboration. Works with React, Vue, Angular.",
    images: [
      {
        url: "/assets/images/dexie-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dexie.js - Offline-First Database for JavaScript",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dexiejs",
    creator: "@dfahlander",
    title: "Dexie.js - The IndexedDB Wrapper for JavaScript",
    description:
      "Build offline-first web apps with Dexie.js. Easy IndexedDB wrapper with real-time sync and collaboration.",
    images: ["/assets/images/dexie-og-image.jpg"],
  },
  alternates: {
    canonical: "https://dexie.org",
  },
  category: "technology",
  icons: {
    icon: "/favicon.ico",
  },
}

// Generate structured data as a JSON string to prevent RSC serialization
const structuredDataJson = '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Dexie.js","description":"IndexedDB wrapper library for offline-first web applications with real-time sync capabilities","url":"https://dexie.org","applicationCategory":"DeveloperApplication","operatingSystem":"Web Browser","programmingLanguage":"JavaScript","author":{"@type":"Person","name":"David Fahlander","url":"https://github.com/dfahlander"},"publisher":{"@type":"Organization","name":"Awarica AB","address":{"@type":"PostalAddress","addressCountry":"SE","addressLocality":"Stockholm"}},"softwareVersion":"4.0","downloadUrl":"https://www.npmjs.com/package/dexie","license":"https://github.com/dexie/Dexie.js/blob/master/LICENSE","codeRepository":"https://github.com/dexie/Dexie.js","installUrl":"https://www.npmjs.com/package/dexie","screenshot":"https://dexie.org/assets/images/dexie-hero-og.jpg","offers":[{"@type":"Offer","name":"Dexie.js Open Source","price":"0","priceCurrency":"USD","description":"Free IndexedDB wrapper library"},{"@type":"Offer","name":"Dexie Cloud Free","price":"0","priceCurrency":"USD","description":"Free tier with 3 production users and 100MB storage"},{"@type":"Offer","name":"Dexie Cloud Production","price":"0.12","priceCurrency":"USD","description":"Production tier starting at $0.12 per user per month"}],"featureList":["Offline-first database","IndexedDB wrapper","Real-time synchronization","Authentication system","Collaborative features","React integration","Vue.js support","Angular compatibility","Progressive Web App support"]}'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Documentation Guide" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredDataJson,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CookieConsentManager gaId="G-7W0YET4Q10">
          <ServiceWorkerRegistration />
          <OfflineStatusIndicator />
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Navbar />
              {children}
              <Footer />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </CookieConsentManager>
      </body>
    </html>
  )
}
