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
