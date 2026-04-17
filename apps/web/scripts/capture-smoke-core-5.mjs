/**
 * Full-page screenshots at 1440px for core smoke test pages.
 *   QUEST_ID=... BASE_URL=http://localhost:3000 node scripts/capture-smoke-core-5.mjs
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import puppeteer from "puppeteer-core"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, "../public/screenshots/smoke-core-1440")
const BASE = process.env.BASE_URL ?? "http://localhost:3000"
const EXEC = process.env.PUPPETEER_EXECUTABLE_PATH ?? "/usr/local/bin/google-chrome"
const W = 1440

const PAGES = [
  { key: "home", path: "/" },
  { key: "about-us", path: "/about-us" },
  { key: "product-listing", path: "/products" },
  { key: "product-detail", path: "/products/M02830" },
  { key: "search", path: "/search?q=antibody" },
]

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function capture(page, urlPath) {
  await page.setViewport({ width: W, height: 900, deviceScaleFactor: 1 })
  const url = `${BASE}${urlPath}`
  for (const waitUntil of ["load", "domcontentloaded"]) {
    try {
      await page.goto(url, { waitUntil, timeout: 120000 })
      break
    } catch {
      /* retry */
    }
  }
  try {
    await page.waitForSelector("#main-content", { timeout: 30000 })
  } catch {
    await page.waitForSelector("body", { timeout: 8000 })
  }
  await sleep(2000)
  return page.screenshot({ fullPage: true, type: "png" })
}

async function main() {
  await fs.mkdir(OUT, { recursive: true })
  const browser = await puppeteer.launch({
    executablePath: EXEC,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  })
  const page = await browser.newPage()
  const files = []
  for (const p of PAGES) {
    const buf = await capture(page, p.path)
    const name = `smoke-1440-${p.key}.png`
    const fp = path.join(OUT, name)
    await fs.writeFile(fp, buf)
    files.push(`public/screenshots/smoke-core-1440/${name}`)
  }
  await browser.close()
  console.log(JSON.stringify({ outDir: OUT, files }, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
