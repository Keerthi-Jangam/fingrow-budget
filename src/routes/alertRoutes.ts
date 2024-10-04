import express from "express";
import { getAlerts } from "../controllers/alertController";

const router = express.Router();

router.get("/:userId", getAlerts);

export default router;
