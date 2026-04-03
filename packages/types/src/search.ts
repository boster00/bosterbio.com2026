import type { ProductApplication, ProductCategory, ProductSpecies } from "./product"

// Algolia index record shape for BosterBio products
export interface ProductSearchRecord {
  objectID: string       // Medusa product ID
  handle: string
  title: string
  catalogNumber: string
  category: ProductCategory
  description: string
  reactivity: ProductSpecies[]
  applications: ProductApplication[]
  clonality?: string
  hostSpecies?: string
  conjugation?: string
  uniprotId?: string
  geneId?: string
  thumbnail?: string
  price?: number         // numeric for range filters
  inStock: boolean
}

export interface SearchFilters {
  category?: ProductCategory[]
  reactivity?: ProductSpecies[]
  applications?: ProductApplication[]
  clonality?: string[]
  hostSpecies?: string[]
  conjugation?: string[]
  inStock?: boolean
}
