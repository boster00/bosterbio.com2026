#!/usr/bin/env node
/**
 * Extract specific cms_page rows from docs/cms-pages-full-export.tsv → src/data/cms-nav-content.json
 * Run from repo root: node apps/web/scripts/extract-cms-nav-pages.mjs
 */
import fs from "node:fs"
import path from "node:path"

const ROOT = path.join(import.meta.dirname, "../../..")
const TSV = path.join(ROOT, "docs/cms-pages-full-export.tsv")
const OUT_DIR = path.join(import.meta.dirname, "../src/data/cms-nav-pages")

const IDENTIFIERS = new Set([
  "about-us",
  "contact-us",
  "boster-guarantee",
  "faqs",
  "testimonials",
  "career-opportunities",
  "distributors",
  "privacy-policy",
  "terms-of-service",
  "boster-terms-and-conditions",
  "all-product-categories",
  "primary-antibodies",
  "secondary-antibodies",
  "elisa_kits_landing_page",
  "recombinant-proteins",
  "antibody-categories",
  "promotions",
  "services/custom-antibody-production-services",
  "services/assay-services",
  "services/multiplex-assay-services",
  "services/recombinant-protein-expression-service",
  "services/aav-packaging-service",
  "western-blotting-technical-resource-center",
  "immunohistochemistry-ihc-technical-resource-center",
  "elisa-technical-resource-center",
  "flow-technical-resource-center",
  "pcr-technical-resource-center",
  "supportformpage",
])

function parseTsv(full) {
  const lines = full.split(/\n/)
  const pages = []
  let current = null
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (i === lines.length - 1 && line === "") continue
    if (/^\d+\t/.test(line)) {
      if (current) pages.push(current)
      const parts = []
      let start = 0
      for (let n = 0; n < 7; n++) {
        const tab = line.indexOf("\t", start)
        if (tab === -1) throw new Error("bad row " + i)
        parts.push(line.slice(start, tab))
        start = tab + 1
      }
      parts.push(line.slice(start))
      current = {
        page_id: parts[0],
        title: parts[1],
        identifier: parts[2],
        is_active: parts[3] === "1",
        creation_time: parts[4],
        update_time: parts[5],
        content_heading: parts[6],
        content: parts[7] || "",
      }
    } else if (current) {
      current.content += (current.content ? "\n" : "") + line
    }
  }
  if (current) pages.push(current)
  return pages
}

function stripScripts(html) {
  return (html || "").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
}

const full = fs.readFileSync(TSV, "utf8")
const pages = parseTsv(full)
const byId = new Map()
for (const p of pages) {
  if (IDENTIFIERS.has(p.identifier)) byId.set(p.identifier, p)
}

function fileKey(identifier) {
  return identifier.replace(/\//g, "__")
}

fs.mkdirSync(OUT_DIR, { recursive: true })
let n = 0
for (const id of IDENTIFIERS) {
  const p = byId.get(id)
  if (!p) {
    console.warn("Missing CMS page:", id)
    continue
  }
  const payload = {
    page_id: p.page_id,
    title: p.title,
    identifier: p.identifier,
    content_heading: p.content_heading,
    update_time: p.update_time,
    content: stripScripts(p.content),
  }
  fs.writeFileSync(path.join(OUT_DIR, `${fileKey(id)}.json`), JSON.stringify(payload), "utf8")
  n++
}
console.log("Wrote", n, "files to", OUT_DIR)
