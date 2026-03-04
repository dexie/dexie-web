"use client"

import React, { useEffect, useState, useCallback } from "react"
import { Box, alpha, useTheme } from "@mui/material"

interface NavItem {
  id: string
  label: string
}

const navItems: NavItem[] = [
  { id: "cloud", label: "Cloud Plans" },
  { id: "comparison", label: "Comparison" },
  { id: "support", label: "Support" },
  { id: "services", label: "Services" },
  { id: "faq", label: "FAQ" },
]

export default function PricingStickyNav() {
  const [activeSection, setActiveSection] = useState<string>("")
  const [isVisible, setIsVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const theme = useTheme()

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting)
      if (visibleEntries.length > 0) {
        const mostVisible = visibleEntries.reduce((prev, curr) =>
          curr.intersectionRatio > prev.intersectionRatio ? curr : prev,
        )
        setActiveSection(mostVisible.target.id)
      }
    },
    [],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-120px 0px -60% 0px",
      threshold: [0, 0.25, 0.5],
    })

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [handleIntersection])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      // navbar (56 mobile / 64 desktop) + subnav (36) + spacing
      const offset = window.innerWidth < 600 ? 96 : 108
      const y = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <Box
      component="nav"
      aria-label="Page sections"
      sx={{
        position: "fixed",
        top: { xs: 56, sm: 64 },
        left: 0,
        right: 0,
        zIndex: 1099,
        backgroundColor:
          mounted && scrolled
            ? alpha(theme.palette.background.default, 0.85)
            : "transparent",
        backdropFilter: mounted && scrolled ? "blur(12px)" : "none",
        borderBottom:
          mounted && scrolled
            ? `1px solid ${alpha(theme.palette.divider, 0.15)}`
            : "1px solid transparent",
        transform: {
          xs: isVisible
            ? "translateY(0)"
            : "translateY(calc(-100% - 56px))",
          sm: isVisible
            ? "translateY(0)"
            : "translateY(calc(-100% - 64px))",
        },
        transition: "all 0.3s ease-in-out",
        willChange: "transform",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", sm: "center" },
          alignItems: "center",
          gap: 0,
          height: 36,
          px: { xs: 1, sm: 2 },
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {navItems.map(({ id, label }) => {
          const isActive = activeSection === id
          return (
            <Box
              key={id}
              component="button"
              onClick={() => scrollToSection(id)}
              sx={{
                display: "flex",
                alignItems: "center",
                px: { xs: 1.2, sm: 2 },
                py: 0.5,
                border: "none",
                borderRadius: 0,
                backgroundColor: "transparent",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                whiteSpace: "nowrap",
                flexShrink: 0,
                opacity: isActive ? 1 : 0.78,
                color: theme.palette.text.primary,
                fontSize: { xs: "13px", sm: "14px" },
                fontWeight: isActive ? 600 : 400,
                textTransform: "none",
                letterSpacing: 0,
                lineHeight: 1,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  opacity: 1,
                },
              }}
            >
              {label}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
