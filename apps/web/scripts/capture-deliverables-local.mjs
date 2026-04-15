/**
 * Deliverable screenshots → public/screenshots/deliverables/
 *
 * - Every storefront page @ 1400px (full-page)
 * - /products catalog @ 1400px (explicit filename)
 * - First antibody PDP from PLP @ 1400px
 * - Three representative pages @ 375px (mobile)
 *
 *   BASE_URL=http://localhost:3000 node scripts/capture-deliverables-local.mjs
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import puppeteer from "puppeteer-core"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE = process.env.BASE_URL ?? "http://localhost:3000"
const EXEC = process.env.PUPPETEER_EXECUTABLE_PATH ?? "/usr/local/bin/google-chrome"
const SETTLE_MS = Number(process.env.PUPPETEER_POST_LOAD_MS ?? 2000)
const W_DESKTOP = 1400
const W_MOBILE = 375

/** All `page.tsx` routes under the site (1400px audit). */
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

async function capture(page, width, urlPath) {
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 })
  const url = `${BASE}${urlPath}`
  await page.goto(url, { waitUntil: "load", timeout: 120000 })
  try {
    await page.waitForSelector("#main-content", { timeout: 20000 })
  } catch {
    await page.waitForSelector("body", { timeout: 5000 })
  }
  await new Promise((r) => setTimeout(r, SETTLE_MS))
  return page.screenshot({ fullPage: true, type: "png" })
}

async function firstProductCatalogPath(page) {
  await page.goto(`${BASE}/products`, { waitUntil: "load", timeout: 120000 })
  await page.waitForSelector("#main-content", { timeout: 30000 })
  await new Promise((r) => setTimeout(r, SETTLE_MS))
  return page.evaluate(() => {
    const root = document.querySelector("#main-content") || document.body
    const singleSeg = /^\/products\/[A-Za-z0-9][A-Za-z0-9._-]*$/
    const links = [...root.querySelectorAll('a[href^="/products/"]')]
      .map((a) => a.getAttribute("href") || "")
      .filter((h) => h && !h.includes("?") && singleSeg.test(h))
    const cat = (h) => (h.split("/")[2] || "").trim()
    const withDigit = links.filter((h) => /\d/.test(cat(h)))
    return (withDigit[0] ?? links[0]) ?? null
  })
}

async function main() {
  const outDir = path.join(__dirname, "../public/screenshots/deliverables")
  await fs.mkdir(outDir, { recursive: true })

  const browser = await puppeteer.launch({
    executablePath: EXEC,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  })
  const page = await browser.newPage()
  const saved = []

  for (const routePath of AUDIT_ROUTES) {
    const slug = pathToSlug(routePath)
    try {
      const buf = await capture(page, W_DESKTOP, routePath)
      const name = `page-1400-${slug}.png`
      await fs.writeFile(path.join(outDir, name), buf)
      saved.push(`public/screenshots/deliverables/${name}`)
    } catch (e) {
      console.warn(`[skip] ${routePath}:`, e instanceof Error ? e.message : e)
    }
  }

  const catalogBuf = await capture(page, W_DESKTOP, "/products")
  await fs.writeFile(path.join(outDir, "products-catalog-1400.png"), catalogBuf)
  saved.push("public/screenshots/deliverables/products-catalog-1400.png")

  const pdpPath = await firstProductCatalogPath(page)
  if (pdpPath) {
    const sku = pdpPath.replace("/products/", "").replace(/[^\w.-]/g, "_")
    const buf = await capture(page, W_DESKTOP, pdpPath)
    const name = `product-detail-1400-${sku}.png`
    await fs.writeFile(path.join(outDir, name), buf)
    saved.push(`public/screenshots/deliverables/${name}`)
  } else {
    console.warn("No PDP link found on /products")
  }

  const mobile = [
    { slug: "home", path: "/" },
    { slug: "products", path: "/products" },
    { slug: "about", path: "/about" },
  ]
  for (const m of mobile) {
    const buf = await capture(page, W_MOBILE, m.path)
    const name = `mobile-375-${m.slug}.png`
    await fs.writeFile(path.join(outDir, name), buf)
    saved.push(`public/screenshots/deliverables/${name}`)
  }

  await browser.close()

  console.log(JSON.stringify({ count: saved.length, files: saved.sort() }, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
