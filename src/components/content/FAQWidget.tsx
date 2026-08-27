"use client"

import React, { useState } from "react"
import {
  Container,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CodeBlock from "./shared/CodeBlock"

export interface FAQItem {
  id: number
  question: string
  answer: string
}

export interface FAQSettings {
  textColor?: string
  backgroundColor?: string
  containerWidth?: "small" | "medium" | "big"
  sectionTitle?: string
  sectionSubtitle?: string
}

export interface FAQWidgetProps {
  items: FAQItem[]
  settings: FAQSettings
}

const FAQWidget: React.FC<FAQWidgetProps> = ({ items, settings }) => {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const getMaxWidth = () => {
    switch (settings.containerWidth) {
      case "small":
        return "sm"
      case "medium":
        return "md"
      case "big":
      default:
        return "lg"
    }
  }

  const renderTextWithLinks = (text: string) => {
    // Regex to find /docs links - matches /docs followed by any characters until whitespace or end
    const linkRegex = /(\/docs[^\s]*)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before link
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: text.slice(lastIndex, match.index),
        })
      }

      // Add link
      parts.push({
        type: "link",
        href: match[1],
        content: match[1],
      })

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex),
      })
    }

    // If no links found, return just the text
    if (parts.length === 0) {
      return text
    }

    return (
      <>
        {parts.map((part, index) => {
          if (part.type === "text") {
            return part.content
          } else if (part.type === "link") {
            return (
              <Link
                key={index}
                href={part.href}
                sx={{
                  color: "inherit",
                  textDecoration: "underline",
                  "&:hover": {
                    opacity: 0.7,
                  },
                }}
              >
                {part.content}
              </Link>
            )
          }
          return null
        })}
      </>
    )
  }

  const renderAnswer = (answer: string) => {
    // Check if answer contains code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []
    let lastIndex = 0
    let match
    answer = answer.split('\n\n').map(block => block.split('\n').join(' ')).join('\n\n') // Normalize new lines for consistent parsing

    while ((match = codeBlockRegex.exec(answer)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: answer.slice(lastIndex, match.index),
        })
      }

      // Add code block
      parts.push({
        type: "code",
        language: match[1] || "typescript",
        content: match[2],
      })

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < answer.length) {
      parts.push({
        type: "text",
        content: answer.slice(lastIndex),
      })
    }

    // If no code blocks found, just return the original text
    if (parts.length === 0) {
      return (
        <Typography
          variant="body1"
          sx={{
            opacity: 0.85,
            lineHeight: 1.6,
            fontSize: { xs: "0.9rem", md: "1rem" },
            whiteSpace: "pre-line",
          }}
        >
          {renderTextWithLinks(answer)}
        </Typography>
      )
    }

    return (
      <Box>
        {parts.map((part, index) => {
          if (part.type === "text") {
            return (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  opacity: 0.85,
                  lineHeight: 1.6,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  whiteSpace: "pre-line",
                  mb: part.content.trim() ? 1 : 0,
                }}
              >
                {renderTextWithLinks(part.content)}
              </Typography>
            )
          } else if (part.type === "code") {
            return (
              <Box key={index} sx={{ my: 2 }}>
                <CodeBlock
                  code={part.content}
                  language={part.language}
                  showLineNumbers={false}
                />
              </Box>
            )
          }
          return null
        })}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        backgroundColor: settings.backgroundColor || "var(--dexie-bright)",
        color: settings.textColor || "var(--dexie-bg)",
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth={getMaxWidth()}>
        {(settings.sectionTitle || settings.sectionSubtitle) && (
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 4, md: 6 },
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            {settings.sectionTitle && (
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: 700,
                  mb: settings.sectionSubtitle ? 2 : 0,
                }}
              >
                {settings.sectionTitle}
              </Typography>
            )}
            {settings.sectionSubtitle && (
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  opacity: 0.85,
                }}
              >
                {settings.sectionSubtitle}
              </Typography>
            )}
          </Box>
        )}

        <Box
          sx={{
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          {items.map((item) => (
            <Accordion
              key={item.id}
              expanded={expanded === `panel${item.id}`}
              onChange={handleChange(`panel${item.id}`)}
              sx={{
                backgroundColor: "transparent",
                color: settings.textColor || "var(--dexie-bg)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px !important",
                mb: 2,
                "&:before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  margin: "0 0 16px 0",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ color: settings.textColor || "var(--dexie-bg)" }}
                  />
                }
                sx={{
                  minHeight: "64px",
                  "&.Mui-expanded": {
                    minHeight: "64px",
                  },
                  "& .MuiAccordionSummary-content": {
                    margin: "16px 0",
                    "&.Mui-expanded": {
                      margin: "16px 0",
                    },
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    mb: "0px !important",
                  }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  pt: 0,
                  pb: 3,
                }}
              >
                {renderAnswer(item.answer)}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default FAQWidget
