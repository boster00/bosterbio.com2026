#!/usr/bin/env node
// Migrate a pilot batch of products from internal-export.csv (live or local sample)
// into Supabase products + product_images.
//
// Usage:
//   node scripts/migrate-products-pilot.mjs [--limit=100] [--source=local|live]
//
// Strategy:
//   - Read CSV with streaming csv-parse (handles quoted multi-line cells)
//   - Sample N products spread across templates
//   - Map columns -> Type A dedicated columns + attr_1..attr_25 per template
//   - Build target_info JSON from gene/protein fields
//   - Split images string -> product_images rows
//   - UPSERT via Supabase REST API on products.sku conflict

import { readFileSync, createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { parse } from 'csv-parse';
import { Readable } from 'node:stream';
import { resolveStorefrontSupabaseFromEnv } from './storefront-supabase-env.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const args = Object.fromEntries(
  process.argv.slice(2).map(a => a.startsWith('--') ? (a.includes('=') ? [a.slice(2).split('=')[0], a.slice(2).split('=')[1]] : [a.slice(2), true]) : [a, true])
);
const LIMIT = Number(args.limit ?? 100);
const SOURCE = args.source ?? 'local'; // local | live

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

// Type B mapping: which CSV columns go into attr_1..attr_25 per template.
// Derived from product-attributes-migration-plan.md "Category 2 Attribute Mapping".
const TYPE_B_COLUMNS = [
  'kit_components', 'cross_reactivity', 'reconstitution', 'predicted_reactivity',
  'recommended_detection_systems', 'sensitivity', 'reproducibility', 'assay_range',
  'sample_type', 'sequence_similarities', 'description_before_attributes',
  'description_after_attributes', 'immunogen', 'purification', 'concentration',
  'form', 'isotype', 'tissue_specificity', 'subcellular_localization',
  'molecular_weight', 'principle', 'tmb_incubation_time',
  'intra_inter_assay_cv', 'sample_data', 'application_details',
];
// Allow up to 25 attrs (matches schema). If more candidates exist, the extras are dropped.

const TARGET_INFO_FIELDS = ['gene_name', 'uniprot_id', 'synonyms', 'protein_function', 'gene_full_name', 'protein_name'];

function parseArrayString(s) {
  if (!s) return [];
  // Magento applications like "WB,IHC,IF,ELISA" or "WB|IHC|IF" or comma-separated
  return s.split(/[,;|]/).map(x => x.trim()).filter(Boolean);
}

function parseImages(rawImages, rawLabels) {
  if (!rawImages) return [];
  // Magento uses | as the delimiter between multiple image paths.
  // Each path looks like "/a/0/foo.jpg" and needs the CDN prefix.
  const paths = rawImages.split(/[|]/).map(s => s.trim()).filter(Boolean);
  const labels = (rawLabels || '').split(/[|]/).map(s => s.trim());
  return paths.map((p, i) => ({
    image_url: p.startsWith('http') ? p : `https://www.bosterbio.com/media/catalog/product${p.startsWith('/') ? p : '/' + p}`,
    alt_text: labels[i] || null,
    type: i === 0 ? 'hero' : 'gallery',
    position: i,
  }));
}

function rowToProduct(row) {
  const target_info = {};
  for (const f of TARGET_INFO_FIELDS) if (row[f]) target_info[f] = row[f];

  const product = {
    sku: row.sku?.trim(),
    title: row.name?.trim() || row.sku?.trim(),
    handle: row.url_key?.trim() || row.sku?.trim(),
    product_template: row.template?.trim() || 'antibodies',
    category: row.product_category?.trim() || null,
    status: (row.status || '1') === '1' ? 'enabled' : 'disabled',
    reactivity: parseArrayString(row.reactivity),
    applications: parseArrayString(row.applications),
    clone: [row.clonality, row.clone_number].filter(Boolean).join(' ').trim() || null,
    host_species: row.host?.trim() || null,
    badges: row.badges?.trim() || null,
    target_info,
    description: row.description || null,
    short_description: row.short_description || null,
    background: row.background || null,
    storage: row.storage || null,
    meta_title: row.meta_title || null,
    meta_description: row.meta_description || null,
    meta_keywords: row.meta_keyword || null,
    search_index: [row.sku, row.name, row.gene_name, row.uniprot_id, row.synonyms]
      .filter(Boolean).join(' '),
  };

  // Map Type B → attr_1..attr_25 (template-agnostic for now; per-template mapping
  // refined when seeding attribute_definitions)
  for (let i = 0; i < TYPE_B_COLUMNS.length && i < 25; i++) {
    const col = TYPE_B_COLUMNS[i];
    product[`attr_${i + 1}`] = row[col] || null;
  }

  return product;
}

