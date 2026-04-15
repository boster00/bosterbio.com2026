/**
 * Deliverable screenshots → Supabase GuildOS_Bucket/cursor_cloud/bosterbio-website/
 *
 * 1) Responsive: home, products, about @ 375, 968, 1200, 1400
 * 2) Figma audit: every #main-content route @ 1400px → figma-audit-1400/
 * 3) Catalog: full PLP + one PDP
 *
 * Loads apps/web/.env.local (SUPABASE_SECRETE_KEY → service role).
 *
 *   BASE_URL=http://localhost:3000 node scripts/capture-deliverables-upload.mjs
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createClient } from "@supabase/supabase-js"
import puppeteer from "puppeteer-core"
import { loadEnvLocal } from "./load-env-local.mjs"

loadEnvLocal()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE = process.env.BASE_URL ?? "http://localhost:3000"
const EXEC = process.env.PUPPETEER_EXECUTABLE_PATH ?? "/usr/local/bin/google-chrome"
const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://sdrqhejvvmbolqzfujej.supabase.co"
const BUCKET = "GuildOS_Bucket"
const ROOT = "cursor_cloud/bosterbio-website"
const SETTLE_MS = Number(process.env.PUPPETEER_POST_LOAD_MS ?? 2500)
const AUDIT_WIDTH = 1400
const RESP_WIDTHS = [375, 968, 1200, 1400]

/** Slug = safe filename segment for object path */
const AUDIT_ROUTES = [
  "/",
  "/about",
  "/about-us",
  "/account",
  "/all-product-categories",
  "/antibody-categories",
  "/boster-guarantee",
  "/boster-terms-and-conditions",
  "/career-opportunities",
  "/cart",
  "/contact",
  "/contact-us",
  "/design-guide",
  "/distributors",
  "/elisa_kits_landing_page",
  "/elisa-technical-resource-center",
  "/faqs",
  "/flow-technical-resource-center",
  "/immunohistochemistry-ihc-technical-resource-center",
  "/pcr-technical-resource-center",
  "/primary-antibodies",
  "/privacy",
  "/privacy-policy",
  "/products",
  "/promotions",
  "/recombinant-proteins",
  "/resources",
  "/secondary-antibodies",
  "/services",
  "/services/aav-packaging-service",
  "/services/assay-services",
  "/services/conjugation",
  "/services/custom-antibody",
  "/services/custom-antibody-production-services",
  "/services/elisa-development",
  "/services/multiplex-assay-services",
  "/services/multiplex-ihc",
  "/services/recombinant-protein-expression-service",
  "/supportformpage",
  "/terms",
  "/terms-of-service",
  "/testimonials",
  "/western-blotting-technical-resource-center",
]

