import { parse } from "node-html-parser"
import type { HTMLElement } from "node-html-parser"

const ELEMENT = 1

/** Tags we expect to survive transmutation for smoke parity checks. */
export const READINESS_TAG_WHITELIST = [
  "h1",
  "h2",
  "h3",
  "p",
  "a",
  "img",
  "table",
  "ol",
  "ul",
  "li",
  "section",
  "br",
] as const

export type ReadinessTag = (typeof READINESS_TAG_WHITELIST)[number]

export type SemanticCounts = Record<ReadinessTag, number>

function emptyCounts(): SemanticCounts {
  const o = {} as SemanticCounts
  for (const t of READINESS_TAG_WHITELIST) o[t] = 0
  return o
}

function walk(el: HTMLElement, counts: SemanticCounts) {
  const tag = el.tagName.toLowerCase() as ReadinessTag
  if (READINESS_TAG_WHITELIST.includes(tag)) counts[tag] += 1
  for (const c of el.childNodes) {
    if (c.nodeType === ELEMENT) walk(c as HTMLElement, counts)
  }
}

/** Count semantic tags in HTML (walks DOM; ignores scripts injected as text). */
export function countSemanticElements(html: string): SemanticCounts {
  const counts = emptyCounts()
  const trimmed = (html || "").trim()
  if (!trimmed) return counts
  const root = parse(trimmed, {
    blockTextElements: { script: true, style: true, noscript: true },
  })
  for (const c of root.childNodes) {
    if (c.nodeType === ELEMENT) walk(c as HTMLElement, counts)
  }
  return counts
}

export type ReadinessBreakdown = {
  tag: ReadinessTag
  before: number
  after: number
  parity: number
}

/**
 * Reusable transmutation readiness: compares semantic tag counts before vs
 * after the transmutation pipeline. Returns a 0–1 score (mean parity across
 * tags that appear in either version).
 */
export function transmutationReadinessScore(
  rawCmsHtml: string,
  transmutedHtml: string,
): { score: number; breakdown: ReadinessBreakdown[] } {
  const before = countSemanticElements(rawCmsHtml)
  const after = countSemanticElements(transmutedHtml)
  const breakdown: ReadinessBreakdown[] = []
  let sum = 0
  let n = 0
  for (const tag of READINESS_TAG_WHITELIST) {
    const b = before[tag]
    const a = after[tag]
    if (b === 0 && a === 0) continue
    const max = Math.max(b, a, 1)
    let parity = 1 - Math.abs(b - a) / max
    // Hydration intentionally removes a duplicate body H1 when the shell already renders the title.
    if (tag === "h1" && b === 1 && a === 0) parity = 1
    breakdown.push({ tag, before: b, after: a, parity })
    sum += parity
    n += 1
  }
  return { score: n ? sum / n : 1, breakdown }
}
