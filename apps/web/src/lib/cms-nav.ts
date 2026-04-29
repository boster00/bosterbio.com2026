import fs from "node:fs"
import path from "node:path"

export type CmsNavPayload = {
  page_id: string
  title: string
  identifier: string
  content_heading: string
  update_time: string
  content: string
}

const DIR = path.join(process.cwd(), "src/data/cms-nav-pages")

export function getCmsNavPage(identifier: string): CmsNavPayload | null {
  const key = identifier.replace(/\//g, "__")
  const file = path.join(DIR, `${key}.json`)
  if (!fs.existsSync(file)) return null
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as CmsNavPayload
  } catch {
    return null
  }
}

/**
 * Sanitize and re-style migrated Magento CMS body HTML for the new site.
 *
 * The legacy bodies carry: inline <style> blocks (leak page-wide CSS), inline
 * <script> tags (chat widgets, analytics), Bootstrap classes that don't exist
 * here, decorative `dark-overlap` / `hero-section` divs that render as gray
 * blocks, inline `style="background-image:url(SITE_ORIGIN_PLACEHOLDER...)"`
 * that 404s, and a duplicate <h1> that collides with the page-shell H1.
 *
 * This function rewrites enough that the body slots cleanly into a Tailwind
 * `prose` container. We do not try to preserve the legacy layout — we throw
 * away decorative chrome and let the prose container do the typography.
 *
 * @param html  the raw migrated HTML
 * @param pageTitle  the page's H1 (used to dedupe a leading H1 in body)
 */
export function hydrateCmsHtml(html: string, pageTitle?: string): string {
  let s = html || ""

  // 1. URL fixes (existing behavior — placeholder + relative /media/ paths).
  s = s.replace(/https?:\/\/SITE_ORIGIN_PLACEHOLDER/g, "https://www.bosterbio.com")
  s = s.replace(/\bsrc="\/media\//g, 'src="https://www.bosterbio.com/media/')
  s = s.replace(/\bdata-src="\/media\//g, 'data-src="https://www.bosterbio.com/media/')
  s = s.replace(/url\(\/media\//g, "url(https://www.bosterbio.com/media/")
  // Relative-root <a href="/foo"> → absolute legacy URL so the link still works
  // (we'll migrate the targets later; unblock now).
  s = s.replace(/\bhref="\/(?!\/)([^"]*)"/g, 'href="https://www.bosterbio.com/$1"')

  // 2. Strip <style> and <script> blocks entirely. The migrated bodies carry
  //    page-wide CSS and embedded chat/analytics widgets that bleed into the
  //    new design. Tracking scripts live in our shell, not in CMS bodies.
  s = s.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
  s = s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  s = s.replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "")
  s = s.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, "")

  // 3. Strip decorative wrappers that render as gray blocks under our shell:
  //    - hero-section / dark-overlap / carousel / banner divs from the legacy
  //      Bootstrap layouts
  //    - Inline `style="background-image:url(...)"` (often broken or grey).
  s = s.replace(/\s+style="[^"]*background[^"]*"/gi, "")
  s = s.replace(/\s+style="[^"]*background-image[^"]*"/gi, "")
  // Inline font / color overrides that fight the design system.
  s = s.replace(/\s+style="[^"]*(?:font-size|font-family|font-weight|color|text-transform)[^"]*"/gi, "")
  // Catch-all: drop bgcolor and align attrs (legacy table styling).
  s = s.replace(/\s+(?:bgcolor|align|valign)="[^"]*"/gi, "")

  // 4. Strip the leading <h1> from body if its text matches the page title.
  //    The page shell already renders an H1; a second one inside the body
  //    duplicates the heading and breaks the visual hierarchy.
  if (pageTitle) {
    const titleNorm = pageTitle.replace(/\s+/g, " ").trim().toLowerCase()
    s = s.replace(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i, (full, inner) => {
      const innerText = String(inner).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().toLowerCase()
      // Drop if exact match OR if body H1 is contained in title (or vice versa).
      if (innerText === titleNorm || titleNorm.includes(innerText) || innerText.includes(titleNorm)) {
        return ""
      }
      return full
    })
  }

  // 5. Collapse Bootstrap utility classes that don't exist in our Tailwind
  //    setup. Strip them rather than try to translate — the prose wrapper will
  //    apply sensible defaults. Keep semantic structure intact.
  s = s.replace(/\sclass="[^"]*"/gi, "")

  // 6. Trim excess <br> sequences and empty <p>/<div> shells that legacy
  //    WYSIWYG editors loved to insert.
  s = s.replace(/(?:<br\s*\/?>(?:\s|&nbsp;)*){3,}/gi, "<br><br>")
  s = s.replace(/<p[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "")
  s = s.replace(/<div[^>]*>(?:\s|&nbsp;)*<\/div>/gi, "")

  return s
}
