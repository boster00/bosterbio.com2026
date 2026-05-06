# BosterBio.com2026 — Agent Instructions

`bosterbio.com2026` is the next-generation BosterBio storefront — a Next.js + Medusa v2 monorepo (pnpm + turbo). Web app at `apps/web/`. Replaces the legacy Magento store.

## Development

```bash
pnpm install
pnpm --filter web dev    # port 3003
pnpm --filter web build
```

Dev server: **port 3003** for the web app.

## Port assignments (all repos)

| Port | Repo |
|------|------|
| 3000 | CJGEO |
| 3001 | Boster Nexus |
| 3002 | GuildOS |
| 3003 | bosterbio.com2026 ← this repo |
| 3004 | hairos |

## How a cursor agent working here relates to GuildOS

You were spawned by **`cursor.writeAgent`** in GuildOS, which prepended a credentials block to your prompt that exports `GUILDOS_NEXT_PUBLIC_SUPABASE_URL` + `GUILDOS_SUPABASE_SECRETE_KEY` (and the basic-name aliases for backward compat) into `~/.guildos.env`. **GuildOS is your primary workspace** (`/workspace = ~/GuildOS`); this repo (`~/bosterbio.com2026`) is checked out as a sibling. All quest bookkeeping (items, item_comments, submit gate) targets GuildOS Supabase.

**Storefront data store — Supabase Postgres** (decided 2026-04-27 to avoid local-PG progress loss between sessions). Product catalog, CMS pages, publications, customers, and 404 logs all live in a dedicated Supabase project:

- Project: `bosterbio.com2026` (org `wpycfhqkpzsdhupwwjgt` / "CJ Personal Projects")
- Project ref: `kjgizxqglzcrwfiauhaj`
- URL: `https://kjgizxqglzcrwfiauhaj.supabase.co`
- Region: us-east-1 (North Virginia), Postgres 17.6, free-tier Nano compute
- Connection: **session pooler at `aws-1-us-east-1.pooler.supabase.com:5432`** (free tier is not IPv4-compatible on direct, so always use the pooler)
- **DB size note (2026-04-28):** ~543 MB, slightly over the 500 MB free-tier soft cap after migrating 64K+ products + 272K images + 52K publications. Project still functions at this size; Supabase's pause typically triggers above 500 MB sustained over multiple days. **If launching for real: upgrade to Pro ($25/mo, 8 GB included)** OR prune the disabled (status≠'enabled') product rows that add no traffic value (~22K rows).
- Schema: 5 SQL migrations under `sql/`
  - `001_initial_schema.sql` — 8 tables (products, product_images, attribute_definitions, cms_pages, publications, product_publications, not_found_log, customers_staging)
  - `002_attribute_definitions_seed.sql` — 275 rows (11 templates × 25 attrs)
  - `003_rls_policies.sql` — RLS for public read + insert-only-anon + service-role-only
  - `004_contact_messages.sql` — contact form submissions
  - `005_newsletter_signups.sql` — email signups
- Server-side client: `import { supabaseService } from "@/lib/supabase/server"` — prefers `BOSTERBIO_SUPABASE_URL` + `BOSTERBIO_SUPABASE_KEY`, then falls back to `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SECRETE_KEY` (see `storefrontSupabaseConfigured()`).
- Domain helpers under `apps/web/src/lib/supabase/`:
  - `cms.ts` — getCmsPageBySlug, listCmsPagesUnderPrefix
  - `catalog.ts` — listProductsFromSupabase, getProductFromSupabase, searchProductsInSupabase, getSimilarProducts
  - `attributes.ts` — getProductAttributesByTemplate (Type B labelled attrs)
  - `publications.ts` — getPublicationsForProduct
  - `product-images.ts` — getAllImagesForProduct (gallery)
  - `by-gene.ts` — findProductsByGene
  - `not-found-log.ts` — logNotFound (filters asset/system paths)

**API routes** (all under `apps/web/src/app/api/`):
- `POST /api/contact` — writes to contact_messages
- `POST /api/newsletter` — writes to newsletter_signups
- `GET /api/health` — Supabase liveness with `supabase_rtt_ms`
- `GET /api/stats` — public catalog totals JSON (10-min ISR cache)
- `GET /api/proxy-product-image` — same-origin Magento CDN proxy (existing)

**ISR caching**: home (600s), PLP (300s), PDP (600s), CMS catch-all (300s), api/stats (600s).

**Medusa v2** (`apps/api`) is still scaffolded against PostgreSQL but is not yet wired to Supabase — checkout / cart will be hooked up in a later phase. Storefront reads (PLP, PDP, CMS, search) read DIRECTLY from Supabase via the supabaseService client; do not route those through Medusa.

