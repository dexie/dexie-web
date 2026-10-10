"use client"

import React, { Suspense, useState } from "react"
import Link from "next/link"
import Sidebar from "./Sidebar"
import {
  Box,
  Container,
  Breadcrumbs,
  Typography,
  Divider,
  Link as MuiLink,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

interface NavItem {
  title: string
  slug: string
  layout?: string
}

interface NavStructure {
  [key: string]: NavItem | NavStructure
}

interface CloudDocsLayoutProps {
  children: React.ReactNode
  currentSlug?: string
  pageTitle?: string
  navigation?: NavStructure
}

const CloudDocsLayout: React.FC<CloudDocsLayoutProps> = ({
  children,
  currentSlug,
  pageTitle,
  navigation = {},
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // Remove docs/ prefix from currentSlug for navigation matching
  const navSlug = currentSlug?.startsWith("docs/")
    ? currentSlug.replace("docs/", "")
    : currentSlug

  const drawerWidth = 300

  return (
    <Container maxWidth={false} sx={{ padding: 0, pt: "100px" }}>
      {/* Mobile AppBar with hamburger menu */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            top: "80px", // Below main navigation
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "var(--dexie-hero-overlay)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Toolbar sx={{ minHeight: "48px !important" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Cloud Documentation
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        {/* Mobile Drawer */}
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                top: "128px", // Below both navbars
                backgroundColor: "rgba(33, 37, 41, 0.95)",
                backdropFilter: "blur(10px)",
              },
            }}
          >
            <Box sx={{ p: 2 }}>
              <Suspense fallback={<div />}>
                <Sidebar
                  navigation={navigation}
                  currentSlug={navSlug}
                  basePath="/cloud/docs"
                  onNavigate={() => setMobileOpen(false)}
                />
              </Suspense>
            </Box>
          </Drawer>
        ) : (
          <Box
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              p: 2,
            }}
          >
            <Suspense fallback={<div />}>
              <Sidebar
                navigation={navigation}
                currentSlug={navSlug}
                basePath="/cloud/docs"
              />
            </Suspense>
          </Box>
        )}

        <Box
          component="main"
          sx={{
            paddingTop: isMobile ? 8 : 3, // Extra space for mobile toolbar
            paddingBottom: 2,
            marginBottom: 3,
            flex: 1,
            paddingLeft: { xs: 2, md: 4 },
            paddingRight: { xs: 2, md: 4 },
            width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <MuiLink component={Link} href="/" color="inherit">
                Home
              </MuiLink>
              <MuiLink component={Link} href="#" color="inherit">
                Cloud
              </MuiLink>
              <MuiLink component={Link} href="/cloud/docs" color="inherit">
                Documentation
              </MuiLink>
              {currentSlug && (
                <Typography
                  color="text.primary"
                  aria-current="page"
                  sx={{
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {pageTitle || currentSlug.split("/").pop()}
                </Typography>
              )}
            </Breadcrumbs>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box
            sx={{
              "& a": {
                color: "var(--dexie-accent) !important",
                textDecoration: "none",
                "&:hover": { color: "white !important" },
              },
              "& li:hover": {
                background: "transparent",
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default CloudDocsLayout
