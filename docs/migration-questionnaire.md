# BosterBio.com Migration Questionnaire

*Questions to answer before migrating the live site to bosterbio.com2026.*
*Updated 2026-04-13 with answers from migration-questionnaire-answers.md*

---

## 1. SCOPE & TIMELINE

- [x] What is the target launch date for the new site?
  > **8 weeks (hard target).** Execution-first, no scope creep.
- [x] Will this be a hard cutover (old site goes down, new site goes up) or a gradual migration (run both in parallel)?
  > **Hard cutover.** Accepts SEO and runtime risk. Requires strong pre-launch QA + rollback readiness.
- [x] Are there any business events (trade shows, campaigns, product launches) we need to avoid during migration?
  > Avoid overlap with SfN-related activity and active campaigns.
- [x] Who are the stakeholders that need to sign off before go-live?
  > **Single stakeholder: the user.**

## 2. E-COMMERCE PLATFORM

- [x] Confirm: is the new backend **Medusa** (already scaffolded in the repo) or are we considering **direct Supabase/PostgreSQL** without Medusa?
  > **Medusa confirmed.**
- [x] Do we need a shopping cart and checkout on the new site, or will ordering continue through a separate system (Zoho Books, phone, email)?
  > **Full cart + checkout on the new site.** E-commerce first, credit card enabled.
- [x] What payment processors are currently used? (Stripe, PayPal, PO/invoicing?)
  > **Authorize.net (retain existing system).** No migration to Stripe.
- [x] Will the new site handle tax calculation, or does Zoho Books handle that?
  > **Zoho Books = source of truth for tax.**

## 3. PRODUCTS (85,929 in Magento)

- [x] Are all 85K products active, or how many are discontinued/disabled? What should we migrate?
  > **All products migrate together.** No tiering/pruning.
- [x] The Magento EAV has ~150 attributes. I've proposed ~25 direct columns + JSONB `attrs` bag. Review the schema in our discussion — any attributes that MUST be filterable that I missed?
  > **Hybrid confirmed:** Type A (search-critical) → dedicated columns. Type B (display-only) → JSONB. Matches two-class attribute mental model.
- [x] Product options (sizes, conjugates) — there are 115K options with 650K values. Are these all still valid, or can we consolidate?
  > **Follow Medusa default model** for options/variants. No custom system.
- [x] Product images — 171K media gallery entries. Where are the actual image files stored? (Magento `pub/media/` on the server, or a CDN?)
  > **Migrate via SSH from Magento server.** Final storage: R2/S3 (TBD).
- [x] Are there product bundles or configurable products, or is everything simple products with options?
  > **Attribute-based products.** Multi-category assignment allowed (use platform default).

## 4. CUSTOMERS (2,352 in Magento)

- [x] Do customers need to log in to the new site? Or is it browse-only with quoting?
  > **Deferred decision** — not blocking launch.
- [x] Should we migrate customer accounts, or start fresh and let them re-register?
  > **Migrate accounts.** Force password reset via email.
- [x] Are customer passwords recoverable from Magento, or will everyone need password resets?
  > **Force password reset** (implied — Magento hashes not portable).
- [ ] Is there customer-specific pricing (contract pricing, institutional discounts)?

## 5. ORDERS (4,633 in Magento)

- [x] Do we need to migrate historical orders for customer order history, or is Zoho Books the system of record for orders?
  > **Do NOT migrate historical orders.** Zoho Books is system of record.
- [x] Will the new site process orders directly, or will it generate quotes that convert to Zoho Books orders?
  > **Medusa processes orders directly.** Zoho integration deferred to Phase 3.
- [x] What is the current order flow? (Website cart → Magento order → Zoho Books invoice → warehouse fulfillment?)
  > Future flow: **Medusa → Zoho** (to confirm details later).

## 6. CONTENT (749 CMS pages, 33 blocks)

- [x] Are all 749 CMS pages still relevant? Many may be outdated landing pages, promotions, etc.
  > **Keep only high-traffic pages.** Selection based on GA + BigQuery data.
- [ ] Which CMS pages are high-traffic / high-SEO-value and must be preserved exactly?
  > Needs GA/BigQuery analysis.
- [x] Will content be managed in the codebase (MDX/JSX) or do we need a CMS (like Sanity, Contentful, or Supabase-based)?
  > **Template library system** for creating/editing pages, with tutorials for team.
- [x] Are there any legal pages (privacy policy, terms) that need legal review before republishing?
  > **Update as required** (standard compliance).

## 7. PUBLICATIONS (52,403)

- [x] Are publications (citations) displayed on product pages? How important is this feature?
  > **Yes.** Migrate table, display first ~20 entries per product. Full redesign later.
