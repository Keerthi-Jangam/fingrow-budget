import express from "express";
import { Budget } from "../Classes/Budget";

export const budgetRouter = express.Router();

budgetRouter.post("/budget/:username", async (req, res) => {
    try {
        const budget = new Budget(req.params.username);
        const {title, target } = req.body;
        const result = await budget.createBudget(title, target);
        res.send(result)
    } catch (error:any) {
        res.status(500).send('Error creating budget: ' + error.message);
    }
});
