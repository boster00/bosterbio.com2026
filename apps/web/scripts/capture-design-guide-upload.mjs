/**
 * Full-page screenshots of /design-guide + optional Supabase Storage upload.
 *
 * Capture only:
 *   BASE_URL=http://localhost:3000 node scripts/capture-design-guide-upload.mjs
 *
 * Capture + upload (do not commit secrets — pass key via env):
 *   SUPABASE_SERVICE_ROLE_KEY=... BASE_URL=http://localhost:3000 node scripts/capture-design-guide-upload.mjs upload
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
const PATH_1280 = "cursor_cloud/bosterbio-website/design-guide-1280.png"
const PATH_375 = "cursor_cloud/bosterbio-website/design-guide-375.png"
const SETTLE_MS = Number(process.env.PUPPETEER_POST_LOAD_MS ?? 2500)

async function capture(page, width) {
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 })
  await page.goto(`${BASE}/design-guide`, { waitUntil: "load", timeout: 120000 })
  await page.waitForSelector("#main-content", { timeout: 30000 })
  await new Promise((r) => setTimeout(r, SETTLE_MS))
  return page.screenshot({ fullPage: true, type: "png" })
}

function publicUrl(objectPath) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${objectPath}`
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

  const buf1280 = await capture(page, 1280)
  const buf375 = await capture(page, 375)
  await browser.close()

  const outDir = path.join(__dirname, "../public/screenshots/design-guide")
  await fs.mkdir(outDir, { recursive: true })
  const local1280 = path.join(outDir, "design-guide-1280.png")
  const local375 = path.join(outDir, "design-guide-375.png")
  await fs.writeFile(local1280, buf1280)
  await fs.writeFile(local375, buf375)
  console.log("Saved local:", local1280, local375)

  if (!upload) return

  const sb = createClient(SUPABASE_URL, serviceKey, { auth: { persistSession: false } })
  const opts = { contentType: "image/png", upsert: true }

  const { error: e1 } = await sb.storage.from(BUCKET).upload(PATH_1280, buf1280, opts)
  if (e1) throw e1
  const { error: e2 } = await sb.storage.from(BUCKET).upload(PATH_375, buf375, opts)
  if (e2) throw e2

  console.log("\nPublic URLs:")
  console.log(publicUrl(PATH_1280))
  console.log(publicUrl(PATH_375))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
