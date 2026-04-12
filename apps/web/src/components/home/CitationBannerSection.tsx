/**
 * Full-width banner between trust and resources — citations stat with wave divider.
 */
export function CitationBannerSection() {
  return (
    <section
      id="citations-banner"
      className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-light to-[#2563eb] py-14 text-white md:py-16"
      aria-labelledby="citations-banner-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 0%, transparent 45%), radial-gradient(circle at 80% 30%, #f97316 0%, transparent 35%)`,
        }}
        aria-hidden
      />
      <div className="container-content relative">
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
      <div className="relative mt-10 w-full leading-none" aria-hidden>
        <svg
          className="block h-12 w-full text-white md:h-16"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="currentColor" fillOpacity="0.25" d="M0 24c180 18 360 18 540 0s360-18 540 0 180 18 360 0V48H0z" />
          <path fill="currentColor" d="M0 30c240 22 480 22 720 0s480-22 720 0v18H0z" />
        </svg>
      </div>
    </section>
  )
}
