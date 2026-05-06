import Link from "next/link"
import { CategoryBadgeIcon } from "@/components/ui/CategoryBadgeIcon"
import { cn } from "@/lib/cn"
import { supabaseService, storefrontSupabaseConfigured } from "@/lib/supabase/server"

async function getTemplateCounts(): Promise<Record<string, number>> {
  if (!storefrontSupabaseConfigured()) {
    return {}
  }
  try {
    const sb = supabaseService()
    const targets = ["antibodies", "elisa-kits", "proteins", "over-expression-lysates"] as const
    const results = await Promise.all(
      targets.map((t) =>
        sb
          .from("products")
          .select("*", { count: "exact", head: true })
          .eq("status", "enabled")
          .eq("product_template", t)
      )
    )
    const out: Record<string, number> = {}
    targets.forEach((t, i) => {
      const c = results[i]?.count
      if (typeof c === "number") out[t] = c
    })
    return out
  } catch {
    return {}
  }
}

function formatCount(n: number | undefined): string | null {
  if (typeof n !== "number" || n === 0) return null
  if (n >= 1000) return `${Math.floor(n / 100) / 10}K+`
  return `${n}+`
}

const categories = [
  {
    title: "Antibodies",
    description: "Rabbit and mouse monoclonals, polyclonals, and phospho-specific primaries for WB, IHC, ICC, and flow.",
    href: "/products?template=antibodies",
    badge: "antibodies" as const,
  },
  {
    title: "ELISA Kits",
    description: "Picokine® sandwich ELISAs with pre-coated plates, standards, and ready-to-use detection.",
    href: "/products?template=elisa-kits",
    badge: "elisa" as const,
  },
  {
    title: "Recombinant Proteins",
    description: "Highly pure proteins for assay development, structural studies, and standards.",
    href: "/products?template=proteins",
    badge: "antibodies" as const,
  },
  {
    title: "Cell Lysates",
    description: "Over-expression and control lysates for Western blot validation and pathway analysis.",
    href: "/products?template=over-expression-lysates",
    badge: "conjugation" as const,
  },
  {
    title: "Custom Services",
    description: "Custom antibody development, ELISA assay development, and conjugation — from antigen to validation.",
    href: "/services/custom-antibody",
    badge: "custom" as const,
  },
] as const

export async function CategoryGridSection() {
  const counts = await getTemplateCounts()
  const templateForHref = (href: string): string | null => {
    const m = href.match(/[?&]template=([^&]+)/)
    return m && m[1] ? decodeURIComponent(m[1]) : null
  }
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
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {categories.map((cat) => {
            const t = templateForHref(cat.href)
            const countLabel = t ? formatCount(counts[t]) : null
            return (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  className={cn(
                    "card-hover-lift group flex min-h-full min-w-0 flex-col items-center rounded-2xl border border-surface-muted bg-surface-subtle/80 px-5 pb-6 pt-8 text-center shadow-card",
                    "hover:border-accent/40 hover:bg-white",
                  )}
                >
                  <CategoryBadgeIcon variant={cat.badge} size="xl" className="shadow-lg shadow-accent/30" />
                  <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-brand group-hover:text-accent">
                    {cat.title}
                  </h3>
                  {countLabel ? (
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-accent">
                      {countLabel} in catalog
                    </p>
                  ) : null}
                  <p className="mt-3 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-ink-secondary">
                    {cat.description}
                  </p>
                  <span className="mt-5 text-sm font-bold text-accent">
                    Shop now
                    <span className="ml-1 inline-block transition group-hover:translate-x-0.5" aria-hidden>
                      →
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
