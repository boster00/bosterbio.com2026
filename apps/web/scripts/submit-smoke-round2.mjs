/**
 * BosterBio Smoke Test Round 2 — upload PLP/PDP PNGs, set quests.inventory JSONB, purrview.
 *
 * Env from ~/guildos/.env.local only (loadGuildos-env.mjs).
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
    const url = publicUrl(supabaseUrl, objectPath)
    inventory.push({
      item_key: s.item_key,
      created_at: new Date().toISOString(),
      payload: {
        url,
        figma_score: s.figma_score,
        description: s.description,
        storage_path: objectPath,
      },
    })
    console.log("Uploaded", objectPath)
  }

  const { error: upQuest } = await sb.from("quests").update({ inventory, stage: "purrview" }).eq("id", QUEST_ID)
  if (upQuest) throw upQuest

  const { data: row, error: selErr } = await sb.from("quests").select("id, stage, inventory").eq("id", QUEST_ID).single()
  if (selErr) throw selErr

  console.log("\n--- quests.inventory verify ---")
  console.log(JSON.stringify({ id: row.id, stage: row.stage, inventory: row.inventory }, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
