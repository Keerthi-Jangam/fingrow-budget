import { budgets } from "./budget"; 
import { savings } from "./saving"; 
import { transactions } from "./transaction"; 
import { users } from "./user";

export class Report {
  username: string;

  constructor(username: string) {
    this.username = username;
  }

  totalIncomeAndExpenses() {
    const user = users.find((u) => u.name === this.username);
    if (!user) {
      return "User not found.";
    }
    let totalIncome = 0;
    let totalExpenses = 0;
    transactions.map((transaction) => {
      if (transaction.title === "budget") {
        totalIncome += transaction.amount;
      } else if (transaction.title === "saving") {
        totalExpenses += transaction.amount;
      }
    });
    return { totalIncome, totalExpenses };
  }

  budgetUsageSummary() {
    const budget = budgets.find((b) => b.username === this.username);
    if (!budget) {
      return "Budget not found.";
    }
    return budget.categories.map((cat) => ({
      title: cat.title,
      target: cat.target,
      spent: cat.spent,
      usagePercentage: ((cat.spent / cat.target) * 100).toFixed(2) + "%",
    }));
  }

  savingsProgress() {
    const saving = savings.find((s) => s.username === this.username);
    if (!saving) {
      return "Savings not found.";
    }
    return saving.goals.map((goal) => ({
      title: goal.title,
      target: goal.target,
      current: goal.current,
      progressPercentage: ((goal.current / goal.target) * 100).toFixed(2) + "%",
    }));
  }
}
