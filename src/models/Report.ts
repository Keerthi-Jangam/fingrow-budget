import { User } from "./user";

export class ReportGenerator {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  generateReport(): string {
    const totalIncome = this.user.totalIncome;
    const totalExpenses = this.user.categories.reduce(
      (total, category) => total + category.spentTillNow,
      0
    );
    const savingsProgress = this.user.savings
      .map((s) => `${s.title}: ${s.current}/${s.target}`)
      .join(", ");

    return `
      Total Income: ${totalIncome}
      Total Expenses: ${totalExpenses}
      Savings Goals: ${savingsProgress}
    `;
  }
}
