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
 * that 404s, a duplicate <h1> that collides with the page-shell H1, raw
 * `{{block ...}}` Magento template directives, and many `<div><br></div>`
 * spacer chains from the legacy WYSIWYG editor.
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

  // 2b. Strip raw Magento template directives that leaked into the body. These
  //     look like `{{block block_id="..." template="..." }}` or
  //     `{{widget type="..." ...}}` — server-side macros that didn't get
  //     rendered during the export. Drop them.
  s = s.replace(/\{\{[^}]*\}\}/g, "")

  // 3. Strip decorative wrappers that render as gray blocks under our shell:
  //    - hero-section / dark-overlap / carousel / banner divs from the legacy
  //      Bootstrap layouts
  //    - Inline `style="background-image:url(...)"` (often broken or grey).
  s = s.replace(/\s+style="[^"]*background[^"]*"/gi, "")
  s = s.replace(/\s+style="[^"]*background-image[^"]*"/gi, "")
  // Inline font / color / sizing overrides that fight the design system.
  s = s.replace(/\s+style="[^"]*(?:font-size|font-family|font-weight|color|text-transform|width|height|min-width|min-height|max-width|max-height)[^"]*"/gi, "")
  // Catch-all: drop bgcolor, align, valign, width, height attrs (legacy table styling).
  s = s.replace(/\s+(?:bgcolor|align|valign|width|height|cellpadding|cellspacing|border)="[^"]*"/gi, "")

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

  // 6. Trim excess <br> sequences and empty shells. Run this in a fixed-point
  //    loop because each cleanup can expose another empty wrapper. The legacy
  //    WYSIWYG editors loved to nest `<div><br></div>` chains 3-4 deep.
  for (let i = 0; i < 8; i++) {
    const before = s
    // Collapse runs of <br> into at most one.
    s = s.replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>")
    // Empty <p>: only whitespace, &nbsp;, or <br>.
    s = s.replace(/<p[^>]*>(?:\s|&nbsp;|&#160;|<br\s*\/?>)*<\/p>/gi, "")
    // Empty <div>: only whitespace, &nbsp;, or <br>.
    s = s.replace(/<div[^>]*>(?:\s|&nbsp;|&#160;|<br\s*\/?>)*<\/div>/gi, "")
    // Empty <span> with only whitespace.
    s = s.replace(/<span[^>]*>(?:\s|&nbsp;|&#160;)*<\/span>/gi, "")
    // <div> wrapping a single <br> (catches nested <div><div><br></div></div>).
    s = s.replace(/<div[^>]*>\s*<br\s*\/?>\s*<\/div>/gi, "")
    if (s === before) break
  }

  // 7. Trim leading/trailing whitespace and stray <br>s that ended up at the
  //    very top/bottom of the body after the cleanup pass.
  s = s.replace(/^(?:\s|<br\s*\/?>)+/i, "")
  s = s.replace(/(?:\s|<br\s*\/?>)+$/i, "")

  return s
}
