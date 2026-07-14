"use client"

import React, { useState, useEffect } from "react"
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  SxProps,
  Theme,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import ButtonWidget from "./shared/Button"
import TypeWriter from "./shared/TypeWriter"

export interface PricingPlan {
  id: string
  title: string
  subtitle: string
  price: string
  priceNote: string
  buttonText: string
  buttonLink: {
    url: string
    querystring: string
    title: string
    target: string
  }
  isPopular?: boolean
  badge?: {
    text: string
    variant?: "outlined" | "contained"
    color?: string
    backgroundColor?: string
    borderColor?: string
  }
  sectionTitle?: string
  features: {
    text: string
    subtext?: string
  }[]
  borderRadius?: string
  contactSalesText?: string
  contactSalesLink?: string
}

export interface PricingSettings {
  textColor?: string
  backgroundColor?: string
  containerWidth?: "small" | "medium" | "big"
  sectionTitle?: string
  sectionSubtitle?: string
  typewriterStrings?: string[]
}

export interface PricingWidgetProps {
  cloudPlans?: PricingPlan[] // Made optional as we define them inside dynamically
  onPremisesPlans?: PricingPlan[]
  settings: PricingSettings
  sx?: SxProps<Theme>
}

const PricingWidget: React.FC<PricingWidgetProps> = ({
  settings,
  sx,
}) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"))
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD")
  const [billingModel, setBillingModel] = useState<"resource" | "seat">("resource")

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (tz && tz.toLowerCase().includes("europe")) {
        setCurrency("EUR")
      }
    } catch (e) {
      // ignore fallback
    }
  }, [])

  const isEUR = currency === "EUR"
  const symbol = isEUR ? "€" : "$"

  const getMaxWidth = () => {
    switch (settings.containerWidth) {
      case "small":
        return "sm"
      case "medium":
        return "md"
      case "big":
      default:
        return "xl"
    }
  }

  // Dynamic pricing plans based on selections
  const activePlans = [
    {
      id: "free",
      title: "Free",
      subtitle: "Perfect for passion projects & evaluation.",
      price: `${symbol}0`,
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
          subtext: "With full user management and authentication.",
        },
        { text: "Online authentication" },
        { text: "3 GB Postgres storage", subtext: "No hard limits, pay-as-you-grow overage." },
        { text: "5 GB Blob storage", subtext: "No hard limits, pay-as-you-grow overage." },
        { text: "1M sync operations / month" },
        { text: "7 days PITR (Point-In-Time)" },
        { text: "Community support" },
      ],
    },
    {
      id: "indie",
      title: "Indie",
      subtitle: billingModel === "resource"
        ? "For scalable production applications."
        : "For teams with fixed user count.",
      price: isEUR ? "€19" : "$25",
      priceNote: "per month",
      buttonText: "Buy Now",
      buttonLink: {
        url: "https://buy.stripe.com/14k9CEgSne5D1BS8ww",
        querystring: "",
        title: "Buy Now",
        target: "_blank",
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
        {
          text: billingModel === "resource" ? "Unlimited production users" : "Includes B2B user seats",
          subtext: billingModel === "resource"
            ? "Zero seat-based caps or limitations."
            : "Optimized base rate billed per active seat.",
        },
        { text: "Unlimited evaluation users" },
        { text: "10 GB Postgres storage", subtext: `Overage: ${isEUR ? "€0.15" : "$0.18"}/GB/mo (pay-as-you-grow)` },
        { text: "25 GB Blob storage", subtext: `Overage: ${isEUR ? "€0.03" : "$0.035"}/GB/mo (pay-as-you-grow)` },
        { text: "5M sync operations / month", subtext: `Overage: ${isEUR ? "€4" : "$4.5"}/1M ops (no hard cap)` },
        { text: "7 days PITR" },
        { text: "Email support" },
      ],
    },
    {
      id: "pro",
      title: "Pro",
      subtitle: "For scalable commercial applications.",
      price: isEUR ? "€89" : "$99",
      priceNote: "per month",
      buttonText: "Buy Now",
      buttonLink: {
        url: "https://buy.stripe.com/8wM8yAfOjf9HbcsfZ0",
        querystring: "",
        title: "Buy Now",
        target: "_blank",
      },
      sectionTitle: "Everything in the Indie Plan, plus:",
      features: [
        { text: billingModel === "resource" ? "Unlimited production users" : "Includes advanced user seats" },
        { text: "50 GB Postgres storage", subtext: `Overage: ${isEUR ? "€0.15" : "$0.18"}/GB/mo (pay-as-you-grow)` },
        { text: "100 GB Blob storage", subtext: `Overage: ${isEUR ? "€0.03" : "$0.035"}/GB/mo (pay-as-you-grow)` },
        { text: "25M sync operations / month", subtext: `Overage: ${isEUR ? "€3" : "$3.5"}/1M ops (no hard cap)` },
        { text: "30 days PITR" },
        { text: "Priority support (faster response)" },
      ],
    },
    {
      id: "gold",
      title: "Gold",
      subtitle: "When you need dedicated SLA support & expert help.",
      price: isEUR ? "€199" : "$249",
      priceNote: "per month",
      buttonText: "Buy Now",
      buttonLink: {
        url: "https://buy.stripe.com/cN21680Tp2mVeoE9AD",
        querystring: "",
        title: "Buy Now",
        target: "_blank",
      },
      badge: {
        text: "Recommended",
        variant: "outlined" as const,
        color: "#c77dff",
        borderColor: "#c77dff",
      },
      sectionTitle: "Everything in Pro, plus:",
      features: [
        { text: "Premium Support included", subtext: "AI-assisted + direct core engineering reviews (1 business day SLA)." },
        { text: "200 GB Postgres storage", subtext: `Overage: ${isEUR ? "€0.12" : "$0.14"}/GB/mo (pay-as-you-grow)` },
        { text: "500 GB Blob storage", subtext: `Overage: ${isEUR ? "€0.025" : "$0.03"}/GB/mo (pay-as-you-grow)` },
        { text: "100M sync operations / month", subtext: `Overage: ${isEUR ? "€2" : "$2.5"}/1M ops (no hard cap)` },
        { text: "30 days PITR" },
        { text: "Prioritized E2E encryption & custom auth guidance" },
      ],
    },
  ]

  const foundersPlan = {
    id: "founders",
    title: "Founder's Circle",
    subtitle: "White-glove service and direct engineering alignment for high-scale apps.",
    price: "Custom",
    priceNote: "Tailored to your requirements",
    buttonText: "Contact Us",
    buttonLink: {
      url: "/contact",
      querystring: "",
      title: "Contact Us",
      target: "_self",
    },
    features: [
      "Custom storage and sync limits",
      "Unlimited databases & unlimited users",
      "Dedicated Slack channel with Dexie.js core team",
      "Custom SLA & contract terms",
      "Full server source code access options",
      "White-glove database migration guidance",
    ],
  }

  const renderPricingCard = (
    plan: typeof activePlans[0],
    index: number,
  ) => {
    return (
      <Box
        key={plan.id}
        sx={{
          flex: 1,
          display: "flex",
          position: "relative",
          minWidth: { xs: "100%", md: "calc(50% - 16px)", lg: "calc(25% - 18px)" },
        }}
      >
        <Card
          sx={{
            backgroundColor: "#161616",
            border: "1px solid #2d2d2d",
            borderRadius: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "visible",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 12px 24px rgba(199, 125, 255, 0.1)",
              borderColor: "#444444",
            },
            ...(plan.isPopular && {
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-1px",
                left: "-1px",
                right: "-1px",
                bottom: "-1px",
                background: "linear-gradient(45deg, #7b2cbf, #9d4edd, #c77dff)",
                borderRadius: "20px",
                padding: "2px",
                zIndex: -1,
              },
              borderColor: "transparent",
            }),
          }}
        >
          <CardContent
            sx={{
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              textAlign: "left",
            }}
          >
            <Box sx={{ position: "relative", mb: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  color: settings.textColor || "#ffffff",
                  fontWeight: 700,
                }}
              >
                {plan.title}
              </Typography>
              {plan.badge && (
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    backgroundColor: "transparent",
                    color: plan.badge.color || "#c77dff",
                    border: `1px solid ${plan.badge.borderColor || "#c77dff"}`,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    px: 1.2,
                    py: 0.3,
                    borderRadius: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {plan.badge.text}
                </Box>
              )}
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: "#adb5bd",
                mb: 3,
                fontSize: "0.85rem",
                minHeight: "40px",
                lineHeight: 1.4,
              }}
            >
              {plan.subtitle}
            </Typography>

            <Box sx={{ mb: 1, display: "flex", alignItems: "baseline" }}>
              <Typography
                variant="h3"
                component="div"
                sx={{
                  color: settings.textColor || "#ffffff",
                  fontWeight: 700,
                  fontSize: "2.5rem",
                }}
              >
                {plan.price}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#adb5bd",
                  fontSize: "0.85rem",
                  ml: 1,
                }}
              >
                {plan.priceNote}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <ButtonWidget
                text={plan.buttonText}
                link={plan.buttonLink}
                color="primary"
                size="medium"
                variant="outlined"
                sx={{
                  width: "100%",
                  borderColor: "#c77dff",
                  color: "#c77dff",
                  borderRadius: "50px",
                  py: 1,
                  "&:hover": {
                    borderColor: "#c77dff",
                    backgroundColor: "rgba(199, 125, 255, 0.1)",
                  },
                }}
              />
            </Box>

            <Divider
              sx={{ mb: 3, opacity: 0.1, backgroundColor: "#ffffff" }}
            />

            <Box sx={{ flex: 1 }}>
              {plan.sectionTitle && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "#adb5bd",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    mb: 2,
                    display: "block",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {plan.sectionTitle}
                </Typography>
              )}

              <List sx={{ padding: 0 }}>
                {plan.features.map((feature, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start !important",
                      alignItems: "flex-start !important",
                      p: 0,
                      pb: "10px !important",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "auto",
                        mr: 1.5,
                        mt: "2px",
                      }}
                    >
                      <CheckIcon
                        sx={{
                          fontSize: "15px",
                          color: "#c77dff",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography
                            component="span"
                            sx={{
                              color: settings.textColor || "#ffffff",
                              fontSize: "0.85rem",
                              lineHeight: 1.4,
                              fontWeight: feature.text.startsWith("**") ? 600 : 400,
                            }}
                          >
                            {feature.text.replace(/\*\*/g, "")}
                          </Typography>
                          {feature.subtext && (
                            <Typography
                              component="div"
                              sx={{
                                color: "#adb5bd",
                                fontSize: "0.75rem",
                                marginTop: "2px",
                                lineHeight: 1.3,
                              }}
                            >
                              {feature.subtext}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </CardContent>
        </Card>
      </Box>
    )
  }

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: settings.backgroundColor || "#000000",
        color: settings.textColor || "#ffffff",
        py: { xs: 4, md: 10 },
        ...sx,
      }}
    >
      <Container maxWidth={getMaxWidth()} sx={{ position: "relative" }}>
        {/* Header Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 8 },
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.2rem", md: "3.5rem" },
              fontWeight: 600,
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            {settings.sectionTitle} <br />
            <TypeWriter
              colorClass=""
              strings={settings.typewriterStrings || ["full backend control"]}
            />
          </Typography>
          {settings.sectionSubtitle && (
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.2rem" },
                color: "#adb5bd",
                maxWidth: "700px",
                mx: "auto",
                lineHeight: 1.6,
                mb: 4,
              }}
            >
              {settings.sectionSubtitle}
            </Typography>
          )}

          {/* Dynamiskt positionerande switchar (Toggles) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mb: 3,
              mt: 2,
            }}
          >
            {/* Model Switcher */}
            <Box
              sx={{
                display: "flex",
                backgroundColor: "#161616",
                borderRadius: "30px",
                p: "4px",
                border: "1px solid #2d2d2d",
              }}
            >
              <Button
                onClick={() => setBillingModel("resource")}
                sx={{
                  borderRadius: "25px",
                  px: 3,
                  py: 0.8,
                  textTransform: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  backgroundColor: billingModel === "resource" ? "#c77dff" : "transparent",
                  color: billingModel === "resource" ? "#000000" : "#adb5bd",
                  "&:hover": {
                    backgroundColor: billingModel === "resource" ? "#d896ff" : "rgba(255,255,255,0.05)",
                  },
                }}
              >
                Pay by Resource (Usage)
              </Button>
              <Button
                onClick={() => setBillingModel("seat")}
                sx={{
                  borderRadius: "25px",
                  px: 3,
                  py: 0.8,
                  textTransform: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  backgroundColor: billingModel === "seat" ? "#c77dff" : "transparent",
                  color: billingModel === "seat" ? "#000000" : "#adb5bd",
                  "&:hover": {
                    backgroundColor: billingModel === "seat" ? "#d896ff" : "rgba(255,255,255,0.05)",
                  },
                }}
              >
                Pay by User Seat (B2B)
              </Button>
            </Box>

            {/* Currency Switcher */}
            <Box
              sx={{
                display: "flex",
                backgroundColor: "#161616",
                borderRadius: "30px",
                p: "4px",
                border: "1px solid #2d2d2d",
              }}
            >
              <Button
                onClick={() => setCurrency("USD")}
                sx={{
                  borderRadius: "25px",
                  px: 2,
                  py: 0.8,
                  textTransform: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  backgroundColor: currency === "USD" ? "#c77dff" : "transparent",
                  color: currency === "USD" ? "#000000" : "#adb5bd",
                  "&:hover": {
                    backgroundColor: currency === "USD" ? "#d896ff" : "rgba(255,255,255,0.05)",
                  },
                }}
              >
                $ USD
              </Button>
              <Button
                onClick={() => setCurrency("EUR")}
                sx={{
                  borderRadius: "25px",
                  px: 2,
                  py: 0.8,
                  textTransform: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  backgroundColor: currency === "EUR" ? "#c77dff" : "transparent",
                  color: currency === "EUR" ? "#000000" : "#adb5bd",
                  "&:hover": {
                    backgroundColor: currency === "EUR" ? "#d896ff" : "rgba(255,255,255,0.05)",
                  },
                }}
              >
                € EUR
              </Button>
            </Box>
          </Box>

          {/* Tax legal warning for European clients */}
          {currency === "EUR" && (
            <Typography
              variant="body2"
              sx={{
                color: "#ff9e00",
                fontSize: "0.8rem",
                fontWeight: 500,
                mt: 1,
                mb: 4,
                display: "inline-block",
                px: 2,
                py: 0.5,
                borderRadius: "10px",
                backgroundColor: "rgba(255, 158, 0, 0.08)",
                border: "1px solid rgba(255, 158, 0, 0.2)",
              }}
            >
              Prices are exclusive of VAT (ex. moms). VAT may be added depending on your billing country.
            </Typography>
          )}
        </Box>

        {/* Standard 4-Tier Grid */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 4,
          }}
        >
          {activePlans.map((plan, index) =>
            renderPricingCard(plan, index),
          )}
        </Box>

        {/* Full-width callout for Founder's Circle */}
        <Box sx={{ mt: 4, mb: 6 }}>
          <Card
            sx={{
              backgroundColor: "#161616",
              border: "1px solid #2d2d2d",
              borderRadius: "20px",
              p: { xs: 2, md: 4 },
              transition: "box-shadow 0.2s, border-color 0.2s",
              "&:hover": {
                borderColor: "#c77dff",
                boxShadow: "0 8px 24px rgba(199, 125, 255, 0.05)",
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-start", md: "center" },
                justifyContent: "space-between",
                gap: 4,
              }}
            >
              <Box sx={{ flex: 1, textAlign: "left" }}>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 2, mb: 1 }}>
                  <Typography variant="h4" component="h3" sx={{ fontWeight: 700, color: "#ffffff" }}>
                    {foundersPlan.title}
                  </Typography>
                  <Typography variant="h5" sx={{ color: "#c77dff", fontWeight: 600 }}>
                    {foundersPlan.price}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "#adb5bd", mb: 3, maxWidth: "600px", fontSize: "0.9rem" }}>
                  {foundersPlan.subtitle}
                </Typography>
                <ButtonWidget
                  text={foundersPlan.buttonText}
                  link={foundersPlan.buttonLink}
                  color="primary"
                  size="medium"
                  variant="contained"
                  sx={{
                    borderRadius: "50px",
                    px: 4,
                    py: 1.2,
                    backgroundColor: "#c77dff",
                    color: "#000000",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#b25eff",
                    },
                  }}
                />
              </Box>

              <Box sx={{ flex: 1, width: "100%", borderLeft: { xs: "none", md: "1px solid #2d2d2d" }, pl: { xs: 0, md: 4 } }}>
                <List sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: "10px", p: 0 }}>
                  {foundersPlan.features.map((feature, idx) => (
                    <ListItem key={idx} sx={{ p: 0, display: "flex", alignItems: "flex-start" }}>
                      <ListItemIcon sx={{ minWidth: "auto", mr: 1, mt: "3px" }}>
                        <CheckIcon sx={{ fontSize: "14px", color: "#c77dff" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{
                          sx: { color: "#ffffff", fontSize: "0.8rem", textAlign: "left" },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Footer Text */}
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
            mt: 4,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#adb5bd",
              lineHeight: 1.6,
              fontSize: "0.9rem",
            }}
          >
            All plans include core Dexie.js features, offline-first
            capabilities, and access to our documentation and community. Need a
            custom solution?{" "}
            <Box
              component="a"
              href="/contact"
              sx={{
                color: "#c77dff",
                textDecoration: "none",
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Contact our sales team
            </Box>
            .
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default PricingWidget
