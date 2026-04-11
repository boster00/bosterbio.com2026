import Link from "next/link"

const topics = [
  { title: "Western blot", href: "/resources#western-blot", desc: "Buffers, antibodies, and troubleshooting." },
  { title: "IHC & ICC", href: "/resources#ihc", desc: "Staining protocols and panel design." },
  { title: "ELISA", href: "/resources#elisa", desc: "Quantitation workflows and standards." },
  { title: "Flow cytometry", href: "/resources#flow", desc: "Panel building and compensation basics." },
] as const

export function ResourcesSection() {
  return (
    <section
      id="resources"
      className="bg-surface-subtle py-[var(--section-y)]"
      aria-labelledby="resources-heading"
    >
      <div className="container-content">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 id="resources-heading" className="font-display text-display-md text-ink">
              Technical resources
            </h2>
            <p className="mt-3 text-ink-secondary">
              Protocols, ebooks, and application notes written by scientists — updated as methods evolve.
            </p>
          </div>
          <Link
            href="/resources"
            className="shrink-0 text-sm font-semibold text-brand hover:underline md:mb-1"
          >
            View all resources →
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="block h-full rounded-xl border border-surface-muted bg-surface p-5 transition hover:border-brand/30 hover:shadow-card"
              >
                <h3 className="font-display text-lg font-semibold text-ink">{t.title}</h3>
                <p className="mt-2 text-sm text-ink-secondary">{t.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
