import Link from "next/link"
import { CategoryBadgeIcon } from "@/components/ui/CategoryBadgeIcon"

const services = [
  {
    title: "Custom antibody development",
    href: "/services/custom-antibody",
    desc: "Polyclonal and monoclonal projects from peptide or protein antigen through affinity purification and validation.",
    badge: "custom" as const,
  },
  {
    title: "ELISA assay development",
    href: "/services/elisa-development",
    desc: "Sandwich and competitive ELISA development, optimization, and lot release testing for your analyte.",
    badge: "elisa" as const,
  },
  {
    title: "Antibody conjugation",
    href: "/services/conjugation",
    desc: "HRP, biotin, fluorophores, and other labels — performed under controlled conditions with QC you can document.",
    badge: "conjugation" as const,
  },
  {
    title: "Multiplex IHC",
    href: "/services/multiplex-ihc",
    desc: "Multiplex immunohistochemistry panel design and staining services for complex tissue studies.",
    badge: "protocols" as const,
  },
] as const

export default function ServicesPage() {
  return (
    <main id="main-content">
      <div className="page-hero-bar border-b border-brand/10">
        <div className="container-content py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Partner with us</p>
          <h1 className="mt-2 font-display text-display-md text-brand">Custom services</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-secondary">
            Antibody generation, assay development, conjugation, and multiplex IHC — built on the same validation
            mindset as our catalog, with scientists guiding every milestone.
          </p>
        </div>
      </div>
      <div className="container-content py-12">
        <ul className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="flex h-full gap-5 rounded-2xl border border-brand/10 bg-white p-8 shadow-card transition hover:border-accent/40 hover:shadow-lg"
              >
                <CategoryBadgeIcon variant={s.badge} size="md" />
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-title text-brand">{s.title}</h2>
                  <p className="mt-3 text-sm text-ink-secondary">{s.desc}</p>
                  <span className="mt-4 inline-block text-sm font-bold text-accent">Learn more →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
