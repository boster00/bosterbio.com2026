import Link from "next/link"

export function CtaSection() {
  return (
    <section id="cta" className="py-[var(--section-y)]" aria-labelledby="cta-heading">
      <div className="container-content">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-brand-light px-8 py-12 text-center text-white shadow-card md:px-16 md:py-14">
          <h2 id="cta-heading" className="font-display text-display-md">
            Need help choosing the right reagent?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Our applications team can recommend antibodies and kits matched to your sample type, species, and detection
            platform.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-brand transition hover:bg-brand-muted"
            >
              Talk to support
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-md border-2 border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Browse products
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
