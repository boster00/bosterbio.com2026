# BosterBio CMS HTML Template Guide

## Overview

This document is the **programmer’s reference** for migrating Magento 2 CMS page HTML (`cms_page.content`) to **Next.js + Medusa**.

| Item | Status |
|------|--------|
| **Production HTML analyzed from DB** | **Not done in CI** — automated SSH to `69.27.32.101:2223` from this environment returns `Connection reset by peer` (likely IP allowlisting). |
| **Distinct template patterns** | **Run the analyzer** (below) after exporting JSON on a host with DB access — the script clusters pages by normalized HTML and embeds **real** representative markup. |
| **749 pages** | Export must include all rows: `SELECT page_id, title, identifier, content, content_heading, is_active FROM cms_page`. |

**Do not commit** raw exports or database passwords. Use env vars and add `cms_pages_export.json` to `.gitignore` (already listed at repo root).

### How to generate the real template catalog (on your laptop / bastion)

1. SSH to Magento (allowed IP), export CMS pages to JSON (array of objects with `page_id`, `title`, `identifier`, `content`, `content_heading`, `is_active`).

   **MySQL one-liner** (password via prompt — avoid `-p'...'` in shell history):

   ```bash
   mysql -h 127.0.0.1 -u bosterbio_user -p --batch --raw bosterbio_m2 -e "
   SELECT JSON_ARRAYAGG(
     JSON_OBJECT(
       'page_id', page_id,
       'title', title,
       'identifier', identifier,
       'content', content,
       'content_heading', content_heading,
       'is_active', is_active
     )
   ) AS pages
   FROM cms_page;
   " | tail -1 > cms_pages_export.json
   ```

   If `JSON_ARRAYAGG` is unavailable, use `scripts/export-magento-cms-pages.py` with `pymysql` and env vars (`MYSQL_*`).

2. Copy `cms_pages_export.json` into the repo root (gitignored).

3. Run:

   ```bash
   node scripts/analyze-magento-cms-content.mjs cms_pages_export.json > docs/_cms-template-catalog.generated.md
   ```

4. **Merge** the generated file into this guide under **Template Catalog** (or `include` it in internal docs). Review clusters manually — identical normalized HTML may still deserve split if `identifier` patterns differ (e.g. A/B tests).

---

## Template Catalog

> **Populate this section** with output from `docs/_cms-template-catalog.generated.md` after export.  
> Each cluster includes **actual HTML** from one representative page (truncated only if a single field exceeds ~120KB).

_Until export is run, there is no authoritative per-pattern HTML to show from production._

---

## Common HTML patterns (Magento CMS — typical across M2 stores)

These recur in many `cms_page` bodies. Your analyzer’s **class frequency table** will show which ones BosterBio actually uses.

| Pattern | Typical markup idea | Next.js approach |
|---------|---------------------|------------------|
| **Row / column layout** | `<div class="row"><div class="col-md-6">…` (Bootstrap-style) or theme grid classes | CSS Grid / Flex + Tailwind; match breakpoints to design tokens |
| **Hero** | Full-width div, background image via `style` or `{{media url='...'}}`, H1 + CTA button | `<section>` + `next/image` or CSS `background-image` from optimized asset |
| **CTA button** | `<a class="action primary">` or theme button classes | `<Link>` + shared `Button` component |
| **Tables** | Spec tables, comparison tables | Semantic `<table>`, responsive wrapper, or MDX table component |
| **Tabs / accordions** | Theme-specific classes + inline JS or widget | `radix-ui` / headless tabs, or static `<details>` |
| **Images** | `<img src="{{media url='wysiwyg/...'}}">` | `next/image` with known width/height; migrate files to CDN or `/public` |
| **Videos** | iframe embeds | `next/script` or sanitized iframe component |
| **Lists** | `ul.feature-list`, icon fonts | Map to design system list component |

---

## Common CSS classes (to reconcile with your export)

After running the analyzer, use the **Generated: common CSS classes** table in `_cms-template-catalog.generated.md`. Typical Magento 2 / Luma-adjacent classes you may see:

| Class (examples) | Role |
|------------------|------|
| `page-wrapper`, `page-main`, `columns` | Layout shell |
| `row`, `col-*`, `container` | Grid (if Bootstrap or hybrid theme) |
| `content`, `std` | WYSIWYG wrapper |
| `action`, `primary`, `secondary` | Buttons |
| `message`, `note` | Alerts / notes |

**Action:** Map high-frequency classes to Tailwind utilities or shared React layout components; deprecate unused theme CSS.

---

## Magento directive reference

Directives appear inside `content` as `{{ ... }}`. The analyzer lists **every distinct directive string** and approximate page frequency.

| Directive | Meaning | Next.js / React replacement |
|-----------|---------|-----------------------------|
| `{{media url="wysiwyg/..."}}` | Resolves to `/media/wysiwyg/...` (or CDN) | Static import, `next/image`, or absolute URL after media migration |
| `{{media url="& theme ..."}}` | Theme static asset | `/public` or design-system asset |
| `{{store url='...'}}` | Store-scoped URL | `next/link` `href` or `NEXT_PUBLIC_SITE_URL` + path |
| `{{config path='...'}}` | Core config value | Env var or server config |
| `{{widget type="..." ...}}` | Renders a block/widget (products, forms, etc.) | Dedicated React component + Medusa / API data |
| `{{block class="..." ...}}` | CMS block reference | React component or `fetch` CMS fragment from new CMS |
| `{{trans ...}}` | Translation | `next-intl` / dictionary keys |
| `{{depend}}` / `{{if}}` | Conditional (email/CMS) | JSX conditionals |
| `{{customvar code=...}}` | Custom variable | Config or env |

**Widgets** often encode catalog lists, sliders, or contact forms — each `type=` needs a **named migration task** (implement component + data source).

---

## Illustrative HTML example (NOT from production)

The following is **generic Magento-style WYSIWYG markup** for structure only. **Replace** with analyzer output for real patterns.

```html
<div class="std">
  <div class="row">
    <div class="col-md-8">
      <h1>Page Title</h1>
      <p>Intro copy with a <a href="{{store url='customer/account/'}}">link</a>.</p>
      <p>
        <img
          src="{{media url='wysiwyg/campaign/banner.jpg'}}"
          alt="Campaign"
          width="800"
          height="400"
        />
      </p>
    </div>
    <div class="col-md-4">
      {{widget type="Magento\Catalog\Block\Product\Widget\NewWidget" template="..."}}
    </div>
  </div>
</div>
```

**Migration notes for the example:**

- `{{store url='...'}}` → `<Link href="/customer/account">` (or correct route in new IA).
- `{{media url='...'}}` → migrate file to R2/S3/public and reference stable URL.
- `{{widget type=...}}` → implement `NewProducts` (or equivalent) as a server component querying Medusa.

---

## QA checklist (before deleting Magento CMS)

- [ ] Every **active** `identifier` has a route or redirect in Next.js.
- [ ] All **widgets** in top clusters have React equivalents or are intentionally removed.
- [ ] **Meta** (title/description) for high-traffic pages matched (Magento may use `meta_title` / layout XML — CMS pages may need extra export).
- [ ] **Internal links** updated if URL structure changes.
- [ ] **Forms** (widget or embedded) post to new endpoints (HubSpot, Medusa, etc.).

---

## Related files

| File | Purpose |
|------|---------|
| `docs/magento-cms-export.sql` | SQL snippets for audits |
| `scripts/export-magento-cms-pages.py` | Optional JSON export via PyMySQL |
| `scripts/analyze-magento-cms-content.mjs` | Clusters pages, emits Markdown with **real HTML** |
