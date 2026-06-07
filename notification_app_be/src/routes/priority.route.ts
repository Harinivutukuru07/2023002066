import { Router } from "express";
import { priorityController } from "../controllers/priority.controller";

const router = Router();

router.get("/priority", priorityController);

export default router;