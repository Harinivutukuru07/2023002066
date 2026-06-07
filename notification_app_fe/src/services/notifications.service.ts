import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../config/env";
import { logFrontend } from "./log.service";
import { Notification, NotificationResponse } from "../types/notification";

function normalizeNotifications(payload: NotificationResponse | Notification[] | unknown): Notification[] {
  if (Array.isArray(payload)) {
    return payload as Notification[];
  }

  if (payload && typeof payload === "object") {
    const record = payload as NotificationResponse;
    return record.notifications ?? [];
  }

  return [];
}

function getMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError.response?.data?.message ?? axiosError.message ?? "Request failed";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Request failed";
}

export async function fetchNotifications(token: string | null): Promise<Notification[]> {
  try {
    const response = await axios.get<NotificationResponse>(`${API_BASE_URL}/notifications`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    const notifications = normalizeNotifications(response.data);
    await logFrontend("info", "api", `Loaded ${notifications.length} notifications from backend`, token);
    return notifications;
  } catch (error) {
    await logFrontend("error", "api", `Failed to load notifications: ${getMessage(error)}`, token);
    throw new Error(getMessage(error));
  }
}

export async function fetchPriorityNotifications(token: string | null): Promise<Notification[]> {
  try {
    const response = await axios.get<NotificationResponse>(`${API_BASE_URL}/priority`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    const notifications = normalizeNotifications(response.data);
    await logFrontend("info", "api", `Loaded ${notifications.length} priority notifications`, token);
    return notifications;
  } catch (error) {
    await logFrontend("error", "api", `Failed to load priority notifications: ${getMessage(error)}`, token);
    throw new Error(getMessage(error));
  }
}