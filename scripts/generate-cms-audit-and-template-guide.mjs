#!/usr/bin/env node
/**
 * Reads docs/cms-pages-full-export.tsv (multi-line TSV) and writes:
 *   docs/cms-page-audit.md
 *   docs/cms-html-template-guide.md
 */
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = path.join(import.meta.dirname, "..")
const INPUT = path.join(ROOT, "docs/cms-pages-full-export.tsv")
const OUT_AUDIT = path.join(ROOT, "docs/cms-page-audit.md")
const OUT_GUIDE = path.join(ROOT, "docs/cms-html-template-guide.md")

function parsePages(full) {
  const lines = full.split(/\n/)
  if (lines.length < 2) throw new Error("empty export")
  const header = lines[0].split("\t")
  if (header[0] !== "page_id") throw new Error("unexpected header: " + lines[0].slice(0, 80))

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
        if (tab === -1) throw new Error(`Row ${i}: expected 8+ fields: ${line.slice(0, 120)}`)
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

/** For clustering only: strip URLs/text variance so shared layouts group together */
function normalizeForCluster(html) {
  return (html || "")
    .replace(/\s+/g, " ")
    .replace(/href="[^"]*"/gi, 'href="#"')
    .replace(/src="[^"]*"/gi, 'src="#"')
    .replace(/data-src="[^"]*"/gi, 'data-src="#"')
    .replace(/url\([^)]*\)/gi, "url(#)")
    .replace(/>\s*</g, "><")
    .replace(/[0-9]{3,}/g, "N")
    .trim()
    .toLowerCase()
}

function mdCell(s) {
  return String(s ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, "<br>")
}

function categorize(p) {
  const id = (p.identifier || "").toLowerCase()
  const title = (p.title || "").toLowerCase()
  const content = p.content || ""
  const len = content.trim().length
  const updateYear = parseInt((p.update_time || "").slice(0, 4), 10) || 0

  const magentoDropIds = new Set(["enable-cookies", "no-route", "noroute"])

  const testPatterns =
    /\b(test page|lorem ipsum|placeholder|do not use|draft only)\b/i.test(title) ||
    /^test[-_/]/i.test(id) ||
    /\/test\//i.test(id) ||
    /\/tmp\//i.test(id) ||
    /^draft[-_/]/i.test(id)

  if (magentoDropIds.has(id)) {
    return {
      bucket: "DROP",
      reason: "Magento system / framework page; replace with Next.js route or middleware (migrate marketing copy from HTML if needed).",
    }
  }

  if (!p.is_active) {
    if (len > 2000 && /privacy|terms|shipping|return|warranty|legal/i.test(title + " " + id)) {
      return {
        bucket: "REVIEW",
        reason: "Inactive but substantial content; may be intentional unpublish or superseded—confirm before discard.",
      }
    }
    if (len < 80 && !title.trim()) {
      return { bucket: "DROP", reason: "Inactive and empty or near-empty body." }
    }
    if (testPatterns) {
      return { bucket: "DROP", reason: "Inactive test/draft content." }
    }
    return {
      bucket: "REVIEW",
      reason: "Inactive; review whether redirect or merged page exists on live site.",
    }
  }

  // Active pages
  if (testPatterns && len < 500) {
    return { bucket: "DROP", reason: "Active but appears to be test/placeholder (short body + test signals)." }
  }

  if (len < 40 && !content.includes("{{")) {
    return {
      bucket: "REVIEW",
      reason: "Active but very short HTML—may be stub, redirect shell, or CMS error.",
    }
  }

  if (updateYear && updateYear < 2018 && len < 400) {
    return {
      bucket: "REVIEW",
      reason: "Active, last updated before 2018, short content—verify still linked from nav or SEO.",
    }
  }

  // Strong KEEP signals
  const keepKeywords =
    /privacy|terms|shipping|return|refund|warranty|contact|about|faq|careers|distributor|cookie/i
  if (keepKeywords.test(id) || keepKeywords.test(title)) {
    return { bucket: "KEEP", reason: "Standard policy/company page (migrate to Next.js content or MDX)." }
  }

  if (
    id.startsWith("services/") ||
    id.startsWith("research-area/") ||
    id.startsWith("diseases/") ||
    id.startsWith("protocol-and-troubleshooting/") ||
    id.startsWith("resources/") ||
    id.startsWith("landing/")
  ) {
    return {
      bucket: "KEEP",
      reason: "Marketing / SEO landing or resource hub (high migration value; check widgets and internal links).",
    }
  }

  if (updateYear >= 2024) {
    return { bucket: "KEEP", reason: "Recently maintained active page." }
  }

  if (len > 3000) {
    return { bucket: "KEEP", reason: "Large active HTML body—likely production landing or guide." }
  }

  return {
    bucket: "REVIEW",
    reason: "Active; template/IA unclear from metadata alone—confirm traffic and owner.",
  }
}

