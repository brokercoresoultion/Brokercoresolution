import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-enterprise-key-change-in-prod';

// Admin Auth Middleware
const authenticateAdmin = (req: any, res: any, next: any) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Apply middleware to all routes except login/logout which are handled in server.ts or auth routes
router.use(authenticateAdmin);

router.get('/dashboard', adminController.getDashboard);

router.put('/leads/:id', adminController.updateLead);
router.delete('/leads/:id', adminController.deleteLead);

router.put('/subscribers/:id', adminController.updateSubscriber);
router.delete('/subscribers/:id', adminController.deleteSubscriber);

router.post('/blogs', adminController.createBlog);
router.put('/blogs/:id', adminController.updateBlog);
router.delete('/blogs/:id', adminController.deleteBlog);

router.post('/users', adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

export default router;
