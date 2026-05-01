import type { CmsNavPayload } from "@/lib/cms-nav"
import { hydrateCmsHtml } from "@/lib/cms-nav"
import { EditorialPageHeader } from "./EditorialPageHeader"

type Props = {
  data: CmsNavPayload | null
  /** Used when CMS JSON missing */
  fallbackTitle: string
  fallbackDescription?: string
}

/**
 * Layout for migrated nav-CMS pages.
 *
 * The Figma master file has no dedicated nav-CMS frame; the closest
 * editorial-content reference is "About Us" (node 2848:22800). The visual
 * language there is:
 *
 * - Centered orange uppercase title in Josefin Sans Medium 40px
 *   (color #EA8D28, letter-spacing ~-0.02em).
 * - Centered subtitle in 16px below the title.
 * - Section headings ("Humble Start", "30 Years Later"): orange 28px LEFT.
 * - Body: 16px Mulish, dark gray, on white background.
 * - No big blue gradient hero band — the page reads as a clean editorial
 *   article on white.
 *
 * This component reproduces that header pattern and lets the prose container
 * carry section H2s in the same orange/28 style.
 */
export function NavCmsPage({ data, fallbackTitle, fallbackDescription }: Props) {
  const rawTitle = data?.title?.replace(/\s*\|\s*BosterBio.*$/i, "").trim() || fallbackTitle
  const heading = data?.content_heading?.trim() || rawTitle
  // Figma title is uppercase + letter-spaced. We render the heading itself in
  // its natural casing via CSS uppercase so the H1 reads correctly to AT.
  const html = data ? hydrateCmsHtml(data.content, heading) : ""

  return (
    <main id="main-content" className="bg-white">
      <EditorialPageHeader
        id="nav-cms-title"
        title={heading}
        subtitle={fallbackDescription ?? null}
        updatedAt={data?.update_time}
      />

      {/*
        Body. Constrained reading column on white. Prose styles override:
        - H2 in brand accent orange, 28px, left-aligned (matches Figma section
          headers like "Humble Start").
        - H3 smaller, brand primary blue.
        - Body text in ink (Mulish via root --font-sans).
      */}
      {html ? (
        <article
          className={[
            "container-content",
            "py-14 md:py-20",
            "prose prose-bosterbio mx-auto max-w-2xl lg:max-w-[720px]",
            // Figma section header: orange 28px left.
            "prose-h2:text-[28px] prose-h2:font-semibold prose-h2:text-accent prose-h2:mt-14 prose-h2:mb-4",
            // H3: brand-primary blue, 22px.
            "prose-h3:text-[22px] prose-h3:font-semibold prose-h3:text-brand-primary prose-h3:mt-10 prose-h3:mb-3",
            // Body paragraphs: 16px-ish, Mulish (inherited).
            "prose-p:my-5 prose-p:text-ink",
            // First paragraph as lead.
            "first:[&_p]:text-lg first:[&_p]:leading-relaxed",
            // Lists: tighter.
            "prose-li:my-1.5",
            // Links: brand blue, accent orange on hover (already in tw config).
            "prose-a:font-medium",
            // Migrated images: full-width within column, rounded.
            "prose-img:w-full prose-img:rounded-xl prose-img:my-10",
            // Subtle hr.
            "prose-hr:border-surface-muted prose-hr:my-12",
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
