import sgMail from '@sendgrid/mail';
import { getTemplate } from './templates.js';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const FROM_EMAIL = 'solutions@pitchmarketing.agency';

export async function sendEmail({ to, subject, template, data, html }) {
  const emailHtml = html || getTemplate(template, data);
  
  const msg = {
    to,
    from: {
      email: FROM_EMAIL,
      name: 'Pitch Marketing'
    },
    subject,
    html: emailHtml
  };
  
  try {
    const result = await sgMail.send(msg);
    console.log('Email sent:', result[0].statusCode);
    return result;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
}

export async function sendBulkEmail(recipients, subject, template, data) {
  const results = [];
  
  for (const recipient of recipients) {
    try {
      const result = await sendEmail({
        to: recipient.email,
        subject,
        template,
        data: { ...data, recipient }
      });
      results.push({ email: recipient.email, success: true, result });
    } catch (error) {
      results.push({ email: recipient.email, success: false, error });
    }
  }
  
  return results;
}
