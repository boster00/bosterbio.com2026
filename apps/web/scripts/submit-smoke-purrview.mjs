/**
 * submitForPurrview (housekeeping): upload 5 smoke PNGs, REPLACE quests.inventory array,
 * SELECT verify, UPDATE stage purrview, SELECT verify.
 *
 *   QUEST_ID=0b6a2263-a298-488c-9a0e-946d45dcbb4e node scripts/submit-smoke-purrview.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createClient } from "@supabase/supabase-js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const QUEST_ID = process.env.QUEST_ID || "0b6a2263-a298-488c-9a0e-946d45dcbb4e"
const BUCKET = "GuildOS_Bucket"
const PREFIX = `cursor_cloud/${QUEST_ID}/smoke-1440`
const PNG_DIR = path.join(__dirname, "../public/screenshots/smoke-core-1440")

const SHOTS = [
  { item_key: "smoke_screenshot:home", file: "smoke-1440-home.png", description: "Homepage / at 1440px" },
  { item_key: "smoke_screenshot:about-us", file: "smoke-1440-about-us.png", description: "About us at 1440px" },
  { item_key: "smoke_screenshot:product-listing", file: "smoke-1440-product-listing.png", description: "Product listing /products at 1440px" },
  { item_key: "smoke_screenshot:product-detail", file: "smoke-1440-product-detail.png", description: "PDP /products/M02830 at 1440px" },
  { item_key: "smoke_screenshot:search", file: "smoke-1440-search.png", description: "Search /search?q=antibody at 1440px" },
]

function loadGuildosEnv() {
  const p = path.join(process.env.HOME || "", "guildos/.env.local")
  const raw = fs.readFileSync(p, "utf8")
  const env = {}
  for (const line of raw.split("\n")) {
    const t = line.trim()
    if (!t || t.startsWith("#")) continue
    const i = t.indexOf("=")
    if (i === -1) continue
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim()
  }
  return env
}

function publicUrl(supabaseUrl, objectPath) {
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${BUCKET}/${objectPath}`
}

async function main() {
  const env = loadGuildosEnv()
  const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SECRETE_KEY, { auth: { persistSession: false } })
  const storage = db.storage.from(BUCKET)

  const inventory = []
  for (const s of SHOTS) {
    const localPath = path.join(PNG_DIR, s.file)
    const buf = fs.readFileSync(localPath)
    const objectPath = `${PREFIX}/${s.file}`
    const { error: upErr } = await storage.upload(objectPath, buf, { contentType: "image/png", upsert: true })
    if (upErr) throw upErr
    const url = publicUrl(env.NEXT_PUBLIC_SUPABASE_URL, objectPath)
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
  }

  const { error: invErr } = await db
    .from("quests")
    .update({ inventory, updated_at: new Date().toISOString() })
    .eq("id", QUEST_ID)
  if (invErr) throw invErr

  const { data: invRead, error: r1 } = await db.from("quests").select("id, inventory, stage").eq("id", QUEST_ID).single()
  if (r1) throw r1
  if (!Array.isArray(invRead.inventory) || invRead.inventory.length !== 5) {
    throw new Error(`inventory verify failed: ${JSON.stringify(invRead.inventory)}`)
  }

  const { error: stErr } = await db
    .from("quests")
    .update({ stage: "purrview", updated_at: new Date().toISOString() })
    .eq("id", QUEST_ID)
  if (stErr) throw stErr

  const { data: fin, error: r2 } = await db.from("quests").select("id, stage, inventory").eq("id", QUEST_ID).single()
  if (r2) throw r2
  if (fin.stage !== "purrview") throw new Error(`stage not purrview: ${fin.stage}`)

  console.log(
    JSON.stringify(
      {
        questId: QUEST_ID,
        stage: fin.stage,
        inventoryLength: fin.inventory.length,
        firstUrl: fin.inventory[0]?.payload?.url,
      },
      null,
      2,
    ),
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
