import express from "express";
import { getFinancialReport } from "../controllers/reportController";

const router = express.Router();

router.get("/:userId", getFinancialReport);

export default router;
