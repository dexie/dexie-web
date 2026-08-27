import type { Metadata } from "next"
import {
  Box,
  Container,
  Typography,
  CardContent,
  Button,
  Paper,
  Divider,
} from "@mui/material"

export const metadata: Metadata = {
  metadataBase: new URL("https://dexie.org"),
  title: "Contact Dexie.js Team - Support, Sales & Technical Help",
  description:
    "Get help with Dexie.js and Dexie Cloud. Technical support, sales inquiries, bug reports, and community support. Discord community, GitHub issues, and professional support available.",
  keywords: [
    "dexie.js support",
    "dexie cloud support",
    "javascript database help",
    "indexeddb support",
    "offline database support",
    "dexie technical support",
    "offline first help",
    "database sync support",
    "react offline help",
    "vue offline support",
    "angular database support",
    "progressive web app help",
    "client database support",
    "browser storage help",
  ],
  openGraph: {
    title: "Contact Dexie.js Team - Get Support & Technical Help",
    description:
      "Multiple support channels available: Discord community, GitHub issues, technical support, and professional services for Dexie.js and Dexie Cloud.",
    url: "https://dexie.org/contact",
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
    title: "Contact Dexie.js Team - Support & Help",
    description:
      "Get technical support, join our Discord community, or contact our team for Dexie.js and Dexie Cloud help.",
    images: ["/assets/images/og-images/og-base.png"],
  },
  alternates: {
    canonical: "https://dexie.org/contact",
  },
}
import EmailIcon from "@mui/icons-material/Email"
import GitHubIcon from "@mui/icons-material/GitHub"
import LaunchIcon from "@mui/icons-material/Launch"
import Image from "next/image"
import PersonIcon from "@mui/icons-material/Person"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import FAQWidget from "@/components/content/FAQWidget"
interface ContactAction {
  text: string
  href: string
  external?: boolean
  variant?: "contained" | "text" | "outlined"
  icon?: React.ReactElement
  color?: string
}

interface ContactMethod {
  title: string
  description: string
  icon: React.ReactElement
  actions: ContactAction[]
}

