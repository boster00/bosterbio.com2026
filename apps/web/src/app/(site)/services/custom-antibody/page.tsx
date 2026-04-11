import Link from "next/link"

export default function CustomAntibodyServicePage() {
  return (
    <main id="main-content">
      <div className="border-b border-surface-muted bg-surface-subtle">
        <div className="container-content py-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">Services</p>
          <h1 className="mt-2 font-display text-display-md text-ink">Custom antibody development</h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-secondary">
            From peptide or protein antigen through immunization, hybridoma screening or polyclonal bleeds, affinity
            purification, and application-specific validation — we partner with your team to deliver antibodies that work
            in your assay.
          </p>
        </div>
      </div>
      <div className="container-content max-w-3xl py-12 md:py-16">
        <section>
          <h2 className="font-display text-title text-ink">What we offer</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-secondary">
            <li>Polyclonal and monoclonal projects tailored to your antigen and application</li>
            <li>Phospho-specific and modification-state antibodies where the epitope allows</li>
            <li>Optional conjugation (HRP, biotin, fluorophores) and assay-ready formats</li>
            <li>Validation planning aligned to Western blot, IHC, ICC, ELISA, or flow cytometry</li>
          </ul>
          <h2 className="mt-10 font-display text-title text-ink">Typical workflow</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-ink-secondary">
            <li>Antigen design review and project scoping</li>
            <li>Immunization and screening</li>
            <li>Clone selection or serum pooling and purification</li>
            <li>QC and optional application testing</li>
            <li>Delivery with documentation for your records</li>
          </ol>
        </section>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-light"
          >
            Request a quote
          </Link>
          <Link
            href="/services"
            className="inline-flex rounded-md border border-surface-muted px-6 py-3 text-sm font-semibold text-ink hover:border-brand/30"
          >
            All services
          </Link>
        </div>
      </div>
    </main>
  )
}
