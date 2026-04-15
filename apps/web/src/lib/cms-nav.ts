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

/** Fix placeholder URLs and relative /media paths for dev rendering */
export function hydrateCmsHtml(html: string): string {
  let s = html || ""
  s = s.replace(/https:\/\/SITE_ORIGIN_PLACEHOLDER/g, "https://www.bosterbio.com")
  s = s.replace(/http:\/\/SITE_ORIGIN_PLACEHOLDER/g, "https://www.bosterbio.com")
  s = s.replace(/\bsrc="\/media\//g, 'src="https://www.bosterbio.com/media/')
  s = s.replace(/\bdata-src="\/media\//g, 'data-src="https://www.bosterbio.com/media/')
  s = s.replace(/url\(\/media\//g, "url(https://www.bosterbio.com/media/")
  // Legacy Magento hex to 2026 Figma tokens (NavCmsPage HTML)
  s = s.replace(/#EA8D28/gi, "#f97316")
  s = s.replace(/#144b8c/gi, "#1a365d")
  s = s.replace(/#004C95/gi, "#1a365d")
  s = s.replace(/#003366/gi, "#15294a")
  s = s.replace(/rgb\s*\(\s*234\s*,\s*141\s*,\s*40\s*\)/gi, "rgb(249, 115, 22)")
  s = s.replace(/rgb\s*\(\s*0\s*,\s*76\s*,\s*149\s*\)/gi, "rgb(26, 54, 93)")
  s = s.replace(/rgb\s*\(\s*0\s*,\s*51\s*,\s*102\s*\)/gi, "rgb(21, 41, 74)")
  return s
}
