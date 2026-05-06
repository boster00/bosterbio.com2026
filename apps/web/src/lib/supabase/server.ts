// Supabase client for server-side reads / writes from RSCs and route handlers.
// Uses the SERVICE_ROLE key — DO NOT import this from client components.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getCatalogServiceRoleKey, getCatalogSupabaseUrl } from "./catalog-env";

let cached: SupabaseClient | null = null;

export function supabaseService(): SupabaseClient {
  if (cached) return cached;
  const url = getCatalogSupabaseUrl();
  const key = getCatalogServiceRoleKey();
  if (!url || !key) {
    throw new Error(
      "Supabase server credentials missing. Set BOSTERBIO_SUPABASE_URL and BOSTERBIO_SUPABASE_KEY for the storefront catalog, or NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRETE_KEY for legacy setup."
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