const contactMethods: ContactMethod[] = [
  {
    title: "Sales & Partnerships",
    description:
      "Contact our sales team or schedule a meeting to discuss business opportunities",
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 24 24"
        fill="var(--dexie-text)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 10h18l-7.492 9.094v4.906l-3.016-2v-2.906l-7.492-9.094zm9.251 1h-.502v.533c-.978.134-1.501.744-1.501 1.425 0 1.219 1.432 1.405 1.9 1.622.638.284.52.875-.058 1.005-.501.113-1.14-.084-1.621-.27l-.229.822c.45.231.988.355 1.509.364v.499h.502v-.527c.833-.116 1.51-.573 1.509-1.432 0-1.072-1.122-1.371-1.983-1.773-.522-.27-.456-.914.292-.958.416-.025.843.098 1.229.233l.181-.824c-.455-.138-.864-.201-1.228-.21v-.509zm-9.25-2h3.376c-.016-3.659 1.685-2.068 1.685-4.979 0-1.124-.737-1.734-1.686-1.734-1.402 0-2.377 1.333-1.05 3.826.436.819-.465 1.013-1.432 1.236-.839.192-.894.6-.894 1.306l.001.345zm17.105-1.651c-.968-.223-1.868-.417-1.432-1.236 1.327-2.493.352-3.826-1.05-3.826-.948 0-1.686.61-1.686 1.734 0 2.911 1.701 1.32 1.685 4.979h3.375l.002-.345c0-.706-.055-1.114-.894-1.306zm-3.608 1.651h-8.997l-.001-.465c0-.938.075-1.48 1.191-1.737 1.263-.29 2.508-.549 1.909-1.647-1.775-3.255-.506-5.101 1.399-5.101 1.868 0 3.17 1.777 1.4 5.101-.582 1.092.619 1.351 1.908 1.647 1.118.257 1.192.8 1.192 1.74l-.001.462z" />
      </svg>
    ),
    actions: [
      {
        text: "Email Sales",
        href: "mailto:sales@awarica.com",
        variant: "text",
      },
      {
        text: "Schedule Meeting",
        href: "https://calendly.com/david-fahlander-awarica/30min",
        external: true,
        variant: "contained",
      },
    ],
  },

  {
    title: "Google your problem first",
    description:
      "Before you file an issue, please Google your problem first - chances are you find hints or answers in an existing stackoverflow-, GitHub, docs page or some blog. ",
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 24 24"
        fill="var(--dexie-text)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z" />
      </svg>
    ),
    actions: [
      {
        text: "Existing Issues",
        href: "https://github.com/dexie/Dexie.js/issues?q=is%3Aissue",
        external: true,
        variant: "text",
      },
      {
        text: "Post Github issue",
        href: "https://github.com/dexie/Dexie.js/issues/new",
        external: true,
        variant: "contained",
      },
    ],
  },
  {
    title: "Community & Questions",
    description:
      "Join our community where you can ask questions, help others, and hang with like-minded individuals or discuss on GitHub Discussions",
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 24 24"
        fill="var(--dexie-text)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.644 17.08c2.866-.662 4.539-1.241 3.246-3.682-3.932-7.427-1.042-11.398 3.111-11.398 4.235 0 7.054 4.124 3.11 11.398-1.332 2.455.437 3.034 3.242 3.682 2.483.574 2.647 1.787 2.647 3.889v1.031h-18c0-2.745-.22-4.258 2.644-4.92zm-12.644 4.92h7.809c-.035-8.177 3.436-5.313 3.436-11.127 0-2.511-1.639-3.873-3.748-3.873-3.115 0-5.282 2.979-2.333 8.549.969 1.83-1.031 2.265-3.181 2.761-1.862.43-1.983 1.34-1.983 2.917v.773z" />
      </svg>
    ),
    actions: [
      {
        text: "Discord Chat",
        href: "https://discord.gg/huhre7MHBF",
        external: true,
        variant: "contained",
        icon: (
          <svg
            width="26 px"
            height="26px"
            viewBox="0 0 24 24"
            fill="var(--dexie-bright)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z"
              stroke="none"
              strokeLinejoin="round"
            />
          </svg>
        ),
        color: "discord",
      },
      {
        text: "GitHub Discussions",
        href: "https://github.com/dexie/Dexie.js/discussions",
        external: true,
        variant: "text",
      },
    ],
  },
  {
    title: "Technical Support",
    description:
      "Get help with technical issues, implementation questions, or request private support",
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 24 24"
        fill="var(--dexie-text)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z" />
      </svg>
    ),
    actions: [
      {
        text: "Ask on StackOverflow",
        href: "http://stackoverflow.com/questions/ask?tags=dexie",
        external: true,
        variant: "text",
      },
      {
        text: "Private Support (€150/h)",
        href: "mailto:privsupport@dexie.org",
        variant: "text",
      },
    ],
  },

  {
    title: "Bug Reports & Issues",
    description:
      "Found a bug or have a feature request? File an issue on GitHub",
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 24 24"
        fill="var(--dexie-text)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5.895 3.173c0-.648.534-1.173 1.192-1.173.785 0 1.355.736 1.15 1.48-.077.281-.035.58.116.829.334.553.903.895 1.647.898.733-.003 1.31-.34 1.647-.898.151-.25.193-.548.115-.829-.205-.743.364-1.48 1.151-1.48.658 0 1.192.525 1.192 1.173 0 .563-.402 1.029-.932 1.146-.268.059-.5.225-.64.457-.511.847.161 1.598.775 2.353-1.009.468-2.103.704-3.308.704-1.223 0-2.309-.231-3.312-.7.624-.767 1.296-1.502.779-2.358-.141-.232-.372-.397-.64-.457-.53-.116-.932-.582-.932-1.145zm4.105 12.827c0-3.327 2.042-6.184 4.939-7.389l-.189-.363c-1.429.827-3.017 1.252-4.75 1.252-1.761 0-3.329-.415-4.752-1.246-.181.299-.351.615-.5.954-.189.429-.539.46-.785.365l-1.913-.742c-.451-.176-.961.043-1.139.487-.178.444.044.946.495 1.121l1.86.722c.413.16.712.578.644 1.062-.088.631-.569.926-1.029.926h-2.003c-.485-.001-.878.386-.878.864 0 .477.393.864.878.864h1.989c.478 0 .966.31 1.055.88.093.607-.19 1.024-.626 1.218l-2.017.898c-.442.197-.638.709-.438 1.144s.721.628 1.162.431l2.134-.95c.256-.114.573-.088.75.216.871 1.497 2.62 3.009 5.113 3.286.783-.087 1.484-.306 2.117-.598-1.31-1.425-2.117-3.319-2.117-5.402zm14 0c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6 6 2.686 6 6zm-2.142 1h-1.858v-2h1.858c-.364-1.399-1.459-2.494-2.858-2.858v1.858h-2v-1.858c-1.399.364-2.494 1.459-2.858 2.858h1.858v2h-1.858c.364 1.399 1.459 2.494 2.858 2.858v-1.858h2v1.858c1.399-.364 2.494-1.459 2.858-2.858z" />
      </svg>
    ),
    actions: [
      {
        text: "File Dexie Issue",
        href: "https://github.com/dexie/Dexie.js/issues/new",
        external: true,
        variant: "text",
      },
      {
        text: "File Cloud Issue",
        href: "https://github.com/dexie/Dexie.js/issues/new?labels=cloud",
        external: true,
        variant: "text",
      },
    ],
  },
]

