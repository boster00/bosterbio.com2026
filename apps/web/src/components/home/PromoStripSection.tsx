import Link from "next/link"

/** High-visibility promo strip — strong orange accent per brand library */
export function PromoStripSection() {
  return (
    <section
      className="relative overflow-x-clip border-b-2 border-accent/40 bg-gradient-to-r from-accent via-orange-400 to-accent py-4 shadow-md shadow-accent/20"
      aria-label="Promotions"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='36' fill='none' stroke='%23ffffff' stroke-width='2' stroke-dasharray='8 6'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />
      <div className="container-content relative flex min-w-0 flex-col items-stretch justify-between gap-3 text-center sm:flex-row sm:items-center sm:text-left">
        <p className="min-w-0 text-sm font-bold leading-snug text-white drop-shadow-sm sm:text-base">
          <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-white">Dive into savings</span>
          <span className="mt-1 block text-white/95 sm:mt-0 sm:inline sm:pl-1">
            {" "}
            — bundle pricing on antibodies &amp; ELISA kits for your lab.
          </span>
        </p>
        <Link
          href="/contact"
          className="cta-promo shrink-0 rounded-full bg-brand-deep px-6 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-white shadow-lg transition duration-200 hover:scale-[1.03] hover:bg-brand hover:shadow-xl active:scale-[0.98] sm:py-2"
        >
          Get a quote
        </Link>
      </div>
    </section>
  )
}
