/**
 * Replace quest 4444 inventory with exactly 2 entries (PLP + PDP), upload PNGs, verify, purrview.
 *
 *   set -a && . ~/guildos/.env.local && set +a
 *   node scripts/submit-quest-4444-products-pdp.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createClient } from "@supabase/supabase-js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const QUEST_ID = "4444cc08-3ff9-4c27-88ea-5e7cbeb56b64"
const BUCKET = "GuildOS_Bucket"
const PREFIX = `cursor_cloud/${QUEST_ID}`

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://sdrqhejvvmbolqzfujej.supabase.co"
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRETE_KEY ?? process.env.SUPABASE_SECRET_KEY

const PNG_DIR = path.join(__dirname, "../public/screenshots/quest-4444-products-pdp")

const SHOTS = [
  {
    file: "playwright-1440-products.png",
    item_key: "smoke_products",
    description: "Product listing /products — 1440px full page (Playwright)",
    figma_score: 9,
  },
  {
    file: "playwright-1440-pdp-M02830.png",
    item_key: "smoke_pdp",
    description: "Product detail /products/M02830 — 1440px full page (Playwright)",
    figma_score: 9,
  },
]

function publicUrl(objectPath) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${objectPath}`
}

async function main() {
  if (!SERVICE_KEY) {
    console.error("Missing SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRETE_KEY).")
    process.exit(1)
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })

  const inventory = []
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
    inventory.push({
      item_key: s.item_key,
      created_at: new Date().toISOString(),
      payload: {
        url: publicUrl(objectPath),
        description: s.description,
        figma_score: s.figma_score,
        storage_path: objectPath,
      },
    })
    console.log("Uploaded", objectPath)
  }

  const { data: quest, error: qErr } = await sb.from("quests").select("id, stage, inventory").eq("id", QUEST_ID).maybeSingle()
  if (qErr) throw qErr
  if (!quest?.id) {
    console.error("Quest not found:", QUEST_ID)
    process.exit(1)
  }

  const { error: eUpd } = await sb.from("quests").update({ inventory, stage: "purrview" }).eq("id", QUEST_ID)
  if (eUpd) throw eUpd

  const { data: after, error: eSel } = await sb.from("quests").select("id, stage, inventory").eq("id", QUEST_ID).single()
  if (eSel) throw eSel

  console.log("\n--- SELECT read-back ---")
  console.log(JSON.stringify({ id: after.id, stage: after.stage, inventory_count: after.inventory?.length, inventory: after.inventory }, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
