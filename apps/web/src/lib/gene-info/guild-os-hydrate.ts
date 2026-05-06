import "server-only"

import type { BiomarkerUrlMap } from "./url-map"

export type Phase1Bundle = {
  urlMap: BiomarkerUrlMap
  /** Flattened facts + optional GuildOS slug keys */
  record: Record<string, string | number | boolean | null>
}

/**
 * POST { biomarker, urlMap } to GuildOS biomarker hydration when available.
 * Falls back to caller-provided Phase 1 assembly when offline / non-200.
 */
export async function postGuildOsBiomarkerHydrate(
  biomarker: string,
  urlMap: BiomarkerUrlMap,
): Promise<Record<string, unknown> | null> {
  const raw =
    process.env.BIOMARKER_HYDRATE_URL?.trim() ||
    process.env.GUILDOS_BIOMARKER_HYDRATE_URL?.trim() ||
    "http://127.0.0.1:3002/api/pg/biomarker-hydrate"
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch(raw, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ biomarker: biomarker.trim().toUpperCase(), urlMap }),
      signal: ctrl.signal,
      cache: "no-store",
    }).finally(() => clearTimeout(t))
    if (!res.ok) return null
    return (await res.json()) as Record<string, unknown>
  } catch {
    return null
  }
}
