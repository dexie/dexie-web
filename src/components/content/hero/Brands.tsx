"use client";

import React from "react";
import Image from "next/image";
import { Box, Container, Typography, SxProps } from "@mui/material";
import Link from "next/link";
import { useThemeMode } from "@/theme/ThemeModeProvider";

interface BrandProps {
  sx?: SxProps;
}

export default function Brands({ sx }: BrandProps) {
  const { mode } = useThemeMode();
  const brands = [
    {
      src: "/assets/images/brands/facebook.png",
      width: 120,
      height: 35,
      alt: "Facebook",
      link: "https://www.facebook.com",
    },
    {
      src: "/assets/images/brands/openai.png",
      width: 125,
      height: 35,
      alt: "OpenAI",
      link: "https://www.openai.com",
    },
    {
      src: "/assets/images/brands/microsoft.png",
      width: 164,
      height: 35,
      alt: "Microsoft",
      link: "https://www.microsoft.com",
    },
    {
      src: "/assets/images/brands/whatsapp.png",
      width: 148,
      height: 35,
      alt: "WhatsApp",
      link: "https://www.whatsapp.com",
    },
    {
      src: "/assets/images/brands/github.png",
      width: 119,
      height: 35,
      alt: "GitHub",
      link: "https://github.com",
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        ...sx,
        position: "relative",
        py: 8,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: "66.67%", // equivalent to col-md-8
          mx: "auto", // equivalent to offset-md-2
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontSize: {
              xs: "1rem",
              md: "1.2rem",
            },
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "2px",
            mb: 4,
            color: "text.secondary",
          }}
        >
          Trusted by leading companies
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gap: 3,
            alignItems: "center",
            justifyItems: "center",
            zoom: 0.8,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          {brands.map((brand, index) => (
            <Link
              key={index}
              href={brand.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
              title={brand.alt}
            >
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // Normalize the mixed-fidelity brand assets to a single
                  // muted monochrome bar. In light mode the white/transparent
                  // logos are darkened to a uniform gray; in dark mode they
                  // stay as-is. This reads far more premium than mismatched
                  // colorful marks.
                  opacity: mode === "light" ? 0.75 : 0.7,
                  transition: "opacity 0.3s ease",
                  filter:
                    mode === "light"
                      ? "grayscale(1) brightness(0) opacity(0.78)"
                      : "none",
                  "&:hover": {
                    opacity: 1,
                    filter: mode === "light" ? "grayscale(1) brightness(0.1)" : "none",
                  },
                }}
              >
                <Image
                  src={brand.src}
                  className="brand-logo"
                  width={brand.width}
                  height={brand.height}
                  alt={brand.alt}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
