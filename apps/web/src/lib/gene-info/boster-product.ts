import "server-only"

import { getPublicationsForProduct } from "@/lib/supabase/publications"
import { getAllImagesForProduct } from "@/lib/supabase/product-images"
import { supabaseService } from "@/lib/supabase/server"

export type SpotlightProduct = {
  sku: string
  handle: string
  title: string
  applications: string[]
  wbImageUrl: string | null
  ihcImageUrl: string | null
  wbAntibodyPath: string
  pubCount: string | null
  wbCitations: string | null
  assayApps: string | null
}

function normGene(g: string) {
  return g.trim().toUpperCase().replace(/[-_.\s]/g, "")
}

function targetMatches(rowGene: string | undefined, want: string): boolean {
  if (!rowGene) return false
  const a = rowGene.toUpperCase().replace(/[-_.\s]/g, "")
  const b = want.toUpperCase().replace(/[-_.\s]/g, "")
  return a === b || a.includes(b) || b.includes(a)
}

function scoreProduct(p: {
  applications: string[] | null
  target_info: { gene_name?: string } | null
  title: string
}, gene: string): number {
  let s = 0
  const apps = p.applications ?? []
  if (apps.some((a) => /western/i.test(a))) s += 5
  if (apps.some((a) => /wb/i.test(a))) s += 3
  if (apps.some((a) => /ihc/i.test(a))) s += 1
  if (targetMatches(p.target_info?.gene_name, gene)) s += 8
  if (p.title.toUpperCase().includes(gene.toUpperCase())) s += 2
  return s
}

async function pickImagesForSku(sku: string): Promise<{ wb: string | null; ihc: string | null }> {
  const imgs = await getAllImagesForProduct(sku)
  const urls = imgs.map((i) => i.image_url).filter(Boolean)
  const wb =
    imgs.find((i) => /western/i.test(i.alt_text ?? "") || /wb/i.test(i.alt_text ?? ""))?.image_url ??
    (urls[0] ?? null)
  const ihc =
    imgs.find((i) => /ihc/i.test(i.alt_text ?? ""))?.image_url ??
    (urls.length > 1 ? (urls[1] ?? null) : null)
  return { wb, ihc }
}

function hyphenVariant(compact: string): string[] {
  const out = new Set<string>([compact])
  const m = compact.match(/^([A-Z]+)(\d+)$/)
  if (m) out.add(`${m[1]}-${m[2]}`)
  return [...out]
}

/**
 * Choose a catalog antibody row to spotlight on the gene card (WB-forward).
 */
export async function findSpotlightProduct(gene: string): Promise<SpotlightProduct | null> {
  const sb = supabaseService()
  const compact = normGene(gene)
  if (!compact) return null

  const variantPatterns = hyphenVariant(compact)
  const orClause = variantPatterns.map((p) => `title.ilike.%${p}%`).join(",")

  const { data, error } = await sb
    .from("products")
    .select("id, sku, handle, title, applications, product_template, target_info, attr_1, attr_2, attr_3")
    .eq("status", "enabled")
    .eq("product_template", "antibodies")
    .or(orClause)
    .limit(120)

  if (error || !data?.length) return null

  const filtered = data.filter((row) => {
    const tg = (row.target_info as { gene_name?: string } | null)?.gene_name
    if (tg && targetMatches(tg, gene)) return true
    return row.title.toUpperCase().includes(compact)
  })

  const rows = filtered.length ? filtered : data
  const sorted = [...rows].sort((a, b) => scoreProduct(b, gene) - scoreProduct(a, gene))
  const top = sorted[0] as {
    sku: string
    handle: string
    title: string
    applications: string[] | null
    attr_1?: string | null
    attr_2?: string | null
    attr_3?: string | null
  }

  const { wb, ihc } = await pickImagesForSku(top.sku)
  const pubs = await getPublicationsForProduct(top.sku, 50)
  const pubCount = pubs.length ? String(pubs.length) : null

  const citeRaw = top.attr_1 ?? top.attr_2 ?? top.attr_3 ?? ""
  const citeDigits = citeRaw.match(/\d+/)
  const wbCitations = citeDigits ? citeDigits[0] : pubCount

  const apps = top.applications ?? []
  const assayApps = apps.slice(0, 6).join(", ")

  return {
    sku: top.sku,
    handle: top.handle,
    title: top.title,
    applications: apps,
    wbImageUrl: wb,
    ihcImageUrl: ihc,
    wbAntibodyPath: `/products/${encodeURIComponent(top.sku)}`,
    pubCount,
    wbCitations,
    assayApps: assayApps || null,
  }
}
