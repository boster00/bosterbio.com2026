import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchMedusaProductBySku, mergeMedusaPrice } from "@/lib/medusa-merge"
import { fetchCatalogProductByCatalog } from "@/lib/products-supabase"

type Props = { params: Promise<{ catalog: string }> }

export default async function ProductDetailPage({ params }: Props) {
  const { catalog } = await params
  const decoded = decodeURIComponent(catalog)
  const product = await fetchCatalogProductByCatalog(decoded)
  if (!product) notFound()

  const medusaRow = await fetchMedusaProductBySku(product.catalog)
  const merged = mergeMedusaPrice(product, medusaRow)

  return (
    <main id="main-content" className="min-h-[60vh]">
      <div className="page-hero-bar border-b border-brand/10">
        <div className="container-content py-10 md:py-14">
          <nav className="text-sm text-ink-secondary" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/products" className="font-semibold text-accent hover:underline">
                  Catalog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-mono text-xs text-brand">{merged.catalog}</li>
            </ol>
          </nav>
          <h1 className="mt-4 max-w-4xl font-display text-display-md text-brand">{merged.name}</h1>
          <p className="mt-3 text-ink-secondary">
            Target <span className="font-semibold text-ink">{merged.target}</span> · Host{" "}
            <span className="font-semibold text-ink">{merged.host}</span>
          </p>
        </div>
      </div>

      <div className="container-content py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div className="rounded-2xl border-2 border-brand/10 bg-white p-6 shadow-card md:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Product image</p>
            <div className="relative mt-6 aspect-square w-full max-w-md overflow-hidden rounded-xl bg-brand-tint ring-1 ring-brand/10">
              {merged.imageUrl ? (
                <Image src={merged.imageUrl} alt="" fill className="object-contain p-6" sizes="(max-width: 1024px) 100vw, 400px" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-ink-tertiary">No image on file</div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border-2 border-brand/10 bg-white p-6 shadow-card md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-brand">Ordering</p>
              <p className="mt-4 text-3xl font-bold text-brand">{merged.priceLabel}</p>
              <p className="mt-2 text-sm text-ink-secondary">
                {medusaRow ? "Store price from Medusa when available; otherwise catalog list price." : "List price from catalog."}
              </p>
              <Link
                href={`/contact?product=${encodeURIComponent(merged.catalog)}`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-accent-hover md:w-auto"
              >
                Request quote
              </Link>
              <Link href="/products" className="mt-4 block text-center text-sm font-bold text-accent hover:underline md:text-left">
                ← Back to catalog
              </Link>
            </div>

            <div className="rounded-2xl border border-brand/10 bg-white p-6 md:p-8">
              <h2 className="font-display text-lg font-semibold text-brand">Applications</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {merged.applications.length ? (
                  merged.applications.map((app) => (
                    <li key={app} className="rounded-full border border-blue-100 bg-[#eff6ff] px-3 py-1 text-xs font-bold text-brand">
                      {app}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-ink-tertiary">Not specified</li>
                )}
              </ul>
              <h2 className="mt-8 font-display text-lg font-semibold text-brand">Reactivity</h2>
              <p className="mt-2 text-sm text-ink-secondary">
                {merged.reactivity.length ? merged.reactivity.join(", ") : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
