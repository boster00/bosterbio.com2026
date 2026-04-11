/**
 * Captures homepage section screenshots for design review.
 * Usage: BASE_URL=http://localhost:3000 node scripts/capture-sections.mjs
 */
import fs from "node:fs/promises"
import path from "node:path"
import puppeteer from "puppeteer-core"

const OUT_DIR = process.env.SCREENSHOT_DIR ?? "/opt/cursor/artifacts/screenshots"
const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000"
const EXECUTABLE =
  process.env.PUPPETEER_EXECUTABLE_PATH ?? "/usr/local/bin/google-chrome"

const sections = [
  { id: "hero", name: "home-01-hero" },
  { id: "categories", name: "home-02-categories" },
  { id: "trust", name: "home-03-trust" },
  { id: "resources", name: "home-04-resources" },
  { id: "cta", name: "home-05-cta" },
  { id: "footer", name: "home-06-footer" },
]

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    executablePath: EXECUTABLE,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 })
    await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 60000 })

    for (const { id, name } of sections) {
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

    // Full homepage (tall viewport)
    await page.setViewport({ width: 1280, height: 4800, deviceScaleFactor: 1 })
    await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 60000 })
    const fullPath = path.join(OUT_DIR, "home-full-page.png")
    await page.screenshot({ path: fullPath, fullPage: true })
    console.log("Wrote", fullPath)

    // Secondary pages
    const pages = ["/products", "/resources", "/about", "/contact"]
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })
    for (const p of pages) {
      await page.goto(`${BASE}${p}`, { waitUntil: "networkidle0", timeout: 60000 })
      const safe = p.replace(/\//g, "") || "home"
      const fp = path.join(OUT_DIR, `page-${safe || "home"}.png`)
      await page.screenshot({ path: fp, fullPage: true })
      console.log("Wrote", fp)
    }
  } finally {
    await browser.close()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
