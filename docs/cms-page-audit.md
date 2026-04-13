# CMS Page Audit (Magento 2 → Next.js + Medusa)

## Summary

| Metric | Value |
|--------|--------|
| **Total pages** | **Not retrieved** — production DB was not queried from this environment |
| **Keep** | — (pending export) |
| **Drop** | — (pending export) |
| **Needs review** | — (pending export) |

### Why no row-level audit yet

An automated SSH attempt to the Magento host (`69.27.32.101:2223`, user `boster_ooP9u`) from this workspace failed with **`Connection reset by peer`**. Typical causes: IP allowlisting, firewall, or SSH not exposed to this runner’s egress IP.

**Do not commit database passwords.** Run the queries below from a machine that already has SSH access (VPN/bastion/allowed IP) and paste results into this file, or use the companion SQL file and import into a spreadsheet.

---

## How to pull data (run on trusted host with access)

### 1. SSH + MySQL (use your secure credential flow)

```bash
ssh -p 2223 boster_ooP9u@69.27.32.101
mysql -h 127.0.0.1 -u bosterbio_user -p bosterbio_m2
```

### 2. Main listing

```sql
SELECT page_id, title, identifier, is_active, creation_time, update_time, content_heading
FROM cms_page
ORDER BY is_active DESC, update_time DESC;
```

### 3. Content length (join for one export)

```sql
SELECT
  p.page_id,
  p.identifier,
  p.title,
  p.is_active,
  p.update_time,
  LENGTH(p.content) AS content_length,
  p.content_heading
FROM cms_page p
ORDER BY p.is_active DESC, p.update_time DESC;
```

### 4. Optional: export TSV for categorization

From shell (after SSH), if `mysql` client available:

```bash
mysql -h 127.0.0.1 -u bosterbio_user -p -N -B -e "
SELECT page_id, identifier, title, is_active, update_time, LENGTH(content), content_heading
FROM bosterbio_m2.cms_page
ORDER BY is_active DESC, update_time DESC;
" > cms_page_export.tsv
```

---

## Categorization rules (apply after export)

### KEEP (migrate)

- `is_active = 1` and `LENGTH(content)` above a sensible minimum (e.g. > 500 bytes, tune after sampling).
- Standard legal/info: privacy, terms, shipping, returns, contact, about, FAQ (match `identifier` / `title` patterns).
- Product/category landing pages with clear SEO slugs and non-trivial content.
- Recently updated (`update_time` within last 12–24 months) unless clearly obsolete.

### DROP (do not migrate)

- `is_active = 0` **unless** explicitly flagged as intentional draft (see review).
- Identifiers: `no-route`, `enable-cookies`, `404`, `noroute`, `home` duplicates, Magento defaults that Next.js replaces.
- Titles/identifiers containing: `test`, `draft`, `tmp`, `copy`, `old`, `backup`, `dev`, `staging`.
- `LENGTH(content)` very small (e.g. &lt; 100) and no unique value.
- Obvious expired campaigns (year in title far in the past **and** no evergreen value).

### NEEDS REVIEW

- Active but `update_time` very old (e.g. 5+ years) — open HTML in admin or export `content` snippet.
- Ambiguous titles (“Page”, “New Page”, SKU-like identifiers without context).
- Active with short content — might be redirect stubs or placeholders.
- `is_active = 0` but title suggests legal/compliance — confirm before delete.

**Important:** Spot-check **HTML `content`** for questionable rows (promo blocks, widgets, layout XML references) — length alone is insufficient.

---

## KEEP (migrate these)

| page_id | identifier | title | last_updated | reason |
|---------|------------|-------|--------------|--------|
| *Populate after export* | | | | |

---

## DROP (do not migrate)

| page_id | identifier | title | last_updated | reason |
|---------|------------|-------|--------------|--------|
| *Populate after export* | | | | |

---

## NEEDS REVIEW (manual decision required)

| page_id | identifier | title | last_updated | reason |
|---------|------------|-------|--------------|--------|
| *Populate after export* | | | | |

---

## Next steps

1. Re-run SSH from an allowlisted IP (or use existing bastion).
2. Export `cms_page` with `content_length` (and optionally first 200 chars of `content` for triage).
3. Fill the three tables above; update **Summary** counts.
4. For **Needs review**, open top 50 by traffic (Google Analytics / Search Console) if available — this repo has no traffic data.

---

## Security note

If credentials were shared in chat or tickets, **rotate** DB and SSH access and use a secrets manager. This document intentionally contains **no passwords**.
