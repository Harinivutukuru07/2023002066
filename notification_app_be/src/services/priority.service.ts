import { Log } from "logging_middleware";
import { fetchNotifications } from "./notification.service";
import { PriorityNotification, Notification } from "../types/notification";
import { selectTopNotifications } from "../utils/priority";

function normalizeNotifications(notifications: Notification[]): Notification[] {
  return notifications.map((notification) => ({
    ...notification,
    createdAt: notification.createdAt,
    type: notification.type,
    message: notification.message,
  }));
}

export async function getTopPriorityNotifications(
  token: string
): Promise<PriorityNotification[]> {
  await Log("backend", "debug", "service", "Calculating top priority notifications", token);

  const notifications = await fetchNotifications(token);
  const normalized = normalizeNotifications(notifications);
  const topNotifications = selectTopNotifications(normalized, 10);

  await Log(
    "backend",
    "info",
    "service",
    `Selected top ${topNotifications.length} priority notifications`,
    token
  );

  return topNotifications;
}