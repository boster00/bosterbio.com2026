import Link from "next/link"

function HeroVisual() {
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/20 lg:aspect-[5/4]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand to-accent/90" />
      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
        <svg className="h-full w-full" viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="white" stopOpacity="0.35" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="320" cy="60" r="120" fill="url(#g1)" />
          <circle cx="80" cy="260" r="90" fill="url(#g1)" />
          <path
            d="M40 180h120v8H40v-8zm0 24h80v8H40v-8zm160-80h160v8H200v-8zm0 24h120v8H200v-8z"
            fill="white"
            fillOpacity="0.2"
          />
          <rect x="48" y="48" width="140" height="100" rx="8" stroke="white" strokeOpacity="0.35" strokeWidth="2" />
          <rect x="220" y="140" width="120" height="80" rx="8" stroke="white" strokeOpacity="0.25" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-end p-6 md:p-8">
        <p className="max-w-xs text-sm font-medium leading-snug text-white/95">
          <span className="block text-xs font-semibold uppercase tracking-widest text-white/70">Lab-ready</span>
          Protocols, COAs, and validation data aligned to your application.
        </p>
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-light text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="container-content relative grid gap-10 py-[var(--section-y)] lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/80">Life science research</p>
          <h1 className="mt-3 font-display text-display-lg text-white md:text-[3.25rem]">
            Antibodies &amp; kits built for reproducible science
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            16,000+ validated products with published citations, transparent protocols, and expert technical support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-accent-hover"
            >
              Browse catalog
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center rounded-md border-2 border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              View resources
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/20 pt-8 sm:max-w-lg">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-white/60">Products</dt>
              <dd className="mt-1 font-display text-2xl font-bold tabular-nums">16k+</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-white/60">Citations</dt>
              <dd className="mt-1 font-display text-2xl font-bold tabular-nums">60k+</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-white/60">Support</dt>
              <dd className="mt-1 font-display text-2xl font-bold">24/7</dd>
            </div>
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <HeroVisual />
          <div className="absolute -bottom-4 -left-4 hidden max-w-xs rounded-lg border border-white/20 bg-white/95 p-4 text-ink shadow-card sm:block md:-left-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">Validation first</p>
            <p className="mt-1 text-sm text-ink-secondary">
              WB, IHC, ICC, FC — application-specific data on every product page.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
