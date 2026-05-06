#!/usr/bin/env node
/**
 * Stand-in when housekeeping.verifyDeliverable MCP is unavailable:
 * loads GuildOS env (see load-guildos-env.mjs), SELECT items for a quest,
 * fails if any deliverable row lacks self_check (T0 worker-owned column).
 *
 * Optional screenshot gate (quest items with storage URLs):
 *   VERIFY_REQUIRE_SCREENSHOT_URLS=1  →  each row must have non-empty url and caption.
 *
 * Usage:
 *   QUEST_ID=fd53ffa5-a1f7-4186-bfc0-b072be64e204 node scripts/verify-guildos-quest-items.mjs
 *   QUEST_ID=... VERIFY_REQUIRE_SCREENSHOT_URLS=1 node scripts/verify-guildos-quest-items.mjs
 */
import { createClient } from "@supabase/supabase-js"
import { loadGuildosEnv } from "./load-guildos-env.mjs"

const QUEST_ID = process.env.QUEST_ID?.trim()
if (!QUEST_ID) {
  console.error("Set QUEST_ID")
  process.exit(2)
}

const requireShot = process.env.VERIFY_REQUIRE_SCREENSHOT_URLS === "1"

loadGuildosEnv()
const url = process.env.NEXT_PUBLIC_SUPABASE_URL.trim()
const key = process.env.SUPABASE_SECRETE_KEY.trim()
const sb = createClient(url, key, { auth: { persistSession: false } })

const { data: rows, error } = await sb
  .from("items")
  .select("item_key, self_check, url, caption")
  .eq("quest_id", QUEST_ID)

if (error) {
  console.error("SELECT items failed:", error.message)
  process.exit(1)
}

const missingSelf = (rows ?? []).filter((r) => !r.self_check?.trim())
if (missingSelf.length) {
  console.error("VERIFY FAILED — missing self_check on:", missingSelf.map((r) => r.item_key).join(", "))
  process.exit(1)
}

if (requireShot) {
  const missingUrl = (rows ?? []).filter((r) => !r.url?.trim())
  if (missingUrl.length) {
    console.error("VERIFY FAILED — missing url on:", missingUrl.map((r) => r.item_key).join(", "))
    process.exit(1)
  }
  const missingCap = (rows ?? []).filter((r) => !r.caption?.trim())
  if (missingCap.length) {
    console.error("VERIFY FAILED — missing caption on:", missingCap.map((r) => r.item_key).join(", "))
    process.exit(1)
  }
}

console.log(
  `VERIFY OK — ${rows.length} items with self_check${requireShot ? " + url + caption" : ""} for quest ${QUEST_ID}`,
)
process.exit(0)
