import express from "express";
import cors from "cors";
import priorityRouter from "./routes/priority.route";
import notificationsRouter from "./routes/notifications.route";
import { errorMiddleware } from "./middleware/error.middleware";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
    });
  });

  app.use(notificationsRouter);
  app.use(priorityRouter);
  app.use(errorMiddleware);

  return app;
}