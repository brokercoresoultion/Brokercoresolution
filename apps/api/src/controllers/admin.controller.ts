import { Request, Response } from 'express';
import { adminService } from '../services/admin.service';

export class AdminController {
  async getDashboard(req: any, res: any) {
    try {
      const data = await adminService.getDashboardData();
      res.json({ ...data, currentAdmin: req.admin });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateLead(req: any, res: any) {
    try {
      await adminService.updateLead(req.params.id, req.body);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteLead(req: any, res: any) {
    try {
      await adminService.deleteLead(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateSubscriber(req: any, res: any) {
    try {
      await adminService.updateSubscriber(req.params.id, req.body);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteSubscriber(req: any, res: any) {
    try {
      await adminService.deleteSubscriber(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async createBlog(req: any, res: any) {
    try {
      const data = await adminService.createBlog(req.body);
      res.json({ data });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateBlog(req: any, res: any) {
    try {
      const data = await adminService.updateBlog(req.params.id, req.body);
      res.json({ data });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteBlog(req: any, res: any) {
    try {
      await adminService.deleteBlog(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async createUser(req: any, res: any) {
    try {
      await adminService.createUser(req.body);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req: any, res: any) {
    try {
      await adminService.updateUser(req.params.id, req.body);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req: any, res: any) {
    try {
      await adminService.deleteUser(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const adminController = new AdminController();
