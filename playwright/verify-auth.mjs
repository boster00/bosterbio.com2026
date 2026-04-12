/**
 * One-off check: load storage state and open Gmail.
 * Run from repo root: node playwright/verify-auth.mjs
 * Requires: pnpm add -D playwright -w && npx playwright install chromium
 */
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const storageState = path.join(__dirname, ".auth", "user.json")

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ storageState })
const page = await context.newPage()

await page.goto("https://mail.google.com", { waitUntil: "domcontentloaded", timeout: 60000 })
const title = await page.title()
const url = page.url()

console.log("Title:", title)
console.log("URL:", url)

const body = await page.locator("body").innerText({ timeout: 5000 }).catch(() => "")
const looksLikeLogin =
  /sign in|email or phone|forgot email/i.test(body) && /next|sign in/i.test(body)

if (looksLikeLogin && !/inbox|mail\.google\.com\/mail/i.test(url)) {
  console.error("VERIFY_FAIL: Appears to be login flow (session may be expired or invalid).")
  process.exitCode = 1
} else {
  console.log("VERIFY_OK: Loaded mail.google.com with storage state (not obviously on bare login page).")
}

await browser.close()
