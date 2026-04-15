import { CATALOG_FEATURED_LIMIT } from "./catalog-constants"
import { medusa } from "./medusa"

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
  shortDescription: string | null
  description: string | null
  clone: string | null
  productTemplate: string | null
  badges: string[]
  storage: string | null
}

function strMeta(m: Record<string, unknown> | null | undefined, key: string): string | null {
  if (!m) return null
  const v = m[key]
  if (typeof v === "string" && v.trim()) return v.trim()
  if (typeof v === "number") return String(v)
  return null
}

function parseJsonArray(raw: string | null): string[] {
  if (!raw) return []
  try {
    const p = JSON.parse(raw) as unknown
    if (Array.isArray(p)) return p.filter((x): x is string => typeof x === "string" && x.trim() !== "")
  } catch {
    /* ignore */
  }
  return []
}

function buildImageUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`
  return `${MAGENTO_MEDIA_BASE}${p}`
}

function metaImageUrl(m: Record<string, unknown> | null | undefined): string | null {
  const direct = strMeta(m, "image_url")
  if (direct?.startsWith("http")) return direct
  const path = strMeta(m, "image_path")
  if (path) return buildImageUrl(path)
  return null
}

function variantSku(p: Record<string, unknown>): string {
  const variants = p.variants
  if (!Array.isArray(variants) || variants.length === 0) return ""
  const v0 = variants[0] as Record<string, unknown>
  return typeof v0.sku === "string" ? v0.sku.trim() : ""
}

function priceFromProduct(p: Record<string, unknown>): { amount: number | null; currency: string | null } {
  const variants = p.variants
  if (!Array.isArray(variants) || variants.length === 0) return { amount: null, currency: null }
  let best: number | null = null
  let currency: string | null = null
  for (const v of variants) {
    if (!v || typeof v !== "object") continue
    const vo = v as Record<string, unknown>
    const cp = vo.calculated_price
    if (typeof cp === "object" && cp !== null) {
      const cpo = cp as Record<string, unknown>
      const raw = cpo.calculated_amount
      const cur = cpo.currency_code
      if (typeof raw === "number" && !Number.isNaN(raw)) {
        const major = raw / 100
        if (best == null || major < best) {
          best = major
          currency = typeof cur === "string" ? cur : null
        }
      }
    }
    const pl = vo.prices
    if (Array.isArray(pl)) {
      for (const pr of pl) {
        if (!pr || typeof pr !== "object") continue
        const pro = pr as Record<string, unknown>
        const amt = pro.amount
        const cur = pro.currency_code
        if (typeof amt === "number" && !Number.isNaN(amt)) {
          const major = amt / 100
          if (best == null || major < best) {
            best = major
            currency = typeof cur === "string" ? cur : null
          }
        }
      }
    }
  }
  return { amount: best, currency }
}

function priceLabel(amount: number | null, currency: string | null): string {
  if (amount == null || Number.isNaN(amount)) return "Contact for price"
  const cur = (currency ?? "usd").toUpperCase()
  return cur === "USD" ? `$${amount.toFixed(2)}` : `${amount.toFixed(2)} ${cur}`
}

function productToCatalog(p: Record<string, unknown>): CatalogProduct | null {
  const meta = (p.metadata as Record<string, unknown> | null | undefined) ?? undefined
  const sku = strMeta(meta, "catalog_sku") || variantSku(p)
  if (!sku) return null

  const appsRaw = strMeta(meta, "applications_json")
  const reactRaw = strMeta(meta, "reactivity_json")
  const badgesRaw = strMeta(meta, "badges_json")

  const { amount, currency } = priceFromProduct(p)

  const thumb = typeof p.thumbnail === "string" && p.thumbnail.startsWith("http") ? p.thumbnail : metaImageUrl(meta)

  return {
    id: String(p.id ?? sku),
    catalog: sku,
    name: String(p.title ?? sku),
    target: strMeta(meta, "target") || "—",
    host: strMeta(meta, "host") || "—",
    applications: appsRaw ? parseJsonArray(appsRaw) : [],
    reactivity: reactRaw ? parseJsonArray(reactRaw) : [],
    priceLabel: priceLabel(amount, currency),
    imageUrl: thumb,
    shortDescription: strMeta(meta, "short_description"),
    description: strMeta(meta, "description"),
    clone: strMeta(meta, "clone"),
    productTemplate: strMeta(meta, "product_template"),
    badges: badgesRaw ? parseJsonArray(badgesRaw) : [],
    storage: strMeta(meta, "storage"),
  }
}

function medusaConfigured(): boolean {
  const base = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
  return Boolean(base && !base.includes("REDACTED"))
}

/**
 * Featured PLP products from **Medusa** (local PostgreSQL). Expects seed/metadata:
 * `featured_rank` (0..n), `catalog_sku`, optional scientific fields in metadata.
 */
export async function fetchFeaturedCatalogProducts(limit = CATALOG_FEATURED_LIMIT): Promise<CatalogProduct[]> {
  if (!medusaConfigured()) {
    console.warn("[catalog] NEXT_PUBLIC_MEDUSA_BACKEND_URL not set; returning empty catalog")
    return []
  }

  try {
    const { products } = await medusa.store.product.list({
      limit: 100,
      fields: "+metadata,+thumbnail,+variants.*,+variants.calculated_price,+variants.prices.*",
    } as Record<string, unknown>)

    const rows = (products ?? []) as unknown as Record<string, unknown>[]
    const withMeta = rows
      .map((p) => {
        const meta = (p.metadata as Record<string, unknown> | null | undefined) ?? {}
        const rankRaw = meta.featured_rank
        const rank = typeof rankRaw === "number" ? rankRaw : typeof rankRaw === "string" ? Number(rankRaw) : NaN
        const cat = productToCatalog(p)
        return { cat, rank: Number.isFinite(rank) ? rank : 9999 }
      })
      .filter((x): x is { cat: CatalogProduct; rank: number } => x.cat != null)
      .sort((a, b) => a.rank - b.rank || a.cat.catalog.localeCompare(b.cat.catalog))

    const featured = withMeta.filter((x) => x.rank < 9000).slice(0, limit)
    if (featured.length) return featured.map((x) => x.cat)

    return withMeta.slice(0, limit).map((x) => x.cat)
  } catch (e) {
    console.error("[catalog] Medusa store.product.list failed", e instanceof Error ? e.message : e)
    return []
  }
}

export async function fetchCatalogProducts(): Promise<CatalogProduct[]> {
  return fetchFeaturedCatalogProducts()
}

export async function fetchCatalogProductByCatalog(catalog: string): Promise<CatalogProduct | null> {
  if (!medusaConfigured()) return null
  const sku = catalog.trim()
  if (!sku) return null

  try {
    const { products } = await medusa.store.product.list({
      q: sku,
      limit: 40,
      fields: "+metadata,+thumbnail,+variants.*,+variants.calculated_price,+variants.prices.*",
    } as Record<string, unknown>)

    const list = (products ?? []) as unknown as Record<string, unknown>[]
    const match =
      list.find((p) => {
        const meta = (p.metadata as Record<string, unknown> | null | undefined) ?? {}
        const ms = strMeta(meta, "catalog_sku")
        if (ms && ms.toLowerCase() === sku.toLowerCase()) return true
        return variantSku(p).toLowerCase() === sku.toLowerCase()
      }) ?? null

    if (!match) return null
    return productToCatalog(match)
  } catch (e) {
    console.error("[catalog] PDP fetch failed", e instanceof Error ? e.message : e)
    return null
  }
}
