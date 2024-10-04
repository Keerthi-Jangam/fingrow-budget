
import { createSavingsGoal,getSavingsGoalsByUser } from '../controllers/savingGoalController';
import SavingsGoal from '../models/SavingGoal';
import { Request, Response } from 'express';

jest.mock('../src/models/SavingGoal');

describe('Saving Goal Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        userId: 'testUserId',
        goalName: 'New Car',
        targetAmount: 20000,
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

  describe('createSavingGoal', () => {
    it('should create a new saving goal and return it', async () => {
      const mockSavingGoal = { userId: 'testUserId', goalName: 'New Car', targetAmount: 20000 };
      (SavingsGoal.prototype.save as jest.Mock).mockResolvedValue(mockSavingGoal);

      await createSavingsGoal(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockSavingGoal);
    });

    it('should handle errors when creating a saving goal', async () => {
      (SavingsGoal.prototype.save as jest.Mock).mockRejectedValue(new Error('Failed to save'));

      await createSavingsGoal(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to save' });
    });
  });

  describe('getSavingGoals', () => {
    it('should return saving goals for a user', async () => {
      const mockSavingGoals = [
        { goalName: 'New Car', targetAmount: 20000, savedAmount: 5000 },
        { goalName: 'Vacation', targetAmount: 3000, savedAmount: 1000 },
      ];
      (SavingsGoal.find as jest.Mock).mockResolvedValue(mockSavingGoals);

      await getSavingsGoalsByUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockSavingGoals);
    });

    it('should handle errors when getting saving goals', async () => {
      (SavingsGoal.find as jest.Mock).mockRejectedValue(new Error('Failed to fetch saving goals'));

      await getSavingsGoalsByUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch saving goals' });
    });
  });
});
