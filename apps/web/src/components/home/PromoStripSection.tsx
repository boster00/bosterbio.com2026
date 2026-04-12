import Link from "next/link"

/** Compact mascot for promo strip (right side) */
function PromoMascot() {
  return (
    <div className="hidden shrink-0 sm:block" aria-hidden>
      <svg viewBox="0 0 72 72" className="h-14 w-14 text-white drop-shadow-md md:h-16 md:w-16">
        <circle cx="36" cy="28" r="18" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5" />
        <circle cx="36" cy="26" r="14" fill="#1a365d" stroke="white" strokeWidth="1.2" />
        <circle cx="31" cy="24" r="2.5" fill="white" />
        <circle cx="41" cy="24" r="2.5" fill="white" />
        <path d="M30 32 Q36 36 42 32" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <line x1="36" y1="10" x2="36" y2="4" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="36" cy="2" r="3" fill="#f97316" />
        <rect x="28" y="44" width="20" height="22" rx="5" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1" />
        <circle cx="36" cy="54" r="6" fill="#f97316" />
        <text x="36" y="57.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="system-ui">
          Y
        </text>
      </svg>
    </div>
  )
}

export function PromoStripSection() {
  return (
    <section
      className="relative overflow-x-clip border-b border-teal-600/30 bg-gradient-to-r from-brand via-brand-light to-teal-500 py-5 shadow-lg shadow-black/15 md:py-6"
      aria-label="Promotions"
    >
      <img
        src="/images/promo-underwater-banner.svg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-40 mix-blend-soft-light"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 to-transparent"
        aria-hidden
      />
      <div className="container-content relative flex min-w-0 flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-6">
        <p className="min-w-0 flex-1 text-center text-base font-bold leading-snug text-white drop-shadow-sm sm:text-left md:text-lg lg:text-xl">
          <span className="rounded-md bg-white/20 px-2 py-1 text-white backdrop-blur-sm">Dive into savings</span>
          <span className="mt-2 block font-semibold text-white/95 sm:mt-0 sm:inline sm:pl-2">
            Bundle pricing on antibodies &amp; ELISA kits for your lab.
          </span>
        </p>
        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:items-center">
          <PromoMascot />
          <Link
            href="/contact"
            className="w-full shrink-0 rounded-full bg-white px-7 py-3 text-center text-sm font-bold uppercase tracking-wide text-brand shadow-lg transition duration-200 hover:scale-[1.03] hover:bg-accent-soft hover:shadow-xl active:scale-[0.98] sm:w-auto"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </section>
  )
}
