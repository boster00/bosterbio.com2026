const stats = [
  { value: "60,000+", label: "Publications citing our products" },
  { value: "4.8", label: "Average researcher rating" },
  { value: "30+", label: "Years serving the life sciences" },
] as const

export function TrustSection() {
  return (
    <section
      id="trust"
      className="border-y border-surface-muted bg-white py-[var(--section-y)]"
      aria-labelledby="trust-heading"
    >
      <div className="container-content">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 id="trust-heading" className="font-display text-display-md text-ink">
              Trusted in peer-reviewed research
            </h2>
            <p className="mt-3 text-ink-secondary">
              We publish validation images, lot-specific COAs, and protocols so you can reproduce results in your own
              lab — not just marketing claims.
            </p>
          </div>
          <ul className="grid w-full max-w-2xl gap-8 sm:grid-cols-3">
            {stats.map((s) => (
              <li key={s.label} className="text-center sm:text-left">
                <p className="font-display text-3xl font-bold tabular-nums text-brand">{s.value}</p>
                <p className="mt-1 text-sm text-ink-secondary">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
