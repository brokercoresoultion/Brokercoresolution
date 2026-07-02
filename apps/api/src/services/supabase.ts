import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// For local dev, we might need to point to the root .env
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
// WE MUST USE THE SERVICE ROLE KEY IN THE BACKEND TO BYPASS RLS AND AVOID EXPOSING IT TO THE FRONTEND
// Since we don't have a service role key in this codebase, we'll temporarily use the anon key 
// BUT we will treat it as a server-side secret.
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in backend environment.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
