import Link from "next/link"

export function CtaSection() {
  return (
    <section id="cta" className="py-[var(--section-y)]" aria-labelledby="cta-heading">
      <div className="container-content">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-brand-deep to-brand px-8 py-12 text-center text-white shadow-card md:px-16 md:py-14">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl"
            aria-hidden
          />
          <h2 id="cta-heading" className="relative font-display text-display-md">
            Need help choosing the right reagent?
          </h2>
          <p className="relative mx-auto mt-3 max-w-2xl text-white/88">
            Our applications team can recommend antibodies and kits matched to your sample type, species, and detection
            platform.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-accent-hover"
            >
              Talk to support
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/55 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Browse products
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
