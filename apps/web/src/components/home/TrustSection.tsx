const institutions = [
  "Stanford University",
  "UCSF",
  "NIH",
  "Harvard Medical School",
  "MD Anderson Cancer Center",
  "Johns Hopkins University",
  "Broad Institute",
  "Memorial Sloan Kettering",
] as const

export function TrustSection() {
  return (
    <section
      id="trust"
      className="border-t border-brand/10 bg-gradient-to-br from-brand-muted/60 via-white to-brand-tint py-[var(--section-y)]"
      aria-labelledby="trust-heading"
    >
      <div className="container-content">
        <div className="max-w-3xl">
          <h2 id="trust-heading" className="font-display text-display-md text-brand">
            Trusted by researchers worldwide
          </h2>
          <p className="mt-3 text-ink-secondary">
            BosterBio antibodies and kits appear in tens of thousands of publications. Labs at leading institutions rely
            on our validation data and technical support for reproducible results.
          </p>
        </div>

        <div className="mt-10">
          <p className="text-sm font-bold uppercase tracking-wider text-brand/70">Institutions &amp; centers</p>
          <ul className="mt-4 flex min-w-0 flex-wrap gap-3" aria-label="Example institutions using BosterBio products">
            {institutions.map((name) => (
              <li
                key={name}
                className="rounded-full border border-brand/15 bg-white px-4 py-2 text-sm font-medium text-ink-secondary shadow-sm"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
