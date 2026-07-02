import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { targetAdminId, currentAdminId } = req.body;

  if (!targetAdminId || !currentAdminId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Server misconfiguration: Missing Supabase URL or Service Role Key' });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    // Verify that currentAdminId is actually an authorized admin
    const { data: admins, error: adminsError } = await supabase
      .from('admins')
      .select('*')
      .eq('id', currentAdminId);

    if (adminsError || !admins || admins.length === 0) {
      return res.status(401).json({ error: 'Unauthorized: You are not a valid admin' });
    }

    const currentAdmin = admins[0];
    const { data: targetAdmins } = await supabase.from('admins').select('*').eq('id', targetAdminId);
    const targetAdmin = targetAdmins ? targetAdmins[0] : null;

    // Check if a normal admin is trying to delete a master admin
    if (!currentAdmin.is_master && targetAdmin?.is_master) {
       return res.status(403).json({ error: 'Forbidden: Normal admins cannot delete Master Admins' });
    }

    // Delete from public.admins first (just in case there's no cascade delete)
    await supabase.from('admins').delete().eq('id', targetAdminId);

    // Delete from auth.users via admin API
    const { data, error } = await supabase.auth.admin.deleteUser(targetAdminId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Admin deleted completely from system' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
