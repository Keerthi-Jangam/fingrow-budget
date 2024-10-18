import { User } from "./user";

export class BudgetManager {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  setBudget(categoryTitle: string, amount: number): void {
    const category = this.user.categories.find(
      (c) => c.title === categoryTitle
    );
    if (category) {
      category.budgetAmount = amount;
    }
  }
  updateSpent(categoryTitle: string, amount: number): void {
    const category = this.user.categories.find(
      (c) => c.title === categoryTitle
    );
    if (category) {
      category.spentTillNow += amount;
    }
  }
  checkIfExceeded(categoryTitle: string): boolean {
    const category = this.user.categories.find(
      (c) => c.title === categoryTitle
    );
    return category ? category.spentTillNow > category.budgetAmount : false;
  }
}
