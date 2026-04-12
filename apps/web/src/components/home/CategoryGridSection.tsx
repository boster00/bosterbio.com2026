import Link from "next/link"
import { CategoryBadgeIcon } from "@/components/ui/CategoryBadgeIcon"
import { cn } from "@/lib/cn"

const categories = [
  {
    title: "Primary Antibodies",
    description: "Rabbit and mouse monoclonals, polyclonals, and phospho-specific primaries for WB, IHC, ICC, and flow.",
    href: "/products?category=primary",
    badge: "antibodies" as const,
  },
  {
    title: "Secondary Antibodies",
    description: "HRP, AP, FITC, and Alexa Fluor®-conjugated secondaries with minimal cross-reactivity.",
    href: "/products?category=secondary",
    badge: "secondary" as const,
  },
  {
    title: "ELISA Kits",
    description: "Picokine® sandwich ELISAs with pre-coated plates, standards, and ready-to-use detection.",
    href: "/products?category=elisa",
    badge: "elisa" as const,
  },
  {
    title: "Conjugation Kits",
    description: "Label your own antibodies with biotin, fluorophores, and enzymes using optimized kits.",
    href: "/products?category=conjugation",
    badge: "conjugation" as const,
  },
  {
    title: "Custom Services",
    description: "Custom antibody development, ELISA assay development, and conjugation — from antigen to validation.",
    href: "/services/custom-antibody",
    badge: "custom" as const,
  },
] as const

export function CategoryGridSection() {
  return (
    <section
      id="categories"
      className="bg-white py-[var(--section-y)]"
      aria-labelledby="categories-heading"
    >
      <div className="container-content">
        <div className="max-w-2xl">
          <h2 id="categories-heading" className="font-display text-display-md text-brand">
            Shop by category
          </h2>
          <p className="mt-3 text-ink-secondary">
            From off-the-shelf catalog products to fully custom projects — everything your lab needs in one place.
          </p>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((cat) => (
            <li key={cat.href}>
              <Link
                href={cat.href}
                className={cn(
                  "card-hover-lift group flex min-w-0 flex-col rounded-2xl border border-surface-muted bg-surface-subtle/80 p-6 shadow-card",
                  "hover:border-accent/40 hover:bg-white",
                )}
              >
                <CategoryBadgeIcon variant={cat.badge} size="lg" className="shadow-accent/30" />
                <h3 className="mt-4 font-display text-title text-brand group-hover:text-accent">{cat.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-secondary">{cat.description}</p>
                <span className="mt-4 text-sm font-bold text-accent">
                  Shop now
                  <span className="ml-1 inline-block transition group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
