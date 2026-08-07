"use client";
import {
  createTheme,
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material/styles";

// Extend the theme interface to add custom background.main and discord color
declare module "@mui/material/styles" {
  interface TypeBackground {
    main: string;
  }

  interface Palette {
    discord: PaletteColor;
  }

  interface PaletteOptions {
    discord?: PaletteColorOptions;
  }
}

// Extend Button props to include discord color
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    discord: true;
  }
}

// -----------------------------------------------------------------------------
// Shared tokens
// -----------------------------------------------------------------------------
// Dark palette values are kept byte-for-byte identical to the pre-light-mode
// theme to guarantee zero visual regression for dark mode.
const darkPalette = {
  mode: "dark" as const,
  background: {
    main: "#212529", // Dark background for navbar
    default: "#000000", // Main dark background
    paper: "rgba(255,255,255, 0.02) !important", // Very subtle white overlay
  },
  primary: {
    main: "#000000",
    light: "#000000",
    dark: "#000000",
  },
  secondary: {
    main: "#c77dff",
    light: "#e0b3ff",
    dark: "#9b59b6",
  },
  discord: {
    main: "#5865F2", // Discord Blurple
    light: "#7289DA",
    dark: "#4752C4",
  },
  text: {
    primary: "#dee2e6",
    secondary: "#dee2e6bf",
  },
  success: {
    main: "#75b798",
    dark: "#0f5132",
  },
  warning: {
    main: "#ffda6a",
    dark: "#997404",
  },
  error: {
    main: "#ea868f",
    dark: "#842029",
  },
  info: {
    main: "#6edff6",
    dark: "#087990",
  },
  divider: "#495057",
};

// Light palette — designed to feel modern & airy while reusing the same
// secondary/discord/status hues (adjusted for contrast on white) so the
// brand identity stays consistent between modes.
const lightPalette = {
  mode: "light" as const,
  background: {
    main: "#ffffff", // Light navbar background
    default: "#f7f7fa", // Soft off-white main background
    paper: "#ffffff",
  },
  primary: {
    main: "#111214",
    light: "#3a3b3f",
    dark: "#000000",
  },
  secondary: {
    main: "#8a3ffc", // Deeper violet than dark mode's #c77dff for AA contrast on white
    light: "#b98bff",
    dark: "#6b2bc9",
  },
  discord: {
    main: "#5865F2",
    light: "#7289DA",
    dark: "#4752C4",
  },
  text: {
    primary: "#1c1e21",
    secondary: "#4b4f56",
  },
  success: {
    main: "#1f7a4d",
    dark: "#0f5132",
  },
  warning: {
    main: "#9a6700",
    dark: "#7a5200",
  },
  error: {
    main: "#c22b3a",
    dark: "#842029",
  },
  info: {
    main: "#0a7ea0",
    dark: "#087990",
  },
  divider: "#e0e0e6",
};

const typography = {
  fontFamily:
    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  fontSize: 16, // 1rem = 16px
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontSize: "clamp(1.375rem, 1.375rem + 1.5vw, 2.5rem)",
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: "0.5rem",
  },
  h2: {
    fontSize: "clamp(1.325rem, 1.325rem + 0.9vw, 2rem)",
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: "0.5rem",
  },
  h3: {
    fontSize: "clamp(1.3rem, 1.3rem + 0.6vw, 1.75rem)",
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: "0.5rem",
  },
  h4: {
    fontSize: "clamp(1.275rem, 1.275rem + 0.3vw, 1.5rem)",
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: "0.5rem",
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: "0.5rem",
  },
  h6: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: "0.5rem",
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    marginBottom: "1rem",
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.5,
  },
  subtitle1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.75,
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.57,
  },
  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.66,
  },
  overline: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 2.66,
    textTransform: "uppercase" as const,
  },
  button: {
    lineHeight: 1.75,
    // MUI Button styles
    paddingLeft: "32px !important",
    paddingRight: "32px !important",
    paddingTop: "16px !important",
    paddingBottom: "15px !important",
    borderRadius: "4px !important",
    fontSize: "13px !important",
    fontWeight: 700,
    textTransform: "uppercase" as const,
  },
};

