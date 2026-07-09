import { supabase } from './src/lib/supabase';
async function test() {
  const { data, error } = await supabase.from('blogs').select('id, created_at, title, author_name, date, category, status, cover_image');
  console.log({data, error});
}
test();
