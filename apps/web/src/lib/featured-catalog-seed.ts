import type { CatalogProduct } from "./catalog-products"
import seedJson from "../data/featured-catalog.seed.json"

const MAGENTO_MEDIA_BASE = "https://www.bosterbio.com/media/catalog/product"

type SeedRow = {
  catalog_sku: string
  title: string
  price: number
  target: string
  host: string
  applications: string[]
  reactivity: string[]
  short_description: string
  description: string
  clone: string
  product_template: string
  badges: string[]
  storage: string
  image_path: string | null
}

const SEED_ROWS = seedJson as SeedRow[]

function buildImageUrl(imagePath: string): string {
  const p = imagePath.startsWith("/") ? imagePath : `/${imagePath}`
  return `${MAGENTO_MEDIA_BASE}${p}`
}

/** Offline / CI fallback — same shape as Medusa-backed `CatalogProduct`. */
export function seedRowsToCatalogProducts(): CatalogProduct[] {
  if (!Array.isArray(SEED_ROWS)) return []
  return SEED_ROWS.map((r) => {
    const imageUrl = r.image_path?.trim() ? buildImageUrl(r.image_path.trim()) : null
    return {
      id: `seed-${r.catalog_sku}`,
      catalog: r.catalog_sku,
      name: r.title,
      target: r.target || "—",
      host: r.host || "—",
      applications: Array.isArray(r.applications) ? r.applications : [],
      reactivity: Array.isArray(r.reactivity) ? r.reactivity : [],
      priceLabel: `$${Number(r.price).toFixed(2)}`,
      imageUrl,
      shortDescription: r.short_description || null,
      description: r.description || null,
      clone: r.clone || null,
      productTemplate: r.product_template || null,
      badges: Array.isArray(r.badges) ? r.badges : [],
      storage: r.storage || null,
    }
  })
}

export function seedCatalogProductBySku(sku: string): CatalogProduct | null {
  const key = sku.trim().toLowerCase()
  if (!key) return null
  return seedRowsToCatalogProducts().find((p) => p.catalog.toLowerCase() === key) ?? null
}
