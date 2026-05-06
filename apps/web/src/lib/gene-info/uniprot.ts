import "server-only"

const UA =
  "BosterBioStorefront/1.0 (https://www.bosterbio.com; gene-info migration; support@bosterbio.com)"

export type UniProtSearchHit = {
  primaryAccession: string
  uniProtkbId?: string
}

export async function searchHumanReviewedGene(geneSymbol: string): Promise<UniProtSearchHit | null> {
  const q = `(gene:${geneSymbol}) AND (reviewed:true) AND (organism_id:9606)`
  const url =
    `https://rest.uniprot.org/uniprotkb/search?` +
    new URLSearchParams({
      query: q,
      format: "json",
      size: "1",
    })
  const res = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": UA },
    next: { revalidate: 86400 },
  })
  if (!res.ok) return null
  const body = (await res.json()) as { results?: UniProtSearchHit[] }
  const hit = body.results?.[0]
  if (!hit?.primaryAccession) return null
  return hit
}

/** Resolve Ensembl gene ID (ENSG…) from UniProt cross-references. */
export function extractEnsemblGeneId(entry: UniProtEntryJson): string | null {
  const refs = entry.uniProtKBCrossReferences ?? []
  for (const r of refs) {
    if (r.database !== "Ensembl") continue
    for (const p of r.properties ?? []) {
      if (p.key === "GeneId" && typeof p.value === "string") {
        const id = p.value.replace(/\.\d+$/, "")
        if (id.startsWith("ENSG")) return id
      }
    }
  }
  return null
}

/** Minimal UniProt entry JSON surface used by our parsers (avoid importing huge generated types). */
export type UniProtEntryJson = {
  primaryAccession: string
  uniProtkbId?: string
  genes?: Array<{
    geneName?: { value?: string }
    synonyms?: Array<{ value?: string }>
  }>
  proteinDescription?: {
    recommendedName?: { fullName?: { value?: string } }
    alternativeNames?: Array<{ fullName?: { value?: string } }>
    contains?: Array<{ recommendedName?: { fullName?: { value?: string } } }>
  }
  comments?: Array<{
    commentType?: string
    texts?: Array<{ value?: string }>
    note?: { texts?: Array<{ value?: string }> }
    subcellularLocations?: Array<{ location?: { value?: string } }>
    isoforms?: unknown[]
    events?: string[]
  }>
  features?: Array<{
    type?: string
    description?: string
    location?: { start?: { value?: number }; end?: { value?: number } }
  }>
  keywords?: Array<{ id?: string; category?: string; name?: string }>
  uniProtKBCrossReferences?: Array<{
    database?: string
    id?: string
    properties?: Array<{ key?: string; value?: string }>
  }>
  sequence?: { length?: number; molWeight?: number }
}

export async function fetchUniProtEntry(accession: string): Promise<UniProtEntryJson | null> {
  const url = `https://rest.uniprot.org/uniprotkb/${encodeURIComponent(accession)}.json`
  const res = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": UA },
    next: { revalidate: 86400 },
  })
  if (!res.ok) return null
  return (await res.json()) as UniProtEntryJson
}

export function molWeightToKda(molWeight?: number): string {
  if (!molWeight || molWeight <= 0) return ""
  return (molWeight / 1000).toFixed(1)
}

export function extractFullName(entry: UniProtEntryJson): string {
  const rn = entry.proteinDescription?.recommendedName?.fullName?.value
  if (rn?.trim()) return rn.trim()
  const alt = entry.proteinDescription?.alternativeNames?.[0]?.fullName?.value
  if (alt?.trim()) return alt.trim()
  return entry.uniProtkbId?.replace(/_HUMAN$/i, "").replace(/_/g, " ") ?? ""
}

export function extractAliasesCsv(entry: UniProtEntryJson, primaryGene: string): string {
  const set = new Set<string>()
  const g = entry.genes?.[0]
  for (const s of g?.synonyms ?? []) {
    const v = s.value?.trim()
    if (v) set.add(v)
  }
  for (const an of entry.proteinDescription?.alternativeNames ?? []) {
    const v = an.fullName?.value?.trim()
    if (v) set.add(v)
  }
  set.delete(primaryGene)
  return [...set].slice(0, 12).join(", ")
}

export function extractIsoformCount(entry: UniProtEntryJson): string {
  const ap = entry.comments?.find((c) => c.commentType === "ALTERNATIVE PRODUCTS")
  const n = Array.isArray(ap?.isoforms) ? ap.isoforms.length : 0
  if (n > 0) return String(n)
  return "1"
}

export function extractLocalization(entry: UniProtEntryJson): string {
  const locs: string[] = []
  for (const c of entry.comments ?? []) {
    if (c.commentType !== "SUBCELLULAR LOCATION") continue
    for (const sl of c.subcellularLocations ?? []) {
      const v = sl.location?.value?.trim()
      if (v && !locs.includes(v)) locs.push(v)
      if (locs.length >= 4) break
    }
  }
  return locs.join(", ")
}

export function extractDomainsSummary(entry: UniProtEntryJson): string {
  const parts: string[] = []
  for (const f of entry.features ?? []) {
    if (f.type === "Region" && f.description) parts.push(f.description)
    if (f.type === "Domain" && f.description) parts.push(f.description)
    if (parts.length >= 4) break
  }
  if (parts.length) return [...new Set(parts)].join(", ")
  const ipr = entry.uniProtKBCrossReferences?.filter((r) => r.database === "InterPro") ?? []
  const names = ipr
    .slice(0, 3)
    .map((r) => r.id)
    .filter(Boolean) as string[]
  return names.join(", ")
}

export function extractSignalPeptide(entry: UniProtEntryJson): string {
  const sp = entry.features?.find((f) => f.type === "Signal")
  return sp ? "Yes (predicted / annotated)" : "No"
}

export function extractGlycosylation(entry: UniProtEntryJson): string {
  const n = entry.features?.filter((f) => f.type === "Glycosylation").length ?? 0
  if (n === 0) return "Not annotated"
  return `${n} reported site(s) (UniProt)`
}

export function extractSuperfamily(entry: UniProtEntryJson): string {
  const kws =
    entry.keywords
      ?.filter((k) => k.category === "PTM" || k.category === "Biological process")
      .map((k) => k.name)
      .filter(Boolean) ?? []
  if (kws.length) return kws.slice(0, 3).join(", ")
  const ipr = entry.uniProtKBCrossReferences?.find((r) => r.database === "InterPro")
  return ipr?.id ?? ""
}
