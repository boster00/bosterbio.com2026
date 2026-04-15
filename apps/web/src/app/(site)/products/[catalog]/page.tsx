import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchCatalogProductByCatalog } from "@/lib/catalog-products"

type Props = { params: Promise<{ catalog: string }> }

function formatBadgeLabel(slug: string) {
  return slug
    .split(/[-_]/g)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export default async function ProductDetailPage({ params }: Props) {
  const { catalog } = await params
  const decoded = decodeURIComponent(catalog)
  const merged = await fetchCatalogProductByCatalog(decoded)
  if (!merged) notFound()

  const longDescription =
    merged.description && merged.shortDescription && merged.description.trim() !== merged.shortDescription.trim()
      ? merged.description.trim()
      : merged.description?.trim() && !merged.shortDescription?.trim()
        ? merged.description.trim()
        : null

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
          {merged.shortDescription ? (
            <p className="mt-3 max-w-3xl text-lg text-ink-secondary">{merged.shortDescription}</p>
          ) : null}
          <p className="mt-3 text-ink-secondary">
            Target <span className="font-semibold text-ink">{merged.target}</span> · Host{" "}
            <span className="font-semibold text-ink">{merged.host}</span>
            {merged.clone ? (
              <>
                {" "}
                · Clone <span className="font-semibold text-ink">{merged.clone}</span>
              </>
            ) : null}
            {merged.productTemplate ? (
              <>
                {" "}
                · <span className="capitalize text-ink-secondary">{merged.productTemplate.replace(/-/g, " ")}</span>
              </>
            ) : null}
          </p>
          {merged.badges.length ? (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Product badges">
              {merged.badges.map((b) => (
                <li
                  key={b}
                  className="rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-bold text-accent"
                >
                  {formatBadgeLabel(b)}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="container-content py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div className="flex flex-col gap-8">
            <div className="rounded-2xl border-2 border-brand/10 bg-white p-6 shadow-card md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Product image</p>
              <div className="relative mt-6 aspect-square w-full max-w-md overflow-hidden rounded-xl bg-brand-tint ring-1 ring-brand/10">
                {merged.imageUrl ? (
                  <Image
                    src={merged.imageUrl}
                    alt=""
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-ink-tertiary">No image on file</div>
                )}
              </div>
            </div>

            {longDescription ? (
              <section className="rounded-2xl border border-brand/10 bg-white p-6 shadow-card md:p-8" aria-labelledby="pdp-description">
                <h2 id="pdp-description" className="font-display text-lg font-semibold text-brand">
                  Description
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-secondary">
                  {longDescription.split(/\n+/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border-2 border-brand/10 bg-white p-6 shadow-card md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-brand">Ordering</p>
              <p className="mt-4 text-3xl font-bold text-brand">{merged.priceLabel}</p>
              <p className="mt-2 text-sm text-ink-secondary">Price from Medusa catalog (local PostgreSQL).</p>
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

            {merged.storage ? (
              <div className="rounded-2xl border border-brand/10 bg-white p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-brand">Storage &amp; handling</h2>
                <p className="mt-3 text-sm text-ink-secondary">{merged.storage}</p>
              </div>
            ) : null}

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
