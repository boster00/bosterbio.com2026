# BosterBio.com Migration Plan

**Timeline:** 8 weeks (hard target)
**Migration type:** Hard cutover — no parallel run
**Principle:** Replication + simplification only. No new features during migration.

---

## Current State (as of 2026-04-13)

**What exists in the repo:**
- pnpm + Turborepo monorepo scaffolded
- `apps/web` — Next.js 15 with placeholder homepage ("Storefront coming soon")
- `apps/api` — Medusa v2 config with swappable payment provider (currently Stripe placeholder)
- `packages/types` — TypeScript types for products, customers, orders, carts, search (biotech-specific)
- `apps/docs/figma/` — Full Figma design exports (JSON + PNG) for all key pages at 5 breakpoints
- Design tokens documented (Primary Blue, Accent Orange, Light Blue, Josefin Sans + Mulish fonts)

**What does NOT exist yet:**
- No actual pages (homepage, product listing, product detail, search, about, cart)
- No Medusa backend running or configured with real data
- No product data migrated
- No checkout/payment flow
- No CMS or content pages
- No SEO/routing setup

**Source system (Magento on c100h.bosterbio.com):**
- 85,929 products (all migrate — no pruning)
- 115K product options / 650K option values
- 171K product images (on server, migrate via SSH)
- 2,352 customers (migrate accounts, force password reset)
- 4,633 orders (DO NOT migrate — Zoho Books is system of record)
- 749 CMS pages (keep only high-traffic pages per GA/BigQuery data)
- 52,403 publications (migrate table as-is, display first ~20 per product)
- 44,816 gene pages (DEFERRED — not part of initial launch)

---

## Phase 1: Foundation (Weeks 1–2)

### 1A. Medusa Backend Setup
**Owner:** Cursor Agent
- [ ] Get Medusa v2 backend running locally with PostgreSQL
- [ ] Configure Authorize.net payment provider (replace Stripe placeholder)
- [ ] Set up product data model:
  - **Type A (search-critical) → dedicated columns:** catalogNumber, category, reactivity, applications, clonality, hostSpecies, conjugation
  - **Type B (display-only) → JSONB `attrs` column:** isotype, uniprotId, geneId, molecularWeight, purificationMethod, formulation, storageConditions, clone
- [ ] Configure Medusa product options/variants (use Medusa default model for sizes, conjugates)
- [ ] Set up Medusa admin (dev only) for data verification

### 1B. Product Data Migration Script
**Owner:** Cursor Agent (with SSH access to Magento server)
- [ ] Connect to Magento DB on c100h.bosterbio.com via SSH
- [ ] Extract all 85,929 products from Magento EAV tables
- [ ] Map Magento attributes → Type A columns + Type B JSONB
- [ ] Extract product options/variants → Medusa variant model
- [ ] Extract product images → download via SSH, upload to temp storage
- [ ] Write import script that loads products into Medusa
- [ ] Validate: product count matches, key attributes present, images linked

### 1C. Frontend Theme Development
**Owner:** Cursor Agent
- [ ] Implement shared layout: nav menu (mega menu), footer
- [ ] Implement homepage from Figma design (homepage-1440)
- [ ] Set up Tailwind CSS 4 + DaisyUI 5 with design tokens
- [ ] Configure fonts (Josefin Sans headings, Mulish body)
- [ ] Responsive at all 5 breakpoints (375, 768, 1200, 1440, 1920)

---

## Phase 2: Core Pages + Commerce (Weeks 3–5)

### 2A. Product Pages
**Owner:** Cursor Agent
- [ ] Product listing page (category page) with filtering by Type A attributes
- [ ] Product detail page with:
  - Scientific metadata display
  - Variant/option selection (size, conjugation)
  - Image gallery
  - Add to cart
  - Publications section (first ~20 citations per product)
  - Document downloads (datasheet, SDS)
- [ ] Custom product search page
- [ ] URL structure: preserve current format (e.g., `/anti-egfr-antibody-a00001-2.html`)

### 2B. Cart + Checkout
**Owner:** Cursor Agent
- [ ] Shopping cart page (from Figma cart-1440 design)
- [ ] Checkout flow with Authorize.net
- [ ] Order confirmation page
- [ ] Order flow: Medusa processes order → future Phase 3 integration pushes to Zoho Books

### 2C. Content Pages
**Owner:** Claude Code (strategy) + Cursor Agent (implementation)
- [ ] Identify high-traffic CMS pages from GA/BigQuery data
- [ ] Migrate selected pages using template library approach
- [ ] About Us page (from Figma about-us-1440 design)
- [ ] Legal pages (privacy policy, terms) — update as needed
- [ ] Contact/forms page

