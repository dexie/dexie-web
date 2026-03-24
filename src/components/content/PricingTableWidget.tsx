import {
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  SxProps,
  Theme,
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"

interface TableColumn {
  key: string
  label: string
  align?: "left" | "center" | "right"
}

interface TableRow {
  [key: string]: boolean | string | number
}

interface PricingTableWidgetProps {
  title: string
  subtitle?: string
  description?: string
  columns: TableColumn[]
  rows: TableRow[]
  highlightColumn?: string
  settings?: {
    textColor?: string
    backgroundColor?: string
    containerWidth?: "small" | "medium" | "big"
    maxWidth?: string
  }
  sx?: SxProps<Theme>
}

const renderTableValue = (
  value: boolean | string | number,
  isHighlighted: boolean
) => {
  if (typeof value === "boolean") {
    return value ? (
      <CheckIcon sx={{ color: isHighlighted ? "#c77dff" : undefined }} />
    ) : (
      <Typography component="span" sx={{ opacity: 0.15 }}>—</Typography>
    )
  }
  return value?.toString() || "-"
}

export default function PricingTableWidget({
  title,
  subtitle,
  description,
  columns,
  rows,
  highlightColumn,
  settings = {},
  sx = {},
}: PricingTableWidgetProps) {
  const {
    textColor = "#dee2e6",
    backgroundColor = "#000000",
    containerWidth = "big",
    maxWidth,
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
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              mb: 4,
              color: "#adb5bd",
            }}
          >
            {subtitle}
          </Typography>
        )}

        {description && (
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              mb: 4,
              color: "#adb5bd",
              maxWidth: "900px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        )}

        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #333",
            overflowX: "auto",
            ...(maxWidth && { maxWidth, mx: "auto" }),
          }}
        >
          <Table sx={{ tableLayout: "fixed" }}>
            <colgroup>
              {columns.map((column, i) => (
                <col
                  key={column.key}
                  style={i === 0 ? undefined : { width: `${100 / (columns.length + 1)}%` }}
                />
              ))}
            </colgroup>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2a2a2a" }}>
                {columns.map((column) => {
                  const isHL = highlightColumn === column.key
                  return (
                    <TableCell
                      key={column.key}
                      sx={{
                        color: isHL ? "#ffffff" : textColor,
                        fontWeight: isHL ? 700 : 600,
                        textAlign: column.align || "left",
                        ...(isHL && {
                          backgroundColor: "rgba(199,125,255,0.08)",
                        }),
                      }}
                    >
                      {column.label}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#1f1f1f" },
                    "&:hover": { backgroundColor: "#2a2a2a" },
                  }}
                >
                  {columns.map((column, colIndex) => {
                    const isHL = highlightColumn === column.key
                    return (
                      <TableCell
                        key={column.key}
                        sx={{
                          color: colIndex === 0 ? textColor : "#adb5bd",
                          fontWeight: colIndex === 0 ? 500 : "normal",
                          textAlign: column.align || "left",
                          ...(isHL && {
                            backgroundColor: "rgba(199,125,255,0.05)",
                          }),
                        }}
                      >
                        {renderTableValue(row[column.key], isHL)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}

export type { TableColumn, TableRow }
