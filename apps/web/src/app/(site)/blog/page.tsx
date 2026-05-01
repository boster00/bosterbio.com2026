import type { Metadata } from "next"
import Link from "next/link"
import { EditorialPageHeader } from "@/components/cms/EditorialPageHeader"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Protocols, application notes, validation studies, and lab techniques from BosterBio scientists.",
}

/**
 * Placeholder index for the Blog section.
 *
 * The header nav links here from every page on the site, so we ship a
 * proper landing rather than letting the link 404. When the blog backend
 * is wired (likely Notion → MDX or Contentful), replace this body with
 * the real index — keep the header.
 */
export default function BlogIndexPage() {
  return (
    <main id="main-content" className="bg-white">
      <EditorialPageHeader
        id="blog-title"
        title="Blog"
        subtitle="Protocols, application notes, validation studies, and lab techniques from BosterBio scientists."
      />

      <section className="container-content py-14 md:py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-surface-muted bg-surface-subtle p-10 text-center shadow-card">
          <p className="font-heading text-xl text-brand-primary">New articles are on the way.</p>
          <p className="mt-3 text-ink-secondary">
            Our science team is migrating the protocol library and citation studies into the new
            blog. In the meantime, the technical resource centers below cover the most common
            workflows.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/western-blotting-technical-resource-center"
              className="rounded-full border border-brand-primary px-5 py-2 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
            >
              Western Blot resources
            </Link>
            <Link
              href="/elisa-technical-resource-center"
              className="rounded-full border border-brand-primary px-5 py-2 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
            >
              ELISA resources
            </Link>
            <Link
              href="/immunohistochemistry-ihc-technical-resource-center"
              className="rounded-full border border-brand-primary px-5 py-2 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
            >
              IHC resources
            </Link>
            <Link
              href="/faqs"
              className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-white transition hover:bg-accent-hover"
            >
              FAQs
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
