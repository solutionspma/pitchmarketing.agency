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
