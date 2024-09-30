import { UserManager } from "../models/UserManager";
import { SavingsManager } from "../models/SavingGoals";


describe('Savings Goals Management', () => {
  let userManager: UserManager;
  let savingsManager: SavingsManager;

  beforeEach(() => {
    userManager = new UserManager();
    const user = {
      name: "keerthi",
      income: 20000,
      categories: [],
      savings: [
        { title: "Emergency", target: 10000, current: 8000 },
        { title: "Vacation", target: 15000, current: 0 },
      ],
      otherIncome: 5000,
      totalIncome: 30000,
      otherSavings: 5000,
    };
    userManager.addUser(user);
    savingsManager = new SavingsManager(user);
  });

  it('should add a new savings goal', () => {
    savingsManager.addSavings('New Goal', 20000);
    expect(userManager.getUser('keerthi')?.savings.length).toBe(3);
  });

  it('should update the current savings amount', () => {
    savingsManager.updateCurrent('Emergency', 2000);
    expect(userManager.getUser('keerthi')?.savings.find(s => s.title === 'Emergency')?.current).toBe(10000);
  });


})
