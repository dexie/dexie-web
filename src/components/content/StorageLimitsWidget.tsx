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

interface StorageLimit {
  plan: string
  objectStorage: string
  blobStorage: string
  blobWrites: string
}

interface AdditionalStorage {
  storageType: string
  storageCost: string
  syncCosts: string
}

interface StorageLimitsWidgetProps {
  storageLimits: StorageLimit[]
  additionalStorage: AdditionalStorage[]
  settings?: {
    textColor?: string
    backgroundColor?: string
    containerWidth?: "small" | "medium" | "big"
    sectionTitle?: string
    sectionSubtitle?: string
    additionalStorageTitle?: string
    additionalStorageDescription?: string
  }
  sx?: SxProps<Theme>
}

export default function StorageLimitsWidget({
  storageLimits,
  additionalStorage,
  settings = {},
  sx = {},
}: StorageLimitsWidgetProps) {
  const {
    textColor = "#dee2e6",
    backgroundColor = "#000000",
    containerWidth = "big",
    sectionTitle = "Storage Limits",
    sectionSubtitle = "Every Dexie Cloud plan includes a fixed storage and sync-operations quota — independent of how many production users you have. Usage beyond the included quota is billed automatically as pay-as-you-grow overage, never a hard stop.",
    additionalStorageTitle = "Additional Storage",
    additionalStorageDescription = "If more storage or sync throughput than what's already included in the price is required, a subscription can be extended with additional storage and sync operations:",
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
          {sectionSubtitle}
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #333",
            mb: 6,
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2a2a2a" }}>
                <TableCell sx={{ color: textColor, fontWeight: 600 }}>
                  Plan
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 600 }}>
                  Included Postgres Storage
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 600 }}>
                  Included Blob Storage
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 600 }}>
                  Included Sync Units (SU) / mo
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {storageLimits.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#1f1f1f" },
                    "&:hover": { backgroundColor: "#2a2a2a" },
                  }}
                >
                  <TableCell sx={{ color: textColor, fontWeight: 500 }}>
                    {row.plan}
                  </TableCell>
                  <TableCell sx={{ color: "#adb5bd" }}>
                    {row.objectStorage}
                  </TableCell>
                  <TableCell sx={{ color: "#adb5bd" }}>
                    {row.blobStorage}
                  </TableCell>
                  <TableCell sx={{ color: "#adb5bd" }}>
                    {row.blobWrites}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography
          variant="body2"
          sx={{
            color: "#adb5bd",
            mb: 4,
            maxWidth: "800px",
            mx: "auto",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          The storage limit is specified on the total subscription and does not
          have to be distributed equally between the users. A sync operation is
          counted each time a record is created, updated, or deleted.
        </Typography>

        {/* Additional Storage Section */}
        <Typography
          variant="h4"
          component="h3"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 3,
            color: textColor,
            fontWeight: 600,
          }}
        >
          {additionalStorageTitle}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 4,
            color: "#adb5bd",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          {additionalStorageDescription}
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #333",
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2a2a2a" }}>
                <TableCell sx={{ color: textColor, fontWeight: 600 }}>
                  Resource
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 600 }}>
                  Indie / Pro Rate
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 600 }}>
                  Scale Rate
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {additionalStorage.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#1f1f1f" },
                    "&:hover": { backgroundColor: "#2a2a2a" },
                  }}
                >
                  <TableCell sx={{ color: textColor, fontWeight: 500 }}>
                    {row.storageType}
                  </TableCell>
                  <TableCell sx={{ color: "#adb5bd" }}>
                    {row.storageCost}
                  </TableCell>
                  <TableCell sx={{ color: "#adb5bd" }}>
                    {row.syncCosts}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}

export type { StorageLimit, AdditionalStorage }
