"use client"

import React from "react"
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
  cloudPlans: PricingPlan[]
  onPremisesPlans: PricingPlan[]
  settings: PricingSettings
  sx?: SxProps<Theme>
}

const PricingWidget: React.FC<PricingWidgetProps> = ({
  cloudPlans,
  // onPremisesPlans,
  settings,
  sx,
}) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"))
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

  const renderPricingCard = (
    plan: PricingPlan,
    index: number,
    totalPlans: number,
  ) => {
    let borderRadius = "0px"

    if (isSmallScreen) {
      if (index === 0 || index === 2) {
        borderRadius = "20px 20px 0px 0px"
      } else {
        borderRadius = "0px 0px 20px 20px"
      }
    } else {
      if (totalPlans === 1) {
        borderRadius = "20px"
      } else if (index === 0) {
        borderRadius = "20px 0px 0px 20px"
      } else if (index === totalPlans - 1) {
        borderRadius = "0px 20px 20px 0px"
      }
    }

    return (
      <Box
        key={plan.id}
        sx={{
          flex: 1,
          display: "flex",
          position: "relative",
          minWidth: 0,
          mt: {
            xs: index == 0 ? 4 : index == 2 ? 8 : 0,
            sm: 0,
          },
        }}
      >
        <Card
          sx={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2d2d2d",
            borderRadius: borderRadius,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "visible",

            ...(plan.isPopular && {
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(45deg, #7b2cbf, #9d4edd, #c77dff)",
                borderRadius: borderRadius,
                padding: "2px",
                zIndex: -1,
              },
            }),
          }}
        >
          {[0, 2].includes(index) && (
            <Box
              sx={{
                position: "absolute",
                top: "-54px",
                minWidth: "70%",
                left: "calc(50% - 8px)",
                transform: "translateX(-50%)",
                textAlign: "center",
                zIndex: 1,
                zoom: 0.8,
                whiteSpace: "nowrap",
                display: { xs: "block", sm: "none" },
              }}
            >
              {renderTabHeader(index == 0 ? "Cloud" : "On-Premises")}
            </Box>
          )}
          <CardContent
            sx={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              textAlign: "left",
            }}
          >
            <Box sx={{ position: "relative", mb: 1 }}>
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  color: settings.textColor || "#ffffff",
                  fontWeight: 700,
                  display: "inline-block",
                  mr: plan.badge ? 1 : 0,
                }}
              >
                {plan.title}
              </Typography>
              {plan.badge && (
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    backgroundColor:
                      plan.badge.variant === "outlined"
                        ? "transparent"
                        : plan.badge.backgroundColor || "#c77dff",
                    color:
                      plan.badge.variant === "outlined"
                        ? plan.badge.borderColor ||
                          plan.badge.color ||
                          "#c77dff"
                        : plan.badge.color || "#ffffff",
                    border:
                      plan.badge.variant === "outlined"
                        ? `1px solid ${
                            plan.badge.borderColor ||
                            plan.badge.color ||
                            "#c77dff"
                          }`
                        : "none",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "12px",
                    ml: 1,
                    verticalAlign: "middle",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    zoom: 0.8,
                    mb: 0.5,
                  }}
                >
                  {plan.badge.text}
                </Box>
              )}
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: settings.textColor || "#ffffff",
                mb: 3,
                fontSize: "0.9rem",
                minHeight: "48px",
              }}
            >
              {plan.subtitle}
            </Typography>

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
                  "&:hover": {
                    borderColor: "#c77dff",
                    backgroundColor: "rgba(199, 125, 255, 0.1)",
                  },
                }}
              />
            </Box>

            <Typography
              variant="h3"
              component="div"
              sx={{
                color: settings.textColor || "#ffffff",
                fontWeight: 700,
                fontSize: "2.5rem",
                alignSelf: "flex-start",
                mb: 0.5,
              }}
            >
              {plan.price}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: settings.textColor || "#ffffff",
                opacity: 0.7,
                fontSize: "0.8rem",
                mb: 2,
              }}
            >
              {plan.priceNote}
            </Typography>

            <Divider
              sx={{ mb: 3, opacity: 0.05, backgroundColor: "#ffffff" }}
            />

            <Box sx={{ flex: 1 }}>
              {plan.sectionTitle && (
                <Typography
                  variant="caption"
                  sx={{
                    color: settings.textColor || "#ffffff",
                    opacity: 0.7,
                    fontSize: "0.8rem",
                    mb: 3,
                    display: "block",
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
                      alignContent: "flex-start !important",
                      p: "1px !important",
                      pb: "5px !important",
                      pl: "10px !important",
                      ml: "-10px !important",
                      borderRadius: "4px",
                      "& .MuiTypography-root": {
                        mb: "0px",
                      },
                      "& .MuiListItemText-root": {
                        m: "0px",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "auto",
                        mr: 1,
                        justifyContent: "flex-start",
                        alignContent: "flex-start",
                      }}
                    >
                      <CheckIcon
                        sx={{
                          fontSize: "16px",
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
                              fontSize: "0.9rem",
                              lineHeight: 1.4,
                            }}
                          >
                            {feature.text}
                          </Typography>
                          {feature.subtext && (
                            <Typography
                              component="div"
                              sx={{
                                color: settings.textColor || "#ffffff",
                                opacity: 0.65,
                                fontSize: "0.8rem",
                                marginTop: "4px",
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

            {plan.contactSalesText && plan.contactSalesLink && (
              <Box sx={{ textAlign: "center", mt: 2, mb: -2, mr: -2 }}>
                <Box
                  component="a"
                  href={plan.contactSalesLink}
                  sx={{
                    color: "#adb5bd",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                    "&:hover": {
                      color: "#c77dff",
                      textDecoration: "underline",
                    },
                    transition: "color 0.2s ease",
                  }}
                >
                  {plan.contactSalesText} →
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    )
  }

  const renderTabHeader = (title: string) => {
    const borderRadius = "20px 20px 0px 0px"

    return (
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "40%",
          },
          padding: "12px 16px",
          fontWeight: "bold",
          backgroundColor: "#2d2d2d",
          borderRadius: borderRadius,
          textAlign: "center",
          fontSize: "1.2em",
          color: "white",
          margin: "0 5%",
          boxShadow: "inset 0 -5px 5px -5px rgba(0, 0, 0, 0.3)",
        }}
      >
        {title}
      </Box>
    )
  }

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: settings.backgroundColor || "#000000",
        color: settings.textColor || "#ffffff",
        py: { xs: 3, md: 10 },
        ...sx,
      }}
    >
      <Container maxWidth={getMaxWidth()} sx={{ position: "relative" }}>
        {/* Header Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 6, md: 10 },
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "9vw", md: "3.5rem" },
              fontWeight: 500,
              mb: 4,
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
                fontSize: { xs: "1rem", md: "1.4rem" },
                opacity: 0.85,
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              {settings.sectionSubtitle}
            </Typography>
          )}
        </Box>

        {/* Pricing Tables */}
        <Box sx={{ mb: 6 }}>
          {/* Cloud Section */}
          <Box sx={{ mb: 6 }}>
            <Box
              sx={{
                justifyContent: "stretch",
                mb: 0,
                display: { xs: "none", lg: "flex" },
              }}
            >
              {renderTabHeader("Cloud")}
              {renderTabHeader("On-Premises")}
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 0,
                flexWrap: "wrap",
                "@media (max-width: 960px)": {
                  flexDirection: "column",
                },
              }}
            >
              {cloudPlans.map((plan, index) =>
                renderPricingCard(plan, index, cloudPlans.length),
              )}
            </Box>
          </Box>

          {/* Need Help Section */}
          {/* <Box
            sx={{ display: "flex", justifyContent: "center", mb: 6, mt: -6 }}
          >
            <Box
              sx={{
                width: "40%",
                padding: "12px 16px",
                fontWeight: "bold",
                backgroundColor: "#2d2d2d",
                borderRadius: "0px 0px 20px 20px",
                textAlign: "center",
                fontSize: "1em",
                color: "white",
                boxShadow: "inset 0 5px 5px -5px rgba(0, 0, 0, 0.6)",
              }}
            >
              Need help choosing a plan?
            </Box>
          </Box> */}
        </Box>

        {/* Footer Text */}
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
            mt: { xs: 4, md: 6 },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              opacity: 0.85,
              lineHeight: 1.6,
              fontSize: { xs: "0.9rem", md: "1rem" },
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
