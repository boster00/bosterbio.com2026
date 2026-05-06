/**
 * Storefront catalog Supabase credentials.
 * Cursor Cloud / production: use BOSTERBIO_SUPABASE_URL + BOSTERBIO_SUPABASE_KEY.
 * Local dev: NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY (or service role).
 */

export function getCatalogSupabaseUrl(): string | undefined {
  const u = process.env.BOSTERBIO_SUPABASE_URL?.trim() || process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  return u || undefined;
}

export function getCatalogSupabaseSecretKey(): string | undefined {
  const k =
    process.env.BOSTERBIO_SUPABASE_KEY?.trim() ||
    process.env.SUPABASE_SECRETE_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return k || undefined;
}

export function getCatalogSupabaseAnonKey(): string | undefined {
  return (
    process.env.BOSTERBIO_SUPABASE_ANON_KEY?.trim() || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  );
}

export function isCatalogSupabaseConfigured(): boolean {
  return Boolean(getCatalogSupabaseUrl() && getCatalogSupabaseSecretKey());
}
