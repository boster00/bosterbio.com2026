// Renders an index of child CMS pages under a given parent prefix.
// Used by the catch-all when an exact identifier match isn't found but
// child pages exist (e.g. /diseases → list 54 disease pages).
import Link from "next/link";
import type { CmsIndexEntry } from "@/lib/supabase/cms";

const PREFIX_TITLES: Record<string, { eyebrow: string; heading: string; description: string }> = {
  diseases: {
    eyebrow: "Resources",
    heading: "Diseases",
    description: "Antibodies, ELISA kits, and related research tools organized by disease area.",
  },
  "pathway-maps": {
    eyebrow: "Resources",
    heading: "Pathway Maps",
    description: "Cell signaling pathways and the antibodies and reagents to study them.",
  },
  "protocol-and-troubleshooting": {
    eyebrow: "Support",
    heading: "Protocols & Troubleshooting",
    description: "Step-by-step protocols, optimization guides, and troubleshooting articles.",
  },
  "cell-types": {
    eyebrow: "Resources",
    heading: "Cell Types & Markers",
    description: "Cell-type-specific antibodies and markers organized by lineage and function.",
  },
  "research-area": {
    eyebrow: "Resources",
    heading: "Research Areas",
    description: "Curated antibody and reagent collections by research focus area.",
  },
  "newsletter-archive": {
    eyebrow: "Newsletter",
    heading: "Newsletter Archive",
    description: "Past announcements, promotions, and product updates from Boster Bio.",
  },
  promotions: {
    eyebrow: "Offers",
    heading: "Promotions",
    description: "Active and past promotional offers for Boster Bio products.",
  },
  services: {
    eyebrow: "Services",
    heading: "Custom Services",
    description: "Custom assay services from antigen to validated product.",
  },
};

export function CmsIndexSection({
  prefix,
  entries,
}: {
  prefix: string;
  entries: CmsIndexEntry[];
}) {
  const config = PREFIX_TITLES[prefix] ?? {
    eyebrow: "Index",
    heading: prefix.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: `${entries.length} pages.`,
  };

  return (
    <main id="main-content" className="bg-surface-subtle pb-16">
      <section className="relative border-b border-brand-primary/15 bg-gradient-to-br from-brand-primary via-brand-primary to-brand-sky/90 text-white">
        <div className="container-content relative py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">{config.eyebrow}</p>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem]">
            {config.heading}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/90">{config.description}</p>
          <p className="mt-3 text-sm text-white/70">{entries.length} pages</p>
        </div>
      </section>

      <div className="container-content py-10 md:py-14">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((p) => {
            const cleanTitle = p.title.replace(/\s*\|\s*BosterBio.*$/i, "").trim();
            return (
              <li key={p.identifier}>
                <Link
                  href={`/${p.identifier}`}
                  className="group block rounded-xl border border-brand-primary/10 bg-white p-4 shadow-sm transition hover:border-brand-primary/40 hover:shadow-md"
                >
                  <p className="font-heading text-sm font-semibold leading-snug text-brand group-hover:text-accent">
                    {cleanTitle}
                  </p>
                  {p.legacy_updated_at ? (
                    <p className="mt-1 text-xs text-slate-500">
                      Updated {p.legacy_updated_at.slice(0, 10)}
                    </p>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
