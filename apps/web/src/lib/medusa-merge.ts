import { medusa } from "./medusa"

export type MedusaProductSummary = {
  id: string
  title: string
  handle?: string | null
  thumbnail?: string | null
  priceFromMajor?: number | null
  currencyCode?: string | null
}

function variantSkuMatch(p: Record<string, unknown>, sku: string): boolean {
  const norm = sku.trim().toLowerCase()
  const variants = p.variants
  if (!Array.isArray(variants)) return false
  for (const v of variants) {
    if (!v || typeof v !== "object") continue
    const vo = v as Record<string, unknown>
    const vsku = typeof vo.sku === "string" ? vo.sku.trim().toLowerCase() : ""
    if (vsku && vsku === norm) return true
  }
  return false
}

function pickPriceFromProduct(p: Record<string, unknown>): { amount: number | null; currency: string | null } {
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

function productToSummary(p: Record<string, unknown>): MedusaProductSummary {
  const { amount, currency } = pickPriceFromProduct(p)
  return {
    id: String(p.id ?? ""),
    title: String(p.title ?? ""),
    handle: (p.handle as string) ?? null,
    thumbnail: (p.thumbnail as string) ?? null,
    priceFromMajor: amount,
    currencyCode: currency,
  }
}

export async function fetchMedusaProductBySku(catalogSku: string): Promise<MedusaProductSummary | null> {
  const base = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
  if (!base || base.includes("REDACTED")) return null

  const sku = catalogSku.trim()
  if (!sku) return null

  try {
    const { products } = await medusa.store.product.list({
      q: sku,
      limit: 25,
      fields: "+variants.*,+variants.calculated_price,+variants.prices.*",
    } as Record<string, unknown>)

    const list = (products ?? []) as unknown as Record<string, unknown>[]
    const match =
      list.find((p) => variantSkuMatch(p, sku)) ??
      list.find((p) => String(p.handle ?? "").toLowerCase() === sku.toLowerCase()) ??
      list[0]

    if (!match) return null
    return productToSummary(match)
  } catch (e) {
    console.warn("[medusa] product lookup failed", e instanceof Error ? e.message : e)
    return null
  }
}

export function mergeMedusaPrice<T extends { catalog: string; priceLabel: string }>(item: T, medusa: MedusaProductSummary | null): T {
  if (!medusa?.priceFromMajor) return item
  const cur = (medusa.currencyCode ?? "usd").toUpperCase()
  const label = cur === "USD" ? `$${medusa.priceFromMajor.toFixed(2)}` : `${medusa.priceFromMajor.toFixed(2)} ${cur}`
  return { ...item, priceLabel: label }
}

export function mergeMedusaIntoCatalog<T extends { catalog: string; priceLabel: string }>(
  items: T[],
  medusaBySku: Map<string, MedusaProductSummary>,
): T[] {
  return items.map((item) => {
    const m = medusaBySku.get(item.catalog.trim())
    return mergeMedusaPrice(item, m ?? null)
  })
}
