# BosterBio.com Migration Questionnaire (Filled + Guided)

This version separates:

* ✅ High-confidence answers (based on your prior decisions + systems)
* ⚠️ Open decisions (with recommended direction + tradeoffs)

---

## 1. SCOPE & TIMELINE

* ✅ Target launch date
  → **Within 8 weeks (hard target)**
  → Implication: no exploratory scope creep; execution-first

* ✅ Migration type
  → **Systematic / hard cutover (no parallel run)**
  → Notes:

  * Accepts SEO and runtime risk
  * Requires strong pre-launch QA + rollback readiness
  * AI-assisted migration acceptable

* ✅ Business events to avoid
  → Avoid overlap with:

  * SfN-related activity
  * Active campaigns

* ✅ Stakeholders
  → **Single stakeholder: you**

---

## 2. E-COMMERCE PLATFORM

* ✅ Medusa confirmed

* ✅ Full cart + checkout

* ✅ Payment processors
  → **Authorize.net (retain existing system)**
  → No migration to Stripe for BosterBio checkout

* ✅ Tax handling
  → **Zoho Books = source of truth**

---

## 3. PRODUCTS (85,929)

* ⚠️ Core architecture (OPEN – critical)

  Your defined model:

  **Type A: Indexing / Search Attributes**

  * Stable
  * Must be filterable
  * Must be query-efficient
    → **Dedicated columns (strict schema)**

  **Type B: Display Attributes**

  * Vary by product line
  * Frequently changing
  * Mostly string values

  You are choosing between:

  Option 1 — Dedicated columns

  * ❌ Not scalable (schema churn)

  Option 2 — Separate table (EAV-style)

  * ❌ Joins = performance + complexity
  * ❌ Magento déjà vu (you already hate this)

  Option 3 — JSONB column

  * ✅ Flexible
  * ✅ No joins
  * ⚠️ Limited indexing unless explicitly designed

  **Recommended hybrid (high confidence):**

  * Columns → Type A (search-critical)
  * JSONB → Type B (display-only)

  Why this is optimal for your case:

  * Matches your “two-class attribute” mental model
  * Avoids EAV complexity
  * Keeps query performance predictable
  * Supports future AI enrichment (CJGEO / Nexus)

  → Decision still open but leaning strongly toward this hybrid

* ✅ Product migration scope
  → **All products migrate together (no tiering/pruning)**

* ⚠️ Variants / options
  → Follow **Medusa default model** (no custom system)

* ⚠️ Images
  → Migrate via SSH from Magento
  → Final storage decision pending (R2/S3 likely)

* ✅ Product type
  → Attribute-based products
  → Multi-category assignment allowed (use platform default)

---

## 4. CUSTOMERS (2,352)

* ⚠️ Scope
  → Not prioritized for initial launch

* ✅ Migration approach
  → Migrate accounts
  → Force password reset via email

* ⚠️ Login requirement
  → Deferred decision (not blocking launch)

---

## 5. ORDERS (4,633)

* ✅ Migration decision
  → **Do NOT migrate historical orders**

* ✅ Source of truth
  → Zoho Books

* ⚠️ Future flow (to confirm later)
  → Medusa → Zoho

---

## 6. CONTENT (749 CMS pages)

* ✅ Content strategy
  → Keep only **high-traffic pages**

* ✅ Source of truth for selection
  → Google Analytics + BigQuery data

* ✅ CMS approach
  → Template library system

* ⚠️ Legal pages
  → Update as required (standard compliance)

---

## 7. PUBLICATIONS (52,403)

* ✅ Migration approach
  → Migrate table as-is

* ⚠️ Data source
  → No BizGenius dependency (remove assumption)

* ⚠️ Handling
  → Local handler to process and attach to products

---

## 8. GENES (44,816)

* ⚠️ Migration timing
  → **Deferred (not part of initial launch)**

* ⚠️ Future plan
  → AI enrichment via CIGO
  → Extend to:

  * Disease areas
  * Cell type panels
  * Research topic pages

---

## 9. SEO & URL PRESERVATION

* ✅ URL rewrites (198K)
  → **Discard all existing Magento rewrites**
  → Start clean with new routing

* ✅ URL structure
  → **Preserve current product URL structure exactly**
  (e.g., `/anti-xxx-antibody-xxxx.html`)

* ✅ Redirect strategy
  → **No bulk redirects**
  → Instead:

  * Implement **404 monitoring system**
  * Surface high-frequency 404s to a dashboard
  * Fix selectively over time

* ✅ Domain stays

* ⚠️ GSC / Analytics
  → Required:

  * Re-submit sitemap
  * Trigger reindexing
  * Monitor indexing + errors

* 🚧 Future (Phase 3)
  → Build **Boster Nexus Web Maintenance module**:

  * GSC integration (indexing + errors)
  * 404 monitoring
  * SEO housekeeping automation

---

## 10. INTEGRATIONS

* ⚠️ Strategy
  → **Defer most integrations to Phase 3**

* ⚠️ Zoho Books
  → Will integrate later (not blocking migration)

* ⚠️ Zoho CRM
  → Deferred

* ✅ Ads + tracking
  → **Handled via Google Tag Manager (GTM)**
  → Requirement:

  * Migrate GTM container
  * Validate all tags post-launch

* ❌ BizGenius
  → Not used (remove entirely)

* ⚠️ Other tools (Opensend, Smartlead, etc.)
  → Depend on GTM
  → No direct integration required now

---

## 11. INFRASTRUCTURE

* ❌ JetRails
  → **No longer used**

* ⚠️ Production hosting
  → **TBD (decision pending)**

* ⚠️ Development environment
  → **Virtualized server environment** (to be selected)

* ✅ Magento server
  → Keep during migration (for reference + fallback)

* ⚠️ DB path
  → local → Supabase (assumed, not re-confirmed here)

* ⚠️ Image CDN
  → Still pending decision (R2/S3 likely)

* ⚠️ SSL
  → Hosting provider will handle

---

## 12. DESIGN & UX

* ✅ Figma source

* ✅ Mobile breakpoints

* ⚠️ Accessibility
  → Implement if low effort
  → If high effort, defer

* ❌ Multi-language
  → Not required (ignore China context for now)

---

## 13. TESTING & LAUNCH

* ✅ UAT
  → You + AI (primary operators)

* ⚠️ Team evolution
  → Developer/PM joins after workflow is stabilized

* ✅ Staging exists (implicit in workflow)

* ✅ Rollback ready

* ⚠️ Monitoring
  → You + system monitoring

---

# KEY STRATEGIC GAPS (UPDATED STATUS)

These were previously blockers — now mostly resolved:

1. **SEO strategy for 85K products**
   → ✅ Decision: **Migrate as-is first, optimize later**

2. **Checkout model**
   → ✅ Decision: **E-commerce first (credit card enabled)**

3. **Zoho integration depth**
   → ✅ Decision: **Defer (Phase 3)**

4. **Content system power**
   → ⚠️ Deferred post-migration

5. **Publications system design**
   → ✅ Interim solution:

   * Migrate table
   * Display first ~20 entries per product
   * Full system redesign later

---

# CURRENT EXECUTION PRINCIPLE (CRITICAL)

**DO NOT ADD NEW FUNCTIONALITY DURING MIGRATION**

* Migration = replication + simplification only
* No feature expansion
* No system redesign mid-flight

→ New capabilities go into **Phase 2 / Phase 3 only**

---

If needed next:
→ Lock product schema (Type A fields)
→ Define migration scripts (Magento → new system)
→ Define 404 monitoring system (lightweight, fast to ship)
