import { Suspense } from "react"
import { fetchCatalogProducts } from "@/lib/catalog-products"
import { ProductCatalog } from "./ProductCatalog"

type Props = {
  searchParams: Promise<{ q?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q : ""
  const products = await fetchCatalogProducts()

  return (
    <main id="main-content" className="min-h-[60vh]">
      <Suspense fallback={<div className="container-content py-16 text-ink-secondary">Loading catalog…</div>}>
        <ProductCatalog initialQuery={q} initialProducts={products} />
      </Suspense>
    </main>
  )
}
