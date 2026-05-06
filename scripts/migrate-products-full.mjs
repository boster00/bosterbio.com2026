#!/usr/bin/env node
/**
 * Full-catalog product migration: stream Magento internal-export.csv into Supabase.
 *
 * - Preserves column 100 `template` → products.product_template (all templates; no whitelist).
 * - Upserts on sku; uses handle = url_key when unique-friendly, falls back to sku.
 * - Stores CSV price + size/price ladder in metadata for PDP/PLP.
 *
 * Usage:
 *   node scripts/migrate-products-full.mjs [--source=live|path.csv] [--batch=200] [--limit=0] [--skip-images]
 *
 * Env (or apps/web/.env.local): NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY
 * Optional: BOSTERBIO_SUPABASE_URL + BOSTERBIO_SUPABASE_KEY
 */

import { createReadStream, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { parse } from "csv-parse";
import { Readable } from "node:stream";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) =>
    a.startsWith("--")
      ? a.includes("=")
        ? [a.slice(2).split("=")[0], a.slice(2).split("=")[1]]
        : [a.slice(2), true]
      : [a, true],
  ),
);

const BATCH = Math.max(10, Number(args.batch ?? 200));
const LIMIT = Number(args.limit ?? 0); // 0 = no limit
const SOURCE = args.source ?? "live";
const SKIP_IMAGES = Boolean(args["skip-images"]);

function loadEnvFile() {
  const p = resolve(REPO_ROOT, "apps/web/.env.local");
  if (!existsSync(p)) return {};
  return Object.fromEntries(
    readFileSync(p, "utf8")
      .split(/\r?\n/)
      .filter((l) => l && !l.startsWith("#"))
      .map((l) => {
        const i = l.indexOf("=");
        return [l.slice(0, i), l.slice(i + 1).replace(/^["']|["']$/g, "")];
      }),
  );
}

const fileEnv = loadEnvFile();
const SUPABASE_URL =
  process.env.BOSTERBIO_SUPABASE_URL?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
  fileEnv.NEXT_PUBLIC_SUPABASE_URL?.trim();
const SERVICE_KEY =
  process.env.BOSTERBIO_SUPABASE_KEY?.trim() ||
  process.env.SUPABASE_SECRETE_KEY?.trim() ||
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
  fileEnv.SUPABASE_SECRETE_KEY?.trim();

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "Missing Supabase URL or service key. Set BOSTERBIO_* or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY or apps/web/.env.local",
  );
  process.exit(1);
}

const TYPE_B_COLUMNS = [
  "kit_components",
  "cross_reactivity",
  "reconstitution",
  "predicted_reactivity",
  "recommended_detection_systems",
  "sensitivity",
  "reproducibility",
  "assay_range",
  "sample_type",
  "sequence_similarities",
  "description_before_attributes",
  "description_after_attributes",
  "immunogen",
  "purification",
  "concentration",
  "form",
  "isotype",
  "tissue_specificity",
  "subcellular_localization",
  "molecular_weight",
  "principle",
  "tmb_incubation_time",
  "intra_inter_assay_cv",
  "sample_data",
  "application_details",
];

const TARGET_INFO_FIELDS = [
  "gene_name",
  "uniprot_id",
  "synonyms",
  "protein_function",
  "gene_full_name",
  "protein_name",
];

function parseArrayString(s) {
  if (!s) return [];
  return s.split(/[,;|]/).map((x) => x.trim()).filter(Boolean);
}

function parseImages(rawImages, rawLabels) {
  if (!rawImages) return [];
  const paths = rawImages.split(/[|]/).map((s) => s.trim()).filter(Boolean);
  const labels = (rawLabels || "").split(/[|]/).map((s) => s.trim());
  return paths.map((p, i) => ({
    image_url: p.startsWith("http")
      ? p
      : `https://www.bosterbio.com/media/catalog/product${p.startsWith("/") ? p : "/" + p}`,
    alt_text: labels[i] || null,
    type: i === 0 ? "hero" : "gallery",
    position: i,
  }));
}

function slugHandle(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return "";
  return s.replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "";
}

function buildFormatOptions(row) {
  const options = [];
  for (let i = 1; i <= 10; i++) {
    const szRaw = row[`size_${i}`];
    const prRaw = row[`price_for_size_${i}`];
    const sz = szRaw != null ? String(szRaw).trim() : "";
    const pr = prRaw != null ? String(prRaw).trim() : "";
    if (!sz && !pr) continue;
    const label = sz || `Option ${i}`;
    options.push({
      label,
      price: pr || null,
      display: pr ? `${label} — $${pr}` : label,
    });
  }
  return options;
}

function buildMetadata(row) {
  const format_options = buildFormatOptions(row);
  const formats_ladder = format_options.map((o) => o.display);
  const t = (v) => (typeof v === "string" ? v.trim() : v ? String(v).trim() : "");
  return {
    csv_price: t(row.price) || null,
    conjugate: t(row.conjugate) || null,
    contents: t(row.contents) || null,
    source: t(row.source) || null,
    tag: t(row.tag) || null,
    format_options,
    formats_ladder,
    url_key_raw: t(row.url_key) || null,
  };
}

function rowToProduct(row) {
  const sku = (row.sku ?? "").trim();
  const urlKey = (row.url_key ?? "").trim();
  const handleBase = slugHandle(urlKey) || slugHandle(sku) || sku;
  const templateRaw = row.template != null ? String(row.template).trim() : "";
  const product_template = templateRaw || "antibodies";

  const target_info = {};
  for (const f of TARGET_INFO_FIELDS) if (row[f]) target_info[f] = row[f];

  const metadata = buildMetadata(row);

  const product = {
    sku,
    title: (row.name ?? "").trim() || sku,
    handle: handleBase || sku,
    product_template,
    category: (row.product_category ?? "").trim() || null,
    status: (row.status || "1") === "1" ? "enabled" : "disabled",
    reactivity: parseArrayString(row.reactivity),
    applications: parseArrayString(row.applications),
    clone: [row.clonality, row.clone_number].filter(Boolean).join(" ").trim() || null,
    host_species: (row.host ?? "").trim() || null,
    badges: (row.badges ?? "").trim() || null,
    target_info,
    description: row.description || null,
    short_description: row.short_description || null,
    background: row.background || null,
    storage: row.storage || null,
    meta_title: row.meta_title || null,
    meta_description: row.meta_description || null,
    meta_keywords: row.meta_keyword || null,
    metadata,
    search_index: [row.sku, row.name, row.gene_name, row.uniprot_id, row.synonyms].filter(Boolean).join(" "),
  };

  for (let i = 0; i < TYPE_B_COLUMNS.length && i < 25; i++) {
    const col = TYPE_B_COLUMNS[i];
    product[`attr_${i + 1}`] = row[col] || null;
  }

  return product;
}

async function upsertProducts(products) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/products?on_conflict=sku`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(products),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt.slice(0, 800)}`);
  }
  return res.json();
}

