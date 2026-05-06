#!/usr/bin/env node
// Deeper-range product migration — fetches a custom byte range of the live CSV
// to cover the templates that fall after the first 200 MB (over-expression-lysates,
// veterinary-diagnostic-kits) and to add depth to existing templates.
//
// Usage: node scripts/migrate-products-deeper.mjs [--start=200000000] [--length=200000000] [--limit=2000]

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { parse } from 'csv-parse';
import { Readable } from 'node:stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const args = Object.fromEntries(
  process.argv.slice(2).map(a => a.startsWith('--') ? (a.includes('=') ? [a.slice(2).split('=')[0], a.slice(2).split('=')[1]] : [a.slice(2), true]) : [a, true])
);
const START = Number(args.start ?? 200_000_000);
const LENGTH = Number(args.length ?? 200_000_000);
const LIMIT = Number(args.limit ?? 2000);

const env = Object.fromEntries(
  readFileSync(resolve(REPO_ROOT, '.env.local'), 'utf8').split(/\r?\n/).filter(l => l && !l.startsWith('#')).map(l => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1)]; })
);
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SECRETE_KEY;

// Reuse same TYPE_B_COLUMNS + helpers from migrate-products-pilot.mjs
const TYPE_B_COLUMNS = [
  'kit_components', 'cross_reactivity', 'reconstitution', 'predicted_reactivity',
  'recommended_detection_systems', 'sensitivity', 'reproducibility', 'assay_range',
  'sample_type', 'sequence_similarities', 'description_before_attributes',
  'description_after_attributes', 'immunogen', 'purification', 'concentration',
  'form', 'isotype', 'tissue_specificity', 'subcellular_localization',
  'molecular_weight', 'principle', 'tmb_incubation_time',
  'intra_inter_assay_cv', 'sample_data', 'application_details',
];
const TARGET_INFO_FIELDS = ['gene_name', 'uniprot_id', 'synonyms', 'protein_function', 'gene_full_name', 'protein_name'];

function parseArrayString(s) { if (!s) return []; return s.split(/[,;|]/).map(x => x.trim()).filter(Boolean); }
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

// We need column names; this range starts mid-file (no header). Hardcode columns.
const HEADER = [
  'sku','status','name','url_key','product_category','gene_name','phospho_site','price',
  'size_1','price_for_size_1','size_2','price_for_size_2','size_3','price_for_size_3',
  'size_4','price_for_size_4','size_5','price_for_size_5','size_6','price_for_size_6',
  'size_7','price_for_size_7','size_8','price_for_size_8','size_9','price_for_size_9',
  'size_10','price_for_size_10','badges','ribbons','transfer_price','assay_range','clonality',
  'clone_number','concentration','conjugate','contents','description','short_description',
  'size','uniprot_id','host','immunogen','form','purification','storage','cross_reactivity',
  'isotype','reconstitution','sensitivity','kit_components','sample_type','application_details',
  'applications','source','tag','reactivity','predicted_reactivity','images','image_labels',
  'sample_data','custom_options','created_at','updated_at','category_ids','custom_listing_information',
  'description_after_attributes','description_before_attributes','meta_title','meta_keyword',
  'meta_description','application_notes','rating_value','source_company','anticoagulant',
  'assay_procedure_step_1','background','competitor_equivalent_skus','research_category',
  'synonyms','gene_full_name','molecular_weight','protein_function','subcellular_localization',
  'tissue_specificity','protein_name','recommended_detection_systems','sequence_similarities',
  'intra_inter_assay_cv','reproducibility','tmb_incubation_time','principle','normal_range_citations',
  'custom_attribute_1','custom_attribute_2','custom_attribute_3','custom_attribute_4',
  'custom_attribute_5','custom_attribute_6','template'
];

function parseListPriceUsd(row) {
  const raw = row.price ?? row.price_for_size_1
  if (raw == null || String(raw).trim() === "") return null
  const n = parseFloat(String(raw).replace(/[^0-9.-]/g, ""))
  if (!Number.isFinite(n) || n <= 0) return null
  return n
}

