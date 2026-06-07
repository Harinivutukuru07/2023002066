import { Request, Response, NextFunction } from "express";
import { Log } from "logging_middleware";
import { getTopPriorityNotifications } from "../services/priority.service";
import { getBearerToken } from "../config/env";

export async function priorityController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = getBearerToken(req.header("authorization") ?? undefined);

    await Log("backend", "info", "controller", "GET /priority called", token);

    const notifications = await getTopPriorityNotifications(token);

    res.status(200).json({
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    next(error);
  }
}