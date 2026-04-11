/**
 * Capture screenshots for design review.
 * Usage: BASE_URL=http://127.0.0.1:3000 node scripts/capture-sections.mjs [home|products|about|resources|contact|services|all]
 */
import fs from "node:fs/promises"
import path from "node:path"
import puppeteer from "puppeteer-core"

const OUT_DIR = process.env.SCREENSHOT_DIR ?? "/opt/cursor/artifacts/screenshots"
const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000"
const EXECUTABLE =
  process.env.PUPPETEER_EXECUTABLE_PATH ?? "/usr/local/bin/google-chrome"

const mode = (process.argv[2] ?? "all").toLowerCase()

const homeSections = [
  { id: "hero", name: "home-01-hero" },
  { id: "categories", name: "home-02-categories" },
  { id: "trust", name: "home-03-trust" },
  { id: "resources", name: "home-04-resources" },
  { id: "cta", name: "home-05-cta" },
  { id: "footer", name: "home-06-footer" },
]

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

async function captureHome(page) {
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 })
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 60000 })

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
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 60000 })
  const fullPath = path.join(OUT_DIR, "home-full-page.png")
  await page.screenshot({ path: fullPath, fullPage: true })
  console.log("Wrote", fullPath)
}

async function capturePage(page, route, fileBase) {
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 60000 })
  const fp = path.join(OUT_DIR, `${fileBase}.png`)
  await page.screenshot({ path: fp, fullPage: true })
  console.log("Wrote", fp)
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    executablePath: EXECUTABLE,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  })

  try {
    const page = await browser.newPage()

    if (mode === "home" || mode === "all") {
      await captureHome(page)
    }

    if (mode === "products") {
      await capturePage(page, "/products", "page-products")
    } else if (mode === "about") {
      await capturePage(page, "/about", "page-about")
    } else if (mode === "resources") {
      await capturePage(page, "/resources", "page-resources")
    } else if (mode === "contact") {
      await capturePage(page, "/contact", "page-contact")
    } else if (mode === "services") {
      for (const r of pageRoutes.filter((x) => x.path.startsWith("/services"))) {
        await capturePage(page, r.path, r.file)
      }
    } else if (mode === "all") {
      for (const r of pageRoutes) {
        await capturePage(page, r.path, r.file)
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
