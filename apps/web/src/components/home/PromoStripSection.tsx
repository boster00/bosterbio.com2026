import Link from "next/link"

/** Promotional strip — underwater / savings theme without specific sale copy */
export function PromoStripSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-brand/10 bg-gradient-to-r from-sky-100/80 via-brand-tint to-accent-soft py-4"
      aria-label="Promotions"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 20'%3E%3Cpath fill='%231a365d' fill-opacity='.06' d='M0 10c20-8 40-8 60 0s40 8 60 0v10H0z'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 20px",
        }}
        aria-hidden
      />
      <div className="container-content relative flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="text-sm font-semibold text-brand">
          <span className="text-accent">Dive into savings</span> — ask about bundle pricing on antibodies &amp; ELISA kits for your lab.
        </p>
        <Link
          href="/contact"
          className="shrink-0 rounded-full bg-brand px-5 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-brand-light"
        >
          Get a quote
        </Link>
      </div>
    </section>
  )
}
