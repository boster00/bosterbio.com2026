/**
 * Quest fd53ffa5-a1f7-4186-bfc0-b072be64e204: Playwright full-page PNGs at 1440px,
 * upload to GuildOS Storage, UPDATE items.url per item_key.
 *
 * Requires dev server (pnpm dev:3003), BOSTERBIO catalog env, GuildOS service role in ~/guildos/.env.local.
 *
 *   cd apps/web && pnpm exec playwright install chromium  # once
 *   BASE_URL=http://localhost:3003 node scripts/capture-and-upload-quest-fd53.mjs
 */
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createClient } from "@supabase/supabase-js"
import { chromium } from "playwright"
import { loadGuildosEnv } from "./load-guildos-env.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const QUEST_ID = "fd53ffa5-a1f7-4186-bfc0-b072be64e204"
const BASE = (process.env.BASE_URL ?? "http://localhost:3003").replace(/\/$/, "")
const VIEWPORT = { width: 1440, height: 900 }
const SETTLE_MS = Number(process.env.PLAYWRIGHT_POST_MS ?? 2500)
const CURL_TIMEOUT_MS = Number(process.env.CURL_WAIT_MS ?? 180000)
const POLL_MS = 500

/** PDP sample SKUs (BosterBio Supabase) or PLP ?template= for empty templates. */
const ITEM_ROUTES = [
  { item_key: "pdp_antibodies", pathname: "/products/AZQ7ZV49" },
  { item_key: "pdp_antibody_quick_elisa", pathname: "/products?template=antibody-quick-elisa-kits" },
  { item_key: "pdp_beads", pathname: "/products?template=beads" },
  { item_key: "pdp_cell_based_elisa", pathname: "/products/EKC1468" },
  { item_key: "pdp_cell_based_phospho_elisa", pathname: "/products/EKC2079" },
  { item_key: "pdp_consumables", pathname: "/products?template=consumables" },
  { item_key: "pdp_custom_description", pathname: "/products/BO312055003" },
  { item_key: "pdp_detection_kits", pathname: "/products?template=detection-kits" },
  { item_key: "pdp_elisa_kits", pathname: "/products/HSEK0375" },
  { item_key: "pdp_elisa_kits_custom_components", pathname: "/products/DY3174" },
  { item_key: "pdp_ez_set", pathname: "/products/EZ0726" },
  { item_key: "pdp_hs_elisa", pathname: "/products?template=hs-elisa-kits" },
  { item_key: "pdp_instruments", pathname: "/products?template=instruments" },
  { item_key: "pdp_isotype_control", pathname: "/products?template=isotype-controls" },
  { item_key: "pdp_multiplex_elisa", pathname: "/products?template=multiplex-elisa-kits" },
  { item_key: "pdp_over_expression_lysates", pathname: "/products/LS008743" },
  { item_key: "pdp_proteins", pathname: "/products/PROTQ92915" },
  { item_key: "pdp_quick_elisa", pathname: "/products?template=quick-elisa-kits" },
  { item_key: "pdp_reporter_cell_lines", pathname: "/products?template=reporter-cell-lines" },
  { item_key: "pdp_secondary_antibodies", pathname: "/products?template=secondary-antibodies" },
  { item_key: "pdp_tag_quick_elisa", pathname: "/products?template=tag-quick-elisa-kits" },
  { item_key: "pdp_veterinary_diagnostic", pathname: "/products/VD1226-2" },
  { item_key: "plp_all_products", pathname: "/products" },
]

function storagePublicUrl(supabaseUrl, bucket, objectPath) {
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${bucket}/${objectPath}`
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
  throw new Error(`Timed out waiting for ${BASE}/`)
}

async function capture(page, pathname) {
  const url = pathname.startsWith("http") ? pathname : `${BASE}${pathname}`
  await page.setViewportSize(VIEWPORT)
  await page.goto(url, { waitUntil: "load", timeout: 120000 })
  await page.waitForSelector("#main-content", { timeout: 60000 })
  await new Promise((r) => setTimeout(r, SETTLE_MS))
  return page.screenshot({ fullPage: true, type: "png" })
}

async function main() {
  loadGuildosEnv()
  const guildosUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.trim()
  const guildosKey = process.env.SUPABASE_SECRETE_KEY.trim()
  const bucket = process.env.GUILDOS_SUPABASE_BUCKET?.trim() || process.env.GUILDOS_STORAGE_BUCKET?.trim()
  if (!bucket) {
    throw new Error("Set GUILDOS_SUPABASE_BUCKET (GuildOS Storage bucket name for uploads).")
  }

  if (ITEM_ROUTES.length !== 23) {
    throw new Error(`Route table must have 23 rows, got ${ITEM_ROUTES.length}`)
  }

  const sb = createClient(guildosUrl, guildosKey, { auth: { persistSession: false } })

  await waitForHttp200()
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "quest-fd53-"))
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  try {
    for (const row of ITEM_ROUTES) {
      const buf = await capture(page, row.pathname)
      const fp = path.join(tmpDir, `${row.item_key}.png`)
      await fs.writeFile(fp, buf)
      console.log("captured", row.item_key, row.pathname)
    }
  } finally {
    await browser.close()
  }

  const prefix = `quest-items/${QUEST_ID}`
  for (const row of ITEM_ROUTES) {
    const objectPath = `${prefix}/${row.item_key}.png`
    const buf = await fs.readFile(path.join(tmpDir, `${row.item_key}.png`))
    const { error: upErr } = await sb.storage.from(bucket).upload(objectPath, buf, {
      contentType: "image/png",
      upsert: true,
    })
    if (upErr) throw upErr

    const url = storagePublicUrl(guildosUrl, bucket, objectPath)
    const { error: upRow } = await sb.from("items").update({ url }).eq("quest_id", QUEST_ID).eq("item_key", row.item_key)
    if (upRow) throw upRow
    console.log("uploaded + items.url", row.item_key)

    const { data: readBack, error: rbErr } = await sb
      .from("items")
      .select("item_key, url")
      .eq("quest_id", QUEST_ID)
      .eq("item_key", row.item_key)
      .maybeSingle()
    if (rbErr) throw rbErr
    if (readBack?.url !== url) {
      throw new Error(`Verify failed for ${row.item_key}: expected url set`)
    }
  }

  const { data: allUrls, error: allErr } = await sb.from("items").select("item_key, url").eq("quest_id", QUEST_ID)
  if (allErr) throw allErr
  const missing = (allUrls ?? []).filter((r) => !r.url?.trim())
  if (missing.length) {
    throw new Error(`Still missing url: ${missing.map((m) => m.item_key).join(", ")}`)
  }
  console.log("--- All 23 items have url ---")

  const { error: cErr } = await sb.from("quest_comments").insert({
    quest_id: QUEST_ID,
    source: "adventurer",
    action: "submit",
    summary:
      "BosterBio storefront: uploaded 23 full-page screenshots (PLP / PDP / template-filter PLP) to GuildOS Storage; items.url populated for quest fd53.",
    detail: {
      lockphrase: "this quest now meets the criteria for purrview",
      items_count: 23,
      base_url: BASE,
    },
    actor_name: "BosterBio Website Dev",
  })
  if (cErr) throw cErr
  console.log("Inserted quest_comments submit row with lockphrase.")

  const { data: qAfter } = await sb.from("quests").select("id, stage").eq("id", QUEST_ID).maybeSingle()
  console.log("Quest stage after submit comment:", qAfter?.stage)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
