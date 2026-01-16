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
