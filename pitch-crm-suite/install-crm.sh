#!/bin/bash

echo "📦 Installing Pitch CRM Suite..."

# Root folder
mkdir -p pitch-crm-suite && cd pitch-crm-suite

# Setup folders
mkdir -p crm/{auth,billing,clients,config,data,dashboard,meetings,notifications,sessions,ai,admin,analytics}
mkdir -p book/assets/{css,js}

# ========================
# BOOK - Booking Suite
# ========================

cat <<'EOF' > book/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Book a Meeting | Pitch Marketing</title>
  <link rel="stylesheet" href="assets/css/book.css" />
</head>
<body>
  <div class="container">
    <header>
      <h1>📅 Book a Meeting</h1>
      <p>Schedule a consultation with our team</p>
    </header>
    
    <main>
      <form id="booking-form">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" required />
        </div>
        
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" />
        </div>
        
        <div class="form-group">
          <label for="service">Service Type</label>
          <select id="service" name="service" required>
            <option value="">Select a service...</option>
            <option value="consultation">Free Consultation</option>
            <option value="strategy">Strategy Session</option>
            <option value="branding">Branding Review</option>
            <option value="marketing">Marketing Audit</option>
            <option value="web">Website Review</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="date">Preferred Date</label>
          <input type="date" id="date" name="date" required />
        </div>
        
        <div class="form-group">
          <label for="time">Preferred Time</label>
          <select id="time" name="time" required>
            <option value="">Select a time...</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="notes">Additional Notes</label>
          <textarea id="notes" name="notes" rows="4"></textarea>
        </div>
        
        <button type="submit" class="btn-primary">Book Meeting</button>
      </form>
      
      <div id="confirmation" class="hidden">
        <h2>✅ Booking Confirmed!</h2>
        <p>Check your email for confirmation details.</p>
      </div>
    </main>
  </div>
  
  <script src="assets/js/book.js"></script>
</body>
</html>
EOF

cat <<'EOF' > book/assets/css/book.css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

header h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

header p {
  color: #666;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.btn-primary {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.hidden {
  display: none;
}

#confirmation {
  text-align: center;
  padding: 2rem;
}

#confirmation h2 {
  color: #28a745;
  margin-bottom: 1rem;
}
EOF

cat <<'EOF' > book/assets/js/book.js
import { supabase } from '../../crm/auth/supabaseClient.js';

const form = document.getElementById('booking-form');
const confirmation = document.getElementById('confirmation');

// Set minimum date to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const booking = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    service: formData.get('service'),
    date: formData.get('date'),
    time: formData.get('time'),
    notes: formData.get('notes'),
    status: 'pending',
    created_at: new Date().toISOString()
  };
  
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking]);
    
    if (error) throw error;
    
    form.classList.add('hidden');
    confirmation.classList.remove('hidden');
    
    // Send confirmation email via CRM
    await fetch('/crm/notifications/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: booking.email,
        template: 'booking_confirmation',
        data: booking
      })
    });
    
  } catch (err) {
    console.error('Booking error:', err);
    alert('Something went wrong. Please try again.');
  }
});
EOF

# ========================
# CRM - Core Files
# ========================

cat <<'EOF' > crm/index.js
import { supabase } from './auth/supabaseClient.js';
import { sendEmail } from './notifications/email.js';
import { processAI } from './ai/assistant.js';

console.log('🚀 Pitch CRM Suite initialized');

export { supabase, sendEmail, processAI };
EOF

cat <<'EOF' > crm/auth/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
EOF

cat <<'EOF' > crm/auth/session.js
import { supabase } from './supabaseClient.js';

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}
EOF

# ========================
# CRM - Clients Module
# ========================

cat <<'EOF' > crm/clients/index.js
import { supabase } from '../auth/supabaseClient.js';

