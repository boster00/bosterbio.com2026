/**
 * Products page — 1280px + 375px full page → public/screenshots/nav-pages/
 * BASE_URL=http://localhost:3000 node scripts/capture-product-catalog-screenshots.mjs
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import puppeteer from "puppeteer-core"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE = process.env.BASE_URL ?? "http://localhost:3000"
const OUT = path.join(__dirname, "../public/screenshots/nav-pages")
const EXEC = process.env.PUPPETEER_EXECUTABLE_PATH ?? "/usr/local/bin/google-chrome"

async function wait(page) {
  await page.waitForSelector("body", { timeout: 30000 })
  try {
    await page.waitForSelector("link[rel='stylesheet']", { timeout: 5000 })
  } catch {
    /* ok */
  }
  await new Promise((r) => setTimeout(r, Number(process.env.PUPPETEER_POST_LOAD_MS ?? 2500)))
}

async function main() {
  await fs.mkdir(OUT, { recursive: true })
  const browser = await puppeteer.launch({
    executablePath: EXEC,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  })
  const page = await browser.newPage()
  for (const [w, name] of [
    [1280, "products-catalog-1280"],
    [375, "products-catalog-375"],
  ]) {
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 })
    await page.goto(`${BASE}/products`, { waitUntil: "load", timeout: 120000 })
    await wait(page)
    const fp = path.join(OUT, `${name}.png`)
    await page.screenshot({ path: fp, fullPage: true })
    console.log("Wrote", fp)
  }
  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
