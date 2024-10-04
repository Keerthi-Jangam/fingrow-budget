
import { getFinancialReport } from '../controllers/reportController';
import { generateFinancialReport } from '../services/reportService';
import { Request, Response } from 'express';

jest.mock('../src/services/reportService');

describe('Report Controller', () => {
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

  describe('getReports', () => {
    it('should return reports for a user', async () => {
      const mockReports = [{ month: 'January', totalIncome: 2000, totalExpenses: 1500 }];
      (generateFinancialReport as jest.Mock).mockResolvedValue(mockReports);

      await getFinancialReport(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ reports: mockReports });
    });

    it('should handle errors when getting reports', async () => {
      (generateFinancialReport as jest.Mock).mockRejectedValue(new Error('Failed to fetch reports'));

      await getFinancialReport(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch reports' });
    });
  });
});
