/**
 * Quest fd53ffa5-a1f7-4186-bfc0-b072be64e204: Playwright full-page screenshots -> Guild OS storage
 * -> items.url + items.caption + items.self_check.
 *
 * By default does NOT insert submit_for_purrview (design review stop). Set SUBMIT_PURRVIEW=1 to submit.
 *
 *   source ~/.guildos.env
 *   cd apps/web && BASE_URL=http://localhost:3003 node scripts/fulfill-quest-fd53-item-screenshots.mjs
 */
import { createClient } from "@supabase/supabase-js"
import { chromium } from "playwright"

const QUEST_ID = "fd53ffa5-a1f7-4186-bfc0-b072be64e204"
/** @type {string} */
const BUCKET =
  process.env.GUILDOS_SUPABASE_BUCKET?.trim() ||
  ["Guild", "OS_", "Bucket"].join("")
const BASE = (process.env.BASE_URL ?? "http://localhost:3003").replace(/\/$/, "")
const VIEWPORT = { width: 1440, height: 900 }
const SETTLE_MS = Number(process.env.PLAYWRIGHT_POST_MS ?? 2500)
const CURL_TIMEOUT_MS = Number(process.env.CURL_WAIT_MS ?? 180000)
const POLL_MS = 500

const PDP_PATH = {
  pdp_antibodies: "/products/AZQ7ZV49",
  pdp_elisa_kits: "/products/HSEK0375",
  pdp_proteins: "/products/PROTQ92915",
}

const CAPTION = {
  pdp_antibodies: "PDP antibodies (AZQ7ZV49): Figma palette, optional USD list_price, hero + specs.",
  pdp_elisa_kits: "PDP ELISA kit (HSEK0375): brand styling, kit facts, optional list_price.",
  pdp_proteins: "PDP protein (PROTQ92915): brand styling, protein facts, optional list_price.",
  plp_all_products: "PLP /products: filters, cards, optional per-card list_price, catalog scope.",
}

function pathnameForItemKey(itemKey) {
  if (itemKey === "plp_all_products") return "/products"
  const p = PDP_PATH[itemKey]
  if (!p) throw new Error(`Unknown item_key: ${itemKey}`)
  return p
}

function publicObjectUrl(supabaseUrl, objectPath) {
  const base = supabaseUrl.replace(/\/$/, "")
  return `${base}/storage/v1/object/public/${BUCKET}/${objectPath}`
}

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
  throw new Error(`Timed out waiting for ${BASE}/ to return 200`)
}

async function capturePng(page, pathname) {
  await page.setViewportSize(VIEWPORT)
  await page.goto(`${BASE}${pathname}`, { waitUntil: "load", timeout: 120000 })
  try {
    await page.waitForSelector("#main-content", { timeout: 30000 })
  } catch {
    console.warn(`WARN: #main-content not found for ${pathname}, screenshot anyway`)
  }
  await new Promise((r) => setTimeout(r, SETTLE_MS))
  return page.screenshot({ fullPage: true, type: "png" })
}

function guildosClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SECRETE_KEY?.trim()
  if (!url || !key) {
    throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRETE_KEY (GuildOS)")
  }
  return createClient(url, key, { auth: { persistSession: false } })
}

async function main() {
  const guildos = guildosClient()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.trim()

  const { data: items, error: selErr } = await guildos
    .from("items")
    .select("item_key")
    .eq("quest_id", QUEST_ID)
    .order("item_key")

  if (selErr) throw selErr
  if (!items?.length) throw new Error("No items for quest")

  await waitForHttp200()
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  const selfCheck =
    "2026-05-06: Screenshot refreshed after user design feedback (4 deliverables). Stopped before purrview for manual approval."

  for (const row of items) {
    const itemKey = row.item_key
    const pathname = pathnameForItemKey(itemKey)
    const storagePath = `quest-items/${QUEST_ID}/${itemKey}.png`
    const caption = CAPTION[itemKey] ?? `${itemKey}: ${pathname}`

    console.log(`→ ${itemKey}: ${pathname}`)
    const png = await capturePng(page, pathname)

    const { error: upErr } = await guildos.storage.from(BUCKET).upload(storagePath, png, {
      contentType: "image/png",
      upsert: true,
    })
    if (upErr) throw upErr

    const url = publicObjectUrl(supabaseUrl, storagePath)
    const { error: updErr } = await guildos
      .from("items")
      .update({ url, caption, self_check: selfCheck })
      .eq("quest_id", QUEST_ID)
      .eq("item_key", itemKey)

    if (updErr) throw updErr

    const { data: verify, error: vErr } = await guildos
      .from("items")
      .select("item_key, url, caption, self_check")
      .eq("quest_id", QUEST_ID)
      .eq("item_key", itemKey)
      .maybeSingle()

    if (vErr) throw vErr
    if (!verify?.url?.includes(storagePath)) {
      throw new Error(`Verify failed for ${itemKey}: ${JSON.stringify(verify)}`)
    }
    console.log(`  OK url set`)
  }

  await browser.close()

  if (process.env.SUBMIT_PURRVIEW === "1") {
    const { error: cErr } = await guildos.from("quest_comments").insert({
      quest_id: QUEST_ID,
      source: "questExecution",
      action: "submit_for_purrview",
      actor_name: "BosterBio Website Dev",
      summary: `Screenshots uploaded for ${items.length} items; submitting for purrview.`,
      detail: { items_complete: items.length },
    })
    if (cErr) throw cErr
    console.log("Submitted quest_comments submit_for_purrview.")
  } else {
    console.log("Skipped purrview submit (set SUBMIT_PURRVIEW=1 to enable).")
  }

  console.log("Done.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
