export type WorkflowStep = {
  title: string
  description: string
}

export function ServiceWorkflow({ steps }: { steps: WorkflowStep[] }) {
  return (
    <section className="mt-12" aria-labelledby="workflow-heading">
      <h2 id="workflow-heading" className="font-display text-title text-brand">
        Project workflow
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-ink-secondary">
        A typical engagement follows these milestones. Timelines vary by project complexity and validation depth.
      </p>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="relative flex flex-col rounded-2xl border border-brand/10 bg-white p-5 pt-6 shadow-card"
          >
            <span className="absolute -top-3 left-5 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-md shadow-accent/30">
              {i + 1}
            </span>
            <h3 className="mt-4 font-display text-base font-semibold text-brand">{step.title}</h3>
            <p className="mt-2 flex-1 text-sm text-ink-secondary">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
