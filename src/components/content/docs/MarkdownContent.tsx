import React from "react"
import {
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material"
import dynamic from "next/dynamic"
import { generateHeadingId } from "@/utils/headingId"

const CodeBlock = dynamic(() => import("../shared/CodeBlock"), { ssr: false })

interface MarkdownContentProps {
  children: React.ReactNode
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ children }) => {
  return (
    <Box
      sx={{
        "& .markdown-content": {},
      }}
    >
      {children}
    </Box>
  )
}

// Helper function to convert class to className and style strings to objects
const convertProps = (
  props: Record<string, unknown>,
  defaultClassName?: string
) => {
  const convertedProps: Record<string, unknown> = { ...props }

  // Handle class -> className conversion
  if ("class" in convertedProps) {
    const classValue = convertedProps.class
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { class: _, ...rest } = convertedProps
    Object.assign(convertedProps, rest)
    if (classValue && defaultClassName) {
      convertedProps.className = `${defaultClassName} ${classValue}`
    } else if (classValue) {
      convertedProps.className = classValue
    } else if (defaultClassName) {
      convertedProps.className = defaultClassName
    }
  } else if (defaultClassName) {
    convertedProps.className = defaultClassName
  }

  // Handle style string -> object conversion
  if ("style" in convertedProps && typeof convertedProps.style === "string") {
    const styleString = convertedProps.style as string
    try {
      const styleObj: Record<string, string> = {}
      styleString
        .split(";")
        .filter((rule: string) => rule.trim())
        .forEach((rule: string) => {
          const [property, value] = rule.split(":").map((s: string) => s.trim())
          if (property && value) {
            // Convert kebab-case to camelCase
            const camelProperty = property.replace(/-([a-z])/g, (g: string) =>
              g[1].toUpperCase()
            )
            styleObj[camelProperty] = value
          }
        })

      if (Object.keys(styleObj).length > 0) {
        convertedProps.style = styleObj
      } else {
        delete convertedProps.style
      }
    } catch (error) {
      console.warn(`Failed to parse style string: ${styleString}`, error)
      delete convertedProps.style
    }
  }

  return convertedProps
}

