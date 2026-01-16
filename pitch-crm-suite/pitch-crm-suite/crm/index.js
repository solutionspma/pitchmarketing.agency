import { supabase } from './auth/supabaseClient.js';
import { sendEmail } from './notifications/email.js';
import { processAI } from './ai/assistant.js';

console.log('🚀 Pitch CRM Suite initialized');

export { supabase, sendEmail, processAI };