function extractDirectives(html) {
  const set = new Set()
  const re = /\{\{[^}]+\}\}/g
  let m
  while ((m = re.exec(html || ""))) {
    let d = m[0]
    if (d.length > 180) d = d.slice(0, 177) + "…}}"
    set.add(d)
  }
  return [...set].sort()
}

function extractClasses(html) {
  const counts = new Map()
  const re = /class\s*=\s*["']([^"']+)["']/gi
  let m
  while ((m = re.exec(html || ""))) {
    for (const c of m[1].split(/\s+/).filter(Boolean)) {
      counts.set(c, (counts.get(c) || 0) + 1)
    }
  }
  return counts
}

function prettifyHtml(html) {
  let s = html || ""
  s = s.replace(/></g, ">\n<")
  const lines = s.split("\n")
  let depth = 0
  const out = []
  const re = /^\s*<\/?([a-zA-Z0-9:-]+)/ 
  for (let line of lines) {
    line = line.trim()
    if (!line) continue
    const isClose = /^<\/\w/.test(line)
    const isSelf = /\/>$/.test(line) || /^<meta\b/i.test(line) || /^<link\b/i.test(line) || /^<br\b/i.test(line) || /^<hr\b/i.test(line) || /^<img\b/i.test(line)
    if (isClose) depth = Math.max(0, depth - 1)
    out.push("  ".repeat(depth) + line)
    if (!isClose && !isSelf && /^<\w/.test(line) && !/^<(input|img|br|hr|meta|link)\b/i.test(line)) {
      depth++
    }
  }
  return out.join("\n")
}

function urlPrefix(id) {
  const p = (id || "").split("/").filter(Boolean)
  if (p.length === 0) return "root"
  if (p[0] === "services" && p.length >= 2) return `${p[0]}/${p[1]}`
  return p[0]
}

function templateName(sampleId, sampleTitle, clusterSize) {
  const id = sampleId || ""
  const pref = urlPrefix(id)
  if (pref.startsWith("services/")) return `Service hub (${pref})`
  if (pref === "diseases") return "Disease / pathology antibody hub"
  if (pref === "research-area") return "Research area hub"
  if (pref === "protocol-and-troubleshooting") return "Protocol / troubleshooting guide"
  if (pref === "resources") return "Resources / content hub"
  if (pref === "cell-types") return "Cell-type antibody hub"
  if (pref === "landing") return "Campaign / landing page"
  if (/privacy|terms|shipping|return|warranty|cookie/i.test(id)) return "Policy / legal page"
  if (/contact|about|faq|careers/i.test(id)) return "Company / support page"
  if (clusterSize > 50) return `Shared layout (${pref}, high reuse)`
  return `CMS page (${pref})`
}

