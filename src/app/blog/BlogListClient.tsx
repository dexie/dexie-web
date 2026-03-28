"use client"

import React, { useEffect, useState } from "react"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Skeleton,
  useTheme,
  alpha,
} from "@mui/material"
import Link from "next/link"
import { BlogPost } from "@/utils/rssFeedParser"
import ArticleIcon from "@mui/icons-material/Article"
import { FEEDS } from "@/config/feeds"

const BlogListClient: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const theme = useTheme()

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/blog-feed?limit=50&feedUrl=${encodeURIComponent(
            FEEDS.BLOG
          )}`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.statusText}`)
        }

        const data = await response.json()
        setPosts(data.posts || [])

        if ((data.posts || []).length === 0) {
          setError("No posts available")
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error"
        console.error("Error loading posts:", errorMessage)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const renderSkeleton = () => (
    <>
      {Array.from({ length: 9 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            opacity: 0.2,
            height: "100%",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Skeleton variant="rectangular" width="100%" height={200} />
            <CardContent>
              <Skeleton variant="text" height={32} />
              <Skeleton variant="text" height={20} />
              <Skeleton variant="text" height={20} width="60%" />
            </CardContent>
          </Card>
        </Box>
      ))}
    </>
  )

  const renderPost = (post: BlogPost) => {
    const isValidImage =
      post.thumbnail &&
      !post.thumbnail.includes("/_/stat?") &&
      !post.thumbnail.includes("/stat?event=") &&
      !post.thumbnail.includes("tracking")

    const imageUrl = isValidImage
      ? post.thumbnail
      : "/assets/images/dexie-bg.jpg"

    return (
      <Card
        key={post.slug}
        sx={{
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          backgroundImage: "none",
          backgroundColor: alpha(theme.palette.text.primary, 0.05),
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[8],
          },
          border: "none",
        }}
      >
        <CardActionArea
          component={Link}
          href={`/blog/${post.slug}`}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              aspectRatio: "16 / 9",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <CardMedia
              component="img"
              image={imageUrl}
              alt={post.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 0,
              width: "100%",
            }}
          >
            <Box
              sx={{
                fontWeight: 600,
                fontSize: "1.125rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {post.title}
            </Box>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
            >
              {formatDate(post.pubDate)} - {post.author}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                mt: 1,
              }}
            >
              {post.description}
            </Typography>
            {post.categories.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                  mt: 2,
                  zoom: 0.9,
                }}
              >
                {post.categories.slice(0, 3).map((category, index) => (
                  <Chip
                    key={index}
                    label={category}
                    size="small"
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.main, 0.2),
                      borderColor: alpha(theme.palette.primary.main, 1),
                      color: "white",
                      fontWeight: 500,
                      "& .MuiChip-label": {
                        fontSize: "0.75rem",
                        padding: "0px 10px !important",
                        pb: "2px !important",
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }

  return (
    <Box>
      {/* Hero Header */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          background:
            "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/assets/images/dexie-bg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          padding: { xs: 3, md: 6, lg: 12, xl: 40 },
          paddingTop: "200px !important",
          paddingBottom: "100px !important",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", md: "1200px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 700,
              mb: 2,
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            Dexie.js Blog
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              opacity: 0.9,
              fontWeight: 300,
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            Explore tutorials, tips and the latest updates about Dexie.js,
            IndexedDB and modern web development
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Blog Posts Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {loading ? renderSkeleton() : posts.map(renderPost)}
        </Box>

        {!loading && posts.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <ArticleIcon
              sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No blog posts available at the moment.
            </Typography>
            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ fontFamily: "monospace" }}
              >
                Error: {error}
              </Typography>
            )}
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default BlogListClient
