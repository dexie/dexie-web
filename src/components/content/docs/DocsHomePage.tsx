import React from "react"
import Link from "next/link"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material"
import { DocumentSource, getAllDocuments, Doc } from "@/utils/mdx"
import MDXContent from "./MDXContent"

interface DocsHomePageProps {
  source: DocumentSource
  title: string
  description: string
  basePath: string
  Layout: React.ComponentType<{
    children: React.ReactNode
    currentSlug?: string
    pageTitle?: string
  }>
  currentSlug?: string
  filterDocs?: (docs: Doc[]) => Doc[]
  generatePathFromSlug?: (slug: string) => string
  showQuickStart?: boolean
  quickStartConfig?: {
    tutorialTitle: string
    tutorialPath: string
    apiTitle: string
    apiPath: string
  }
  useSimpleList?: boolean
  indexContent?: string // Serialized HTML content from index.md
}

const DocsHomePage: React.FC<DocsHomePageProps> = ({
  source,
  title,
  basePath,
  Layout,
  currentSlug = "",
  filterDocs = (docs) => docs,
  generatePathFromSlug = (slug) => `${basePath}/${slug}`,
  showQuickStart = false,
  quickStartConfig,
  useSimpleList = false,
  indexContent,
}) => {
  const allDocs = getAllDocuments(source)
  const docs = filterDocs(allDocs)

  // Group documents by category/folder
  const docsByCategory = docs.reduce((acc, doc) => {
    const category = doc.metadata.slug.split("/")[0] || "General"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(doc)
    return acc
  }, {} as Record<string, Doc[]>)

  return (
    <Layout currentSlug={currentSlug} pageTitle={title}>
      <Box component="article">
        <Box className="docs-content">
          {useSimpleList && indexContent ? (
            // Render content från index.md
            <Box>
              <MDXContent source={indexContent} highlightSearchTerms={true} />
            </Box>
          ) : useSimpleList ? (
            // Fallback till tom lista om indexContent saknas
            <Box>
              <Typography variant="body1" color="text.secondary">
                Loading content...
              </Typography>
            </Box>
          ) : (
            // Card-baserad layout för vanliga docs
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 3,
                mb: 6,
              }}
            >
              {Object.entries(docsByCategory).map(
                ([category, categoryDocs]) => (
                  <Card
                    key={category}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "var(--dexie-bg)",
                      border: "1px solid #333333",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Typography>
                      <Box
                        component="ul"
                        sx={{ listStyle: "none", p: 0, m: 0 }}
                      >
                        {categoryDocs.slice(0, 8).map((doc) => (
                          <Box
                            component="li"
                            key={doc.metadata.slug}
                            sx={{ mb: 1 }}
                          >
                            <Link
                              href={generatePathFromSlug(doc.metadata.slug)}
                              style={{ textDecoration: "none" }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  "&:hover": {
                                    color: "#FFFFFF",
                                  },
                                }}
                              >
                                {doc.metadata.title}
                              </Typography>
                            </Link>
                          </Box>
                        ))}
                        {categoryDocs.length > 8 && (
                          <Box component="li" sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              ... and {categoryDocs.length - 8} more
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                )
              )}
            </Box>
          )}

          {showQuickStart && quickStartConfig && (
            <>
              <Divider sx={{ my: 6 }} />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
                  gap: 4,
                }}
              >
                <Box>
                  <Typography variant="h4" component="h2" gutterBottom>
                    Get Started Quickly
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Start by reading our tutorial to get started.
                  </Typography>
                  <Link
                    href={quickStartConfig.tutorialPath}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained" size="large" sx={{ mt: 2 }}>
                      {quickStartConfig.tutorialTitle}
                    </Button>
                  </Link>
                </Box>
                <Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {quickStartConfig.apiTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Explore the complete API documentation.
                  </Typography>
                  <Link
                    href={quickStartConfig.apiPath}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="outlined" size="large" sx={{ mt: 2 }}>
                      View API
                    </Button>
                  </Link>
                </Box>
              </Box>
            </>
          )}
        </Box>

        <Box
          component="footer"
          sx={{
            mt: 5,
            pt: 4,
            borderTop: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {source} documentation
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {docs.length} documents available
          </Typography>
        </Box>
      </Box>
    </Layout>
  )
}

export default DocsHomePage
