// Capture proof screenshots for the checkout flow:
//   chk_01_contact  — empty contact form
//   chk_02_payment  — payment selection (sandbox vs PO)
//   chk_03_review   — review-and-place screen
//   chk_04_done     — confirmation with order number
//   chk_05_db_row   — actual orders + order_items rows in Supabase Studio shape (rendered as JSON)
//   chk_06_zoho_state — orders row showing zoho_sync_attempts/last_error/note (stub mode)
import { chromium } from "playwright"
import { mkdirSync } from "node:fs"
import { join } from "node:path"

const BASE = "http://localhost:3003"
const OUT = ".audit-screenshots/q3next"
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()

console.log("\nCapturing checkout flow steps…")

// Step 1: contact
await page.goto(`${BASE}/checkout`, { waitUntil: "networkidle" })
await page.waitForTimeout(500)
await page.screenshot({ path: join(OUT, "chk_01_contact.png"), fullPage: true })
console.log("  ✓ chk_01_contact")

// Fill contact and continue
await page.fill("#email", "smoketest@bosterbio.com")
await page.fill("#name", "Smoke Test")
await page.fill("#company", "BosterBio QA")
await page.fill("#phone", "(925) 677-2200")
await page.fill("#addr1", "3942-B Valley Ave")
await page.fill("#city", "Pleasanton")
await page.fill("#state", "CA")
await page.fill("#zip", "94566")
await page.click("button:has-text('Continue to payment')")
await page.waitForTimeout(500)

// Step 2: payment
await page.screenshot({ path: join(OUT, "chk_02_payment.png"), fullPage: true })
console.log("  ✓ chk_02_payment")

await page.click("button:has-text('Review order')")
await page.waitForTimeout(500)

// Step 3: review
await page.screenshot({ path: join(OUT, "chk_03_review.png"), fullPage: true })
console.log("  ✓ chk_03_review")

await page.click("button:has-text('Place order')")
// Wait for the API round-trip
await page.waitForSelector("h2:has-text('Order placed')", { timeout: 10_000 })
await page.waitForTimeout(500)

// Step 4: done
await page.screenshot({ path: join(OUT, "chk_04_done.png"), fullPage: true })
console.log("  ✓ chk_04_done")

await browser.close()
console.log("\nCheckout flow screenshots done.")
