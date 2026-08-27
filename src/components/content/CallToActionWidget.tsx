import React from "react"
import { Box, Container, Typography } from "@mui/material"
import ButtonWidget from "./shared/Button"

interface CallToActionWidgetProps {
  text: string
  title?: string
  buttonText?: string
  buttonLink?: {
    url: string
    querystring: string
    title: string
    target: string
  }
  secondaryButtonText?: string
  secondaryButtonLink?: {
    url: string
    querystring: string
    title: string
    target: string
  }
  textColor?: string
  backgroundColor?: string
  containerWidth?: "small" | "default" | "big"
}

export default function CallToActionWidget({
  text,
  title,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  textColor = "var(--dexie-text)",
  backgroundColor = "var(--dexie-bg)",
  containerWidth = "default",
}: CallToActionWidgetProps) {
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

  return (
    <Box
      component="section"
      sx={{
        backgroundColor,
        color: textColor,
        py: 10,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: getContainerMaxWidth(),
          position: "relative",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            maxWidth: { md: "66.666%", lg: "50%" },
            mx: "auto",
          }}
        >
          {title && (
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 3,
                color: textColor,
              }}
            >
              {title}
            </Typography>
          )}
          <Typography
            variant="body1"
            sx={{
              color: textColor,
              fontSize: {
                xs: "1.1rem",
                md: "calc(1.152rem + .33vw) !important",
              },
              lineHeight: 1.6,
              mb: { xs: 4, sm: 6 },
              opacity: 0.85,
            }}
          >
            {text}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {buttonText && buttonLink && (
              <ButtonWidget
                text={buttonText}
                link={buttonLink}
                color="primary"
                size="large"
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              />
            )}
            {secondaryButtonText && secondaryButtonLink && (
              <ButtonWidget
                text={secondaryButtonText}
                link={secondaryButtonLink}
                color="primary"
                size="large"
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 500,
                  textTransform: "none",
                  borderColor: textColor,
                  color: textColor,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    backgroundColor: "transparent",
                    borderColor: textColor,
                    color: textColor,
                  },
                  transition: "all 0.3s ease",
                }}
              />
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
