import { fetchCatalogProducts } from "@/lib/catalog-products"
import { listProductsFromSupabase } from "@/lib/supabase/catalog"
import { ProductCatalog } from "./ProductCatalog"

type Props = {
  searchParams: Promise<{ q?: string; template?: string; category?: string }>
}

// ISR: PLP re-renders every 5 minutes per unique searchParams set
export const revalidate = 300

function supabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      (process.env.SUPABASE_SECRETE_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()),
  )
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q : ""
  const template = typeof params.template === "string" ? params.template : undefined
  const category = typeof params.category === "string" ? params.category : undefined

  // When ?template= or ?category= is set, query Supabase directly with the filter.
  // Otherwise use the existing fallback chain (Medusa → Supabase → seed).
  let products
  if ((template || category) && supabaseConfigured()) {
    products = await listProductsFromSupabase({ template, category, limit: 200 })
  } else {
    products = await fetchCatalogProducts()
  }

  // Schema.org/ItemList JSON-LD — helps Google understand category listings.
  const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://www.bosterbio.com"
  const itemListJsonLd = {
    "@context": "https://schema.org/",
    "@type": "ItemList",
    itemListElement: products.slice(0, 30).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        sku: p.catalog,
        url: `${SITE_ORIGIN}/products/${encodeURIComponent(p.catalog)}`,
        ...(p.imageUrl ? { image: p.imageUrl } : {}),
      },
    })),
  }

  return (
    <main id="main-content" className="min-h-[60vh] bg-brand-tint">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <ProductCatalog initialQuery={q} initialProducts={products} templateFilter={template} />
    </main>
  )
}
