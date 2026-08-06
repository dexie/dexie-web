"use client"

import React from "react"
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Link,
  SxProps,
  Theme,
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import LaunchIcon from "@mui/icons-material/Launch"
import EmailIcon from "@mui/icons-material/Email"

export interface PreferredPartner {
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

interface PreferredPartnersWidgetProps {
  partners: PreferredPartner[]
  settings?: {
    textColor?: string
    backgroundColor?: string
    containerWidth?: "small" | "medium" | "big"
    sectionTitle?: string
    sectionSubtitle?: string
  }
  sx?: SxProps<Theme>
}

export default function PreferredPartnersWidget({
  partners,
  settings = {},
  sx = {},
}: PreferredPartnersWidgetProps) {
  const {
    textColor = "var(--dexie-text)",
    backgroundColor = "var(--dexie-bg)",
    containerWidth = "big",
    sectionTitle = "Preferred Partners",
    sectionSubtitle = "Work with certified Dexie Cloud experts who can help you implement, migrate, and optimize your offline-first applications",
  } = settings

  const getMaxWidth = () => {
    switch (containerWidth) {
      case "small":
        return "sm"
      case "medium":
        return "md"
      case "big":
        return "xl"
      default:
        return "xl"
    }
  }

  return (
    <Box sx={{ backgroundColor, py: 8, ...sx }}>
      <Container maxWidth={getMaxWidth()}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 2,
            color: textColor,
            fontWeight: 600,
          }}
        >
          {sectionTitle}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: 6,
            color: "var(--dexie-text-muted)",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          {sectionSubtitle}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 4,
            alignItems: "stretch", // Changed from "flex-start" to "stretch"
          }}
        >
          {/* Partners Section - 2/3 width */}
          <Box
            sx={{
              flex: { xs: "1", lg: "2" },
              width: { xs: "100%", lg: "66.67%" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(auto-fit, minmax(400px, 1fr))",
                },
                gap: 4,
                flex: 1, // Added to fill available height
              }}
            >
              {partners.map((partner, index) => (
                <Card
                  key={index}
                  sx={{
                    backgroundColor: "var(--dexie-surface-deep)",
                    border: "1px solid #333",
                    borderRadius: "12px",
                    "&:hover": {
                      borderColor: "#555",
                      transform: "translateY(-2px)",
                      transition: "all 0.2s ease-in-out",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      {partner.logo && (
                        <Box
                          component="img"
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          sx={{
                            width: 48,
                            height: 48,
                            mr: 2,
                            objectFit: "contain",
                          }}
                        />
                      )}
                      <Box>
                        <Typography
                          variant="h5"
                          component="h3"
                          sx={{ color: textColor, fontWeight: 600, mb: 0.5 }}
                        >
                          {partner.name}
                        </Typography>
                        <Link
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: "var(--dexie-accent)",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "0.9rem",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Visit Website
                          <LaunchIcon sx={{ ml: 0.5, fontSize: "1rem" }} />
                        </Link>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "var(--dexie-text-muted)",
                        mb: 3,
                        lineHeight: 1.6,
                      }}
                    >
                      {partner.description}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        color: textColor,
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      Services
                    </Typography>

                    <List sx={{ padding: 0, mb: 3 }}>
                      {partner.services.map((service, serviceIndex) => (
                        <ListItem
                          key={serviceIndex}
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
                                color: "#00d4aa",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                component="span"
                                sx={{
                                  color: textColor,
                                  fontSize: "0.9rem",
                                  lineHeight: 1.4,
                                }}
                              >
                                {service}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>

                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        href={`mailto:${partner.contact.email}`}
                        variant="contained"
                        startIcon={<EmailIcon />}
                        sx={{
                          backgroundColor: "var(--dexie-accent)",
                          color: "var(--dexie-bg)",
                          borderRadius: "8px",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "#b366ff",
                          },
                        }}
                      >
                        Contact
                      </Button>
                      <Button
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        sx={{
                          borderColor: "var(--dexie-accent)",
                          color: "var(--dexie-accent)",
                          borderRadius: "8px",
                          textTransform: "none",
                          "&:hover": {
                            borderColor: "#b366ff",
                            backgroundColor: "rgba(199, 125, 255, 0.1)",
                          },
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Become a Partner Section - 1/3 width */}
          <Box
            sx={{
              flex: { xs: "1", lg: "1" },
              width: { xs: "100%", lg: "33.33%" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                p: 4,
                backgroundColor: "var(--dexie-surface-deep)",
                borderRadius: "12px",
                border: "1px solid #333",
                flex: 1, // Added to fill available height
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Distribute content evenly
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: textColor,
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Become a Preferred Partner
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--dexie-text-muted)",
                  mb: 3,
                  lineHeight: 1.6,
                  flex: 1, // Added to take up remaining space
                }}
              >
                Are you an expert in Dexie Cloud and offline-first development?
                Join our preferred partner program and help businesses implement
                robust offline-first solutions.
              </Typography>
              <Button
                href="/contact"
                variant="outlined"
                sx={{
                  borderColor: "var(--dexie-accent)",
                  color: "var(--dexie-accent)",
                  borderRadius: "8px",
                  textTransform: "none",
                  width: "100%",
                  mt: "auto", // Push button to bottom
                  "&:hover": {
                    borderColor: "#b366ff",
                    backgroundColor: "rgba(199, 125, 255, 0.1)",
                  },
                }}
              >
                Apply to Partner Program
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
