import Link from "next/link"
import { ServicePricingCta } from "@/components/services/ServicePricingCta"
import { ServiceWorkflow } from "@/components/services/ServiceWorkflow"

const workflowSteps = [
  {
    title: "Panel design",
    description: "Marker list, species, clone compatibility, and imaging modality (chromogenic vs fluorescent).",
  },
  {
    title: "Protocol draft",
    description: "Order of rounds, retrieval, blocking, and tyramide or fluor cycles on pilot slides.",
  },
  {
    title: "Optimization",
    description: "Titre titration, spectral bleed assessment, and background control strategy.",
  },
  {
    title: "Validation set",
    description: "Representative tissues scored for pattern consistency across batches.",
  },
  {
    title: "Handoff",
    description: "Written SOP, panel map, and optional training for your histology team.",
  },
] as const

export default function MultiplexIhcServicePage() {
  return (
    <main id="main-content">
      <div className="page-hero-bar border-b border-brand/10">
        <div className="container-content py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Services</p>
          <h1 className="mt-2 font-display text-display-md text-brand">Multiplex IHC services</h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-secondary">
            Multiplex immunohistochemistry combines multiple markers in a single tissue section — enabling spatial
            biology insights without serial staining rounds. We help design panels, select clones, and optimize tyramide
            or fluor-based workflows for your tissue types.
          </p>
        </div>
      </div>

      <div className="container-content max-w-4xl py-12 md:py-16">
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="font-display text-title text-brand">
            Service overview
          </h2>
          <p className="mt-4 text-ink-secondary">
            Multiplex IHC is as much about order of operations as it is about antibody quality. We stress-test panels on
            your FFPE or fresh-frozen material so you are not surprised when you move to cohort-scale staining.
          </p>
          <h3 className="mt-8 font-display text-lg font-semibold text-brand">How we help</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-secondary">
            <li>Marker selection and epitope compatibility review</li>
            <li>Sequential staining protocol development on your FFPE or fresh-frozen samples</li>
            <li>Imaging guidance for spectral unmixing and quantitative scoring</li>
          </ul>
          <h3 className="mt-8 font-display text-lg font-semibold text-brand">Applications</h3>
          <p className="mt-3 text-ink-secondary">
            Immuno-oncology panels, immune microenvironment mapping, and developmental biology studies where co-expression
            of multiple proteins must be resolved at single-cell scale in situ.
          </p>
        </section>

        <ServiceWorkflow steps={[...workflowSteps]} />

        <ServicePricingCta
          serviceLabel="Multiplex IHC service projects"
          primaryLabel="Request multiplex IHC quote"
        />

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-brand px-8 py-3 text-sm font-bold text-white shadow-md transition hover:bg-brand-light"
          >
            Start a project
          </Link>
          <Link
            href="/resources#ihc"
            className="inline-flex rounded-full border-2 border-brand/20 px-8 py-3 text-sm font-bold text-brand hover:border-accent"
          >
            IHC resources
          </Link>
        </div>
      </div>
    </main>
  )
}
