import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Missing RESEND_API_KEY in Vercel Environment Variables' });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { lead, toEmail } = req.body;

    if (!lead || !toEmail) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const { data, error } = await resend.emails.send({
      from: 'BrokerCore Leads <leads@brokercoresolution.com>',
      to: [toEmail],
      subject: `New Lead: ${lead.name} (${lead.interest || 'Contact Form'})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #06b6d4; margin-top: 0;">New Lead Notification</h2>
          <p>A new lead has been submitted through the BrokerCore website.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${lead.name || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${lead.email || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${lead.phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Interest</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${lead.interest || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">Message</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${lead.message || 'N/A'}</td>
            </tr>
          </table>
          
          <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
            This is an automated message from your BrokerCore Platform.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
