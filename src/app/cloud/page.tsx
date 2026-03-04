import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Dexie Cloud \u2014 Turn Your App into a SaaS in Minutes | Offline-First Sync Platform",
  description:
    "The fastest way to add sync, authentication, access control, and multi-user collaboration to your app. No backend needed. True offline-first. Start free, scale to millions.",
  keywords: [
    "dexie cloud",
    "offline-first sync",
    "local-first database",
    "saas platform",
    "turn app into saas",
    "sync service javascript",
    "offline collaboration",
    "real-time sync",
    "database synchronization",
    "authentication service",
    "access control",
    "multi-user sync",
    "collaborative apps",
    "offline-first platform",
    "indexeddb sync",
    "progressive web app sync",
    "no backend required",
    "firebase alternative",
    "supabase alternative",
    "offline first saas",
    "build saas without backend",
    "y.js sync",
    "crdt collaboration",
  ],
  openGraph: {
    title: "Dexie Cloud \u2014 Turn Your App into a SaaS in Minutes",
    description:
      "Add sync, auth, and collaboration to your app in minutes. No backend development needed. The world's best offline-first sync platform.",
    url: "https://dexie.org/cloud",
    images: [
      {
        url: "/assets/images/og-images/og-base.png",
        width: 1200,
        height: 630,
        alt: "Dexie Cloud \u2014 Offline-first sync made simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dexie Cloud \u2014 Turn Your App into a SaaS in Minutes",
    description:
      "Add sync, auth, and collaboration to your app in minutes. No backend. True offline-first. Start free.",
    images: ["/assets/images/og-images/og-base.png"],
  },
  alternates: {
    canonical: "https://dexie.org/cloud",
  },
};

import { Box, Typography, Divider, Button, Chip } from "@mui/material";
import HeroWidget from "@/components/content/hero/HeroWidget";
import Benefits, {
  BenefitItem,
} from "@/components/content/Benefits/BenefitsWidget";
import CodeBlock from "@/components/content/shared/CodeBlock";
import TestimonialsWidget, {
  TestimonialItem,
} from "@/components/content/TestimonialsWidget";
import BlogPostsWidget, {
  BlogPostItem,
} from "@/components/content/BlogPostsWidget";
import FeatureScreenshotWidget from "@/components/content/FeatureScreenshotWidget";
import FAQWidget from "@/components/content/FAQWidget";
import TypeWriter from "@/components/content/shared/TypeWriter";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

// --- Benefits: 6 key capabilities ---
const capabilities: BenefitItem[] = [
  {
    id: 1,
    className: "col-md-6 col-lg-4",
    title: "Automatic Two-Way Sync",
    description:
      "Write data to IndexedDB with Dexie \u2014 it syncs to the cloud and to every device automatically. No API endpoints, no polling, no WebSocket boilerplate.",
    keyPoints: [
      "Real-time push via WebSocket",
      "Resilient incremental sync",
      "Works across tabs & devices",
    ],
    svgPath:
      "M15.408 21h-9.908c-3.037 0-5.5-2.463-5.5-5.5 0-2.702 1.951-4.945 4.521-5.408.212-3.951 3.473-7.092 7.479-7.092 3.267 0 6.037 2.089 7.063 5.003l-.063-.003c-.681 0-1.336.102-1.958.283-.878-2.025-2.73-3.283-5.042-3.283-3.359 0-5.734 2.562-5.567 6.78-1.954-.113-4.433.923-4.433 3.72 0 1.93 1.57 3.5 3.5 3.5h7.76c.566.81 1.3 1.49 2.148 2zm2.257-8.669c.402-.206.852-.331 1.335-.331 1.455 0 2.67 1.042 2.941 2.418l1.96-.398c-.456-2.291-2.475-4.02-4.901-4.02-.957 0-1.845.278-2.604.745l-1.396-1.745-1 5h5l-1.335-1.669zm5.335 8.669l-1.396-1.745c-.759.467-1.647.745-2.604.745-2.426 0-4.445-1.729-4.901-4.02l1.96-.398c.271 1.376 1.486 2.418 2.941 2.418.483 0 .933-.125 1.335-.331l-1.335-1.669h5l-1 5z",
  },
  {
    id: 2,
    className: "col-md-6 col-lg-4",
    title: "Built-in Authentication",
    description:
      "Passwordless email OTP works out of the box \u2014 zero backend code. Or plug in your own OAuth / custom auth when you are ready.",
    keyPoints: [
      "Email OTP included free",
      "Google, Microsoft, GitHub OAuth",
      "Custom auth integration",
    ],
    svgPath:
      "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 16l-6-2.935v-2.131l6-2.934v2.199l-3.64 1.801 3.64 1.796v2.204zm2-8v2.199l3.64 1.801-3.64 1.796v2.204l6-2.935v-2.131l-6-2.934z",
  },
  {
    id: 3,
    className: "col-md-6 col-lg-4",
    title: "Access Control & Sharing",
    description:
      "Data is private by default. Share selectively via realms, roles, and members. Built-in invitation system with email notifications.",
    keyPoints: [
      "Per-object privacy model",
      "Role-based permissions",
      "Built-in invitation emails",
    ],
    svgPath:
      "M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z",
  },
  {
    id: 4,
    className: "col-md-6 col-lg-4",
    title: "Y.js & Real-Time Collaboration",
    description:
      "Native Y.js integration enables conflict-free collaborative editing. TipTap, tldraw, Monaco Editor \u2014 all work offline and sync seamlessly.",
    keyPoints: [
      "CRDT-based conflict resolution",
      "Awareness protocol support",
      "Works offline, syncs later",
    ],
    svgPath:
      "M17.281 8.991l3.706 1.97-2.261 2.013.011.006 2.25 3.09-2.25 1.228v3.096l-6.75 3.606-6.75-3.606v-3.091l-2.25-1.225 2.234-3.075-2.234-1.966 3.747-2.043c-.108.371-.197.808-.245 1.272l-1.769.964 1.181 1.04.624-.345c.056.339.146.672.279.984l-.823.456 6.028 3.124 5.978-3.119-.812-.451c.145-.299.245-.618.31-.944l.531.293 1.234-1.098-1.707-.907c-.05-.464-.146-.9-.262-1.272zm-4.798 8.217v5.393l5.256-2.807v-1.951l-3.502 1.91-1.754-2.545zm-6.247.639v1.947l5.249 2.804v-5.388l-1.748 2.543-3.501-1.906zm-1.772-2.103l4.96 2.7 1.099-1.599-4.983-2.582-1.076 1.481zm8.989 1.11l1.096 1.59 4.96-2.706-1.073-1.475-4.983 2.591zm-1.199-1.691h-.625l.003-2.728h.625l-.003 2.728zm-1.159-1.424h-.625l.009-1.739h.625l-.009 1.739zm2.358-.014h-.626l-.009-1.725h.625l.01 1.725zm-3.094-2.468l-.318-.734c-.732.269-2.155 2.284-2.155 2.284-1.195-2.607.161-4.846 1.243-5.659-.083-.699-.644-4.168 2.817-7.113l.041-.035.041.035c3.462 2.945 2.901 6.414 2.817 7.113 1.083.813 2.438 3.052 1.243 5.659 0 0-1.423-2.015-2.155-2.284l-.317.734-1.629.005-1.628-.005zm1.628-9.919c-1.093.923-2.432 3.393-1.854 6.223-.726.6-1.58 1.454-1.712 3.089.577-.77 1.419-1.21 2.091-1.356 0 0 .424.782.507.973l.968.003.969-.003c.083-.191.507-.973.507-.973.671.146 1.513.586 2.091 1.356-.133-1.635-.967-2.472-1.693-3.072.586-2.722-.771-5.295-1.861-6.229l-.013-.011zm-.044 5.693c-.284-.001-.515-.231-.515-.516 0-.285.231-.515.515-.515.284 0 .514.23.514.515 0 .285-.23.515-.514.516zm0-1.844c-.569 0-1.029-.462-1.03-1.031.001-.57.461-1.031 1.03-1.031s1.029.461 1.029 1.031c0 .569-.46 1.03-1.029 1.031zm0-1.434c.214 0 .388.174.388.389 0 .215-.174.389-.388.389-.215 0-.389-.174-.389-.389 0-.215.174-.389.389-.389z",
  },
  {
    id: 5,
    className: "col-md-6 col-lg-4",
    title: "Cross-Platform, Any Framework",
    description:
      "Works everywhere JavaScript runs \u2014 React, Vue, Svelte, Angular. Deploy as PWA, Capacitor, Electron, or Tauri app.",
    keyPoints: [
      "Web, mobile & desktop",
      "PWA with service worker",
      "React, Vue, Svelte, Angular",
    ],
    svgPath:
      "M22 10h-1v-2h-11v13h5v1.617c0 .524.121 1.058.502 1.383h-5.002c-.398 0-.779-.158-1.061-.439-.281-.282-.439-.663-.439-1.061v-15c0-.398.158-.779.439-1.061.282-.281.663-.439 1.061-.439h10c.398 0 .779.158 1.061.439.281.282.439.663.439 1.061v2.5zm2 2.25c0-.69-.56-1.25-1.25-1.25h-5.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h5.5c.69 0 1.25-.56 1.25-1.25v-10.5zm-15.407 11.75h-6.593l2.599-3h3.401v1.804c0 .579.337 1.09.593 1.196zm11.407-1c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm3-3v-6.024h-6v6.024h6zm-2-15h-2v-3h-17v15h6v2h-8v-19h21v5zm-.5 7h-1c-.276 0-.5.224-.5.5s.224.5.5.5h1c.275 0 .5-.224.5-.5s-.225-.5-.5-.5z",
  },
  {
    id: 6,
    className: "col-md-6 col-lg-4",
    title: "Self-Hostable & Open Pricing",
    description:
      "Start with our managed SaaS for free. Need full control? Self-host on Node.js + PostgreSQL with full source code access.",
    keyPoints: [
      "Free tier forever",
      "Predictable per-seat pricing",
      "Self-hosted option available",
    ],
    svgPath:
      "M15 10c3.753 0 3.844 3.922 3.701 4.822 1.033.053 3.299.246 3.299 2.206 0 1.087-.953 1.972-2.125 1.972h-9.75c-1.172 0-2.125-.885-2.125-1.972 0-1.94 2.235-2.151 3.299-2.206-.127-.797-.171-4.822 3.701-4.822zm0-2c-3.004 0-5.45 2.268-5.609 5.123-1.928.333-3.391 1.954-3.391 3.905 0 2.193 1.848 3.972 4.125 3.972h9.75c2.277 0 4.125-1.779 4.125-3.972 0-1.951-1.463-3.572-3.391-3.905-.159-2.855-2.605-5.123-5.609-5.123zm-7.382 3.58c.766-2.932 3.325-5.126 6.445-5.502-.905-1.82-2.828-3.078-5.063-3.078-3.004 0-5.45 2.268-5.609 5.123-1.928.333-3.391 1.954-3.391 3.905 0 2.185 1.835 3.957 4.101 3.97.349-1.959 1.671-3.615 3.517-4.418z",
  },
];

// --- Testimonials ---
const testimonials: TestimonialItem[] = [
  {
    quote:
      "After exploring several options, including major players like Firebase, I felt constrained by their complexity and locking structures. I sought a platform that not only fostered creativity but also expanded our possibilities. That\u2019s when I discovered Dexie Cloud. In just one year, I\u2019ve single-handedly built a hybrid web and mobile application for iOS and Android, complete with automatic data synchronization across all devices. What truly sets Dexie Cloud apart is its ability to unleash productivity and nurture creativity. Unlike other platforms, Dexie Cloud doesn\u2019t confine our visions; it expands them.",
    author: "Bennie Forss, Founder of Zenta AB",
    role: "Built To-do \u2014 an AI-driven offline-first task manager with sync across all platforms",
    image: "/assets/images/testimonials/bennie.jpg",
  },
  {
    quote:
      "Offline-first web apps are no longer difficult. Dexie Cloud gave Fablehenge a truly backendless experience and has been essential for our tiny dev team to ship big features like it already happened. It is the perfect abstraction in front of the endless complexity two-way sync normally entails. Just write your data to IndexedDB with Dexie\u2019s best-in-class API. It\u2019ll show up where it\u2019s supposed to. Nothing could be simpler.",
    author: "Dusty Phillips, Founder of Fablehenge",
    role: "Built a collaborative writing app for story writers \u2014 no backend, just Dexie Cloud",
    image: "/assets/images/testimonials/dusty2.jpeg",
  },
  {
    quote:
      "I started using Dexie for my project, and I was worried about integrating user authentication and synchronization into it. However, when I discovered Dexie Cloud, I was amazed at how seamlessly I could integrate it into my app. Within minutes, I had my application fully synchronized and authenticated. The documentation provided by Dexie Cloud was also very helpful.",
    author: "Alba Rincon, Founder of Routickr",
    role: "Built an app that helps users transform goals into lasting habits",
    image: "/assets/images/testimonials/albarin.jpg",
  },
  {
    quote:
      "The speed with which you can start and complete an observation is crucial to whether you will prefer my app to Notes - or even pen and paper - at all. The discovery of Dexie Cloud made me realize that my bird lists could be shared with others and that there were also ready-made code examples on how to manage invitations, rights and similar things.",
    author: "Anton Andreasson, Founder of Birdlist",
    role: "Built an app for birdwatchers to log observations and share lists",
    image: "/assets/images/testimonials/naton2.jpeg",
  },
];

// --- Starter templates ---
const starterTemplates: BlogPostItem[] = [
  {
    id: 1,
    delay: "0.1s",
    imgSrc: "/assets/images/blog/post-prev-1.jpg",
    title: "Dexie Cloud Quickstart",
    text: "A simple but concise Dexie Cloud application, built with vanilla React and Vite. The fastest way to see Dexie Cloud in action.",
    authorImg: "/assets/images/blog/author/author-1.jpg",
    authorName: "David Fahlander",
    date: "August 3",
    link: "/docs/cloud/quickstart#steps",
    keyPoints: [
      "TypeScript + Vite + React",
      "PWA with Service Worker",
      "Offline storage and sync",
      "Auth out of the box",
      "Sharing and access control",
    ],
  },
  {
    id: 2,
    delay: "0.1s",
    imgSrc: "/assets/images/blog/post-prev-1.jpg",
    title: "Dexie Cloud Starter (Next.js)",
    text: "Collaborative note-taking with Y.js and TipTap. Demonstrates rich text editing, image upload, and full-text search \u2014 all synced offline-first.",
    authorImg: "/assets/images/blog/author/author-1.jpg",
    authorName: "David Fahlander",
    date: "August 3",
    link: "https://github.com/dexie/dexie-cloud-starter",
    keyPoints: [
      "Next.js and TypeScript",
      "Conflict-free rich text editing",
      "TipTap + Y.js collaboration",
      "Image upload and storage",
      "Social Authentication",
    ],
  },
  {
    id: 3,
    delay: "0.1s",
    imgSrc: "/assets/images/blog/post-prev-1.jpg",
    title: "SvelteKit Boilerplate",
    text: "A Dexie Cloud application built with SvelteKit. Great starting point for Svelte developers who want offline-first sync.",
    authorImg: "/assets/images/blog/author/author-1.jpg",
    authorName: "Community",
    date: "August 3",
    link: "https://github.com/albarin/sveltekit-dexie-boilerplate",
    keyPoints: [
      "Svelte framework",
      "Built-in authentication",
      "Offline-first architecture",
    ],
  },
];

// --- Feature screenshot slides ---
const featureSlides = [
  {
    id: 1,
    title: "Authentication \u2014 zero backend code",
    description:
      "Branded passwordless login with OAuth providers. No session management, no cookie handling, no backend endpoints to maintain.",
    imageUrl: "/assets/images/feature-screenshots/login.png",
    imageAlt: "Dexie Cloud login screen",
    features: [
      {
        id: 1,
        number: "1",
        title: "Branded Login Experience",
        description:
          "The login screen adapts to your brand while maintaining security standards. Validation and error states are handled automatically.",
        position: { x: 5, y: 8 },
      },
      {
        id: 2,
        number: "2",
        title: "Magic Link Authentication",
        description:
          "Passwordless login with customizable email templates. No password management complexity.",
        position: { x: 50, y: 44.5 },
      },
      {
        id: 3,
        number: "3",
        title: "Social Login Integration",
        description:
          "Google, Microsoft, and GitHub login with automatic token management across all platforms.",
        position: { x: 50, y: 58 },
      },
    ],
  },
  {
    id: 2,
    title: "Sharing & collaboration \u2014 built in",
    description:
      "Dexie\u2019s realm system provides per-object access control. Share with teams or keep private \u2014 all with simple JavaScript objects.",
    imageUrl: "/assets/images/feature-screenshots/share.png",
    imageAlt: "Sharing interface showing collaboration features",
    features: [
      {
        id: 6,
        number: "1",
        title: "Per-Object Access Control",
        description:
          "Each item can be private, shared with teams, or public \u2014 controlled by simple JavaScript objects.",
        position: { x: 28, y: 11.5 },
      },
      {
        id: 7,
        number: "2",
        title: "Instant Collaboration",
        description:
          "Team members receive built-in invitation emails and in-app notifications. Real-time updates follow automatically.",
        position: { x: 36, y: 64 },
      },
      {
        id: 8,
        number: "3",
        title: "Zero Setup Sharing",
        description:
          "No servers, no permission databases \u2014 just built-in collaborative features that work immediately.",
        position: { x: 64, y: 83 },
      },
    ],
  },
  {
    id: 3,
    title: "Reactive live queries",
    description:
      "useLiveQuery keeps your UI perfectly in sync with your database. Changes propagate instantly \u2014 even across browser tabs.",
    imageUrl: "/assets/images/feature-screenshots/today.png",
    imageAlt: "Reactive interface showing live data updates",
    features: [
      {
        id: 3,
        number: "1",
        title: "Automatic UI Updates",
        description:
          "useLiveQuery hooks provide real-time UI updates when data changes, across tabs and devices.",
        position: { x: 17, y: 10 },
      },
      {
        id: 4,
        number: "2",
        title: "Optimistic Updates",
        description:
          "Changes appear immediately in the UI while syncing with Dexie Cloud in the background.",
        position: { x: 72, y: 40 },
      },
      {
        id: 5,
        number: "3",
        title: "Offline-First Architecture",
        description:
          "All operations work locally first, then sync seamlessly when connectivity returns.",
        position: { x: 25, y: 90 },
      },
    ],
  },
  {
    id: 4,
    title: "Subscription & payment integration",
    description:
      "Manage users, evaluation periods, and payment integration with Stripe and RevenueCat.",
    imageUrl: "/assets/images/feature-screenshots/account.png",
    imageAlt: "Account management interface",
    features: [
      {
        id: 3,
        number: "1",
        title: "Built-in Evaluation Periods",
        description:
          "Configurable trial periods with pausable or fixed duration. Control how new users experience your app.",
        position: { x: 36, y: 27 },
      },
      {
        id: 4,
        number: "2",
        title: "Payment Integration",
        description:
          "Stripe for web, RevenueCat for iOS/Android. Unified payment handling across all platforms.",
        position: { x: 63, y: 67 },
      },
      {
        id: 5,
        number: "3",
        title: "Seat Management",
        description:
          "Manage production seats via Cloud Manager or REST API. Integrate with payment gateway webhooks.",
        position: { x: 50, y: 88 },
      },
    ],
  },
];

// --- FAQ ---
const faqItems = [
  {
    id: 1,
    question: "Do I need to build a backend?",
    answer:
      "No. Dexie Cloud provides sync, authentication, access control, and user management out of the box. Your app can be hosted on any static web server or CDN. If you have an existing backend, Dexie Cloud integrates with it via REST API and webhooks \u2014 but it is completely optional.",
  },
  {
    id: 2,
    question: "How does offline sync actually work?",
    answer:
      "Your app writes data to IndexedDB via Dexie.js. The dexie-cloud-addon intercepts changes and syncs them incrementally with the cloud server. When online, sync happens in real-time via WebSocket. When offline, changes queue locally and sync automatically when connectivity returns. The sync protocol preserves consistency by sending where-expressions alongside operations.",
  },
  {
    id: 3,
    question: "Can I use my own authentication?",
    answer:
      "Yes. Dexie Cloud ships with built-in passwordless email OTP, but you can replace it with your own OAuth provider, custom token endpoint, or any authentication solution. See /docs/cloud/db.cloud.configure() for integration details.",
  },
  {
    id: 4,
    question: "How does pricing work?",
    answer:
      "The Free tier includes 3 production users and 100 MB storage \u2014 forever free. Production plans start at 3 euros per month for 25 seats. Pricing is per-seat, so you know exactly what you will pay. No surprise bills. Evaluation users are always free and unlimited. See /pricing for full details.",
  },
  {
    id: 5,
    question: "Is Dexie Cloud production-ready?",
    answer:
      "Yes. Dexie.js has 11,800+ GitHub stars and is used by 100,000+ developers, including teams at companies building mission-critical applications. Dexie Cloud is used in production by multiple SaaS companies for task management, note-taking, field data collection, and collaborative editing.",
  },
  {
    id: 6,
    question: "Can I self-host Dexie Cloud?",
    answer:
      "Yes. The on-premises option runs on Node.js + PostgreSQL. You can purchase the server software (optionally with full source code access) and host it on AWS, Azure, your own hardware, or any cloud provider. The On-Prem Silver includes the binary, On-Prem Gold includes full source code and private Git access.",
  },
  {
    id: 7,
    question: "How does Dexie Cloud compare to Firebase or Supabase?",
    answer:
      "Firebase and Supabase are online-first platforms where the server is the source of truth. Dexie Cloud is offline-first \u2014 your app works completely without internet, and sync is a bonus. This means instant UI, zero loading spinners, and true offline capability. Plus, Dexie Cloud requires no backend code at all, while Firebase and Supabase require server-side configuration and custom security rules.",
  },
  {
    id: 8,
    question: "What about GDPR and data privacy?",
    answer:
      "Dexie Cloud is GDPR-compliant. Data is private by default \u2014 users own their data and it is only shared when they explicitly allow it. For full data sovereignty, you can self-host the entire infrastructure. See /docs/cloud/gdpr-compliance for details.",
  },
];

// --- Comparison data ---
const comparisonRows = [
  {
    feature: "Offline-first by design",
    dexie: true,
    traditional: false,
    firebase: false,
  },
  {
    feature: "Zero backend code needed",
    dexie: true,
    traditional: false,
    firebase: false,
  },
  {
    feature: "Built-in auth (OTP + OAuth)",
    dexie: true,
    traditional: false,
    firebase: true,
  },
  {
    feature: "Per-object access control",
    dexie: true,
    traditional: false,
    firebase: false,
  },
  {
    feature: "Y.js / CRDT collaboration",
    dexie: true,
    traditional: false,
    firebase: false,
  },
  {
    feature: "Self-hostable",
    dexie: true,
    traditional: true,
    firebase: false,
  },
  {
    feature: "Predictable pricing",
    dexie: true,
    traditional: true,
    firebase: false,
  },
  {
    feature: "Instant UI (no loading spinners)",
    dexie: true,
    traditional: false,
    firebase: false,
  },
];

export default function DexieCloudPage() {
  return (
    <>
      {/* SECTION 1 - HERO */}
      <HeroWidget
        preHeading="DEXIE CLOUD"
        heading={
          <>
            Turn Your App into a SaaS
            <br />
            <TypeWriter
              colorClass=""
              strings={[
                "in Minutes",
                "with Sync",
                "with Auth",
                "with Sharing",
                "with Offline Support",
                "with Collaboration",
                "without a Backend",
              ]}
            />
          </>
        }
        text="Add sync, authentication, and multi-user collaboration to your Dexie.js app \u2014 no backend needed. The world's most developer-friendly offline-first sync platform. Start free."
        background={"/assets/images/dexie-bg.jpg"}
        buttons={[
          {
            text: "Start Building Free",
            link: {
              url: "/docs/cloud/quickstart",
              querystring: "",
              title: "Start Building Free",
              target: "_self",
            },
            icon: <RocketLaunchIcon />,
            variant: "contained",
            color: "primary",
            size: "large",
          },
          {
            text: "See How It Works",
            link: {
              url: "#from-app-to-saas",
              querystring: "",
              title: "See How It Works",
              target: "_self",
            },
            icon: <PlayArrowIcon />,
            variant: "text",
            color: "inherit",
            size: "large",
          },
        ]}
        settings={{
          textColor: "#ffffff",
          containerWidth: "big",
          height: "90vh",
          textAlignment: "center",
          verticalTextAlignment: "center",
          overlayStrength: "85%",
        }}
      />

      {/* SECTION 2 - TRUST BAR / STATS */}
      <Box
        sx={{
          background: "#000",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          py: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            px: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: { xs: 3, md: 6 },
          }}
        >
          {[
            { value: "11.8K+", label: "GitHub Stars" },
            { value: "100K+", label: "Developers" },
            { value: "4M+", label: "npm Downloads" },
            { value: "0", label: "Backend Code Needed" },
          ].map((stat) => (
            <Box key={stat.label} sx={{ textAlign: "center", minWidth: 120 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg, #7b2cbf 0%, #c77dff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  mb: 0.5,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.5)", fontWeight: 500 }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* SECTION 3 - PROBLEM to SOLUTION */}
      <Box
        sx={{
          background:
            "linear-gradient(180deg, #000000 0%, #0a0a1a 50%, #000000 100%)",
          color: "#fff",
          py: { xs: 8, md: 12 },
        }}
      >
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: 3 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.8rem" },
            }}
          >
            Building a SaaS is hard.
            <br />
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(135deg, #7b2cbf 0%, #c77dff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              It doesn&apos;t have to be.
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mb: 8,
              color: "rgba(255,255,255,0.6)",
              maxWidth: "700px",
              margin: "0 auto",
              fontWeight: 300,
              pb: 6,
            }}
          >
            The traditional way to build a multi-user app requires months of
            backend work. Dexie Cloud replaces all of that with a single addon.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr auto 1fr" },
              gap: { xs: 4, md: 3 },
              alignItems: "start",
            }}
          >
            {/* Traditional way */}
            <Box
              sx={{
                background: "rgba(255,50,50,0.05)",
                border: "1px solid rgba(255,50,50,0.15)",
                borderRadius: 3,
                p: 4,
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: "rgba(255,100,100,0.8)", letterSpacing: 2 }}
              >
                The traditional way
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                Months of backend work
              </Typography>
              {[
                "Design & build REST/GraphQL API",
                "Set up authentication service",
                "Implement sync protocol",
                "Build access control layer",
                "Handle offline & conflict resolution",
                "Deploy & maintain servers",
                "Manage database infrastructure",
                "Handle WebSocket connections",
              ].map((item) => (
                <Box
                  key={item}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1.5,
                    gap: 1.5,
                  }}
                >
                  <Typography sx={{ color: "rgba(255,100,100,0.6)" }}>
                    &#x2715;
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* VS divider */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                pt: 12,
              }}
            >
              <Chip
                label="VS"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
            </Box>

            {/* Dexie Cloud way */}
            <Box
              sx={{
                background: "rgba(123,44,191,0.08)",
                border: "1px solid rgba(123,44,191,0.3)",
                borderRadius: 3,
                p: 4,
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: "#c77dff", letterSpacing: 2 }}
              >
                The Dexie Cloud way
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: 600, color: "#fff" }}
              >
                Minutes of configuration
              </Typography>
              {[
                "Install dexie-cloud-addon",
                "Run npx dexie-cloud create",
                "Add 3 lines of configuration",
                "Auth works immediately",
                "Sync works immediately",
                "Access control built in",
                "Offline support built in",
                "Ship your SaaS",
              ].map((item, i) => (
                <Box
                  key={item}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1.5,
                    gap: 1.5,
                  }}
                >
                  <CheckCircleOutlineIcon
                    sx={{
                      fontSize: 18,
                      color: i === 7 ? "#4ade80" : "#c77dff",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        i === 7 ? "#4ade80" : "rgba(255,255,255,0.85)",
                      fontWeight: i === 7 ? 600 : 400,
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* SECTION 4 - FROM APP TO SAAS IN 4 STEPS */}
      <Box
        id="from-app-to-saas"
        sx={{
          background:
            "linear-gradient(180deg, #000000 0%, #0f0f23 50%, #000000 100%)",
          color: "#ffffff",
          py: { xs: 8, md: 12 },
        }}
      >
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: 3 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.8rem" },
            }}
          >
            From App to SaaS in 4 Steps
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mb: 8,
              color: "rgba(255,255,255,0.6)",
              maxWidth: "700px",
              margin: "0 auto",
              fontWeight: 300,
              pb: 4,
            }}
          >
            Add sync to your existing Dexie.js app \u2014 or start fresh.
            Either way, you&apos;ll be up and running in minutes.
          </Typography>

          {/* Step 1 + 2 side by side */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
              mb: 4,
            }}
          >
            <Box>
              <StepHeader step={1} title="Create a cloud database" />
              <CodeBlock
                language="bash"
                code="npx dexie-cloud create"
                showLineNumbers={false}
                commandLine
                commandPrompt="$"
              />
            </Box>
            <Box>
              <StepHeader step={2} title="Install the addon" />
              <CodeBlock
                language="bash"
                code="npm install dexie-cloud-addon"
                showLineNumbers={false}
                commandLine
                commandPrompt="$"
              />
            </Box>
          </Box>

          {/* Step 3 full width */}
          <Box sx={{ mb: 4 }}>
            <StepHeader step={3} title="Configure your database" />
            <Box
              sx={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <CodeBlock
                language="typescript"
                showLineNumbers={true}
                code={`import Dexie from 'dexie';
import dexieCloud from 'dexie-cloud-addon';

const db = new Dexie('MySaaSApp', { addons: [dexieCloud] });

db.version(1).stores({
  projects: '@id, title, status',    // '@' = server-generated global ID
  tasks:    '@id, projectId, done'
});

db.cloud.configure({
  databaseUrl: "https://<your-db>.dexie.cloud",
  requireAuth: true  // Users must log in to sync
});`}
              />
            </Box>
          </Box>

          {/* Step 4 full width */}
          <Box sx={{ mb: 6 }}>
            <StepHeader
              step={4}
              title="Use it \u2014 sync, auth & sharing just work"
            />
            <Box
              sx={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <CodeBlock
                language="tsx"
                showLineNumbers={true}
                code={`import { useLiveQuery } from "dexie-react-hooks";

function TaskList() {
  const tasks = useLiveQuery(() => db.tasks.toArray());

  const addTask = () => db.tasks.add({
    title: "New task",
    done: false
  });
  // That's it. The task syncs to all devices automatically.
  // Auth is handled. Access control is built in.

  return (
    <ul>
      {tasks?.map(task => (
        <li key={task.id}>{task.title}</li>
      ))}
      <button onClick={addTask}>Add Task</button>
    </ul>
  );
}`}
              />
            </Box>
          </Box>

          {/* Result callout */}
          <Box
            sx={{
              textAlign: "center",
              background:
                "linear-gradient(135deg, rgba(123,44,191,0.15), rgba(74,222,128,0.1))",
              borderRadius: 3,
              p: { xs: 4, md: 5 },
              border: "1px solid rgba(123,44,191,0.3)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: 700,
                color: "#4ade80",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              That&apos;s it. Your app is now a SaaS.
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 3,
                maxWidth: "600px",
                margin: "0 auto 24px",
              }}
            >
              Users can sign in, their data syncs across devices, and they can
              share and collaborate \u2014 all without a single line of backend
              code.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                component={Link}
                href="/docs/cloud/quickstart"
                variant="contained"
                size="large"
                startIcon={<RocketLaunchIcon />}
                sx={{
                  background:
                    "linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)",
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  textTransform: "none",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #9d4edd 0%, #c77dff 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(123,44,191,0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Quick Start Guide
              </Button>
              <Button
                component={Link}
                href="/docs/Tutorial/Dexie-Cloud"
                variant="outlined"
                size="large"
                startIcon={<ArrowForwardIcon />}
                sx={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "#fff",
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.5)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Full Tutorial
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* SECTION 5 - KEY CAPABILITIES */}
      <Benefits
        items={capabilities}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "Everything You Need to Ship",
          sectionSubtitle:
            "Built-in capabilities that replace months of backend work",
        }}
      />

      <Divider />

      {/* SECTION 6 - COMPARISON */}
      <Box
        sx={{
          background:
            "linear-gradient(180deg, #000000 0%, #0a0a1a 50%, #000000 100%)",
          color: "#fff",
          py: { xs: 8, md: 12 },
        }}
      >
        <Box sx={{ maxWidth: "900px", margin: "0 auto", px: 3 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.8rem" },
            }}
          >
            Why Developers Choose Dexie Cloud
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mb: 6,
              color: "rgba(255,255,255,0.6)",
              fontWeight: 300,
            }}
          >
            See how Dexie Cloud compares to building your own backend or using
            online-first platforms
          </Typography>

          {/* Comparison table */}
          <Box
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 100px 100px 100px",
                background: "rgba(255,255,255,0.05)",
                p: 2,
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Feature
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, #7b2cbf 0%, #c77dff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Dexie Cloud
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  textAlign: "center",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                DIY Backend
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  textAlign: "center",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Firebase / Supabase
              </Typography>
            </Box>

            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <Box
                key={row.feature}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 100px 100px 100px",
                  p: 2,
                  gap: 1,
                  background:
                    i % 2 === 0
                      ? "rgba(255,255,255,0.02)"
                      : "transparent",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {row.feature}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  {row.dexie ? "\u2705" : "\u2014"}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  {row.traditional ? "\u2705" : "\u274C"}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  {row.firebase ? "\u2705" : "\u274C"}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}
            >
              Dexie Cloud is the only platform that combines true offline-first
              architecture with zero-backend setup and built-in collaboration.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* SECTION 7 - FEATURE DEEP DIVES */}
      <FeatureScreenshotWidget
        sectionCaption="See it in action"
        sectionTitle="Built Totally on Dexie Cloud"
        description={
          <>
            Real-world screenshots from{" "}
            <a
              href="https://totodo.app/go"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              totodo.app
            </a>{" "}
            \u2014 a production SaaS built entirely with Dexie Cloud. No custom
            backend, no separate auth service, no infrastructure to manage.
          </>
        }
        slides={featureSlides}
        textColor="#dee2e6"
        backgroundColor="#000000"
        containerWidth="big"
      />

      <Divider />

      {/* SECTION 8 - TESTIMONIALS */}
      <TestimonialsWidget
        items={testimonials}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "Developers Ship Faster",
          sectionSubtitle: "with Dexie Cloud",
        }}
      />

      <Divider />

      {/* SECTION 9 - STARTER TEMPLATES */}
      <BlogPostsWidget
        items={starterTemplates}
        sectionTitle="Start Building in Minutes"
        sectionSubtitle="Clone a starter template and ship your SaaS today"
        textColor="#dee2e6"
        backgroundColor="#000000"
        containerWidth="big"
      />

      <Divider />

      {/* SECTION 10 - PRICING PREVIEW */}
      <Box
        sx={{
          background:
            "linear-gradient(180deg, #000000 0%, #0a0a1a 50%, #000000 100%)",
          color: "#fff",
          py: { xs: 8, md: 12 },
        }}
      >
        <Box sx={{ maxWidth: "1000px", margin: "0 auto", px: 3 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.8rem" },
            }}
          >
            Start Free. Scale as You Grow.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mb: 6,
              color: "rgba(255,255,255,0.6)",
              fontWeight: 300,
              maxWidth: "600px",
              margin: "0 auto",
              pb: 4,
            }}
          >
            Predictable per-seat pricing. No surprise bills. Free evaluation
            users are always unlimited.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 3,
              mb: 6,
            }}
          >
            {/* Free */}
            <Box
              sx={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                p: 4,
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: "rgba(255,255,255,0.5)", letterSpacing: 2 }}
              >
                Free
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, my: 2, color: "#fff" }}
              >
                &euro;0
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.5)", mb: 3 }}
              >
                forever
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}
              >
                3 production users
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}
              >
                100 MB storage
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Unlimited evaluation users
              </Typography>
            </Box>

            {/* Production */}
            <Box
              sx={{
                background: "rgba(123,44,191,0.1)",
                border: "2px solid rgba(123,44,191,0.4)",
                borderRadius: 3,
                p: 4,
                textAlign: "center",
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "rgba(123,44,191,0.6)",
                  boxShadow: "0 12px 40px rgba(123,44,191,0.2)",
                },
              }}
            >
              <Chip
                label="MOST POPULAR"
                size="small"
                sx={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background:
                    "linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                }}
              />
              <Typography
                variant="overline"
                sx={{ color: "#c77dff", letterSpacing: 2 }}
              >
                Production
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, my: 2, color: "#fff" }}
              >
                &euro;3
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.5)", mb: 3 }}
              >
                /month for 25 seats
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}
              >
                &euro;0.12 per user/month
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}
              >
                500 MB included
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Auto-scale as needed
              </Typography>
            </Box>

            {/* On-Premises */}
            <Box
              sx={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                p: 4,
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: "rgba(255,255,255,0.5)", letterSpacing: 2 }}
              >
                On-Premises
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, my: 2, color: "#fff" }}
              >
                Custom
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.5)", mb: 3 }}
              >
                one-time purchase
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}
              >
                Unlimited users
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}
              >
                Full source code access
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Host on your infrastructure
              </Typography>
            </Box>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Button
              component={Link}
              href="/pricing"
              variant="outlined"
              size="large"
              startIcon={<ArrowForwardIcon />}
              sx={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "#fff",
                px: 5,
                py: 1.5,
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#c77dff",
                  backgroundColor: "rgba(123,44,191,0.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              View Full Pricing & Compare Plans
            </Button>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* SECTION 11 - FAQ */}
      <FAQWidget
        items={faqItems}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "Frequently Asked Questions",
          sectionSubtitle: "Everything you need to know about Dexie Cloud",
        }}
      />

      <Divider />

      {/* SECTION 12 - FINAL CTA */}
      <Box
        sx={{
          background:
            "linear-gradient(180deg, #000000 0%, #0a0a1a 30%, #1a0a2e 60%, #000000 100%)",
          color: "#ffffff",
          py: { xs: 10, md: 14 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle glow */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(123,44,191,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            maxWidth: "800px",
            margin: "0 auto",
            px: 3,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              mb: 3,
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.2,
            }}
          >
            Ready to SaaS-ify
            <br />
            Your App?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 5,
              color: "rgba(255,255,255,0.7)",
              fontWeight: 300,
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            Join thousands of developers who ship multi-user apps without
            building a backend. Start free \u2014 upgrade when you&apos;re
            ready.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              component={Link}
              href="/docs/cloud/quickstart"
              variant="contained"
              size="large"
              startIcon={<RocketLaunchIcon />}
              sx={{
                background:
                  "linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)",
                color: "#ffffff",
                px: 5,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 8px 32px rgba(123,44,191,0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #9d4edd 0%, #c77dff 100%)",
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 48px rgba(123,44,191,0.5)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Start Building Free
            </Button>
            <Button
              component={Link}
              href="/docs/cloud"
              variant="outlined"
              size="large"
              startIcon={<ArrowForwardIcon />}
              sx={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "#ffffff",
                px: 5,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#c77dff",
                  backgroundColor: "rgba(123,44,191,0.1)",
                  transform: "translateY(-4px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Explore Documentation
            </Button>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Button
              component={Link}
              href="/pricing"
              variant="text"
              sx={{
                color: "rgba(255,255,255,0.5)",
                textTransform: "none",
                textDecoration: "underline",
                "&:hover": {
                  color: "#c77dff",
                  backgroundColor: "transparent",
                },
              }}
            >
              View Pricing
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

// --- Step Header helper ---
function StepHeader({ step, title }: { step: number; title: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: "0.9rem",
          color: "#fff",
          mr: 2,
          flexShrink: 0,
        }}
      >
        {step}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, color: "#fff" }}>
        {title}
      </Typography>
    </Box>
  );
}
