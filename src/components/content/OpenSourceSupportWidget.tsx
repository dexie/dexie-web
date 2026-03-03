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
import EmailIcon from "@mui/icons-material/Email"

export interface OpenSourceSupportPlan {
  title: string
  price: string
  priceNote?: string
  description: string
  features: string[]
  ctaText: string
  ctaHref: string
  highlighted?: boolean
  badge?: string
}

interface OpenSourceSupportWidgetProps {
  plans: OpenSourceSupportPlan[]
  settings?: {
    textColor?: string
    backgroundColor?: string
    containerWidth?: "small" | "medium" | "big"
    sectionTitle?: string
    sectionSubtitle?: string
    note?: string
  }
  sx?: SxProps<Theme>
}

export default function OpenSourceSupportWidget({
  plans,
  settings = {},
  sx = {},
}: OpenSourceSupportWidgetProps) {
  const {
    textColor = "#dee2e6",
    backgroundColor = "#000000",
    containerWidth = "big",
    sectionTitle = "Dexie.js Support",
    sectionSubtitle = "Professional support for teams building on Dexie.js",
    note,
  } = settings

  const getMaxWidth = () => {
    switch (containerWidth) {
      case "small": return "sm"
      case "medium": return "md"
      case "big": return "xl"
      default: return "xl"
    }
  }

  return (
    <Box sx={{ backgroundColor, py: 8, ...sx }}>
      <Container maxWidth={getMaxWidth()}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ textAlign: "center", mb: 2, color: textColor, fontWeight: 600 }}
        >
          {sectionTitle}
        </Typography>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mb: 6, color: "#adb5bd", maxWidth: "800px", mx: "auto" }}
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
            <Box key={index} sx={{ display: "flex", flexDirection: "column" }}>
              <Card
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: plan.highlighted ? "#1a1035" : "#1a1a1a",
                  border: plan.highlighted ? "1px solid #c77dff" : "1px solid #333",
                  position: "relative",
                  transition: "border-color 0.2s",
                  "&:hover": {
                    borderColor: plan.highlighted ? "#c77dff" : "#555",
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
                <CardContent sx={{ p: 4, flex: 1, display: "flex", flexDirection: "column" }}>
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
                    {plan.priceNote && (
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "#adb5bd", ml: 1 }}
                      >
                        {plan.priceNote}
                      </Typography>
                    )}
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{ color: "#adb5bd", mb: 3, lineHeight: 1.7 }}
                  >
                    {plan.description}
                  </Typography>

                  <List sx={{ padding: 0, flex: 1 }}>
                    {plan.features.map((feature, fi) => (
                      <ListItem
                        key={fi}
                        sx={{
                          p: "3px 0",
                          alignItems: "flex-start",
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: "auto", mr: 1, mt: "2px" }}>
                          <CheckIcon
                            sx={{
                              fontSize: "15px",
                              color: plan.highlighted ? "#c77dff" : "#adb5bd",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              component="span"
                              sx={{ color: textColor, fontSize: "0.875rem", lineHeight: 1.5 }}
                            >
                              {feature}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    component="a"
                    href={plan.ctaHref}
                    variant={plan.highlighted ? "contained" : "outlined"}
                    startIcon={<EmailIcon />}
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
                            "&:hover": { borderColor: "#c77dff", color: "#c77dff" },
                          }),
                    }}
                  >
                    {plan.ctaText}
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {note && (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", mt: 4, color: "#6c757d", maxWidth: "700px", mx: "auto" }}
          >
            {note}
          </Typography>
        )}
      </Container>
    </Box>
  )
}
