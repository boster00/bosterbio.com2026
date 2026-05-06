/**
 * Resolve BosterBio catalog Supabase credentials for Node migration scripts.
 * Priority: process.env BOSTERBIO_* → repo-root .env.local (NEXT_PUBLIC + service key).
 */
import fs from "node:fs"
import path from "node:path"

/**
 * @param {string} repoRoot Absolute path to bosterbio.com2026 repo root
 * @returns {{ url: string, key: string }}
 */
export function loadCatalogSupabaseEnv(repoRoot) {
  const bUrl = process.env.BOSTERBIO_SUPABASE_URL?.trim()
  const bKey =
    process.env.BOSTERBIO_SUPABASE_KEY?.trim() ||
    process.env.BOSTERBIO_SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (bUrl && bKey) {
    return { url: bUrl, key: bKey }
  }

  const envPath = path.join(repoRoot, ".env.local")
  if (!fs.existsSync(envPath)) {
    throw new Error(
      `Missing catalog credentials: set BOSTERBIO_SUPABASE_URL and BOSTERBIO_SUPABASE_KEY, or create ${envPath} with NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY.`,
    )
  }
  const env = Object.fromEntries(
    fs
      .readFileSync(envPath, "utf8")
      .split(/\r?\n/)
      .filter((l) => l && !l.startsWith("#"))
      .map((l) => {
        const i = l.indexOf("=")
        return [l.slice(0, i), l.slice(i + 1)]
      }),
  )
  const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = env.SUPABASE_SECRETE_KEY?.trim() || env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !key) {
    throw new Error(
      `${envPath} must define NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRETE_KEY (or use BOSTERBIO_* in the environment).`,
    )
  }
  return { url, key }
}
