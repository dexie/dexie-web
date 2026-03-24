"use client"

import React, { useState } from "react"
import {
  Box,
  Typography,
  Container,
  Tabs,
  Tab,
  Card,
  CardContent,
  SxProps,
  Theme,
} from "@mui/material"
import CloudIcon from "@mui/icons-material/Cloud"
import CodeIcon from "@mui/icons-material/Code"
import EmailIcon from "@mui/icons-material/Email"
import SupportPlansWidget, { type SupportPlan } from "./SupportPlansWidget"
import OpenSourceSupportWidget, {
  type OpenSourceSupportPlan,
} from "./OpenSourceSupportWidget"

interface SupportZoneProps {
  cloudSupportPlans: SupportPlan[]
  openSourceSupportPlans: OpenSourceSupportPlan[]
  settings?: {
    textColor?: string
    backgroundColor?: string
    containerWidth?: "small" | "medium" | "big"
  }
  sx?: SxProps<Theme>
}

export default function SupportZone({
  cloudSupportPlans,
  openSourceSupportPlans,
  settings = {},
  sx = {},
}: SupportZoneProps) {
  const [activeTab, setActiveTab] = useState(0)

  const {
    textColor = "#dee2e6",
    backgroundColor = "#000000",
    containerWidth = "big",
  } = settings

  const getMaxWidth = () => {
    switch (containerWidth) {
      case "small":
        return "sm" as const
      case "medium":
        return "md" as const
      case "big":
        return "xl" as const
      default:
        return "xl" as const
    }
  }

  return (
    <Box sx={{ backgroundColor, ...sx }}>
      <Container maxWidth={getMaxWidth()}>
        {/* Zone Heading */}
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
          Support Plans
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: 2,
            color: "#adb5bd",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          Get direct access to the Dexie core team — whether you&apos;re using
          Dexie Cloud or the open-source library.
        </Typography>

        {/* Tab Switcher */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 0 }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              minHeight: "44px",
              "& .MuiTabs-indicator": {
                backgroundColor: "#c77dff",
                height: "2px",
                borderRadius: "1px",
              },
              "& .MuiTab-root": {
                minHeight: "40px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                color: "#6c757d",
                px: { xs: 1.5, sm: 3 },
                "&.Mui-selected": {
                  color: "#c77dff",
                },
              },
            }}
          >
            <Tab
              icon={<CloudIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Dexie Cloud"
            />
            <Tab
              icon={<CodeIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Dexie.js Open Source"
            />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        {/* Cloud Support Tab */}
        <Box
          role="tabpanel"
          sx={{ display: activeTab === 0 ? "block" : "none" }}
        >
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "#6c757d",
              mb: 0,
              mt: 1,
              fontStyle: "italic",
            }}
          >
            All Dexie Cloud SaaS plans include Prod Support. The plans below are
            for on-premises customers.
          </Typography>
          <SupportPlansWidget
            plans={cloudSupportPlans}
            settings={{
              textColor,
              backgroundColor,
              containerWidth,
              sectionTitle: "",
              sectionSubtitle: "",
            }}
          />
        </Box>

        {/* Dexie.js Open Source Support Tab */}
        <Box
          role="tabpanel"
          sx={{ display: activeTab === 1 ? "block" : "none" }}
        >
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "#6c757d",
              mb: 0,
              mt: 1,
              fontStyle: "italic",
            }}
          >
            For teams building on Dexie.js open source — without Dexie Cloud.
          </Typography>
          <OpenSourceSupportWidget
            plans={openSourceSupportPlans}
            settings={{
              textColor,
              backgroundColor,
              containerWidth,
              sectionTitle: "",
              sectionSubtitle: "",
              note: "All plans are annual subscriptions invoiced upfront. Response times apply during CET business hours (Mon–Fri). Contact us to discuss your needs — we're happy to tailor a package.",
            }}
          />
        </Box>

        {/* Cross-sell Callout */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
          <Card
            sx={{
              maxWidth: 600,
              backgroundColor: "rgba(199, 125, 255, 0.06)",
              border: "1px solid rgba(199, 125, 255, 0.2)",
              borderRadius: "12px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                gap: 2,
                py: "16px !important",
                px: 3,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: textColor,
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                >
                  Looking for something tailored?
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#adb5bd", fontSize: "0.85rem", mt: 0.5 }}
                >
                  We can design a support plan built around your team, stack,
                  and requirements.
                </Typography>
              </Box>
              <Box
                component="a"
                href="mailto:business@dexie.org?subject=Custom Support Plan"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2.5,
                  py: 1,
                  border: "1px solid #c77dff",
                  borderRadius: "50px",
                  color: "#c77dff",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "rgba(199, 125, 255, 0.1)",
                  },
                }}
              >
                <EmailIcon sx={{ fontSize: 16 }} />
                Contact us
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}
