import type { CatalogProduct } from "./catalog-product-types"
import { medusa } from "./medusa"
import { seedCatalogProductBySku, seedRowsToCatalogProducts } from "./featured-catalog-seed"
import {
  listProductsFromSupabase,
  getProductFromSupabase,
} from "./supabase/catalog"
import { storefrontSupabaseConfigured } from "./supabase/server"

export type { CatalogProduct }

function supabaseConfigured(): boolean {
  return storefrontSupabaseConfigured()
}

const PRODUCT_LIST_FIELDS =
  "id,title,description,thumbnail,*images,*variants.calculated_price,*variants.prices,*variants.options,*options,*metadata"

function medusaConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.trim() && process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY?.trim())
}

function strMeta(meta: Record<string, unknown> | null | undefined, key: string): string {
  const v = meta?.[key]
  return typeof v === "string" ? v.trim() : ""
}

function arrMeta(meta: Record<string, unknown> | null | undefined, key: string): string[] {
  const v = meta?.[key]
  if (!Array.isArray(v)) return []
  return v.filter((x): x is string => typeof x === "string" && x.trim().length > 0)
}

function variantSku(p: Record<string, unknown>): string {
  const variants = p.variants as Record<string, unknown>[] | null | undefined
  const first = variants?.[0]
  const sku = first?.sku
  return typeof sku === "string" ? sku.trim() : ""
}

function resolveMedusaAssetUrl(raw: string): string {
  const u = raw.trim()
  if (u.startsWith("http://") || u.startsWith("https://")) return u
  const base = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace(/\/$/, "") ?? ""
  if (!base) return u
  return u.startsWith("/") ? `${base}${u}` : `${base}/${u}`
}

function firstImageUrl(p: Record<string, unknown>): string | null {
  const thumb = p.thumbnail
  if (typeof thumb === "string" && thumb.trim()) return resolveMedusaAssetUrl(thumb)
  const images = p.images as { url?: string }[] | null | undefined
  const u = images?.[0]?.url
  return typeof u === "string" && u.trim() ? resolveMedusaAssetUrl(u) : null
}

function priceLabelFromVariant(v: Record<string, unknown> | undefined): string {
  if (!v) return "Contact for price"
  const cp = v.calculated_price as { calculated_amount?: number; currency_code?: string } | undefined
  if (cp && typeof cp.calculated_amount === "number" && Number.isFinite(cp.calculated_amount)) {
    const cur = (cp.currency_code ?? "usd").toUpperCase()
    return `$${(cp.calculated_amount / 100).toFixed(2)}`
  }
  const prices = v.prices as { amount?: number; currency_code?: string }[] | undefined
  const amt = prices?.[0]?.amount
  if (typeof amt === "number" && Number.isFinite(amt)) {
    const cur = (prices?.[0]?.currency_code ?? "usd").toUpperCase()
    return `$${(amt / 100).toFixed(2)}`
  }
  return "Contact for price"
}

function formatsFromProduct(p: Record<string, unknown>): string[] {
  const options = p.options as { title?: string; values?: { value?: string }[] }[] | undefined
  const fmt = options?.find((o) => (o.title ?? "").toLowerCase().includes("format"))
  const vals = fmt?.values
  if (!vals?.length) return []
  return vals.map((x) => x.value).filter((x): x is string => Boolean(x?.trim()))
}

function productToCatalog(p: Record<string, unknown>): CatalogProduct {
  const meta = (p.metadata as Record<string, unknown> | null | undefined) ?? {}
  const catalog = strMeta(meta, "catalog_sku") || variantSku(p) || String(p.id)
  const target = strMeta(meta, "target") || "—"
  const host = strMeta(meta, "host_species") || strMeta(meta, "host") || "—"
  const applications = arrMeta(meta, "applications")
  const reactivity = arrMeta(meta, "reactivity")
  const variants = (p.variants as Record<string, unknown>[] | undefined) ?? []
  const firstVariant = variants[0]
  const priceLabel = priceLabelFromVariant(firstVariant)

  return {
    id: String(p.id),
    catalog,
    name: typeof p.title === "string" ? p.title : catalog,
    target,
    host,
    applications,
    reactivity,
    priceLabel,
    imageUrl: firstImageUrl(p),
    shortDescription: strMeta(meta, "short_description") || null,
    description: typeof p.description === "string" ? p.description : null,
    clone: strMeta(meta, "clone") || null,
    formats: formatsFromProduct(p),
    badges: arrMeta(meta, "badges"),
    storage: strMeta(meta, "storage") || null,
  }
}

function storeProductListQuery(extra?: { q?: string; limit?: number }) {
  const regionId = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID?.trim()
  return {
    limit: extra?.limit ?? 50,
    offset: 0,
    fields: PRODUCT_LIST_FIELDS,
    ...(regionId ? { region_id: regionId } : {}),
    ...(extra?.q ? { q: extra.q } : {}),
  }
}

export async function fetchCatalogProducts(): Promise<CatalogProduct[]> {
  const fromSeed = () => seedRowsToCatalogProducts()

  // Source priority: Medusa (live commerce) → Supabase (migrated catalog) → seed JSON.
  if (medusaConfigured()) {
    try {
      const { products } = await medusa.store.product.list(storeProductListQuery() as never)
      const list = (products ?? []) as unknown as Record<string, unknown>[]
      const mapped = list.map(productToCatalog).filter((x) => x.catalog)
      if (mapped.length) return mapped
      console.warn("[catalog] Medusa returned no products; falling through to Supabase")
    } catch (e) {
      console.error("[catalog] Medusa store.product.list failed; falling through to Supabase", e instanceof Error ? e.message : e)
    }
  }

  if (supabaseConfigured()) {
    try {
      const rows = await listProductsFromSupabase({ limit: 200 })
      if (rows.length) return rows
      console.warn("[catalog] Supabase returned no products; using seed fallback")
    } catch (e) {
      console.error("[catalog] Supabase list failed", e instanceof Error ? e.message : e)
    }
  }

  return fromSeed()
}

export async function fetchCatalogProductByCatalog(catalog: string): Promise<CatalogProduct | null> {
  const sku = catalog.trim()
  if (!sku) return null

  if (medusaConfigured()) {
    try {
      const { products } = await medusa.store.product.list(
        storeProductListQuery({ q: sku, limit: 40 }) as never,
      )
      const list = (products ?? []) as unknown as Record<string, unknown>[]
      const match =
        list.find((p) => {
          const meta = (p.metadata as Record<string, unknown> | null | undefined) ?? {}
          const ms = strMeta(meta, "catalog_sku")
          if (ms && ms.toLowerCase() === sku.toLowerCase()) return true
          return variantSku(p).toLowerCase() === sku.toLowerCase()
        }) ?? null

      if (match) return productToCatalog(match)
    } catch (e) {
      console.error("[catalog] Medusa PDP fetch failed; falling through to Supabase", e instanceof Error ? e.message : e)
    }
  }

  if (supabaseConfigured()) {
    try {
      const row = await getProductFromSupabase(sku)
      if (row) return row
    } catch (e) {
      console.error("[catalog] Supabase PDP fetch failed", e instanceof Error ? e.message : e)
    }
  }

  return seedCatalogProductBySku(sku)
}
