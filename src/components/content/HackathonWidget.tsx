"use client"

import React, { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import LaunchIcon from "@mui/icons-material/Launch"

interface HackathonWinner {
  id: number
  name: string
  place: string
  title: string
  subtitle: string
  description: string
  features: string[]
  award: string
  demoUrl: string
  buttonText: string
  imageUrl: string
  videoUrl?: string
  imageAlt: string
}

interface HackathonWidgetProps {
  sectionCaption?: string
  sectionTitle?: string
  description?: string
  winners: HackathonWinner[]
  textColor?: string
  backgroundColor?: string
  containerWidth?: "small" | "default" | "big"
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`hackathon-tabpanel-${index}`}
      aria-labelledby={`hackathon-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

export default function HackathonWidget({
  sectionCaption = "DGH25",
  sectionTitle = "",
  description = "",
  winners,
  textColor = "var(--dexie-text)",
  backgroundColor = "var(--dexie-bg)",
  containerWidth = "default",
}: HackathonWidgetProps) {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 4, md: 6 },
          }}
        >
          {/* Left Column - Text and Tabs */}
          <Box
            sx={{
              width: { xs: "100%", lg: "50%" },
              mb: { xs: 4, md: 6, lg: 0 },
            }}
          >
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
                fontSize: { xs: "2rem", md: "52px" },
                lineHeight: 1.2,
              }}
            >
              {sectionTitle}
            </Typography>

            {/* Description */}
            <Box sx={{ maxWidth: { lg: "83.333%" } }}>
              <Typography
                variant="body1"
                sx={{
                  color: textColor,
                  mb: { xs: 4, sm: 6 },
                  fontSize: "1.4rem",
                  lineHeight: 1.6,
                }}
              >
                {description}
              </Typography>
            </Box>

            {/* Custom Tabs */}
            <Box sx={{ maxWidth: "500px" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                orientation="vertical"
                variant="fullWidth"
                sx={{
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                  "& .MuiTabs-list button": {
                    padding: "0px !important",
                    border: "none !important",
                    backgroundColor: "transparent !important",
                    color: "white !important",
                    opacity: 0.7,
                    transition: "opacity 0.3s",
                    "&:hover": {
                      opacity: 1,
                    },
                  },
                  "& .MuiTab-root": {
                    boxSizing: "border-box",
                    color: "rgb(255, 255, 255)",
                    cursor: "pointer",
                    display: "inline-block",
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    fontSize: "36px !important",
                    fontWeight: 500,
                    position: "relative",
                    textAlign: "left",
                    textDecoration: "none",
                    textRendering: "optimizelegibility",
                    alignItems: "flex-start",

                    "&.Mui-selected": {
                      backgroundColor: textColor,
                      color: backgroundColor,
                      opacity: 1,
                    },
                    "&:hover": {
                      opacity: 1,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    border: `1px solid ${textColor}`,
                    borderBottom: "none",
                    "&:last-child": {
                      borderBottom: `1px solid ${textColor}`,
                    },
                  },
                }}
              >
                {winners.map((winner, index) => (
                  <Tab
                    key={winner.id}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        {winner.name}
                        <Chip
                          label={`0${index + 1}`}
                          size="small"
                          sx={{
                            backgroundColor: "transparent",
                            color: "inherit",
                            fontSize: "1rem",
                            height: "20px",
                            border: "none",
                            mb: 3,
                          }}
                        />
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Box>
          </Box>

          {/* Right Column - Tab Content */}
          <Box
            sx={{
              width: { xs: "100%", lg: "50%" },
              display: "flex",
            }}
          >
            {winners.map((winner, index) => (
              <TabPanel key={winner.id} value={value} index={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  {/* Content */}
                  <Box sx={{ mb: 4, position: "relative" }}>
                    <Typography
                      variant="overline"
                      sx={{
                        color: textColor,
                        opacity: 0.7,
                        fontSize: "11px",
                        textTransform: "uppercase",
                        mb: 1,
                        display: "block",
                      }}
                    >
                      {winner.place}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        color: textColor,
                        mb: 1,
                        fontSize: "2rem",
                        fontWeight: 400,
                      }}
                    >
                      {winner.name}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        color: "var(--dexie-accent)",
                        mb: 2,
                        fontSize: "1.125rem",
                        fontWeight: 500,
                      }}
                    >
                      {winner.subtitle}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: textColor,
                        opacity: 0.8,
                        mb: 3,
                        lineHeight: 1.6,
                      }}
                    >
                      {winner.description}
                    </Typography>

                    {/* Features List */}
                    <List
                      sx={{
                        p: 0,
                        mb: 3,
                        "& .MuiListItem-root:hover": {
                          borderRadius: "4px !important",
                          padding: "0px 10px !important",
                          margin: "0px -10px!important",
                          backgroundColor:
                            "rgba(255, 255, 255, 0.075) !important",
                        },
                      }}
                    >
                      {winner.features.map((feature, idx) => (
                        <ListItem
                          key={idx}
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
                                opacity: 0.8,
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            sx={{
                              "& .MuiListItemText-primary": {
                                color: textColor,
                                opacity: 0.8,
                                fontSize: "0.9rem",
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>

                    {/* Award */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: textColor,
                        opacity: 0.8,
                      }}
                    >
                      <strong>Award:</strong> {winner.award}
                    </Typography>

                    {/* Demo Button */}
                    <Button
                      variant="outlined"
                      href={winner.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<LaunchIcon />}
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        borderColor: textColor,
                        color: textColor,
                        borderRadius: "25px",
                        padding: "5px 20px !important",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: textColor,
                          color: backgroundColor,
                        },
                      }}
                    >
                      {winner.buttonText}
                    </Button>
                  </Box>

                  {/* Image */}
                  {winner.videoUrl ? (
                    <iframe
                      src={winner.videoUrl}
                      style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        border: "none",
                        borderRadius: "8px",
                      }}
                      allow="autoplay"
                    ></iframe>
                  ) : (
                    <Box
                      sx={{
                        mt: "auto",
                        display: "flex",
                        justifyContent: "center",
                        background: `url(${winner.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "top center",
                        width: "100%",
                        height: "300px",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </Box>
              </TabPanel>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
