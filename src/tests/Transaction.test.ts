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

  
});