### 2D. Publications Migration
**Owner:** Cursor Agent
- [ ] Migrate publications table from Magento (52,403 records)
- [ ] Create product ↔ publication linking
- [ ] Display component on product detail pages (first ~20, with "show more")

---

## Phase 3: SEO + Launch Prep (Weeks 6–7)

### 3A. SEO Setup
- [ ] Discard all Magento URL rewrites (start clean)
- [ ] Implement product URL routing matching current structure (`/product-slug.html`)
- [ ] Generate XML sitemap
- [ ] Implement schema markups (Product, Organization)
- [ ] Set up 404 monitoring system (log + dashboard for high-frequency 404s)
- [ ] Site speed optimization

### 3B. Tracking + Analytics
- [ ] Migrate Google Tag Manager container
- [ ] Validate all GTM tags post-integration
- [ ] Google Analytics 4 setup
- [ ] Ads conversion tracking (via GTM)

### 3C. Customer Migration
- [ ] Migrate 2,352 customer accounts from Magento
- [ ] Implement forced password reset flow via email
- [ ] Customer login (if prioritized) or defer

### 3D. Image CDN
- [ ] Decide final storage: Cloudflare R2 or S3
- [ ] Migrate 171K product images from Magento server to CDN
- [ ] Update all product image URLs in Medusa

### 3E. Infrastructure
- [ ] Decide production hosting (Vercel for Next.js storefront, separate for Medusa API)
- [ ] Set up production database (Supabase PostgreSQL)
- [ ] SSL (handled by hosting provider)
- [ ] Keep Magento server running as fallback

---

## Phase 4: QC + Launch (Week 8)

### 4A. Pre-Launch QC
- [ ] Test all features (cart, checkout, payment, search, filters)
- [ ] Check all pages for placeholder content and typos
- [ ] Mobile responsiveness testing at all breakpoints
- [ ] Crawl all pages — eliminate dead/broken links
- [ ] SEO audit (Ahrefs or SEMRush)
- [ ] Performance audit (Core Web Vitals)
- [ ] Accessibility check (implement if low effort, defer if high)
- [ ] Make full backup, verify rollback procedure

### 4B. Launch
- [ ] DNS cutover: bosterbio.com → new hosting
- [ ] Re-submit sitemap to Google Search Console
- [ ] Trigger reindexing
- [ ] Monitor for 2 weeks post-launch

### 4C. Post-Launch
- [ ] Monitor 404s, fix high-frequency ones selectively
- [ ] Monitor Google indexing + crawl errors
- [ ] Performance monitoring
- [ ] Project handoff documentation

---

## DEFERRED (Post-Launch)

These are explicitly out of scope for the 8-week migration:

| Item | Phase |
|------|-------|
| Gene pages (44,816) | Phase 2+ (AI enrichment via CIGO) |
| Zoho Books integration | Phase 3 |
| Zoho CRM integration | Phase 3 |
| BizGenius ChatGenius | Removed (not used) |
| Opensend SDK | Depends on GTM (deferred) |
| Smartlead/Instantly | Depends on GTM (deferred) |
| Multi-language (Chinese) | Not required |
| Full publications redesign | Post-launch |
| Boster Nexus Web Maintenance module | Future (GSC + 404 + SEO automation) |
| Disease/cell type/research topic pages | Future |
| JetRails staging | No longer used |

---

## Work Distribution: Claude Code vs Cursor Agent

| Role | Responsibilities |
|------|-----------------|
| **Claude Code** | Strategy, planning, questionnaire management, reviewing agent output, obstacle removal, Magento DB analysis, GA/BigQuery data for content decisions, quality gate enforcement |
| **Cursor Agent** | Frontend development (Figma → code), Medusa backend setup, data migration scripts, Playwright testing, screenshot validation |

### Communication Protocol
- Claude Code sends tasks via Cursor API followup messages
- 15-minute recurring check-in cycle for progress updates
- Agent must provide screenshots of developed pages for Figma fidelity comparison
- All artifacts validated before presenting to user

---

## Open Questions (Need User Input)

1. **Authorize.net credentials** — Do we have API login ID + transaction key for the Medusa integration?
2. **GA/BigQuery access** — How do we pull the high-traffic page list to decide which CMS pages to keep?
3. **Image storage** — Leaning R2 or S3. Any preference, or should the agent research and recommend?
4. **Production hosting** — Vercel for Next.js is the natural choice. What about Medusa API hosting? (Railway, Render, self-hosted?)
5. **Product URL format** — Keep the `.html` extension in the new site? (e.g., `/anti-egfr-antibody-a00001-2.html` vs `/anti-egfr-antibody-a00001-2`)
6. **Type A attribute list** — I've proposed: catalogNumber, category, reactivity, applications, clonality, hostSpecies, conjugation. Are there others that MUST be filterable on the product listing page?
