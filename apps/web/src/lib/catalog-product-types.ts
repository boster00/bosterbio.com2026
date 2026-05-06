export type CatalogProduct = {
  id: string
  catalog: string
  /** Magento `products.product_template` slug (e.g. antibodies, elisa-kits). */
  productTemplate: string
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
}
