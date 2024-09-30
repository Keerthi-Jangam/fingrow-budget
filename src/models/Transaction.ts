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
  
    getAllTransactions(): Transaction[] {
        return this.transactions;
      }

      getIncome(): number {
        return this.transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);
      }
   
      getExpenses(): number {
        return this.transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);
      }
      getTransactionSummary(): { totalIncome: number; totalExpenses: number } {
        return {
          totalIncome: this.getIncome(),
          totalExpenses: this.getExpenses(),
        };
      }

  }
  