export async function getClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getClient(id) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getClientByEmail(email) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createClient(client) {
  const { data, error } = await supabase
    .from('clients')
    .insert([{
      ...client,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateClient(id, updates) {
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteClient(id) {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

export async function getEliteClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('elite', true);
  
  if (error) throw error;
  return data;
}
EOF

# ========================
# CRM - Billing Module
# ========================

cat <<'EOF' > crm/billing/stripe.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCustomer(email, name) {
  return await stripe.customers.create({ email, name });
}

export async function createCheckoutSession(customerId, priceId, successUrl, cancelUrl) {
  return await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl
  });
}

export async function createPaymentLink(priceId) {
  return await stripe.paymentLinks.create({
    line_items: [{ price: priceId, quantity: 1 }]
  });
}

export async function getSubscription(subscriptionId) {
  return await stripe.subscriptions.retrieve(subscriptionId);
}

export async function cancelSubscription(subscriptionId) {
  return await stripe.subscriptions.cancel(subscriptionId);
}

export async function createInvoice(customerId, items) {
  const invoice = await stripe.invoices.create({
    customer: customerId,
    auto_advance: true
  });
  
  for (const item of items) {
    await stripe.invoiceItems.create({
      customer: customerId,
      invoice: invoice.id,
      amount: item.amount,
      currency: 'usd',
      description: item.description
    });
  }
  
  return await stripe.invoices.finalizeInvoice(invoice.id);
}

export { stripe };
EOF

cat <<'EOF' > crm/billing/subscriptions.js
import { supabase } from '../auth/supabaseClient.js';
import { stripe } from './stripe.js';

export async function syncSubscription(stripeSubscription) {
  const { data, error } = await supabase
    .from('clients')
    .update({
      subscription: {
        id: stripeSubscription.id,
        status: stripeSubscription.status,
        plan: stripeSubscription.items.data[0].price.id,
        current_period_end: new Date(stripeSubscription.current_period_end * 1000).toISOString()
      }
    })
    .eq('stripe_customer_id', stripeSubscription.customer);
  
  if (error) throw error;
  return data;
}

export async function assignSessionCredits(clientId, credits) {
  const { data, error } = await supabase
    .from('clients')
    .update({
      sessions: supabase.rpc('increment_sessions', { amount: credits }),
      last_credit_assigned: new Date().toISOString()
    })
    .eq('id', clientId);
  
  if (error) throw error;
  return data;
}

export async function useSessionCredit(clientId) {
  const { data: client } = await supabase
    .from('clients')
    .select('sessions')
    .eq('id', clientId)
    .single();
  
  if (client.sessions <= 0) {
    throw new Error('No session credits available');
  }
  
  const { data, error } = await supabase
    .from('clients')
    .update({ sessions: client.sessions - 1 })
    .eq('id', clientId);
  
  if (error) throw error;
  return data;
}
EOF

# ========================
# CRM - Meetings Module
# ========================

cat <<'EOF' > crm/meetings/index.js
import { supabase } from '../auth/supabaseClient.js';
import { sendEmail } from '../notifications/email.js';

export async function getBookings(status = null) {
  let query = supabase
    .from('bookings')
    .select('*')
    .order('date', { ascending: true });
  
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createBooking(booking) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([{
      ...booking,
      status: 'pending',
      created_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) throw error;
  
  // Send confirmation email
  await sendEmail({
    to: booking.email,
    subject: 'Booking Confirmation - Pitch Marketing',
    template: 'booking_confirmation',
    data: data
  });
  
  return data;
}

export async function updateBookingStatus(id, status) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function confirmBooking(id) {
  return updateBookingStatus(id, 'confirmed');
}

export async function cancelBooking(id, reason = '') {
  const { data, error } = await supabase
    .from('bookings')
    .update({ 
      status: 'cancelled',
      cancellation_reason: reason
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  
  // Send cancellation email
  await sendEmail({
    to: data.email,
    subject: 'Booking Cancelled - Pitch Marketing',
    template: 'booking_cancelled',
    data: data
  });
  
  return data;
}

export async function completeBooking(id) {
  return updateBookingStatus(id, 'completed');
}

export async function getTodaysBookings() {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('date', today)
    .eq('status', 'confirmed')
    .order('time', { ascending: true });
  
  if (error) throw error;
  return data;
}
EOF

# ========================
# CRM - Notifications Module
# ========================

cat <<'EOF' > crm/notifications/email.js
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
EOF

cat <<'EOF' > crm/notifications/templates.js
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
EOF

# ========================
# CRM - AI Module
# ========================

cat <<'EOF' > crm/ai/assistant.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function processAI(prompt, context = {}) {
  const systemPrompt = `You are a helpful assistant for Pitch Marketing Agency CRM. 
You help with client management, scheduling, and marketing tasks.
Be concise and professional.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ],
    max_tokens: 1000
  });

  return response.choices[0].message.content;
}

export async function generateEmailDraft(clientName, purpose) {
  const prompt = `Write a professional email draft for ${clientName} regarding ${purpose}. 
Keep it brief and friendly.`;
  
  return processAI(prompt);
}

export async function summarizeClient(clientData) {
  const prompt = `Summarize this client profile in 2-3 sentences:
Name: ${clientData.name}
Email: ${clientData.email}
Sessions: ${clientData.sessions}
Elite: ${clientData.elite}
Subscription: ${JSON.stringify(clientData.subscription)}`;
  
  return processAI(prompt);
}

export async function suggestFollowUp(clientData, lastInteraction) {
  const prompt = `Suggest a follow-up action for client ${clientData.name}.
Last interaction: ${lastInteraction}
Sessions remaining: ${clientData.sessions}`;
  
  return processAI(prompt);
}
EOF

# ========================
# CRM - Dashboard Module
# ========================

cat <<'EOF' > crm/dashboard/index.js
import { supabase } from '../auth/supabaseClient.js';

export async function getDashboardStats() {
  const [clients, bookings, revenue] = await Promise.all([
    getClientStats(),
    getBookingStats(),
    getRevenueStats()
  ]);
  
  return { clients, bookings, revenue };
}

async function getClientStats() {
  const { data: total } = await supabase
    .from('clients')
    .select('id', { count: 'exact' });
  
  const { data: elite } = await supabase
    .from('clients')
    .select('id', { count: 'exact' })
    .eq('elite', true);
  
  const { data: recent } = await supabase
    .from('clients')
    .select('id', { count: 'exact' })
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
  
  return {
    total: total?.length || 0,
    elite: elite?.length || 0,
    newThisMonth: recent?.length || 0
  };
}

async function getBookingStats() {
  const today = new Date().toISOString().split('T')[0];
  
  const { data: todayBookings } = await supabase
    .from('bookings')
    .select('id', { count: 'exact' })
    .eq('date', today);
  
  const { data: pending } = await supabase
    .from('bookings')
    .select('id', { count: 'exact' })
    .eq('status', 'pending');
  
  const { data: thisWeek } = await supabase
    .from('bookings')
    .select('id', { count: 'exact' })
    .gte('date', today)
    .lte('date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  
  return {
    today: todayBookings?.length || 0,
    pending: pending?.length || 0,
    thisWeek: thisWeek?.length || 0
  };
}

async function getRevenueStats() {
  // This would integrate with Stripe for real revenue data
  return {
    mtd: 0,
    ytd: 0,
    mrr: 0
  };
}
EOF

# ========================
# CRM - Admin Module
# ========================

cat <<'EOF' > crm/admin/index.js
import { supabaseAdmin } from '../auth/supabaseClient.js';

export async function getAllUsers() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  if (error) throw error;
  return data.users;
}

export async function createUser(email, password, metadata = {}) {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: metadata
  });
  if (error) throw error;
  return data.user;
}

export async function deleteUser(userId) {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (error) throw error;
}

export async function updateUserRole(userId, role) {
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    user_metadata: { role }
  });
  if (error) throw error;
  return data.user;
}
EOF

# ========================
# CRM - Analytics Module
# ========================

cat <<'EOF' > crm/analytics/index.js
import { supabase } from '../auth/supabaseClient.js';

export async function trackEvent(eventName, properties = {}) {
  const { data, error } = await supabase
    .from('analytics_events')
    .insert([{
      event_name: eventName,
      properties,
      created_at: new Date().toISOString()
    }]);
  
  if (error) throw error;
  return data;
}

export async function getEventsByDateRange(startDate, endDate) {
  const { data, error } = await supabase
    .from('analytics_events')
    .select('*')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getTopEvents(limit = 10) {
  const { data, error } = await supabase
    .rpc('get_top_events', { event_limit: limit });
  
  if (error) throw error;
  return data;
}

export async function getConversionRate(startEvent, endEvent, dateRange) {
  const { data, error } = await supabase
    .rpc('calculate_conversion_rate', {
      start_event: startEvent,
      end_event: endEvent,
      start_date: dateRange.start,
      end_date: dateRange.end
    });
  
  if (error) throw error;
  return data;
}
EOF

# ========================
# CONFIG FILES
# ========================

cat <<'EOF' > .env.example
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_yourkey
STRIPE_WEBHOOK_SECRET=whsec_yourwebhooksecret

# OpenAI
OPENAI_API_KEY=sk-your-openai-key

# SendGrid (for notifications)
SENDGRID_API_KEY=

# App
NODE_ENV=development
APP_URL=http://localhost:3000
EOF

cat <<'EOF' > package.json
{
  "name": "pitch-crm-suite",
  "version": "1.0.0",
  "description": "Pitch Marketing CRM Suite - Client management, booking, and billing",
  "type": "module",
  "main": "crm/index.js",
  "scripts": {
    "start": "node crm/index.js",
    "dev": "node --watch crm/index.js",
    "test": "echo \"No tests yet\" && exit 0"
  },
  "dependencies": {
    "@sendgrid/mail": "^8.1.0",
    "@supabase/supabase-js": "^2.39.0",
    "nanoid": "^5.0.4",
    "openai": "^4.24.0",
    "stripe": "^14.10.0"
  },
  "devDependencies": {
    "dotenv": "^16.3.1"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "author": "Pitch Marketing Agency",
  "license": "MIT"
}
EOF

cat <<'EOF' > supabase-schema.sql
-- =============================================
-- PITCH CRM SUITE - SUPABASE SCHEMA
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- CLIENTS TABLE
-- =============================================
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  company TEXT,
  elite BOOLEAN DEFAULT FALSE,
  sessions INTEGER DEFAULT 0,
  stripe_customer_id TEXT,
  subscription JSONB,
  metadata JSONB DEFAULT '{}',
  last_credit_assigned TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_stripe_customer ON clients(stripe_customer_id);

-- =============================================
-- BOOKINGS TABLE
-- =============================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for booking queries
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_email ON bookings(email);

-- =============================================
-- ANALYTICS EVENTS TABLE
-- =============================================
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  user_id UUID,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for event queries
CREATE INDEX idx_analytics_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at);

-- =============================================
-- SESSIONS TABLE (for tracking client sessions)
-- =============================================
CREATE TABLE client_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id),
  session_type TEXT NOT NULL,
  notes TEXT,
  duration_minutes INTEGER,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INVOICES TABLE
-- =============================================
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  stripe_invoice_id TEXT,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'draft',
  description TEXT,
  due_date DATE,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to increment sessions
CREATE OR REPLACE FUNCTION increment_sessions(client_uuid UUID, amount INTEGER)
RETURNS INTEGER AS $$
DECLARE
  new_sessions INTEGER;
BEGIN
  UPDATE clients 
  SET sessions = sessions + amount,
      last_credit_assigned = NOW()
  WHERE id = client_uuid
  RETURNING sessions INTO new_sessions;
  
  RETURN new_sessions;
END;
$$ LANGUAGE plpgsql;

-- Function to get top events
CREATE OR REPLACE FUNCTION get_top_events(event_limit INTEGER DEFAULT 10)
RETURNS TABLE(event_name TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT ae.event_name, COUNT(*) as count
  FROM analytics_events ae
  GROUP BY ae.event_name
  ORDER BY count DESC
  LIMIT event_limit;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users
CREATE POLICY "Users can view own client data" ON clients
  FOR SELECT USING (auth.uid()::text = id::text OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage all clients" ON clients
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (email = auth.jwt() ->> 'email' OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all bookings" ON bookings
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- =============================================
-- TRIGGERS
-- =============================================

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EOF

cat <<'EOF' > netlify.toml
[build]
  publish = "book"
  command = "echo 'Static site - no build needed'"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[dev]
  port = 8888
  targetPort = 3000
  publish = "book"
  autoLaunch = false

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
EOF

cat <<'EOF' > .gitignore
# Dependencies
node_modules/

# Environment
.env
.env.local
.env.*.local

# Build
dist/
build/
.netlify/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Test
coverage/
EOF

cat <<'EOF' > README.md
# Pitch CRM Suite

A complete CRM and booking system for Pitch Marketing Agency.

## Features

- 📅 **Booking System** - Client scheduling and meeting management
- 👥 **Client Management** - Track clients, sessions, and subscriptions
- 💳 **Stripe Integration** - Billing, subscriptions, and invoices
- 📧 **Email Notifications** - Automated confirmations and reminders
- 🤖 **AI Assistant** - GPT-powered client insights
- 📊 **Analytics** - Track events and conversions

## Quick Start

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment

\`\`\`bash
cp .env.example .env
# Edit .env with your credentials
\`\`\`

### 3. Setup Supabase

Run the SQL in \`supabase-schema.sql\` in your Supabase SQL editor.

### 4. Deploy to Netlify

\`\`\`bash
netlify login
netlify init
netlify deploy --prod
\`\`\`

## Project Structure

\`\`\`
pitch-crm-suite/
├── book/                 # Booking frontend
│   ├── index.html
│   └── assets/
├── crm/                  # CRM backend modules
│   ├── auth/            # Authentication
│   ├── billing/         # Stripe integration
│   ├── clients/         # Client management
│   ├── meetings/        # Booking logic
│   ├── notifications/   # Email system
│   ├── ai/              # OpenAI integration
│   ├── dashboard/       # Stats & metrics
│   ├── admin/           # Admin functions
│   └── analytics/       # Event tracking
├── supabase-schema.sql  # Database schema
├── netlify.toml         # Netlify config
└── package.json
\`\`\`

## Environment Variables

| Variable | Description |
|----------|-------------|
| \`SUPABASE_URL\` | Supabase project URL |
| \`SUPABASE_ANON_KEY\` | Supabase anonymous key |
| \`SUPABASE_SERVICE_ROLE_KEY\` | Supabase service role key |
| \`STRIPE_SECRET_KEY\` | Stripe secret key |
| \`OPENAI_API_KEY\` | OpenAI API key |
| \`SENDGRID_API_KEY\` | SendGrid API key |

## License

MIT © Pitch Marketing Agency
EOF

# Final message
echo ""
echo "✅ Pitch CRM Suite scaffolded successfully!"
echo ""
echo "📁 Created: pitch-crm-suite/"
echo ""
echo "👉 Next steps:"
echo "   1. cd pitch-crm-suite"
echo "   2. npm install"
echo "   3. cp .env.example .env (then edit with your keys)"
echo "   4. Run supabase-schema.sql in your Supabase SQL editor"
echo "   5. netlify login"
echo "   6. netlify init"
echo "   7. netlify deploy --prod"
echo ""
echo "🚀 Ready to deploy!"
