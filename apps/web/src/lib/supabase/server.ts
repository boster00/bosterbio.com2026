// Supabase client for server-side reads / writes from RSCs and route handlers.
// Uses the SERVICE_ROLE key — DO NOT import this from client components.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

type StorefrontCreds = { url: string; key: string };

/**
 * BosterBio storefront catalog lives in its own Supabase project. Prefer a full
 * `BOSTERBIO_SUPABASE_URL` + `BOSTERBIO_SUPABASE_KEY` pair so GuildOS quest DB
 * env (`NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SECRETE_KEY`) never shadows it.
 */
function resolveStorefrontServiceCreds(): StorefrontCreds | null {
  const bUrl = process.env.BOSTERBIO_SUPABASE_URL?.trim();
  const bKey = process.env.BOSTERBIO_SUPABASE_KEY?.trim();
  if (bUrl && bKey) return { url: bUrl, key: bKey };

  const legacyUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const legacyKey =
    process.env.SUPABASE_SECRETE_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (legacyUrl && legacyKey) return { url: legacyUrl, key: legacyKey };

  return null;
}

/** True when `supabaseService()` can connect to the storefront catalog DB. */
export function storefrontSupabaseConfigured(): boolean {
  return resolveStorefrontServiceCreds() !== null;
}

export function supabaseService(): SupabaseClient {
  if (cached) return cached;
  const creds = resolveStorefrontServiceCreds();
  if (!creds) {
    throw new Error(
      "Supabase server credentials missing. Set BOSTERBIO_SUPABASE_URL + BOSTERBIO_SUPABASE_KEY for the storefront catalog, or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY (or SUPABASE_SERVICE_ROLE_KEY) in .env.local"
    );
  }
  cached = createClient(creds.url, creds.key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return cached;
}

// Read-only public reads (browser-safe). Uses the anon key.
export function supabaseAnon(): SupabaseClient {
  const creds = resolveStorefrontServiceCreds();
  const url = creds?.url ?? process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key =
    process.env.NEXT_PUBLIC_BOSTERBIO_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) {
    throw new Error("Supabase anon credentials missing.");
  }
  return createClient(url, key);
}
