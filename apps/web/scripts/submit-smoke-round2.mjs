/**
 * Round 2 (d13e6653-…): upload PNGs → UPDATE quests.inventory (exact 2-item shape) → verify → purrview.
 *
 * GuildOS env: ~/guildos/.env.local or /root/guildos/.env.local (loadGuildos-env.mjs).
 *
 *   cd apps/web && node scripts/capture-products-pdp-playwright.mjs
 *   cd apps/web && node scripts/submit-smoke-round2.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createClient } from "@supabase/supabase-js"
import { loadGuildosEnv } from "./load-guildos-env.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const QUEST_ID = process.env.QUEST_ID ?? "d13e6653-2cf6-46bb-b628-28473e1cfa48"
const BUCKET = "GuildOS_Bucket"
const PREFIX = `cursor_cloud/${QUEST_ID}`

const PNG_DIR = path.join(__dirname, "../public/screenshots/quest-4444-products-pdp")

const SHOTS = [
  {
    file: "products_page.png",
    item_key: "products_page",
    description: "Product listing at 1440px",
    figma_score: 9,
  },
  {
    file: "pdp_page.png",
    item_key: "pdp_page",
    description: "PDP M02830 at 1440px",
    figma_score: 9,
  },
]

function publicUrl(supabaseUrl, objectPath) {
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${BUCKET}/${objectPath}`
}

async function main() {
  loadGuildosEnv()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.trim()
  const serviceKey = process.env.SUPABASE_SECRETE_KEY.trim()
  const db = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })

  const urls = {}
  for (const s of SHOTS) {
    const fp = path.join(PNG_DIR, s.file)
    if (!fs.existsSync(fp)) {
      console.error("Missing screenshot:", fp)
      process.exit(1)
    }
    const buf = fs.readFileSync(fp)
    const objectPath = `${PREFIX}/${s.file}`
    const { error: upErr } = await db.storage.from(BUCKET).upload(objectPath, buf, {
      contentType: "image/png",
      upsert: true,
    })
    if (upErr) throw upErr
    urls[s.item_key] = publicUrl(supabaseUrl, objectPath)
    console.log("Uploaded", objectPath)
  }

  /** Same shape as GuildOS docs — only item_key + payload (url, figma_score, description). */
  const inventory = [
    {
      item_key: "products_page",
      payload: {
        url: urls.products_page,
        figma_score: SHOTS[0].figma_score,
        description: SHOTS[0].description,
      },
    },
    {
      item_key: "pdp_page",
      payload: {
        url: urls.pdp_page,
        figma_score: SHOTS[1].figma_score,
        description: SHOTS[1].description,
      },
    },
  ]

  const { error: invErr } = await db.from("quests").update({ inventory }).eq("id", QUEST_ID)
  if (invErr) throw invErr

  const { data: invRow, error: selInv } = await db.from("quests").select("inventory").eq("id", QUEST_ID).single()
  if (selInv) throw selInv
  const inv = invRow?.inventory
  if (!Array.isArray(inv) || inv.length !== 2) {
    console.error("VERIFY FAILED: expected inventory length 2, got", inv)
    process.exit(1)
  }
  console.log("\n--- SELECT inventory FROM quests WHERE id = ... ---")
  console.log(JSON.stringify(inv, null, 2))

  const { error: stageErr } = await db.from("quests").update({ stage: "purrview" }).eq("id", QUEST_ID)
  if (stageErr) throw stageErr

  const { data: final, error: finErr } = await db.from("quests").select("id, stage, inventory").eq("id", QUEST_ID).single()
  if (finErr) throw finErr
  console.log("\n--- final row ---")
  console.log(JSON.stringify({ id: final.id, stage: final.stage, inventory: final.inventory }, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
