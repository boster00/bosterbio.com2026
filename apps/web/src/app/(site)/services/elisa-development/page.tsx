import Link from "next/link"
import { ServicePricingCta } from "@/components/services/ServicePricingCta"
import { ServiceWorkflow } from "@/components/services/ServiceWorkflow"

const workflowSteps = [
  {
    title: "Requirements",
    description: "Define analyte, matrix, sensitivity target, and regulatory or RUO use case.",
  },
  {
    title: "Antibody pairing",
    description: "Screen capture/detection pairs and optimize coating and detection concentrations.",
  },
  {
    title: "Assay build",
    description: "Buffer matrices, standards, controls, and plate map with initial precision checks.",
  },
  {
    title: "Optimization",
    description: "Dose–response, specificity, and hook-effect evaluation; refine dynamic range.",
  },
  {
    title: "Transfer & scale",
    description: "Documentation, lot criteria, and optional manufacturing scale-up support.",
  },
] as const

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

      <div className="container-content max-w-4xl py-12 md:py-16">
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="font-display text-title text-brand">
            Service overview
          </h2>
          <p className="mt-4 text-ink-secondary">
            We build ELISAs that behave predictably in your sample type — not just in buffer. Expect structured data you can
            defend in QC or in a methods section, with clear next steps if you need recurring kit production.
          </p>
          <h3 className="mt-8 font-display text-lg font-semibold text-brand">Capabilities</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-secondary">
            <li>Pairing of capture and detection antibodies (including custom-generated reagents)</li>
            <li>Recombinant protein or peptide standards and sample diluent matrices</li>
            <li>Sensitivity, specificity, and precision studies for validation packages</li>
            <li>Scale-up support for recurring manufacturing</li>
          </ul>
          <h3 className="mt-8 font-display text-lg font-semibold text-brand">Ideal for</h3>
          <p className="mt-3 text-ink-secondary">
            Biomarker programs, bioprocess impurity testing, vaccine immune response monitoring, and research kits that need
            a documented ELISA format before transfer to your QC lab.
          </p>
        </section>

        <ServiceWorkflow steps={[...workflowSteps]} />

        <ServicePricingCta
          serviceLabel="ELISA assay development programs"
          primaryLabel="Request ELISA pricing"
        />

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-brand px-8 py-3 text-sm font-bold text-white shadow-md transition hover:bg-brand-light"
          >
            Discuss your analyte
          </Link>
          <Link
            href="/elisa_kits_landing_page"
            className="inline-flex rounded-full border-2 border-brand/20 px-8 py-3 text-sm font-bold text-brand hover:border-accent"
          >
            Browse ELISA kits
          </Link>
        </div>
      </div>
    </main>
  )
}
