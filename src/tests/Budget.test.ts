import { Budget, budgets } from '../models/budget';
import { Transaction } from '../models/transaction';
import { User, users } from '../models/user';

describe('Budget Class', () => {
    const dummyBudget = new Budget('Keerthi');
    beforeAll(async() => {
        const dummyUser = new User('Keerthi','1234',1000,1000);
        await dummyUser.create();
    });

    it('should create a new budget for the user', () => {
        const budget = new Budget('Keer');
        expect(budget.username).toBe('Keer');
        expect(budgets).toContain(budget);
    });

    it('should create a new category in the budget', () => {
        const budget = new Budget('mammu');
        const result = budget.createCategory('Groceries', 500);
        
        expect(result).toBe("Category 'Groceries' created successfully in the budget for user mammu.");
        expect(budget.categories).toHaveLength(1);
        expect(budget.categories[0].title).toBe('Groceries');
        expect(budget.categories[0].target).toBe(500);
        expect(budget.categories[0].spent).toBe(0);
    });

    it('should not allow duplicate categories', () => {
        dummyBudget.createCategory('Groceries', 500);
        const result = dummyBudget.createCategory('Groceries', 500);
        expect(result).toBe("Category 'Groceries' already exists for user Keerthi.");
    });

     it('should return an error when user is not found', () => {
        const transaction = new Transaction('veggies', 'Groceries', 100,'budget','mammu',new Date("2024-10-2"));
        const result = dummyBudget.makeTransaction(transaction);
        expect(result).toBe("No user present");
    });


    it('should return an error when making a transaction without a category', () => {
        const transaction = new Transaction('veggies', 'Dairy', 100,'budget','Keerthi',new Date("2024-10-2"));
        const result = transaction.doTransaction();
        expect(result).toBe("Category not found. Can't make transaction");
    });

    it('should return an error if transaction exceeds category target', () => {
        const transaction = new Transaction('veggies', 'Groceries', 700,'budget','Keerthi',new Date("2024-10-2"));
        const result = dummyBudget.makeTransaction(transaction);
        expect(result).toBe("Transaction exceeds category target.");
    });

    it('should not allow a transaction if the user has insufficient balance', () => {
        const transaction = new Transaction('veggies', 'Groceries', 1200,'budget','Keerthi',new Date("2024-10-2"));
        const result = dummyBudget.makeTransaction(transaction);
        expect(result).toBe("Amount insufficient");
        expect(dummyBudget.categories[0].spent).toBe(0);
    });

    it('should update spent amount and user balance after a valid transaction', () => {
        dummyBudget.createCategory("Dairy",600)
        const transaction = new Transaction('veggies', 'Groceries', 300,'budget','Keerthi',new Date("2024-10-2"));
        const result = dummyBudget.makeTransaction(transaction);
        expect(result).toBe("Transaction recorded in budget.");
        expect(dummyBudget.categories[0].spent).toBe(300);
        expect(dummyBudget.categories[0].transactions).toContain(transaction);
    });
});
