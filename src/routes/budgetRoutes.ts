import express from "express";
import {
  createBudget,
  getBudgetsByUser,
} from "../controllers/budgetController";

const router = express.Router();

router.post("/", createBudget);
router.get("/:userId", getBudgetsByUser);

export default router;
