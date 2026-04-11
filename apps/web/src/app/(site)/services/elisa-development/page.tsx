import Link from "next/link"

export default function ElisaDevelopmentServicePage() {
  return (
    <main id="main-content">
      <div className="border-b border-surface-muted bg-surface-subtle">
        <div className="container-content py-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">Services</p>
          <h1 className="mt-2 font-display text-display-md text-ink">ELISA assay development</h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-secondary">
            Sandwich and competitive ELISA development for your analyte — from antibody pairing and standard curve design
            through plate coating, buffer optimization, and lot-to-lot consistency.
          </p>
        </div>
      </div>
      <div className="container-content max-w-3xl py-12 md:py-16">
        <h2 className="font-display text-title text-ink">Capabilities</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-secondary">
          <li>Pairing of capture and detection antibodies (including custom-generated reagents)</li>
          <li>Recombinant protein or peptide standards and sample diluent matrices</li>
          <li>Sensitivity, specificity, and precision studies for validation packages</li>
          <li>Scale-up support for recurring manufacturing</li>
        </ul>
        <h2 className="mt-10 font-display text-title text-ink">Ideal for</h2>
        <p className="mt-4 text-ink-secondary">
          Biomarker programs, bioprocess impurity testing, vaccine immune response monitoring, and research kits that need
          a documented ELISA format before transfer to your QC lab.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-light"
          >
            Discuss your analyte
          </Link>
          <Link
            href="/products?category=elisa"
            className="inline-flex rounded-md border border-surface-muted px-6 py-3 text-sm font-semibold text-ink hover:border-brand/30"
          >
            Browse ELISA kits
          </Link>
        </div>
      </div>
    </main>
  )
}