async function pickProductsFromStream(source, limit) {
  // We want a balanced sample across templates: target ~limit/12 per template.
  const TEMPLATES = ['antibodies','elisa-kits','proteins','over-expression-lysates',
    'cell-based-elisa-kits','cell-based-phospho-elisa-kits','custom-description',
    'ez-set','tag-quick-elisa-kits','veterinary-diagnostic-kits','elisa-kits-custom-components'];
  const perTemplate = Math.max(1, Math.ceil(limit / TEMPLATES.length));
  const counts = Object.fromEntries(TEMPLATES.map(t => [t, 0]));

  const picks = [];
  let stream;
  if (source === 'live') {
    console.log('Fetching from live URL (range request, first 200MB)...');
    const res = await fetch('https://www.bosterbio.com/internal-export.csv', {
      headers: { Range: 'bytes=0-209715200' },
    });
    if (!res.ok && res.status !== 206) throw new Error(`Live fetch failed: ${res.status}`);
    stream = Readable.fromWeb(res.body);
  } else {
    stream = createReadStream(resolve(REPO_ROOT, 'tmp/bosterbio_sample.csv'));
  }

  const parser = stream.pipe(parse({
    columns: true,
    bom: true,
    skip_records_with_error: true,
    relax_quotes: true,
    relax_column_count: true,
    trim: false,
  }));

  for await (const row of parser) {
    const tpl = (row.template || '').trim();
    if (!tpl || !counts.hasOwnProperty(tpl)) continue;
    if (counts[tpl] >= perTemplate) continue;
    if (!row.sku || !row.url_key) continue;
    picks.push(row);
    counts[tpl]++;
    if (picks.length >= limit) break;
  }
  console.log('Picked counts:', counts);
  return picks.slice(0, limit);
}

async function upsertProducts(products) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/products?on_conflict=sku`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(products),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt.slice(0, 800)}`);
  }
  return res.json();
}

async function upsertImages(images) {
  if (!images.length) return;
  // Delete existing images first per product to avoid dupe rows on re-run
  const productIds = [...new Set(images.map(i => i.product_id))];
  if (productIds.length) {
    await fetch(`${SUPABASE_URL}/rest/v1/product_images?product_id=in.(${productIds.join(',')})`, {
      method: 'DELETE',
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    });
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/product_images`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(images),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status} on images: ${txt.slice(0, 500)}`);
  }
}

// ---- Main ----
console.log(`Pilot migration: limit=${LIMIT} source=${SOURCE}`);
const rows = await pickProductsFromStream(SOURCE, LIMIT);
console.log(`Selected ${rows.length} rows`);

const products = rows.map(rowToProduct);
const inserted = await upsertProducts(products);
console.log(`Upserted ${inserted.length} products`);

// Map sku -> id
const skuToId = Object.fromEntries(inserted.map(p => [p.sku, p.id]));

// Build images
const images = [];
for (const row of rows) {
  const id = skuToId[row.sku];
  if (!id) continue;
  for (const img of parseImages(row.images, row.image_labels)) {
    images.push({ product_id: id, ...img });
  }
}
console.log(`Inserting ${images.length} product_images rows`);
if (images.length) await upsertImages(images);
console.log('Pilot migration complete.');
