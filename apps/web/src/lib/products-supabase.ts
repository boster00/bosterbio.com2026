import { supabase } from "./supabase"

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
}

type ProductRow = {
  id: string | number
  sku: string
  title: string
  host_species: string | null
  applications: string[] | null
  reactivity: string[] | null
  price: number | null
  target_info: unknown
}

type ImageRow = {
  product_id: string | number
  image_url: string
  position: number | null
}

function targetFromJson(info: unknown): string {
  if (info == null) return "—"
  if (typeof info === "string") return info || "—"
  if (typeof info === "object" && info !== null) {
    const o = info as Record<string, unknown>
    const gene = o.gene ?? o.target ?? o.symbol ?? o.name
    if (typeof gene === "string" && gene.trim()) return gene.trim()
  }
  return "—"
}

function priceLabel(price: number | null): string {
  if (price == null || Number.isNaN(Number(price))) return "Contact for price"
  return `$${Number(price).toFixed(2)}`
}

export function buildImageUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`
  return `${MAGENTO_MEDIA_BASE}${p}`
}

export async function fetchCatalogProducts(): Promise<CatalogProduct[]> {
  const { data: products, error: pErr } = await supabase
    .from("boster_products")
    .select("id, sku, title, host_species, applications, reactivity, price, target_info")
    .order("sku", { ascending: true })

  if (pErr) {
    console.error("[products] boster_products", pErr.message)
    return []
  }

  const rows = (products ?? []) as ProductRow[]
  if (rows.length === 0) return []

  const ids = rows.map((r) => String(r.id))

  const { data: images, error: iErr } = await supabase
    .from("boster_product_images")
    .select("product_id, image_url, position")
    .in("product_id", ids)
    .order("position", { ascending: true })

  if (iErr) {
    console.error("[products] boster_product_images", iErr.message)
  }

  const byProduct = new Map<string, ImageRow[]>()
  for (const img of (images ?? []) as ImageRow[]) {
    const pid = String(img.product_id)
    if (!byProduct.has(pid)) byProduct.set(pid, [])
    byProduct.get(pid)!.push(img)
  }

  return rows.map((r) => {
    const pid = String(r.id)
    const list = byProduct.get(pid) ?? []
    const first = list.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]
    const imageUrl = first?.image_url ? buildImageUrl(first.image_url) : null

    return {
      id: pid,
      catalog: r.sku,
      name: r.title,
      target: targetFromJson(r.target_info),
      host: r.host_species?.trim() || "—",
      applications: Array.isArray(r.applications) ? r.applications.filter(Boolean) : [],
      reactivity: Array.isArray(r.reactivity) ? r.reactivity.filter(Boolean) : [],
      priceLabel: priceLabel(r.price),
      imageUrl,
    }
  })
}
