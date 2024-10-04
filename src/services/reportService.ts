import Transaction from "../models/Transaction";
import Budget from "../models/Budget";
import SavingsGoal from "../models/SavingGoal";

export const generateFinancialReport = async (
  userId: string,
  startDate: Date,
  endDate: Date
) => {
  const transactions = await Transaction.find({
    userId,
    date: { $gte: startDate, $lte: endDate },
  });

  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  const budgets = await Budget.find({ userId });
  const budgetSummary = budgets.map((budget) => ({
    category: budget.category,
    limit: budget.limit,
    spent: budget.spent,
  }));

  const savingsGoals = await SavingsGoal.find({ userId });
  const savingsProgress = savingsGoals.map((goal) => ({
    title: goal.title,
    targetAmount: goal.targetAmount,
    currentAmount: goal.currentAmount,
    progress: (goal.currentAmount / goal.targetAmount) * 100,
  }));

  return {
    totalIncome,
    totalExpenses,
    budgetSummary,
    savingsProgress,
  };
};
