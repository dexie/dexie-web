"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "@mui/material/styles";
import { COLOR_MODE_STORAGE_KEY } from "./ColorModeScript";

export type ColorMode = "light" | "dark";

interface ThemeModeContextValue {
  mode: ColorMode;
  toggleMode: () => void;
  setMode: (mode: ColorMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(
  undefined,
);

/**
 * Thin wrapper around MUI's own `useColorScheme` (backed by
 * `theme.colorSchemes` + `cssVariables`). It:
 *  - Reads the mode MUI resolved (which itself defaults to the system
 *    preference the first time, via CssVarsProvider) and exposes it as a
 *    simple "light" | "dark" value.
 *  - Persists explicit user choices to localStorage under the same key the
 *    no-flash bootstrap script uses, so subsequent loads honor the manual
 *    choice instead of falling back to the OS preference.
 */
export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const { mode: muiMode, setMode: setMuiMode, systemMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedMode: ColorMode =
    (mounted ? (muiMode === "system" ? systemMode : muiMode) : undefined) ===
    "light"
      ? "light"
      : "dark";

  const setMode = useCallback(
    (next: ColorMode) => {
      setMuiMode(next);
      try {
        window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, next);
      } catch {
        // localStorage may be unavailable (private mode / disabled) — ignore.
      }
    },
    [setMuiMode],
  );

  const toggleMode = useCallback(() => {
    setMode(resolvedMode === "light" ? "dark" : "light");
  }, [resolvedMode, setMode]);

  const value = useMemo(
    () => ({ mode: resolvedMode, toggleMode, setMode }),
    [resolvedMode, setMode, toggleMode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return ctx;
}
