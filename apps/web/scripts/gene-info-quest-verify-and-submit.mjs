/**
 * GuildOS quest gate for gene-info biomarker cards (quest 70c56437-c6a6-4d02-97e7-6d712b947a4e).
 *
 * 1) housekeeping.verifyDeliverable equivalent:
 *    - Exactly 10 items with expected item_key values
 *    - Each has a non-empty https `url`
 *    - Optional: HEAD each URL (must return success)
 *
 * 2) housekeeping.submitForPurrview equivalent (same pattern as submit-smoke-purrview.mjs):
 *    - After verification passes, set quests.stage = 'purrview' for this quest id.
 *
 * Env: load ~/.guildos.env (GUILDOS_* or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY).
 *
 *   node scripts/gene-info-quest-verify-and-submit.mjs
 */
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createClient } from "@supabase/supabase-js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const QUEST_ID = "70c56437-c6a6-4d02-97e7-6d712b947a4e"

const EXPECTED_ITEM_KEYS = [
  "gene_card_vegfa",
  "gene_card_il6",
  "gene_card_tnf",
  "gene_card_gapdh",
  "gene_card_tp53",
  "gene_card_hif1a",
  "gene_card_akt1",
  "gene_card_egfr",
  "gene_card_mki67",
  "gene_card_cd44",
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

async function verifyDeliverable(sb) {
  const { data: rows, error } = await sb
    .from("items")
    .select("item_key, url")
    .eq("quest_id", QUEST_ID)

  if (error) throw error
  const byKey = new Map((rows ?? []).map((r) => [r.item_key, r]))

  const missingKeys = EXPECTED_ITEM_KEYS.filter((k) => !byKey.has(k))
  if (missingKeys.length) {
    throw new Error(`verifyDeliverable: missing item rows: ${missingKeys.join(", ")}`)
  }

  for (const key of EXPECTED_ITEM_KEYS) {
    const row = byKey.get(key)
    const url = row?.url?.trim()
    if (!url || !/^https:\/\//i.test(url)) {
      throw new Error(`verifyDeliverable: item ${key} missing https url`)
    }
    const res = await fetch(url, { method: "HEAD", redirect: "follow" })
    if (!res.ok) {
      throw new Error(`verifyDeliverable: HEAD ${key} failed HTTP ${res.status} (${url.slice(0, 80)}…)`)
    }
  }

  console.log("housekeeping.verifyDeliverable — PASS (10 items, HEAD OK)")
  return rows
}

async function submitForPurrview(sb) {
  const { data: before, error: e1 } = await sb.from("quests").select("id, stage").eq("id", QUEST_ID).maybeSingle()
  if (e1) throw e1
  if (!before?.id) throw new Error("Quest not found")

  const { error: e2 } = await sb.from("quests").update({ stage: "purrview" }).eq("id", QUEST_ID)
  if (e2) throw e2

  const { data: after, error: e3 } = await sb.from("quests").select("id, stage, title").eq("id", QUEST_ID).single()
  if (e3) throw e3

  if (after.stage !== "purrview") {
    throw new Error(`submitForPurrview: read-back stage expected purrview, got ${after.stage}`)
  }

  console.log("housekeeping.submitForPurrview — PASS")
  console.log(JSON.stringify({ id: after.id, stage: after.stage, title: after.title }, null, 2))
}

async function main() {
  loadGuildosEnv()
  const url =
    process.env.GUILDOS_NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key =
    process.env.GUILDOS_SUPABASE_SECRETE_KEY?.trim() ||
    process.env.SUPABASE_SECRETE_KEY?.trim()
  if (!url || !key) throw new Error("Missing Supabase URL or service role key")

  const sb = createClient(url, key, { auth: { persistSession: false } })

  await verifyDeliverable(sb)
  await submitForPurrview(sb)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
