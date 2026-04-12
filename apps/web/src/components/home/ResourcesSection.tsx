import Link from "next/link"
import { CategoryBadgeIcon } from "@/components/ui/CategoryBadgeIcon"

const topics = [
  {
    title: "Protocols",
    href: "/resources#protocols",
    desc: "Western blot, IHC, ICC, ELISA, and flow — step-by-step methods from our applications team.",
    badge: "protocols" as const,
  },
  {
    title: "FAQs",
    href: "/resources#faq",
    desc: "Answers to common questions about storage, dilution, species reactivity, and troubleshooting.",
    badge: "resources" as const,
  },
  {
    title: "Blog",
    href: "/resources#blog",
    desc: "Application notes, product highlights, and tips from BosterBio scientists.",
    badge: "resources" as const,
  },
  {
    title: "Citation library",
    href: "/resources#citations",
    desc: "See how peers have used our antibodies and kits in peer-reviewed journals.",
    badge: "resources" as const,
  },
] as const

export function ResourcesSection() {
  return (
    <section id="resources" className="bg-white py-[var(--section-y)]" aria-labelledby="resources-heading">
      <div className="container-content">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 id="resources-heading" className="font-display text-display-md text-brand">
              Resources for your experiments
            </h2>
            <p className="mt-3 text-ink-secondary">
              Protocols, FAQs, and articles to help you get clean data — whether you are running your first Western or
              optimizing multiplex IHC.
            </p>
          </div>
          <Link
            href="/resources"
            className="shrink-0 rounded-full border-2 border-accent bg-accent-soft px-5 py-2 text-sm font-bold text-accent transition duration-200 hover:scale-[1.03] hover:bg-accent hover:text-white hover:shadow-md active:scale-[0.98] md:mb-1"
          >
            View all resources →
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="card-hover-lift flex min-w-0 gap-4 rounded-2xl border border-surface-muted bg-brand-tint/50 p-5 hover:border-accent/35 hover:bg-white"
              >
                <CategoryBadgeIcon variant={t.badge} size="sm" />
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-brand">{t.title}</h3>
                  <p className="mt-1 text-sm text-ink-secondary">{t.desc}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