// FAQ data for contact page
const contactFaqData = [
  {
    id: 1,
    question: "What's the fastest way to get help with a technical issue?",
    answer:
      'For technical questions, we recommend posting on StackOverflow with the "dexie" tag. Our team actively monitors these questions and the community often provides quick answers.',
  },
  {
    id: 2,
    question: "How much does private support cost?",
    answer:
      "Private support is available at €150/hour with a minimum order of 10 hours. This includes dedicated email support and consultation for your specific project needs.",
  },
  {
    id: 3,
    question: "Can I schedule a call to discuss my project?",
    answer:
      "Yes! For sales and business inquiries, you can contact our sales team to schedule a meeting. This is perfect for discussing Dexie Cloud implementations or enterprise needs.",
  },
  {
    id: 4,
    question: "What types of support do you offer?",
    answer:
      "We offer multiple support channels: free community support via StackOverflow and Discord, GitHub Issues for bug reports, and paid private support for dedicated consultation and implementation help.",
  },
]

const companyInfo = {
  name: "Awarica AB",
  location: "Stockholm, Sweden",
  description:
    "Swedish company managing business around Dexie.js and Dexie Cloud",
}

const author = {
  name: "David Fahlander",
  role: "Creator of Dexie.js",
  links: [
    {
      text: "GitHub",
      href: "https://github.com/dfahlander",
      icon: <GitHubIcon />,
    },
    {
      text: "Medium",
      href: "https://medium.com/@dfahlander",
      icon: <PersonIcon />,
    },
    {
      text: "Twitter",
      href: "https://twitter.com/dfahlander",
      icon: <PersonIcon />,
    },
  ],
}