// Anpassade komponenter för MDX-rendering
export const components = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const convertedProps = convertProps(props)
    const id = generateHeadingId(children)
    return (
      <Typography variant="h1" component="h1" gutterBottom id={id} {...convertedProps}>
        {children}
      </Typography>
    )
  },
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const convertedProps = convertProps(props)
    const id = generateHeadingId(children)
    return (
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        sx={{ mt: 4 }}
        id={id}
        {...convertedProps}
      >
        {children}
      </Typography>
    )
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const convertedProps = convertProps(props)
    const id = generateHeadingId(children)
    return (
      <Typography
        variant="h3"
        component="h3"
        gutterBottom
        sx={{ mt: 3 }}
        id={id}
        {...convertedProps}
      >
        {children}
      </Typography>
    )
  },
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const convertedProps = convertProps(props)
    const id = generateHeadingId(children)
    return (
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{ mt: 3 }}
        id={id}
        {...convertedProps}
      >
        {children}
      </Typography>
    )
  },
  h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const convertedProps = convertProps(props)
    const id = generateHeadingId(children)
    return (
      <Typography
        variant="h5"
        component="h5"
        gutterBottom
        sx={{ mt: 2 }}
        id={id}
        {...convertedProps}
      >
        {children}
      </Typography>
    )
  },
  h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const convertedProps = convertProps(props)
    const id = generateHeadingId(children)
    return (
      <Typography
        variant="h6"
        component="h6"
        gutterBottom
        sx={{ mt: 2 }}
        id={id}
        {...convertedProps}
      >
        {children}
      </Typography>
    )
  },
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
    const convertedProps = convertProps(props)
    return (
      <Typography variant="body1" component="div" paragraph {...convertedProps}>
        {children}
      </Typography>
    )
  },
  a: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const convertedProps = convertProps(props)

    // Check if the link is external (starts with http/https or is an absolute URL)
    const isExternal =
      href &&
      (href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//") ||
        (!href.startsWith("/") &&
          !href.startsWith("#") &&
          !href.startsWith("?")))

    // For external links, add target="_blank" and rel="noopener noreferrer" for security
    const linkProps = isExternal
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
          ...convertedProps,
        }
      : convertedProps

    return (
      <Link
        href={href}
        color="primary"
        sx={{ fontWeight: 600 }}
        underline="hover"
        {...linkProps}
      >
        {children}
      </Link>
    )
  },
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => {
    const convertedProps = convertProps(props)
    return (
      <List
        sx={{
          mb: 3,
          listStyleType: "disc",
          pl: 2,
          "& .MuiListItem-root": {
            display: "list-item",
            pl: 0,
          },
        }}
        {...convertedProps}
      >
        {children}
      </List>
    )
  },
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => {
    const convertedProps = convertProps(props)
    return (
      <List
        component="ol"
        sx={{
          mb: 3,
          pl: 2,
          listStyleType: "decimal",
          "& .MuiListItem-root": {
            display: "list-item",
            pl: 0,
          },
        }}
        {...convertedProps}
      >
        {children}
      </List>
    )
  },
  li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => {
    const convertedProps = convertProps(props)
    return (
      <ListItem
        sx={{
          py: 0.25,
          display: "list-item",
          pl: 0,
        }}
        {...convertedProps}
      >
        <ListItemText
          primary={
            <Typography component="span" variant="body1">
              {children}
            </Typography>
          }
          sx={{ m: 0 }}
        />
      </ListItem>
    )
  },
  code: ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    // Inline kod (inte kod block)
    if (!className) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { color, ...restProps } = props as Record<string, unknown>
      return (
        <Box
          component="code"
          sx={{
            fontFamily: "monospace",
            fontSize: "0.85em", // Changed to relative size to inherit from parent
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
          {...restProps}
        >
          {children}
        </Box>
      )
    }

    // Detta är ett kodblock från markdown (```språk)
    const match = /language-(\w+)/.exec(className || "")
    const language = match ? match[1] : "javascript"
    const codeString = String(children).replace(/\n$/, "")

    return (
      <Box
        sx={{
          mb: 3,
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
          border: "1px solid rgba(255, 255, 255, 0.15)",
          pr: 2,
          mt: 2,
        }}
      >
        <CodeBlock
          language={language}
          code={codeString}
          showLineNumbers={true}
        />
      </Box>
    )
  },
  pre: ({ children }: React.HTMLAttributes<HTMLPreElement>) => {
    // För kodblock, låt bara code-komponenten rendera utan pre-wrapper
    return <>{children}</>
  },
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => {
    const convertedProps = convertProps(props)
    return (
      <Box
        component="blockquote"
        sx={{
          borderLeft: "4px solid",
          borderColor: "primary.main",
          border: "1px dashed rgba(255, 255, 255, 0.2)",
          borderLeftWidth: 4,
          borderLeftStyle: "solid",
          borderLeftColor: "secondary.main",
          pl: 3,
          mb: 3,
          py: 1.5,
          px: 3,
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          borderRadius: 1,
          color: "text.secondary",
          margin: 0,
          marginBottom: 3,
        }}
        {...convertedProps}
      >
        <Typography component="div">{children}</Typography>
      </Box>
    )
  },
  table: ({
    children,
    ...props
  }: React.TableHTMLAttributes<HTMLTableElement>) => {
    const convertedProps = convertProps(props)
    return (
      <TableContainer
        component={Paper}
        sx={{
          mb: 3,
          width: "fit-content",
          maxWidth: "100%",
        }}
        {...convertedProps}
      >
        <Table>{children}</Table>
      </TableContainer>
    )
  },
  // JSX-style table components (after preprocessing)
  Table: ({
    children,
    ...props
  }: React.TableHTMLAttributes<HTMLTableElement>) => {
    const convertedProps = convertProps(props)

    // Check if children are already wrapped in table sections (thead, tbody, tfoot)
    const childrenArray = React.Children.toArray(children)
    const hasTableSections = childrenArray.some((child) => {
      if (React.isValidElement(child)) {
        return (
          child.type === TableHead ||
          child.type === TableBody ||
          (typeof child.type === "string" &&
            ["thead", "tbody", "tfoot"].includes(child.type))
        )
      }
      return false
    })

    // If no explicit table sections are found, wrap all children in TableBody
    const tableContent = hasTableSections ? (
      children
    ) : (
      <TableBody>{children}</TableBody>
    )

    return (
      <TableContainer
        component={Paper}
        sx={{
          mb: 3,
          width: "fit-content",
          maxWidth: "100%",
        }}
        {...convertedProps}
      >
        <Table>{tableContent}</Table>
      </TableContainer>
    )
  },
  TableHead: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => {
    const convertedProps = convertProps(props)
    return <TableHead {...convertedProps}>{children}</TableHead>
  },
  TableBody: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => {
    const convertedProps = convertProps(props)
    return <TableBody {...convertedProps}>{children}</TableBody>
  },
  TableRow: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableRowElement>) => {
    const convertedProps = convertProps(props)
    return <TableRow {...convertedProps}>{children}</TableRow>
  },
  TableHeaderCell: ({
    children,
    ...props
  }: React.ThHTMLAttributes<HTMLTableCellElement>) => {
    const convertedProps = convertProps(props)
    return (
      <TableCell component="th" {...convertedProps}>
        <Typography variant="subtitle2" component="span">
          {children}
        </Typography>
      </TableCell>
    )
  },
  TableCell: ({
    children,
    ...props
  }: React.TdHTMLAttributes<HTMLTableCellElement>) => {
    const convertedProps = convertProps(props)
    return <TableCell {...convertedProps}>{children}</TableCell>
  },
  thead: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => {
    const convertedProps = convertProps(props)
    return <TableHead {...convertedProps}>{children}</TableHead>
  },
  tbody: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => {
    const convertedProps = convertProps(props)
    return <TableBody {...convertedProps}>{children}</TableBody>
  },
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => {
    const convertedProps = convertProps(props)
    return <TableRow {...convertedProps}>{children}</TableRow>
  },
  th: ({
    children,
    ...props
  }: React.ThHTMLAttributes<HTMLTableCellElement>) => {
    const convertedProps = convertProps(props)
    return (
      <TableCell component="th" {...convertedProps}>
        <Typography variant="subtitle2" component="span">
          {children}
        </Typography>
      </TableCell>
    )
  },
  td: ({
    children,
    ...props
  }: React.TdHTMLAttributes<HTMLTableCellElement>) => {
    const convertedProps = convertProps(props)
    return <TableCell {...convertedProps}>{children}</TableCell>
  },
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const convertedProps = convertProps(props)
    return (
      <Box
        component="img"
        src={src}
        alt={alt || ""}
        sx={{
          maxWidth: "100%",
          height: "auto",
          borderRadius: 1,
          mb: 3,
        }}
        {...convertedProps}
      />
    )
  },
  // Generic div handler for any div elements with class attributes
  div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    const convertedProps = convertProps(props)
    return (
      <Box component="div" {...convertedProps}>
        {children}
      </Box>
    )
  },
  // Generic span handler
  span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    const convertedProps = convertProps(props)
    return (
      <Box component="span" {...convertedProps}>
        {children}
      </Box>
    )
  },
}

export default MarkdownContent
