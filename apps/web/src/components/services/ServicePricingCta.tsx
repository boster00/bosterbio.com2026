import Link from "next/link"

type Props = {
  serviceLabel: string
  primaryHref?: string
  primaryLabel?: string
}

export function ServicePricingCta({
  serviceLabel,
  primaryHref = "/contact",
  primaryLabel = "Request a pricing quote",
}: Props) {
  return (
    <section
      className="relative mt-14 overflow-hidden rounded-2xl border-2 border-accent/35 bg-gradient-to-b from-brand-muted via-white to-white p-8 text-center shadow-card md:p-10"
      aria-labelledby="pricing-cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-accent-soft/30"
        aria-hidden
      />
      <div className="relative">
        <h2 id="pricing-cta-heading" className="font-display text-title text-brand">
          Pricing &amp; quotes
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-ink-secondary">
          {serviceLabel} are quoted based on scope, materials, timeline, and any validation or regulatory documentation you
          need. There is no one-size-fits-all price — share your requirements and we will send a detailed estimate.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={primaryHref}
            className="inline-flex rounded-full bg-accent px-8 py-3 text-sm font-bold text-white shadow-lg shadow-accent/30 transition hover:bg-accent-hover"
          >
            {primaryLabel}
          </Link>
          <Link
            href="tel:+19256772200"
            className="inline-flex rounded-full border-2 border-brand/25 bg-white px-8 py-3 text-sm font-bold text-brand transition hover:border-accent"
          >
            Call +1 (925) 677-2200
          </Link>
        </div>
        <p className="mt-4 text-xs text-ink-tertiary">Most quote requests receive a response within one business day.</p>
      </div>
    </section>
  )
}
