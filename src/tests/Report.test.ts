import { UserManager } from "../models/user";
import { ReportGenerator } from "../models/Report";

describe("Report Generation", () => {
  let userManager: UserManager;
  let reportGenerator: ReportGenerator;

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
    reportGenerator = new ReportGenerator(user);
  });

  it("should generate a report with income and expenses", () => {
    const report = reportGenerator.generateReport();
    expect(report).toContain("Total Income: 30000");
    expect(report).toContain(
      "Savings Goals: Emergency: 8000/10000, Vacation: 0/15000"
    );
  });
});
