import Budget from "../models/Budget";

export const createBudget = async (
  userId: string,
  category: string,
  limit: number
) => {
  const budget = new Budget({ userId, category, limit });
  await budget.save();
  return budget;
};

export const getBudgetsByUser = async (userId: string) => {
  return await Budget.find({ userId });
};

export const updateBudget = async (
  budgetId: string,
  updates: Partial<{ category: string; limit: number; spent: number }>
) => {
  return await Budget.findByIdAndUpdate(budgetId, updates, { new: true });
};

export const deleteBudget = async (budgetId: string) => {
  return await Budget.findByIdAndDelete(budgetId);
};

export const checkBudgetUsage = async (budgetId: string) => {
  const budget = await Budget.findById(budgetId);
  return budget ? budget.spent / budget.limit : null;
};
