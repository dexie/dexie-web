"use client"

import React, { useState } from "react"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  ExpandMore,
  ExpandLess,
  Description as DocumentIcon,
} from "@mui/icons-material"
import { usePathname } from "next/navigation"
import Link from "next/link"
// Type definition
interface DocCategory {
  title: string
  pages: Array<{
    slug: string[]
    metadata: {
      title: string
    }
  }>
  subcategories: DocCategory[]
}

interface SidebarProps {
  navigation: DocCategory[]
  basePath: string
}

interface CategoryItemProps {
  category: DocCategory
  basePath: string
  currentPath: string
  level?: number
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  basePath,
  currentPath,
  level = 0,
}) => {
  const [expanded, setExpanded] = useState(true)

  const handleToggle = () => {
    setExpanded(!expanded)
  }

  return (
    <Box>
      {/* Category Header */}
      <ListItemButton
        onClick={handleToggle}
        sx={{
          pl: 2 + level * 2,
          borderRadius: 1,
          mb: 0.5,
        }}
      >
        <ListItemText
          primary={
            <Typography variant="subtitle2" fontWeight="bold" color="primary">
              {category.title}
            </Typography>
          }
        />
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* Category Content */}
      <Collapse in={expanded}>
        <List disablePadding>
          {/* Pages */}
          {category.pages.map((page) => {
            const href = `${basePath}/${page.slug.join("/")}`
            const isActive = currentPath === href

            return (
              <ListItem key={page.slug.join("-")} disablePadding>
                <ListItemButton
                  component={Link}
                  href={href}
                  sx={{
                    pl: 3 + level * 2,
                    borderRadius: 1,
                    mb: 0.5,
                    backgroundColor: isActive
                      ? "action.selected"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <DocumentIcon
                    sx={{ mr: 1, fontSize: 16, color: "text.secondary" }}
                  />
                  <ListItemText
                    primary={page.metadata.title}
                    primaryTypographyProps={{
                      variant: "body2",
                      fontWeight: isActive ? "bold" : "normal",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}

          {/* Subcategories */}
          {category.subcategories.map((subcategory) => (
            <CategoryItem
              key={subcategory.title}
              category={subcategory}
              basePath={basePath}
              currentPath={currentPath}
              level={level + 1}
            />
          ))}
        </List>
      </Collapse>
    </Box>
  )
}

export const Sidebar: React.FC<SidebarProps> = ({ navigation, basePath }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const currentPath = usePathname()

  const drawerContent = (
    <Box sx={{ width: 280, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Navigation
      </Typography>
      <List disablePadding>
        {navigation.map((category) => (
          <CategoryItem
            key={category.title}
            category={category}
            basePath={basePath}
            currentPath={currentPath}
          />
        ))}
      </List>
    </Box>
  )

  // On mobile, don't render the sidebar - users use the main drawer search instead
  if (isMobile) {
    return null
  }

  return (
    <Drawer
      variant="permanent"
      open={true}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
}
