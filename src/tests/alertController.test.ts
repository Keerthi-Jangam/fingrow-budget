
import { getAlerts } from '../controllers/alertController';
import { getUserAlerts } from '../services/alertService'; 
import { Request, Response } from 'express';

jest.mock('../src/services/alertService');

describe('Alert Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { params: { userId: 'testUserId' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAlerts', () => {
    it('should return alerts for a user', async () => {
      const mockAlerts = ['You have exceeded your budget.', 'You are close to reaching your savings goal.'];
      (getUserAlerts as jest.Mock).mockResolvedValue(mockAlerts);

      await getAlerts(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ alerts: mockAlerts });
    });

    it('should handle errors when getting alerts', async () => {
      (getUserAlerts as jest.Mock).mockRejectedValue(new Error('Failed to fetch alerts'));

      await getAlerts(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch alerts' });
    });
  });
});
