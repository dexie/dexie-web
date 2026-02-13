"use client"

import React, { useRef, useEffect, useCallback } from "react"
import {
  Box,
  List,
  ListItem,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import { offlineDB } from "@/db/offlineDB"
import { useLiveQuery } from "dexie-react-hooks"
import { useSessionStorage } from "@/utils/useSessionStorage"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface NavItem {
  title: string
  slug: string
  layout?: string
}

interface NavStructure {
  [key: string]: NavItem | NavStructure
}

interface SidebarProps {
  navigation: NavStructure
  currentSlug?: string
  basePath?: string // Add basePath prop
  onNavigate?: () => void // Add optional onNavigate prop for mobile
}

const isNavItem = (item: NavItem | NavStructure): item is NavItem => {
  return "title" in item && "slug" in item
}

// Function to recursively filter navigation structure
const searchDocs = async (
  navigation: NavStructure,
  searchTerm: string
): Promise<{searchResults: NavStructure, resultCount: number, totalResultCount: number}> => {
  if (searchTerm.trim() === "") {
    return {searchResults: navigation, resultCount: 0, totalResultCount: 0};
  }

  const {searchResults: foundSections, totalResultCount } = await offlineDB.findDocuments(searchTerm);
  const grouped = Object.groupBy(foundSections, doc => doc.parentTitle ?? doc.title ?? "Untitled");
  const searchResults = Object.fromEntries(Object.entries(grouped).filter(([, docs]) => !!docs).map(([key, docs]) => {
    if (docs && (docs.length > 1 || (docs[0] && key !== (docs[0].title ?? docs[0].parentTitle)))) {
      return [key, Object.fromEntries(docs.map(doc => [doc.title ?? "Untitled", {
        title: doc.title ?? doc.parentTitle ?? "Untitled",
        slug: doc.url.replace(/^\/docs\//, ''),
      }]))];
    } else if (docs) {
      const doc = docs[0];
      return [key, {
        title: doc.parentTitle ?? doc.title ?? "Untitled",
        slug: doc.url.replace(/^\/docs\//, ''),
      }];
    } else {
      return [key, {}];
    }
  }));
  return {searchResults, resultCount: foundSections.length, totalResultCount};
  /*return Object.fromEntries(foundSections.map(doc => [doc.title ?? doc.parentTitle ??  "Untitled", {
    title: doc.parentTitle ?? doc.title ?? "Untitled",
    slug: doc.url.replace(/^\/docs\//, ''),
  }]));*/
}

const Sidebar: React.FC<SidebarProps> = ({
  navigation,
  currentSlug,
  basePath = "/docs",
  onNavigate
}) => {
  const [searchText, setSearchText] = useSessionStorage("search", "");
  //const [searchText, setSearchText] = useState(searchParams.get("search") || "");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Filtered navigation based on search text
  const {searchResults, totalResultCount } = useLiveQuery(
    () => searchDocs(navigation, searchText),
    [searchText],
    {searchResults: {} as NavStructure, resultCount: 0, totalResultCount: -1} // hack to show nothing while loading (below...)
  )
  const filteredNavigation = searchResults;

  // Global keyboard shortcut handler (Cmd/Ctrl + K)
  const handleGlobalKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      searchInputRef.current?.focus()
      searchInputRef.current?.select()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [handleGlobalKeyDown])

  // Helper to get first result slug from filtered navigation
  const getFirstResultSlug = (): string | null => {
    for (const value of Object.values(filteredNavigation)) {
      if (isNavItem(value)) {
        return value.slug;
      }
      // It's a nested structure, check children
      for (const child of Object.values(value)) {
        if (isNavItem(child)) {
          return child.slug;
        }
      }
    }
    return null;
  };

  // Handle keyboard navigation in search field
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchText.trim()) {
      e.preventDefault()
      const firstSlug = getFirstResultSlug();
      if (firstSlug) {
        router.push(`${basePath}/${firstSlug}`);
        onNavigate?.();
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      // Focus first navigable item in results
      const firstLink = document.querySelector('[data-search-result-link]') as HTMLElement
      if (firstLink) {
        firstLink.focus()
      }
    }
  }

  const renderNavItem = (
    key: string,
    item: NavItem | NavStructure,
    level = 0
  ): React.ReactElement => {
    // Check if it's a NavItem
    if (isNavItem(item)) {
      const isActive = currentSlug === item.slug
      return (
        <ListItem
          key={key}
          component={Link}
          href={`${basePath}/${item.slug}`}
          onClick={onNavigate}
          data-search-result-link
          tabIndex={100}
          title={item.title}
          onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              const allLinks = Array.from(document.querySelectorAll('[data-search-result-link]'))
              const currentIndex = allLinks.indexOf(e.currentTarget as HTMLElement)
              const nextLink = allLinks[currentIndex + 1] as HTMLElement
              if (nextLink) {
                nextLink.focus()
              }
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              const allLinks = Array.from(document.querySelectorAll('[data-search-result-link]'))
              const currentIndex = allLinks.indexOf(e.currentTarget as HTMLElement)
              if (currentIndex === 0) {
                // Go back to search input
                searchInputRef.current?.focus()
              } else {
                const prevLink = allLinks[currentIndex - 1] as HTMLElement
                if (prevLink) {
                  prevLink.focus()
                }
              }
            }
          }}
          sx={{
            backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
            borderRadius: "6px",
            p: { xs: 1, md: 2 },
            pl: { xs: 1 * level, md: 2 * level },
            fontWeight: 700,
            maxWidth: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textDecoration: "none",
            color: isActive ? "#c77dff" : "inherit",
            display: "block",
            width: "100%",
            outline: "none",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "rgba(199, 125, 255, 0.1)",
            },
            "&:focus": {
              backgroundColor: "rgba(199, 125, 255, 0.2)",
              color: "#c77dff",
            },
          }}
        >
          {item.title.length > 28
            ? `...${item.title.slice(-26)}`
            : item.title}
        </ListItem>
      )
    }

    // It's a NavStructure (folder)
    return (
      <Box key={key} sx={{ mb: { xs: 1, md: 2 } }}>
        <Typography
          variant="overline"
          sx={{
            fontSize: { xs: "0.75rem", md: "0.875rem" },
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </Typography>
        <List sx={{ py: { xs: 0.5, md: 1 } }}>
          {Object.entries(item).map(([subKey, subItem]) =>
            renderNavItem(subKey, subItem, level + 1)
          )}
        </List>
      </Box>
    )
  }

  return (
    <Box sx={{ 
      width: "100%", 
      maxWidth: { xs: "100%", md: "300px" },
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Fixed header section */}
      <Box sx={{ 
        flexShrink: 0,
        mb: 2,
        pb: 2,
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
      }}>
        <TextField
          inputRef={searchInputRef}
          size="small"
          placeholder="Search in documentation..."
          value={searchText}
          autoFocus={true}
          onChange={(e) => {
            setSearchText(e.target.value)
            // Reset scroll position of results to top
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTop = 0;
            }
          }}
          onKeyDown={handleSearchKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: searchText && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search"
                  title="Clear search"
                  size="small"
                  onClick={() => {
                    setSearchText("");
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollTop = 0;
                    }
                  }}
                  edge="end"
                  sx={{
                    color: "rgba(255, 255, 255, 0.6)",
                    "&:hover": {
                      color: "rgba(255, 255, 255, 0.9)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    padding: "2px",
                    marginRight: "-2px",
                  }}
                >
                  <ClearIcon
                    fontSize="small"
                    sx={{
                      height: "16px",
                      width: "16px",
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: "100%",
            minWidth: { xs: "250px", md: "270px" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
              "&.Mui-focused": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            },
          }}
        />
        {/* totalResultCount > 0 && (
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ ml: 1, mt: -2, display: 'block', opacity: 0.7, fontStyle: 'italic' }}
          >
            Found {totalResultCount} section{totalResultCount !== 1 ? "s" : ""}
             {resultCount >= 50 ? `. Showing top ${resultCount}.`
              : resultCount > 2 ? '. Showing all of them.'
              : resultCount === 2
              ? `. Showing both.`
              : '' }
          </Typography>
        )*/}
      </Box>
      
      {/* Scrollable navigation content */}
      <Box 
        ref={scrollContainerRef}
        sx={{ 
        flex: 1,
        overflowY: "auto",
        // Custom scrollbar styling
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "3px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        },
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255, 255, 255, 0.1) transparent",
      }}
      >
        <List role="listbox" aria-label="Search results">{Object.entries(filteredNavigation).map(([key, item]) =>
            renderNavItem(key, item)
          )}
        </List>
        {totalResultCount === 0 && (
          <Box sx={{ textAlign: "center", mt: 3, color: "text.secondary" }}>
            <Typography variant="body2">
              No results found for &ldquo;{searchText}&rdquo;
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Sidebar
