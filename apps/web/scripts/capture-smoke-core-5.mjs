/**
 * Smoke test: full-page PNGs at 1440px for 5 core routes.
 *
 *   BASE_URL=http://localhost:3000 node scripts/capture-smoke-core-5.mjs
 */
import fs from "node:fs/promises"
import fsSync from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import puppeteer from "puppeteer-core"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE = process.env.BASE_URL ?? "http://localhost:3000"
const EXEC = process.env.PUPPETEER_EXECUTABLE_PATH ?? "/usr/local/bin/google-chrome"
const W = 1440
const SETTLE_MS = Number(process.env.PUPPETEER_POST_LOAD_MS ?? 2500)
const OUT = path.join(__dirname, "../public/screenshots/smoke-core-1440")
const SEED_PATH = path.join(__dirname, "../src/data/featured-catalog.seed.json")

const PAGES = [
  { key: "home", path: "/" },
  { key: "about", path: "/about-us" },
  { key: "products", path: "/products" },
  { key: "pdp", path: "/products/M02830" },
  { key: "search", path: "/search?q=antibody" },
]

function fallbackSkuFromSeed() {
  try {
    const raw = fsSync.readFileSync(SEED_PATH, "utf8")
    const rows = JSON.parse(raw)
    const sku = rows?.[0]?.catalog_sku
    return typeof sku === "string" && sku.trim() ? sku.trim() : "M02830"
  } catch {
    return "M02830"
  }
}

async function capture(page, urlPath) {
  const waitUntil = process.env.PUPPETEER_WAIT === "networkidle0" ? "networkidle0" : "load"
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await page.goto(`${BASE}${urlPath}`, {
        waitUntil: attempt % 2 === 0 ? waitUntil : "domcontentloaded",
        timeout: 120000,
      })
      break
    } catch (e) {
      if (attempt === 2) throw e
      await new Promise((r) => setTimeout(r, 800 * (attempt + 1)))
    }
  }
  await page.waitForSelector("body", { timeout: 30000 })
  try {
    await page.waitForFunction(
      () => !document.body.innerText.includes("Application error"),
      { timeout: 5000 },
    )
  } catch {
    /* continue */
  }
  await new Promise((r) => setTimeout(r, SETTLE_MS))
  return page.screenshot({ fullPage: true, type: "png" })
}

async function main() {
  await fs.mkdir(OUT, { recursive: true })
  const sku = fallbackSkuFromSeed()
  const resolvedPages = PAGES.map((p) =>
    p.key === "pdp" ? { ...p, path: `/products/${encodeURIComponent(sku)}` } : p,
  )

  const browser = await puppeteer.launch({
    executablePath: EXEC,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: W, height: 900, deviceScaleFactor: 1 })

  const files = []
  for (const p of resolvedPages) {
    const buf = await capture(page, p.path)
    const name = `smoke-1440-${p.key}.png`
    const fp = path.join(OUT, name)
    await fs.writeFile(fp, buf)
    files.push(`public/screenshots/smoke-core-1440/${name}`)
  }

  await browser.close()
  console.log("Wrote:")
  for (const f of files) console.log(" ", f)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
