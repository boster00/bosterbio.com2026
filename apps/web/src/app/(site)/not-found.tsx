// Brand-styled 404 page rendered for all unmatched routes inside the (site) group.
// The catch-all logs the path to Supabase before throwing notFound().
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="bg-surface-subtle pb-16">
      <section className="relative border-b border-brand-primary/15 bg-gradient-to-br from-brand-primary via-brand-primary to-brand-sky/90 text-white">
        <div className="container-content relative py-16 md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">404</p>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/90">
            The page you&rsquo;re looking for has moved, been retired, or never existed. Try the
            search bar above, or browse the catalog from these starting points.
          </p>
        </div>
      </section>

      <div className="container-content py-10 md:py-14">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/products", title: "Browse all products", desc: "Antibodies, ELISA kits, proteins, and lysates." },
            { href: "/products?template=antibodies", title: "Antibodies", desc: "Primary and secondary antibodies." },
            { href: "/products?template=elisa-kits", title: "ELISA Kits", desc: "PicoKine® sandwich ELISA kits." },
            { href: "/diseases", title: "Disease pages", desc: "Resources organized by disease area." },
            { href: "/protocol-and-troubleshooting", title: "Protocols", desc: "Step-by-step protocols and troubleshooting." },
            { href: "/services/custom-antibody", title: "Custom services", desc: "Custom antibody and ELISA development." },
          ].map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="block rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-card transition hover:border-accent/40 hover:shadow-md"
              >
                <p className="font-heading text-base font-semibold text-brand">{c.title}</p>
                <p className="mt-2 text-sm text-ink-secondary">{c.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
