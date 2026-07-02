import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { supabase } from './services/supabase';
import adminRoutes from './routes/admin.routes';

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_enterprise_key_2026';

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow frontend dev ports
  credentials: true,
}));
app.use(express.json({ limit: '10kb' })); // Prevent large payloads
app.use(cookieParser());
app.use(mongoSanitize());

// Logging Middleware
app.use(morgan('combined'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

// Health Check / Maintenance Status
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', maintenance: false });
});

// Admin Authentication
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate against Supabase admins table
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, email, role')
      .eq('email', email)
      .eq('password', password) // In production, this should be a hashed comparison
      .single();

    if (error || !admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role || 'admin' },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    // Set HttpOnly cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 12 * 60 * 60 * 1000 // 12 hours
    });

    res.json({ message: 'Login successful' });
  } catch (err: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.json({ message: 'Logged out' });
});

app.use('/api/admin', adminRoutes);

// Blog Posts
app.get('/api/blogs', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', req.params.slug)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Subscription
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const { error } = await supabase.from('subscribers').insert([{ email }]);
    
    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Already subscribed' });
      }
      throw error;
    }
    
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message, interest } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const { error } = await supabase.from('leads').insert([
      { name, email, phone, message, interest }
    ]);
    
    if (error) throw error;
    
    res.status(201).json({ message: 'Contact message received' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Enterprise API running on port ${PORT}`);
});
