"use client"

import React from "react"
import {
  Box,
  Container,
  Typography,
  Chip,
  useTheme,
  alpha,
} from "@mui/material"
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser"
import { BlogPost } from "@/utils/rssFeedParser"
import RelatedBlogPosts from "../RelatedBlogPosts"
import CodeBlock from "@/components/content/shared/CodeBlock"

// Heuristic language detection for code snippets without explicit language hints
function detectLanguage(code: string): string {
  const trimmed = code.trim()
  const firstLine = trimmed.split("\n")[0].trim()

  // Shell / bash: first line is a common CLI command or a kebab-case binary
  if (
    /^(npm|npx|yarn|pnpm|node|git|curl|wget|dexie-cloud)\s/.test(firstLine) ||
    /^\w+-\w+/.test(firstLine)
  ) {
    return "bash"
  }

  // HTML: block starts with < and ends with >
  if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
    return "markup"
  }

  // HTML: explicit doctype declaration
  if (/<!DOCTYPE\s+html/i.test(trimmed)) {
    return "markup"
  }

  // Default: tsx is a superset of JS, TS, JSX and TSX
  return "tsx"
}

// Extract plain text from DOM nodes inside a <pre>, converting <br> to newlines
function extractPreContent(nodes: DOMNode[]): string {
  return nodes
    .map((node) => {
      if (
        "data" in node &&
        typeof (node as { data: unknown }).data === "string"
      ) {
        return (node as { data: string }).data
      }
      if (node instanceof Element) {
        if (node.name === "br") return "\n"
        return extractPreContent(node.children as DOMNode[])
      }
      return ""
    })
    .join("")
}

interface BlogPostClientProps {
  post: BlogPost
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({ post }) => {
  const theme = useTheme()

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

  // Parse HTML content and add syntax highlighting / target="_blank" to external links
  const parseOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (!(domNode instanceof Element)) return

      // Syntax-highlight code blocks in <pre> tags
      if (domNode.name === "pre") {
        const className = domNode.attribs?.class || ""
        const match = /language-(\w+)/.exec(className)
        const code = extractPreContent(domNode.children as DOMNode[]).trim()
        const language = match ? match[1] : detectLanguage(code)

        return (
          <Box
            sx={{
              my: 2,
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: 2,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              p: 3,
              overflow: "auto",
            }}
          >
            <CodeBlock code={code} language={language} />
          </Box>
        )
      }

      // Open external links in a new tab
      if (domNode.name === "a") {
        const href = domNode.attribs?.href

        if (href) {
          const isExternal =
            href.startsWith("http://") || href.startsWith("https://")

          if (isExternal) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: theme.palette.text.primary }}
              >
                {domToReact(domNode.children as DOMNode[], parseOptions)}
              </a>
            )
          }
        }
      }
    },
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
              fontSize: { xs: "2rem", md: "3.5rem" },
              fontWeight: 700,
              mb: 2,
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            {post.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              opacity: 0.9,
              fontWeight: 300,
              fontSize: { xs: "1rem", md: "1.1rem" },
              textAlign: "center",
            }}
          >
            {post.author} • {formatDate(post.pubDate)}
          </Typography>
          {post.categories.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center",
              }}
            >
              {post.categories.map((category, index) => (
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
        </Box>
      </Box>

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: theme.palette.mode === "dark" ? "#0a0a0a" : "#f8f9fa",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {/* Article Content */}
          <Box
            sx={{
              borderRadius: 2,
              mb: 4,
              boxShadow: theme.shadows[1],
              "& img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: 1,
                my: 2,
              },
              "& p": {
                mb: 2,
                lineHeight: 1.8,
                fontSize: "1.1rem",
              },
              "& p:last-of-type": {
                fontSize: "11px",
                color: theme.palette.text.disabled,
                opacity: 0.7,
              },
              "& h1, & h2, & h3, & h4, & h5, & h6": {
                mt: 3,
                mb: 2,
                fontWeight: 600,
              },
              "& a": {
                color: theme.palette.text.primary,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              },
              "& code": {
                fontFamily: "monospace",
                fontSize: "0.9em",
                bgcolor: alpha(theme.palette.text.primary, 0.05),
                px: 0.5,
                borderRadius: 0.5,
              },
              "& .codeblock-container code": {
                bgcolor: "transparent",
                p: 0,
                borderRadius: 0,
              },
              "& ul, & ol": {
                pl: 3,
                mb: 2,
              },
              "& li": {
                mb: 1,
                lineHeight: 1.8,
              },
              "& blockquote": {
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                pl: 2,
                ml: 0,
                my: 2,
                fontStyle: "italic",
                color: theme.palette.text.secondary,
              },
            }}
          >
            {post.content
              ? parse(post.content, parseOptions)
              : parse(post.description, parseOptions)}
          </Box>

          {/* Related Articles */}
          <RelatedBlogPosts
            currentSlug={post.slug}
            limit={6}
            title="More Articles"
          />
        </Container>
      </Box>
    </Box>
  )
}

export default BlogPostClient
