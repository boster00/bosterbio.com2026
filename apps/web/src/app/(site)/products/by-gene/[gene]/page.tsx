// Gene-specific landing page: /products/by-gene/IL-6 → all IL-6 antibodies, ELISAs, etc.
import type { Metadata } from "next";
import Link from "next/link";
import { findProductsByGene } from "@/lib/supabase/by-gene";

type Props = { params: Promise<{ gene: string }> };

export const revalidate = 600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gene } = await params;
  const cleanGene = decodeURIComponent(gene).toUpperCase();
  return {
    title: `${cleanGene} antibodies, ELISA kits & proteins | Boster Bio`,
    description: `Browse all Boster Bio products targeting ${cleanGene} — antibodies, ELISA kits, recombinant proteins, and lysates.`,
  };
}

export default async function ByGenePage({ params }: Props) {
  const { gene } = await params;
  const cleanGene = decodeURIComponent(gene).toUpperCase();
  const results = await findProductsByGene(cleanGene, 60).catch(() => []);

  return (
    <main id="main-content" className="bg-surface-subtle pb-16">
      <section className="relative border-b border-brand-primary/15 bg-gradient-to-br from-brand-primary via-brand-primary to-brand-sky/90 text-white">
        <div className="container-content relative py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Gene focus</p>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem]">
            {cleanGene}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/90">
            Antibodies, ELISA kits, and recombinant proteins targeting {cleanGene}. Browse {results.length}+ products
            below or refine with the catalog filters.
          </p>
        </div>
      </section>

      <div className="container-content py-10 md:py-14">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-brand-primary/10 bg-white p-10 text-center shadow-card">
            <p className="text-ink-secondary">
              No products found for {cleanGene}. Try the{" "}
              <Link href="/search" className="text-accent underline">
                search page
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="text-accent underline">
                contact us
              </Link>{" "}
              for a custom request.
            </p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/products/${encodeURIComponent(p.catalog)}`}
                  className="group block rounded-xl border border-brand-primary/10 bg-white p-4 shadow-sm transition hover:border-accent/40 hover:shadow-md"
                >
                  <p className="font-mono text-xs font-bold text-accent">{p.catalog}</p>
                  <h3 className="mt-1 font-heading text-sm font-semibold leading-snug text-brand group-hover:text-accent">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-xs text-ink-secondary">
                    Target: <span className="font-medium text-ink">{p.target}</span>
                    {p.host && p.host !== "—" ? ` · Host: ${p.host}` : null}
                  </p>
                  {p.applications.length ? (
                    <p className="mt-1 text-xs text-ink-tertiary">{p.applications.slice(0, 4).join(", ")}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
