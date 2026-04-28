// Server component — pulls a few featured products from Supabase and renders
// them as compact cards. Renders nothing if Supabase isn't configured or
// returns 0 rows (so it gracefully degrades on dev without env).
import Link from "next/link";
import { listProductsFromSupabase } from "@/lib/supabase/catalog";
import { CatalogProductImage } from "@/components/catalog/CatalogProductImage";

export async function FeaturedProductsSection() {
  // Only render when Supabase is wired
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SECRETE_KEY) {
    return null;
  }

  const products = await listProductsFromSupabase({ limit: 8 }).catch(() => []);
  if (!products.length) return null;

  return (
    <section
      id="featured"
      className="bg-brand-tint py-[var(--section-y)]"
      aria-labelledby="featured-heading"
    >
      <div className="container-content">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Featured catalog</p>
            <h2 id="featured-heading" className="mt-2 font-display text-display-md text-brand">
              Antibodies and ELISA kits in stock
            </h2>
            <p className="mt-3 text-ink-secondary">
              A snapshot of the full catalog — tap through to spec sheets, applications, and citations.
            </p>
          </div>
          <Link
            href="/products"
            className="rounded-full border-2 border-brand px-5 py-2 text-sm font-bold uppercase tracking-wide text-brand hover:bg-brand/5"
          >
            Browse all
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.id}>
              <Link
                href={`/products/${encodeURIComponent(p.catalog)}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-card transition hover:border-accent/40"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-[#f0f7fc] p-3">
                  {p.imageUrl ? (
                    <CatalogProductImage
                      src={p.imageUrl}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-sm text-slate-400">No image</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="font-mono text-xs font-bold text-accent">{p.catalog}</p>
                  <h3 className="font-display text-base font-semibold leading-snug text-brand group-hover:text-accent">
                    {p.name}
                  </h3>
                  <p className="text-xs text-ink-tertiary">
                    Target: <span className="font-medium text-ink">{p.target}</span>
                    {p.host && p.host !== "—" ? (
                      <>
                        {" · Host: "}
                        <span className="font-medium text-ink">{p.host}</span>
                      </>
                    ) : null}
                  </p>
                  {p.applications.length ? (
                    <p className="mt-auto flex flex-wrap gap-1 pt-2">
                      {p.applications.slice(0, 3).map((app) => (
                        <span
                          key={app}
                          className="rounded-full border border-blue-100 bg-[#eff6ff] px-2 py-0.5 text-[10px] font-bold text-brand"
                        >
                          {app}
                        </span>
                      ))}
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