function pathToSlug(routePath) {
  if (routePath === "/") return "home"
  return routePath.replace(/^\//, "").replace(/\//g, "__") || "page"
}

function publicUrl(objectPath) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${objectPath}`
}

function serviceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRETE_KEY
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function capture(page, width, urlPath) {
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 })
  const url = `${BASE}${urlPath}`
  const waitUntils = ["load", "domcontentloaded"]
  for (let i = 0; i < waitUntils.length; i++) {
    try {
      await page.goto(url, { waitUntil: waitUntils[i], timeout: 120000 })
      break
    } catch (e) {
      if (i === waitUntils.length - 1) throw e
      await sleep(1200)
    }
  }
  try {
    await page.waitForSelector("#main-content", { timeout: 25000 })
  } catch {
    await page.waitForSelector("body", { timeout: 8000 })
  }
  await new Promise((r) => setTimeout(r, SETTLE_MS))
  return page.screenshot({ fullPage: true, type: "png" })
}

async function firstProductCatalogPath(page) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await page.goto(`${BASE}/products`, { waitUntil: "domcontentloaded", timeout: 120000 })
      await page.waitForSelector("#main-content", { timeout: 45000 })
      await new Promise((r) => setTimeout(r, SETTLE_MS))
      break
    } catch (e) {
      if (attempt === 2) throw e
      await sleep(2000)
    }
  }
  const href = await page.evaluate(() => {
    const root = document.querySelector("#main-content") || document.body
    const singleSeg = /^\/products\/[A-Za-z0-9][A-Za-z0-9._-]*$/
    const links = [...root.querySelectorAll('a[href^="/products/"]')]
      .map((a) => a.getAttribute("href") || "")
      .filter((h) => h && !h.includes("?") && singleSeg.test(h))
    const cat = (h) => (h.split("/")[2] || "").trim()
    const withDigit = links.filter((h) => /\d/.test(cat(h)))
    return (withDigit[0] ?? links[0]) ?? null
  })
  return href
}

async function main() {
  const key = serviceKey()
  if (!key) {
    console.error("Missing SUPABASE_SECRETE_KEY or SUPABASE_SERVICE_ROLE_KEY in environment or .env.local")
    process.exit(1)
  }

  const browser = await puppeteer.launch({
    executablePath: EXEC,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  })
  const page = await browser.newPage()

  const outDir = path.join(__dirname, "../public/screenshots/deliverables")
  await fs.mkdir(outDir, { recursive: true })

  const uploads = []

  // --- Responsive (3 routes × 4 widths) ---
  const responsiveSlugs = [
    { slug: "home", path: "/" },
    { slug: "products", path: "/products" },
    { slug: "about", path: "/about" },
  ]
  for (const r of responsiveSlugs) {
    for (const w of RESP_WIDTHS) {
      const buf = await capture(page, w, r.path)
      const op = `${ROOT}/responsive/${r.slug}-${w}.png`
      uploads.push({ op, buf, label: `responsive ${r.slug} ${w}px` })
    }
  }

  // --- Figma audit @ 1400 ---
  for (const routePath of AUDIT_ROUTES) {
    const slug = pathToSlug(routePath)
    try {
      const buf = await capture(page, AUDIT_WIDTH, routePath)
      const op = `${ROOT}/figma-audit-1400/${slug}.png`
      uploads.push({ op, buf, label: `figma-audit ${routePath}` })
    } catch (e) {
      console.warn(`[skip] ${routePath}:`, e instanceof Error ? e.message : e)
    }
  }

  // --- First product PDP (discovered from PLP) ---
  const pdpPath = await firstProductCatalogPath(page)
  if (!pdpPath) {
    console.warn("No product detail link found on /products; skipping PDP screenshot.")
  } else {
    const buf = await capture(page, AUDIT_WIDTH, pdpPath)
    const pdpSlug = `product-detail${pdpPath.replace(/\//g, "__")}`
    const op = `${ROOT}/catalog/${pdpSlug}.png`
    uploads.push({ op, buf, label: `catalog PDP ${pdpPath}` })
  }

  // --- Catalog PLP showing 5 cards @ 1400 ---
  const catalogBuf = await capture(page, AUDIT_WIDTH, "/products")
  uploads.push({ op: `${ROOT}/catalog/products-plp-5.png`, buf: catalogBuf, label: "catalog PLP" })

  await browser.close()

  // Save local copies
  for (const u of uploads) {
    const localName = u.op.replace(`${ROOT}/`, "").replace(/\//g, "_")
    await fs.writeFile(path.join(outDir, localName), u.buf)
  }

  const sb = createClient(SUPABASE_URL, key, { auth: { persistSession: false } })
  const opts = { contentType: "image/png", upsert: true }
  for (const { op, buf } of uploads) {
    const { error } = await sb.storage.from(BUCKET).upload(op, buf, opts)
    if (error) throw error
  }

  console.log(JSON.stringify({ uploaded: uploads.length, urls: uploads.map((u) => ({ label: u.label, url: publicUrl(u.op) })) }, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
