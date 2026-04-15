/**
 * Seeds Medusa with five antibodies from Supabase `boster_products` (same deterministic slice as the storefront).
 *
 * Run from apps/api (requires DATABASE_URL and a running DB with migrations):
 *   pnpm exec medusa exec ./src/scripts/seed-boster-featured.ts
 *
 * Env: SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL, SUPABASE_ANON_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
import { createProductsWorkflow } from "@medusajs/core-flows"
import { Modules } from "@medusajs/framework/utils"

const SEED = "4678cf8b-3ee1-434c-adac-e177d7d36d17"
const LIMIT = 5

function hashSeed(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function shuffleWithSeed<T>(arr: T[], seed: string): T[] {
  const out = [...arr]
  let state = hashSeed(seed) || 1
  const rnd = () => {
    state = (Math.imul(state, 48271) + 0) % 0x7fffffff
    return state / 0x7fffffff
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    const tmp = out[i]!
    out[i] = out[j]!
    out[j] = tmp
  }
  return out
}

type MinimalRow = { id: string | number; sku: string }
type ProductRow = {
  id: string | number
  sku: string
  title: string
  price: number | null
}

async function supabaseFetch<T>(path: string): Promise<T> {
  const base = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!base || !key) {
    throw new Error("Missing SUPABASE_URL and SUPABASE_ANON_KEY (or NEXT_PUBLIC_*) for seed script.")
  }
  const res = await fetch(`${base.replace(/\/$/, "")}/rest/v1/${path}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
    },
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`Supabase ${path}: ${res.status} ${t}`)
  }
  return res.json() as Promise<T>
}

export default async function seedFeatured({ container }: { container: unknown }) {
  const c = container as {
    resolve: (key: string) => {
      listSalesChannels: (a: unknown, b: unknown) => Promise<{ id: string }[]>
      listShippingProfiles: (a: unknown, b: unknown) => Promise<{ id: string }[]>
    }
  }

  const sales = c.resolve(Modules.SALES_CHANNEL)
  const fulfillment = c.resolve(Modules.FULFILLMENT)

  const [salesChannel] = await sales.listSalesChannels({}, { take: 1 })
  const [shippingProfile] = await fulfillment.listShippingProfiles({}, { take: 1 })

  if (!salesChannel?.id) {
    throw new Error("No sales channel found. Run Medusa DB setup / migrations first.")
  }
  if (!shippingProfile?.id) {
    throw new Error("No shipping profile found. Run Medusa DB setup / migrations first.")
  }

  const idRows = await supabaseFetch<MinimalRow[]>("boster_products?select=id,sku&order=sku.asc")
  const clean = idRows.filter((r) => r != null && r.id != null && r.sku != null && String(r.sku).trim() !== "")
  if (!clean.length) {
    console.log("[seed] No rows in boster_products; nothing to seed.")
    return
  }

  const picked = shuffleWithSeed(clean, SEED).slice(0, LIMIT)
  const ids = picked.map((r) => r.id).join(",")
  const products = await supabaseFetch<ProductRow[]>(
    `boster_products?select=id,sku,title,price&id=in.(${ids})`,
  )

  const order = new Map(picked.map((p, i) => [String(p.id), i]))
  const rows = [...products].sort((a, b) => (order.get(String(a.id)) ?? 0) - (order.get(String(b.id)) ?? 0))

  const workflowProducts = rows.map((r) => {
    const priceUsd = r.price != null && !Number.isNaN(Number(r.price)) ? Math.round(Number(r.price) * 100) : 999
    return {
      title: r.title,
      handle: r.sku.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `sku-${r.id}`,
      status: "published" as const,
      shipping_profile_id: shippingProfile.id,
      sales_channels: [{ id: salesChannel.id }],
      options: [{ title: "Default", values: ["Default"] }],
      variants: [
        {
          title: r.sku,
          sku: r.sku,
          options: { Default: "Default" },
          manage_inventory: false,
          prices: [{ amount: Math.max(priceUsd, 1), currency_code: "usd" }],
        },
      ],
    }
  })

  const { result } = await createProductsWorkflow(container as never).run({
    input: { products: workflowProducts },
  })

  console.log(`[seed] Created ${result.length} Medusa product(s) from boster_products.`)
  for (const p of result) {
    console.log(`  - ${p.title} (${p.id})`)
  }
}
