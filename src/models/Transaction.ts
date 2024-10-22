import { users } from "./user";
import { budgets } from "./budget";
import { savings } from "./saving";
export const transactions: Transaction[] = [];

export class Transaction {
    transactionName: string;
    title: string;
    amount: number;
    on: string;
    date: Date;
    username: string;

    constructor(transactionName: string, title: string, amount: number, on: string, username: string, date?: Date) {
        this.transactionName = transactionName;
        this.title = title;
        this.amount = amount;
        this.on = on;
        this.date = date ? new Date(date) : new Date();
        this.username = username;
    }

    doTransaction() {
        const user = users.find(user => user.name === this.username);
        if (!user) {
            return "User not found.";
        }

        if (this.on === "budget") {
            const budget = budgets.find(b => b.username === this.username);
            if (!budget) {
                return "Budget not found.";
            }
            const result = budget.makeTransaction(this);
            if (result === "Transaction recorded in budget.") {
                user.balance -= this.amount; 
            }
            return result;
        } else if (this.on === "saving") {
            const saving = savings.find(s => s.username === this.username);
            if (!saving) {
                return "Savings not found.";
            }
            const result = saving.makeTransaction(this);
            if (result === "Transaction recorded in savings.") {
                user.balance -= this.amount; 
            }
            return result;
        } else if (this.on === "others") {
            transactions.push(this);
            user.totalIncome += this.amount; 
            user.balance += this.amount;
            return "Transaction made successfully.";
        } else {
            return "Invalid asset name.";
        }
    }
}

