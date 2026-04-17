/**
 * Round 7 — globals.css .site-nav-header; nav strip top 200px + full PLP/PDP at 1440.
 *   BASE_URL=http://localhost:3000 node scripts/capture-smoke-round7-playwright.mjs
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "")
const OUT = path.join(__dirname, "../public/screenshots/smoke-round7-1440")
const VIEWPORT = { width: 1440, height: 900 }
const SETTLE_MS = Number(process.env.PLAYWRIGHT_POST_MS ?? 4000)
const CURL_TIMEOUT_MS = Number(process.env.CURL_WAIT_MS ?? 120000)
const POLL_MS = 500

async function waitForHttp200() {
  const start = Date.now()
  while (Date.now() - start < CURL_TIMEOUT_MS) {
    try {
      const res = await fetch(`${BASE}/`, { redirect: "follow" })
      if (res.ok) return
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, POLL_MS))
  }
  throw new Error(`Timed out waiting for ${BASE}/ HTTP 200`)
}

async function main() {
  await waitForHttp200()
  await fs.mkdir(OUT, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewportSize(VIEWPORT)

  await page.goto(`${BASE}/products`, { waitUntil: "load", timeout: 120000 })
  await page.waitForSelector("#main-content", { timeout: 30000 })
  await new Promise((r) => setTimeout(r, SETTLE_MS))

  const strip = await page.screenshot({
    type: "png",
    clip: { x: 0, y: 0, width: 1440, height: 200 },
  })
  await fs.writeFile(path.join(OUT, "round7-nav-top-200px.png"), strip)

  const plp = await page.screenshot({ fullPage: true, type: "png" })
  await fs.writeFile(path.join(OUT, "round7-products-1440.png"), plp)

  await page.goto(`${BASE}/products/M02830`, { waitUntil: "load", timeout: 120000 })
  await page.waitForSelector("#main-content", { timeout: 30000 })
  await new Promise((r) => setTimeout(r, SETTLE_MS))
  const pdp = await page.screenshot({ fullPage: true, type: "png" })
  await fs.writeFile(path.join(OUT, "round7-pdp-m02830-1440.png"), pdp)

  await browser.close()
  console.log("Wrote:")
  console.log(" ", "public/screenshots/smoke-round7-1440/round7-nav-top-200px.png")
  console.log(" ", "public/screenshots/smoke-round7-1440/round7-products-1440.png")
  console.log(" ", "public/screenshots/smoke-round7-1440/round7-pdp-m02830-1440.png")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
