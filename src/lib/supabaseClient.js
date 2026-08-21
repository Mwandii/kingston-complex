import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Single shared Supabase client, used anywhere in the app that needs
 * to read or write data. Uses the anon/public key only — safe to ship
 * to the browser because table access is controlled by RLS policies
 * on the Supabase side, not by keeping this key secret.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);