import React from "react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dexie Cloud - Offline-First Sync Without the Complexity",
  description:
    "Add two-way sync, authentication, and access control to your Dexie.js app. No backend development needed. Built-in sync infrastructure. Start free, scale as you grow.",
  keywords: [
    "dexie cloud",
    "offline-first sync",
    "local-first database",
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
  ],
  openGraph: {
    title: "Dexie Cloud - Offline-First Sync Without the Complexity",
    description:
      "Add sync, auth, and collaboration to your app in minutes. No backend development needed. Works with any JavaScript framework.",
    url: "https://dexie.org/cloud",
    images: [
      {
        url: "/assets/images/og-images/og-base.png",
        width: 1200,
        height: 630,
        alt: "Dexie Cloud - Offline-first sync made simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dexie Cloud - Offline-First Sync Service",
    description:
      "Add sync, auth, and collaboration to your app in minutes. No backend development needed.",
    images: ["/assets/images/og-images/og-base.png"],
  },
  alternates: {
    canonical: "https://dexie.org/cloud",
  },
}

import { Box, Typography, Divider, Button } from "@mui/material"
import HeroWidget from "@/components/content/hero/HeroWidget"
import Benefits, {
  BenefitItem,
} from "@/components/content/Benefits/BenefitsWidget"
import CodeBlock from "@/components/content/shared/CodeBlock"
import TestimonialsWidget, {
  TestimonialItem,
} from "@/components/content/TestimonialsWidget"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"

// Benefits data
const dexieCloudBenefits: BenefitItem[] = [
  {
    id: 1,
    className: "col-md-6 col-lg-3 d-flex align-items-stretch mb-sm-30",
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
    className: "col-md-6 col-lg-3 d-flex align-items-stretch mb-sm-30",
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
    className: "col-md-6 col-lg-3 d-flex align-items-stretch mb-sm-30",
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
    className: "col-md-6 col-lg-3 d-flex align-items-stretch mb-sm-30",
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

// Testimonials
const testimonials: TestimonialItem[] = [
  {
    quote:
      "After exploring several options, including major players like Firebase, I felt constrained by their complexity and locking structures. I sought a platform that not only fostered creativity but also expanded our possibilities. That's when I discovered Dexie Cloud. In just one year, I've single-handedly built a hybrid web and mobile application for iOS and Android, complete with automatic data synchronization across all devices. What truly sets Dexie Cloud apart is its ability to unleash productivity and nurture creativity. Unlike other platforms, Dexie Cloud doesn't confine our visions; it expands them.",
    author: "Bennie Forss, Founder of Zenta AB",
    role: "Building To To-do - an AI-driven offline-first task manager",
    image: "/assets/images/testimonials/bennie.jpg",
  },
  {
    quote:
      "Offline-first web apps are no longer difficult. Dexie Cloud gave Fablehenge a truly backendless experience and has been essential for our tiny dev team to ship big features like it already happened. It is the perfect abstraction in front of the endless complexity two-way sync normally entails. Just write your data to IndexedDB with Dexie's best-in-class API. It'll show up where it's supposed to. Nothing could be simpler.",
    author: "Dusty Phillips, Founder of Fablehenge",
    role: "Building an app for story writers to track characters and manage drafts",
    image: "/assets/images/testimonials/dusty2.jpeg",
  },
  {
    quote:
      "I started using Dexie for my project, and I was worried about integrating user authentication and synchronization into it. However, when I discovered Dexie Cloud, I was amazed at how seamlessly I could integrate it into my app. Within minutes, I had my application fully synchronized and authenticated. The documentation provided by Dexie Cloud was also very helpful. It's well-organized and has lots of examples that made it easy to understand and use.",
    author: "Alba Rincon, Founder of Routickr",
    role: "Building an app that helps users transform goals into lasting habits",
    image: "/assets/images/testimonials/albarin.jpg",
  },
  {
    quote:
      "The speed with which you can start and complete an observation is crucial to whether you will prefer my app to Notes - or even pen and paper - at all. The discovery of Dexie Cloud made me realize that my bird lists could be shared with others and that there were also ready-made code examples on how to manage invitations, rights and similar things.",
    author: "Anton Andreasson, Founder of Birdlist",
    role: "Building an app for birdwatchers to log observations and share lists",
    image: "/assets/images/testimonials/naton2.jpeg",
  },
]

export default function DexieCloudPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWidget
        preHeading="DEXIE CLOUD"
        heading="Offline-First Sync Without the Complexity"
        text="Add two-way sync, authentication, and access control to your Dexie.js app. No backend development needed. Start free, scale as you grow."
        background="linear-gradient(180deg, #000000 0%, #1a1a2e 100%)"
        buttons={[
          {
            text: "Get Started",
            link: {
              url: "#get-started",
              querystring: "",
              title: "Get Started with Dexie Cloud",
              target: "_self",
            },
            icon: <PlayArrowIcon />,
            variant: "contained",
            color: "primary",
            size: "large",
          },
          {
            text: "View Pricing",
            link: {
              url: "/pricing",
              querystring: "",
              title: "View Pricing",
              target: "_self",
            },
            icon: <ArrowForwardIcon />,
            variant: "outlined",
            color: "inherit",
            size: "large",
          },
        ]}
        settings={{
          textColor: "#ffffff",
          containerWidth: "big",
          height: "80vh",
          textAlignment: "center",
          verticalTextAlignment: "center",
        }}
      />

      {/* What is Dexie Cloud */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
          color: "#ffffff",
          py: 10,
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            px: 3,
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            What is Dexie Cloud?
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mb: 8,
              color: "#b8b8d1",
              maxWidth: "900px",
              margin: "0 auto 64px",
              fontWeight: 300,
            }}
          >
            A sync service for Dexie.js that turns your local-first app into a
            collaborative, multi-user application—without the backend complexity.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
              mb: 6,
            }}
          >
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: 3,
                p: 4,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                  fontSize: "2rem",
                }}
              >
                💾
              </Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Local-First Storage
              </Typography>
              <Typography sx={{ color: "#b8b8d1", lineHeight: 1.7 }}>
                Write completely Offline-First apps using Dexie.js as your sole
                storage model. Works instantly, even offline.
              </Typography>
            </Box>

            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: 3,
                p: 4,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                  fontSize: "2rem",
                }}
              >
                🔄
              </Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Automatic Sync
              </Typography>
              <Typography sx={{ color: "#b8b8d1", lineHeight: 1.7 }}>
                Let Dexie Cloud sync your data with the cloud automatically.
                Two-way sync that just works.
              </Typography>
            </Box>

            <Box
              sx={{
                background: "rgba(102, 126, 234, 0.1)",
                borderRadius: 3,
                p: 4,
                border: "1px solid rgba(102, 126, 234, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(102, 126, 234, 0.3)",
                },
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                  fontSize: "2rem",
                }}
              >
                🔐
              </Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Secure by Default
              </Typography>
              <Typography sx={{ color: "#b8b8d1", lineHeight: 1.7 }}>
                Protected using authentication and authorization. Share data
                between users or keep it private.
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: 3,
              p: 5,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "#e0e0e0",
                textAlign: "center",
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              Build reactive online collaboration apps hosted on a static web page
              without bothering about a server. And of course: with offline support
              so there&apos;s no problem sending a chat message or looking at the
              latest conversation while the network is down. 🚀
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Benefits Section */}
      <Benefits
        items={dexieCloudBenefits}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "Why Dexie Cloud?",
          sectionSubtitle:
            "Everything you need to build offline-first collaborative apps",
        }}
      />

      <Divider />

      {/* Quick Setup Example */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)",
          color: "#ffffff",
          py: 10,
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            px: 3,
          }}
        >
          <Typography
            variant="h3"
            id="get-started"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            Get Started in Minutes
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mb: 8,
              color: "#b8b8d1",
              maxWidth: "700px",
              margin: "0 auto 64px",
              fontWeight: 300,
            }}
          >
            Add sync to your existing Dexie.js app with just a few lines of code
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
              mb: 6,
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    mr: 2,
                  }}
                >
                  1
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Create your database
                </Typography>
              </Box>
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <CodeBlock
                  language="bash"
                  code={`npx dexie-cloud create`}
                  showLineNumbers={false}
                />
              </Box>
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    mr: 2,
                  }}
                >
                  2
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Install the addon
                </Typography>
              </Box>
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <CodeBlock
                  language="bash"
                  code={`npm install dexie-cloud-addon`}
                  showLineNumbers={false}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  mr: 2,
                }}
              >
                3
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Update your database declaration
              </Typography>
            </Box>
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <CodeBlock
                language="typescript"
                code={`import { Dexie } from 'dexie';
import dexieCloud from 'dexie-cloud-addon';

const db = new Dexie('mydb', { addons: [dexieCloud] });

db.version(1).stores({
  todos: '@id, title, completed' // '@' = auto-generated global ID
});

db.cloud.configure({
  databaseUrl: "https://your-db-id.dexie.cloud",
  requireAuth: true // optional
});`}
                showLineNumbers={true}
              />
            </Box>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  mr: 2,
                }}
              >
                4
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Use it with React (or any framework)
              </Typography>
            </Box>
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <CodeBlock
                language="typescript"
                code={`import { useLiveQuery } from "dexie-react-hooks";

function TodoList() {
  const todos = useLiveQuery(() => db.todos.toArray());

  return (
    <ul>
      {todos?.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}`}
                showLineNumbers={true}
              />
            </Box>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: 3,
              p: 5,
              border: "2px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                fontWeight: 700,
                color: "#4ade80",
              }}
            >
              That&apos;s it! Your app now syncs automatically. 🚀
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
                href="/docs/Tutorial/Dexie-Cloud"
                variant="contained"
                size="large"
                startIcon={<PlayArrowIcon />}
                sx={{
                  background: "rgba(255, 255, 255, 0.15)",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.25)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(255, 255, 255, 0.2)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Follow Full Tutorial
              </Button>
              <Button
                component={Link}
                href="/docs/cloud/quickstart"
                variant="outlined"
                size="large"
                startIcon={<ArrowForwardIcon />}
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  color: "#ffffff",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Quick Start Guide
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Testimonials */}
      <TestimonialsWidget
        items={testimonials}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "Trusted by Developers",
          sectionSubtitle:
            "See what developers are building with Dexie Cloud",
        }}
      />

      <Divider />

      {/* Key Features */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
          color: "#ffffff",
          py: 10,
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            px: 3,
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 8,
              fontWeight: 700,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Key Features
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
            }}
          >
            <Box
              sx={{
                background: "rgba(102, 126, 234, 0.1)",
                borderRadius: 3,
                p: 4,
                border: "1px solid rgba(102, 126, 234, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(102, 126, 234, 0.3)",
                  background: "rgba(102, 126, 234, 0.15)",
                },
              }}
            >
              <Box
                sx={{
                  fontSize: "3rem",
                  mb: 2,
                }}
              >
                🔐
              </Box>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Authentication
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, lineHeight: 1.8, color: "#b8b8d1" }}
              >
                Passwordless email OTP is part of the service so you don&apos;t
                have to deal with setting up auth. Have auth already? Skip our
                default auth and use your own instead!
              </Typography>
              <Button
                component={Link}
                href="/docs/cloud/authentication"
                variant="text"
                sx={{
                  color: "#667eea",
                  textTransform: "none",
                  p: 0,
                  "&:hover": {
                    background: "none",
                    color: "#7c8eeb",
                  },
                }}
                startIcon={<ArrowForwardIcon />}
              >
                Learn about Authentication
              </Button>
            </Box>

            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: 3,
                p: 4,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <Box
                sx={{
                  fontSize: "3rem",
                  mb: 2,
                }}
              >
                🔒
              </Box>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Access Control
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, lineHeight: 1.8, color: "#b8b8d1" }}
              >
                A per-object access model lets your users keep their synced
                private data for themselves or shared with their teams or
                friends. Build your access control models using simple
                JavaScript objects.
              </Typography>
              <Button
                component={Link}
                href="/docs/cloud/access-control"
                variant="text"
                sx={{
                  color: "#ffffff",
                  textTransform: "none",
                  p: 0,
                  "&:hover": {
                    background: "none",
                    opacity: 0.8,
                  },
                }}
                startIcon={<ArrowForwardIcon />}
              >
                Learn about Access Control
              </Button>
            </Box>

            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: 3,
                p: 4,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <Box
                sx={{
                  fontSize: "3rem",
                  mb: 2,
                }}
              >
                🔄
              </Box>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Consistent Sync
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, lineHeight: 1.8, color: "#b8b8d1" }}
              >
                Dexie Cloud doesn&apos;t just sync individual CRUD operations -
                it syncs the where-expressions along with the operations, making
                it possible to keep related data consistent.
              </Typography>
              <Button
                component={Link}
                href="/docs/cloud/consistency"
                variant="text"
                sx={{
                  color: "#ffffff",
                  textTransform: "none",
                  p: 0,
                  "&:hover": {
                    background: "none",
                    opacity: 0.8,
                  },
                }}
                startIcon={<ArrowForwardIcon />}
              >
                Learn about Consistency
              </Button>
            </Box>

            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: 3,
                p: 4,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <Box
                sx={{
                  fontSize: "3rem",
                  mb: 2,
                }}
              >
                🤝
              </Box>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Conflict-Free Replication (CRDT)
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, lineHeight: 1.8, color: "#b8b8d1" }}
              >
                Dexie Cloud also supports the entire Y.js ecosystem: React Flow, TipTap, Monaco Editor, tldraw and many more with
                Awareness and sync. This opens up for extremely rich collaborative
                experiences.
              </Typography>
              <Button
                component={Link}
                href="/docs/Y.js/Y.js"
                variant="text"
                sx={{
                  color: "#ffffff",
                  textTransform: "none",
                  p: 0,
                  "&:hover": {
                    background: "none",
                    opacity: 0.8,
                  },
                }}
                startIcon={<ArrowForwardIcon />}
              >
                Learn about Y.js & CRDT
              </Button>
            </Box>

            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: 3,
                p: 4,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <Box
                sx={{
                  fontSize: "3rem",
                  mb: 2,
                }}
              >
                📦
              </Box>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Deployment Options
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, lineHeight: 1.8, color: "#b8b8d1" }}
              >
                Start with our SaaS offering for simplicity. Need full control?
                Self-host on your own servers with Node.js and PostgreSQL. Full
                source code access available with our premium plans.
              </Typography>
              <Button
                component={Link}
                href="/pricing"
                variant="text"
                sx={{
                  color: "#ffffff",
                  textTransform: "none",
                  p: 0,
                  "&:hover": {
                    background: "none",
                    opacity: 0.8,
                  },
                }}
                startIcon={<ArrowForwardIcon />}
              >
                View Pricing Options
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Final CTA */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #1a1a2e 0%, #000000 100%)",
          color: "#ffffff",
          py: 12,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Ready to Build Offline-First Apps?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 5,
              opacity: 0.95,
              fontWeight: 300,
              fontSize: { xs: "1.1rem", md: "1.3rem" },
            }}
          >
            Start with Dexie.js for local storage, add Dexie Cloud when you need
            sync, auth, and collaboration. No backend required.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              component={Link}
              href="/docs/cloud/quickstart"
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              sx={{
                background: "rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                px: 5,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.25)",
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 48px rgba(0,0,0,0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Get Started Free
            </Button>
            <Button
              component={Link}
              href="/docs/cloud"
              variant="outlined"
              size="large"
              startIcon={<ArrowForwardIcon />}
              sx={{
                borderColor: "#ffffff",
                color: "#ffffff",
                borderWidth: 2,
                px: 5,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  borderWidth: 2,
                  borderColor: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  transform: "translateY(-4px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              View Documentation
            </Button>
            <Button
              component={Link}
              href="/pricing"
              variant="text"
              size="large"
              sx={{
                color: "#ffffff",
                px: 5,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                textDecoration: "underline",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  textDecoration: "underline",
                },
              }}
            >
              See Pricing
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
