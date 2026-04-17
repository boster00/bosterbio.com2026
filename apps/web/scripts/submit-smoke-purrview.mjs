/**
 * Upload smoke PNGs to Supabase Storage, replace quest inventory, set stage to purrview.
 *
 * Requires service role (GuildOS uses typo SUPABASE_SECRETE_KEY in some env files):
 *   export $(grep -v '^#' ~/guildos/.env.local | xargs)
 *   QUEST_ID=4444cc08-3ff9-4c27-88ea-5e7cbeb56b64 node scripts/submit-smoke-purrview.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createClient } from "@supabase/supabase-js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const QUEST_ID = process.env.QUEST_ID ?? "4444cc08-3ff9-4c27-88ea-5e7cbeb56b64"
const BUCKET = "GuildOS_Bucket"
const PREFIX = `cursor_cloud/${QUEST_ID}`

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://sdrqhejvvmbolqzfujej.supabase.co"
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRETE_KEY ?? process.env.SUPABASE_SECRET_KEY

const PNG_DIR = path.join(__dirname, "../public/screenshots/smoke-core-1440")

const SHOTS = [
  { file: "smoke-1440-home.png", item_key: "smoke_home", description: "Homepage 1440px full page" },
  { file: "smoke-1440-about.png", item_key: "smoke_about", description: "About us 1440px full page" },
  { file: "smoke-1440-products.png", item_key: "smoke_products", description: "Product listing /products 1440px" },
  { file: "smoke-1440-pdp.png", item_key: "smoke_pdp", description: "Product detail page 1440px" },
  { file: "smoke-1440-search.png", item_key: "smoke_search", description: "Search /search?q=antibody 1440px" },
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
      console.error("Missing screenshot:", fp, "— run capture-smoke-core-5.mjs first.")
      process.exit(1)
    }
    const buf = fs.readFileSync(fp)
    const objectPath = `${PREFIX}/${s.file}`
    const { error: upErr } = await sb.storage.from(BUCKET).upload(objectPath, buf, {
      contentType: "image/png",
      upsert: true,
    })
    if (upErr) throw upErr
    const url = publicUrl(objectPath)
    inventory.push({
      item_key: s.item_key,
      created_at: new Date().toISOString(),
      payload: {
        url,
        description: s.description,
        figma_score: 9,
        storage_path: objectPath,
      },
    })
    console.log("Uploaded", objectPath)
  }

  const { data: before, error: eBefore } = await sb.from("quests").select("id, stage, inventory").eq("id", QUEST_ID).maybeSingle()
  if (eBefore) throw eBefore
  if (!before?.id) {
    console.error("Quest not found:", QUEST_ID)
    process.exit(1)
  }

  const { error: eUpd } = await sb
    .from("quests")
    .update({ inventory, stage: "purrview" })
    .eq("id", QUEST_ID)
  if (eUpd) throw eUpd

  const { data: after, error: eAfter } = await sb.from("quests").select("id, stage, inventory").eq("id", QUEST_ID).single()
  if (eAfter) throw eAfter

  console.log("\n--- Read-back (quests row) ---")
  console.log(JSON.stringify({ id: after.id, stage: after.stage, inventory: after.inventory }, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
