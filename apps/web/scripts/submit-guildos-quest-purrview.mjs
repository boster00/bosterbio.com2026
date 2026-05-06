#!/usr/bin/env node
/**
 * Stand-in when housekeeping.submitForPurrview MCP is unavailable: inserts the
 * quest_execution submit_for_purrview row into quest_comments (GuildOS Supabase).
 *
 * Usage:
 *   QUEST_ID=fd53ffa5-a1f7-4186-bfc0-b072be64e204 node scripts/submit-guildos-quest-purrview.mjs
 *
 * Optional:
 *   ACTOR_NAME="BosterBio Website Dev"
 *   SUBMIT_SUMMARY="…"
 *   SUBMIT_DETAIL_JSON='{"items_complete":23}'
 */
import { createClient } from "@supabase/supabase-js"
import { loadGuildosEnv } from "./load-guildos-env.mjs"

const QUEST_ID = process.env.QUEST_ID?.trim()
if (!QUEST_ID) {
  console.error("Set QUEST_ID")
  process.exit(2)
}

loadGuildosEnv()
const url = process.env.NEXT_PUBLIC_SUPABASE_URL.trim()
const key = process.env.SUPABASE_SECRETE_KEY.trim()
const sb = createClient(url, key, { auth: { persistSession: false } })

const actorName = process.env.ACTOR_NAME?.trim() || "BosterBio Website Dev"
const summary =
  process.env.SUBMIT_SUMMARY?.trim() ||
  "Submitting for purrview after verify-guildos-quest-items (stand-in for housekeeping.submitForPurrview)."

let detail = { source: "verify-guildos-quest-items.mjs + submit-guildos-quest-purrview.mjs" }
if (process.env.SUBMIT_DETAIL_JSON?.trim()) {
  try {
    detail = { ...detail, ...JSON.parse(process.env.SUBMIT_DETAIL_JSON.trim()) }
  } catch (e) {
    console.error("SUBMIT_DETAIL_JSON must be valid JSON:", e.message)
    process.exit(2)
  }
}

const { error } = await sb.from("quest_comments").insert({
  quest_id: QUEST_ID,
  source: "questExecution",
  action: "submit_for_purrview",
  actor_name: actorName,
  summary,
  detail,
})

if (error) {
  console.error("INSERT quest_comments failed:", error.message)
  process.exit(1)
}

console.log(`Submitted for purrview — quest ${QUEST_ID}`)
process.exit(0)
