import { Router } from "express";
import { notificationsController } from "../controllers/notifications.controller";

const router = Router();

router.get("/notifications", notificationsController);

export default router;