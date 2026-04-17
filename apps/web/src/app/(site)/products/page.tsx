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
    <main id="main-content" className="min-h-[60vh] bg-brand-tint">
      <ProductCatalog initialQuery={q} initialProducts={products} />
    </main>
  )
}
