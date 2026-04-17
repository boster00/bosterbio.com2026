/**
 * Playwright full-page screenshots at 1440px for /products and /products/M02830.
 *
 * Waits until BASE_URL returns HTTP 200 (curl-style check via fetch).
 *   cd apps/web && pnpm exec playwright install chromium  # once
 *   BASE_URL=http://localhost:3000 node scripts/capture-products-pdp-playwright.mjs
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "")
const OUT = path.join(__dirname, "../public/screenshots/quest-4444-products-pdp")
const VIEWPORT = { width: 1440, height: 900 }
const SETTLE_MS = Number(process.env.PLAYWRIGHT_POST_MS ?? 2000)
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
  throw new Error(`Timed out after ${CURL_TIMEOUT_MS}ms waiting for ${BASE}/ to return 200`)
}

async function capture(page, pathname, filename) {
  await page.setViewportSize(VIEWPORT)
  await page.goto(`${BASE}${pathname}`, { waitUntil: "load", timeout: 120000 })
  await page.waitForSelector("#main-content", { timeout: 30000 })
  await new Promise((r) => setTimeout(r, SETTLE_MS))
  const buf = await page.screenshot({ fullPage: true, type: "png" })
  const fp = path.join(OUT, filename)
  await fs.writeFile(fp, buf)
  return `public/screenshots/quest-4444-products-pdp/${filename}`
}

async function main() {
  await waitForHttp200()
  await fs.mkdir(OUT, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  const files = []
  files.push(await capture(page, "/products", "playwright-1440-products.png"))
  files.push(await capture(page, "/products/M02830", "playwright-1440-pdp-M02830.png"))

  await browser.close()
  console.log("Wrote:")
  for (const f of files) console.log(" ", f)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
