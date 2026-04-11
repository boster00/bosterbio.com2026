import Link from "next/link"

export default function ConjugationServicePage() {
  return (
    <main id="main-content">
      <div className="page-hero-bar border-b border-brand/10">
        <div className="container-content py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Services</p>
          <h1 className="mt-2 font-display text-display-md text-brand">Antibody conjugation services</h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-secondary">
            Conjugate your antibody — or ours — with HRP, alkaline phosphatase, biotin, or fluorescent dyes. We optimize
            labeling ratios to preserve binding activity and provide QC data for your regulatory or publication needs.
          </p>
        </div>
      </div>
      <div className="container-content max-w-3xl py-12 md:py-16">
        <h2 className="font-display text-title text-brand">Common conjugates</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-secondary">
          <li>HRP and AP for ELISA and Western blot</li>
          <li>Biotin for streptavidin platforms and bead-based assays</li>
          <li>Alexa Fluor® and other fluorophores for flow cytometry and imaging</li>
        </ul>
        <h2 className="mt-10 font-display text-title text-brand">Catalog conjugation kits</h2>
        <p className="mt-4 text-ink-secondary">
          Prefer to label in your own lab? See our conjugation kits in the product catalog for controlled, reproducible
          small-scale reactions.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-accent px-8 py-3 text-sm font-bold text-white shadow-md shadow-accent/25 hover:bg-accent-hover"
          >
            Request conjugation
          </Link>
          <Link
            href="/products?category=conjugation"
            className="inline-flex rounded-full border-2 border-brand/20 px-8 py-3 text-sm font-bold text-brand hover:border-accent"
          >
            Conjugation kits
          </Link>
        </div>
      </div>
    </main>
  )
}
