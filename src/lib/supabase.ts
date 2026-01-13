import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Genesis account email - has full platform access
export const GENESIS_EMAIL = "solutions@pitchmarketing.agency";

// Check if Supabase is configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;

const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('YOUR') && 
  !supabaseAnonKey.includes('YOUR')
);

// Client-side Supabase client (uses anon key, respects RLS)
// Returns null if not configured to prevent runtime errors
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: typeof window !== 'undefined',
        detectSessionInUrl: typeof window !== 'undefined',
      },
    })
  : null;

// Server-side Supabase client (bypasses RLS for admin operations)
export const supabaseAdmin: SupabaseClient | null = 
  isSupabaseConfigured && supabaseServiceRole
    ? createClient(supabaseUrl!, supabaseServiceRole)
    : null;

// Helper to check if Supabase is ready
export const isSupabaseReady = () => isSupabaseConfigured && supabase !== null;

// Helper to check if user is genesis account
export const isGenesisAccount = (email: string | null | undefined): boolean => {
  return email?.toLowerCase() === GENESIS_EMAIL.toLowerCase();
};

// Type for user with genesis check
export interface UserWithGenesis {
  id: string;
  email: string;
  isGenesis: boolean;
}
