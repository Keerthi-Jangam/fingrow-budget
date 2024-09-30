import { User } from "./UserManager";

export class SavingsManager {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  addSavings(title: string, target: number): void {
    this.user.savings.push({ title, target, current: 0 });
  }
}