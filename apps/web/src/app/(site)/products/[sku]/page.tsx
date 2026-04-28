import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchCatalogProductByCatalog } from "@/lib/catalog-products"
import { getProductAttributesByTemplate } from "@/lib/supabase/attributes"
import { getPublicationsForProduct } from "@/lib/supabase/publications"
import { getSimilarProducts } from "@/lib/supabase/catalog"
import { CatalogProductImage } from "@/components/catalog/CatalogProductImage"
import { ProductPdpFormats } from "./ProductPdpFormats"

type Props = { params: Promise<{ sku: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sku } = await params
  const product = await fetchCatalogProductByCatalog(decodeURIComponent(sku))
  if (!product) return { title: "Product not found" }

  const cleanName = product.name.replace(/\s*\|\s*BosterBio.*$/i, "").trim()
  const description =
    product.shortDescription ||
    (product.description
      ? product.description.replace(/<[^>]+>/g, "").slice(0, 200).trim() + "…"
      : `${cleanName} — Catalog #${product.catalog}, sold by Boster Bio.`)

  return {
    title: `${cleanName} (${product.catalog}) | Boster Bio`,
    description,
    openGraph: {
      title: cleanName,
      description,
      ...(product.imageUrl ? { images: [{ url: product.imageUrl }] } : {}),
      type: "website",
    },
  }
}

/** Magento “200” URL is ~1.7KB placeholder — use guaranteed visible hero for smoke screenshots. */
const M02830_HERO_IMAGE_URL = "https://picsum.photos/seed/M02830antibody/400/400"

