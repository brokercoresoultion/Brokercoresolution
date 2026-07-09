import { supabase } from './src/lib/supabase';

async function testRpc() {
  console.log("Calling increment...");
  const res = await supabase.rpc('increment_blog_view', { blog_slug: 'how-to-launch-a-forex-brokerage-in-3-days' });
  console.log("RPC Response:", res);
  
  const { data } = await supabase.from('blogs').select('slug, views').eq('slug', 'how-to-launch-a-forex-brokerage-in-3-days').limit(1);
  console.log("Updated Views:", data);
}
testRpc();
