import Link from "next/link"
import { ServicePricingCta } from "@/components/services/ServicePricingCta"
import { ServiceWorkflow } from "@/components/services/ServiceWorkflow"

const workflowSteps = [
  {
    title: "Intake",
    description: "Antibody amount, buffer, desired label, and final concentration or titre goals.",
  },
  {
    title: "Label selection",
    description: "HRP, AP, biotin, or fluorophore matched to your detection platform.",
  },
  {
    title: "Conjugation",
    description: "Controlled reaction with optimized molar ratios to preserve binding.",
  },
  {
    title: "QC & buffer exchange",
    description: "Concentration, endotoxin or aggregation checks where applicable.",
  },
  {
    title: "Shipment",
    description: "Formatted product with COA-style summary for your records.",
  },
] as const

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

      <div className="container-content max-w-4xl py-12 md:py-16">
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="font-display text-title text-brand">
            Service overview
          </h2>
          <p className="mt-4 text-ink-secondary">
            Service conjugation removes guesswork from dye-to-protein ratios and buffer compatibility. We align the final
            format with how you will use the reagent — ELISA, Western blot, flow cytometry, or imaging.
          </p>
          <h3 className="mt-8 font-display text-lg font-semibold text-brand">Common conjugates</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-secondary">
            <li>HRP and AP for ELISA and Western blot</li>
            <li>Biotin for streptavidin platforms and bead-based assays</li>
            <li>Alexa Fluor® and other fluorophores for flow cytometry and imaging</li>
          </ul>
          <h3 className="mt-8 font-display text-lg font-semibold text-brand">Catalog conjugation kits</h3>
          <p className="mt-3 text-ink-secondary">
            Prefer to label in your own lab? See our conjugation kits in the product catalog for controlled, reproducible
            small-scale reactions.
          </p>
        </section>

        <ServiceWorkflow steps={[...workflowSteps]} />

        <ServicePricingCta
          serviceLabel="Antibody conjugation services"
          primaryLabel="Request conjugation quote"
        />

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-brand px-8 py-3 text-sm font-bold text-white shadow-md transition hover:bg-brand-light"
          >
            Submit antibody details
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
