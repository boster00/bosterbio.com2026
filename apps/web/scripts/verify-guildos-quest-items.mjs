#!/usr/bin/env node
/**
 * Stand-in when housekeeping.verifyDeliverable MCP is unavailable:
 * loads ~/guildos/.env.local (see load-guildos-env.mjs), SELECT items for a quest,
 * fails if any deliverable row lacks self_check (T0 worker-owned column).
 *
 * Usage:
 *   QUEST_ID=fd53ffa5-a1f7-4186-bfc0-b072be64e204 node scripts/verify-guildos-quest-items.mjs
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

const { data: rows, error } = await sb
  .from("items")
  .select("item_key, self_check")
  .eq("quest_id", QUEST_ID)

if (error) {
  console.error("SELECT items failed:", error.message)
  process.exit(1)
}

const missing = (rows ?? []).filter((r) => !r.self_check?.trim())
if (missing.length) {
  console.error("VERIFY FAILED — missing self_check on:", missing.map((r) => r.item_key).join(", "))
  process.exit(1)
}

console.log(`VERIFY OK — ${rows.length} items with self_check for quest ${QUEST_ID}`)
process.exit(0)
