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
import { fetchMediumFeed, BlogPost } from "@/utils/rssFeedParser"
import { FEEDS } from "@/config/feeds"

export type BlogFeedVariant = "grid" | "list" | "compact"
export type BlogFeedSize = "small" | "medium" | "large"

interface BlogFeedWidgetProps {
  /** Number of articles to display */
  count?: number
  /** Layout variant */
  variant?: BlogFeedVariant
  /** Size of the cards */
  size?: BlogFeedSize
  /** Show author information */
  showAuthor?: boolean
  /** Show categories/tags */
  showCategories?: boolean
  /** Show publication date */
  showDate?: boolean
  /** Custom title for the section */
  title?: string
  /** RSS feed URL */
  feedUrl?: string
}

const BlogFeedWidget: React.FC<BlogFeedWidgetProps> = ({
  count = 6,
  variant = "grid",
  size = "medium",
  showCategories = true,
  showDate = true,
  title = "Latest from our blog",
  feedUrl = FEEDS.BLOG,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const theme = useTheme()

  useEffect(() => {
    const loadPosts = async () => {
      console.log("BlogFeedWidget: Starting to load posts...", {
        feedUrl,
        count,
      })
      setLoading(true)
      setError(null)

      try {
        const fetchedPosts = await fetchMediumFeed(feedUrl, count)
        console.log("BlogFeedWidget: Fetched posts:", fetchedPosts.length)
        setPosts(fetchedPosts)

        if (fetchedPosts.length === 0) {
          setError("No posts were returned from the feed")
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error"
        console.error("BlogFeedWidget: Error loading posts:", errorMessage)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [feedUrl, count])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const getGridTemplateColumns = () => {
    if (variant === "list") return "1fr"
    if (variant === "compact")
      return {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }
    return {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
    }
  }

  const renderSkeleton = () => (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            opacity: 0.2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              aspectRatio: "16 / 9",
              overflow: "hidden",
            }}
          >
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </Box>
          <CardContent>
            <Skeleton variant="text" height={32} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} width="60%" />
          </CardContent>
        </Card>
      ))}
    </>
  )

  const renderPost = (post: BlogPost) => {
    // Filter out tracking pixels and use fallback image
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
        key={post.link}
        sx={{
          display: "flex",
          flexDirection: variant === "list" ? "row" : "column",
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
            flexDirection: variant === "list" ? "row" : "column",
            alignItems: "flex-start",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: variant === "list" ? 300 : "100%",
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
                fontSize: size === "small" ? "1rem" : "1.125rem",

                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {post.title}
            </Box>
            {showDate && post.pubDate && (
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
              >
                {formatDate(post.pubDate)} - {post.author}
              </Typography>
            )}

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                display: "-webkit-box",
                WebkitLineClamp: variant === "compact" ? 2 : 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                mt: 1,
              }}
            >
              {post.description}
            </Typography>
            {showCategories && post.categories.length > 0 && (
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

  const gridColumns = getGridTemplateColumns()

  return (
    <Box
      sx={{
        py: 8,
        bgcolor: theme.palette.mode === "dark" ? "var(--dexie-surface-deep)" : "#f8f9fa",
      }}
    >
      <Container maxWidth="lg">
        {title && (
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 4,
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs:
                typeof gridColumns === "string" ? gridColumns : gridColumns.xs,
              sm:
                typeof gridColumns === "string" ? gridColumns : gridColumns.sm,
              md:
                typeof gridColumns === "string" ? gridColumns : gridColumns.md,
              lg:
                typeof gridColumns === "object" && "lg" in gridColumns
                  ? gridColumns.lg
                  : typeof gridColumns === "string"
                  ? gridColumns
                  : gridColumns.md,
            },
            gap: 3,
          }}
        >
          {loading ? renderSkeleton() : posts.map(renderPost)}
        </Box>

        {!loading && posts.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4 }}>
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

export default BlogFeedWidget
