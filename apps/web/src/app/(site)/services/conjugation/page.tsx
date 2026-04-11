import Link from "next/link"

export default function ConjugationServicePage() {
  return (
    <main id="main-content">
      <div className="border-b border-surface-muted bg-surface-subtle">
        <div className="container-content py-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">Services</p>
          <h1 className="mt-2 font-display text-display-md text-ink">Antibody conjugation services</h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-secondary">
            Conjugate your antibody — or ours — with HRP, alkaline phosphatase, biotin, or fluorescent dyes. We optimize
            labeling ratios to preserve binding activity and provide QC data for your regulatory or publication needs.
          </p>
        </div>
      </div>
      <div className="container-content max-w-3xl py-12 md:py-16">
        <h2 className="font-display text-title text-ink">Common conjugates</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-secondary">
          <li>HRP and AP for ELISA and Western blot</li>
          <li>Biotin for streptavidin platforms and bead-based assays</li>
          <li>Alexa Fluor® and other fluorophores for flow cytometry and imaging</li>
        </ul>
        <h2 className="mt-10 font-display text-title text-ink">Catalog conjugation kits</h2>
        <p className="mt-4 text-ink-secondary">
          Prefer to label in your own lab? See our conjugation kits in the product catalog for controlled, reproducible
          small-scale reactions.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-light"
          >
            Request conjugation
          </Link>
          <Link
            href="/products?category=conjugation"
            className="inline-flex rounded-md border border-surface-muted px-6 py-3 text-sm font-semibold text-ink hover:border-brand/30"
          >
            Conjugation kits
          </Link>
        </div>
      </div>
    </main>
  )
}
