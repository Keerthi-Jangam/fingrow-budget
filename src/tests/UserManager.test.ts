import { UserManager,User } from "../models/UserManager";

describe('User Management', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  it('should add a new user', () => {
    const user: User = {
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
    expect(userManager.getUser("keerthi")).toEqual(user);
  });

 
});
