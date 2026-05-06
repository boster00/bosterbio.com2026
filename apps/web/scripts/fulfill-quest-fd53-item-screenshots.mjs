/**
 * Quest fd53ffa5-a1f7-4186-bfc0-b072be64e204: full-page Playwright screenshots →
 * Guild OS public storage upload → items.url + items.caption, then quest_comments submit.
 *
 * Prerequisites: dev server reachable at BASE_URL, Playwright chromium installed.
 * GuildOS: NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY in env.
 * Optional: GUILDOS_SUPABASE_BUCKET (defaults to the standard quest screenshot bucket).
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

/** PDP sample SKUs (templates with catalog data). */
const PDP_PATH_BY_KEY = {
  pdp_antibodies: "/products/AZQ7ZV49",
  pdp_cell_based_elisa: "/products/EKC1468",
  pdp_cell_based_phospho_elisa: "/products/EKC2079",
  pdp_custom_description: "/products/BO312055003",
  pdp_elisa_kits: "/products/HSEK0375",
  pdp_elisa_kits_custom_components: "/products/DY3174",
  pdp_ez_set: "/products/EZ0726",
  pdp_over_expression_lysates: "/products/LS008743",
  pdp_proteins: "/products/PROTQ92915",
  pdp_veterinary_diagnostic: "/products/VD1226-2",
}

/** Templates with no migrated products yet — capture PLP. */
const PLP_FALLBACK_KEYS = new Set([
  "pdp_antibody_quick_elisa",
  "pdp_beads",
  "pdp_consumables",
  "pdp_detection_kits",
  "pdp_hs_elisa",
  "pdp_instruments",
  "pdp_isotype_control",
  "pdp_multiplex_elisa",
  "pdp_quick_elisa",
  "pdp_reporter_cell_lines",
  "pdp_secondary_antibodies",
  "pdp_tag_quick_elisa",
])

const CAPTION_BY_KEY = {
  pdp_antibodies: "PDP antibodies template (SKU AZQ7ZV49): hero, image, spec panel, publications.",
  pdp_antibody_quick_elisa:
    "PLP /products (no antibody-quick-elisa products): catalog grid and filters for placeholder item.",
  pdp_beads: "PLP /products (no beads-template products): full catalog listing with filters.",
  pdp_cell_based_elisa: "PDP cell-based ELISA kit (EKC1468): template specs and imagery.",
  pdp_cell_based_phospho_elisa: "PDP cell-based phospho ELISA (EKC2079): phospho kit PDP.",
  pdp_consumables: "PLP /products (no consumables-template products): catalog grid.",
  pdp_custom_description: "PDP custom-description product (BO312055003): rich description + specs.",
  pdp_detection_kits: "PLP /products (no detection-kits products): listing screenshot.",
  pdp_elisa_kits: "PDP ELISA kit (HSEK0375): kit hero, ELISA attributes, imagery.",
  pdp_elisa_kits_custom_components: "PDP ELISA custom components (DY3174): component PDP.",
  pdp_ez_set: "PDP EZ-set kit (EZ0726): EZ-set template layout and specs.",
  pdp_hs_elisa: "PLP /products (no hs-elisa-kits products): catalog listing.",
  pdp_instruments: "PLP /products (no instruments products): PLP for empty template class.",
  pdp_isotype_control: "PLP /products (no isotype-control products): listing view.",
  pdp_multiplex_elisa: "PLP /products (no multiplex-elisa products): PLP screenshot.",
  pdp_over_expression_lysates: "PDP over-expression lysate (LS008743): lysate specs and image.",
  pdp_proteins: "PDP recombinant protein (PROTQ92915): protein PDP with attributes.",
  pdp_quick_elisa: "PLP /products (no quick-elisa products): grid for missing template.",
  pdp_reporter_cell_lines: "PLP /products (no reporter-cell-lines products): PLP capture.",
  pdp_secondary_antibodies: "PLP /products (no secondary-antibody PDPs): full /products view.",
  pdp_tag_quick_elisa: "PLP /products (no tag-quick-elisa products): listing.",
  pdp_veterinary_diagnostic: "PDP veterinary diagnostic kit (VD1226-2): vet kit PDP.",
  plp_all_products: "PLP /products: full migrated catalog grid, count, and sidebar filters.",
}

function pathnameForItemKey(itemKey) {
  if (itemKey === "plp_all_products") return "/products"
  if (PLP_FALLBACK_KEYS.has(itemKey)) return "/products"
  const p = PDP_PATH_BY_KEY[itemKey]
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

  for (const row of items) {
    const itemKey = row.item_key
    const pathname = pathnameForItemKey(itemKey)
    const storagePath = `quest-items/${QUEST_ID}/${itemKey}.png`
    const caption = CAPTION_BY_KEY[itemKey] ?? `${itemKey}: ${pathname}`

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
      .update({ url, caption })
      .eq("quest_id", QUEST_ID)
      .eq("item_key", itemKey)

    if (updErr) throw updErr

    const { data: verify, error: vErr } = await guildos
      .from("items")
      .select("item_key, url, caption")
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

  const { error: cErr } = await guildos.from("quest_comments").insert({
    quest_id: QUEST_ID,
    source: "questExecution",
    action: "submit_for_purrview",
    actor_name: "BosterBio Website Dev",
    summary: "All 23 items screenshotted and url filled. Submitting for purrview.",
    detail: { items_complete: 23 },
  })
  if (cErr) throw cErr

  console.log("Done: uploaded, updated items, submitted quest_comments.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
