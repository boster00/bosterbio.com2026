import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { Josefin_Sans, Mulish } from "next/font/google"
import { notFound } from "next/navigation"
import { fetchCatalogProductByCatalog } from "@/lib/catalog-products"

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-smoke-heading",
  display: "swap",
})

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-smoke-body",
  display: "swap",
})

type Props = { params: Promise<{ sku: string }> }

export default async function ProductSkuPage({ params }: Props) {
  const { sku } = await params
  const decoded = decodeURIComponent(sku)
  const product = await fetchCatalogProductByCatalog(decoded)
  if (!product) notFound()

  const longDescription =
    product.description && product.shortDescription && product.description.trim() !== product.shortDescription.trim()
      ? product.description.trim()
      : product.description?.trim() && !product.shortDescription?.trim()
        ? product.description.trim()
        : null

  return (
    <main
      id="main-content"
      className={`${josefin.variable} ${mulish.variable} min-h-screen bg-[#f4f6f8]`}
      style={
        {
          ["--smoke-primary" as string]: "#004C95",
          ["--smoke-accent" as string]: "#EA8D28",
        } as CSSProperties
      }
    >
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-4 md:px-10">
          <nav
            className="text-sm text-[#004C95]/80"
            style={{ fontFamily: "var(--font-smoke-body), Mulish, system-ui, sans-serif" }}
            aria-label="Breadcrumb"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:underline" style={{ color: "#004C95" }}>
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-neutral-400">
                /
              </li>
              <li>
                <Link href="/products" className="hover:underline" style={{ color: "#004C95" }}>
                  Products
                </Link>
              </li>
              <li aria-hidden className="text-neutral-400">
                /
              </li>
              <li className="font-mono text-xs font-semibold" style={{ color: "#004C95" }}>
                {product.catalog}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-10 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <div
              className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm"
              style={{ boxShadow: "0 12px 40px rgba(0,76,149,0.08)" }}
            >
              <div className="relative aspect-square w-full bg-white">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 1024px) 100vw, 640px"
                    priority
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center text-sm"
                    style={{ color: "#004C95", fontFamily: "var(--font-smoke-body), Mulish, sans-serif" }}
                  >
                    Product image
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <h1
              className="text-3xl font-bold leading-tight tracking-tight md:text-4xl"
              style={{
                color: "#004C95",
                fontFamily: "var(--font-smoke-heading), Josefin Sans, serif",
              }}
            >
              {product.name}
            </h1>
            <p
              className="mt-2 font-mono text-sm font-semibold"
              style={{ color: "#004C95", fontFamily: "var(--font-smoke-body), Mulish, sans-serif" }}
            >
              SKU: {product.catalog}
            </p>
            {product.shortDescription ? (
              <p
                className="mt-4 text-base leading-relaxed md:text-lg"
                style={{ color: "#1e293b", fontFamily: "var(--font-smoke-body), Mulish, sans-serif" }}
              >
                {product.shortDescription}
              </p>
            ) : null}

            <div className="mt-8 rounded-lg border border-black/10 bg-white p-6">
              <p
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "#004C95", fontFamily: "var(--font-smoke-heading), Josefin Sans, serif" }}
              >
                Price
              </p>
              <p
                className="mt-2 text-3xl font-bold"
                style={{ color: "#004C95", fontFamily: "var(--font-smoke-heading), Josefin Sans, serif" }}
              >
                {product.priceLabel}
              </p>

              <div className="mt-8">
                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "#004C95", fontFamily: "var(--font-smoke-heading), Josefin Sans, serif" }}
                >
                  Format
                </p>
                <table
                  className="mt-3 w-full text-left text-sm"
                  style={{ fontFamily: "var(--font-smoke-body), Mulish, sans-serif" }}
                >
                  <thead>
                    <tr className="border-b border-black/10" style={{ color: "#004C95" }}>
                      <th className="py-2 pr-4 font-semibold">Variant</th>
                      <th className="py-2 font-semibold">SKU</th>
                      <th className="py-2 text-right font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-black/5">
                      <td className="py-3 pr-4" style={{ color: "#1e293b" }}>
                        Default
                      </td>
                      <td className="py-3 font-mono text-xs" style={{ color: "#004C95" }}>
                        {product.catalog}
                      </td>
                      <td className="py-3 text-right font-semibold" style={{ color: "#004C95" }}>
                        {product.priceLabel}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/cart?sku=${encodeURIComponent(product.catalog)}`}
                  className="inline-flex min-h-[44px] min-w-[10rem] items-center justify-center rounded-md px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:opacity-95"
                  style={{ backgroundColor: "#EA8D28", fontFamily: "var(--font-smoke-heading), Josefin Sans, serif" }}
                >
                  Add to cart
                </Link>
                <Link
                  href={`/contact?product=${encodeURIComponent(product.catalog)}`}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border-2 px-6 py-3 text-sm font-semibold transition hover:bg-black/5"
                  style={{ borderColor: "#004C95", color: "#004C95", fontFamily: "var(--font-smoke-body), Mulish, sans-serif" }}
                >
                  Request quote
                </Link>
              </div>
            </div>
          </div>
        </div>

        {longDescription ? (
          <section
            className="mx-auto mt-12 max-w-[1440px] rounded-lg border border-black/10 bg-white px-6 py-8 md:px-10"
            aria-labelledby="pdp-long-desc"
          >
            <h2
              id="pdp-long-desc"
              className="text-xl font-bold"
              style={{ color: "#004C95", fontFamily: "var(--font-smoke-heading), Josefin Sans, serif" }}
            >
              Description
            </h2>
            <div
              className="mt-4 space-y-3 text-sm leading-relaxed md:text-base"
              style={{ color: "#334155", fontFamily: "var(--font-smoke-body), Mulish, sans-serif" }}
            >
              {longDescription.split(/\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}
