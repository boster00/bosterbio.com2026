import type { CmsNavPayload } from "@/lib/cms-nav"
import { hydrateCmsHtml } from "@/lib/cms-nav"

type Props = {
  data: CmsNavPayload | null
  /** Used when CMS JSON missing */
  fallbackTitle: string
  fallbackDescription?: string
}

export function NavCmsPage({ data, fallbackTitle, fallbackDescription }: Props) {
  const title = data?.title?.replace(/\s*\|\s*BosterBio.*$/i, "").trim() || fallbackTitle
  const heading = data?.content_heading?.trim() || title
  // Pass `heading` so the sanitizer can strip a duplicate H1 in the body.
  const html = data ? hydrateCmsHtml(data.content, heading) : ""

  return (
    <main id="main-content" className="bg-surface-subtle pb-16">
      <section
        className="relative border-b border-brand-primary/15 bg-gradient-to-br from-brand-primary via-brand-primary to-brand-sky/90 text-white"
        aria-labelledby="nav-cms-hero-heading"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 1440 120%27%3E%3Cpath fill=%27%23ffffff%27 fill-opacity=%270.06%27 d=%27M0 60c200 20 400 20 600 0s400-20 600 0v60H0z%27/%3E%3C/svg%3E')] bg-cover bg-bottom opacity-90" />
        <div className="container-content relative py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">BosterBio</p>
          <h1 id="nav-cms-hero-heading" className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem]">
            {heading}
          </h1>
          {fallbackDescription && !data?.content ? (
            <p className="mt-4 max-w-3xl text-lg text-white/90">{fallbackDescription}</p>
          ) : null}
          {data?.update_time ? (
            <p className="mt-4 text-xs text-white/60">Content last updated {data.update_time.slice(0, 10)}</p>
          ) : null}
        </div>
      </section>

      <div className="container-content py-10 md:py-14">
        {html ? (
          <article
            className="prose prose-bosterbio max-w-none rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-card sm:p-8 md:p-10"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <div className="rounded-2xl border border-brand-primary/10 bg-white p-10 text-center shadow-card">
            <p className="text-ink-secondary">Content is being migrated. Please check back soon.</p>
          </div>
        )}
      </div>
    </main>
  )
}
