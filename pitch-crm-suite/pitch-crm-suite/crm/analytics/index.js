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
