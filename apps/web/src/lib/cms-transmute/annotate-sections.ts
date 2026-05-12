/**
 * Magento nav-CMS → Design Guide editorial layout: section mapping (data plane).
 *
 * After `hydrateCmsHtml()` strips classes/scripts, outer `<section>` boundaries
 * usually remain. We label each top-level block for QA, smoke automation, and
 * future structured composition.
 *
 * Mapping (legacy → template slots, both disease pages follow this pattern):
 * - **legacy-hero-cluster** — first `<section>` (topic band: H1 + tagline; H1
 *   is deduped in hydration because `EditorialPageHeader` owns the H1).
 * - **intro-cluster** — second `<section>` (lead copy, “Contents” list, etc.).
 * - **body-cluster** — remaining `<section>`s (H2/H3, tables, figures, CTAs).
 * - **unsectioned-block** — top-level nodes that are not `<section>` (rare).
 */
import { parse } from "node-html-parser"
import type { HTMLElement } from "node-html-parser"

const ELEMENT = 1

export function annotateCmsSections(html: string): string {
  const trimmed = (html || "").trim()
  if (!trimmed) return ""

  const root = parse(trimmed, {
    blockTextElements: { script: true, style: true, noscript: true },
  })

  const kids = root.childNodes.filter((n) => n.nodeType === ELEMENT) as HTMLElement[]
  let sectionIndex = 0

  for (const el of kids) {
    const tag = el.tagName.toLowerCase()
    if (tag === "section") {
      const role =
        sectionIndex === 0 ? "legacy-hero-cluster" : sectionIndex === 1 ? "intro-cluster" : "body-cluster"
      el.setAttribute("data-cms-section", role)
      el.setAttribute("data-cms-legacy-section-index", String(sectionIndex))
      sectionIndex += 1
    } else {
      el.setAttribute("data-cms-section", "unsectioned-block")
      el.setAttribute("data-cms-top-order", String(sectionIndex))
      sectionIndex += 1
    }
  }

  return root.toString().trim()
}
