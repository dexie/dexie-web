"use client";

import { Box, Typography } from "@mui/material";
import ButtonWidget, { ButtonWidgetProps } from "../shared/Button";
import { HeroWidgetSettings } from "@/types/widgets";
import { useThemeMode } from "@/theme/ThemeModeProvider";

interface HeroWidgetProps {
  preHeading: string;
  heading: string | React.ReactNode;
  text: string;
  background: string;
  backgroundLight?: string;
  contentRight?: React.ReactNode;
  contentRightWidthPercentage?: number;
  contentBottom?: React.ReactNode;
  buttons: ButtonWidgetProps[];
  settings?: HeroWidgetSettings;
}

export default function HeroWidget({
  preHeading,
  heading,
  text,
  background,
  backgroundLight,
  contentRight,
  contentRightWidthPercentage = 50,
  contentBottom,
  buttons,
  settings: {
    textColor = "#000000",
    containerWidth = "default",
    textWidth = "100%",
    height = "100vh",
    overlayStrength,
    textAlignment = "left",
    verticalTextAlignment = "center",
  } = {},
}: HeroWidgetProps) {
  const { mode } = useThemeMode();
  const resolvedBackground =
    mode === "light" && backgroundLight ? backgroundLight : background;
  const resolvedTextColor =
    mode === "light" && /^(#fff|#ffffff)$/i.test(textColor)
      ? "var(--dexie-bright)"
      : textColor;
  // Smooth scroll for 'How it works?' button
  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    button: ButtonWidgetProps,
  ) => {
    if (button.link.url === "#how-it-works-video") {
      e.preventDefault();
      const el = document.getElementById("how-it-works-video");
      if (el) {
        const rect = el.getBoundingClientRect();
        window.scrollTo({
          top: window.scrollY + rect.top - 32,
          behavior: "smooth",
        });
      }
    }
    if (button.onClick) {
      button.onClick(e);
    }
  };
  // Container width mapping
  const getContainerMaxWidth = () => {
    switch (containerWidth) {
      case "small":
        return "600px";
      case "big":
        return "1400px";
      case "default":
      default:
        return "1200px";
    }
  };

  // Text alignment mapping for flexbox
  const getJustifyContent = () => {
    switch (textAlignment) {
      case "center":
        return "center";
      case "right":
        return "flex-end";
      case "space-around":
        return "space-around";
      case "space-between":
        return "space-between";
      case "space-evenly":
        return "space-evenly";
      case "left":
      default:
        return "flex-start";
    }
  };

  // Vertical alignment mapping
  const getAlignItems = () => {
    switch (verticalTextAlignment) {
      case "top":
        return "flex-start";
      case "bottom":
        return "flex-end";
      case "center":
      default:
        return "center";
    }
  };

  // Determine if overlay should be light or dark based on text color
  const getOverlayColor = (color: string = resolvedTextColor) => {
    if (!overlayStrength) return "transparent";

    // The light hero asset is already tuned for dark text. Keep the overlay
    // subtle instead of applying the dark-mode readability veil.
    if (mode === "light" && backgroundLight) {
      return `rgba(255, 255, 255, ${Math.min(
        parseInt(overlayStrength.replace("%", "")) / 100,
        0.24,
      )})`;
    }

    if (color.startsWith("var(")) {
      const opacity = parseInt(overlayStrength.replace("%", "")) / 100;
      return mode === "light"
        ? `rgba(255, 255, 255, ${opacity})`
        : `rgba(0, 0, 0, ${opacity})`;
    }

    // Simple brightness calculation - if text is light, overlay should be dark
    const hex = color.replace("#", "");
    const normalizedHex =
      hex.length === 3
        ? hex
            .split("")
            .map((channel) => channel + channel)
            .join("")
        : hex;
    const r = parseInt(normalizedHex.substr(0, 2), 16);
    const g = parseInt(normalizedHex.substr(2, 2), 16);
    const b = parseInt(normalizedHex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    const opacity = parseInt(overlayStrength.replace("%", "")) / 100;
    return brightness > 128
      ? `rgba(0, 0, 0, ${opacity})` // Dark overlay for light text
      : `rgba(255, 255, 255, ${opacity})`; // Light overlay for dark text
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${resolvedBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: {
          xs: "auto", // Auto height on small screens
          md: height, // Fixed height on medium and larger screens
        },
        minHeight: {
          xs: contentBottom ? "auto" : "100vh", // Auto height if contentBottom exists on small screens
          md: "800px",
        },
        display: "flex",
        flexDirection: {
          xs: "column", // Column layout on small screens to stack content
          md: "row", // Default flex direction for larger screens
        },
        justifyContent: {
          xs: "flex-start", // Start from top on small screens
          md: "center",
        },
        alignItems: {
          xs: "stretch", // Stretch to full width on small screens
          md: getAlignItems(),
        },
        position: "relative",
        "&::before": overlayStrength
          ? {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: getOverlayColor(resolvedTextColor),
              zIndex: 1,
            }
          : {},
      }}
    >
      <Box
        sx={{
          maxWidth: {
            xs: "100%", // Full width on small screens
            md: getContainerMaxWidth(),
          },
          width: "100%",
          padding: {
            xs: 2, // Less padding on small screens
            md: 4,
          },
          paddingTop: {
            xs: 8, // More top padding if no bottom content on small screens
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: {
            xs: "center", // Space between content and bottom on small screens
            md: contentRight ? "space-between" : getJustifyContent(),
          },
          alignItems: {
            xs: "center", // Center align on small screens
            md: getAlignItems(),
          },
          position: "relative",
          zIndex: 2,
          flex: 1, // Take up available space
          minHeight: {
            xs: "auto", // Full height if contentBottom exists
            md: "auto",
          },
        }}
      >
        {/* Main content wrapper */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column", // Always column on small screens
              md: contentRight ? "row" : "column", // Row if contentRight exists on medium+ screens
            },
            justifyContent: {
              xs: "center", // Center content on small screens
              md: contentRight ? "space-between" : getJustifyContent(),
            },
            alignItems: {
              xs: "center", // Center align on small screens
              md: getAlignItems(),
            },
            gap: {
              xs: 3, // Consistent gap on small screens
              md: contentRight ? 4 : 0,
            },
            flex: 1, // Take up available space above contentBottom
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%", // Full width on small screens
                md: contentRight
                  ? `${100 - contentRightWidthPercentage}%`
                  : textWidth,
              },
              color: resolvedTextColor,
              textAlign: {
                xs: "center", // Center text on small screens
                md:
                  textAlignment === "left" ||
                  textAlignment === "center" ||
                  textAlignment === "right"
                    ? textAlignment
                    : "left", // For space-* values, use left alignment within the text box
              },
            }}
          >
            {preHeading && (
              <Typography
                variant="overline"
                component="div"
                sx={{
                  color: "inherit",
                  fontSize: "14px",
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                {preHeading}
              </Typography>
            )}
            <Typography
              variant="h1"
              sx={{
                color: "inherit",
                fontSize: {
                  xs: "10vw", // Smaller on mobile
                  md: "60px",
                },
              }}
            >
              {heading}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "inherit",
                fontSize: {
                  xs: "18px", // Smaller on mobile
                  md: "23px",
                },
                mt: {
                  xs: 2, // Less margin on mobile
                  md: 4,
                },
                mb: {
                  xs: 4, // Less margin on mobile
                  md: 6,
                },
              }}
            >
              {text}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {buttons.map((buttonProps, index) => (
                <ButtonWidget
                  key={index}
                  sx={{ mr: 2 }}
                  {...buttonProps}
                  onClick={(e) => handleButtonClick(e, buttonProps)}
                />
              ))}
            </Box>
          </Box>
          {contentRight && (
            <Box
              sx={{
                width: {
                  xs: "100%", // Full width on small screens
                  md: `${contentRightWidthPercentage}%`,
                },
                zoom: {
                  xs: "0.8",
                  sm: 1,
                },
                padding: {
                  xs: 2, // Padding around contentRight on small screens
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {contentRight}
            </Box>
          )}
        </Box>
      </Box>
      {/* Content bottom - flows naturally on small screens, absolute on larger */}
      {contentBottom && (
        <Box
          sx={{
            position: {
              xs: "relative", // Natural flow on small screens
              md: "absolute", // Absolute positioning on larger screens
            },
            bottom: {
              xs: "auto", // No bottom positioning on small screens
              md: 0,
            },
            left: {
              xs: "auto",
              md: 0,
            },
            right: {
              xs: "auto",
              md: 0,
            },
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: {
              xs: 2, // Less padding on small screens
              md: 4,
            },
            zIndex: 2,
            mt: {
              xs: 4, // Add margin top on small screens to separate from main content
              md: 0,
            },
          }}
        >
          {contentBottom}
        </Box>
      )}
    </Box>
  );
}
