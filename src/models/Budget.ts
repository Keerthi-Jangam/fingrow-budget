import { User } from "./UserManager";

export class BudgetManager {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  setBudget(categoryTitle: string, amount: number): void {
    const category = this.user.categories.find(c => c.title === categoryTitle);
    if (category) {
      category.budgetAmount = amount;
    }
  }
}