- [x] Is BizGenius still providing citation data, or has that been brought in-house?
  > **No BizGenius dependency.** Remove assumption.
- [x] Should the new site have a searchable citation library?
  > **Local handler** to process and attach to products. Full search deferred.

## 8. GENES (44,816)

- [x] What are the gene info card pages used for? Are they auto-generated landing pages for SEO?
  > **Deferred — not part of initial launch.**
- [x] Should these be migrated as-is, regenerated with AI enrichment, or redesigned?
  > **Future: AI enrichment via CIGO.** Extend to disease areas, cell type panels, research topic pages.
- [x] Are gene pages linked to from product pages (product → gene target)?
  > Deferred with gene pages.

## 9. SEO & URL PRESERVATION

- [x] There are 198K URL rewrites in Magento. We need to preserve URLs for SEO.
  > **Discard all Magento rewrites.** Start clean with new routing.
- [x] What is the current URL structure? (e.g., `/anti-egfr-antibody-a00001-2.html` → what should it become?)
  > **Preserve current product URL structure exactly** (e.g., `/anti-xxx-antibody-xxxx.html`).
- [x] Will we set up 301 redirects for ALL old URLs, or only high-traffic ones?
  > **No bulk redirects.** Instead: 404 monitoring system → surface high-frequency 404s → fix selectively.
- [x] Is the current domain `bosterbio.com` staying, or is there a new domain?
  > **Domain stays `bosterbio.com`.**
- [x] Google Search Console / Analytics — who has access? Need to verify indexing after migration.
  > Required: re-submit sitemap, trigger reindexing, monitor. Future: Boster Nexus Web Maintenance module.

## 10. INTEGRATIONS

- [x] **Forms integration** — confirmed as required feature.
- [x] **Zoho Books** — currently integrated for invoicing/inventory. Will the new site connect to Zoho Books API?
  > **Deferred to Phase 3.** Not blocking migration.
- [x] **Zoho CRM** — currently has contacts/leads. Should the new site push form submissions to CRM?
  > **Deferred.**
- [x] **Google Ads** — current conversion tracking setup. Needs to be preserved on new site.
  > **Handled via GTM.** Migrate GTM container, validate all tags post-launch.
- [x] **Google Merchant Center** — product feed needs to continue working.
  > Via GTM / deferred.
- [x] **BizGenius ChatGenius** — is the AI chatbot staying on the new site?
  > **Removed entirely.** Not used.
- [x] **Opensend** — is the SDK being installed on the new site?
  > Depends on GTM. No direct integration now.
- [x] **Smartlead / Instantly** — do these need any website integration (tracking pixels, webhooks)?
  > Depends on GTM. No direct integration now.
- [x] **Any other integrations** we need to preserve? (HubSpot, Mailchimp, live chat, etc.)
  > Defer most integrations to Phase 3.

## 11. INFRASTRUCTURE

- [x] Where will the new site be hosted? (Vercel, AWS, self-hosted, Jetrails?)
  > **JetRails no longer used.** Production hosting TBD. Dev environment: virtualized server (to be selected).
- [x] Current Magento server (c100h.bosterbio.com) — what happens to it after migration? Keep for API access? Decommission?
  > **Keep during migration** for reference + fallback.
- [x] Database: local PostgreSQL → Supabase (production). Confirm this path.
  > **Assumed yes** (not re-confirmed).
- [x] CDN for images: use Supabase Storage, Cloudflare R2, or S3?
  > **R2/S3 likely.** Decision pending.
- [x] SSL certificate — current provider? Will Vercel/hosting handle this?
  > **Hosting provider will handle.**

## 12. DESIGN & UX

- [x] Design source confirmed: **Figma Master File** with all page designs.
- [x] Mobile experience — responsive at 5 breakpoints (375, 768, 1200, 1440, 1920).
- [x] Accessibility requirements (WCAG compliance level)?
  > **Implement if low effort. Defer if high effort.**
- [x] Multi-language support needed? (Chinese site?)
  > **Not required.**

## 13. TESTING & LAUNCH

- [x] Who will do UAT (user acceptance testing) before launch?
  > **User + AI** (primary operators). Developer/PM joins after workflow stabilized.
- [x] Do we need a staging environment? (stage.bosterbio.com already exists on Jetrails)
  > **Yes** — staging exists (implicit in workflow).
- [x] Rollback plan — if the new site has critical issues, can we switch back to Magento?
  > **Yes.** Backup site, ready to revert.
- [x] Post-launch monitoring — who watches for issues in the first 48 hours?
  > **User + system monitoring.**

---

*Nearly all questions resolved. See `migration-plan.md` for execution plan and `migration-questionnaire-answers.md` for detailed reasoning.*
