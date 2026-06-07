export type NotificationType = "Event" | "Result" | "Placement";

export interface Notification {
  id?: string;
  _id?: string;
  userId?: string;
  title?: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  read?: boolean;
  isRead?: boolean;
  priorityScore?: number;
}

export interface PriorityNotification extends Notification {
  priorityScore: number;
}