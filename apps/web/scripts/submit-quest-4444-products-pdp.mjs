/**
 * Quest 4444: upload products_page.png + pdp_page.png → quest_inventory (2 rows) →
 * mirror quests.inventory → stage purrview.
 *
 * Env ONLY from ~/guildos/.env.local (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRETE_KEY).
 *
 *   cd apps/web && node scripts/submit-quest-4444-products-pdp.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createClient } from "@supabase/supabase-js"
import { loadGuildosEnv } from "./load-guildos-env.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const QUEST_ID = "4444cc08-3ff9-4c27-88ea-5e7cbeb56b64"
const BUCKET = "GuildOS_Bucket"
const PREFIX = `cursor_cloud/${QUEST_ID}`

const PNG_DIR = path.join(__dirname, "../public/screenshots/quest-4444-products-pdp")

const SHOTS = [
  {
    file: "products_page.png",
    item_key: "products_page",
    description: "Product listing /products at 1440px",
    figma_score: 9,
  },
  {
    file: "pdp_page.png",
    item_key: "pdp_page",
    description: "Product detail /products/M02830 at 1440px",
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
  const sb = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })

  const rowsForTable = []
  const mirrorForQuests = []

  for (const s of SHOTS) {
    const fp = path.join(PNG_DIR, s.file)
    if (!fs.existsSync(fp)) {
      console.error("Missing screenshot:", fp)
      process.exit(1)
    }
    const buf = fs.readFileSync(fp)
    const objectPath = `${PREFIX}/${s.file}`
    const { error: upErr } = await sb.storage.from(BUCKET).upload(objectPath, buf, {
      contentType: "image/png",
      upsert: true,
    })
    if (upErr) throw upErr

    const url = publicUrl(supabaseUrl, objectPath)
    const payload = { url, figma_score: s.figma_score, description: s.description }
    rowsForTable.push({ quest_id: QUEST_ID, item_key: s.item_key, payload })
    mirrorForQuests.push({
      item_key: s.item_key,
      created_at: new Date().toISOString(),
      payload,
    })
    console.log("Uploaded", objectPath)
  }

  console.log("quest_inventory: delete + insert (2 rows)")
  const { error: delErr } = await sb.from("quest_inventory").delete().eq("quest_id", QUEST_ID)
  if (delErr) {
    console.error("BLOCKED — quest_inventory:", delErr.message)
    console.error("Apply DDL: apps/docs/guildos/quest_inventory.ddl.sql in Supabase SQL editor, then re-run.")
    process.exit(1)
  }

  const { error: insErr } = await sb.from("quest_inventory").insert(rowsForTable)
  if (insErr) {
    console.error("BLOCKED — quest_inventory insert:", insErr.message)
    process.exit(1)
  }

  const { data: invRows, error: selErr } = await sb
    .from("quest_inventory")
    .select("item_key, payload")
    .eq("quest_id", QUEST_ID)
    .order("item_key", { ascending: true })
  if (selErr) throw selErr
  if (!Array.isArray(invRows) || invRows.length !== 2) {
    console.error("VERIFY FAILED: expected 2 quest_inventory rows, got", invRows?.length)
    process.exit(1)
  }
  console.log("--- SELECT item_key, payload (quest_inventory) ---")
  console.log(JSON.stringify(invRows, null, 2))

  const { error: qErr } = await sb
    .from("quests")
    .update({ stage: "purrview", inventory: mirrorForQuests })
    .eq("id", QUEST_ID)
  if (qErr) throw qErr

  const { data: qAfter, error: qRead } = await sb.from("quests").select("id, stage, inventory").eq("id", QUEST_ID).single()
  if (qRead) throw qRead
  console.log("quests:", JSON.stringify({ stage: qAfter.stage, inventory_len: qAfter.inventory?.length }, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
