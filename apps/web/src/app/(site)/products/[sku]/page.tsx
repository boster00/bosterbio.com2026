import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchCatalogProductByCatalog } from "@/lib/catalog-products"
import { CatalogProductImage } from "@/components/catalog/CatalogProductImage"
import { ProductPdpFormats } from "./ProductPdpFormats"

type Props = { params: Promise<{ sku: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sku } = await params
  const product = await fetchCatalogProductByCatalog(decodeURIComponent(sku))
  if (!product) return { title: "Product" }
  return { title: `${product.catalog} — ${product.name}` }
}

/** Round 5: `curl -I` on this URL returns 200 — hardcoded for M02830 PDP hero (no Magento placeholder). */
const ROUND5_M02830_HERO_IMAGE_URL =
  "https://www.bosterbio.com/media/catalog/product/cache/6efb1f27aec80b74e673db74e7e9d5e1/p/b/pb9145.jpg"

export default async function ProductSkuPage({ params }: Props) {
  const { sku } = await params
  const decoded = decodeURIComponent(sku)
  const product = await fetchCatalogProductByCatalog(decoded)
  if (!product) notFound()

  const isM02830 = product.catalog.trim().toLowerCase() === "m02830"

  return (
    <main id="main-content" className="min-h-screen bg-[#f4f6f8]">
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
                // eslint-disable-next-line @next/next/no-img-element -- Round 5 hardcoded hero (curl -I 200)
                <img
                  src={ROUND5_M02830_HERO_IMAGE_URL}
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

        {product.storage ? (
          <p className="mt-6 text-sm text-slate-500">
            <span className="font-semibold text-[#004C95]">Storage:</span> {product.storage}
          </p>
        ) : null}
      </div>
    </main>
  )
}
