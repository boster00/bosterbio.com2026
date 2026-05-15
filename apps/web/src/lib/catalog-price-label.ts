/**
 * USD list price for Supabase-backed catalog rows (Magento CSV `price` → list_price / metadata).
 * Returns an empty string when unknown so UIs can hide the block instead of "Contact for price".
 */
function coalesceNumber(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v) && v > 0) return v
  if (typeof v === "string") {
    const n = parseFloat(v.replace(/[^0-9.-]/g, ""))
    if (Number.isFinite(n) && n > 0) return n
  }
  return null
}

function priceFromMetadata(metadata: Record<string, unknown> | null | undefined): number | null {
  if (!metadata || typeof metadata !== "object") return null
  const keys = ["list_price_usd", "list_price", "price", "magento_price", "base_price"] as const
  for (const k of keys) {
    const n = coalesceNumber(metadata[k])
    if (n != null) return n
  }
  return null
}

export function formatCatalogPriceLabel(input: {
  listPrice?: number | null
  metadata?: Record<string, unknown> | null
}): string {
  const n = coalesceNumber(input.listPrice) ?? priceFromMetadata(input.metadata ?? null)
  if (n == null) return ""
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)
}
