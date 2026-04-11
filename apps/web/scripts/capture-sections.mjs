/**
 * Capture screenshots for design review.
 * Usage: BASE_URL=http://127.0.0.1:3000 node scripts/capture-sections.mjs [home|products|...|fullpages|routes|all]
 *
 * `routes` — full-page PNGs for the review set → apps/web/docs/screenshots/routes/ (committed to repo)
 * `all` — homepage section clips + page-*.png + fullpage-*.png (default OUT_DIR)
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import puppeteer from "puppeteer-core"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROUTES_DIR = path.join(__dirname, "../docs/screenshots/routes")

const OUT_DIR = process.env.SCREENSHOT_DIR ?? "/opt/cursor/artifacts/screenshots"
const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000"
const EXECUTABLE =
  process.env.PUPPETEER_EXECUTABLE_PATH ?? "/usr/local/bin/google-chrome"
/** Use `load` for Next dev (networkidle never settles); default `networkidle0` for production */
const WAIT = process.env.PUPPETEER_WAIT ?? "networkidle0"
const SETTLE_MS = Number(process.env.PUPPETEER_SETTLE_MS ?? "0")

const mode = (process.argv[2] ?? "all").toLowerCase()

const homeSections = [
  { id: "hero", name: "home-01-hero" },
  { id: "categories", name: "home-02-categories" },
  { id: "trust", name: "home-03-trust" },
  { id: "resources", name: "home-04-resources" },
  { id: "cta", name: "home-05-cta" },
  { id: "footer", name: "home-06-footer" },
]

/** Legacy/alternate filenames (full-page captures) */
const pageRoutes = [
  { path: "/products", file: "page-products" },
  { path: "/about", file: "page-about" },
  { path: "/resources", file: "page-resources" },
  { path: "/contact", file: "page-contact" },
  { path: "/services", file: "page-services" },
  { path: "/services/custom-antibody", file: "page-service-custom-antibody" },
  { path: "/services/elisa-development", file: "page-service-elisa" },
  { path: "/services/conjugation", file: "page-service-conjugation" },
  { path: "/services/multiplex-ihc", file: "page-service-multiplex-ihc" },
]

/** Every storefront route — fullpage-{file}.png */
const fullPageRoutes = [
  { path: "/", file: "home" },
  { path: "/products", file: "products" },
  { path: "/about", file: "about" },
  { path: "/resources", file: "resources" },
  { path: "/contact", file: "contact" },
  { path: "/services", file: "services" },
  { path: "/services/custom-antibody", file: "services-custom-antibody" },
  { path: "/services/elisa-development", file: "services-elisa-development" },
  { path: "/services/conjugation", file: "services-conjugation" },
  { path: "/services/multiplex-ihc", file: "services-multiplex-ihc" },
  { path: "/account", file: "account" },
  { path: "/cart", file: "cart" },
  { path: "/privacy", file: "privacy" },
  { path: "/terms", file: "terms" },
]

/** Routes requested for repo screenshots (order preserved) */
const routesForRepo = [
  { path: "/", file: "route-home" },
  { path: "/products", file: "route-products" },
  { path: "/about", file: "route-about" },
  { path: "/contact", file: "route-contact" },
  { path: "/services/custom-antibody", file: "route-services-custom-antibody" },
  { path: "/services/elisa-development", file: "route-services-elisa-development" },
  { path: "/services/conjugation", file: "route-services-conjugation" },
  { path: "/services/multiplex-ihc", file: "route-services-multiplex-ihc" },
  { path: "/resources", file: "route-resources" },
  { path: "/account", file: "route-account" },
  { path: "/cart", file: "route-cart" },
]

async function captureHome(page) {
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 })
  await page.goto(`${BASE}/`, { waitUntil: WAIT, timeout: 90000 })
  if (SETTLE_MS) await new Promise((r) => setTimeout(r, SETTLE_MS))

  for (const { id, name } of homeSections) {
    const el = await page.$(`#${id}`)
    if (!el) {
      console.warn(`Missing #${id}`)
      continue
    }
    await el.scrollIntoView()
    await new Promise((r) => setTimeout(r, 300))
    const box = await el.boundingBox()
    if (!box) continue
    const clip = {
      x: Math.max(0, box.x),
      y: Math.max(0, box.y),
      width: Math.min(box.width, 1280),
      height: box.height,
    }
    const filePath = path.join(OUT_DIR, `${name}.png`)
    await page.screenshot({ path: filePath, clip })
    console.log("Wrote", filePath)
  }

  await page.setViewport({ width: 1280, height: 4800, deviceScaleFactor: 1 })
  await page.goto(`${BASE}/`, { waitUntil: WAIT, timeout: 90000 })
  if (SETTLE_MS) await new Promise((r) => setTimeout(r, SETTLE_MS))
  const fullPath = path.join(OUT_DIR, "home-full-page.png")
  await page.screenshot({ path: fullPath, fullPage: true })
  console.log("Wrote", fullPath)
}

async function capturePageFull(page, route, fileBase, outputDir = OUT_DIR) {
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })
  await page.goto(`${BASE}${route}`, { waitUntil: WAIT, timeout: 90000 })
  if (SETTLE_MS) await new Promise((r) => setTimeout(r, SETTLE_MS))
  const fp = path.join(outputDir, `${fileBase}.png`)
  await page.screenshot({ path: fp, fullPage: true })
  console.log("Wrote", fp)
}

async function main() {
  const outDir = mode === "routes" ? REPO_ROUTES_DIR : OUT_DIR
  await fs.mkdir(outDir, { recursive: true })

  const browser = await puppeteer.launch({
    executablePath: EXECUTABLE,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  })

  try {
    const page = await browser.newPage()

    if (mode === "routes") {
      for (const r of routesForRepo) {
        await capturePageFull(page, r.path, r.file, REPO_ROUTES_DIR)
      }
      return
    }

    if (mode === "home" || mode === "all") {
      await captureHome(page)
    }

    if (mode === "products") {
      await capturePageFull(page, "/products", "page-products")
    } else if (mode === "about") {
      await capturePageFull(page, "/about", "page-about")
    } else if (mode === "resources") {
      await capturePageFull(page, "/resources", "page-resources")
    } else if (mode === "contact") {
      await capturePageFull(page, "/contact", "page-contact")
    } else if (mode === "services") {
      for (const r of pageRoutes.filter((x) => x.path.startsWith("/services"))) {
        await capturePageFull(page, r.path, r.file)
      }
    } else if (mode === "fullpages") {
      for (const r of fullPageRoutes) {
        await capturePageFull(page, r.path, `fullpage-${r.file}`)
      }
    } else if (mode === "all") {
      for (const r of pageRoutes) {
        await capturePageFull(page, r.path, r.file)
      }
      for (const r of fullPageRoutes) {
        await capturePageFull(page, r.path, `fullpage-${r.file}`)
      }
    }
  } finally {
    await browser.close()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
