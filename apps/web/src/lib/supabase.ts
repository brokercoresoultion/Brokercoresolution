import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL as string || 'https://placeholder.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY as string || 'placeholder';

if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn('Supabase credentials missing. Check your Vercel Environment Variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
