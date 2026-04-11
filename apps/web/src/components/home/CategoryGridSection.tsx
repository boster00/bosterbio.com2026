import Link from "next/link"
import { cn } from "@/lib/cn"

const categories = [
  {
    title: "Primary Antibodies",
    description: "Rabbit and mouse monoclonals, polyclonals, and phospho-specific primaries for WB, IHC, ICC, and flow.",
    href: "/products?category=primary",
    icon: "1°",
  },
  {
    title: "Secondary Antibodies",
    description: "HRP, AP, FITC, and Alexa Fluor®-conjugated secondaries with minimal cross-reactivity.",
    href: "/products?category=secondary",
    icon: "2°",
  },
  {
    title: "ELISA Kits",
    description: "Picokine® sandwich ELISAs with pre-coated plates, standards, and ready-to-use detection.",
    href: "/products?category=elisa",
    icon: "ELISA",
  },
  {
    title: "Conjugation Kits",
    description: "Label your own antibodies with biotin, fluorophores, and enzymes using optimized kits.",
    href: "/products?category=conjugation",
    icon: "conj",
  },
  {
    title: "Custom Services",
    description: "Custom antibody development, ELISA assay development, and conjugation — from antigen to validation.",
    href: "/contact",
    icon: "Custom",
  },
] as const

export function CategoryGridSection() {
  return (
    <section
      id="categories"
      className="bg-surface-subtle py-[var(--section-y)]"
      aria-labelledby="categories-heading"
    >
      <div className="container-content">
        <div className="max-w-2xl">
          <h2 id="categories-heading" className="font-display text-display-md text-ink">
            Shop by product type
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
                  "group flex h-full flex-col rounded-xl border border-surface-muted bg-surface p-6 shadow-card transition",
                  "hover:border-brand/25 hover:shadow-lg",
                )}
              >
                <span
                  className="inline-flex h-12 min-w-[3rem] items-center justify-center rounded-lg bg-brand-muted px-2 text-xs font-bold text-brand sm:text-sm"
                  aria-hidden
                >
                  {cat.icon}
                </span>
                <h3 className="mt-4 font-display text-title text-ink group-hover:text-brand">{cat.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-secondary">{cat.description}</p>
                <span className="mt-4 text-sm font-semibold text-brand">
                  Explore
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
