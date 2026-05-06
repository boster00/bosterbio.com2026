/**
 * Applies GuildOS quest fd53 user feedback: keep 4 deliverables (3 PDP + PLP),
 * reset screenshot fields, refresh expectations, leave quest open for manual design approval.
 *
 * Order: UPDATE kept rows first, then DELETE extras (avoids edge cases).
 *
 *   source ~/.guildos.env
 *   cd apps/web && node scripts/apply-quest-fd53-user-feedback.mjs
 */
import { createClient } from "@supabase/supabase-js"
import { loadGuildosEnv } from "./load-guildos-env.mjs"

const QUEST_ID = "fd53ffa5-a1f7-4186-bfc0-b072be64e204"
const KEEP = ["pdp_antibodies", "pdp_elisa_kits", "pdp_proteins", "plp_all_products"]
const KEEP_SET = new Set(KEEP)

const EXPECTATIONS = {
  pdp_antibodies:
    "In the screenshot, we should see the antibodies-template PDP with these details: 1. Header, links, and key UI use Figma-aligned brand blue #1a365d and accent orange #f97316; 2. A visible formatted USD list price when the Supabase row has list_price populated (no generic contact-for-pricing placeholder); 3. Hero product image and antibody quick-facts; 4. Publications when catalog data includes citations; 5. Inter typography and spacing consistent with product-page-1440 reference.",
  pdp_elisa_kits:
    "In the screenshot, we should see the ELISA-kits-template PDP with these details: 1. Brand colors #1a365d / #f97316 applied to header, eyebrow, and CTAs; 2. USD list price from list_price when available, otherwise price row hidden; 3. Kit title, SKU chip, and ELISA-oriented quick facts; 4. Spec / description sections without legacy Magento chrome; 5. Visual density aligned with the Figma PDP attachment.",
  pdp_proteins:
    "In the screenshot, we should see the proteins-template PDP with these details: 1. Figma-aligned palette (#1a365d primary, #f97316 accent); 2. USD list price from list_price when available, otherwise no placeholder price string; 3. Protein hero imagery and template-specific quick facts; 4. Specifications table when Type-B attributes exist; 5. Overall layout matching the reference PDP frame.",
  plp_all_products:
    "In the screenshot, we should see the /products listing with these details: 1. Sidebar filters and template headings using the same brand blues and orange accents; 2. Product cards without Contact-for-price copy - show formatted USD when list_price exists or omit the price line; 3. Grid of real migrated SKUs with imagery; 4. Count / heading reflecting the full catalog scope; 5. Composition aligned with product-listing-1440 reference.",
}

loadGuildosEnv()
const url = process.env.NEXT_PUBLIC_SUPABASE_URL.trim()
const key = process.env.SUPABASE_SECRETE_KEY.trim()
const sb = createClient(url, key, { auth: { persistSession: false } })

for (const key of KEEP) {
  const expectation = EXPECTATIONS[key]
  const { error } = await sb
    .from("items")
    .update({
      expectation,
      url: null,
      caption: null,
      self_check:
        "2026-05-06 design pass: quest narrowed to 4 screenshots per user feedback; storefront tokens + list_price wiring updated in repo. Awaiting manual design approval - purrview submit intentionally skipped.",
    })
    .eq("quest_id", QUEST_ID)
    .eq("item_key", key)
  if (error) throw error
  console.log("reset", key)
}

const inList = `(${KEEP.join(",")})`
const { error: delErr } = await sb.from("items").delete().eq("quest_id", QUEST_ID).not("item_key", "in", inList)
if (delErr) throw delErr
console.log("deleted non-kept items via .not in", inList)

const { error: noteErr } = await sb.from("quest_comments").insert({
  quest_id: QUEST_ID,
  source: "questExecution",
  action: "note",
  actor_name: "BosterBio Website Dev",
  summary:
    "Acted on latest user note: trimmed deliverables to 3 PDPs (antibodies, elisa-kits, proteins) + PLP; updated expectations; cleared url/caption/self_check pending new captures; aligned Tailwind brand palette to #1a365d / #f97316; removed Contact-for-price from Supabase path (list_price + metadata). Apply sql/007_products_list_price.sql then rerun migrations/backfill so USD shows. Next: capture screenshots with SUBMIT_PURRVIEW unset.",
  detail: { kept_item_keys: KEEP },
})
if (noteErr) throw noteErr

console.log("Done - verify item count:")
const { data: verify, error: vErr } = await sb.from("items").select("item_key").eq("quest_id", QUEST_ID).order("item_key")
if (vErr) throw vErr
console.log(verify?.map((r) => r.item_key).join(", "))
