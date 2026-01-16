const templates = {
  booking_confirmation: (data) => `
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
          <p>Hi ${data.name},</p>
          <p>Your meeting has been scheduled. Here are the details:</p>
          <div class="details">
            <p><strong>Service:</strong> ${data.service}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time}</p>
          </div>
          <p>We'll send you a reminder before your appointment.</p>
          <p>Best regards,<br>Pitch Marketing Team</p>
        </div>
        <div class="footer">
          <p>© 2024 Pitch Marketing Agency</p>
        </div>
      </div>
    </body>
    </html>
  `,
  
  booking_cancelled: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Cancelled</h1>
        </div>
        <div class="content">
          <p>Hi ${data.name},</p>
          <p>Your booking for ${data.date} at ${data.time} has been cancelled.</p>
          ${data.cancellation_reason ? `<p><strong>Reason:</strong> ${data.cancellation_reason}</p>` : ''}
          <p>If you'd like to reschedule, please visit our booking page.</p>
          <p>Best regards,<br>Pitch Marketing Team</p>
        </div>
        <div class="footer">
          <p>© 2024 Pitch Marketing Agency</p>
        </div>
      </div>
    </body>
    </html>
  `,
  
  session_reminder: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⏰ Reminder: Upcoming Session</h1>
        </div>
        <div class="content">
          <p>Hi ${data.name},</p>
          <p>This is a reminder that your session is scheduled for:</p>
          <p><strong>${data.date} at ${data.time}</strong></p>
          <p>Best regards,<br>Pitch Marketing Team</p>
        </div>
      </div>
    </body>
    </html>
  `
};

export function getTemplate(name, data) {
  const template = templates[name];
  if (!template) {
    throw new Error(`Template "${name}" not found`);
  }
  return template(data);
}

export { templates };
