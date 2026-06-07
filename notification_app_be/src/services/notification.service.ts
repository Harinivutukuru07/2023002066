import axios from "axios";
import { Log } from "logging_middleware";
import { NOTIFICATIONS_API } from "../config/env";
import { Notification } from "../types/notification";

function toNotificationArray(payload: unknown): Notification[] {
  if (Array.isArray(payload)) {
    return payload as Notification[];
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    if (Array.isArray(record.notifications)) {
      return record.notifications as Notification[];
    }

    if (Array.isArray(record.data)) {
      return record.data as Notification[];
    }
  }

  return [];
}

export async function fetchNotifications(token: string): Promise<Notification[]> {
  await Log("backend", "info", "service", "Fetching notifications from evaluation API", token);

  const response = await axios.get<unknown>(NOTIFICATIONS_API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const notifications = toNotificationArray(response.data);

  await Log(
    "backend",
    "info",
    "service",
    `Fetched ${notifications.length} notifications from evaluation API`,
    token
  );

  return notifications;
}