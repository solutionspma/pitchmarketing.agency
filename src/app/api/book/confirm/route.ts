import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  try {
    const booking = await request.json();

    const msg = {
      to: booking.email,
      from: {
        email: 'solutions@pitchmarketing.agency',
        name: 'Pitch Marketing',
      },
      subject: 'Booking Confirmation - Pitch Marketing',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Booking Confirmed</h1>
            </div>
            <div class="content">
              <p>Hi ${booking.name},</p>
              <p>Your meeting has been scheduled. Here are the details:</p>
              <div class="details">
                <p><strong>Service:</strong> ${booking.service}</p>
                <p><strong>Date:</strong> ${booking.date}</p>
                <p><strong>Time:</strong> ${booking.time}</p>
              </div>
              <p>We'll send you a reminder before your appointment.</p>
              <p>Best regards,<br>Pitch Marketing Team</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Pitch Marketing Agency</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send confirmation' }, { status: 500 });
  }
}
