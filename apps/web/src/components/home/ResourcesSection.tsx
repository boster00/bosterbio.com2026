import Link from "next/link"

const topics = [
  {
    title: "Protocols",
    href: "/resources#protocols",
    desc: "Western blot, IHC, ICC, ELISA, and flow — step-by-step methods from our applications team.",
  },
  {
    title: "FAQs",
    href: "/resources#faq",
    desc: "Answers to common questions about storage, dilution, species reactivity, and troubleshooting.",
  },
  {
    title: "Blog",
    href: "/resources#blog",
    desc: "Application notes, product highlights, and tips from BosterBio scientists.",
  },
  {
    title: "Citation library",
    href: "/resources#citations",
    desc: "See how peers have used our antibodies and kits in peer-reviewed journals.",
  },
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
              Resources for your experiments
            </h2>
            <p className="mt-3 text-ink-secondary">
              Protocols, FAQs, and articles to help you get clean data — whether you are running your first Western or
              optimizing multiplex IHC.
            </p>
          </div>
          <Link href="/resources" className="shrink-0 text-sm font-semibold text-brand hover:underline md:mb-1">
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
