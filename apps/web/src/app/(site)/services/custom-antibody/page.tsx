import Link from "next/link"
import { ServicePricingCta } from "@/components/services/ServicePricingCta"
import { ServiceTitleIcon } from "@/components/services/ServiceTitleIcon"
import { ServiceWorkflow } from "@/components/services/ServiceWorkflow"

const workflowSteps = [
  {
    title: "Consultation",
    description: "Review antigen sequence, immunogenicity, and intended applications (WB, IHC, flow, etc.).",
  },
  {
    title: "Antigen prep",
    description: "Peptide synthesis, protein expression, or customer-supplied antigen with QC.",
  },
  {
    title: "Immunization & screening",
    description: "Polyclonal bleeds or hybridoma fusion with titre and binding screens.",
  },
  {
    title: "Purification & QC",
    description: "Affinity purification, concentration, and lot documentation.",
  },
  {
    title: "Validation & delivery",
    description: "Optional application testing; antibody and data package shipped to your lab.",
  },
] as const

export default function CustomAntibodyServicePage() {
  return (
    <main id="main-content">
      <div className="page-hero-bar border-b border-brand/10">
        <div className="container-content py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Services</p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <ServiceTitleIcon variant="antibody" />
            <h1 className="font-display text-display-md text-brand">Custom antibody development</h1>
          </div>
          <p className="mt-4 max-w-3xl text-lg text-ink-secondary">
            From peptide or protein antigen through immunization, hybridoma screening or polyclonal bleeds, affinity
            purification, and application-specific validation — we partner with your team to deliver antibodies that work
            in your assay.
          </p>
        </div>
      </div>

      <div className="container-content max-w-4xl py-12 md:py-16">
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="font-display text-title text-brand">
            Service overview
          </h2>
          <p className="mt-4 text-ink-secondary">
            Whether you need a polyclonal for a short peptide or a monoclonal for a conformational epitope, our team maps
            the project to your downstream assay. We document each stage so you can reproduce or extend the reagent in
            regulated or publication settings.
          </p>
          <h3 className="mt-8 font-display text-lg font-semibold text-brand">What we offer</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-secondary">
            <li>Polyclonal and monoclonal projects tailored to your antigen and application</li>
            <li>Phospho-specific and modification-state antibodies where the epitope allows</li>
            <li>Optional conjugation (HRP, biotin, fluorophores) and assay-ready formats</li>
            <li>Validation planning aligned to Western blot, IHC, ICC, ELISA, or flow cytometry</li>
          </ul>
        </section>

        <ServiceWorkflow steps={[...workflowSteps]} />

        <ServicePricingCta serviceLabel="Custom antibody development projects" />

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-brand px-8 py-3 text-sm font-bold text-white shadow-md transition hover:bg-brand-light"
          >
            Start a project
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
