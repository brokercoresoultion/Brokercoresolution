import { supabase } from './supabase';

export const sendEmailNotification = async (leadData: any) => {
  try {
    // 1. Check if email notifications are enabled
    const { data: settingsData } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'email_notifications')
      .single();

    if (settingsData && settingsData.value === 'true') {
      // 2. Fetch admin email to send to
      const { data: admins } = await supabase.from('admins').select('email').limit(1);
      
      if (admins && admins.length > 0) {
        const toEmail = admins[0].email;
        
        // 3. Trigger the Vercel serverless function
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lead: leadData, toEmail })
        });
      }
    }
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }
};
