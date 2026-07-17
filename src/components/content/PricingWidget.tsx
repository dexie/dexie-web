"use client";

import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import PublicIcon from "@mui/icons-material/Public";
import ButtonWidget from "./shared/Button";
import TypeWriter from "./shared/TypeWriter";

export interface PricingPlan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  buttonText: string;
  buttonLink: {
    url: string;
    querystring: string;
    title: string;
    target: string;
  };
  isPopular?: boolean;
  badge?: {
    text: string;
    variant?: "outlined" | "contained";
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
  };
  sectionTitle?: string;
  features: {
    text: string;
    subtext?: string;
  }[];
  borderRadius?: string;
  contactSalesText?: string;
  contactSalesLink?: string;
}

export interface PricingSettings {
  textColor?: string;
  backgroundColor?: string;
  containerWidth?: "small" | "medium" | "big";
  sectionTitle?: string;
  sectionSubtitle?: string;
  typewriterStrings?: string[];
}

export interface PricingWidgetProps {
  cloudPlans?: PricingPlan[]; // Kept for prop-compatibility; tiers are defined dynamically below.
  onPremisesPlans?: PricingPlan[];
  settings: PricingSettings;
  sx?: SxProps<Theme>;
}

// Shared hover treatment for every tier card so hovering feels identical and
// instantaneous everywhere (no laggy CSS transition, no card left un-styled,
// no low-contrast text against the accent color).
const CARD_HOVER_SX = {
  transition:
    "transform 0.12s ease-out, box-shadow 0.12s ease-out, border-color 0.12s ease-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 24px rgba(199, 125, 255, 0.12)",
    borderColor: "#c77dff",
  },
} as const;

