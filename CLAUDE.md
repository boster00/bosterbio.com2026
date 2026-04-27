# BosterBio.com 2026 Rebuild

## Project structure
- `apps/web` — Next.js 15 storefront
- `apps/api` — Medusa v2 backend (port 9000)
- `packages/types` — shared TypeScript types
- Monorepo managed with pnpm + Turborepo

## Commands

```bash
pnpm install
pnpm dev                              # start all apps via turbo
pnpm --filter @bosterbio/web dev      # start just the storefront
```

## Port assignments (all repos)

The GuildOS port table is the source of truth. **`bosterbio.com2026` web = 3003** (`apps/api` Medusa = 9000 internally). Older docs that show port 3000 for the web app are stale; treat 3003 as canonical.

| Port | Repo |
|------|------|
| 3000 | CJGEO |
| 3001 | Boster Nexus |
| 3002 | GuildOS |
| 3003 | bosterbio.com2026 ← this repo (apps/web) |
| 3004 | hairos |

## Figma design source
- **File:** Boster Design Master File
- **File key:** `NMfOvoGgMVFPYM4nLtN8zD`
- **API access:** `FIGMA_ACCESS_TOKEN` is set in `apps/web/.env.local`
- Use the Figma REST API (`https://api.figma.com/v1/`) with header `X-Figma-Token: <token>` to pull design data, images, and assets
- The "Website" canvas (node `820:2`) contains all page designs at multiple breakpoints (375, 768, 1200, 1440, 1920)
- Key homepage frame: node `820:14937` (Homepage-1440)

## Design system
- **Primary Blue:** `rgb(0, 76, 149)` — headings, nav background
- **Accent Orange:** `rgb(234, 141, 40)` — CTAs, stat numbers, nav accent bar
- **Light Blue:** `rgb(60, 169, 214)` — secondary actions
- **Heading font:** Josefin Sans (Bold, 42-48px)
- **Body font:** Mulish (Regular 400 / Medium 500 / ExtraBold 800)

## How a cursor agent working here relates to GuildOS

You were spawned by **`cursor.writeAgent`** in GuildOS, which prepended a credentials block to your prompt that exports `GUILDOS_NEXT_PUBLIC_SUPABASE_URL` + `GUILDOS_SUPABASE_SECRETE_KEY` (and the basic-name aliases for backward compat) into `~/.guildos.env`. **GuildOS is your primary workspace** (`/workspace = ~/GuildOS`); this repo (`~/bosterbio.com2026`) is checked out as a sibling. All quest bookkeeping (items, item_comments, submit gate) targets GuildOS Supabase.

**Crucial distinction for this repo:** the storefront's own product data lives in **local PostgreSQL via Medusa** — that overrides any older code or doc that mentions Supabase for product data. Existing Supabase-backed product code is legacy to be migrated. Use local PostgreSQL going forward. GuildOS Supabase is for quest bookkeeping ONLY, never for product data.

If `~/.guildos.env` is missing or empty, escalate via `housekeeping.escalate` with `detail.reason = "GuildOS credentials block missing — spawn was not via cursor.writeAgent"`. Do not paper over the gap.

## Quest contract (every adventurer carries this)

Owned by GuildOS skill books (`codex` + `housekeeping` + `worker`). Brief recap:

- **Tier columns are owned.** Worker writes ONLY `items.self_check` (T0). Never write `openai_check` / `purrview_check` / `claude_check` / `user_feedback`.
- **Never edit `quests.description`** — strategic OBJECTIVE only; status lives in `stage` + tier columns.
- **`items.expectation` style is locked.** `"In the screenshot, we should see <subject> showing <state> with these details: <facts>."`
- **UPSERT items, don't pile up.** UNIQUE(quest_id, item_key) — resubmits replace in place. Never invent `_v2` keys.
- **Submit only via `housekeeping.submitForPurrview`.** Never write `quests.stage` directly.

## Project scope and discipline

- **Migration mindset only.** Replication + simplification of the legacy Magento store. NO new features during migration.
- **Source of truth.** Read `docs/migration-plan.md` for the full project plan before any non-trivial change.
- **Quality bar.** Figma fidelity is mandatory. Use the `bosterbio.validateFigma` skill book action — viewport screenshot of the dev page vs. Figma export, side-by-side comparison.

## Migration data layer (high-leverage subset of the bosterbio skill book)

Full detail lives in the `bosterbio` skill book (`migrateProducts`, `buildStorefront`, `launchPrep`, `migrateContent`, `connectSsh`). High-signal reminders:

- **Hybrid product schema.** Type A (search-critical, dedicated columns: sku, title, handle, product_template, category, reactivity[], applications[], clone, host_species, badges, target_info JSON, search_index) + Type B (flexible: `attr_1..attr_25` + `attribute_definitions` table mapping). Don't pile every Magento attribute into dedicated columns — only those Type A queries actually need.
- **`target_info` JSON merge.** gene_name, uniprot_id, synonyms, protein_function, gene_full_name, protein_name → one JSON column.
- **Images go in a separate `product_images` table** (FK to product, `type ∈ {hero, gallery, datasheet, swatch}`). Multiple products can reference the same image.
- **Primary data source: full product CSV on the Magento server.** `/home/jetrails/bosterbio.com/html/pub/internal-export.csv` — auto-regenerated, ~412 MB, **100 columns**. The `template` column (col 100) holds the slug values (`antibodies | elisa-kits | proteins | …`); map directly to `products.product_template`. Do NOT derive `template` from `product_category`. Sibling files: `pub/export.csv` (81 cols, 260MB, no template) and `pub/niches.csv` (empty header) — both inferior; ignore.
- **Smoke-testing the CSV:** use byte-bounded `head` (`head -c 20000000`), not line-bounded — HTML cells contain embedded newlines inside quoted strings, so line count != product count. Parse with a streaming CSV parser and stop after N product rows.
- **No bulk redirects.** Discard ALL legacy Magento URL rewrites. Implement a 404 monitoring system instead; surface high-frequency 404s and fix selectively. Sitemap: generate fresh.
- **Customers:** migrate 2,352 accounts; force password reset via email. Login requirement deferred.
- **Orders:** do NOT migrate historical orders. Zoho Books is system of record; future Phase 3 wires Medusa → Zoho.
- **Payments:** retain Authorize.net (NOT migrating to Stripe). Tax authority: Zoho Books.
- **CMS pages:** 481 to migrate (out of 755 total) per `docs/cms-page-audit.md` and `docs/cms-html-template-guide.md`. Use the template library system. Absolute bosterbio.com URLs in exports are rewritten to `https://SITE_ORIGIN_PLACEHOLDER`; restore real origin at deploy time.

### SSH to the Magento production server

```bash
ssh -p 2223 boster_ooP9u@69.27.32.101
```

If port 2223 times out, fall back through Carbon (`ssh carbon` then ssh from there — different outbound IP), and if that also fails, request an IP whitelist from `support@jetrails.com` (subject `SSH Whitelist Request — Add IP <X> for bosterbio.com`). Full procedure in `bosterbio.connectSsh`.

## Browser / verification

This VM has its own headed Chrome + Playwright. Do NOT use Claude-in-Chrome MCP and do NOT reach for `localhost:9222` — those are local-Claude paths only. For authenticated browsing, pass `playwright/.auth/user.json` (from the GuildOS repo) as Playwright's `storageState`.

## Database verification

After any UPDATE to GuildOS tables, SELECT the row back and trust those values, not HTTP status. Never test-then-restore.
