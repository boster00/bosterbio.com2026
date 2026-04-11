import Link from "next/link"

export default function MultiplexIhcServicePage() {
  return (
    <main id="main-content">
      <div className="border-b border-surface-muted bg-surface-subtle">
        <div className="container-content py-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">Services</p>
          <h1 className="mt-2 font-display text-display-md text-ink">Multiplex IHC services</h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-secondary">
            Multiplex immunohistochemistry combines multiple markers in a single tissue section — enabling spatial
            biology insights without serial staining rounds. We help design panels, select clones, and optimize tyramide
            or fluor-based workflows for your tissue types.
          </p>
        </div>
      </div>
      <div className="container-content max-w-3xl py-12 md:py-16">
        <h2 className="font-display text-title text-ink">How we help</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-secondary">
          <li>Marker selection and epitope compatibility review</li>
          <li>Sequential staining protocol development on your FFPE or fresh-frozen samples</li>
          <li>Imaging guidance for spectral unmixing and quantitative scoring</li>
        </ul>
        <h2 className="mt-10 font-display text-title text-ink">Applications</h2>
        <p className="mt-4 text-ink-secondary">
          Immuno-oncology panels, immune microenvironment mapping, and developmental biology studies where co-expression
          of multiple proteins must be resolved at single-cell scale in situ.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-light"
          >
            Start a project
          </Link>
          <Link
            href="/resources#ihc"
            className="inline-flex rounded-md border border-surface-muted px-6 py-3 text-sm font-semibold text-ink hover:border-brand/30"
          >
            IHC resources
          </Link>
        </div>
      </div>
    </main>
  )
}
