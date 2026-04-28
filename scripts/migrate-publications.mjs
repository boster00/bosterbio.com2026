#!/usr/bin/env node
// Migrate publications + product_publications from Magento (boster_publications table)
// into Supabase publications + product_publications.
//
// Strategy:
//   1. SSH to Magento, export needed columns as TSV to stdout
//   2. Stream-parse TSV, batch-upsert into Supabase publications
//   3. Build product_publications links by matching domestic_sku → products.sku
//
// Usage: node scripts/migrate-publications.mjs [--limit=N]

import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const args = Object.fromEntries(
  process.argv.slice(2).map(a => a.startsWith('--') ? (a.includes('=') ? [a.slice(2).split('=')[0], a.slice(2).split('=')[1]] : [a.slice(2), true]) : [a, true])
);
const LIMIT = args.limit ? Number(args.limit) : null;

const env = Object.fromEntries(
  readFileSync(resolve(REPO_ROOT, '.env.local'), 'utf8')
    .split(/\r?\n/).filter(l => l && !l.startsWith('#'))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1)]; })
);
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SECRETE_KEY;

const MAGENTO_DB = "mysql -h 127.0.0.1 -u bosterbio_user -p'C67*b4@VDNYyJZm8' bosterbio_m2";
const SQL = `SELECT id, domestic_sku, title, doi, pubmed_id, publication_date, journal, impact_factor_if, author, application FROM boster_publications WHERE title IS NOT NULL AND TRIM(title) != ''${LIMIT ? ` LIMIT ${LIMIT}` : ''}`;

console.log(`Exporting publications via SSH (${LIMIT ? `LIMIT ${LIMIT}` : 'ALL'})...`);

// Run mysql via SSH and capture stdout
const sshArgs = ['-p', '2223', '-o', 'BatchMode=yes', 'boster_ooP9u@69.27.32.101', `${MAGENTO_DB} -B -e "${SQL.replace(/"/g, '\\"')}"`];

const proc = spawn('ssh', sshArgs, { stdio: ['ignore', 'pipe', 'inherit'] });

let buffer = '';
const records = [];
let header = null;
let lineCount = 0;

proc.stdout.on('data', chunk => {
  buffer += chunk.toString('utf8');
  const lines = buffer.split('\n');
  buffer = lines.pop() ?? ''; // keep incomplete last line
  for (const line of lines) {
    lineCount++;
    if (!header) {
      header = line.split('\t');
      continue;
    }
    if (!line.trim()) continue;
    const cols = line.split('\t');
    const obj = {};
    for (let i = 0; i < header.length; i++) obj[header[i]] = cols[i] ?? '';
    records.push(obj);
  }
});

await new Promise((resolveP, rejectP) => {
  proc.on('close', code => code === 0 ? resolveP() : rejectP(new Error('ssh/mysql exit ' + code)));
});

if (buffer.trim()) {
  // last line without trailing newline
  const cols = buffer.split('\t');
  const obj = {};
  for (let i = 0; i < header.length; i++) obj[header[i]] = cols[i] ?? '';
  records.push(obj);
}

console.log(`Streamed ${lineCount} lines, ${records.length} records`);

// Step 2: convert to publications rows
function emptyToNull(s) { return s == null || s === '' || s === 'NULL' ? null : s; }

const pubRows = records.map(r => {
  const dateStr = emptyToNull(r.publication_date);
  let year = null;
  if (dateStr && /^\d{4}/.test(dateStr)) year = parseInt(dateStr.slice(0, 4), 10);
  const doi = emptyToNull(r.doi);
  const pubmed = emptyToNull(r.pubmed_id);
  return {
    legacy_id: parseInt(r.id, 10),
    title: emptyToNull(r.title)?.slice(0, 1000),
    authors: emptyToNull(r.author)?.slice(0, 1000),
    journal: emptyToNull(r.journal)?.slice(0, 500),
    year,
    pubmed_id: pubmed,
    doi,
    url: doi ? `https://doi.org/${doi}` : (pubmed ? `https://pubmed.ncbi.nlm.nih.gov/${pubmed}/` : null),
    raw: {
      domestic_sku: r.domestic_sku || null,
      impact_factor_if: r.impact_factor_if || null,
      application: r.application || null,
      publication_date: dateStr,
    },
  };
});

console.log(`Built ${pubRows.length} publication rows; pushing to Supabase...`);

async function upsertBatch(table, rows, conflict) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?on_conflict=${conflict}`, {
    method: 'POST',
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt.slice(0, 500)}`);
  }
}

const BATCH = 100;
let done = 0;
for (let i = 0; i < pubRows.length; i += BATCH) {
  const slice = pubRows.slice(i, i + BATCH);
  try { await upsertBatch('publications', slice, 'legacy_id'); done += slice.length; }
  catch (e) { console.error(`\nBatch ${i / BATCH}: ${e.message.slice(0, 200)}`); }
  if ((i / BATCH) % 10 === 0) process.stdout.write(`\rUpserted ${done}/${pubRows.length}`);
}
console.log(`\nUpserted ${done} publications.`);

// Step 3: build product_publications links
console.log('Building product_publications links...');

// Read all SKUs from supabase products (paginate Range header to bypass 1000 default)
async function fetchAllRows(table, select) {
  const out = [];
  const PAGE = 5000;
  let offset = 0;
  for (;;) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${select}&offset=${offset}&limit=${PAGE}`, {
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, Range: `${offset}-${offset + PAGE - 1}` },
    });
    if (!res.ok) throw new Error(`fetch ${table}: ${res.status}`);
    const rows = await res.json();
    out.push(...rows);
    if (rows.length < PAGE) break;
    offset += PAGE;
  }
  return out;
}

const products = await fetchAllRows('products', 'id,sku');
const skuToProductId = new Map(products.map(p => [p.sku.trim().toUpperCase(), p.id]));
console.log(`Loaded ${skuToProductId.size} product SKUs`);

const pubs = await fetchAllRows('publications', 'id,legacy_id');
const legacyToPubId = new Map(pubs.map(p => [p.legacy_id, p.id]));
console.log(`Loaded ${legacyToPubId.size} publications back`);

// Build links: only keep records whose domestic_sku matches a product
const links = [];
for (const r of records) {
  const sku = (r.domestic_sku || '').trim().toUpperCase();
  if (!sku) continue;
  const productId = skuToProductId.get(sku);
  const pubId = legacyToPubId.get(parseInt(r.id, 10));
  if (productId && pubId) links.push({ product_id: productId, publication_id: pubId, position: 0 });
}
console.log(`Will create ${links.length} product↔publication links`);

let linkDone = 0;
for (let i = 0; i < links.length; i += BATCH) {
  const slice = links.slice(i, i + BATCH);
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/product_publications`, {
      method: 'POST',
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, 'Content-Type': 'application/json', Prefer: 'resolution=ignore-duplicates,return=minimal' },
      body: JSON.stringify(slice),
    });
    if (!res.ok && res.status !== 409) {
      const txt = await res.text();
      console.error(`\nLink batch ${i / BATCH} HTTP ${res.status}: ${txt.slice(0, 200)}`);
    }
    linkDone += slice.length;
  } catch (e) {
    console.error(`\nLink batch ${i / BATCH}: ${e.message.slice(0, 200)}`);
  }
  if ((i / BATCH) % 10 === 0) process.stdout.write(`\rLinks ${linkDone}/${links.length}`);
}
console.log(`\nDone. ${done} publications + ${linkDone} links.`);
