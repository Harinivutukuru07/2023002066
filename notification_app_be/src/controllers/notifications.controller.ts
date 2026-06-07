import { Request, Response, NextFunction } from "express";
import { Log } from "logging_middleware";
import { getBearerToken } from "../config/env";
import { fetchNotifications } from "../services/notification.service";

export async function notificationsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = getBearerToken(req.header("authorization") ?? undefined);

    await Log("backend", "info", "controller", "GET /notifications called", token);

    const notifications = await fetchNotifications(token);

    res.status(200).json({
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    next(error);
  }
}