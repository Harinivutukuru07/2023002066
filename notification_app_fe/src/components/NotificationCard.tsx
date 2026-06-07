import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { Notification } from "../types/notification";

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

export function NotificationCard({ notification }: { notification: Notification }) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        height: "100%",
        boxShadow: "0 10px 24px rgba(18,53,91,0.06)",
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
            <Chip label={notification.type} color={getTypeColor(notification.type)} size="small" />
            <Chip label={notification.isRead || notification.read ? "Viewed" : "Unread"} size="small" variant="outlined" />
          </Stack>

          <Typography variant="h6">{notification.title ?? notification.type}</Typography>
          <Typography variant="body2" color="text.secondary">
            {notification.message}
          </Typography>

          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="caption" color="text.secondary">
              {formatDate(notification.createdAt)}
            </Typography>
            {typeof notification.priorityScore === "number" ? (
              <Chip label={`Score ${notification.priorityScore}`} size="small" />
            ) : null}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}