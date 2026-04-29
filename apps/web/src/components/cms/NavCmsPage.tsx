import type { CmsNavPayload } from "@/lib/cms-nav"
import { hydrateCmsHtml } from "@/lib/cms-nav"

type Props = {
  data: CmsNavPayload | null
  /** Used when CMS JSON missing */
  fallbackTitle: string
  fallbackDescription?: string
}

/**
 * Modern editorial layout for migrated nav-CMS pages.
 *
 * No boxed card, no border, no shadow. Hero is full-bleed brand gradient;
 * the body is a centered reading column directly on the page background,
 * styled by Tailwind `prose`. The first paragraph drops in slightly larger
 * (lead). Section dividers come from the prose `<hr>` style if the body
 * uses them; otherwise it reads as one continuous article.
 */
export function NavCmsPage({ data, fallbackTitle, fallbackDescription }: Props) {
  const title = data?.title?.replace(/\s*\|\s*BosterBio.*$/i, "").trim() || fallbackTitle
  const heading = data?.content_heading?.trim() || title
  // Pass `heading` so the sanitizer can strip a duplicate H1 in the body.
  const html = data ? hydrateCmsHtml(data.content, heading) : ""

  return (
    <main id="main-content" className="bg-white">
      {/* Full-bleed hero */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-brand-primary via-brand-primary to-brand-sky/90 text-white"
        aria-labelledby="nav-cms-hero-heading"
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 1440 120%27%3E%3Cpath fill=%27%23ffffff%27 fill-opacity=%270.05%27 d=%27M0 60c200 20 400 20 600 0s400-20 600 0v60H0z%27/%3E%3C/svg%3E')] bg-cover bg-bottom" />
        {/* Subtle radial accent in the top-right corner */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="container-content relative py-16 md:py-24 lg:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
            BosterBio · Resources
          </p>
          <h1
            id="nav-cms-hero-heading"
            className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
          >
            {heading}
          </h1>
          {fallbackDescription && !data?.content ? (
            <p className="mt-6 max-w-2xl text-lg text-white/85">{fallbackDescription}</p>
          ) : null}
          {data?.update_time ? (
            <div className="mt-8 flex items-center gap-3 text-xs text-white/60">
              <span className="inline-block h-px w-8 bg-white/30" />
              <span>Updated {data.update_time.slice(0, 10)}</span>
            </div>
          ) : null}
        </div>
      </section>

      {/* Body: narrow reading column directly on page bg, no card */}
      {html ? (
        <article
          className={[
            "container-content",
            "py-14 md:py-20 lg:py-24",
            // Center the prose with a comfortable reading column.
            "prose prose-bosterbio prose-lg mx-auto max-w-2xl lg:max-w-[680px]",
            // Lead-style first paragraph for editorial feel.
            "prose-p:my-5",
            "first:[&_p]:text-xl first:[&_p]:leading-relaxed first:[&_p]:text-ink",
            // Tighter list spacing than prose default.
            "prose-li:my-1.5",
            // Subtle accent under H2/H3 for section rhythm.
            "prose-h2:mt-14 prose-h2:pb-2 prose-h2:border-b prose-h2:border-brand-primary/15",
            "prose-h3:mt-10",
            // Brand-tinted hr.
            "prose-hr:my-12 prose-hr:border-brand-primary/15",
            // Make migrated images full-bleed within the column.
            "prose-img:w-full prose-img:rounded-xl prose-img:my-10",
          ].join(" ")}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <div className="container-content py-20 text-center">
          <p className="text-ink-secondary">Content is being migrated. Please check back soon.</p>
        </div>
      )}
    </main>
  )
}
