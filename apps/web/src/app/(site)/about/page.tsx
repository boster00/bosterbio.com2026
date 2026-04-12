import { CategoryBadgeIcon } from "@/components/ui/CategoryBadgeIcon"

function TeamPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center rounded-full border-2 border-accent/40 bg-gradient-to-b from-accent-soft to-orange-100/90 p-1 shadow-md aspect-square w-[min(100%,11rem)] mx-auto">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-gradient-to-b from-orange-200/80 to-accent/30">
        <svg
          viewBox="0 0 48 48"
          className="h-14 w-14 text-brand/70"
          fill="currentColor"
          aria-hidden
        >
          <circle cx="24" cy="16" r="8" opacity="0.9" />
          <path
            d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
        <span className="mt-2 px-2 text-center text-xs font-semibold text-brand">Team member</span>
        <span className="mt-0.5 px-2 text-center text-[10px] text-brand/70">Bio coming soon</span>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main id="main-content">
      <div className="page-hero-bar border-b border-brand/10">
        <div className="container-content py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Our story</p>
          <h1 className="mt-2 font-display text-display-md text-brand">About BosterBio</h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-secondary">
            Boster Biological Technology was founded in{" "}
            <strong className="font-semibold text-brand">Pleasanton, California</strong> — in the heart of the Bay Area
            life science community. For more than three decades we have supplied researchers with antibodies, ELISA
            kits, and custom services backed by validation data you can use in your own lab.
          </p>
        </div>
      </div>

      <div className="container-content py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex gap-4 rounded-2xl border-x border-b border-brand/10 border-t-2 border-t-accent bg-white p-6 shadow-card">
            <CategoryBadgeIcon variant="antibodies" size="sm" />
            <div>
              <p className="font-display text-3xl font-bold tabular-nums text-accent">15,000+</p>
              <p className="mt-1 text-sm font-medium text-ink-secondary">Catalog antibodies &amp; growing</p>
            </div>
          </div>
          <div className="flex gap-4 rounded-2xl border-x border-b border-brand/10 border-t-2 border-t-accent bg-white p-6 shadow-card">
            <CategoryBadgeIcon variant="custom" size="sm" />
            <div>
              <p className="font-display text-2xl font-bold text-brand">Custom</p>
              <p className="mt-1 text-sm font-medium text-ink-secondary">
                Antibody &amp; ELISA development, conjugation &amp; more
              </p>
            </div>
          </div>
          <div className="flex gap-4 rounded-2xl border-x border-b border-brand/10 border-t-2 border-t-accent bg-white p-6 shadow-card">
            <CategoryBadgeIcon variant="elisa" size="sm" />
            <div>
              <p className="font-display text-2xl font-bold text-brand">ELISA</p>
              <p className="mt-1 text-sm font-medium text-ink-secondary">
                Picokine® and EZ-Set® kits for quantitative immunoassays
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="mission" className="rounded-2xl border border-brand/10 bg-brand-tint/50 p-8">
            <h2 id="mission" className="font-display text-title text-brand">
              Our mission
            </h2>
            <p className="mt-4 text-ink-secondary">
              We believe high-quality antibodies should be <strong className="font-semibold text-brand">accessible</strong>{" "}
              to every lab — with transparent validation, responsive technical support, and fair access to both catalog
              products and custom projects. Our goal is to help you move from hypothesis to publication with reagents you
              can trust.
            </p>
          </section>
          <section
            aria-labelledby="quality"
            className="rounded-2xl border-2 border-accent/30 bg-accent-soft/40 p-8"
          >
            <h2 id="quality" className="font-display text-title text-brand">
              What we stand for
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-secondary">
              <li>Application-specific validation on product pages (WB, IHC, ICC, flow, and more)</li>
              <li>Scientists answering your technical questions — not a generic call center</li>
              <li>Same-day shipping on qualifying in-stock orders so your experiments stay on schedule</li>
            </ul>
          </section>
        </div>

        <section id="team" className="mt-16 scroll-mt-28 border-t border-brand/10 pt-16">
          <h2 className="font-display text-title text-brand">Our team</h2>
          <p className="mt-4 max-w-2xl text-ink-secondary">
            Team photos and leadership bios will be added here. BosterBio brings together immunologists, assay
            developers, and manufacturing specialists under one roof in Pleasanton.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-center py-2">
                <TeamPlaceholder />
              </div>
            ))}
          </div>
        </section>

        <section id="careers" className="mt-16 scroll-mt-28 border-t border-brand/10 pt-16">
          <h2 className="font-display text-title text-brand">Careers</h2>
          <p className="mt-4 max-w-2xl text-ink-secondary">
            Interested in joining us? Send your CV to{" "}
            <a href="mailto:careers@bosterbio.com" className="font-bold text-accent hover:underline">
              careers@bosterbio.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
