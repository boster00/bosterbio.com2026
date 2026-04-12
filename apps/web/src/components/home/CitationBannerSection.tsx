/**
 * Full-width banner between trust and resources — citations stat with wave divider into Resources.
 */
export function CitationBannerSection() {
  return (
    <section
      id="citations-banner"
      className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-light to-[#2563eb] pb-0 pt-14 text-white md:pt-16"
      aria-labelledby="citations-banner-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 0%, transparent 45%), radial-gradient(circle at 80% 30%, #f97316 0%, transparent 35%)`,
        }}
        aria-hidden
      />
      <div className="container-content relative pb-14 md:pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Publication impact</p>
          <h2 id="citations-banner-heading" className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem]">
            Over <span className="text-accent">52,000+</span> peer-reviewed citations
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
            Researchers worldwide cite BosterBio reagents in journals across immunology, oncology, neuroscience, and
            beyond.
          </p>
        </div>
      </div>
      {/* Single filled path — no stacked semi-transparent layers (avoids seam/line artifacts) */}
      <div className="relative w-full translate-y-px leading-[0]" aria-hidden>
        <svg
          className="block h-12 w-full text-white md:h-16"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="currentColor" d="M0 8c200 20 400 20 600 4s400-16 600-4 160 8 240 8V64H0V8z" />
        </svg>
      </div>
    </section>
  )
}
