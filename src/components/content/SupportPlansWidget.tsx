import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Chip,
  SxProps,
  Theme,
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"

interface SupportPlan {
  title: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
  badge?: string
  ctaText?: string
  ctaHref?: string
}

interface SupportPlansWidgetProps {
  plans: SupportPlan[]
  settings?: {
    textColor?: string
    backgroundColor?: string
    containerWidth?: "small" | "medium" | "big"
    sectionTitle?: string
    sectionSubtitle?: string
  }
  sx?: SxProps<Theme>
}

export default function SupportPlansWidget({
  plans,
  settings = {},
  sx = {},
}: SupportPlansWidgetProps) {
  const {
    textColor = "#dee2e6",
    backgroundColor = "#000000",
    containerWidth = "big",
    sectionTitle = "Support Options",
    sectionSubtitle = "Choose the right level of support for your team and requirements",
  } = settings

  const getMaxWidth = () => {
    switch (containerWidth) {
      case "small":
        return "sm"
      case "medium":
        return "md"
      case "big":
        return "xl"
      default:
        return "xl"
    }
  }

  return (
    <Box sx={{ backgroundColor, py: 8, ...sx }}>
      <Container maxWidth={getMaxWidth()}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 2,
            color: textColor,
            fontWeight: 600,
          }}
        >
          {sectionTitle}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: 6,
            color: "#adb5bd",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          {sectionSubtitle}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
            alignItems: "stretch",
          }}
        >
          {plans.map((plan, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                ...(plan.highlighted && {
                  transform: { xs: "none", md: "scale(1.04)" },
                  zIndex: 2,
                }),
              }}
            >
              <Card
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: plan.highlighted ? "#1a1035" : "#1a1a1a",
                  border: plan.highlighted
                    ? "1px solid #c77dff"
                    : "1px solid #333",
                  position: "relative",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  ...(plan.highlighted && {
                    boxShadow:
                      "0 8px 40px rgba(199, 125, 255, 0.15), 0 0 0 1px rgba(199, 125, 255, 0.3)",
                  }),
                  "&:hover": plan.highlighted
                    ? {
                        borderColor: "#e0aaff",
                        backgroundColor: "#241548",
                        boxShadow:
                          "0 16px 60px rgba(199, 125, 255, 0.35), 0 0 0 1px rgba(224, 170, 255, 0.6)",
                      }
                    : {
                        borderColor: "#555",
                      },
                }}
              >
                {plan.badge && (
                  <Chip
                    label={plan.badge}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      backgroundColor: "transparent",
                      border: "1px solid #c77dff",
                      color: "#c77dff",
                      fontWeight: 600,
                      fontSize: "0.7rem",
                    }}
                  />
                )}
                <CardContent
                  sx={{
                    p: 4,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ color: textColor, fontWeight: 700, mb: 0.5 }}
                  >
                    {plan.title}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{
                        color: plan.highlighted ? "#c77dff" : textColor,
                        fontWeight: 700,
                      }}
                    >
                      {plan.price}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#adb5bd",
                      mb: 3,
                      lineHeight: 1.7,
                    }}
                  >
                    {plan.description}
                  </Typography>
                  <List sx={{ padding: 0, flex: 1 }}>
                    {plan.features.map((feature, featureIndex) => (
                      <ListItem
                        key={featureIndex}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start !important",
                          alignContent: "flex-start !important",
                          p: "1px !important",
                          pb: "5px !important",
                          pl: "10px !important",
                          ml: "-10px !important",
                          borderRadius: "4px",
                          transition: "background-color 0.15s",
                          "&:hover": plan.highlighted
                            ? {
                                backgroundColor:
                                  "rgba(199, 125, 255, 0.1)",
                                "& .MuiSvgIcon-root": {
                                  color: "#e0aaff",
                                },
                                "& .MuiTypography-root": {
                                  color: "#e0aaff",
                                },
                              }
                            : {
                                backgroundColor:
                                  "rgba(255, 255, 255, 0.04)",
                              },
                          "& .MuiTypography-root": {
                            mb: "0px",
                          },
                          "& .MuiListItemText-root": {
                            m: "0px",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: "auto",
                            mr: 1,
                            justifyContent: "flex-start",
                            alignContent: "flex-start",
                          }}
                        >
                          <CheckIcon
                            sx={{
                              fontSize: "16px",
                              color: plan.highlighted ? "#c77dff" : "#adb5bd",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              component="span"
                              sx={{
                                color: textColor,
                                fontSize: "0.9rem",
                                lineHeight: 1.4,
                              }}
                            >
                              {feature}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>

                  {plan.ctaText && plan.ctaHref && (
                    <Button
                      component="a"
                      href={plan.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant={plan.highlighted ? "contained" : "outlined"}
                      startIcon={<CalendarMonthIcon />}
                      fullWidth
                      sx={{
                        mt: 3,
                        py: 1.5,
                        fontWeight: 600,
                        ...(plan.highlighted
                          ? {
                              backgroundColor: "#c77dff",
                              color: "#000",
                              "&:hover": { backgroundColor: "#a855f7" },
                            }
                          : {
                              borderColor: "#555",
                              color: textColor,
                              "&:hover": {
                                borderColor: "#c77dff",
                                color: "#c77dff",
                              },
                            }),
                      }}
                    >
                      {plan.ctaText}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export type { SupportPlan }
