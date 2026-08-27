import { Metadata } from "next"

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    image?: string
    url?: string
  }
  structuredData?: object
}

export function generateSEOMetadata(config: SEOConfig): Metadata {
  return {
    metadataBase: new URL("https://dexie.org"),
    title: config.title,
    description: config.description,
    keywords: config.keywords,
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
      title: config.openGraph?.title || config.title,
      description: config.openGraph?.description || config.description,
      url: config.openGraph?.url || config.canonical,
      siteName: "Dexie.js",
      images: [
        {
          url: config.openGraph?.image || "/assets/images/dexie-og-image.jpg",
          width: 1200,
          height: 630,
          alt: config.openGraph?.title || config.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@dexiejs",
      creator: "@dfahlander",
      title: config.openGraph?.title || config.title,
      description: config.openGraph?.description || config.description,
      images: [config.openGraph?.image || "/assets/images/dexie-og-image.jpg"],
    },
    alternates: {
      canonical: config.canonical,
    },
  }
}

// Keyword sets for different content types
export const KEYWORDS = {
  CORE: [
    "dexie.js",
    "indexeddb",
    "offline first database",
    "javascript database",
    "browser database",
    "client side database",
  ],
  FRAMEWORKS: [
    "react offline database",
    "vue offline storage",
    "angular offline database",
    "svelte offline database",
    "progressive web app database",
    "pwa offline storage",
  ],
  SYNC: [
    "real time sync",
    "database synchronization",
    "offline sync",
    "collaborative database",
    "multi device sync",
    "conflict free sync",
  ],
  CLOUD: [
    "dexie cloud",
    "offline first sync",
    "database sync platform",
    "collaborative offline apps",
    "offline authentication",
    "real time collaboration",
  ],
  TECHNICAL: [
    "indexeddb wrapper",
    "local first development",
    "offline first architecture",
    "browser storage solution",
    "client database api",
    "javascript offline storage",
  ],
}

// Generate keywords for specific content types
export function generateKeywords(
  ...keywordSets: (keyof typeof KEYWORDS)[]
): string[] {
  return keywordSets.flatMap((set) => KEYWORDS[set])
}

// Common SEO descriptions
export const DESCRIPTIONS = {
  LANDING:
    "Build fast, offline-first web applications with Dexie.js. The easiest IndexedDB wrapper with real-time sync, authentication, and collaboration. Works with React, Vue, Angular, and any framework. Start local, scale global with zero backend setup.",

  PRODUCT:
    "Discover Dexie.js features: Easy IndexedDB wrapper, reactive queries, and Dexie Cloud for real-time sync. Build offline-first apps with React, Vue, Angular, Svelte. Local-first development made simple with authentication and collaboration.",

  DOCS: "Complete Dexie.js documentation: IndexedDB tutorials, API reference, offline-first patterns, and Dexie Cloud sync guides. Learn to build fast, offline web applications with React, Vue, Angular, and more.",

  CLOUD_DOCS:
    "Complete Dexie Cloud documentation: real-time sync, authentication, access control, and collaborative features for offline-first applications. No backend required - start building with IndexedDB sync today.",

  PRICING:
    "Dexie Cloud pricing: Start free with unlimited users and 1GB storage. Flat-rate plans for Indie, Pro, and Scale starting at $25/month with unlimited users and pay-as-you-grow overages. No seat caps.",

  CONTACT:
    "Get help with Dexie.js and Dexie Cloud. Technical support, sales inquiries, bug reports, and community support. Discord community, GitHub issues, and professional support available.",
}
