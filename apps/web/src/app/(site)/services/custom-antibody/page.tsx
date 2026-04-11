import Link from "next/link"

export default function CustomAntibodyServicePage() {
  return (
    <main id="main-content">
      <div className="page-hero-bar border-b border-brand/10">
        <div className="container-content py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Services</p>
          <h1 className="mt-2 font-display text-display-md text-brand">Custom antibody development</h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-secondary">
            From peptide or protein antigen through immunization, hybridoma screening or polyclonal bleeds, affinity
            purification, and application-specific validation — we partner with your team to deliver antibodies that work
            in your assay.
          </p>
        </div>
      </div>
      <div className="container-content max-w-3xl py-12 md:py-16">
        <section>
          <h2 className="font-display text-title text-brand">What we offer</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-secondary">
            <li>Polyclonal and monoclonal projects tailored to your antigen and application</li>
            <li>Phospho-specific and modification-state antibodies where the epitope allows</li>
            <li>Optional conjugation (HRP, biotin, fluorophores) and assay-ready formats</li>
            <li>Validation planning aligned to Western blot, IHC, ICC, ELISA, or flow cytometry</li>
          </ul>
          <h2 className="mt-10 font-display text-title text-brand">Typical workflow</h2>
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
            className="inline-flex rounded-full bg-accent px-8 py-3 text-sm font-bold text-white shadow-md shadow-accent/25 hover:bg-accent-hover"
          >
            Request a quote
          </Link>
          <Link
            href="/services"
            className="inline-flex rounded-full border-2 border-brand/20 px-8 py-3 text-sm font-bold text-brand hover:border-accent"
          >
            All services
          </Link>
        </div>
      </div>
    </main>
  )
}
