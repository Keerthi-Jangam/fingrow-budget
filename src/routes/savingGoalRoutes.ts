import express from "express";
import {
  createSavingsGoal,
  getSavingsGoalsByUser,
} from "../controllers/savingGoalController";

const router = express.Router();

router.post("/", createSavingsGoal);
router.get("/:userId", getSavingsGoalsByUser);

export default router;
