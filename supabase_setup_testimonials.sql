-- =========================================
-- TESTIMONIALS SETUP SCRIPT
-- RUN THIS IN YOUR SUPABASE SQL EDITOR
-- =========================================

-- 1. Create Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Safely drop the rating column if it exists from a previous setup
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_schema = 'public' 
               AND table_name = 'testimonials' 
               AND column_name = 'rating') THEN
        ALTER TABLE public.testimonials DROP COLUMN rating;
    END IF;
END $$;


-- 2. Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies (Allow everyone to Insert and Read)
DROP POLICY IF EXISTS "Enable read access for all users" ON public.testimonials;
CREATE POLICY "Enable read access for all users" ON public.testimonials FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for all users" ON public.testimonials;
CREATE POLICY "Enable insert for all users" ON public.testimonials FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for all users" ON public.testimonials;
CREATE POLICY "Enable update for all users" ON public.testimonials FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for all users" ON public.testimonials;
CREATE POLICY "Enable delete for all users" ON public.testimonials FOR DELETE USING (true);

-- 4. Enable Realtime safely
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
        AND schemaname = 'public'
        AND tablename = 'testimonials'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE testimonials;
    END IF;
END $$;
