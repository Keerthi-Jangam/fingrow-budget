import { users } from "./user";
import { Transaction } from "./transaction"; 
export const budgets: Budget[] = [];

export class Budget {
    username: string;
    categories: {
        title: string;
        target: number;
        spent: number;
        transactions: Transaction[];
    }[] = [];

    constructor(username: string) {
        this.username = username;
        budgets.push(this);
    }

    createCategory(title: string, target: number) {
        let userBudget = budgets.find(
            (budget) => budget.username === this.username
        );
        if (!userBudget) {
            userBudget = new Budget(this.username);
        }
        const existingCategory = userBudget.categories.find(
            (cat) => cat.title === title
        );

        if (existingCategory) {
            return `Category '${title}' already exists for user ${this.username}.`;
        }
        userBudget.categories.push({ title, target, spent: 0, transactions: [] });
        return `Category '${title}' created successfully in the budget for user ${this.username}.`;
    }

    makeTransaction(transaction: Transaction) {
        const user = users.find(user=>user.name===transaction.username)
        if(!user){
            return "No user present"
        }
        
        const budget = budgets.find(budget=>budget.username===transaction.username);
        if(!budget){
            return "can't make transaction as no budget"
        }
        const category = budget.categories.find(
            (cat) => cat.title === transaction.title
        );
        if (!category) {
            return "Category not found. Can't make transaction";
        }

        if(transaction.amount>user.balance){
            return 'Amount insufficient'
        }
        if (transaction.amount > category.target - category.spent) {
            return "Transaction exceeds category target.";
        }

        category.spent += transaction.amount;
        user.balance-=transaction.amount;
        category.transactions.push(transaction);
        return "Transaction recorded in budget.";
    }
}
