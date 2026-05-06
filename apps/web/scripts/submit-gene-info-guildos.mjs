/**
 * Upload gene-info card screenshots to GuildOS Supabase storage and attach URLs to quest items.
 *
 * Requires ~/.guildos.env with NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRETE_KEY, GUILDOS_SUPABASE_BUCKET.
 *
 *   node scripts/submit-gene-info-guildos.mjs
 */
import fs from "node:fs"
import path from "node:path"
import os from "node:os"
import { fileURLToPath } from "node:url"
import { createClient } from "@supabase/supabase-js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const QUEST_ID = "70c56437-c6a6-4d02-97e7-6d712b947a4e"
const PNG_DIR = path.join(__dirname, "../public/screenshots/gene-info-cards-1440")

const GENE_TO_ITEM = [
  ["VEGFA", "gene_card_vegfa"],
  ["IL6", "gene_card_il6"],
  ["TNF", "gene_card_tnf"],
  ["GAPDH", "gene_card_gapdh"],
  ["TP53", "gene_card_tp53"],
  ["HIF1A", "gene_card_hif1a"],
  ["AKT1", "gene_card_akt1"],
  ["EGFR", "gene_card_egfr"],
  ["MKI67", "gene_card_mki67"],
  ["CD44", "gene_card_cd44"],
]

function loadGuildosEnv() {
  const p = path.join(os.homedir(), ".guildos.env")
  if (!fs.existsSync(p)) throw new Error(`Missing ${p}`)
  const raw = fs.readFileSync(p, "utf8")
  for (const line of raw.split("\n")) {
    const t = line.trim()
    if (!t || t.startsWith("#")) continue
    const eq = t.indexOf("=")
    if (eq === -1) continue
    const k = t.slice(0, eq).trim()
    let v = t.slice(eq + 1).trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1)
    }
    if (!process.env[k]) process.env[k] = v
  }
}

function publicUrl(supabaseUrl, bucket, objectPath) {
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${bucket}/${objectPath}`
}

async function main() {
  loadGuildosEnv()
  const url = process.env.GUILDOS_NEXT_PUBLIC_SUPABASE_URL?.trim() || process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key =
    process.env.GUILDOS_SUPABASE_SECRETE_KEY?.trim() || process.env.SUPABASE_SECRETE_KEY?.trim()
  const bucket = process.env.GUILDOS_SUPABASE_BUCKET?.trim()
  if (!url || !key) throw new Error("Missing Supabase URL or service key (GuildOS env)")
  if (!bucket) throw new Error("Missing GUILDOS_SUPABASE_BUCKET")

  const db = createClient(url, key, { auth: { persistSession: false } })
  const PREFIX = `cursor_cloud/gene_info_${QUEST_ID.slice(0, 8)}`

  for (const [gene, itemKey] of GENE_TO_ITEM) {
    const fname = `gene-info-${gene}-1440.png`
    const fp = path.join(PNG_DIR, fname)
    if (!fs.existsSync(fp)) throw new Error(`Missing screenshot ${fp}`)
    const objectPath = `${PREFIX}/${fname}`
    const body = fs.readFileSync(fp)
    const { error: upErr } = await db.storage.from(bucket).upload(objectPath, body, {
      contentType: "image/png",
      upsert: true,
    })
    if (upErr) throw upErr

    const shotUrl = publicUrl(url, bucket, objectPath)
    const caption = `Gene info card page /gene-info/${gene} at 1440px width (bosterbio.com2026).`

    const { error: patchErr } = await db
      .from("items")
      .update({
        url: shotUrl,
        caption,
        source: "cursor_cloud_agent",
        updated_at: new Date().toISOString(),
      })
      .eq("quest_id", QUEST_ID)
      .eq("item_key", itemKey)

    if (patchErr) throw patchErr
    console.log("updated item", itemKey, shotUrl)
  }

  const { data: rows, error: qErr } = await db
    .from("items")
    .select("item_key,url,caption")
    .eq("quest_id", QUEST_ID)
    .order("item_key")
  if (qErr) throw qErr
  const missing = (rows ?? []).filter((r) => !r.url)
  if (missing.length) throw new Error(`Some items still missing url: ${missing.map((m) => m.item_key).join(", ")}`)
  console.log("All 10 items have URLs. Done.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
