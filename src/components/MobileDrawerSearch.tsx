"use client"

import { useState, useRef, useEffect } from "react"
import {
  Box,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  alpha,
  CircularProgress,
  IconButton,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import { useRouter } from "next/navigation"
import { offlineDB, type SearchResult } from "@/db/offlineDB"
import { useLiveQuery } from "dexie-react-hooks"
import { useSetSessionStorage } from "@/utils/useSessionStorage"

interface MobileDrawerSearchProps {
  onNavigate: () => void // Called when navigating to close the drawer
}

export default function MobileDrawerSearch({ onNavigate }: MobileDrawerSearchProps) {
  const [searchText, setSearchText] = useState("")
  const [isSearchMode, setIsSearchMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const theme = useTheme()
  const setDocsSearchText = useSetSessionStorage<string>("search")

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText)
    }, 150)
    return () => clearTimeout(timer)
  }, [searchText])

  // Fetch search results
  const searchResults = useLiveQuery(
    async () => {
      if (debouncedSearch.trim().length < 2) {
        return { searchResults: [], totalResultCount: 0 }
      }
      return await offlineDB.findDocuments(debouncedSearch)
    },
    [debouncedSearch],
    { searchResults: [] as SearchResult[], totalResultCount: -1 }
  )

  const hasResults = searchResults.searchResults.length > 0
  const isSearching = searchResults.totalResultCount === -1 && debouncedSearch.length >= 2
  const showResults = isSearchMode && searchText.length >= 2

  const handleItemClick = (result: SearchResult) => {
    setDocsSearchText(searchText)
    router.push(result.url)
    onNavigate()
  }

  const handleSearchSubmit = () => {
    if (searchText.trim()) {
      // Navigate to first result if available, otherwise to docs page
      if (hasResults) {
        const firstResult = searchResults.searchResults[0]
        setDocsSearchText(searchText)
        router.push(firstResult.url)
      } else {
        setDocsSearchText(searchText)
        router.push(`/docs`)
      }
      onNavigate()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit()
    }
    if (e.key === "Escape") {
      setSearchText("")
      setIsSearchMode(false)
      inputRef.current?.blur()
    }
    if (e.key === "ArrowDown" && hasResults) {
      e.preventDefault()
      // Focus first result item
      const firstItem = document.querySelector('[data-mobile-search-item]') as HTMLElement
      firstItem?.focus()
    }
  }

  const handleClear = () => {
    setSearchText("")
    setIsSearchMode(false)
  }

  // Limit displayed results for mobile
  const displayedResults = searchResults.searchResults.slice(0, 8)

  return (
    <Box sx={{ px: 2, py: 1.5 }}>
      <TextField
        inputRef={inputRef}
        size="small"
        fullWidth
        hiddenLabel
        placeholder="Search docs..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value)
          setIsSearchMode(true)
        }}
        onFocus={() => setIsSearchMode(true)}
        onKeyDown={handleKeyDown}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon 
                  fontSize="small" 
                  sx={{ 
                    color: isSearchMode 
                      ? theme.palette.secondary.main 
                      : "rgba(255, 255, 255, 0.5)",
                  }} 
                />
              </InputAdornment>
            ),
            endAdornment: isSearching ? (
              <InputAdornment position="end">
                <CircularProgress size={18} color="secondary" />
              </InputAdornment>
            ) : searchText ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: `1px solid ${isSearchMode 
              ? alpha(theme.palette.secondary.main, 0.5) 
              : "rgba(255, 255, 255, 0.1)"}`,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderColor: alpha(theme.palette.secondary.main, 0.6),
            },
            "& fieldset": {
              border: "none",
            },
          },
          "& .MuiInputBase-input": {
            fontSize: "16px",
            padding: "12px 0",
            "&::placeholder": {
              color: "rgba(255, 255, 255, 0.5)",
              opacity: 1,
            },
          },
        }}
      />

      {/* Search Results */}
      {showResults && (
        <Box sx={{ mt: 1 }}>
          {hasResults ? (
            <List sx={{ py: 0 }}>
              {displayedResults.map((result, index) => (
                <ListItem key={result.url} disablePadding>
                  <ListItemButton
                    data-mobile-search-item
                    tabIndex={0}
                    onClick={() => handleItemClick(result)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleItemClick(result)
                      }
                      if (e.key === "ArrowDown") {
                        e.preventDefault()
                        const items = document.querySelectorAll('[data-mobile-search-item]')
                        const nextItem = items[index + 1] as HTMLElement
                        nextItem?.focus()
                      }
                      if (e.key === "ArrowUp") {
                        e.preventDefault()
                        if (index === 0) {
                          inputRef.current?.focus()
                        } else {
                          const items = document.querySelectorAll('[data-mobile-search-item]')
                          const prevItem = items[index - 1] as HTMLElement
                          prevItem?.focus()
                        }
                      }
                    }}
                    sx={{
                      py: 1.5,
                      px: 1,
                      borderRadius: "8px",
                      "&:hover, &:focus": {
                        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                        outline: "none",
                      },
                    }}
                  >
                    <ListItemText
                      primary={result.title}
                      secondary={result.parentTitle && result.parentTitle !== result.title 
                        ? result.parentTitle 
                        : undefined}
                      primaryTypographyProps={{
                        fontSize: "15px",
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                        noWrap: true,
                      }}
                      secondaryTypographyProps={{
                        fontSize: "12px",
                        color: "rgba(255, 255, 255, 0.5)",
                        noWrap: true,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
              {searchResults.totalResultCount > 8 && (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={handleSearchSubmit}
                    sx={{
                      py: 1.5,
                      px: 1,
                      borderRadius: "8px",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.secondary.main,
                        fontWeight: 500,
                      }}
                    >
                      View all {searchResults.totalResultCount} results →
                    </Typography>
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          ) : debouncedSearch.length >= 2 && !isSearching ? (
            <Box sx={{ py: 3, textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.5)" }}
              >
                No results for &ldquo;{debouncedSearch}&rdquo;
              </Typography>
            </Box>
          ) : null}
        </Box>
      )}
    </Box>
  )
}
