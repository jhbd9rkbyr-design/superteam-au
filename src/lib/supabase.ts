import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** True when env vars are present — lets UI gracefully fall back to static data */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
