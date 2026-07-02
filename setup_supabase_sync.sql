-- =========================================
-- COMPLETE SUPABASE SETUP SCRIPT
-- RUN THIS IN YOUR SUPABASE SQL EDITOR
-- =========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================================
-- 1. CREATE TABLES
-- =========================================

-- Admins Profile Table
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY REFERENCES auth.users(id) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    permissions JSONB DEFAULT '{"dashboard": true, "users": true, "newsletter": true, "settings": true, "manage_admins": true, "logs": true, "quotes": true, "blogs": true}',
    is_master BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    interest TEXT,
    message TEXT,
    status TEXT DEFAULT 'New',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    category TEXT DEFAULT 'Forex Insights',
    author_name TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Subscribers Table
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Admin Logs Table (This was missing!)
CREATE TABLE IF NOT EXISTS public.admin_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admin_id UUID,
    admin_name TEXT,
    action TEXT,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Settings Table (For maintenance mode)
CREATE TABLE IF NOT EXISTS public.settings (
    key text PRIMARY KEY,
    value text NOT NULL
);

-- Insert default maintenance mode setting
INSERT INTO public.settings (key, value) VALUES ('maintenance_mode', 'Disable') ON CONFLICT DO NOTHING;

-- =========================================
-- 2. ENABLE ROW LEVEL SECURITY (RLS)
-- =========================================
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;


-- =========================================
-- 3. DROP OLD POLICIES TO AVOID CONFLICTS
-- =========================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Admins can read own profile" ON public.admins;
  DROP POLICY IF EXISTS "Enable read access for all" ON public.admins;
  DROP POLICY IF EXISTS "Enable all access for authenticated" ON public.admins;

  DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
  DROP POLICY IF EXISTS "Only admins can view/manage leads" ON public.leads;

  DROP POLICY IF EXISTS "Anyone can view blogs" ON public.blogs;
  DROP POLICY IF EXISTS "Only admins can manage blogs" ON public.blogs;

  DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
  DROP POLICY IF EXISTS "Only admins can view subscribers" ON public.subscribers;
  
  DROP POLICY IF EXISTS "Enable all for admins on logs" ON public.admin_logs;
  DROP POLICY IF EXISTS "Allow authenticated admins to delete logs" ON public.admin_logs;
  
  DROP POLICY IF EXISTS "Enable read for everyone" ON public.settings;
  DROP POLICY IF EXISTS "Enable all for admins" ON public.settings;
END
$$;

-- =========================================
-- 4. CREATE CORRECT POLICIES (SAFE & SECURE)
-- =========================================

-- ADMINS: Anyone can read (needed for username login), but only admins can modify
CREATE POLICY "Enable read access for all" ON public.admins FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated" ON public.admins FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- LEADS: Anyone can insert, only admins can view/modify
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Only admins can view/manage leads" ON public.leads FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- BLOGS: Anyone can read, only admins can modify
CREATE POLICY "Anyone can view blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Only admins can manage blogs" ON public.blogs FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- SUBSCRIBERS: Anyone can insert, only admins can view/modify
CREATE POLICY "Anyone can subscribe" ON public.subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Only admins can view subscribers" ON public.subscribers FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- ADMIN LOGS: Only authenticated admins can read, insert, and delete
CREATE POLICY "Enable all for admins on logs" ON public.admin_logs FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- SETTINGS: Anyone can read, only admins can modify
CREATE POLICY "Enable read for everyone" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Enable all for admins" ON public.settings FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- =========================================
-- 5. TRIGGERS & RPC FUNCTIONS
-- =========================================

-- Delete auth user when admin is deleted
CREATE OR REPLACE FUNCTION public.delete_auth_user()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM auth.users WHERE id = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_admin_deleted ON public.admins;
CREATE TRIGGER on_admin_deleted
AFTER DELETE ON public.admins
FOR EACH ROW EXECUTE FUNCTION public.delete_auth_user();

-- RPC function to update admin credentials
CREATE OR REPLACE FUNCTION public.update_admin_credentials(
  target_admin_id UUID,
  new_email TEXT,
  new_password TEXT
)
RETURNS VOID AS $$
DECLARE
  caller_is_master BOOLEAN;
BEGIN
  SELECT is_master INTO caller_is_master FROM public.admins WHERE id = auth.uid();
  IF caller_is_master IS NOT TRUE THEN
    RAISE EXCEPTION 'Only master admins can update credentials.';
  END IF;

  IF new_email IS NOT NULL AND new_email != '' THEN
    UPDATE auth.users SET email = new_email WHERE id = target_admin_id;
  END IF;

  IF new_password IS NOT NULL AND new_password != '' THEN
    UPDATE auth.users SET encrypted_password = crypt(new_password, gen_salt('bf')) WHERE id = target_admin_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =========================================
-- Ensure master admin row exists for auth.users
-- =========================================
INSERT INTO public.admins (id, email, name, permissions, is_master)
SELECT
  u.id,
  u.email,
  COALESCE(u.email, 'Unknown') AS name,
  '{"dashboard": true, "users": true, "newsletter": true, "settings": true, "manage_admins": true, "logs": true, "quotes": true, "blogs": true}'::jsonb,
  true
FROM auth.users u
ON CONFLICT (id) DO UPDATE
SET
  permissions = EXCLUDED.permissions,
  is_master = true;
