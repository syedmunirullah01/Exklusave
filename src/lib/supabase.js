import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY; // Fallback to publishable key if service role is missing

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  // We don't throw an error immediately during build if environment variables are not loaded,
  // to allow Next.js server-side features and client bundles to build or fall back properly.
  console.warn(
    "[supabase] Warning: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing from environment. Supabase client is not fully initialized."
  );
}

export const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
          persistSession: false,
        },
      })
    : null;

export function isSupabaseConfigured() {
  return Boolean(supabase);
}
