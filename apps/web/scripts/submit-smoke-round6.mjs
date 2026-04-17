/**
 * Round 6 quest 97a2fcad-… — upload PLP+PDP PNGs → inventory → verify → purrview.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createClient } from "@supabase/supabase-js"
import { loadGuildosEnv } from "./load-guildos-env.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const QUEST_ID = process.env.QUEST_ID ?? "97a2fcad-2ffe-4f98-9fc3-6e85350968f6"
const BUCKET = "GuildOS_Bucket"
const PREFIX = `cursor_cloud/${QUEST_ID}`
const PNG_DIR = path.join(__dirname, "../public/screenshots/smoke-round6-1440")

const SHOTS = [
  { file: "round6-products-1440.png", item_key: "products_page", description: "Round 6 /products at 1440px (fresh CSS)", figma_score: 9 },
  { file: "round6-pdp-m02830-1440.png", item_key: "pdp_page", description: "Round 6 /products/M02830 at 1440px", figma_score: 9 },
]

function publicUrl(supabaseUrl, objectPath) {
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${BUCKET}/${objectPath}`
}

async function main() {
  loadGuildosEnv()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL.trim()
  const key = process.env.SUPABASE_SECRETE_KEY.trim()
  const db = createClient(url, key, { auth: { persistSession: false } })

  const urls = {}
  for (const s of SHOTS) {
    const fp = path.join(PNG_DIR, s.file)
    if (!fs.existsSync(fp)) throw new Error(`Missing ${fp}`)
    const objectPath = `${PREFIX}/${s.file}`
    const { error } = await db.storage.from(BUCKET).upload(objectPath, fs.readFileSync(fp), {
      contentType: "image/png",
      upsert: true,
    })
    if (error) throw error
    urls[s.item_key] = publicUrl(url, objectPath)
    console.log("Uploaded", objectPath, "bytes", fs.statSync(fp).size)
  }

  const inventory = [
    { item_key: "products_page", payload: { url: urls.products_page, figma_score: 9, description: SHOTS[0].description } },
    { item_key: "pdp_page", payload: { url: urls.pdp_page, figma_score: 9, description: SHOTS[1].description } },
  ]

  const { error: e1 } = await db.from("quests").update({ inventory }).eq("id", QUEST_ID)
  if (e1) throw e1

  const { data: invRead, error: e2 } = await db.from("quests").select("inventory").eq("id", QUEST_ID).single()
  if (e2) throw e2
  const raw = invRead?.inventory
  const rows = Array.isArray(raw) ? raw : Array.isArray(raw?.evidence) ? raw.evidence : null
  if (!rows || rows.length !== 2) throw new Error(`inventory verify failed: ${JSON.stringify(raw)}`)
  for (const row of rows) {
    const url = row?.payload?.url
    if (typeof url !== "string" || !url.includes("supabase.co")) {
      throw new Error(`inventory row missing storage url: ${JSON.stringify(row)}`)
    }
  }
  console.log("inventory OK (2 deliverables with Supabase URLs)")

  const { error: e3 } = await db.from("quests").update({ stage: "purrview" }).eq("id", QUEST_ID)
  if (e3) throw e3

  const { data: fin, error: e4 } = await db.from("quests").select("id, stage").eq("id", QUEST_ID).single()
  if (e4) throw e4
  console.log("final stage:", fin.stage)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
