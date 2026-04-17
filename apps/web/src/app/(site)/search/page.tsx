import Link from "next/link"
import Image from "next/image"
import { Josefin_Sans, Mulish } from "next/font/google"
import { catalogSearchHaystack, fetchCatalogProducts } from "@/lib/catalog-products"
import { ProductPlaceholderThumb } from "@/components/ui/ProductPlaceholderThumb"

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-search-heading",
  display: "swap",
})

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-search-body",
  display: "swap",
})

type Props = { searchParams: Promise<{ q?: string }> }

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q.trim() : ""
  const products = await fetchCatalogProducts()
  const needle = q.toLowerCase()
  const filtered =
    needle === ""
      ? products
      : products.filter((p) => catalogSearchHaystack(p).includes(needle))

  return (
    <main
      id="main-content"
      className={`${josefin.variable} ${mulish.variable} min-h-screen bg-[#f4f6f8]`}
    >
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-8 md:px-10">
          <p
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#EA8D28", fontFamily: "var(--font-search-heading), Josefin Sans, serif" }}
          >
            Search
          </p>
          <h1
            className="mt-2 text-3xl font-bold md:text-4xl"
            style={{ color: "#004C95", fontFamily: "var(--font-search-heading), Josefin Sans, serif" }}
          >
            {q ? `Results for “${q}”` : "Search catalog"}
          </h1>
          <p
            className="mt-3 max-w-2xl text-sm md:text-base"
            style={{ color: "#334155", fontFamily: "var(--font-search-body), Mulish, sans-serif" }}
          >
            {filtered.length} product{filtered.length === 1 ? "" : "s"} found
            {needle ? "." : " — enter a term in the header search to filter antibodies and reagents."}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-10 md:px-10">
        {filtered.length === 0 ? (
          <p className="text-center text-sm" style={{ color: "#004C95", fontFamily: "var(--font-search-body), Mulish, sans-serif" }}>
            No products match that search. Try another keyword or browse the{" "}
            <Link href="/products" className="font-semibold underline" style={{ color: "#EA8D28" }}>
              full catalog
            </Link>
            .
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <li key={p.id}>
                <article
                  className="flex h-full flex-col overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm"
                  style={{ boxShadow: "0 8px 28px rgba(0,76,149,0.06)" }}
                >
                  <div className="flex gap-4 border-b border-black/5 p-5">
                    {p.imageUrl ? (
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-white ring-1 ring-black/10">
                        <Image src={p.imageUrl} alt="" fill className="object-contain p-1" sizes="80px" />
                      </div>
                    ) : (
                      <ProductPlaceholderThumb />
                    )}
                    <div className="min-w-0 flex-1">
                      <h2
                        className="text-base font-bold leading-snug"
                        style={{ fontFamily: "var(--font-search-heading), Josefin Sans, serif" }}
                      >
                        <Link
                          href={`/products/${encodeURIComponent(p.catalog)}`}
                          className="hover:underline"
                          style={{ color: "#004C95" }}
                        >
                          {p.name}
                        </Link>
                      </h2>
                      <p className="mt-1 font-mono text-xs font-semibold" style={{ color: "#EA8D28" }}>
                        {p.catalog}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm" style={{ color: "#475569", fontFamily: "var(--font-search-body), Mulish, sans-serif" }}>
                      {p.shortDescription ?? p.description?.slice(0, 140) ?? "—"}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
                      <span className="text-sm font-bold" style={{ color: "#004C95" }}>
                        {p.priceLabel}
                      </span>
                      <Link
                        href={`/products/${encodeURIComponent(p.catalog)}`}
                        className="text-xs font-bold uppercase tracking-wide"
                        style={{ color: "#EA8D28" }}
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
