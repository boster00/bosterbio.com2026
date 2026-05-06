/**
 * Resolve Supabase REST credentials for the BosterBio storefront catalog DB.
 * Mirrors `resolveStorefrontServiceCreds` in apps/web/src/lib/supabase/server.ts:
 * prefer a full BOSTERBIO_* pair, then legacy NEXT_PUBLIC_SUPABASE_URL + service key.
 *
 * @param {Record<string, string>} env flat key/value map (e.g. from .env.local)
 * @returns {{ url: string; key: string } | null}
 */
export function resolveStorefrontSupabaseFromEnv(env) {
  const bUrl = String(env.BOSTERBIO_SUPABASE_URL ?? "").trim();
  const bKey = String(env.BOSTERBIO_SUPABASE_KEY ?? "").trim();
  if (bUrl && bKey) return { url: bUrl, key: bKey };

  const legacyUrl = String(env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
  const legacyKey = String(
    env.SUPABASE_SECRETE_KEY ?? env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  ).trim();
  if (legacyUrl && legacyKey) return { url: legacyUrl, key: legacyKey };

  return null;
}
