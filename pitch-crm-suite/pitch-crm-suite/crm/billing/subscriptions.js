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