const theme = createTheme({
  // `colorSchemeSelector: "data"` does NOT map to the default
  // `data-mui-color-scheme` attribute that useColorScheme()/our bootstrap
  // script manage on <html> — it silently falls back to "media" mode
  // (`@media (prefers-color-scheme: ...)`), which only reflects the OS
  // preference and never responds to a manual toggle. The selector must be
  // spelled out explicitly to target the actual attribute.
  cssVariables: {
    colorSchemeSelector: "data-mui-color-scheme",
  },
  colorSchemes: {
    dark: { palette: darkPalette },
    light: { palette: lightPalette },
  },
  defaultColorScheme: "dark",
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  spacing: 8, // 8px base unit
  typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: 1.5,
          margin: 0,
          paddingRight: "0 !important",
        },
        "h1, h2, h3, h4, h5, h6": {
          marginTop: 0,
          marginBottom: "0.5rem",
          fontWeight: 500,
          lineHeight: 1.2,
          "& code": {
            fontSize: "0.95em !important", // Slightly smaller than heading text for better balance
            fontWeight: "500 !important", // Ensure consistent weight
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "0.1em 0.25em",
            borderRadius: "0.25rem",
            fontFamily: "monospace",
            display: "inline", // Ensure proper inline display
          },
        },
        p: {
          marginTop: 0,
          marginBottom: "1rem",
        },
        a: {
          textDecoration: "underline",
          opacity: 0.8, // Default opacity
          "&:hover": {
            opacity: 1, // Full opacity on hover
            textDecoration: "none", // No underline on hover
          },
          "&:visited": {
            opacity: 0.8,
          },
        },
        "b, strong": {
          fontWeight: "bolder",
        },
        "small, .small": {
          fontSize: "0.875em",
        },
        hr: {
          margin: "1rem 0",
          color: "inherit",
          border: 0,
          borderTop: "1px solid",
          opacity: 0.25,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          borderRadius: "0.375rem", // Bootstrap border radius
          fontWeight: 700,
          letterSpacing: "1.105px",
          fontSize: "13px !important",
          // Discord color variants
          "&.MuiButton-containedDiscord": {
            backgroundColor: "#5865F2",
            color: "white",
            "&:hover": {
              backgroundColor: "#4752C4",
            },
          },
          "&.MuiButton-outlinedDiscord": {
            color: "#5865F2",
            borderColor: "#5865F2",
            "&:hover": {
              backgroundColor: "rgba(88, 101, 242, 0.1)",
              borderColor: "#4752C4",
            },
          },
          "&.MuiButton-textDiscord": {
            color: "#5865F2",
            "&:hover": {
              backgroundColor: "rgba(88, 101, 242, 0.1)",
            },
          },
        },
        text: {
          textTransform: "none",
          fontSize: "17px !important",
          fontWeight: 500,
          letterSpacing: "0.5px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            opacity: 0.85,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "0.375rem",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          opacity: 0.25,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
        head: {
          backgroundColor: "transparent",
          fontWeight: 600,
        },
      },
    },
  },
});

// Per-mode component overrides that intentionally keep dark-mode values
// pixel-identical to the pre-light-mode theme, and add matching light-mode
// styling using theme.applyStyles("light", {...}).
const baseComponentOverrides = theme.components as unknown as Record<
  string,
  { styleOverrides?: Record<string, object> }
>;

