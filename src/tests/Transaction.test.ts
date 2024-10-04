
import { createTransaction, getTransactionsByUser } from '../controllers/transactionController';
import Transaction from '../models/Transaction';
import { Request, Response } from 'express';

jest.mock('../src/models/Transaction');

describe('Transaction Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        userId: 'testUserId',
        amount: 100,
        category: 'Groceries',
        date: new Date(),
      },
      params: {
        userId: 'testUserId',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTransaction', () => {
    it('should create a new transaction and return it', async () => {
      const mockTransaction = { userId: 'testUserId', amount: 100, category: 'Groceries' };
      (Transaction.prototype.save as jest.Mock).mockResolvedValue(mockTransaction);

      await createTransaction(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockTransaction);
    });

    it('should handle errors when creating a transaction', async () => {
      (Transaction.prototype.save as jest.Mock).mockRejectedValue(new Error('Failed to save'));

      await createTransaction(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to save' });
    });
  });

  describe('getTransactionsByUser', () => {
    it('should return transactions for a user', async () => {
      const mockTransactions = [
        { amount: 100, category: 'Groceries', date: new Date() },
        { amount: 50, category: 'Transport', date: new Date() },
      ];
      (Transaction.find as jest.Mock).mockResolvedValue(mockTransactions);

      await getTransactionsByUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTransactions);
    });

    it('should handle errors when getting transactions', async () => {
      (Transaction.find as jest.Mock).mockRejectedValue(new Error('Failed to fetch transactions'));

      await getTransactionsByUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch transactions' });
    });
  });
});
