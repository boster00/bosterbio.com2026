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
  formats: string[]
  badges: string[]
  storage: string | null
  /** Magento `template` column → Supabase `product_template`. */
  productTemplate: string
  /** Row-level JSON from migration (price ladder, conjugate, etc.). */
  metadata: Record<string, unknown> | null
}