function main() {
  const full = fs.readFileSync(INPUT, "utf8")
  const pages = parsePages(full)

  // --- Audit ---
  const buckets = { KEEP: [], DROP: [], REVIEW: [] }
  for (const p of pages) {
    const { bucket, reason } = categorize(p)
    buckets[bucket === "REVIEW" ? "REVIEW" : bucket].push({ ...p, reason })
  }

  let audit = `# CMS Page Audit\n\n`
  audit += `Generated from \`docs/cms-pages-full-export.tsv\` (${pages.length} rows).\n\n`
  audit += `## Summary\n\n`
  audit += `| Metric | Count |\n|--------|-------|\n`
  audit += `| Total pages | ${pages.length} |\n`
  audit += `| **KEEP** (migrate) | ${buckets.KEEP.length} |\n`
  audit += `| **DROP** (do not migrate as CMS) | ${buckets.DROP.length} |\n`
  audit += `| **NEEDS REVIEW** | ${buckets.REVIEW.length} |\n\n`
  audit += `### Method\n\n`
  audit += `- Parsed full \`content\` per row (multi-line TSV).\n`
  audit += `- **DROP** includes Magento routes like \`no-route\`, \`enable-cookies\` (replaced by Next.js).\n`
  audit += `- **KEEP** favors active pages with service/research/disease/protocol paths, recent updates, or large HTML.\n`
  audit += `- **REVIEW** for inactive pages, very short active pages, or stale short content.\n`
  audit += `- Refine with Analytics/Search Console before deleting **REVIEW** items marked inactive.\n\n`

  function tableSection(name, rows) {
    let s = `## ${name}\n\n`
    s += `| page_id | identifier | title | last_updated | reason |\n`
    s += `|---------|------------|-------|--------------|--------|\n`
    for (const p of rows.sort((a, b) => Number(b.page_id) - Number(a.page_id))) {
      s += `| ${mdCell(p.page_id)} | ${mdCell(p.identifier)} | ${mdCell(p.title)} | ${mdCell(p.update_time)} | ${mdCell(p.reason)} |\n`
    }
    s += `\n`
    return s
  }

  audit += tableSection("KEEP (migrate these)", buckets.KEEP)
  audit += tableSection("DROP (do not migrate)", buckets.DROP)
  audit += tableSection("NEEDS REVIEW (manual decision required)", buckets.REVIEW)

  fs.writeFileSync(OUT_AUDIT, audit, "utf8")
  console.log("Wrote", OUT_AUDIT)

  // --- Template guide ---
  const clusters = new Map()
  const globalClasses = new Map()
  const globalDirectives = new Map()
  const prefixStats = new Map()

  for (const p of pages) {
    const norm = normalizeForCluster(p.content)
    const structKey =
      norm.length > 0
        ? crypto.createHash("sha256").update(norm).digest("hex").slice(0, 16)
        : `empty_${p.page_id}`

    if (!clusters.has(structKey)) clusters.set(structKey, [])
    clusters.get(structKey).push(p)

    const pref = urlPrefix(p.identifier)
    prefixStats.set(pref, (prefixStats.get(pref) || 0) + 1)

    for (const [c, n] of extractClasses(p.content)) globalClasses.set(c, (globalClasses.get(c) || 0) + n)
    for (const d of extractDirectives(p.content)) globalDirectives.set(d, (globalDirectives.get(d) || 0) + 1)
  }

  const sortedClusters = [...clusters.entries()].sort((a, b) => b[1].length - a[1].length)
  const TOP_N = 45
  const MAX_HTML = 14_000
  const topClusters = sortedClusters.slice(0, TOP_N)

  let guide = `# BosterBio CMS HTML Template Guide\n\n`
  guide += `## Overview\n\n`
  guide += `- **Source:** \`docs/cms-pages-full-export.tsv\` (${pages.length} CMS pages).\n`
  guide += `- **Distinct structural fingerprints** (whitespace normalized, URLs blanked, numbers collapsed): **${sortedClusters.length}**.\n`
  guide += `- This guide shows the **top ${TOP_N}** clusters by page count with **real representative HTML** (truncated per sample for repo size). Remaining layouts follow the same migration rules; full markup is in the TSV.\n`
  guide += `- **URL prefix** summary (IA grouping):\n\n`
  guide += `| URL prefix | pages |\n|------------|-------|\n`
  for (const [pref, n] of [...prefixStats.entries()].sort((a, b) => b[1] - a[1])) {
    guide += `| \`${mdCell(pref)}\` | ${n} |\n`
  }
  guide += `\n`

  guide += `## Template catalog (top ${TOP_N} layout clusters)\n\n`
  let ci = 0
  for (const [, group] of topClusters) {
    ci++
    const rep = group[0]
    const ids = group.map((g) => g.identifier).filter(Boolean)
    const dirs = extractDirectives(rep.content)
    const activeN = group.filter((g) => g.is_active).length
    const pref = urlPrefix(rep.identifier)

    const tname = templateName(rep.identifier, rep.title, group.length)
    guide += `### ${ci}. ${tname}\n\n`
    guide += `- **Structural hash:** \`${crypto.createHash("sha256").update(normalizeForCluster(rep.content)).digest("hex").slice(0, 16)}\` (for cross-reference)\n`
    guide += `- **URL prefix:** \`${pref}\`\n`
    guide += `- **Used by:** ${group.length} page(s) (${activeN} active)\n`
    guide += `- **Representative:** \`${rep.identifier}\` (page_id ${rep.page_id}) — ${rep.title}\n`
    if (ids.length <= 25) {
      guide += `- **All identifiers in cluster:** ${ids.map((x) => `\`${x}\``).join(", ")}\n`
    } else {
      guide += `- **Sample identifiers:** ${ids
        .slice(0, 20)
        .map((x) => `\`${x}\``)
        .join(", ")} … *+${ids.length - 20} more (same HTML structure)*\n`
    }
    guide += `- **content_heading:** ${rep.content_heading ? "`" + rep.content_heading + "`" : "_empty_"}\n`
    guide += `- **Magento directives in sample:** ${dirs.length ? dirs.map((d) => "`" + mdCell(d) + "`").join(", ") : "_none_"}\n\n`

    guide += `**Representative HTML** (pretty-printed; truncated if longer than ${MAX_HTML} chars):\n\n`
    guide += `<!--\n  Section guide: look for .container / .row / .content-section (grid),\n  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.\n-->\n\n`
    let body = rep.content || "_empty content_"
    let truncated = false
    if (body.length > MAX_HTML) {
      body =
        body.slice(0, MAX_HTML) +
        `\n\n<!-- TRUNCATED: ${rep.content.length} chars total — open docs/cms-pages-full-export.tsv row page_id=${rep.page_id} -->\n`
      truncated = true
    }
    guide += "```html\n"
    guide += prettifyHtml(body)
    guide += "\n```\n\n"
    if (truncated) {
      guide += `_See TSV for complete HTML._\n\n`
    }

    guide += `**Migration notes:**\n`
    guide += `- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.\n`
    guide += `- \`/media/\` + \`data-src\` → migrated assets + \`next/image\`.\n`
    guide += `- \`{{...}}\` directives → React components (see directive table below).\n\n`
    guide += `---\n\n`
  }

  guide += `## Remaining layout variants\n\n`
  guide += `There are **${sortedClusters.length - TOP_N}** additional structural clusters with fewer pages each. Treat them like the closest matching template above, or load full HTML from the TSV by \`page_id\`.\n\n`

  guide += `## Common HTML patterns\n\n`
  guide += `Observed across exports (theme / Bootstrap-style utility classes):\n\n`
  guide += `| Pattern | Typical classes / tags | Next.js approach |\n`
  guide += `|---------|-------------------------|------------------|\n`
  guide += `| Grid layout | \`row\`, \`col-lg-*\`, \`container\` | CSS Grid / Tailwind; match breakpoints to design system |\n`
  guide += `| Section spacing | \`content-section\`, \`py-*\`, \`mb-*\` | Shared \`<Section>\` layout component |\n`
  guide += `| Typography | \`font-largest\`, \`text-orange\`, \`text-grey\` | Map to Tailwind tokens (brand orange / grey) |\n`
  guide += `| Lazy images | \`data-class="LazyLoad"\`, \`data-src\` | \`next/image\` with \`loading="lazy"\` |\n`
  guide += `| Lists / sidebars | \`list-unstyled\`, \`double-column\` | Semantic \`<ul>\` + utility classes |\n`
  guide += `| Tables | \`<table>\`, \`<thead>\` | Responsive table wrapper component |\n\n`

  guide += `### Top CSS classes (frequency in export)\n\n`
  guide += `| class | occurrences |\n|-------|-------------|\n`
  for (const [c, n] of [...globalClasses.entries()].sort((a, b) => b[1] - a[1]).slice(0, 60)) {
    guide += `| \`${mdCell(c)}\` | ${n} |\n`
  }
  guide += `\n`

  guide += `## Magento directive reference\n\n`
  guide += `Directives found in **this** export (string literal → approximate page count):\n\n`
  guide += `| Directive | ~pages | Next.js replacement |\n`
  guide += `|-----------|--------|---------------------|\n`
  for (const [d, n] of [...globalDirectives.entries()].sort((a, b) => b[1] - a[1])) {
    const short = d.length > 100 ? d.slice(0, 97) + "…" : d
    let repl = "Parse `type` / `id`; implement as React component + API"
    if (d.includes("media url")) repl = "`next/image` or static URL after asset migration"
    else if (d.includes("store url")) repl = "`next/link` href or `NEXT_PUBLIC_SITE_URL`"
    else if (d.includes("block class")) repl = "CMS block → React fragment or MDX import"
    else if (d.includes("widget")) repl = "Widget → dedicated component (products, forms, etc.)"
    guide += `| \`${mdCell(short)}\` | ${n} | ${repl} |\n`
  }

  if (globalDirectives.size === 0) {
    guide += `_No \`{{...}}\` directives matched in this export (content may be mostly static HTML)._ \n\n`
  }

  guide += `\n## QA checklist\n\n`
  guide += `- [ ] Each **KEEP** \`identifier\` has a route or redirect in Next.js.\n`
  guide += `- [ ] All **widgets** in top templates have engineering owners.\n`
  guide += `- [ ] **LazyLoad** / \`data-src\` images migrated and optimized.\n`
  guide += `- [ ] Legal pages reviewed by compliance.\n`

  fs.writeFileSync(OUT_GUIDE, guide, "utf8")
  console.log("Wrote", OUT_GUIDE)
  console.log("Clusters:", sortedClusters.length, "KEEP/DROP/REVIEW:", buckets.KEEP.length, buckets.DROP.length, buckets.REVIEW.length)
}

main()
