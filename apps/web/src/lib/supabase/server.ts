// Supabase client for server-side reads / writes from RSCs and route handlers.
// Uses the SERVICE_ROLE key — DO NOT import this from client components.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  getCatalogSupabaseAnonKey,
  getCatalogSupabaseSecretKey,
  getCatalogSupabaseUrl,
} from "./catalog-credentials";

let cached: SupabaseClient | null = null;

export function supabaseService(): SupabaseClient {
  if (cached) return cached;
  const url = getCatalogSupabaseUrl();
  const key = getCatalogSupabaseSecretKey();
  if (!url || !key) {
    throw new Error(
      "Supabase server credentials missing. Set BOSTERBIO_SUPABASE_URL + BOSTERBIO_SUPABASE_KEY (or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY) in the environment."
    );
  }
  cached = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return cached;
}

// Read-only public reads (browser-safe). Uses the anon key.
export function supabaseAnon(): SupabaseClient {
  const url = getCatalogSupabaseUrl();
  const key = getCatalogSupabaseAnonKey();
  if (!url || !key) {
    throw new Error(
      "Supabase anon credentials missing. Set BOSTERBIO_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY for the catalog project."
    );
  }
  return createClient(url, key);
}