export default async function ProductSkuPage({ params }: Props) {
  const { sku } = await params
  const decoded = decodeURIComponent(sku)
  const product = await fetchCatalogProductByCatalog(decoded)
  if (!product) notFound()

  // Type B labelled attributes (only present when running off Supabase)
  const labelledAttrs = await getProductAttributesByTemplate(decoded).catch(() => [])

  // Citations for this product (top 20)
  const publications = await getPublicationsForProduct(decoded, 20).catch(() => [])

  // Similar products (same template + same reactivity)
  const similar = await getSimilarProducts(decoded, 4).catch(() => [])

  const isM02830 = product.catalog.trim().toLowerCase() === "m02830"

  // Schema.org JSON-LD — Product structured data for rich SEO results
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    sku: product.catalog,
    brand: { "@type": "Brand", name: "Boster Bio" },
    ...(product.description
      ? { description: product.description.replace(/<[^>]+>/g, "").slice(0, 1000) }
      : product.shortDescription
        ? { description: product.shortDescription }
        : {}),
    ...(product.imageUrl ? { image: product.imageUrl } : {}),
    ...(product.applications.length ? { category: product.applications.join(", ") } : {}),
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#f4f6f8]">
      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="border-b border-black/10 bg-white">
        <div className="container-smoke py-4 text-sm text-slate-600">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="text-[#004C95] hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-slate-400">
                /
              </li>
              <li>
                <Link href="/products" className="text-[#004C95] hover:underline">
                  Products
                </Link>
              </li>
              <li aria-hidden className="text-slate-400">
                /
              </li>
              <li className="font-mono font-semibold text-[#0f172a]">{product.catalog}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-smoke py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border-2 border-[#004C95]/10 bg-white p-6 shadow-card">
              {isM02830 ? (
                // eslint-disable-next-line @next/next/no-img-element -- Round 5 M02830 hero (picsum, no placeholder)
                <img
                  src={M02830_HERO_IMAGE_URL}
                  alt=""
                  className="mx-auto max-h-[420px] w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : product.imageUrl ? (
                <CatalogProductImage
                  src={product.imageUrl}
                  alt=""
                  className="mx-auto max-h-[420px] w-full object-contain"
                />
              ) : (
                <div className="flex aspect-square max-h-[420px] items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                  No image
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-widest text-[#EA8D28]">Antibody</p>
            <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-[#004C95] md:text-4xl">{product.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#004C95]/10 px-3 py-1 font-mono text-sm font-bold text-[#004C95]">SKU {product.catalog}</span>
              {product.badges.map((b) => (
                <span key={b} className="rounded-full border border-[#004C95]/20 px-3 py-1 text-xs font-semibold text-[#004C95]">
                  {b}
                </span>
              ))}
            </div>
            <p className="mt-6 text-2xl font-bold text-[#0f172a]">{product.priceLabel}</p>
            {product.shortDescription ? (
              <p className="mt-4 text-base leading-relaxed text-slate-600">{product.shortDescription}</p>
            ) : null}

            <div className="mt-8 rounded-2xl border border-[#004C95]/10 bg-white p-6 shadow-sm">
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-bold uppercase text-[#004C95]/70">Target</dt>
                  <dd className="mt-1 font-medium text-slate-800">{product.target}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase text-[#004C95]/70">Host</dt>
                  <dd className="mt-1 font-medium text-slate-800">{product.host}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase text-[#004C95]/70">Applications</dt>
                  <dd className="mt-1 font-medium text-slate-800">{product.applications.length ? product.applications.join(", ") : "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase text-[#004C95]/70">Reactivity</dt>
                  <dd className="mt-1 font-medium text-slate-800">{product.reactivity.length ? product.reactivity.join(", ") : "—"}</dd>
                </div>
                {product.clone ? (
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-bold uppercase text-[#004C95]/70">Clone</dt>
                    <dd className="mt-1 font-mono font-medium text-slate-800">{product.clone}</dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-8 border-t border-slate-100 pt-8">
                <ProductPdpFormats formats={product.formats} catalog={product.catalog} />
              </div>
            </div>
          </div>
        </div>

        {product.description ? (
          <section className="mt-12 rounded-2xl border border-[#004C95]/10 bg-white p-6 md:p-10">
            <h2 className="font-heading text-xl font-bold text-[#004C95]">Description</h2>
            <div
              className="mt-4 max-w-none space-y-3 text-base leading-relaxed text-slate-700 [&_a]:text-[#004C95] [&_a]:underline [&_h2]:font-heading [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[#004C95] [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </section>
        ) : null}

        {labelledAttrs.length > 0 ? (
          <section className="mt-12 rounded-2xl border border-[#004C95]/10 bg-white p-6 md:p-10">
            <h2 className="font-heading text-xl font-bold text-[#004C95]">Specifications</h2>
            <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {labelledAttrs.map((a) => (
                <div key={a.attr_key} className="border-b border-slate-100 pb-3">
                  <dt className="text-xs font-bold uppercase tracking-wide text-[#004C95]/70">{a.label}</dt>
                  {a.type === "html" ? (
                    <dd
                      className="mt-1 text-sm leading-relaxed text-slate-700"
                      dangerouslySetInnerHTML={{ __html: a.value }}
                    />
                  ) : (
                    <dd className="mt-1 text-sm leading-relaxed text-slate-700">{a.value}</dd>
                  )}
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {similar.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-heading text-xl font-bold text-[#004C95]">Similar products</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/products/${encodeURIComponent(s.catalog)}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#004C95]/10 bg-white shadow-sm transition hover:border-[#EA8D28]/40"
                  >
                    <div className="flex aspect-[4/3] items-center justify-center bg-[#f0f7fc] p-3">
                      {s.imageUrl ? (
                        <CatalogProductImage src={s.imageUrl} alt="" className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-xs text-slate-400">No image</span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-4">
                      <p className="font-mono text-xs font-bold text-[#EA8D28]">{s.catalog}</p>
                      <h3 className="font-heading text-sm font-semibold leading-snug text-[#004C95] group-hover:text-[#EA8D28]">
                        {s.name}
                      </h3>
                      <p className="text-xs text-slate-600">
                        Target: <span className="font-medium text-slate-800">{s.target}</span>
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {publications.length > 0 ? (
          <section className="mt-12 rounded-2xl border border-[#004C95]/10 bg-white p-6 md:p-10">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-heading text-xl font-bold text-[#004C95]">Publications citing this product</h2>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#EA8D28]">
                Top {publications.length}
              </span>
            </div>
            <ul className="mt-6 space-y-5 divide-y divide-slate-100">
              {publications.map((p) => (
                <li key={p.id} className="pt-5 first:pt-0">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading text-base font-semibold text-[#004C95] hover:text-[#EA8D28] hover:underline"
                    >
                      {p.title || "Untitled publication"}
                    </a>
                  ) : (
                    <span className="font-heading text-base font-semibold text-[#004C95]">
                      {p.title || "Untitled publication"}
                    </span>
                  )}
                  <p className="mt-2 text-sm text-slate-600">
                    {p.authors ? <span>{p.authors}</span> : null}
                    {p.authors && (p.journal || p.year) ? <span> · </span> : null}
                    {p.journal ? <span className="italic">{p.journal}</span> : null}
                    {p.year ? <span> ({p.year})</span> : null}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {p.doi ? <span className="mr-3">DOI: {p.doi}</span> : null}
                    {p.pubmed_id ? <span>PubMed: {p.pubmed_id}</span> : null}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {product.storage ? (
          <p className="mt-6 text-sm text-slate-500">
            <span className="font-semibold text-[#004C95]">Storage:</span> {product.storage}
          </p>
        ) : null}
      </div>
    </main>
  )
}
