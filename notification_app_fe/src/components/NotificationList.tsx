import { Box, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Notification } from "../types/notification";
import { NotificationCard } from "./NotificationCard";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getTypeColor(type: Notification["type"]): "primary" | "secondary" | "success" {
  if (type === "Placement") return "primary";
  if (type === "Result") return "secondary";
  return "success";
}

interface NotificationListProps {
  notifications: Notification[];
  emptyLabel: string;
}

export function NotificationList({ notifications, emptyLabel }: NotificationListProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  if (notifications.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Nothing here yet
        </Typography>
        <Typography color="text.secondary">{emptyLabel}</Typography>
      </Paper>
    );
  }

  if (!isDesktop) {
    return (
      <Stack spacing={2}>
        {notifications.map((notification) => (
          <NotificationCard key={notification.id ?? `${notification.type}-${notification.createdAt}-${notification.message}`} notification={notification} />
        ))}
      </Stack>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow key={notification.id ?? `${notification.type}-${notification.createdAt}-${notification.message}`} hover>
              <TableCell>
                <Chip label={notification.type} color={getTypeColor(notification.type)} size="small" />
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">{notification.title ?? notification.type}</Typography>
              </TableCell>
              <TableCell sx={{ maxWidth: 420 }}>
                <Box sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>{notification.message}</Box>
              </TableCell>
              <TableCell>{formatDate(notification.createdAt)}</TableCell>
              <TableCell>
                <Chip label={notification.isRead || notification.read ? "Viewed" : "Unread"} size="small" variant="outlined" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}