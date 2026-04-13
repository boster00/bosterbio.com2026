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
  return s
}
