/**
 * Seeds the storefront featured antibody catalog into **Medusa** (local PostgreSQL).
 * Source: `src/data/featured-catalog.seed.json` (committed snapshot — not Supabase).
 *
 * From apps/api (Postgres + migrations + Medusa env required):
 *   pnpm exec medusa exec ./src/scripts/seed-featured-catalog.ts
 */
import * as fs from "node:fs"
import * as path from "node:path"
import { createProductsWorkflow } from "@medusajs/core-flows"
import { Modules } from "@medusajs/framework/utils"

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

function thumbUrl(imagePath: string | null): string | undefined {
  if (!imagePath?.trim()) return undefined
  const p = imagePath.startsWith("/") ? imagePath : `/${imagePath}`
  return `${MAGENTO_MEDIA_BASE}${p}`
}

function handleFromSku(sku: string): string {
  return sku
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "product"
}

export default async function seedFeaturedCatalog({ container }: { container: unknown }) {
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

  const file = path.join(__dirname, "../data/featured-catalog.seed.json")
  const raw = fs.readFileSync(file, "utf8")
  const rows = JSON.parse(raw) as SeedRow[]
  if (!Array.isArray(rows) || rows.length === 0) {
    console.log("[seed] Empty featured-catalog.seed.json")
    return
  }

  const workflowProducts = rows.map((r, index) => {
    const priceCents = Math.round(Math.max(Number(r.price) || 0, 0) * 100) || 100
    const thumb = thumbUrl(r.image_path)
    const metadata: Record<string, unknown> = {
      catalog_sku: r.catalog_sku,
      featured_rank: index,
      target: r.target,
      host: r.host,
      short_description: r.short_description,
      description: r.description,
      clone: r.clone,
      product_template: r.product_template,
      storage: r.storage,
      applications_json: JSON.stringify(r.applications ?? []),
      reactivity_json: JSON.stringify(r.reactivity ?? []),
      badges_json: JSON.stringify(r.badges ?? []),
      ...(r.image_path ? { image_path: r.image_path.startsWith("/") ? r.image_path : `/${r.image_path}` } : {}),
    }

    return {
      title: r.title,
      handle: handleFromSku(r.catalog_sku),
      status: "published" as const,
      ...(thumb ? { thumbnail: thumb } : {}),
      metadata,
      shipping_profile_id: shippingProfile.id,
      sales_channels: [{ id: salesChannel.id }],
      options: [{ title: "Default", values: ["Default"] }],
      variants: [
        {
          title: r.catalog_sku,
          sku: r.catalog_sku,
          options: { Default: "Default" },
          manage_inventory: false,
          prices: [{ amount: Math.max(priceCents, 1), currency_code: "usd" }],
        },
      ],
    }
  })

  const { result } = await createProductsWorkflow(container as never).run({
    input: { products: workflowProducts },
  })

  console.log(`[seed] Created ${result.length} featured catalog product(s) in Medusa.`)
  for (const p of result) {
    console.log(`  - ${p.title} (${p.id})`)
  }
}
