import Link from "next/link"

export default function ElisaDevelopmentServicePage() {
  return (
    <main id="main-content">
      <div className="page-hero-bar border-b border-brand/10">
        <div className="container-content py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Services</p>
          <h1 className="mt-2 font-display text-display-md text-brand">ELISA assay development</h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-secondary">
            Sandwich and competitive ELISA development for your analyte — from antibody pairing and standard curve design
            through plate coating, buffer optimization, and lot-to-lot consistency.
          </p>
        </div>
      </div>
      <div className="container-content max-w-3xl py-12 md:py-16">
        <h2 className="font-display text-title text-brand">Capabilities</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-secondary">
          <li>Pairing of capture and detection antibodies (including custom-generated reagents)</li>
          <li>Recombinant protein or peptide standards and sample diluent matrices</li>
          <li>Sensitivity, specificity, and precision studies for validation packages</li>
          <li>Scale-up support for recurring manufacturing</li>
        </ul>
        <h2 className="mt-10 font-display text-title text-brand">Ideal for</h2>
        <p className="mt-4 text-ink-secondary">
          Biomarker programs, bioprocess impurity testing, vaccine immune response monitoring, and research kits that need
          a documented ELISA format before transfer to your QC lab.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-accent px-8 py-3 text-sm font-bold text-white shadow-md shadow-accent/25 hover:bg-accent-hover"
          >
            Discuss your analyte
          </Link>
          <Link
            href="/products?category=elisa"
            className="inline-flex rounded-full border-2 border-brand/20 px-8 py-3 text-sm font-bold text-brand hover:border-accent"
          >
            Browse ELISA kits
          </Link>
        </div>
      </div>
    </main>
  )
}
