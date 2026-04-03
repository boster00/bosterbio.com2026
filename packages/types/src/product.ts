/**
 * Product types — shaped for life sciences / biotech catalog
 *
 * Medusa handles commerce (price, inventory, variants).
 * These types extend/complement Medusa's types with domain-specific fields.
 */

// Scientific variant dimensions specific to BosterBio's catalog
export type ProductApplication =
  | "WB"   // Western Blot
  | "IHC"  // Immunohistochemistry
  | "IF"   // Immunofluorescence
  | "ELISA"
  | "IP"   // Immunoprecipitation
  | "FC"   // Flow Cytometry
  | "ICC"  // Immunocytochemistry
  | "ChIP"
  | (string & {}) // allow custom values without losing autocomplete

export type ProductSpecies =
  | "Human"
  | "Mouse"
  | "Rat"
  | "Rabbit"
  | "Guinea Pig"
  | "Chicken"
  | (string & {})

export type ProductConjugation =
  | "Unconjugated"
  | "HRP"
  | "FITC"
  | "PE"
  | "APC"
  | "Biotin"
  | (string & {})

export type ProductClonality = "Monoclonal" | "Polyclonal" | (string & {})

export type ProductHostSpecies =
  | "Rabbit"
  | "Mouse"
  | "Goat"
  | "Sheep"
  | "Human"
  | (string & {})

// Core scientific metadata attached to every product
export interface ProductScientificMeta {
  reactivity: ProductSpecies[]
  applications: ProductApplication[]
  clonality?: ProductClonality
  clone?: string
  hostSpecies?: ProductHostSpecies
  conjugation?: ProductConjugation
  isotype?: string
  uniprotId?: string
  geneId?: string
  molecularWeight?: string
  purificationMethod?: string
  formulation?: string
  storageConditions?: string
}

export type ProductCategory =
  | "primary-antibody"
  | "secondary-antibody"
  | "elisa-kit"
  | "matched-antibody-pair"
  | "recombinant-protein"
  | "peptide"
  | "reagent"

// Lightweight product card type — used in listings and search results
export interface ProductSummary {
  id: string
  handle: string
  title: string
  catalogNumber: string
  category: ProductCategory
  thumbnail?: string
  priceFormatted?: string
  scientificMeta: Pick<ProductScientificMeta, "reactivity" | "applications">
}

// Full product detail — used on product detail pages
export interface ProductDetail extends ProductSummary {
  description: string
  scientificMeta: ProductScientificMeta
  variants: ProductVariant[]
  images: ProductImage[]
  documents?: ProductDocument[]
}

export interface ProductVariant {
  id: string
  title: string
  sku: string
  priceFormatted?: string
  inStock: boolean
  size?: string
}

export interface ProductImage {
  url: string
  alt?: string
}

export interface ProductDocument {
  type: "datasheet" | "sds" | "manual" | "certificate"
  label: string
  url: string
}
