import { ProductCatalog } from "./ProductCatalog"

type Props = {
  searchParams: Promise<{ q?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q : ""

  return (
    <main id="main-content" className="min-h-[60vh]">
      <ProductCatalog initialQuery={q} />
    </main>
  )
}
