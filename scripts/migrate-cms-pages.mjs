#!/usr/bin/env node
// Migrate 481 KEEP CMS pages from docs/cms-pages-full-export.tsv into Supabase cms_pages.
// Reads KEEP page_ids from docs/cms-page-audit.md.
// Parse TSV carefully because content cells span multiple lines (HTML with embedded \n).

import { readFileSync, createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import readline from 'node:readline/promises';
import { resolveStorefrontSupabaseFromEnv } from './storefront-supabase-env.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const env = Object.fromEntries(
  readFileSync(resolve(REPO_ROOT, '.env.local'), 'utf8')
    .split(/\r?\n/)
    .filter(l => l && !l.startsWith('#'))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1)]; })
);
const creds = resolveStorefrontSupabaseFromEnv(env);
if (!creds) {
  console.error('Missing storefront Supabase: set BOSTERBIO_SUPABASE_URL + BOSTERBIO_SUPABASE_KEY or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY in .env.local');
  process.exit(1);
}
const SUPABASE_URL = creds.url;
const SERVICE_KEY = creds.key;

// Step 1: Extract KEEP page_ids from cms-page-audit.md
const audit = readFileSync(resolve(REPO_ROOT, 'docs/cms-page-audit.md'), 'utf8');
const keepSection = audit.split('## KEEP')[1].split('## DROP')[0];
const keepIds = new Set(
  Array.from(keepSection.matchAll(/^\| (\d+) \|/gm)).map(m => Number(m[1]))
);
console.log(`KEEP page_ids: ${keepIds.size}`);

// Step 2: Stream-parse TSV with multi-line content cells
const TSV_PATH = resolve(REPO_ROOT, 'docs/cms-pages-full-export.tsv');
const records = [];
{
  const stream = createReadStream(TSV_PATH, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
  let cur = null;
  let isHeader = true;
  for await (const line of rl) {
    if (isHeader) { isHeader = false; continue; } // skip header row
    // A new record starts with: <digit+>\t<rest>
    // The content field is the LAST tab-separated field; it can include newlines.
    const m = line.match(/^(\d+)\t/);
    if (m) {
      // Push the previous accumulated record
      if (cur) records.push(cur);
      const cols = line.split('\t');
      // Expected 8 columns: page_id, title, identifier, is_active, creation_time, update_time, content_heading, content
      // If <8, the content field starts here but spans more lines.
      cur = {
        legacy_page_id: Number(cols[0]),
        title: cols[1] ?? '',
        identifier: cols[2] ?? '',
        is_active: cols[3] === '1',
        legacy_created_at: cols[4] || null,
        legacy_updated_at: cols[5] || null,
        content_heading: cols[6] ?? '',
        content: cols.slice(7).join('\t'),
      };
    } else {
      // Continuation of previous record's content
      if (cur) cur.content += '\n' + line;
    }
  }
  if (cur) records.push(cur);
}
console.log(`Parsed records: ${records.length}`);

// Step 3: Filter to KEEP only
const keepers = records.filter(r => keepIds.has(r.legacy_page_id));
console.log(`After KEEP filter: ${keepers.length}`);

// Sanity: any KEEP missing from TSV?
const tsvIds = new Set(records.map(r => r.legacy_page_id));
const missing = [...keepIds].filter(id => !tsvIds.has(id));
if (missing.length) console.log(`WARN: ${missing.length} KEEP ids not found in TSV (first 10):`, missing.slice(0, 10));

// Step 4: Normalize timestamps — Magento timestamps look like "2024-06-12 01:02:59" (assume UTC)
// Postgres timestamptz parses '2024-06-12 01:02:59' fine. Empty strings → null.
for (const r of keepers) {
  if (!r.legacy_created_at) r.legacy_created_at = null;
  if (!r.legacy_updated_at) r.legacy_updated_at = null;
  // Trim content of trailing newlines from the multi-line accumulation.
  r.content = (r.content || '').replace(/\s+$/, '');
}

// Step 5: Upload via Supabase REST API in batches with upsert on legacy_page_id
async function upsertBatch(batch) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/cms_pages?on_conflict=legacy_page_id`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(batch),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt.slice(0, 500)}`);
  }
}

const BATCH = 25;
let done = 0;
for (let i = 0; i < keepers.length; i += BATCH) {
  const batch = keepers.slice(i, i + BATCH);
  try {
    await upsertBatch(batch);
    done += batch.length;
    process.stdout.write(`\rUpserted ${done}/${keepers.length}`);
  } catch (e) {
    console.error(`\nBatch ${i / BATCH} failed: ${e.message}`);
    // Try one-by-one to isolate offender
    for (const row of batch) {
      try { await upsertBatch([row]); done++; }
      catch (ee) { console.error(`  page_id=${row.legacy_page_id} (${row.identifier}): ${ee.message.slice(0, 120)}`); }
    }
  }
}
console.log(`\nDone. Upserted ${done}/${keepers.length} CMS pages.`);
