import { TransactionManager } from "../models/Transaction";

describe('Transaction Management', () => {
  let transactionManager: TransactionManager;

  beforeEach(() => {
    transactionManager = new TransactionManager();
  });

  it('should add a transaction', () => {
    const transaction = transactionManager.addTransaction('Salary', 5000, 'income');
    expect(transaction.description).toBe('Salary');
    expect(transaction.amount).toBe(5000);
    expect(transaction.type).toBe('income');
    expect(transaction.date).toBeInstanceOf(Date);
  });

  it('should return all transactions', () => {
    transactionManager.addTransaction('Salary', 5000, 'income');
    transactionManager.addTransaction('Rent', 1200, 'expense');
    
    const transactions = transactionManager.getAllTransactions();
    expect(transactions.length).toBe(2);
    expect(transactions[0].description).toBe('Salary');
    expect(transactions[1].description).toBe('Rent');
  });
  
});