theme.components = {
  ...theme.components,
  MuiCssBaseline: {
    styleOverrides: {
      ...(theme.components?.MuiCssBaseline?.styleOverrides as object),
      body: {
        ...baseComponentOverrides.MuiCssBaseline?.styleOverrides?.body,
        backgroundColor: darkPalette.background.default,
        color: darkPalette.text.primary,
        ...theme.applyStyles("light", {
          backgroundColor: lightPalette.background.default,
          color: lightPalette.text.primary,
        }),
      },
      "h1, h2, h3, h4, h5, h6": {
        ...baseComponentOverrides.MuiCssBaseline?.styleOverrides?.[
          "h1, h2, h3, h4, h5, h6"
        ],
        color: darkPalette.text.primary,
        ...theme.applyStyles("light", {
          color: lightPalette.text.primary,
        }),
      },
      a: {
        ...baseComponentOverrides.MuiCssBaseline?.styleOverrides?.a,
        color: "#ffffff",
        ...theme.applyStyles("light", {
          color: lightPalette.primary.main,
        }),
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: "#343a40",
        color: darkPalette.text.primary,
        borderColor: "#495057",
        ...theme.applyStyles("light", {
          backgroundColor: "#ffffff",
          color: lightPalette.text.primary,
          borderColor: lightPalette.divider,
        }),
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: darkPalette.background.main,
        color: darkPalette.text.primary,
        borderColor: "#495057",
        paddingRight: "0 !important",
        ...theme.applyStyles("light", {
          backgroundColor: lightPalette.background.main,
          color: lightPalette.text.primary,
          borderColor: lightPalette.divider,
        }),
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      ...(theme.components?.MuiButton?.styleOverrides as object),
      root: {
        ...baseComponentOverrides.MuiButton?.styleOverrides?.root,
        color: "rgba(255, 255, 255, 0.8)",
        "&.MuiButton-outlinedSecondary": {
          color: darkPalette.secondary.main,
          borderColor: darkPalette.secondary.main,
          "&:hover": {
            backgroundColor: "rgba(199, 125, 255, 0.1)",
            borderColor: darkPalette.secondary.light,
          },
        },
        ...theme.applyStyles("light", {
          color: "rgba(17, 18, 20, 0.85)",
          "&.MuiButton-outlinedSecondary": {
            color: lightPalette.secondary.main,
            borderColor: lightPalette.secondary.main,
            "&:hover": {
              backgroundColor: "rgba(107, 33, 196, 0.08)",
              borderColor: lightPalette.secondary.dark,
            },
          },
        }),
      },
      text: {
        ...baseComponentOverrides.MuiButton?.styleOverrides?.text,
        color: darkPalette.text.primary,
        "&:hover": {
          color: darkPalette.text.primary,
        },
        ...theme.applyStyles("light", {
          color: lightPalette.text.primary,
          "&:hover": {
            color: lightPalette.text.primary,
          },
        }),
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#212529",
          "& fieldset": {
            borderColor: "#495057",
          },
          "&:hover fieldset": {
            borderColor: "#6ea8fe",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#6ea8fe",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#dee2e6bf",
        },
        "& .MuiOutlinedInput-input": {
          color: darkPalette.text.primary,
        },
        ...theme.applyStyles("light", {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#ffffff",
            "& fieldset": {
              borderColor: lightPalette.divider,
            },
            "&:hover fieldset": {
              borderColor: lightPalette.secondary.main,
            },
            "&.Mui-focused fieldset": {
              borderColor: lightPalette.secondary.main,
            },
          },
          "& .MuiInputLabel-root": {
            color: lightPalette.text.secondary,
          },
          "& .MuiOutlinedInput-input": {
            color: lightPalette.text.primary,
          },
        }),
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: "#343a40",
        color: darkPalette.text.primary,
        border: "1px solid #495057",
        borderRadius: "0.375rem",
        ...theme.applyStyles("light", {
          backgroundColor: "#ffffff",
          color: lightPalette.text.primary,
          border: `1px solid ${lightPalette.divider}`,
          boxShadow: "0 1px 3px rgba(16, 24, 40, 0.06)",
        }),
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        backgroundColor: "#495057",
        opacity: 0.25,
        ...theme.applyStyles("light", {
          backgroundColor: lightPalette.divider,
          opacity: 1,
        }),
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        color: darkPalette.text.primary,
        "&:hover": {
          backgroundColor: "#2b3035",
        },
        ...theme.applyStyles("light", {
          color: lightPalette.text.primary,
          "&:hover": {
            backgroundColor: "rgba(17, 18, 20, 0.04)",
          },
        }),
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        "&.MuiLink-root": {
          color: "#ffffff",
          opacity: 0.8,
          "&:hover": {
            opacity: 1,
          },
          "&:visited": {
            color: "#ffffff",
            opacity: 0.8,
          },
          ...theme.applyStyles("light", {
            color: lightPalette.primary.main,
            opacity: 0.85,
            "&:hover": {
              opacity: 1,
            },
            "&:visited": {
              color: lightPalette.primary.main,
              opacity: 0.85,
            },
          }),
        },
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        color: darkPalette.text.primary,
        textDecoration: "none",
        "&:hover": {
          color: "#ffffff",
          textDecoration: "none",
        },
        "&:visited": {
          color: darkPalette.text.primary,
        },
        ...theme.applyStyles("light", {
          color: lightPalette.text.primary,
          "&:hover": {
            color: lightPalette.secondary.dark,
          },
          "&:visited": {
            color: lightPalette.text.primary,
          },
        }),
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        backgroundColor: "#343a40",
        color: darkPalette.text.primary,
        border: "1px solid #495057",
        ...theme.applyStyles("light", {
          backgroundColor: "#eef0f3",
          color: lightPalette.text.primary,
          border: `1px solid ${lightPalette.divider}`,
        }),
      },
    },
  },
  MuiTable: {
    styleOverrides: {
      root: {
        backgroundColor: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        ...theme.applyStyles("light", {
          border: `1px solid ${lightPalette.divider}`,
        }),
      },
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: {
        backgroundColor: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        ...theme.applyStyles("light", {
          border: `1px solid ${lightPalette.divider}`,
        }),
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        backgroundColor: "transparent",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.02)",
        },
        ...theme.applyStyles("light", {
          borderBottom: `1px solid ${lightPalette.divider}`,
          "&:hover": {
            backgroundColor: "rgba(17, 18, 20, 0.03)",
          },
        }),
      },
      head: {
        borderBottom: "2px solid rgba(255, 255, 255, 0.05)",
        ...theme.applyStyles("light", {
          borderBottom: `2px solid ${lightPalette.divider}`,
        }),
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        backgroundColor: "transparent",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        color: darkPalette.text.primary,
        "&:last-child": {
          borderRight: "none",
        },
        ...theme.applyStyles("light", {
          borderBottom: `1px solid ${lightPalette.divider}`,
          borderRight: `1px solid ${lightPalette.divider}`,
          color: lightPalette.text.primary,
        }),
      },
      head: {
        backgroundColor: "transparent",
        borderBottom: "2px solid rgba(255, 255, 255, 0.05)",
        fontWeight: 600,
        color: darkPalette.text.primary,
        ...theme.applyStyles("light", {
          borderBottom: `2px solid ${lightPalette.divider}`,
          color: lightPalette.text.primary,
        }),
      },
    },
  },
};

export default theme;
export { darkPalette, lightPalette };