function rowToProduct(row) {
  const target_info = {};
  for (const f of TARGET_INFO_FIELDS) if (row[f]) target_info[f] = row[f];
  const list_price = parseListPriceUsd(row)
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
    search_index: [row.sku, row.name, row.gene_name, row.uniprot_id, row.synonyms].filter(Boolean).join(' '),
    ...(list_price != null ? { list_price } : {}),
  };
  for (let i = 0; i < TYPE_B_COLUMNS.length && i < 25; i++) {
    product[`attr_${i + 1}`] = row[TYPE_B_COLUMNS[i]] || null;
  }
  return product;
}

console.log(`Deeper migration: range bytes=${START}-${START + LENGTH - 1} limit=${LIMIT}`);
const res = await fetch('https://www.bosterbio.com/internal-export.csv', {
  headers: { Range: `bytes=${START}-${START + LENGTH - 1}` },
});
if (!res.ok && res.status !== 206) throw new Error(`Range fetch failed: ${res.status}`);

// Skip past the partial first row (we started mid-row most likely).
// Read until we hit a newline, then start parsing from there.
let stream = Readable.fromWeb(res.body);

// Wrap stream to skip until first \n
let firstLine = true;
const parser = stream.pipe(parse({
  columns: HEADER,
  bom: false,
  skip_records_with_error: true,
  relax_quotes: true,
  relax_column_count: true,
  trim: false,
}));

const TEMPLATES = ['antibodies','elisa-kits','proteins','over-expression-lysates','cell-based-elisa-kits','cell-based-phospho-elisa-kits','custom-description','ez-set','tag-quick-elisa-kits','veterinary-diagnostic-kits','elisa-kits-custom-components'];
const counts = Object.fromEntries(TEMPLATES.map(t => [t, 0]));
// Per-template cap: with 11 templates and a generous limit, allow ~LIMIT/2 per template.
// Earlier capping at LIMIT/templates left too much on the table when antibodies dominate the file.
const perTemplate = Math.max(50, Math.ceil(LIMIT / 2));
const picks = [];

for await (const row of parser) {
  if (firstLine) { firstLine = false; continue; } // skip first record (likely partial)
  const tpl = (row.template || '').trim();
  if (!tpl || !counts.hasOwnProperty(tpl)) continue;
  if (counts[tpl] >= perTemplate) continue;
  if (!row.sku || !row.url_key) continue;
  picks.push(row);
  counts[tpl]++;
  if (picks.length >= LIMIT) break;
}
console.log('Picked counts:', counts);

const products = picks.map(rowToProduct);
console.log(`Pushing ${products.length} products`);

async function upsertProducts(rows) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/products?on_conflict=sku`, {
    method: 'POST',
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify(rows),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${(await r.text()).slice(0, 500)}`);
  return r.json();
}

const BATCH = 50;
const inserted = [];
for (let i = 0; i < products.length; i += BATCH) {
  const slice = products.slice(i, i + BATCH);
  try { inserted.push(...await upsertProducts(slice)); }
  catch (e) {
    console.error(`\nBatch ${i / BATCH}: ${e.message.slice(0, 200)}`);
    for (const p of slice) {
      try { inserted.push(...await upsertProducts([p])); }
      catch (ee) { console.error(`  ${p.sku}: ${ee.message.slice(0, 100)}`); }
    }
  }
  if ((i / BATCH) % 5 === 0) process.stdout.write(`\rUpserted ${inserted.length}/${products.length}`);
}
console.log(`\nUpserted ${inserted.length} products`);

// Build images
const skuToId = Object.fromEntries(inserted.map(p => [p.sku, p.id]));
const images = [];
for (const row of picks) {
  const id = skuToId[row.sku];
  if (!id) continue;
  for (const img of parseImages(row.images, row.image_labels)) {
    images.push({ product_id: id, ...img });
  }
}
console.log(`Inserting ${images.length} images`);
if (images.length) {
  // Delete existing images for these products first
  const productIds = [...new Set(images.map(i => i.product_id))];
  if (productIds.length) {
    await fetch(`${SUPABASE_URL}/rest/v1/product_images?product_id=in.(${productIds.join(',')})`, {
      method: 'DELETE', headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    });
  }
  for (let i = 0; i < images.length; i += 200) {
    const slice = images.slice(i, i + 200);
    await fetch(`${SUPABASE_URL}/rest/v1/product_images`, {
      method: 'POST',
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(slice),
    });
  }
}
console.log('Done.');
