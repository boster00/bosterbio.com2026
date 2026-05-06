import "server-only"

const UA =
  "BosterBioStorefront/1.0 (https://www.bosterbio.com; gene-info migration; support@bosterbio.com)"

export type HpaJson = Record<string, unknown>

export async function fetchProteinAtlasJson(ensemblGeneId: string): Promise<HpaJson | null> {
  const id = ensemblGeneId.replace(/\.\d+$/, "")
  const url = `https://www.proteinatlas.org/${encodeURIComponent(id)}.json`
  const res = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": UA },
    next: { revalidate: 86400 },
  })
  if (!res.ok) return null
  return (await res.json()) as HpaJson
}

type TissueBuckets = { high: string; med: string; low: string }

function asTpmMap(j: HpaJson): Record<string, number> {
  const raw = j["RNA tissue specific nTPM"] as Record<string, string | number> | undefined
  if (!raw || typeof raw !== "object") return {}
  const out: Record<string, number> = {}
  for (const [k, v] of Object.entries(raw)) {
    const n = typeof v === "number" ? v : parseFloat(String(v).replace(/,/g, ""))
    if (Number.isFinite(n) && n > 0) out[k] = n
  }
  return out
}

/** Split tissues into high / medium / low groups by nTPM rank. */
export function bucketTissuesFromHpa(j: HpaJson): TissueBuckets {
  const m = asTpmMap(j)
  const items = Object.entries(m).sort((a, b) => b[1] - a[1])
  if (items.length === 0) {
    return { high: "", med: "", low: "" }
  }
  if (items.length === 1) {
    const row = items[0]
    return { high: row ? row[0] : "", med: "", low: "" }
  }
  if (items.length === 2) {
    const a = items[0]
    const b = items[1]
    return { high: a ? a[0] : "", med: b ? b[0] : "", low: "" }
  }
  const n = items.length
  const i1 = Math.max(1, Math.ceil(n / 3))
  const i2 = Math.max(i1 + 1, Math.ceil((2 * n) / 3))
  const high = items.slice(0, i1).map(([t]) => t)
  const med = items.slice(i1, i2).map(([t]) => t)
  const low = items.slice(i2).map(([t]) => t)
  return {
    high: high.join(", "),
    med: med.join(", "),
    low: low.join(", "),
  }
}

export function hpaSummaryLines(j: HpaJson): string[] {
  const pick = (k: string) => {
    const v = j[k]
    if (typeof v === "string" && v.trim()) return `${k}: ${v.trim()}`
    return null
  }
  return [
    pick("RNA tissue specificity"),
    pick("RNA tissue distribution"),
    pick("RNA tissue specificity score"),
  ].filter(Boolean) as string[]
}
