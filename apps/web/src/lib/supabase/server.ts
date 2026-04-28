// Supabase client for server-side reads / writes from RSCs and route handlers.
// Uses the SERVICE_ROLE key — DO NOT import this from client components.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function supabaseService(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRETE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase server credentials missing. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRETE_KEY are set in .env.local"
    );
  }
  cached = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return cached;
}

// Read-only public reads (browser-safe). Uses the anon key.
export function supabaseAnon(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase anon credentials missing.");
  }
  return createClient(url, key);
}
