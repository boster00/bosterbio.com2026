import { Suspense } from "react"
import { fetchMedusaProductBySku, mergeMedusaIntoCatalog } from "@/lib/medusa-merge"
import { fetchCatalogProducts } from "@/lib/products-supabase"
import { ProductCatalog } from "./ProductCatalog"

type Props = {
  searchParams: Promise<{ q?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q : ""
  const products = await fetchCatalogProducts()
  const medusaRows = await Promise.all(products.map((p) => fetchMedusaProductBySku(p.catalog)))
  const medusaBySku = new Map(
    products.flatMap((p, i) => {
      const m = medusaRows[i]
      return m ? [[p.catalog.trim(), m] as const] : []
    }),
  )
  const merged = mergeMedusaIntoCatalog(products, medusaBySku)

  return (
    <main id="main-content" className="min-h-[60vh]">
      <Suspense fallback={<div className="container-content py-16 text-ink-secondary">Loading catalog…</div>}>
        <ProductCatalog initialQuery={q} initialProducts={merged} />
      </Suspense>
    </main>
  )
}
