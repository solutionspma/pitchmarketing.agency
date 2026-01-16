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