async function upsertProductsWithHandleFallback(batch) {
  try {
    return await upsertProducts(batch);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (!msg.includes("products_handle_key") && !msg.includes("handle")) throw e;
    const retried = [];
    for (const p of batch) {
      const sku = p.sku;
      const fixed = { ...p, handle: slugHandle(sku) || sku };
      try {
        retried.push(...(await upsertProducts([fixed])));
      } catch {
        retried.push(...(await upsertProducts([{ ...p, handle: `${p.handle}-${sku}`.slice(0, 200) }])));
      }
    }
    return retried;
  }
}

async function deleteImagesForProducts(productIds) {
  if (!productIds.length) return;
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/product_images?product_id=in.(${productIds.join(",")})`,
    { method: "DELETE", headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } },
  );
  if (!res.ok) console.warn("product_images delete:", await res.text());
}

async function insertImages(images) {
  if (!images.length) return;
  for (let i = 0; i < images.length; i += 300) {
    const slice = images.slice(i, i + 300);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/product_images`, {
      method: "POST",
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(slice),
    });
    if (!res.ok) throw new Error(`images ${res.status}: ${(await res.text()).slice(0, 400)}`);
  }
}

function openCsvStream() {
  if (SOURCE !== "live") {
    return createReadStream(resolve(REPO_ROOT, SOURCE));
  }
  console.log("Streaming https://www.bosterbio.com/internal-export.csv …");
  return Readable.fromWeb(
    /** @type {ReadableStream} */ (
      await fetch("https://www.bosterbio.com/internal-export.csv").then((r) => {
        if (!r.ok) throw new Error(`Live CSV fetch failed: ${r.status}`);
        return r.body;
      })
    ),
  );
}

async function flushChunk(csvRows, processedRef) {
  if (!csvRows.length) return;
  const products = csvRows.map(rowToProduct);
  const inserted = await upsertProductsWithHandleFallback(products);
  const idBySku = new Map(inserted.map((p) => [p.sku, p.id]));

  if (!SKIP_IMAGES) {
    const images = [];
    for (const row of csvRows) {
      const sku = (row.sku ?? "").trim();
      const id = idBySku.get(sku);
      if (!id) continue;
      for (const img of parseImages(row.images, row.image_labels)) {
        images.push({ product_id: id, ...img });
      }
    }
    const ids = [...new Set(images.map((i) => i.product_id))];
    await deleteImagesForProducts(ids);
    await insertImages(images);
  }

  processedRef.count += csvRows.length;
  process.stdout.write(`\rUpserted ${processedRef.count} products…`);
}

// ---- main ----
console.log(`migrate-products-full source=${SOURCE} batch=${BATCH} limit=${LIMIT || "∞"} skip_images=${SKIP_IMAGES}`);

const stream = await openCsvStream();
const parser = stream.pipe(
  parse({
    columns: true,
    bom: true,
    skip_records_with_error: true,
    relax_quotes: true,
    relax_column_count: true,
    trim: false,
  }),
);

const processedRef = { count: 0 };
let chunk = [];
let accepted = 0;

for await (const row of parser) {
  const sku = (row.sku ?? "").trim();
  if (!sku) continue;
  if (LIMIT > 0 && accepted >= LIMIT) break;
  chunk.push(row);
  accepted++;
  if (chunk.length >= BATCH) {
    await flushChunk(chunk, processedRef);
    chunk = [];
  }
}

if (chunk.length) await flushChunk(chunk, processedRef);

console.log(`\nDone. Total upserted (this run): ${processedRef.count}`);
