export default function AboutPage() {
  return (
    <main id="main-content">
      <div className="border-b border-surface-muted bg-surface-subtle">
        <div className="container-content py-12 md:py-16">
          <h1 className="font-display text-display-md text-ink">About BosterBio</h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-secondary">
            We help researchers move from hypothesis to publication with reagents backed by validation data, responsive
            technical support, and a catalog designed around real experimental workflows.
          </p>
        </div>
      </div>

      <div className="container-content py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="mission">
            <h2 id="mission" className="font-display text-title text-ink">
              Our mission
            </h2>
            <p className="mt-4 text-ink-secondary">
              Life science moves fast. We believe product pages should show how an antibody performs in the applications
              you care about — with images, citations, and protocols you can follow in your own lab.
            </p>
          </section>
          <section aria-labelledby="quality" className="rounded-xl border border-surface-muted bg-white p-8 shadow-card">
            <h2 id="quality" className="font-display text-title text-ink">
              Quality &amp; validation
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-secondary">
              <li>Application-specific validation (WB, IHC, ICC, FC, and more)</li>
              <li>Lot-specific documentation where available</li>
              <li>Scientific support from specialists who run the same assays</li>
            </ul>
          </section>
        </div>

        <section id="careers" className="mt-16 scroll-mt-28 border-t border-surface-muted pt-16">
          <h2 className="font-display text-title text-ink">Careers</h2>
          <p className="mt-4 max-w-2xl text-ink-secondary">
            We are always interested in scientists and engineers who care about reproducibility. Reach out through{" "}
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
