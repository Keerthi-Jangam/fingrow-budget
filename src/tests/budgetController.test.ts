// tests/budgetController.test.ts
import { createBudget,getBudgetsByUser } from '../controllers/budgetController'; 
import Budget from '../models/Budget';
import { Request, Response } from 'express';

jest.mock('../src/models/Budget');

describe('Budget Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        userId: 'testUserId',
        category: 'Food',
        limit: 500,
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

  describe('createBudget', () => {
    it('should create a new budget and return it', async () => {
      const mockBudget = { userId: 'testUserId', category: 'Food', limit: 500 };
      (Budget.prototype.save as jest.Mock).mockResolvedValue(mockBudget);

      await createBudget(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockBudget);
    });

    it('should handle errors when creating a budget', async () => {
      (Budget.prototype.save as jest.Mock).mockRejectedValue(new Error('Failed to save'));

      await createBudget(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to save' });
    });
  });

  describe('getBudgetsByUser', () => {
    it('should return budgets for a user', async () => {
      const mockBudgets = [
        { category: 'Food', limit: 500, spent: 200 },
        { category: 'Transport', limit: 300, spent: 150 },
      ];
      (Budget.find as jest.Mock).mockResolvedValue(mockBudgets);

      await getBudgetsByUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBudgets);
    });

    it('should handle errors when getting budgets', async () => {
      (Budget.find as jest.Mock).mockRejectedValue(new Error('Failed to fetch budgets'));

      await getBudgetsByUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch budgets' });
    });
  });
});
