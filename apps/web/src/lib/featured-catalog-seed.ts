import type { CatalogProduct } from "./catalog-product-types"
import seedJson from "../data/featured-catalog.seed.json"

const MAGENTO_MEDIA_BASE = "https://www.bosterbio.com/media/catalog/product"

type SeedRow = (typeof seedJson)[number] & { image_url?: string }

const SEED_ROWS = seedJson as SeedRow[]

export function buildMagentoImageUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`
  return `${MAGENTO_MEDIA_BASE}${p}`
}

function rowImageUrl(r: SeedRow): string | null {
  /** Prefer BosterBio CDN path (real catalog imagery); ignore decorative seed URLs. */
  const rel = typeof r.image_path === "string" ? r.image_path.trim() : ""
  if (rel) return buildMagentoImageUrl(rel)
  const direct = typeof r.image_url === "string" ? r.image_url.trim() : ""
  return direct || null
}

/** Offline / CI fallback — same shape as Medusa-backed `CatalogProduct`. */
export function seedRowsToCatalogProducts(): CatalogProduct[] {
  if (!Array.isArray(SEED_ROWS)) return []
  return SEED_ROWS.map((r) => ({
    id: `seed-${r.catalog_sku}`,
    catalog: r.catalog_sku,
    name: r.title,
    target: r.target || "—",
    host: r.host || "—",
    applications: Array.isArray(r.applications) ? r.applications : [],
    reactivity: Array.isArray(r.reactivity) ? r.reactivity : [],
    priceLabel: `$${Number(r.price).toFixed(2)}`,
    imageUrl: rowImageUrl(r),
    shortDescription: r.short_description || null,
    description: r.description || null,
    clone: r.clone ?? null,
    formats: Array.isArray(r.formats) ? r.formats : [],
    badges: Array.isArray(r.badges) ? r.badges : [],
    storage: r.storage || null,
  }))
}

export function seedCatalogProductBySku(sku: string): CatalogProduct | null {
  const key = sku.trim().toLowerCase()
  if (!key) return null
  return seedRowsToCatalogProducts().find((p) => p.catalog.toLowerCase() === key) ?? null
}
