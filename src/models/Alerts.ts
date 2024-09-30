import { User } from "./UserManager";

export class AlertSystem {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  checkForAlerts(): string[] {
    const alerts: string[] = [];
    
    this.user.categories.forEach(category => {
      if (category.spentTillNow > category.budgetAmount) {
        alerts.push(`Budget for ${category.title} exceeded!`);
      }
    });

    this.user.savings.forEach(goal => {
      if (goal.current >= goal.target * 0.9) {
        alerts.push(`You are close to reaching your savings goal for ${goal.title}!`);
      }
    });
    
    return alerts;
  }
}
