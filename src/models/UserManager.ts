export interface User {
    name: string;
    income: number;
    categories: Array<Category>;
    savings: Array<Savings>;
    otherIncome: number;
    totalIncome: number;
    otherSavings: number;
  }
  
  export interface Category {
    title: string;
    budgetAmount: number;
    spentTillNow: number;
  }
  
  export interface Savings {
    title: string;
    target: number;
    current: number;
  }
  
  export class UserManager {
    private users: User[] = [];
  
  
  }
  