const PricingWidget: React.FC<PricingWidgetProps> = ({ settings, sx }) => {
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down("lg"));
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD");
  const [currencyDetected, setCurrencyDetected] = useState(false);

  // Detect the visitor's region via a lightweight, keyless geo-IP lookup and
  // default the currency accordingly. Falls back to timezone heuristics if
  // the network request fails or is blocked (ad-blockers, offline, etc).
  useEffect(() => {
    let cancelled = false;

    const applyFromTimezone = () => {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz && tz.toLowerCase().startsWith("europe/")) {
          if (!cancelled) setCurrency("EUR");
        }
      } catch {
        // ignore — keep default USD
      } finally {
        if (!cancelled) setCurrencyDetected(true);
      }
    };

    fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(2500) })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (cancelled) return;
        const isEuropean =
          data?.in_eu === true ||
          data?.continent_code === "EU" ||
          (typeof data?.timezone === "string" &&
            data.timezone.toLowerCase().startsWith("europe/"));
        setCurrency(isEuropean ? "EUR" : "USD");
        setCurrencyDetected(true);
      })
      .catch(() => {
        applyFromTimezone();
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const isEUR = currency === "EUR";
  const symbol = isEUR ? "€" : "$";

  const getMaxWidth = () => {
    switch (settings.containerWidth) {
      case "small":
        return "sm";
      case "medium":
        return "md";
      case "big":
      default:
        return "xl";
    }
  };

  // Resource-based pricing only. This is the only model promoted going
  // forward — legacy per-seat pricing continues to be honored for existing
  // customers via grandfathering, but is not shown or offered here.
  const activePlans: PricingPlan[] = [
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
        {
          text: "Unlimited end users",
          subtext: "No seat caps or per-user billing.",
        },
        { text: "Customizable OTP authentication" },
        {
          text: "1 GB Postgres storage",
          subtext: "Hard limit — upgrade to remove.",
        },
        {
          text: "5 GB Blob storage",
          subtext: "Hard limit — upgrade to remove.",
        },
        { text: "1M Sync Units (SU) / month" },
        { text: "Community support" },
      ],
    },
    {
      id: "indie",
      title: "Indie",
      subtitle: "For scalable production applications.",
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
          text: "Unlimited end users",
          subtext: "No seat caps or per-user billing.",
        },
        {
          text: "10 GB Postgres storage",
          subtext: `No hard limit — overage €0.15/GB/mo${!isEUR ? " (billed in EUR)" : ""}`,
        },
        {
          text: "25 GB Blob storage",
          subtext: `No hard limit — overage €0.03/GB/mo${!isEUR ? " (billed in EUR)" : ""}`,
        },
        {
          text: "5M Sync Units (SU) / month",
          subtext: `No hard cap — overage €4/1M SU${!isEUR ? " (billed in EUR)" : ""}`,
        },
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
        { text: "Unlimited end users" },
        {
          text: "50 GB Postgres storage",
          subtext: `No hard limit — overage €0.15/GB/mo${!isEUR ? " (billed in EUR)" : ""}`,
        },
        {
          text: "100 GB Blob storage",
          subtext: `No hard limit — overage €0.03/GB/mo${!isEUR ? " (billed in EUR)" : ""}`,
        },
        {
          text: "25M Sync Units (SU) / month",
          subtext: `No hard cap — overage €3/1M SU${!isEUR ? " (billed in EUR)" : ""}`,
        },
        { text: "Priority support (faster response)" },
      ],
    },
    {
      id: "scale",
      title: "Scale",
      subtitle: "When you need priority response targets & expert help.",
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
        {
          text: "Premium Support included",
          subtext:
            "Priority email support, AI-assisted + human review by Liz & David (1 business day SLA target; incidents excluded).",
        },
        {
          text: "200 GB Postgres storage",
          subtext: `No hard limit — overage €0.12/GB/mo${!isEUR ? " (billed in EUR)" : ""}`,
        },
        {
          text: "500 GB Blob storage",
          subtext: `No hard limit — overage €0.025/GB/mo${!isEUR ? " (billed in EUR)" : ""}`,
        },
        {
          text: "100M Sync Units (SU) / month",
          subtext: `No hard cap — overage €2/1M SU${!isEUR ? " (billed in EUR)" : ""}`,
        },
        { text: "Prioritized E2E encryption & custom auth guidance" },
      ],
    },
  ];

  const foundersPlan = {
    id: "founders",
    title: "Founder's Circle",
    subtitle:
      "White-glove service and direct engineering alignment for high-scale apps.",
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
      "Unlimited databases & end users",
      "Dedicated Slack channel with Dexie.js core team",
      "Custom SLA & contract terms",
      "Full server source code access options",
      "White-glove database migration guidance",
    ],
  };

  const onPremisesPlan = {
    id: "onprem",
    title: "On-Premises Enterprise",
    subtitle:
      "Complete data sovereignty, absolute control over infrastructure, and full source code access.",
    price: "€7,995",
    priceNote: "One-time purchase / perpetual license",
    buttonText: "Buy License",
    buttonLink: {
      url: "/contact",
      querystring: "",
      title: "Contact Us",
      target: "_self",
    },
    features: [
      "Full server source code access (via private GitHub repo) for absolute independence",
      "Unlimited databases, end users, and unlimited scale",
      "1 year of Priority Support and software updates included",
      "Optional Year 2 support/updates renewal (€1,495/yr) — perpetual usage regardless",
      "Self-host anywhere on your own servers (Docker/Kubernetes)",
      "Zero recurring software licensing fees",
    ],
  };

  const renderPricingCard = (plan: PricingPlan) => {
    return (
      <Box
        key={plan.id}
        sx={{
          flex: 1,
          display: "flex",
          position: "relative",
          minWidth: {
            xs: "100%",
            md: "calc(50% - 16px)",
            lg: "calc(25% - 18px)",
          },
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
            // Every tier card (including the "Popular" Indie card) shares the
            // exact same border/shadow hover treatment — no always-on gradient
            // rim, no extra pseudo-element paint work, no purple background.
            // "Popular"/"Recommended" status is communicated via the outlined
            // badge chip only, not via a different card border.
            ...CARD_HOVER_SX,
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
            <Box
              sx={{
                position: "relative",
                mb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
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

            <Divider sx={{ mb: 3, opacity: 0.1, backgroundColor: "#ffffff" }} />

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

              <List
                sx={{
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {plan.features.map((feature, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start !important",
                      alignItems: "flex-start !important",
                      borderRadius: "8px",
                      mx: "-8px !important",
                      px: "8px !important",
                      py: "6px !important",
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
                            }}
                          >
                            {feature.text}
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
    );
  };

  const renderPremiumCard = (
    plan: typeof foundersPlan | typeof onPremisesPlan,
    variant: "outlined" | "contained",
  ) => (
    <Card
      sx={{
        flex: 1,
        backgroundColor: "#161616",
        border: "1px solid #2d2d2d",
        borderRadius: "20px",
        p: { xs: 2, md: 3 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ...CARD_HOVER_SX,
      }}
    >
      <CardContent
        sx={{
          textAlign: "left",
          p: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              mb: 1,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography
              variant="h5"
              component="h3"
              sx={{ fontWeight: 700, color: "#ffffff" }}
            >
              {plan.title}
            </Typography>
            <Typography variant="h6" sx={{ color: "#c77dff", fontWeight: 600 }}>
              {plan.price}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "#adb5bd",
              mb: 3,
              fontSize: "0.85rem",
              minHeight: "40px",
            }}
          >
            {plan.subtitle}
          </Typography>
          <Divider sx={{ my: 2, opacity: 0.1, backgroundColor: "#ffffff" }} />
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              p: 0,
              mb: 4,
            }}
          >
            {plan.features.map((feature, idx) => (
              <ListItem
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  borderRadius: "8px",
                  mx: "-8px",
                  px: "8px",
                  py: "6px",
                }}
              >
                <ListItemIcon sx={{ minWidth: "auto", mr: 1.5, mt: "3px" }}>
                  <CheckIcon sx={{ fontSize: "14px", color: "#c77dff" }} />
                </ListItemIcon>
                <ListItemText
                  primary={feature}
                  primaryTypographyProps={{
                    sx: {
                      color: "#ffffff",
                      fontSize: "0.85rem",
                      textAlign: "left",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <ButtonWidget
          text={plan.buttonText}
          link={plan.buttonLink}
          color="primary"
          size="medium"
          variant={variant}
          sx={
            variant === "contained"
              ? {
                  borderRadius: "50px",
                  width: "100%",
                  py: 1,
                  backgroundColor: "#c77dff",
                  color: "#000000",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#b25eff",
                  },
                }
              : {
                  borderRadius: "50px",
                  width: "100%",
                  py: 1,
                  borderColor: "#c77dff",
                  color: "#c77dff",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "rgba(199, 125, 255, 0.1)",
                    borderColor: "#c77dff",
                  },
                }
          }
        />
      </CardContent>
    </Card>
  );

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
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: 700,
              mb: 2,
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
            }}
          >
            {settings.sectionTitle}
          </Typography>
          {settings.typewriterStrings && settings.typewriterStrings.length > 0 && (
            <Typography
              variant="h2"
              component="div"
              sx={{
                fontSize: { xs: "1.2rem", md: "1.6rem" },
                fontWeight: 500,
                color: "#adb5bd",
                mb: 4,
                display: "block",
              }}
            >
              Cloud &amp; on-premises with{" "}
              <TypeWriter
                colorClass=""
                breakRows={false}
                strings={settings.typewriterStrings}
              />
            </Typography>
          )}
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

          {/* Discreet currency switcher — small, low-key, not a loud button pair.
              Defaults from geo-detection but visitors can override at any time. */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Box
              role="group"
              aria-label="Currency"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid #2d2d2d",
                borderRadius: "20px",
                px: "4px",
                py: "3px",
                opacity: currencyDetected ? 1 : 0.6,
                transition: "opacity 0.15s ease-out",
              }}
            >
              <PublicIcon
                sx={{ fontSize: "13px", color: "#6c757d", ml: 0.5 }}
              />
              {(["USD", "EUR"] as const).map((c) => (
                <Box
                  key={c}
                  component="button"
                  type="button"
                  onClick={() => setCurrency(c)}
                  aria-pressed={currency === c}
                  sx={{
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "16px",
                    px: 1.2,
                    py: 0.4,
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    fontFamily: "inherit",
                    backgroundColor:
                      currency === c
                        ? "rgba(199, 125, 255, 0.18)"
                        : "transparent",
                    color: currency === c ? "#c77dff" : "#6c757d",
                    transition:
                      "background-color 0.1s ease-out, color 0.1s ease-out",
                    "&:hover": {
                      color: "#c77dff",
                    },
                  }}
                >
                  {c === "USD" ? "$ USD" : "€ EUR"}
                </Box>
              ))}
            </Box>
          </Box>

          {/* VAT / tax legal notice — shown for every currency, not just EUR,
              per legal guidance that ex-VAT disclosure should be persistent. */}
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
            Prices are exclusive of VAT. VAT may be added depending on your
            billing country.
          </Typography>
        </Box>

        {/* Standard 4-Tier Grid — resource-based pricing only. */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 4,
          }}
        >
          {activePlans.map((plan) => renderPricingCard(plan))}
        </Box>

        {/* Premium paths: Founder's Circle (SaaS) & On-Premises Enterprise (self-hosted) side by side. */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 3,
            mt: 4,
            mb: 6,
          }}
        >
          {renderPremiumCard(foundersPlan, "outlined")}
          {renderPremiumCard(onPremisesPlan, "contained")}
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
  );
};

export default PricingWidget;