export default function ContactPage() {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          background:
            "linear-gradient(var(--dexie-hero-overlay-soft), var(--dexie-hero-overlay-soft)), url('/assets/images/dexie-bg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          padding: { xs: 3, md: 6, lg: 12, xl: 40 },
          paddingTop: "200px !important",
          paddingBottom: "100px !important",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", md: "1200px" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Get in Touch
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                opacity: 0.9,
                fontWeight: 300,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
              }}
            >
              We love to answer questions about Dexie.js and help you build
              amazing applications. Choose the best way to reach us based on
              your needs.
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="https://discord.gg/huhre7MHBF"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={
                <svg
                  width="26 px"
                  height="26px"
                  viewBox="0 0 24 24"
                  fill="var(--dexie-bright)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z"
                    stroke="none"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              sx={{
                backgroundColor: "discord.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "discord.dark",
                },
              }}
            >
              Join our Discord community
            </Button>
          </Box>
          <Box
            sx={{
              flex: 1,
              textAlign: "center",
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Image
              src="/assets/images/support.png"
              alt="Support"
              width={250}
              height={250}
              style={{ maxWidth: "250px", height: "auto", opacity: 0.8 }}
            />
          </Box>
        </Box>
      </Box>
      <Divider />
      {/* Contact Methods Grid */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            textAlign="center"
            sx={{ mb: 6, fontSize: { xs: "2rem", md: "2.5rem" } }}
          >
            How can we help?
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 4,
            }}
          >
            {contactMethods.map((method, index) => (
              <Box
                key={index}
                sx={{
                  height: "100%",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ textAlign: "left", mb: 2 }}>{method.icon}</Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    textAlign="left"
                    sx={{ mb: 2 }}
                  >
                    {method.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="left"
                    sx={{ mb: 3, flexGrow: 1 }}
                  >
                    {method.description}
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {method.actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        variant={action.variant || "outlined"}
                        href={action.href}
                        color={
                          (action.color as
                            | "primary"
                            | "secondary"
                            | "success"
                            | "error"
                            | "info"
                            | "warning"
                            | "discord") || "secondary"
                        }
                        target={action.external ? "_blank" : undefined}
                        rel={
                          action.external ? "noopener noreferrer" : undefined
                        }
                        startIcon={action.icon}
                        endIcon={action.external ? <LaunchIcon /> : undefined}
                        fullWidth
                      >
                        {action.text}
                      </Button>
                    ))}
                  </Box>
                </CardContent>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
      <Divider />
      {/* Company & Author Info */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: 6,
            }}
          >
            {/* Company Info */}
            <Paper
              sx={{
                p: 4,
                height: "100%",
                backgroundColor: "rgba(255,255,255,0.01)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <LocationOnIcon
                  sx={{ mr: 1, color: "text.secondary", fontSize: 32 }}
                />
                <Typography variant="h4">Company Information</Typography>
              </Box>
              <Typography variant="h5" gutterBottom>
                {companyInfo.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationOnIcon
                  sx={{ mr: 1, color: "text.secondary", fontSize: 20 }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 0 }}
                >
                  {companyInfo.location}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {companyInfo.description}
              </Typography>
              <Button
                variant="contained"
                href="mailto:business@dexie.org"
                startIcon={<EmailIcon />}
              >
                Contact Business Team
              </Button>
            </Paper>

            {/* Author Info */}
            <Paper
              sx={{
                p: 4,
                height: "100%",
                backgroundColor: "rgba(255,255,255,0.01)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <PersonIcon
                  sx={{ mr: 1, color: "text.secondary", fontSize: 32 }}
                />
                <Typography variant="h4">Meet the Creator</Typography>
              </Box>
              <Typography variant="h5" gutterBottom>
                {author.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {author.role}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                The creator and maintainer of Dexie.js, passionate about making
                IndexedDB accessible to developers worldwide.
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {author.links.map((link, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    size="small"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={link.icon}
                    endIcon={<LaunchIcon />}
                  >
                    {link.text}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* FAQ Section */}
      <FAQWidget
        items={contactFaqData}
        settings={{
          sectionTitle: "Frequently Asked Questions",
          sectionSubtitle:
            "Common questions about contacting our team and getting support",
          containerWidth: "medium",
          backgroundColor: "rgba(255,255,255,0.05)",
        }}
      />
    </Box>
  )
}