GuildOS Supabase remains separate — it's only for quest bookkeeping (items, quest_comments, submitForPurrview).

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
- **Brand.** Primary deep blue `#1a365d`; accent warm orange `#f97316`; typography Inter via `next/font`. Tone: friendly, scientific, approachable.
- **Quality bar.** Figma fidelity is mandatory. Use the `bosterbio.validateFigma` skill book action — viewport screenshot of the dev page vs. Figma export, side-by-side comparison.

## Migration data layer (high-leverage subset of the bosterbio skill book)

Full detail lives in the `bosterbio` skill book (`migrateProducts`, `buildStorefront`, `launchPrep`, `migrateContent`, `connectSsh`). High-signal reminders:

- **Hybrid product schema.** Type A (search-critical, dedicated columns: sku, title, handle, product_template, category, reactivity[], applications[], clone, host_species, badges, target_info JSON, search_index) + Type B (flexible: `attr_1..attr_25` + `attribute_definitions` table mapping). Don't pile every Magento attribute into dedicated columns — only those Type A queries actually need.
- **`target_info` JSON merge.** gene_name, uniprot_id, synonyms, protein_function, gene_full_name, protein_name → one JSON column.
- **Images go in a separate `product_images` table** (FK to product, `type ∈ {hero, gallery, datasheet, swatch}`). Multiple products can reference the same image.
- **Primary data source: full product CSV on the Magento server.** `/home/jetrails/bosterbio.com/html/pub/internal-export.csv` — auto-regenerated, ~412 MB, **100 columns**. The `template` column (col 100) holds the slug values (`antibodies | elisa-kits | proteins | …`); map directly to `products.product_template`. Do NOT derive `template` from `product_category`. Sibling files: `pub/export.csv` (81 cols, 260MB, no template) and `pub/niches.csv` (empty header) — both inferior; ignore.
- **Smoke-testing the CSV:** use byte-bounded `head` (`head -c 20000000`), not line-bounded — HTML cells contain embedded newlines inside quoted strings, so line count != product count. Parse with a streaming CSV parser and stop after N product rows.
- **No bulk redirects.** Discard ALL legacy Magento URL rewrites. Implement a 404 monitoring system instead; surface high-frequency 404s and fix selectively. Sitemap: generate fresh.
  - **Implementation status (2026-04-28):** the catch-all CMS route at `apps/web/src/app/(site)/[...slug]/page.tsx` calls `logNotFound(path)` from `@/lib/supabase/not-found-log` before throwing `notFound()`. Every miss bumps `not_found_log.hit_count`. Sitemap is at `apps/web/src/app/sitemap.ts` and reads from `cms_pages` + `products`.
- **Customers:** migrate 2,352 accounts; force password reset via email. Login requirement deferred.
- **Orders:** do NOT migrate historical orders. Zoho Books is system of record; future Phase 3 wires Medusa → Zoho.
- **Payments:** retain Authorize.net (NOT migrating to Stripe). Tax authority: Zoho Books.
- **CMS pages:** 481 (of 755) migrated 2026-04-28 by `scripts/migrate-cms-pages.mjs` into `cms_pages`. The catch-all route `app/(site)/[...slug]/page.tsx` queries by `identifier` and renders via the existing `NavCmsPage` component. Static routes (e.g. `/about-us`, `/products`) win over the catch-all by Next.js precedence — leave hand-coded pages alone unless you explicitly want them to come from the DB. Absolute `bosterbio.com` URLs in exports are stored as `https://SITE_ORIGIN_PLACEHOLDER` and rewritten at render time by `hydrateCmsHtml()` in `lib/cms-nav.ts`.
- **Products:** schema in `sql/001_initial_schema.sql` (Type A dedicated columns + `attr_1..attr_25` + `target_info` JSON + separate `product_images` table). Pilot of 99 products across 9 templates migrated 2026-04-28 by `scripts/migrate-products-pilot.mjs`. Full-catalog streaming migration: `scripts/migrate_products_full_stream.py` (reads `template` col → `product_template`, duplicate `url_key` → `handle=sku`). Source: `https://www.bosterbio.com/internal-export.csv` (publicly served, ~411 MB, 100 columns).

### SSH to the Magento production server

```bash
ssh -p 2223 boster_ooP9u@69.27.32.101
```

If port 2223 times out, fall back through Carbon (`ssh carbon` then ssh from there — different outbound IP), and if that also fails, request an IP whitelist from `support@jetrails.com` (subject `SSH Whitelist Request — Add IP <X> for bosterbio.com`). Full procedure in `bosterbio.connectSsh`.

## Browser / verification

This VM has its own headed Chrome + Playwright. Do NOT use Claude-in-Chrome MCP and do NOT reach for `localhost:9222` — those are local-Claude paths only. For authenticated browsing, pass `playwright/.auth/user.json` (from the GuildOS repo) as Playwright's `storageState`.

## Database verification

After any UPDATE to GuildOS tables, SELECT the row back and trust those values, not HTTP status. Never test-then-restore.
