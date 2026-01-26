"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Box,
  TextField,
  InputAdornment,
  Paper,
  List,
  ListItem,
  Typography,
  ClickAwayListener,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useRouter } from "next/navigation"
import { offlineDB, type SearchResult } from "@/db/offlineDB"
import { useLiveQuery } from "dexie-react-hooks"
import { useSetSessionStorage } from "@/utils/useSessionStorage"

export default function LandingSearchBar() {
  const [searchText, setSearchText] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const theme = useTheme()
  const setDocsSearchText = useSetSessionStorage<string>("search")

  // Detect macOS for keyboard shortcut display
  const [isMac, setIsMac] = useState(false)
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  // Global keyboard shortcut handler (Cmd/Ctrl + K)
  const handleGlobalKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      inputRef.current?.focus()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [handleGlobalKeyDown])

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

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchText.trim()) {
      // Navigate to docs with search query
      setDocsSearchText(searchText)
      router.push(`/docs`)
      setShowDropdown(false)
      inputRef.current?.blur()
    }
    if (e.key === "Escape") {
      setShowDropdown(false)
      inputRef.current?.blur()
    }
    if (e.key === "ArrowDown" && hasResults) {
      e.preventDefault()
      const firstItem = document.querySelector('[data-landing-search-item]') as HTMLElement
      firstItem?.focus()
    }
  }

  const handleItemClick = (result: SearchResult) => {
    setDocsSearchText(searchText)
    router.push(result.url)
    setShowDropdown(false)
    setSearchText("")
  }

  const handleItemKeyDown = (e: React.KeyboardEvent, result: SearchResult, index: number) => {
    if (e.key === "Enter") {
      handleItemClick(result)
    }
    if (e.key === "Escape") {
      setShowDropdown(false)
      inputRef.current?.focus()
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      const items = document.querySelectorAll('[data-landing-search-item]')
      const nextItem = items[index + 1] as HTMLElement
      nextItem?.focus()
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (index === 0) {
        inputRef.current?.focus()
      } else {
        const items = document.querySelectorAll('[data-landing-search-item]')
        const prevItem = items[index - 1] as HTMLElement
        prevItem?.focus()
      }
    }
  }

  // Limit displayed results
  const displayedResults = searchResults.searchResults.slice(0, 6)

  return (
    <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
      <Box
        sx={{
          position: "relative",
          display: { xs: "none", lg: "flex" },
          alignItems: "center",
        }}
      >
        <TextField
          inputRef={inputRef}
          size="small"
          hiddenLabel
          placeholder="Search docs..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
            setShowDropdown(true)
          }}
          onFocus={() => {
            setIsFocused(true)
            if (searchText.length >= 2) {
              setShowDropdown(true)
            }
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon 
                    fontSize="small" 
                    sx={{ 
                      color: isFocused 
                        ? theme.palette.secondary.main 
                        : "rgba(255, 255, 255, 0.5)",
                      transition: "color 0.2s ease",
                    }} 
                  />
                </InputAdornment>
              ),
              endAdornment: isSearching ? (
                <InputAdornment position="end">
                  <CircularProgress size={14} color="secondary" />
                </InputAdornment>
              ) : !isFocused && !searchText ? (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.25,
                      fontSize: "11px",
                      color: "rgba(255, 255, 255, 0.35)",
                      fontFamily: "inherit",
                      mr: -0.5,
                    }}
                  >
                    <Box
                      component="kbd"
                      sx={{
                        px: 0.5,
                        py: 0.25,
                        borderRadius: "4px",
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        fontSize: "10px",
                        lineHeight: 1,
                      }}
                    >
                      {isMac ? "⌘" : "Ctrl"}
                    </Box>
                    <Box
                      component="kbd"
                      sx={{
                        px: 0.5,
                        py: 0.25,
                        borderRadius: "4px",
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        fontSize: "10px",
                        lineHeight: 1,
                      }}
                    >
                      K
                    </Box>
                  </Box>
                </InputAdornment>
              ) : null,
            },
          }}
          sx={{
            width: isFocused ? "260px" : "200px",
            transition: "width 0.2s ease",
            "& .MuiOutlinedInput-root": {
              height: "36px",
              borderRadius: "18px",
              backgroundColor: isFocused 
                ? "rgba(255, 255, 255, 0.08)" 
                : "rgba(255, 255, 255, 0.04)",
              border: `1px solid ${isFocused 
                ? alpha(theme.palette.secondary.main, 0.5) 
                : "rgba(255, 255, 255, 0.1)"}`,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.2)",
              },
              "&.Mui-focused": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: alpha(theme.palette.secondary.main, 0.6),
              },
              "& fieldset": {
                border: "none",
              },
            },
            "& .MuiInputBase-input": {
              fontSize: "14px",
              padding: "8px 0",
              "&::placeholder": {
                color: "rgba(255, 255, 255, 0.5)",
                opacity: 1,
              },
            },
            // Reset any default margins
            "& .MuiInputBase-root": {
              marginTop: 0,
              marginBottom: 0,
            },
            marginTop: 0,
            marginBottom: 0,
          }}
        />

        {/* Dropdown Results */}
        {showDropdown && searchText.length >= 2 && (
          <Paper
            elevation={8}
            sx={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              right: 0,
              width: "320px",
              maxHeight: "400px",
              overflowY: "auto",
              backgroundColor: "#1a1a1a",
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
              borderRadius: "12px",
              zIndex: 1300,
            }}
          >
            {hasResults ? (
              <>
                <List sx={{ py: 0.5 }}>
                  {displayedResults.map((result, index) => (
                    <ListItem
                      key={result.url}
                      data-landing-search-item
                      tabIndex={0}
                      onClick={() => handleItemClick(result)}
                      onKeyDown={(e) => handleItemKeyDown(e, result, index)}
                      sx={{
                        cursor: "pointer",
                        py: 1.5,
                        px: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 0.25,
                        borderBottom: index < displayedResults.length - 1 
                          ? "1px solid rgba(255, 255, 255, 0.05)" 
                          : "none",
                        "&:hover, &:focus": {
                          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                          outline: "none",
                        },
                      }}
                    >
                      {result.parentTitle && result.parentTitle !== result.title && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "rgba(255, 255, 255, 0.5)",
                            fontSize: "11px",
                          }}
                        >
                          {result.parentTitle}
                        </Typography>
                      )}
                      <Typography
                        sx={{
                          color: theme.palette.text.primary,
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {result.title}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
                {searchResults.totalResultCount > 6 && (
                  <Box
                    sx={{
                      p: 1.5,
                      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.secondary.main,
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                      onClick={() => {
                        setDocsSearchText(searchText)
                        router.push(`/docs`)
                        setShowDropdown(false)
                      }}
                    >
                      View all {searchResults.totalResultCount} results →
                    </Typography>
                  </Box>
                )}
              </>
            ) : debouncedSearch.length >= 2 && !isSearching ? (
              <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                >
                  No results found for &ldquo;{debouncedSearch}&rdquo;
                </Typography>
              </Box>
            ) : null}
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  )
}
