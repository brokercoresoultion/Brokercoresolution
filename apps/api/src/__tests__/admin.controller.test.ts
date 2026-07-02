import { describe, it, expect, vi, beforeEach } from 'vitest';
import { adminController } from '../controllers/admin.controller';
import { adminService } from '../services/admin.service';

vi.mock('../services/admin.service', () => ({
  adminService: {
    getDashboardData: vi.fn(),
    updateLead: vi.fn(),
  }
}));

describe('Admin Controller', () => {
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockReq = {
      params: {},
      body: {},
      admin: { id: 1, role: 'admin' }
    };
    mockRes = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis()
    };
  });

  describe('getDashboard', () => {
    it('should return dashboard data when service succeeds', async () => {
      const mockData = { leads: [], subscribers: [], blogs: [], admins: [] };
      (adminService.getDashboardData as any).mockResolvedValue(mockData);

      await adminController.getDashboard(mockReq, mockRes);

      expect(adminService.getDashboardData).toHaveBeenCalledTimes(1);
      expect(mockRes.json).toHaveBeenCalledWith({
        ...mockData,
        currentAdmin: mockReq.admin
      });
    });

    it('should handle errors and return 500', async () => {
      (adminService.getDashboardData as any).mockRejectedValue(new Error('DB Error'));

      await adminController.getDashboard(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'DB Error' });
    });
  });
});
