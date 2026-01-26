import React, { Suspense } from "react"
import Link from "next/link"
import Sidebar from "./Sidebar"
import EditOnGitHubButton from "./EditOnGitHubButton"
import MDXContent from "./MDXContent"
import {
  Box,
  Container,
  Breadcrumbs,
  Typography,
  Divider,
  Link as MuiLink,
} from "@mui/material"

interface NavItem {
  title: string
  slug: string
  layout?: string
}

interface NavStructure {
  [key: string]: NavItem | NavStructure
}

interface DocsLayoutProps {
  children: React.ReactNode
  currentSlug?: string
  pageTitle?: string
  navigation?: NavStructure
  mdxSource?: string
}

const DocsLayout: React.FC<DocsLayoutProps> = ({
  children,
  currentSlug,
  pageTitle,
  navigation = {},
  mdxSource,
}) => {
  const drawerWidth = 300

  return (
    <Container maxWidth={false} sx={{ padding: 0, pt: "100px" }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        {/* Desktop Sidebar */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: drawerWidth,
            flexShrink: 0,
            position: "fixed",
            top: "100px",
            left: 0,
            height: "calc(100vh - 100px)",
            overflowY: "hidden",
            p: 2,
            backgroundColor: "background.paper",
            borderRight: "1px solid rgba(255, 255, 255, 0.12)",
            zIndex: 100,
          }}
        >
          <Suspense fallback={<div />}>
            <Sidebar
              navigation={navigation}
              currentSlug={currentSlug}
              basePath="/docs"
            />
          </Suspense>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            paddingTop: { xs: 8, md: 3 },
            paddingBottom: 2,
            marginBottom: 3,
            flex: 1,
            paddingLeft: { xs: 2, md: 4 },
            paddingRight: { xs: 2, md: 4 },
            width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
            marginLeft: { xs: 0, md: `${drawerWidth}px` },
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
              <MuiLink component={Link} href="/docs" color="inherit">
                Documentation
              </MuiLink>
              {currentSlug && (
                <Typography
                  color="text.primary"
                  aria-current="page"
                  sx={{ padding: 0, margin: 0 }}
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
                color: "#c77dff !important",
                textDecoration: "none",
                "&:hover": { color: "white !important" },
              },
              "& li:hover": { background: "transparent" },
            }}
          >            
            {mdxSource ? (
              <>
                <MDXContent title={pageTitle} source={mdxSource} highlightSearchTerms={true} />
                <div style={{ height: '20vh' }}></div>
              </>
            ) : (
              children
            )}
          </Box>
        </Box>

        {/* Sticky Edit on GitHub Button - Desktop only */}
        {currentSlug && (
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "fixed",
              top: "65px",
              right: "24px",
              zIndex: 1000,
            }}
          >
            <EditOnGitHubButton slug={currentSlug} />
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default DocsLayout
