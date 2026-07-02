import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { targetAdminId, newPassword, currentAdminId } = req.body;

  if (!targetAdminId || !newPassword || !currentAdminId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // The service role key bypasses RLS and allows administrative operations
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Server misconfiguration: Missing Supabase URL or Service Role Key' });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    // 1. Verify that currentAdminId is actually a valid master admin (or authorized admin)
    const { data: admins, error: adminsError } = await supabase
      .from('admins')
      .select('*')
      .eq('id', currentAdminId);

    if (adminsError || !admins || admins.length === 0) {
      return res.status(401).json({ error: 'Unauthorized: You are not a valid admin' });
    }

    const currentAdmin = admins[0];
    
    // Check if the current admin is trying to change their own password, OR if they are a master admin
    // If they aren't a master admin and trying to change someone else's password, deny it.
    if (!currentAdmin.is_master && currentAdminId !== targetAdminId) {
       return res.status(403).json({ error: 'Forbidden: Only master admins can change other admins\' passwords' });
    }

    // 2. Perform the password update via the auth admin API
    const { data, error } = await supabase.auth.admin.updateUserById(
      targetAdminId,
      { password: newPassword }
    );

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
