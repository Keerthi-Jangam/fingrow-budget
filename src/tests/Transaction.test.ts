import { Transaction, transactions } from '../models/transaction';
import { User, users } from '../models/user';
import { budgets } from '../models/budget';
import { Savings, savings } from '../models/saving';

describe('Transaction Class', () => {
    beforeEach(() => {
        transactions.length = 0;
        users.length = 0;
        budgets.length = 0;
        savings.length = 0;
    });

    console.log(users);
    it('should not perform transaction if the user is not found', () => {
        const transaction = new Transaction('debit', 'Test Transaction', 100, 'others', 'mammu');
        const result = transaction.doTransaction();
        expect(result).toBe('User not found.');
    });

    it('should successfully add income in a transaction', async() => {
        const user = new User('Mammu', '1234', 500, 500);
        await user.create();
        const transaction = new Transaction('credit', 'Salary', 200, 'others', 'Mammu');
        const result = transaction.doTransaction();
        expect(result).toBe('Transaction made successfully.');
        expect(user.totalIncome).toBe(700);
        expect(user.balance).toBe(700);
        expect(transactions).toHaveLength(1);
    });


    it('should record transaction in savings if found', () => {
        const user = new User('Nikitha', '1234', 500, 500);
        users.push(user);
        const saving = new Savings('Nikitha');
        savings.push(saving);
        saving.createGoal('Vacation', 1000);
        const transaction = new Transaction('credit', 'Vacation', 200, 'saving', 'Nikitha');
        const result = transaction.doTransaction();
        expect(result).toBe('Transaction recorded in savings.');
        expect(saving.goals[0].current).toBe(200);
    });
});
