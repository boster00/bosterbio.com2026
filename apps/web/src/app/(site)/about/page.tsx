export default function AboutPage() {
  return (
    <main id="main-content">
      <div className="border-b border-surface-muted bg-surface-subtle">
        <div className="container-content py-12 md:py-16">
          <h1 className="font-display text-display-md text-ink">About BosterBio</h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-secondary">
            Boster Biological Technology was founded in{" "}
            <strong className="font-semibold text-ink">Pleasanton, California</strong> — in the heart of the Bay Area
            life science community. For more than three decades we have supplied researchers with antibodies, ELISA
            kits, and custom services backed by validation data you can use in your own lab.
          </p>
        </div>
      </div>

      <div className="container-content py-12 md:py-16">
        <div className="grid gap-8 rounded-xl border border-surface-muted bg-white p-8 shadow-card md:grid-cols-3 md:p-10">
          <div>
            <p className="font-display text-3xl font-bold tabular-nums text-brand">15,000+</p>
            <p className="mt-1 text-sm font-medium text-ink-secondary">Catalog antibodies &amp; growing</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-brand">Custom</p>
            <p className="mt-1 text-sm font-medium text-ink-secondary">
              Antibody development, ELISA development, conjugation &amp; more
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-brand">ELISA</p>
            <p className="mt-1 text-sm font-medium text-ink-secondary">
              Picokine® and EZ-Set® kits for quantitative immunoassays
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="mission">
            <h2 id="mission" className="font-display text-title text-ink">
              Our mission
            </h2>
            <p className="mt-4 text-ink-secondary">
              We believe high-quality antibodies should be <strong className="font-semibold text-ink">accessible</strong>{" "}
              to every lab — with transparent validation, responsive technical support, and fair access to both catalog
              products and custom projects. Our goal is to help you move from hypothesis to publication with reagents you
              can trust.
            </p>
          </section>
          <section aria-labelledby="quality" className="rounded-xl border border-surface-muted bg-surface-subtle p-8">
            <h2 id="quality" className="font-display text-title text-ink">
              What we stand for
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-secondary">
              <li>Application-specific validation on product pages (WB, IHC, ICC, flow, and more)</li>
              <li>Scientists answering your technical questions — not a generic call center</li>
              <li>Same-day shipping on qualifying in-stock orders so your experiments stay on schedule</li>
            </ul>
          </section>
        </div>

        <section id="team" className="mt-16 scroll-mt-28 border-t border-surface-muted pt-16">
          <h2 className="font-display text-title text-ink">Our team</h2>
          <p className="mt-4 max-w-2xl text-ink-secondary">
            Team photos and leadership bios will be added here. BosterBio brings together immunologists, assay
            developers, and manufacturing specialists under one roof in Pleasanton.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex aspect-[4/5] flex-col items-center justify-center rounded-xl border border-dashed border-surface-muted bg-surface-subtle text-center"
              >
                <span className="text-sm font-medium text-ink-tertiary">Team member</span>
                <span className="mt-1 text-xs text-ink-tertiary">Photo &amp; bio coming soon</span>
              </div>
            ))}
          </div>
        </section>

        <section id="careers" className="mt-16 scroll-mt-28 border-t border-surface-muted pt-16">
          <h2 className="font-display text-title text-ink">Careers</h2>
          <p className="mt-4 max-w-2xl text-ink-secondary">
            Interested in joining us? Send your CV to{" "}
            <a href="mailto:careers@bosterbio.com" className="font-semibold text-brand hover:underline">
              careers@bosterbio.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
