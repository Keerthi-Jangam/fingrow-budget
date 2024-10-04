
import { getUserAlerts, checkBudgetAlerts,checkSavingsGoalAlerts } from '../services/alertService'; 
import Budget from '../models/Budget';
import SavingsGoal from '../models/SavingGoal';

jest.mock('../src/models/Budget');
jest.mock('../src/models/SavingGoal');

describe('Alert Service', () => {
  const userId = 'testUserId';

  describe('checkBudgetAlerts', () => {
    it('should return alerts for budgets that have been exceeded', async () => {
      const mockBudgets = [
        { category: 'Groceries', spent: 150, limit: 100 },
        { category: 'Utilities', spent: 80, limit: 100 },
      ];
      (Budget.find as jest.Mock).mockResolvedValue(mockBudgets);

      const alerts = await checkBudgetAlerts(userId);
      expect(alerts).toEqual(['You have exceeded your budget for Groceries.']);
    });

    it('should handle errors when fetching budget alerts', async () => {
      (Budget.find as jest.Mock).mockRejectedValue(new Error('Failed to fetch budgets'));

      await expect(checkBudgetAlerts(userId)).rejects.toThrow('Failed to fetch budget alerts: Failed to fetch budgets');
    });
  });

  describe('checkSavingsGoalAlerts', () => {
    it('should return alerts for savings goals', async () => {
      const mockGoals = [
        { title: 'Emergency Fund', currentAmount: 900, targetAmount: 1000 },
        { title: 'Vacation', currentAmount: 1200, targetAmount: 1000 },
      ];
      (SavingsGoal.find as jest.Mock).mockResolvedValue(mockGoals);

      const alerts = await checkSavingsGoalAlerts(userId);
      expect(alerts).toEqual([
        'You are close to reaching your savings goal for Emergency Fund (90% or more achieved).',
        'Congratulations! You have reached your savings goal for Vacation.',
      ]);
    });

    it('should handle errors when fetching savings goal alerts', async () => {
      (SavingsGoal.find as jest.Mock).mockRejectedValue(new Error('Failed to fetch savings goals'));

      await expect(checkSavingsGoalAlerts(userId)).rejects.toThrow('Failed to fetch savings goal alerts: Failed to fetch savings goals');
    });
  });

  describe('getUserAlerts', () => {
    it('should combine alerts from both budget and savings goal checks', async () => {
      (Budget.find as jest.Mock).mockResolvedValue([{ category: 'Groceries', spent: 150, limit: 100 }]);
      (SavingsGoal.find as jest.Mock).mockResolvedValue([{ title: 'Emergency Fund', currentAmount: 900, targetAmount: 1000 }]);

      const alerts = await getUserAlerts(userId);
      expect(alerts).toEqual([
        'You have exceeded your budget for Groceries.',
        'You are close to reaching your savings goal for Emergency Fund (90% or more achieved).',
      ]);
    });

    it('should handle errors when fetching user alerts', async () => {
      (Budget.find as jest.Mock).mockRejectedValue(new Error('Failed to fetch budgets'));

      await expect(getUserAlerts(userId)).rejects.toThrow('Failed to fetch user alerts: Failed to fetch budgets');
    });
  });
});
