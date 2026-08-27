import React from "react"
import {
  Box,
  Container,
  Typography,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import { BenefitsSettings } from "@/types/widgets"

export interface BenefitItem {
  id: number
  className?: string
  title: string
  description: string
  keyPoints: string[]
  svgPath: string
}

interface BenefitsProps {
  items: BenefitItem[]
  settings?: BenefitsSettings
}

export default function Benefits({
  items,
  settings: {
    textColor = "var(--dexie-text)",
    containerWidth = "default",
    backgroundColor = "var(--dexie-bg)",
    sectionTitle = "Primary Benefits",
    sectionSubtitle = "Why use Dexie?",
  } = {},
}: BenefitsProps) {
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

  // Split items into two rows: first 3 and remaining items
  const firstRowItems = items.slice(0, 3)
  const secondRowItems = items.slice(3)

  const renderFeatureItem = (item: BenefitItem) => (
    <Box
      key={item.id}
      sx={{
        width: { xs: "100%", md: "33.333%", lg: "25%" },
        px: { xs: 0, sm: 2 },
        mb: { xs: 4, sm: 0 },
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
          borderLeft: {
            xs: "none",
            md: `1px solid ${textColor}`,
          },
          borderRadius: 0,
          width: "100%",
          pl: 3,
        }}
      >
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <Box
            sx={{
              mb: 2,
              "& .MuiSvgIcon-root": { width: "2em", height: "2em" },
              mt: {
                xs: 4,
                md: 0,
              },
            }}
          >
            <SvgIcon
              sx={{
                width: 24,
                height: 24,
                color: textColor,
                mb: 2,
              }}
            >
              <path d={item.svgPath} />
            </SvgIcon>
          </Box>
          <Typography
            variant="h5"
            component="h4"
            sx={{
              color: textColor,
              mb: 2,
              fontWeight: 600,
              fontSize: "1.25rem",
            }}
          >
            {item.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: textColor,
              mb: 4,
              opacity: 0.8,
              lineHeight: 1.6,
            }}
          >
            {item.description}
          </Typography>
          <List
            sx={{
              p: 0,
              mt: 4,
              "& .MuiListItem-root:hover": {
                borderRadius: "4px !important",
                padding: "0px 10px !important",
                margin: "0px -10px!important",
                backgroundColor: "rgba(255, 255, 255, 0.075) !important",
              },
            }}
          >
            {item.keyPoints.map((point, index) => (
              <ListItem
                key={index}
                sx={{
                  p: "0px !important",
                  "& .MuiTypography-root": {
                    mb: "0px",
                  },
                  "& .MuiListItemText-root": {
                    m: "0px",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                  <CheckIcon
                    sx={{
                      color: textColor,
                      fontSize: "1rem",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={point}
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: textColor,
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Box>
    </Box>
  )

  return (
    <Box
      component="section"
      sx={{
        backgroundColor,
        color: textColor,
        py: 16,
        minHeight: "auto",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: getContainerMaxWidth(),
          position: "relative",
        }}
      >
        {/* First Row */}
        <Box sx={{ display: "flex", flexWrap: "wrap", mx: -2 }}>
          {/* Section Title */}
          <Box
            sx={{
              width: { xs: "100%", lg: "25%" },
              px: 2,
              mb: { xs: 4, lg: 0 },
            }}
          >
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
              {sectionTitle}
            </Typography>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                color: textColor,
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              {sectionSubtitle}
            </Typography>
            <Box
              sx={{
                width: "60px",
                height: "2px",
                backgroundColor: textColor,
                opacity: 0.5,
              }}
            />
          </Box>
          {/* First 3 Feature Items */}
          {firstRowItems.map(renderFeatureItem)}
        </Box>

        {/* Second Row */}
        {secondRowItems.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", mx: -2, mt: 6 }}>
            {/* Empty space to align with title column */}
            <Box sx={{ width: { xs: "100%", lg: "25%" }, px: 2 }} />
            {/* Remaining Feature Items */}
            {secondRowItems.map(renderFeatureItem)}
          </Box>
        )}
      </Container>
    </Box>
  )
}
