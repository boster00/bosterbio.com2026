/**
 * Full-page screenshots for nav migration QA.
 * BASE_URL=http://localhost:3003 node scripts/capture-nav-pages.mjs
 */
import fs from "node:fs/promises"
import path from "node:path"
import puppeteer from "puppeteer-core"

const BASE = process.env.BASE_URL || "http://localhost:3003"
const OUT = path.join(process.cwd(), "public/screenshots/nav-pages")
const EXEC = process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/local/bin/google-chrome"

const allShots = [
  ["group1", "about-us", "/about-us"],
  ["group1", "contact-us", "/contact-us"],
  ["group1", "boster-guarantee", "/boster-guarantee"],
  ["group1", "faqs", "/faqs"],
  ["group1", "testimonials", "/testimonials"],
  ["group1", "career-opportunities", "/career-opportunities"],
  ["group1", "distributors", "/distributors"],
  ["group1", "privacy-policy", "/privacy-policy"],
  ["group1", "terms-of-service", "/terms-of-service"],
  ["group1", "boster-terms-and-conditions", "/boster-terms-and-conditions"],
  ["group2", "all-product-categories", "/all-product-categories"],
  ["group2", "primary-antibodies", "/primary-antibodies"],
  ["group2", "secondary-antibodies", "/secondary-antibodies"],
  ["group2", "elisa_kits_landing_page", "/elisa_kits_landing_page"],
  ["group2", "recombinant-proteins", "/recombinant-proteins"],
  ["group2", "antibody-categories", "/antibody-categories"],
  ["group2", "promotions", "/promotions"],
  ["group3", "custom-antibody-production-services", "/services/custom-antibody-production-services"],
  ["group3", "assay-services", "/services/assay-services"],
  ["group3", "multiplex-assay-services", "/services/multiplex-assay-services"],
  ["group3", "recombinant-protein-expression-service", "/services/recombinant-protein-expression-service"],
  ["group3", "aav-packaging-service", "/services/aav-packaging-service"],
  ["group4", "western-blotting-technical-resource-center", "/western-blotting-technical-resource-center"],
  ["group4", "immunohistochemistry-ihc-technical-resource-center", "/immunohistochemistry-ihc-technical-resource-center"],
  ["group4", "elisa-technical-resource-center", "/elisa-technical-resource-center"],
  ["group4", "flow-technical-resource-center", "/flow-technical-resource-center"],
  ["group4", "pcr-technical-resource-center", "/pcr-technical-resource-center"],
  ["group4", "supportformpage", "/supportformpage"],
]

/** Optional: GROUP=1 | GROUP=2 | GROUP=3 | GROUP=4 to capture one batch only */
const groupNum = process.env.GROUP
const shots = groupNum ? allShots.filter((s) => s[0] === `group${groupNum}`) : allShots

async function main() {
  await fs.mkdir(OUT, { recursive: true })
  const browser = await puppeteer.launch({
    executablePath: EXEC,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })

  if (shots.length === 0) {
    console.error("No shots match GROUP=", groupNum)
    process.exit(1)
  }

  for (const [group, name, route] of shots) {
    const url = `${BASE}${route}`
    try {
      await page.goto(url, { waitUntil: "load", timeout: 120000 })
      await new Promise((r) => setTimeout(r, 2500))
      const fp = path.join(OUT, `${group}-${name}.png`)
      await page.screenshot({ path: fp, fullPage: true })
      console.log("OK", fp)
    } catch (e) {
      console.error("FAIL", url, e.message)
    }
  }
  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
