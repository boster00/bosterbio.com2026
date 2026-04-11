import Link from "next/link"
import { cn } from "@/lib/cn"

const categories = [
  {
    title: "Primary Antibodies",
    description: "Rabbit & mouse monoclonals, polyclonals, and phospho-specific.",
    href: "/products?category=primary-antibodies",
    icon: "Ab",
  },
  {
    title: "ELISA Kits",
    description: "Picokine® sensitivity with ready-to-use standards & controls.",
    href: "/products?category=elisa",
    icon: "ELISA",
  },
  {
    title: "Recombinant Proteins",
    description: "Human, mouse, and rat proteins for functional assays.",
    href: "/products?category=proteins",
    icon: "Prot",
  },
  {
    title: "Reagents",
    description: "Buffers, substrates, and Western blot workflow essentials.",
    href: "/products?category=reagents",
    icon: "Reag",
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
            Everything you need from discovery through publication — organized the way your lab thinks about experiments.
          </p>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                  className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-muted text-sm font-bold text-brand"
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
