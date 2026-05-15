#!/usr/bin/env node
/**
 * Quest 8cf07bf4 — pick 2 Magento CSV rows (dev + verification) and emit
 * full per-column → Supabase mapping metadata for Step 1 deliverable.
 * Reads live internal-export.csv via range + stream (no local CSV required).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { Readable } from "node:stream";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "quest-deliverables/8cf07bf4-step1-attribute-mapping.json");

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

/** Columns that rowToProduct in migrate-products-pilot.mjs reads (explicit). */
function mapColumnToDestination(col) {
  if (col === "sku") return { kind: "type_a", dest: "products.sku" };
  if (col === "name") return { kind: "type_a", dest: "products.title" };
  if (col === "url_key") return { kind: "type_a", dest: "products.handle" };
  if (col === "template") return { kind: "type_a", dest: "products.product_template" };
  if (col === "product_category") return { kind: "type_a", dest: "products.category" };
  if (col === "status") return { kind: "type_a", dest: "products.status", notes: "1→enabled else disabled" };
  if (col === "reactivity") return { kind: "type_a", dest: "products.reactivity", notes: "text[] from CSV string" };
  if (col === "applications") return { kind: "type_a", dest: "products.applications", notes: "text[] from CSV string" };
  if (col === "clonality" || col === "clone_number")
    return { kind: "type_a", dest: "products.clone", notes: "merged with clone_number" };
  if (col === "host") return { kind: "type_a", dest: "products.host_species" };
  if (col === "badges") return { kind: "type_a", dest: "products.badges" };
  if (TARGET_INFO_FIELDS.includes(col))
    return { kind: "type_a", dest: "products.target_info(jsonb)", jsonKey: col };
  if (col === "description") return { kind: "content", dest: "products.description" };
  if (col === "short_description") return { kind: "content", dest: "products.short_description" };
  if (col === "background") return { kind: "content", dest: "products.background" };
  if (col === "storage") return { kind: "content", dest: "products.storage" };
  if (col === "meta_title") return { kind: "seo", dest: "products.meta_title" };
  if (col === "meta_keyword") return { kind: "seo", dest: "products.meta_keywords" };
  if (col === "meta_description") return { kind: "seo", dest: "products.meta_description" };
  if (col === "images" || col === "image_labels")
    return { kind: "product_images", dest: "product_images rows", notes: "split on |; hero=first" };
  const tb = TYPE_B_COLUMNS.indexOf(col);
  if (tb >= 0) {
    return {
      kind: "type_b",
      dest: `products.attr_${tb + 1}`,
      notes: `attribute_definitions label order slot ${tb + 1}`,
    };
  }
  if (col === "price") return { kind: "derived_ui", dest: "Medusa/pricing (not in products row)", notes: "PDP price still from Magento path in hybrid phase" };
  if (col.startsWith("size_") || col.startsWith("price_for_size_"))
    return { kind: "formats", dest: "ProductPdpFormats / variants", notes: "multi-size pricing; not pilot-mapped to dedicated column" };
  if (col.startsWith("custom_attribute_"))
    return { kind: "dropped", dest: null, notes: "reserved Magento custom slots; not in pilot schema" };
  return { kind: "unmapped_pilot", dest: "products.metadata(jsonb) or future column", notes: "not written by migrate-products-pilot.mjs today" };
}

async function openLiveStream() {
  const res = await fetch("https://www.bosterbio.com/internal-export.csv", {
    headers: { Range: "bytes=0-120000000" },
  });
  if (!res.ok && res.status !== 206) throw new Error(`Live fetch failed: ${res.status}`);
  return Readable.fromWeb(res.body);
}

async function main() {
  const want = [
    { role: "development", template: "antibodies" },
    { role: "verification", template: "elisa-kits" },
  ];
  const found = [];

  const parser = (await openLiveStream()).pipe(
    parse({
      columns: true,
      bom: true,
      skip_records_with_error: true,
      relax_quotes: true,
      relax_column_count: true,
      trim: false,
    }),
  );

  for await (const row of parser) {
    const tpl = (row.template || "").trim();
    const pending = want.find((w) => w.template === tpl && !found.some((f) => f.role === w.role));
    if (!pending) continue;
    if (!row.sku?.trim() || !row.url_key?.trim()) continue;
    found.push({ role: pending.role, template: tpl, sku: row.sku.trim(), url_key: row.url_key.trim(), row });
    if (found.length >= want.length) break;
  }

  if (found.length < want.length) {
    throw new Error(`Only found ${found.length} of ${want.length} template-stratified rows in range`);
  }

  const csvColumns = Object.keys(found[0].row).sort();
  const globalColumnMap = Object.fromEntries(csvColumns.map((c) => [c, mapColumnToDestination(c)]));

  const perProduct = found.map(({ role, template, sku, url_key, row }) => {
    const attributes = csvColumns.map((col) => ({
      magento_column: col,
      raw_present: row[col] != null && String(row[col]).trim() !== "",
      raw_length: row[col] == null ? 0 : String(row[col]).length,
      mapping: globalColumnMap[col],
    }));
    return { role, template, sku, url_key, attributes };
  });

  const dropped = csvColumns
    .filter((c) => globalColumnMap[c].kind === "dropped" || globalColumnMap[c].kind === "unmapped_pilot")
    .map((c) => ({ column: c, ...globalColumnMap[c] }));

  const doc = {
    quest_id: "8cf07bf4-e216-42f5-a3af-5abace7ccde8",
    item_key: "step-1-attribute-extraction",
    generated_at: new Date().toISOString(),
    computed_type_a: {
      search_index: {
        kind: "type_a",
        dest: "products.search_index",
        magento_sources: ["sku", "name", "gene_name", "uniprot_id", "synonyms"],
        notes: "Concatenated in migrate-products-pilot rowToProduct(); not a CSV column",
      },
    },
    source_csv: "https://www.bosterbio.com/internal-export.csv",
    slice_strategy:
      "First valid row per template from streamed range: development=antibodies, verification=elisa-kits (Type A + B + images coverage).",
    products: perProduct.map((p) => ({
      role: p.role,
      sku: p.sku,
      url_key: p.url_key,
      product_template: p.template,
      attribute_count: p.attributes.length,
    })),
    csv_column_count: csvColumns.length,
    global_column_map: globalColumnMap,
    per_product_attribute_audit: perProduct,
    unmapped_or_dropped_summary: dropped,
    type_b_slot_order: TYPE_B_COLUMNS.map((col, i) => ({ attr_key: `attr_${i + 1}`, magento_column: col })),
    target_info_keys: TARGET_INFO_FIELDS,
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(doc, null, 2), "utf8");
  console.log("Wrote", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
