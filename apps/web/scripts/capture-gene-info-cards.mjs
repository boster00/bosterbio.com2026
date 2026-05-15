/**
 * Full-page PNG screenshots for /gene-info/[gene] biomarker pages (quest evidence).
 *
 *   BASE_URL=http://localhost:3003 node scripts/capture-gene-info-cards.mjs
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import puppeteer from "puppeteer-core"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const BASE = process.env.BASE_URL ?? "http://localhost:3003"
const EXEC = process.env.PUPPETEER_EXECUTABLE_PATH ?? "/usr/local/bin/google-chrome"
const W = 1440
const SETTLE_MS = Number(process.env.PUPPETEER_POST_LOAD_MS ?? 3500)
const OUT = path.join(__dirname, "../public/screenshots/gene-info-cards-1440")

const GENES = ["VEGFA", "IL6", "TNF", "GAPDH", "TP53", "HIF1A", "AKT1", "EGFR", "MKI67", "CD44"]

async function capture(page, urlPath) {
  const waitUntil = process.env.PUPPETEER_WAIT === "networkidle0" ? "networkidle0" : "load"
  await page.goto(`${BASE}${urlPath}`, {
    waitUntil,
    timeout: 120000,
  })
  await page.waitForSelector("body", { timeout: 30000 })
  await new Promise((r) => setTimeout(r, SETTLE_MS))

  const braceCheck = await page.evaluate(() => document.body.innerText.includes("{"))
  if (braceCheck) {
    console.warn(`Warning: '{' detected in visible text for ${urlPath}`)
  }

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
  await page.setViewport({ width: W, height: 900, deviceScaleFactor: 1 })

  const files = []
  for (const g of GENES) {
    const pathSeg = `/gene-info/${encodeURIComponent(g)}`
    const buf = await capture(page, pathSeg)
    const name = `gene-info-${g}-1440.png`
    const fp = path.join(OUT, name)
    await fs.writeFile(fp, buf)
    files.push(`public/screenshots/gene-info-cards-1440/${name}`)
    console.log("wrote", fp)
  }

  await browser.close()
  console.log("Done:\n", files.join("\n "))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
