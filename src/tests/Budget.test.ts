import { UserManager } from "../models/UserManager";
import { BudgetManager } from "../models/budget";

describe('Budget Management', () => {
  let userManager: UserManager;
  let budgetManager: BudgetManager;

  beforeEach(() => {
    userManager = new UserManager();
    const user = {
      name: "keerthi",
      income: 20000,
      categories: [
        { title: "Food", budgetAmount: 8000, spentTillNow: 5000 },
        { title: "Entertainment", budgetAmount: 2000, spentTillNow: 500 },
        { title: "Insurance", budgetAmount: 1000, spentTillNow: 500 },
        { title: "Daily Expenditure", budgetAmount: 4000, spentTillNow: 2000 },
        { title: "EMI", budgetAmount: 10000, spentTillNow: 2000 },
      ],
      savings: [
        { title: "Emergency", target: 10000, current: 8000 },
        { title: "Vacation", target: 15000, current: 0 },
      ],
      otherIncome: 5000,
      totalIncome: 30000,
      otherSavings: 5000,
    };
    userManager.addUser(user);
    budgetManager = new BudgetManager(user);
  });

  it('should set a budget for a category', () => {
    budgetManager.setBudget('Food', 9000);
    expect(budgetManager['user'].categories[0].budgetAmount).toBe(9000);
  });
  it('should update the spent amount for a category', () => {
    budgetManager.updateSpent('Food', 1000);
    expect(budgetManager['user'].categories[0].spentTillNow).toBe(6000);
  });
  
});
