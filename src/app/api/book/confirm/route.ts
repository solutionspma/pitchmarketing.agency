import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const booking = await request.json();

    // Try to send confirmation email via SendGrid
    let emailSent = false;
    
    if (process.env.SENDGRID_API_KEY) {
      try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
          to: booking.email,
          from: {
            email: 'solutions@pitchmarketing.agency',
            name: 'Pitch Marketing',
          },
          subject: 'Booking Confirmation - Pitch Marketing',
          html: generateEmailHTML(booking),
        };

        await sgMail.send(msg);
        emailSent = true;
        console.log('Confirmation email sent to:', booking.email);
      } catch (emailError) {
        console.error('SendGrid error (continuing without email):', emailError);
      }
    } else {
      console.log('SendGrid not configured - skipping email confirmation');
    }

    // Try to send SMS notification via Telnyx (if configured)
    let smsSent = false;
    
    if (process.env.TELNYX_API_KEY && booking.phone) {
      try {
        const response = await fetch('https://api.telnyx.com/v2/messages', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.TELNYX_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.TELNYX_PHONE_NUMBER || '+18339041505',
            to: booking.phone,
            text: `Hi ${booking.name}! Your meeting with Pitch Marketing has been confirmed for ${booking.date} at ${booking.time}. We look forward to speaking with you!`,
          }),
        });
        
        if (response.ok) {
          smsSent = true;
          console.log('SMS confirmation sent to:', booking.phone);
        }
      } catch (smsError) {
        console.error('Telnyx SMS error (continuing):', smsError);
      }
    }

    // Send notification to Jason (owner) about the new booking
    if (process.env.TELNYX_API_KEY) {
      try {
        await fetch('https://api.telnyx.com/v2/messages', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.TELNYX_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.TELNYX_PHONE_NUMBER || '+18339041505',
            to: process.env.OWNER_PHONE || '+17606169587',
            text: `📅 NEW BOOKING!\n\nName: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone || 'N/A'}\nDate: ${booking.date}\nTime: ${booking.time}\nService: ${booking.service}\nNotes: ${booking.notes || 'None'}`,
          }),
        });
        console.log('Owner notification sent');
      } catch (notifyError) {
        console.error('Owner notification failed:', notifyError);
      }
    }

    return NextResponse.json({ 
      success: true,
      emailSent,
      smsSent,
      message: 'Booking confirmed successfully'
    });
  } catch (error) {
    console.error('Booking confirmation error:', error);
    // Return success anyway - the booking was already saved to Supabase
    // This just means the notification failed
    return NextResponse.json({ 
      success: true, 
      warning: 'Booking saved but notification may have failed'
    });
  }
}

function generateEmailHTML(booking: any) {
  return \`
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
          <p>Hi \${booking.name},</p>
          <p>Your meeting has been scheduled. Here are the details:</p>
          <div class="details">
            <p><strong>Service:</strong> \${booking.service}</p>
            <p><strong>Date:</strong> \${booking.date}</p>
            <p><strong>Time:</strong> \${booking.time}</p>
          </div>
          <p>We'll send you a reminder before your appointment.</p>
          <p>Best regards,<br>Pitch Marketing Team</p>
        </div>
        <div class="footer">
          <p>© \${new Date().getFullYear()} Pitch Marketing Agency</p>
        </div>
      </div>
    </body>
    </html>
  \`;
}
