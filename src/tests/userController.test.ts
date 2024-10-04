
import { createUser , getUser} from '../controllers/userController';
import User from '../models/User';
import { Request, Response } from 'express';

jest.mock('../src/models/User');

describe('User Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        username: 'testUser',
        password: 'testPassword',
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

  describe('createUser', () => {
    it('should create a new user and return it', async () => {
      const mockUser = { username: 'testUser', password: 'testPassword' };
      (User.prototype.save as jest.Mock).mockResolvedValue(mockUser);

      await createUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should handle errors when creating a user', async () => {
      (User.prototype.save as jest.Mock).mockRejectedValue(new Error('Failed to save'));

      await createUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to save' });
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const mockUser = { username: 'testUser', userId: 'testUserId' };
      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      await getUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should handle errors when getting a user', async () => {
      (User.findById as jest.Mock).mockRejectedValue(new Error('Failed to fetch user'));

      await getUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch user' });
    });
  });
});
