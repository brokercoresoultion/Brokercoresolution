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
    const { subject, content, emails } = req.body;

    if (!subject || !content || !emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Prepare batch of emails to send
    const emailObjects = emails.map((email: string) => ({
      from: 'BrokerCoreSolution <updates@brokercoresolution.com>',
      to: [email],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px; margin: 0 auto;">
          ${content.replace(/\n/g, '<br/>')}
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888; text-align: center;">
            <p>This is an automated message from BrokerCoreSolution.</p>
            <p>You are receiving this because you subscribed to our newsletter.</p>
          </div>
        </div>
      `,
    }));

    // Send using Resend batch API
    const { data, error } = await resend.batch.send(emailObjects);

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
