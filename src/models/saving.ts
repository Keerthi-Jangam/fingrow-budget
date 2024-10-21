import { Transaction } from "./transaction"; 
import { users } from "./user";

export const  savings: Savings[]=[]
export class Savings {
    username: string;
    goals: { title: string; target: number; current: number; transactions: Transaction[] }[] = [];

    constructor(username: string) {
        this.username = username;
        savings.push(this)
    }

    createGoal(title: string, target: number) {
        let usersaving = savings.find(
            (saving) => saving.username === this.username
        );
        if (!usersaving) {
            usersaving = new Savings(this.username);
        }
        const esaving = usersaving.goals.find(
            (goal) => goal.title === title
        );

        if (esaving) {
            return `saving '${title}' already exists for user ${this.username}.`;
        }
        usersaving.goals.push({ title, target, current: 0, transactions: [] });
        return `Savings Goal '${title}' created successfully in the savings for user ${this.username}.`;
    }

    makeTransaction(transaction: Transaction) {
        const user = users.find(user=>user.name===transaction.username)
        if(!user){
            return "No user present"
        }
        const saving = savings.find(saving=>saving.username===transaction.username);
        if(!saving){
            return "can't make transaction as no saving"
        }
        const goal = saving.goals.find(goal=>goal.title===transaction.title)
        if (!goal) {
            return "Goal not found. Can't make transaction";
        }

        if(transaction.amount>user.balance){
            return 'Amount insufficient'
        }

        if (transaction.amount > goal.target - goal.current) {
            return "Transaction exceeds savings target.";
        }
        goal.current += transaction.amount;
        user.balance-=transaction.amount;
        goal.transactions.push(transaction);
        return "Transaction recorded in savings.";
    }
}
