/**
 * Storefront catalog lives in the dedicated BosterBio Supabase project.
 * When BOSTERBIO_* are set, the Next app uses them for all server-side Supabase access.
 * Otherwise fall back to NEXT_PUBLIC_SUPABASE_URL + service key (legacy single-project setup).
 */
export function bosterbioCatalogSupabaseConfigured(): boolean {
  const url = process.env.BOSTERBIO_SUPABASE_URL?.trim();
  const key =
    process.env.BOSTERBIO_SUPABASE_KEY?.trim() ||
    process.env.BOSTERBIO_SUPABASE_SERVICE_ROLE_KEY?.trim();
  return Boolean(url && key);
}

function legacyCatalogSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key =
    process.env.SUPABASE_SECRETE_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return Boolean(url && key);
}

/** True when the web app can reach the product/CMS Supabase with the service role. */
export function supabaseCatalogConfigured(): boolean {
  return bosterbioCatalogSupabaseConfigured() || legacyCatalogSupabaseConfigured();
}

export function getCatalogSupabaseUrl(): string | undefined {
  if (process.env.BOSTERBIO_SUPABASE_URL?.trim()) {
    return process.env.BOSTERBIO_SUPABASE_URL.trim();
  }
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
}

export function getCatalogServiceRoleKey(): string | undefined {
  const boster =
    process.env.BOSTERBIO_SUPABASE_KEY?.trim() ||
    process.env.BOSTERBIO_SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (boster) return boster;
  return process.env.SUPABASE_SECRETE_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
}
