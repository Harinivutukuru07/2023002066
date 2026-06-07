import { Notification, NotificationType, PriorityNotification } from "../types/notification";

const TYPE_WEIGHT: Record<NotificationType, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function calculatePriorityScore(notification: Notification): number {
  const createdAt = new Date(notification.createdAt).getTime();
  const ageMinutes = Number.isNaN(createdAt)
    ? Number.MAX_SAFE_INTEGER
    : Math.max(0, Math.floor((Date.now() - createdAt) / 60000));

  const typeWeight = TYPE_WEIGHT[notification.type];

  return typeWeight * 100000 - ageMinutes;
}

export function sortByPriority(
  notifications: Notification[]
): PriorityNotification[] {
  return notifications
    .map((notification) => ({
      ...notification,
      priorityScore: calculatePriorityScore(notification),
    }))
    .sort((left, right) => {
      if (right.priorityScore !== left.priorityScore) {
        return right.priorityScore - left.priorityScore;
      }

      return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    });
}

export function selectTopNotifications(
  notifications: Notification[],
  limit = 10
): PriorityNotification[] {
  return sortByPriority(notifications).slice(0, limit);
}