import Link from "next/link"

/** Friendly “antibody robot” mascot — inline SVG in brand colors (asset-library style). */
function MascotPanel() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-b from-brand/95 to-brand-deep shadow-2xl"
      aria-hidden
    >
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
      <svg viewBox="0 0 320 280" className="relative mx-auto h-auto w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="160" cy="248" rx="120" ry="16" fill="rgba(255,255,255,0.12)" />
        {/* Body */}
        <rect x="100" y="120" width="120" height="100" rx="24" fill="#2c5282" stroke="white" strokeOpacity="0.35" strokeWidth="2" />
        {/* Head */}
        <circle cx="160" cy="88" r="44" fill="#1a365d" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
        {/* Antenna */}
        <line x1="160" y1="44" x2="160" y2="24" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
        <circle cx="160" cy="18" r="6" fill="#f97316" />
        {/* Eyes */}
        <circle cx="142" cy="86" r="8" fill="white" />
        <circle cx="178" cy="86" r="8" fill="white" />
        <circle cx="144" cy="88" r="4" fill="#1a365d" />
        <circle cx="180" cy="88" r="4" fill="#1a365d" />
        {/* Smile */}
        <path d="M138 108 Q160 122 182 108" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Y arms */}
        <path d="M100 140 L70 100 M100 160 L60 160" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <path d="M220 140 L250 100 M220 160 L260 160" stroke="white" strokeWidth="6" strokeLinecap="round" />
        {/* Core */}
        <circle cx="160" cy="165" r="18" fill="#f97316" opacity="0.9" />
        <text x="160" y="171" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="system-ui">
          Y
        </text>
      </svg>
      <p className="relative px-6 pb-6 text-center text-sm font-medium text-white/90">
        <span className="text-accent">Science</span> with a smile — reagents you can trust in every experiment.
      </p>
    </div>
  )
}

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-brand text-white">
      {/* Underwater-inspired soft light rays */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, #38bdf8 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 100% 100%, #f97316 0%, transparent 50%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120'%3E%3Cpath fill='%23ffffff' d='M0 60c240 30 480 30 720 0s480-30 720 0v60H0z'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 120px",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />

      <div className="container-content relative grid gap-12 py-[var(--section-y)] lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Boster Biological Technology</p>
          <h1 className="mt-3 font-display text-display-lg text-white md:text-[3.25rem]">
            Trusted Antibodies for Life Science Research
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Primary and secondary antibodies, ELISA kits, and custom services — validated data, expert support, and
            same-day shipping on in-stock orders placed before cutoff.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-black/15 transition hover:bg-accent-hover"
            >
              Browse catalog
            </Link>
            <Link
              href="/resources#protocols"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/50 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              Protocols &amp; FAQs
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-1 gap-4 border-t border-white/20 pt-8 sm:grid-cols-3 sm:max-w-2xl">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-white/60">Catalog antibodies</dt>
              <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-accent">15,000+</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-white/60">Zebrafish antibodies</dt>
              <dd className="mt-1 font-display text-2xl font-bold tabular-nums text-white">600+</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-white/60">Fulfillment</dt>
              <dd className="mt-1 font-display text-xl font-bold leading-tight text-white sm:text-2xl">Same-day ship</dd>
              <dd className="text-xs text-white/65">In-stock orders — see product pages for cutoff</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <MascotPanel />
          <div className="absolute -bottom-3 -left-2 hidden max-w-[220px] rounded-xl border border-accent/40 bg-accent-soft px-4 py-3 text-ink shadow-card sm:block md:-left-4">
            <p className="text-xs font-bold uppercase tracking-wide text-accent">Pleasanton, CA</p>
            <p className="mt-1 text-xs font-medium text-ink-secondary">Serving labs worldwide since 1993.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
