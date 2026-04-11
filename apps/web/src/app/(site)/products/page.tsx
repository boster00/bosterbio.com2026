import Link from "next/link"

const filters = ["All", "Primary antibodies", "ELISA", "Proteins", "Reagents"] as const

export default function ProductsPage() {
  return (
    <main id="main-content" className="min-h-[60vh]">
      <div className="border-b border-surface-muted bg-surface-subtle">
        <div className="container-content py-10 md:py-14">
          <h1 className="font-display text-display-md text-ink">Product catalog</h1>
          <p className="mt-3 max-w-2xl text-ink-secondary">
            Search and filter thousands of antibodies, kits, and reagents. Product data from Medusa will appear here
            once the backend is connected.
          </p>
          <form className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row" role="search">
            <label htmlFor="catalog-search" className="sr-only">
              Search products
            </label>
            <input
              id="catalog-search"
              name="q"
              type="search"
              placeholder="Gene, catalog number, or application…"
              className="h-12 w-full min-w-0 rounded-md border border-surface-muted bg-white px-4 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-md bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-light"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="container-content py-10">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Category filters">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className="rounded-full border border-surface-muted bg-white px-4 py-2 text-sm font-medium text-ink-secondary hover:border-brand/40 hover:text-brand"
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-dashed border-surface-muted bg-surface-subtle/50 p-12 text-center">
          <p className="font-display text-lg font-semibold text-ink">Catalog integration pending</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-secondary">
            Connect Medusa and map collections to enable live product grids, pricing, and cart.
          </p>
          <Link href="/" className="mt-6 inline-block text-sm font-semibold text-brand hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
