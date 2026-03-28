"use client"

import React, { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Button,
  Link,
  useTheme,
  alpha,
} from "@mui/material"
import { LocationOn, ArrowUpward } from "@mui/icons-material"
import CookieSettings from "./CookieSettings"

const Footer = () => {
  const theme = useTheme()
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Main Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: "#0a0a0a",
          color: "#dee2e6",
          pt: 8,
          pb: 4,
          borderTop: `1px solid ${alpha("#dee2e6", 0.1)}`,
          position: "relative",
          zIndex: 200, // Higher than sidebar's z-index (100)
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
                lg: "1fr 1fr ",
              },
              gap: 6,
            }}
          >
            {/* Contact Us Section */}
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: "#ffffff",
                }}
              >
                Contact Us
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: "#dee2e6",
                  fontSize: "1.1rem",
                }}
              >
                Let&apos;s start the productive work.
              </Typography>

              {/* Questions & Support */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  mb: 2,
                  color: "#ffffff",
                }}
              >
                Questions & Support
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Link
                  href="https://stackoverflow.com/questions/ask?tags=dexie"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#dee2e6",
                    textDecoration: "none",
                    mb: 1,
                    "&:hover": {
                      color: "#ffffff",
                    },
                  }}
                >
                  → Ask on Stack Overflow
                </Link>
                <Typography
                  variant="body2"
                  sx={{ color: alpha("#dee2e6", 0.7), mb: 2, ml: 2 }}
                >
                  Fastest response for technical questions
                </Typography>

                <Link
                  href="https://github.com/dexie/Dexie.js/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#dee2e6",
                    textDecoration: "none",
                    mb: 1,
                    "&:hover": {
                      color: "#ffffff",
                    },
                  }}
                >
                  → File an issue on GitHub
                </Link>
                <Typography
                  variant="body2"
                  sx={{ color: alpha("#dee2e6", 0.7), mb: 2, ml: 2 }}
                >
                  Bug reports and feature requests
                </Typography>

                <Link
                  href="https://discord.gg/huhre7MHBF"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#dee2e6",
                    textDecoration: "none",
                    mb: 1,
                    "&:hover": {
                      color: "#ffffff",
                    },
                  }}
                >
                  → Chat on Discord
                </Link>
                <Typography
                  variant="body2"
                  sx={{ color: alpha("#dee2e6", 0.7), ml: 2 }}
                >
                  Community discussions
                </Typography>
              </Box>

              {/* Location */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  mb: 2,
                  color: "#ffffff",
                }}
              >
                Location
              </Typography>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: "#dee2e6" }}>
                    Störtloppsvägen 14, Hägersten, Stockholm
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: "#dee2e6" }}>
                    Oxtorget 4, Växjö
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Map Section */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  mb: 3,
                  color: "#ffffff",
                }}
              >
                Our Locations
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: {
                    xs: "300px",
                    md: "-webkit-fill-available",
                  },
                  overflow: "hidden",
                  pb: 5,
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed/v1/search?key=AIzaSyDmOtclVWnqNu30_6OQ_NFVOhdOa6NFOA4&q=Störtloppsvägen+14+Hägersten+Sweden|Oxtorget+4+Växjö+Sweden&center=57.5,16&zoom=5&maptype=satellite"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "8px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Bottom Footer */}
      <Box
        sx={{
          bgcolor: "#000000",
          color: "#dee2e6",
          py: 3,
          pb: 6, // Extra bottom padding instead of margin-top on next section
          borderTop: `1px solid ${alpha("#dee2e6", 0.1)}`,
          position: "relative",
          zIndex: 200, // Higher than sidebar's z-index (100)
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              textTransform: "uppercase",
            }}
          >
            {/* Copyright */}
            <Typography
              variant="body2"
              sx={{
                color: alpha("#dee2e6", 0.8),
                order: { xs: 3, lg: 1 },
                width: { xs: "100%", lg: "auto" },
                textAlign: { xs: "center", lg: "left" },
              }}
            >
              © 2014-2025 Awarica AB
            </Typography>

            {/* Social Links */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                flexWrap: "wrap",
                order: { xs: 1, lg: 2 },
              }}
            >
              <Link
                href="https://github.com/dexie/Dexie.js"
                target="_blank"
                rel="nofollow noopener"
                sx={{
                  color: "#dee2e6",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ffffff",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                GitHub
              </Link>
              <Link
                href="/blog"
                rel="nofollow noopener"
                sx={{
                  color: "#dee2e6",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ffffff",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Blog
              </Link>
              <Link
                href="https://stackoverflow.com/questions/tagged/dexie"
                target="_blank"
                rel="nofollow noopener"
                sx={{
                  color: "#dee2e6",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ffffff",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Stack Overflow
              </Link>
              <Link
                href="https://twitter.com/dexiejs"
                target="_blank"
                rel="nofollow noopener"
                sx={{
                  color: "#dee2e6",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ffffff",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Twitter
              </Link>
            </Box>

            {/* Back to Top */}
            <Box
              sx={{
                order: { xs: 2, lg: 3 },
                width: { xs: "100%", lg: "auto" },
                display: "flex",
                justifyContent: { xs: "center", lg: "flex-end" },
              }}
            >
              <Button
                onClick={scrollToTop}
                sx={{
                  color: "#dee2e6",
                  textTransform: "uppercase",
                  "&:hover": {
                    color: "#ffffff",
                    backgroundColor: "transparent",
                  },
                }}
                endIcon={<ArrowUpward />}
              >
                Back to top
              </Button>
            </Box>
          </Box>

          {/* Sponsors */}
          <Box sx={{ textAlign: "center", mt: 3, mb: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: alpha("#dee2e6", 0.7), mb: 1.5 }}
            >
              Browser testing via
            </Typography>
            <Link
              href="https://www.testmu.ai/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: "inline-block" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://assets.testmuai.com/resources/images/logos/logo.svg"
                alt="TestMu AI (Formerly LambdaTest)"
                width={147}
                height={26}
                style={{ verticalAlign: "middle", filter: "brightness(0.85)" }}
              />
            </Link>
          </Box>

          {/* Footer Text */}
          <Box sx={{ textAlign: "center", mt: 4, pt: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: alpha("#dee2e6", 0.8),
                mb: 1,
              }}
            >
              Made with love for great people.
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: alpha("#dee2e6", 0.6),
              }}
            >
              Read{" "}
              <Link href="/terms" sx={{ color: theme.palette.primary.main }}>
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" sx={{ color: theme.palette.primary.main }}>
                Privacy Policy
              </Link>
              .{" "}
              <Link 
                component="button"
                onClick={() => setCookieSettingsOpen(true)}
                sx={{ 
                  color: theme.palette.primary.main,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Cookie Settings
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          position: "relative",
          p: 2,
          backgroundImage: "url(https://old.dexie.org/assets/images/bg.png)",
          backgroundPosition: "0 0",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          zIndex: 200, // Higher than sidebar's z-index (100)
          boxShadow:
            "inset 0 4px 8px rgba(0, 0, 0, 0.4), inset 0 -4px 8px rgba(0, 0, 0, 0.3)",
          "&::before": {
            content: '""',
            position: "absolute",
            height: "2px",
            width: "100%",
            left: 0,
            top: 0,
            backgroundColor: "#000000",
            clipPath:
              "polygon(1% 0%, 4% 100%, 9% 0%, 13% 100%, 19% 1%, 21% 100%, 26% 5%, 30% 100%, 36% 2%, 43% 100%, 50% 1%, 52% 100%, 61% 0%, 69% 94%, 70% 0%, 76% 100%, 81% 0%, 84% 100%, 91% 0%, 97% 100%, 99% 3%)",
          },
        }}
      >
        {/* Dark overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(2px)",
            zIndex: 0,
          }}
        />
        <div suppressHydrationWarning>
          <Typography
            variant="body2"
            sx={{
              color: alpha("#dee2e6", 0.9),
              fontStyle: "italic",
              fontSize: "0.875rem",
              py: 2,
              position: "relative",
              zIndex: 1,
              textAlign: "center",
            }}
          >
            We recently launched a new website! Missing something? Visit the{" "}
            <Link
              href="https://old.dexie.org"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textDecoration: "underline",
                "&:hover": {
                  textDecoration: "underline",
                  color: theme.palette.primary.light,
                },
              }}
            >
              old site
            </Link>
            . Your{" "}
            <Link
              href="/contact"
              sx={{
                textDecoration: "underline",
                "&:hover": {
                  textDecoration: "underline",
                  color: theme.palette.primary.light,
                },
              }}
            >
              feedback
            </Link>{" "}
            is welcome!
          </Typography>
        </div>
      </Box>

      {/* Cookie Settings Dialog */}
      <CookieSettings 
        open={cookieSettingsOpen}
        onClose={() => setCookieSettingsOpen(false)}
      />
    </>
  )
}

export default Footer
