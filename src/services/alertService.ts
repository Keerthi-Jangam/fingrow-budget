import Budget from "../models/Budget";
import SavingsGoal from "../models/SavingGoal";

export const checkBudgetAlerts = async (userId: string): Promise<string[]> => {
  try {
    const budgets = await Budget.find({ userId });
    const alerts: string[] = [];

    budgets.forEach((budget) => {
      if (budget.spent > budget.limit) {
        alerts.push(`You have exceeded your budget for ${budget.category}.`);
      }
    });

    return alerts;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to fetch budget alerts: ${err.message}`);
  }
};

export const checkSavingsGoalAlerts = async (
  userId: string
): Promise<string[]> => {
  try {
    const savingsGoals = await SavingsGoal.find({ userId });
    const alerts: string[] = [];

    savingsGoals.forEach((goal) => {
      const progress = (goal.currentAmount / goal.targetAmount) * 100;
      if (progress >= 90 && progress < 100) {
        alerts.push(
          `You are close to reaching your savings goal for ${goal.title} (90% or more achieved).`
        );
      } else if (progress >= 100) {
        alerts.push(
          `Congratulations! You have reached your savings goal for ${goal.title}.`
        );
      }
    });

    return alerts;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to fetch savings goal alerts: ${err.message}`);
  }
};

export const getUserAlerts = async (userId: string): Promise<string[]> => {
  try {
    const budgetAlerts = await checkBudgetAlerts(userId);
    const savingsAlerts = await checkSavingsGoalAlerts(userId);

    return [...budgetAlerts, ...savingsAlerts];
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to fetch user alerts: ${err.message}`);
  }
};
