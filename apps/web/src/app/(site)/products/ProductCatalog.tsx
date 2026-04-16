"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { catalogSearchHaystack, type CatalogProduct } from "@/lib/catalog-products"
import { ProductPlaceholderThumb } from "@/components/ui/ProductPlaceholderThumb"

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b))
}

function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <article className="product-card-hover group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-brand/10 border-l-4 border-l-accent bg-white shadow-card hover:border-accent/40">
      <div className="flex gap-4 border-b border-brand/10 bg-brand-tint/40 p-5">
        {product.imageUrl ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-slate-200">
            <Image
              src={product.imageUrl}
              alt=""
              fill
              className="object-contain p-1"
              sizes="80px"
            />
          </div>
        ) : (
          <ProductPlaceholderThumb />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h2 className="font-display text-base font-semibold leading-snug text-brand group-hover:text-accent">
              <Link href={`/products/${encodeURIComponent(product.catalog)}`} className="hover:underline">
                {product.name}
              </Link>
            </h2>
            <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 font-mono text-xs font-bold text-white">
              {product.catalog}
            </span>
          </div>
          <p className="mt-2 text-sm text-ink-secondary">
            Target: <span className="font-medium text-ink">{product.target}</span> · Host:{" "}
            <span className="font-medium text-ink">{product.host}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-1.5" aria-label="Applications">
          {product.applications.length ? (
            product.applications.map((app) => (
              <span
                key={app}
                className="rounded-full border border-brand-muted/60 bg-brand-tint px-2.5 py-0.5 text-xs font-bold text-brand"
              >
                {app}
              </span>
            ))
          ) : (
            <span className="text-xs text-ink-tertiary">No applications listed</span>
          )}
        </div>
        <p className="mt-3 text-xs text-ink-tertiary">
          Reactivity: {product.reactivity.length ? product.reactivity.join(", ") : "—"}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-brand/10 pt-4">
          <p className="text-sm font-bold text-ink">{product.priceLabel}</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/products/${encodeURIComponent(product.catalog)}`}
              className="rounded-full border border-brand/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand shadow-sm transition duration-200 hover:border-accent hover:text-accent"
            >
              Details
            </Link>
            <Link
              href={`/contact?product=${encodeURIComponent(product.catalog)}`}
              className="rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition duration-200 hover:scale-[1.04] hover:bg-accent-hover hover:shadow-md active:scale-[0.98]"
            >
              Request quote
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

type Props = {
  initialQuery?: string
  initialProducts: CatalogProduct[]
}

export function ProductCatalog({ initialQuery = "", initialProducts }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)
  const [target, setTarget] = useState("")
  const [host, setHost] = useState("")
  const [application, setApplication] = useState("")
  const [reactivity, setReactivity] = useState("")

  const hosts = useMemo(() => uniqueSorted(initialProducts.map((a) => a.host).filter((h) => h && h !== "—")), [initialProducts])
  const targets = useMemo(() => uniqueSorted(initialProducts.map((a) => a.target).filter((t) => t && t !== "—")), [initialProducts])
  const applications = useMemo(() => uniqueSorted(initialProducts.flatMap((a) => a.applications)), [initialProducts])
  const reactivities = useMemo(() => uniqueSorted(initialProducts.flatMap((a) => a.reactivity)), [initialProducts])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return initialProducts.filter((p) => {
      if (q) {
        if (!catalogSearchHaystack(p).includes(q)) return false
      }
      if (target && p.target !== target) return false
      if (host && p.host !== host) return false
      if (application && !p.applications.includes(application)) return false
      if (reactivity && !p.reactivity.includes(reactivity)) return false
      return true
    })
  }, [query, target, host, application, reactivity, initialProducts])

  const total = initialProducts.length

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "")
  }, [searchParams])

  return (
    <>
      <div className="page-hero-bar border-b border-brand/10">
        <div className="container-content flex min-w-0 flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between md:py-14">
          <div className="min-w-0 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Catalog</p>
            <h1 className="mt-2 font-display text-display-md text-brand">Antibodies &amp; reagents</h1>
            <p className="mt-3 text-ink-secondary">
              {total > 0
                ? `Live catalog from Medusa (local PostgreSQL) — ${total} product${total === 1 ? "" : "s"}.`
                : "No products returned from Medusa. Start the Medusa API with Postgres, then from apps/api run: pnpm seed:catalog (loads five featured antibodies). Ensure NEXT_PUBLIC_MEDUSA_BACKEND_URL points at the API."}
            </p>
          </div>
          <form
            className="flex w-full min-w-0 max-w-md flex-col gap-2 sm:flex-row"
            role="search"
            onSubmit={(e) => {
              e.preventDefault()
              const trimmed = query.trim()
              router.push(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products")
            }}
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
              placeholder="Gene, catalog #, application…"
              className="h-12 w-full min-w-0 rounded-full border border-brand/15 bg-white px-5 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-full bg-accent px-8 text-sm font-bold text-white shadow-md shadow-accent/25 transition duration-200 hover:scale-[1.02] hover:bg-accent-hover hover:shadow-lg active:scale-[0.98]"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="container-content py-10">
        <div className="rounded-2xl border-2 border-brand/10 bg-white p-5 shadow-card md:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand">Refine results</h2>
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-bold text-accent">Filters</span>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="filter-target" className="block text-xs font-bold uppercase tracking-wide text-brand/80">
                Target
              </label>
              <select
                id="filter-target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-brand/15 bg-brand-tint/40 px-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
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
              <label htmlFor="filter-host" className="block text-xs font-bold uppercase tracking-wide text-brand/80">
                Host species
              </label>
              <select
                id="filter-host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-brand/15 bg-brand-tint/40 px-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
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
              <label htmlFor="filter-app" className="block text-xs font-bold uppercase tracking-wide text-brand/80">
                Application
              </label>
              <select
                id="filter-app"
                value={application}
                onChange={(e) => setApplication(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-brand/15 bg-brand-tint/40 px-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
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
              <label
                htmlFor="filter-reactivity"
                className="block text-xs font-bold uppercase tracking-wide text-brand/80"
              >
                Reactivity
              </label>
              <select
                id="filter-reactivity"
                value={reactivity}
                onChange={(e) => setReactivity(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-brand/15 bg-brand-tint/40 px-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
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
            className="mt-5 text-sm font-bold text-accent hover:underline disabled:pointer-events-none disabled:opacity-40"
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
          Showing <span className="font-bold text-brand">{filtered.length}</span> of {total} products
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
