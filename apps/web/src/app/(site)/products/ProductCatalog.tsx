"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { MOCK_ANTIBODIES, uniqueSorted, type MockAntibody } from "@/data/mock-antibodies"

const hosts = uniqueSorted(MOCK_ANTIBODIES.map((a) => a.host))
const targets = uniqueSorted(MOCK_ANTIBODIES.map((a) => a.target))
const applications = uniqueSorted(MOCK_ANTIBODIES.flatMap((a) => a.applications))
const reactivities = uniqueSorted(MOCK_ANTIBODIES.flatMap((a) => a.reactivity))

function ProductCard({ product }: { product: MockAntibody }) {
  return (
    <article className="flex flex-col rounded-xl border border-surface-muted bg-surface p-5 shadow-card transition hover:border-brand/25">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2 className="font-display text-base font-semibold leading-snug text-ink">{product.name}</h2>
        <span className="shrink-0 rounded-md bg-brand-muted px-2 py-1 font-mono text-xs font-semibold text-brand">
          {product.catalog}
        </span>
      </div>
      <p className="mt-2 text-sm text-ink-secondary">
        Target: <span className="font-medium text-ink">{product.target}</span> · Host:{" "}
        <span className="font-medium text-ink">{product.host}</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Applications">
        {product.applications.map((app) => (
          <span
            key={app}
            className="rounded-full bg-surface-subtle px-2.5 py-0.5 text-xs font-semibold text-brand-dark ring-1 ring-brand/15"
          >
            {app}
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs text-ink-tertiary">Reactivity: {product.reactivity.join(", ")}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-surface-muted pt-4">
        <p className="text-sm font-semibold text-ink">{product.priceLabel}</p>
        <Link
          href={`/contact?product=${encodeURIComponent(product.catalog)}`}
          className="text-sm font-semibold text-brand hover:underline"
        >
          Request quote
        </Link>
      </div>
    </article>
  )
}

export function ProductCatalog({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [target, setTarget] = useState("")
  const [host, setHost] = useState("")
  const [application, setApplication] = useState("")
  const [reactivity, setReactivity] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return MOCK_ANTIBODIES.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.catalog} ${p.target} ${p.host}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      if (target && p.target !== target) return false
      if (host && p.host !== host) return false
      if (application && !p.applications.includes(application)) return false
      if (reactivity && !p.reactivity.includes(reactivity)) return false
      return true
    })
  }, [query, target, host, application, reactivity])

  return (
    <>
      <div className="border-b border-surface-muted bg-surface-subtle">
        <div className="container-content py-10 md:py-14">
          <h1 className="font-display text-display-md text-ink">Antibody catalog</h1>
          <p className="mt-3 max-w-2xl text-ink-secondary">
            Browse representative catalog antibodies — {MOCK_ANTIBODIES.length} demo listings for layout review. Live
            inventory, pricing, and checkout will connect to Medusa.
          </p>
          <form
            className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="catalog-search" className="sr-only">
              Search products
            </label>
            <input
              id="catalog-search"
              name="q"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Gene, catalog number, or antibody name…"
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
        <div className="rounded-xl border border-surface-muted bg-surface p-4 shadow-card md:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-tertiary">Filters</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="filter-target" className="block text-xs font-medium text-ink-secondary">
                Target
              </label>
              <select
                id="filter-target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-surface-muted bg-white px-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="">All targets</option>
                {targets.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="filter-host" className="block text-xs font-medium text-ink-secondary">
                Host species
              </label>
              <select
                id="filter-host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-surface-muted bg-white px-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="">All hosts</option>
                {hosts.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="filter-app" className="block text-xs font-medium text-ink-secondary">
                Application
              </label>
              <select
                id="filter-app"
                value={application}
                onChange={(e) => setApplication(e.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-surface-muted bg-white px-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="">All applications</option>
                {applications.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="filter-reactivity" className="block text-xs font-medium text-ink-secondary">
                Reactivity
              </label>
              <select
                id="filter-reactivity"
                value={reactivity}
                onChange={(e) => setReactivity(e.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-surface-muted bg-white px-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="">All species</option>
                {reactivities.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-brand hover:underline disabled:pointer-events-none disabled:opacity-40"
            disabled={!target && !host && !application && !reactivity && !query.trim()}
            onClick={() => {
              setQuery("")
              setTarget("")
              setHost("")
              setApplication("")
              setReactivity("")
            }}
          >
            Clear all filters
          </button>
        </div>

        <p className="mt-8 text-sm text-ink-secondary">
          Showing <span className="font-semibold text-ink">{filtered.length}</span> of {MOCK_ANTIBODIES.length}{" "}
          products
        </p>

        <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-ink-secondary">No products match these filters. Try clearing filters.</p>
        ) : null}
      </div>
    </>
  )
}
