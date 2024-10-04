import { Request, Response } from "express";
import SavingsGoal from "../models/SavingGoal";

export const createSavingsGoal = async (req: Request, res: Response) => {
  try {
    const savingsGoal = new SavingsGoal(req.body);
    await savingsGoal.save();
    res.status(201).json(savingsGoal);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const getSavingsGoalsByUser = async (req: Request, res: Response) => {
  try {
    const savingsGoals = await SavingsGoal.find({ userId: req.params.userId });
    res.status(200).json(savingsGoals);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
