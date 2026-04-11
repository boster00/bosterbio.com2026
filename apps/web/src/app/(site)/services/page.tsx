import Link from "next/link"

const services = [
  {
    title: "Custom antibody development",
    href: "/services/custom-antibody",
    desc: "Polyclonal and monoclonal projects from peptide or protein antigen through affinity purification and validation.",
  },
  {
    title: "ELISA assay development",
    href: "/services/elisa-development",
    desc: "Sandwich and competitive ELISA development, optimization, and lot release testing for your analyte.",
  },
  {
    title: "Antibody conjugation",
    href: "/services/conjugation",
    desc: "HRP, biotin, fluorophores, and other labels — performed under controlled conditions with QC you can document.",
  },
  {
    title: "Multiplex IHC",
    href: "/services/multiplex-ihc",
    desc: "Multiplex immunohistochemistry panel design and staining services for complex tissue studies.",
  },
] as const

export default function ServicesPage() {
  return (
    <main id="main-content">
      <div className="border-b border-surface-muted bg-surface-subtle">
        <div className="container-content py-12 md:py-16">
          <h1 className="font-display text-display-md text-ink">Custom services</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-secondary">
            Partner with BosterBio for antibody generation, assay development, conjugation, and multiplex IHC — built on
            the same validation standards as our catalog products.
          </p>
        </div>
      </div>
      <div className="container-content py-12">
        <ul className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="block h-full rounded-xl border border-surface-muted bg-surface p-8 shadow-card transition hover:border-brand/30"
              >
                <h2 className="font-display text-title text-brand">{s.title}</h2>
                <p className="mt-3 text-sm text-ink-secondary">{s.desc}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-brand">Learn more →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
