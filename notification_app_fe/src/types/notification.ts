export type NotificationType = "Event" | "Result" | "Placement";

export interface Notification {
  id?: string;
  _id?: string;
  title?: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  isRead?: boolean;
  read?: boolean;
  priorityScore?: number;
}

export interface NotificationResponse {
  count?: number;
  notifications?: Notification[];
}

export type NotificationTypeFilter = NotificationType | "all";