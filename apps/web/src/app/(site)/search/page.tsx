import Link from "next/link"
import { fetchCatalogProducts, catalogSearchHaystack } from "@/lib/catalog-products"

type Props = { searchParams: Promise<{ q?: string }> }

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q.trim() : ""
  const products = await fetchCatalogProducts()
  const needle = q.toLowerCase()
  const results = needle ? products.filter((p) => catalogSearchHaystack(p).includes(needle)) : products

  return (
    <main id="main-content" className="min-h-screen bg-[#f4f6f8]">
      <div className="border-b border-black/10 bg-white">
        <div className="container-content py-8 md:py-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#EA8D28]">Search</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-[#004C95] md:text-4xl">Product search</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Search the featured antibody catalog by gene, catalog number, application, or keyword.
          </p>

          <form
            className="mt-6 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:items-stretch"
            role="search"
            action="/search"
            method="get"
          >
            <label htmlFor="search-page-q" className="sr-only">
              Search query
            </label>
            <input
              id="search-page-q"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="e.g. antibody, WB, GAPDH…"
              className="min-h-[44px] w-full flex-1 rounded-md border-2 border-[#004C95]/25 bg-white px-4 py-2 text-sm text-[#0f172a] placeholder:text-slate-400 focus:border-[#EA8D28] focus:outline-none focus:ring-2 focus:ring-[#EA8D28]/30"
            />
            <button
              type="submit"
              className="min-h-[44px] shrink-0 rounded-md px-6 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:opacity-95"
              style={{ backgroundColor: "#004C95" }}
            >
              Search
            </button>
          </form>

          {q ? (
            <p className="mt-4 inline-flex w-fit rounded-full border border-[#004C95]/20 bg-[#004C95]/5 px-3 py-1 text-xs font-semibold text-[#004C95]">
              Active query: <span className="ml-1 font-mono">{q}</span>
            </p>
          ) : null}
        </div>
      </div>

      <div className="container-content py-10">
        <p className="text-sm text-slate-600">
          <span className="font-bold text-[#004C95]">{results.length}</span> result{results.length === 1 ? "" : "s"}
          {q ? ` for “${q}”` : ""}
        </p>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((p) => (
            <li key={p.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#004C95]/10 bg-white shadow-card transition hover:border-[#EA8D28]/50">
                <div className="flex gap-4 border-b border-[#004C95]/10 bg-[#f0f7fc] p-5">
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imageUrl} alt="" className="h-20 w-20 shrink-0 rounded-lg bg-white object-contain p-1 ring-1 ring-slate-200" />
                  ) : (
                    <div className="h-20 w-20 shrink-0 rounded-lg bg-slate-200" aria-hidden />
                  )}
                  <div className="min-w-0">
                    <Link
                      href={`/products/${encodeURIComponent(p.catalog)}`}
                      className="font-heading text-base font-semibold text-[#004C95] hover:text-[#EA8D28]"
                    >
                      {p.name}
                    </Link>
                    <p className="mt-1 font-mono text-xs font-bold text-[#EA8D28]">{p.catalog}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm text-slate-600">
                    {p.target} · {p.host}
                  </p>
                  <p className="mt-3 text-sm font-bold text-slate-900">{p.priceLabel}</p>
                  <Link
                    href={`/products/${encodeURIComponent(p.catalog)}`}
                    className="mt-auto inline-flex w-fit rounded-full border-2 border-[#004C95] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#004C95] hover:bg-[#004C95]/5"
                  >
                    View product
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {results.length === 0 ? (
          <p className="mt-16 text-center text-slate-600">No products matched your search. Try another keyword.</p>
        ) : null}
      </div>
    </main>
  )
}
