import { supabase } from './src/lib/supabase';

async function checkViews() {
  const { data, error } = await supabase.from('blogs').select('slug, views').limit(1);
  console.log("Views Check:", { data, error });
}
checkViews();
