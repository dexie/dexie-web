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
  seats: string
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
    textColor = "var(--dexie-text)",
    backgroundColor = "var(--dexie-bg)",
    containerWidth = "big",
    sectionTitle = "Storage Limits",
    sectionSubtitle = "Dexie Cloud Production includes storage in relation to the number of seats purchased. The storage limit is computed on the sum of storage and not per individual user. Storage limits are differentiated between blob- and object data.",
    additionalStorageTitle = "Additional Storage",
    additionalStorageDescription = "If more storage or write frequency than what's already included in the price would be requested, a subscription can be extended with additional storage and write operations:",
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
            color: "var(--dexie-text-muted)",
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
            backgroundColor: "var(--dexie-surface-deep)",
            border: "1px solid #333",
            mb: 6,
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2a2a2a" }}>
                <TableCell sx={{ color: textColor, fontWeight: 600 }}>
                  Seats
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 600 }}>
                  Included Object storage
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 600 }}>
                  Included Blob storage
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 600 }}>
                  Included Blob write operations
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
                    {row.seats}
                  </TableCell>
                  <TableCell sx={{ color: "var(--dexie-text-muted)" }}>
                    {row.objectStorage}
                  </TableCell>
                  <TableCell sx={{ color: "var(--dexie-text-muted)" }}>
                    {row.blobStorage}
                  </TableCell>
                  <TableCell sx={{ color: "var(--dexie-text-muted)" }}>
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
            color: "var(--dexie-text-muted)",
            mb: 4,
            maxWidth: "800px",
            mx: "auto",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          The storage limit is specified on the total subscription and does not
          have to be distributed equally between the users. A Blob write
          operation is counted when a blob is created or updated (replaced).
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
            color: "var(--dexie-text-muted)",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          {additionalStorageDescription}
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "var(--dexie-surface-deep)",
            border: "1px solid #333",
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2a2a2a" }}>
                <TableCell sx={{ color: textColor, fontWeight: 600 }}>
                  Storage Type
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 600 }}>
                  Storage Cost
                </TableCell>
                <TableCell sx={{ color: textColor, fontWeight: 600 }}>
                  Sync costs
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
                  <TableCell sx={{ color: "var(--dexie-text-muted)" }}>
                    {row.storageCost}
                  </TableCell>
                  <TableCell sx={{ color: "var(--dexie-text-muted)" }}>
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
