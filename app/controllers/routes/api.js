import express from "express";
import { getTask, getType } from "../task.js";

const router = express.Router();
router.get("/tasks", getTask);
router.get("/task-types", getType);
export default router;
