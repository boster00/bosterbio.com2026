import { CATALOG_FEATURED_LIMIT, CATALOG_SELECTION_SEED } from "./catalog-constants"
import { supabase } from "./supabase"

const MAGENTO_MEDIA_BASE = "https://www.bosterbio.com/media/catalog/product"

export type CatalogProduct = {
  id: string
  catalog: string
  name: string
  target: string
  host: string
  applications: string[]
  reactivity: string[]
  priceLabel: string
  imageUrl: string | null
}

type ProductRow = {
  id: string | number
  sku: string
  title: string
  host_species: string | null
  applications: string[] | null
  reactivity: string[] | null
  price: number | null
  target_info: unknown
}

type ImageRow = {
  product_id: string | number
  image_url: string
  position: number | null
}

function hashSeed(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function shuffleWithSeed<T>(arr: T[], seed: string): T[] {
  const out = Array.from(arr)
  let state = hashSeed(seed) || 1
  const rnd = () => {
    state = (Math.imul(state, 48271) + 0) % 0x7fffffff
    return state / 0x7fffffff
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    const tmp = out[i]!
    out[i] = out[j]!
    out[j] = tmp
  }
  return out
}

function targetFromJson(info: unknown): string {
  if (info == null) return "—"
  if (typeof info === "string") return info || "—"
  if (typeof info === "object" && info !== null) {
    const o = info as Record<string, unknown>
    const gene = o.gene ?? o.target ?? o.symbol ?? o.name
    if (typeof gene === "string" && gene.trim()) return gene.trim()
  }
  return "—"
}

function priceLabel(price: number | null): string {
  if (price == null || Number.isNaN(Number(price))) return "Contact for price"
  return `$${Number(price).toFixed(2)}`
}

export function buildImageUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`
  return `${MAGENTO_MEDIA_BASE}${p}`
}

function mapRowsToCatalog(rows: ProductRow[], images: ImageRow[] | null | undefined): CatalogProduct[] {
  const byProduct = new Map<string, ImageRow[]>()
  for (const img of images ?? []) {
    const pid = String(img.product_id)
    if (!byProduct.has(pid)) byProduct.set(pid, [])
    byProduct.get(pid)!.push(img)
  }

  return rows.map((r) => {
    const pid = String(r.id)
    const list = byProduct.get(pid) ?? []
    const first = [...list].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]
    const imageUrl = first?.image_url ? buildImageUrl(first.image_url) : null

    return {
      id: pid,
      catalog: r.sku,
      name: r.title,
      target: targetFromJson(r.target_info),
      host: r.host_species?.trim() || "—",
      applications: Array.isArray(r.applications) ? r.applications.filter(Boolean) : [],
      reactivity: Array.isArray(r.reactivity) ? r.reactivity.filter(Boolean) : [],
      priceLabel: priceLabel(r.price),
      imageUrl,
    }
  })
}

/**
 * Featured subset of `boster_products` — deterministic slice for the storefront PLP (same SKUs can be mirrored into Medusa for commerce).
 */
export async function fetchFeaturedCatalogProducts(
  limit = CATALOG_FEATURED_LIMIT,
  seed = CATALOG_SELECTION_SEED,
): Promise<CatalogProduct[]> {
  const { data: idRows, error: idErr } = await supabase
    .from("boster_products")
    .select("id, sku")
    .order("sku", { ascending: true })

  if (idErr) {
    console.error("[products] boster_products ids", idErr.message)
    return []
  }

  const rawIds = Array.isArray(idRows) ? idRows : []
  const minimal = (rawIds as { id?: string | number; sku?: string }[]).filter(
    (r): r is { id: string | number; sku: string } =>
      r != null && r.id != null && r.sku != null && String(r.sku).trim() !== "",
  )
  if (minimal.length === 0) return []

  const picked = shuffleWithSeed(minimal, seed)
    .slice(0, limit)
    .filter((r): r is { id: string | number; sku: string } => r != null && r.id != null && String(r.sku).trim() !== "")
  if (picked.length === 0) return []

  const ids = picked.map((r) => String(r.id))

  const { data: products, error: pErr } = await supabase
    .from("boster_products")
    .select("id, sku, title, host_species, applications, reactivity, price, target_info")
    .in("id", ids)

  if (pErr) {
    console.error("[products] boster_products", pErr.message)
    return []
  }

  const rows = (products ?? []) as ProductRow[]
  const order = new Map(ids.map((id, i) => [id, i]))
  rows.sort((a, b) => (order.get(String(a.id)) ?? 0) - (order.get(String(b.id)) ?? 0))

  const { data: imageRows, error: iErr } = await supabase
    .from("boster_product_images")
    .select("product_id, image_url, position")
    .in("product_id", ids)
    .order("position", { ascending: true })

  if (iErr) {
    console.error("[products] boster_product_images", iErr.message)
  }

  return mapRowsToCatalog(rows, (imageRows ?? []) as ImageRow[])
}

export async function fetchCatalogProducts(): Promise<CatalogProduct[]> {
  return fetchFeaturedCatalogProducts()
}

export async function fetchCatalogProductByCatalog(catalog: string): Promise<CatalogProduct | null> {
  const { data: row, error } = await supabase
    .from("boster_products")
    .select("id, sku, title, host_species, applications, reactivity, price, target_info")
    .eq("sku", catalog)
    .maybeSingle()

  if (error) {
    console.error("[products] fetch by sku", error.message)
    return null
  }
  if (!row) return null

  const r = row as ProductRow
  const pid = String(r.id)

  const { data: imgs, error: iErr } = await supabase
    .from("boster_product_images")
    .select("product_id, image_url, position")
    .eq("product_id", pid)
    .order("position", { ascending: true })

  if (iErr) {
    console.error("[products] images", iErr.message)
  }

  const [one] = mapRowsToCatalog([r], (imgs ?? []) as ImageRow[])
  return one ?? null
}

/** Minimal rows for Medusa seed (same selection as storefront). */
export async function fetchFeaturedProductRowsForSeed(
  limit = CATALOG_FEATURED_LIMIT,
  seed = CATALOG_SELECTION_SEED,
): Promise<ProductRow[]> {
  const { data: idRows, error: idErr } = await supabase
    .from("boster_products")
    .select("id, sku")
    .order("sku", { ascending: true })

  if (idErr) {
    console.error("[seed] boster_products", idErr.message)
    return []
  }

  const rawIds = Array.isArray(idRows) ? idRows : []
  const minimal = (rawIds as { id?: string | number; sku?: string }[]).filter(
    (r): r is { id: string | number; sku: string } =>
      r != null && r.id != null && r.sku != null && String(r.sku).trim() !== "",
  )
  if (minimal.length === 0) return []

  const picked = shuffleWithSeed(minimal, seed)
    .slice(0, limit)
    .filter((r): r is { id: string | number; sku: string } => r != null && r.id != null)
  if (picked.length === 0) return []

  const ids = picked.map((r) => String(r.id))

  const { data: products, error: pErr } = await supabase
    .from("boster_products")
    .select("id, sku, title, host_species, applications, reactivity, price, target_info")
    .in("id", ids)

  if (pErr || !products?.length) {
    if (pErr) console.error("[seed] boster_products full", pErr.message)
    return []
  }

  const rows = products as ProductRow[]
  const order = new Map(ids.map((id, i) => [id, i]))
  rows.sort((a, b) => (order.get(String(a.id)) ?? 0) - (order.get(String(b.id)) ?? 0))
  return rows
}
