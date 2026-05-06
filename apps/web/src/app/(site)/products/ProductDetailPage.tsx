import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchCatalogProductByCatalog } from "@/lib/catalog-products"
import { getProductAttributesByTemplate } from "@/lib/supabase/attributes"
import { getPublicationsForProduct } from "@/lib/supabase/publications"
import { getSimilarProducts } from "@/lib/supabase/catalog"
import { getAllImagesForProduct } from "@/lib/supabase/product-images"
import { CatalogProductImage } from "@/components/catalog/CatalogProductImage"
import {
  conjugateFromMetadata,
  pdpTemplateEyebrow,
  showSupplementalProductImage,
  sourceFromMetadata,
  tagFromMetadata,
} from "@/lib/pdp-template-copy"
import { productDetailPath } from "@/lib/product-urls"
import { ProductPdpFormats } from "./[sku]/ProductPdpFormats"

type Props = { catalog: string }

export async function ProductDetailPage({ catalog }: Props) {
  const sku = catalog.trim()
  if (!sku) notFound()

  const product = await fetchCatalogProductByCatalog(sku)
  if (!product) notFound()

  const labelledAttrs = await getProductAttributesByTemplate(sku).catch(() => [])
  const publications = await getPublicationsForProduct(sku, 20).catch(() => [])
  const similar = await getSimilarProducts(sku, 4).catch(() => [])
  const gallery = await getAllImagesForProduct(sku).catch(() => [])

  const tpl = product.productTemplate
  const eyebrow = pdpTemplateEyebrow(tpl)
  const conjugate = conjugateFromMetadata(product.metadata)
  const metaTag = tagFromMetadata(product.metadata)
  const metaSource = sourceFromMetadata(product.metadata)

  const productJsonLd = {
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

  const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://www.bosterbio.com"
  const canonicalPath = productDetailPath(product.catalog)
  const breadcrumbsJsonLd = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN + "/" },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_ORIGIN}/products` },
      {
        "@type": "ListItem",
        position: 3,
        name: product.catalog,
        item: `${SITE_ORIGIN}${canonicalPath}`,
      },
    ],
  }

  const supplemental = showSupplementalProductImage(tpl) && gallery.length > 1 ? gallery[1] : null

  return (
    <main id="main-content" className="min-h-screen bg-catalog-tint font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />
      <div className="border-b border-catalog-brand/10 bg-white">
        <div className="container-smoke py-4 text-sm text-slate-600">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="text-catalog-brand hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-slate-400">
                /
              </li>
              <li>
                <Link href="/products" className="text-catalog-brand hover:underline">
                  Products
                </Link>
              </li>
              <li aria-hidden className="text-slate-400">
                /
              </li>
              <li className="font-mono font-semibold text-slate-900">{product.catalog}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-smoke py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border-2 border-catalog-brand/10 bg-white p-6 shadow-card">
              {product.imageUrl ? (
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
            {gallery.length > 1 ? (
              <ul className="mt-3 grid grid-cols-4 gap-2">
                {gallery.slice(0, 8).map((g, i) => (
                  <li key={`${g.image_url}-${i}`}>
                    <div className="aspect-square overflow-hidden rounded-lg border border-catalog-brand/10 bg-white p-1">
                      <CatalogProductImage
                        src={g.image_url}
                        alt={g.alt_text ?? ""}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-widest text-catalog-accent">{eyebrow}</p>
            <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-catalog-brand md:text-4xl">
              {product.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-catalog-brand/10 px-3 py-1 font-mono text-sm font-bold text-catalog-brand">
                SKU {product.catalog}
              </span>
              {product.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-catalog-brand/20 px-3 py-1 text-xs font-semibold text-catalog-brand"
                >
                  {b}
                </span>
              ))}
            </div>
            <p className="mt-6 text-2xl font-bold text-slate-900">{product.priceLabel}</p>
            {product.shortDescription ? (
              <p className="mt-4 text-base leading-relaxed text-slate-600">{product.shortDescription}</p>
            ) : null}

            <div className="mt-8 rounded-2xl border border-catalog-brand/10 bg-white p-6 shadow-sm">
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-bold uppercase text-catalog-brand/70">Target</dt>
                  <dd className="mt-1 font-medium text-slate-800">{product.target}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase text-catalog-brand/70">Host</dt>
                  <dd className="mt-1 font-medium text-slate-800">{product.host}</dd>
                </div>
                {(tpl === "proteins" || tpl === "over-expression-lysates") && metaTag ? (
                  <div>
                    <dt className="text-xs font-bold uppercase text-catalog-brand/70">Tag</dt>
                    <dd className="mt-1 font-medium text-slate-800">{metaTag}</dd>
                  </div>
                ) : null}
                {(tpl === "proteins" || tpl === "over-expression-lysates") && metaSource ? (
                  <div>
                    <dt className="text-xs font-bold uppercase text-catalog-brand/70">Source / expression</dt>
                    <dd className="mt-1 font-medium text-slate-800">{metaSource}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-xs font-bold uppercase text-catalog-brand/70">Applications</dt>
                  <dd className="mt-1 font-medium text-slate-800">
                    {product.applications.length ? product.applications.join(", ") : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase text-catalog-brand/70">Reactivity</dt>
                  <dd className="mt-1 font-medium text-slate-800">
                    {product.reactivity.length ? product.reactivity.join(", ") : "—"}
                  </dd>
                </div>
                {product.clone ? (
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-bold uppercase text-catalog-brand/70">Clone</dt>
                    <dd className="mt-1 font-mono font-medium text-slate-800">{product.clone}</dd>
                  </div>
                ) : null}
                {conjugate ? (
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-bold uppercase text-catalog-brand/70">Conjugate</dt>
                    <dd className="mt-1 font-medium text-slate-800">{conjugate}</dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-8 border-t border-slate-100 pt-8">
                <ProductPdpFormats formats={product.formats} catalog={product.catalog} />
              </div>
            </div>
          </div>
        </div>

        {supplemental ? (
          <section className="mt-12 rounded-2xl border border-catalog-brand/10 bg-white p-6 md:p-10">
            <h2 className="font-heading text-xl font-bold text-catalog-brand">Standard curve / supplemental image</h2>
            <div className="mt-4 max-w-lg">
              <CatalogProductImage
                src={supplemental.image_url}
                alt={supplemental.alt_text ?? ""}
                className="w-full rounded-xl border border-catalog-brand/10 object-contain"
              />
            </div>
          </section>
        ) : null}

        {product.description ? (
          <section className="mt-12 rounded-2xl border border-catalog-brand/10 bg-white p-6 md:p-10">
            <h2 className="font-heading text-xl font-bold text-catalog-brand">Description</h2>
            <div
              className="mt-4 max-w-none space-y-3 text-base leading-relaxed text-slate-700 [&_a]:text-catalog-brand [&_a]:underline [&_h2]:font-heading [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-catalog-brand [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </section>
        ) : null}

        {labelledAttrs.length > 0 ? (
          <section className="mt-12 rounded-2xl border border-catalog-brand/10 bg-white p-6 md:p-10">
            <h2 className="font-heading text-xl font-bold text-catalog-brand">Specifications</h2>
            <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {labelledAttrs.map((a) => (
                <div key={a.attr_key} className="border-b border-slate-100 pb-3">
                  <dt className="text-xs font-bold uppercase tracking-wide text-catalog-brand/70">{a.label}</dt>
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
            <h2 className="font-heading text-xl font-bold text-catalog-brand">Similar products</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((s) => (
                <li key={s.id}>
                  <Link
                    href={productDetailPath(s.catalog)}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-catalog-brand/10 bg-white shadow-sm transition hover:border-catalog-accent/40"
                  >
                    <div className="flex aspect-[4/3] items-center justify-center bg-catalog-tint p-3">
                      {s.imageUrl ? (
                        <CatalogProductImage src={s.imageUrl} alt="" className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-xs text-slate-400">No image</span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-4">
                      <p className="font-mono text-xs font-bold text-catalog-accent">{s.catalog}</p>
                      <h3 className="font-heading text-sm font-semibold leading-snug text-catalog-brand group-hover:text-catalog-accent">
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
          <section className="mt-12 rounded-2xl border border-catalog-brand/10 bg-white p-6 md:p-10">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-heading text-xl font-bold text-catalog-brand">Publications citing this product</h2>
              <span className="text-xs font-semibold uppercase tracking-wide text-catalog-accent">
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
                      className="font-heading text-base font-semibold text-catalog-brand hover:text-catalog-accent hover:underline"
                    >
                      {p.title || "Untitled publication"}
                    </a>
                  ) : (
                    <span className="font-heading text-base font-semibold text-catalog-brand">
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
            <span className="font-semibold text-catalog-brand">Storage:</span> {product.storage}
          </p>
        ) : null}
      </div>
    </main>
  )
}
