import { UserManager } from "../models/UserManager";
import { AlertSystem } from "../models/Alerts";

describe('Alerts System', () => {
  let userManager: UserManager;
  let alertSystem: AlertSystem;

  beforeEach(() => {
    userManager = new UserManager();
    const user = {
      name: "keerthi",
      income: 20000,
      categories: [
        { title: "Food", budgetAmount: 8000, spentTillNow: 9000 },
      ],
      savings: [
        { title: "Emergency", target: 10000, current: 8000 },
      ],
      otherIncome: 5000,
      totalIncome: 30000,
      otherSavings: 5000,
    };
    userManager.addUser(user);
    alertSystem = new AlertSystem(user);
  });

  it('should alert when budget is exceeded', () => {
    const alerts = alertSystem.checkForAlerts();
    expect(alerts).toContain('Budget for Food exceeded!');
  });

 
});
