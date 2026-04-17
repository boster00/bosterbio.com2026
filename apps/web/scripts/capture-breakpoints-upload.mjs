/**
 * Full-page screenshots at 375, 968, 1200, 1400px for representative routes; optional Supabase upload.
 *
 *   BASE_URL=http://localhost:3000 node scripts/capture-breakpoints-upload.mjs
 *   SUPABASE_SERVICE_ROLE_KEY=... BASE_URL=http://localhost:3000 node scripts/capture-breakpoints-upload.mjs upload
 * Loads apps/web/.env.local automatically (uses SUPABASE_SECRETE_KEY → service role if set).
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createClient } from "@supabase/supabase-js"
import puppeteer from "puppeteer-core"
import { loadEnvLocal } from "./load-env-local.mjs"

loadEnvLocal()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE = process.env.BASE_URL ?? "http://localhost:3000"
const EXEC = process.env.PUPPETEER_EXECUTABLE_PATH ?? "/usr/local/bin/google-chrome"
const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://sdrqhejvvmbolqzfujej.supabase.co"
const BUCKET = "GuildOS_Bucket"
const PREFIX = "cursor_cloud/bosterbio-website/responsive"
const SETTLE_MS = Number(process.env.PUPPETEER_POST_LOAD_MS ?? 2500)

const WIDTHS = [375, 968, 1200, 1400]
const ROUTES = [
  { slug: "home", path: "/" },
  { slug: "products", path: "/products" },
  { slug: "about", path: "/about" },
]

function objectPath(routeSlug, w) {
  return `${PREFIX}/${routeSlug}-${w}.png`
}

function publicUrl(objectPath) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${objectPath}`
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function capture(page, width, urlPath) {
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 })
  const url = `${BASE}${urlPath}`
  const waitUntils = ["load", "domcontentloaded"]
  for (let i = 0; i < waitUntils.length; i++) {
    try {
      await page.goto(url, { waitUntil: waitUntils[i], timeout: 120000 })
      break
    } catch (e) {
      if (i === waitUntils.length - 1) throw e
      await sleep(1200)
    }
  }
  try {
    await page.waitForSelector("#main-content", { timeout: 25000 })
  } catch {
    await page.waitForSelector("body", { timeout: 8000 })
  }
  await new Promise((r) => setTimeout(r, SETTLE_MS))
  return page.screenshot({ fullPage: true, type: "png" })
}

async function main() {
  const upload = process.argv.includes("upload")
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRETE_KEY
  if (upload && !serviceKey) {
    console.error("Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRETE_KEY for upload mode.")
    process.exit(1)
  }

  const browser = await puppeteer.launch({
    executablePath: EXEC,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  })
  const page = await browser.newPage()

  const outDir = path.join(__dirname, "../public/screenshots/responsive")
  await fs.mkdir(outDir, { recursive: true })

  const uploads = []

  for (const route of ROUTES) {
    for (const w of WIDTHS) {
      const buf = await capture(page, w, route.path)
      const filename = `${route.slug}-${w}.png`
      const local = path.join(outDir, filename)
      await fs.writeFile(local, buf)
      console.log("Saved", local)
      const op = objectPath(route.slug, w)
      uploads.push({ op, buf })
    }
  }

  await browser.close()

  if (!upload) return

  const sb = createClient(SUPABASE_URL, serviceKey, { auth: { persistSession: false } })
  const opts = { contentType: "image/png", upsert: true }
  for (const { op, buf } of uploads) {
    const { error } = await sb.storage.from(BUCKET).upload(op, buf, opts)
    if (error) throw error
  }

  console.log("\nPublic URLs:")
  for (const { op } of uploads) {
    console.log(publicUrl(op))
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
