import SavingsGoal from "../models/SavingGoal";

export const createSavingsGoal = async (
  userId: string,
  title: string,
  targetAmount: number
) => {
  const savingsGoal = new SavingsGoal({ userId, title, targetAmount });
  await savingsGoal.save();
  return savingsGoal;
};

export const getSavingsGoalsByUser = async (userId: string) => {
  return await SavingsGoal.find({ userId });
};

export const updateSavingsGoal = async (
  goalId: string,
  updates: Partial<{
    title: string;
    targetAmount: number;
    currentAmount: number;
  }>
) => {
  return await SavingsGoal.findByIdAndUpdate(goalId, updates, { new: true });
};

export const deleteSavingsGoal = async (goalId: string) => {
  return await SavingsGoal.findByIdAndDelete(goalId);
};

export const checkSavingsGoalProgress = async (goalId: string) => {
  const goal = await SavingsGoal.findById(goalId);
  return goal ? goal.currentAmount / goal.targetAmount : null;
};
