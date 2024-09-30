export interface Transaction {
    description: string;
    amount: number;
    date: Date;
    type: 'income' | 'expense';
  }
  
  export class TransactionManager {
    private transactions: Transaction[] = [];
  
    addTransaction(description: string, amount: number, type: 'income' | 'expense'): Transaction {
        const transaction: Transaction = { description, amount, date: new Date(), type };
        this.transactions.push(transaction);
        return transaction;
    }
  
   
  }
  