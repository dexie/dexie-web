"use client"

import React, { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from "@mui/material"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import Image from "next/image"

interface FeaturePoint {
  id: number
  number: string
  title: string
  description: string
  position: {
    x: number // Procent från vänster
    y: number // Procent från toppen
  }
}

interface ScreenshotSlide {
  id: number
  title: string
  description?: string
  imageUrl: string
  imageAlt: string
  features: FeaturePoint[]
}

interface FeatureScreenshotWidgetProps {
  sectionCaption?: string
  sectionTitle?: string
  description?: string | React.ReactNode
  slides: ScreenshotSlide[]
  textColor?: string
  backgroundColor?: string
  containerWidth?: "small" | "default" | "big"
}

export default function FeatureScreenshotWidget({
  sectionCaption = "Features",
  sectionTitle = "Product Features",
  description = "",
  slides,
  textColor = "#333333",
  backgroundColor = "var(--dexie-bright)",
  containerWidth = "default",
}: FeatureScreenshotWidgetProps) {
  const theme = useTheme()
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Container width mapping
  const getContainerMaxWidth = () => {
    switch (containerWidth) {
      case "small":
        return "600px"
      case "big":
        return "1400px"
      case "default":
      default:
        return "1200px"
    }
  }

  if (!slides || slides.length === 0) {
    return null
  }

  const currentSlideData = slides[currentSlide]

  return (
    <Box
      component="section"
      sx={{
        backgroundColor,
        color: textColor,
        py: 10,
        position: "relative",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: getContainerMaxWidth(),
          position: "relative",
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          {/* Section Caption */}
          <Typography
            variant="overline"
            component="h2"
            sx={{
              color: textColor,
              opacity: 0.7,
              fontSize: "0.875rem",
              fontWeight: 500,
              mb: 1,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {sectionCaption}
          </Typography>

          {/* Section Title */}
          <Typography
            variant="h1"
            component="h3"
            sx={{
              color: textColor,
              mb: 3,
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.2,
              fontWeight: 600,
            }}
          >
            {sectionTitle}
          </Typography>

          {/* Description */}
          {description && (
            <Typography
              variant="body1"
              sx={{
                color: textColor,
                opacity: 0.8,
                fontSize: "1.2rem",
                lineHeight: 1.6,
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        {/* Slide Navigation Dots */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mb: 4,
          }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor:
                  currentSlide === index ? textColor : `${textColor}40`,
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: textColor,
                },
              }}
            />
          ))}
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 4, md: 6 },
            alignItems: "stretch",
          }}
        >
          {/* Left Column - Screenshot with Feature Points */}
          <Box
            sx={{
              width: { xs: "100%", lg: "60%" },
              position: "relative",
            }}
          >
            {/* Slide Title */}
            <Typography
              variant="h4"
              sx={{
                color: textColor,
                mb: 3,
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: 500,
              }}
            >
              {currentSlideData.title}
            </Typography>

            {/* Screenshot Container */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                border: `1px solid ${textColor}20`,
              }}
            >
              <Image
                src={currentSlideData.imageUrl}
                alt={currentSlideData.imageAlt}
                width={800}
                height={600}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />

              {/* Feature Point Markers */}
              {currentSlideData.features.map((feature) => (
                <Box
                  key={feature.id}
                  sx={{
                    position: "absolute",
                    left: `${feature.position.x}%`,
                    top: `${feature.position.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.secondary.main,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: "bold",
                      boxShadow: "0 4px 12px rgba(0,127,255,0.3)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translate(-50%, -50%) scale(1.1)",
                        boxShadow: "0 6px 16px rgba(0,127,255,0.4)",
                      },
                    }}
                  >
                    {feature.number}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Navigation Arrows */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 3,
              }}
            >
              <IconButton
                onClick={prevSlide}
                disabled={slides.length <= 1}
                sx={{
                  width: "40px",
                  height: "40px",
                  display: "flex !important",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",

                  backgroundColor: `${textColor}10`,
                  color: textColor,
                  "&:hover": {
                    backgroundColor: `${textColor}20`,
                  },
                  "&:disabled": {
                    opacity: 0.3,
                  },
                }}
              >
                <ArrowBackIosIcon
                  sx={{ width: "20px", height: "20px", marginLeft: "5px" }}
                />
              </IconButton>

              <IconButton
                onClick={nextSlide}
                disabled={slides.length <= 1}
                sx={{
                  width: "40px",
                  height: "40px",
                  display: "flex !important",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  backgroundColor: `${textColor}10`,
                  color: textColor,
                  "&:hover": {
                    backgroundColor: `${textColor}20`,
                  },
                  "&:disabled": {
                    opacity: 0.3,
                  },
                }}
              >
                <ArrowForwardIosIcon
                  sx={{ width: "20px", height: "20px", marginRight: "0px" }}
                />
              </IconButton>
            </Box>
          </Box>

          {/* Right Column - Feature Descriptions */}
          <Box
            sx={{
              width: { xs: "100%", lg: "40%" },
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Slide Description */}
            {currentSlideData.description && (
              <Typography
                variant="body1"
                sx={{
                  color: textColor,
                  opacity: 0.8,
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  mb: 2,
                }}
              >
                {currentSlideData.description}
              </Typography>
            )}

            {/* Feature Cards */}
            {currentSlideData.features.map((feature) => (
              <Card
                key={feature.id}
                sx={{
                  backgroundColor: `${textColor}05`,
                  border: `1px solid ${textColor}15`,
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: `${textColor}10`,
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                    }}
                  >
                    {/* Feature Number */}
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.secondary.main,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold",
                        flexShrink: 0,
                        mt: 0.5,
                      }}
                    >
                      {feature.number}
                    </Box>

                    {/* Feature Content */}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: textColor,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: textColor,
                          opacity: 0.8,
                          lineHeight: 1.5,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
