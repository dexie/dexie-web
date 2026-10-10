"use client";

import { useState } from "react";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "@/theme/ThemeModeProvider";

interface ThemeModeToggleProps {
  size?: "small" | "medium" | "large";
  sx?: object;
}

/**
 * Modern icon-button theme toggle (sun/moon swap), matching the pattern used
 * by most developer-facing sites (GitHub, MUI docs, Vercel, etc). Rendered as
 * a controlled no-op until mounted to avoid hydration flashes, since the
 * "true" mode is only known client-side (localStorage / OS preference).
 */
export default function ThemeModeToggle({
  size = "medium",
  sx,
}: ThemeModeToggleProps) {
  const { mode, toggleMode } = useThemeMode();
  const theme = useTheme();
  const [pressed, setPressed] = useState(false);

  const isLight = mode === "light";

  return (
    <Tooltip title={isLight ? "Switch to dark mode" : "Switch to light mode"}>
      <IconButton
        onClick={() => {
          setPressed(true);
          toggleMode();
          window.setTimeout(() => setPressed(false), 200);
        }}
        aria-label="Toggle color mode"
        aria-pressed={isLight}
        size={size}
        sx={{
          color: theme.palette.text.primary,
          transition: "transform 0.2s ease, background-color 0.2s ease",
          transform: pressed ? "scale(0.88) rotate(-20deg)" : "none",
          ...sx,
        }}
      >
        {isLight ? (
          <DarkModeIcon fontSize={size === "medium" ? "small" : size} />
        ) : (
          <LightModeIcon fontSize={size === "medium" ? "small" : size} />
        )}
      </IconButton>
    </Tooltip>
  );
}
