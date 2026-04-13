import Link from "next/link"
import { AntibodyRobotMascot } from "./AntibodyRobotMascot"

function MascotPanel() {
  return (
    <div
      className="relative mx-auto w-full max-w-[min(100%,22rem)] overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-b from-brand-light/30 to-brand-deep shadow-2xl sm:max-w-md lg:max-w-none"
      aria-hidden
    >
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/25 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
      <div className="relative px-4 pt-6 sm:px-6 sm:pt-8">
        <AntibodyRobotMascot className="mx-auto h-auto w-full max-h-[min(52vw,280px)] sm:max-h-[300px]" />
      </div>
      <p className="relative px-4 pb-5 text-center text-xs font-medium text-white/90 sm:px-6 sm:pb-6 sm:text-sm">
        <span className="text-accent">Science</span> with a smile — reagents you can trust in every experiment.
      </p>
    </div>
  )
}

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-x-clip overflow-y-visible bg-brand text-white">
      {/* Underwater-inspired soft light rays */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, #38bdf8 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 100% 100%, #f97316 0%, transparent 50%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120'%3E%3Cpath fill='%23ffffff' d='M0 60c240 30 480 30 720 0s480-30 720 0v60H0z'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 120px",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />

      <div className="container-content relative grid gap-10 py-[var(--section-y)] sm:gap-12 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">
            Boster Biological Technology
          </p>
          <h1 className="mt-3 font-display text-[1.65rem] font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[3.25rem]">
            Trusted Antibodies for Life Science Research
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Primary and secondary antibodies, ELISA kits, and custom services — validated data, expert support, and
            same-day shipping on in-stock orders placed before cutoff.
          </p>
          <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/products"
              className="cta-pill-primary inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-black/15 sm:w-auto sm:flex-none sm:px-7"
            >
              Browse catalog
            </Link>
            <Link
              href="/resources#protocols"
              className="cta-pill-secondary inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-full border-2 border-white/50 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm sm:w-auto sm:flex-none sm:px-7"
            >
              Protocols &amp; FAQs
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-1 gap-4 border-t border-white/20 pt-8 sm:grid-cols-3 sm:max-w-2xl">
            <div className="min-w-0">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-white/60 sm:text-xs">Catalog antibodies</dt>
              <dd className="mt-1 font-display text-xl font-bold tabular-nums text-accent sm:text-2xl">15,000+</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-white/60 sm:text-xs">Zebrafish antibodies</dt>
              <dd className="mt-1 font-display text-xl font-bold tabular-nums text-white sm:text-2xl">600+</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[10px] font-medium uppercase tracking-wide text-white/60 sm:text-xs">Fulfillment</dt>
              <dd className="mt-1 font-display text-lg font-bold leading-tight text-white sm:text-xl md:text-2xl">Same-day ship</dd>
              <dd className="text-[11px] leading-snug text-white/65 sm:text-xs">In-stock orders — see product pages for cutoff</dd>
            </div>
          </dl>
        </div>
        <div className="relative min-w-0">
          <MascotPanel />
          <div className="mt-4 w-full max-w-md rounded-xl border border-accent/50 bg-accent-soft px-4 py-3 text-ink shadow-card lg:absolute lg:-bottom-2 lg:left-1/2 lg:mt-0 lg:w-[min(100%,220px)] lg:-translate-x-1/2 xl:-left-4 xl:right-auto xl:translate-x-0">
            <p className="text-[10px] font-bold uppercase tracking-wide text-accent sm:text-xs">Pleasanton, CA</p>
            <p className="mt-0.5 text-[11px] font-medium leading-snug text-ink-secondary sm:text-xs">
              Serving labs worldwide since 1993.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
