// Capture screenshots for Smoke 3.x.next quest:
//   - 9 core pages (homepage, about-us, design-guide, WB service, WB principle,
//     gene-info, cart, checkout, blog post)
//   - 20 PDPs (2 per template × 10 templates we have migrated)
// Saves locally to .audit-screenshots/q3next/ for upload by the next script.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3003";
const OUT = ".audit-screenshots/q3next";
mkdirSync(OUT, { recursive: true });

// 9 core pages — each has a live counterpart for comparison
const CORE = [
  { key: "core_01_home",            path: "/",                                                        live: "https://www.bosterbio.com/" },
  { key: "core_02_about_us",        path: "/about-us",                                                live: "https://www.bosterbio.com/about-us" },
  { key: "core_03_design_guide",    path: "/design-guide",                                            live: null /* internal dev reference */ },
  { key: "core_04_wb_service",      path: "/in-cell-western-blot-service",                            live: "https://www.bosterbio.com/in-cell-western-blot-service" },
  { key: "core_05_wb_principle",    path: "/protocol-and-troubleshooting/western-blot-principle",     live: "https://www.bosterbio.com/protocol-and-troubleshooting/western-blot-principle" },
  { key: "core_06_gene_info_bdnf",  path: "/gene-info/bdnf",                                          live: "https://www.bosterbio.com/gene-info/bdnf" },
  { key: "core_07_cart",            path: "/cart",                                                    live: "https://www.bosterbio.com/checkout/cart" },
  { key: "core_08_checkout",        path: "/checkout",                                                live: "https://www.bosterbio.com/checkout" },
  { key: "core_09_blog_cancer_pathways",path: "/newsletter-archive/20170811-cancer-research-pathways", live: "https://www.bosterbio.com/newsletter-archive/20170811-cancer-research-pathways" },
];

// 20 PDPs — 2 per template × 10 templates we have in Supabase products table
const PDPS = [
  { key: "pdp_antibodies_01",                    sku: "A00052",     template: "antibodies" },
  { key: "pdp_antibodies_02",                    sku: "M02059",     template: "antibodies" },
  { key: "pdp_cell_based_elisa_01",              sku: "EKC1001",    template: "cell-based-elisa-kits" },
  { key: "pdp_cell_based_elisa_02",              sku: "EKC1002",    template: "cell-based-elisa-kits" },
  { key: "pdp_cell_based_phospho_elisa_01",      sku: "EKC2383",    template: "cell-based-phospho-elisa-kits" },
  { key: "pdp_cell_based_phospho_elisa_02",      sku: "EKC1934",    template: "cell-based-phospho-elisa-kits" },
  { key: "pdp_custom_description_01",            sku: "zerotest",   template: "custom-description" },
  { key: "pdp_custom_description_02",            sku: "BA1142",     template: "custom-description" },
  { key: "pdp_elisa_kits_01",                    sku: "EK1629",     template: "elisa-kits" },
  { key: "pdp_elisa_kits_02",                    sku: "EK1679",     template: "elisa-kits" },
  { key: "pdp_elisa_kits_custom_components_01",  sku: "EK7004",     template: "elisa-kits-custom-components" },
  { key: "pdp_elisa_kits_custom_components_02",  sku: "EK7005",     template: "elisa-kits-custom-components" },
  { key: "pdp_ez_set_01",                        sku: "EZ0307",     template: "ez-set" },
  { key: "pdp_ez_set_02",                        sku: "EZ0312",     template: "ez-set" },
  { key: "pdp_over_expression_lysates_01",       sku: "LS000009",   template: "over-expression-lysates" },
  { key: "pdp_over_expression_lysates_02",       sku: "LS000274",   template: "over-expression-lysates" },
  { key: "pdp_proteins_01",                      sku: "PROTQ9UBN6", template: "proteins" },
  { key: "pdp_proteins_02",                      sku: "PROTP07333", template: "proteins" },
  { key: "pdp_tag_quick_elisa_01",               sku: "FEK0559",    template: "tag-quick-elisa-kits" },
  { key: "pdp_tag_quick_elisa_02",               sku: "FEK0595",    template: "tag-quick-elisa-kits" },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const results = [];

async function capture(label, urlPath) {
  const page = await ctx.newPage();
  let ok = true, status = 0, errs = [];
  page.on("pageerror", (e) => errs.push(`pageerror: ${e.message.slice(0, 120)}`));
  try {
    const r = await page.goto(`${BASE}${urlPath}`, { waitUntil: "networkidle", timeout: 25_000 });
    status = r?.status() ?? 0;
    if (status >= 400) ok = false;
    // Wait a beat for lazy-loaded images
    await page.waitForTimeout(800);
    await page.screenshot({ path: join(OUT, `${label}.png`), fullPage: true });
  } catch (e) {
    ok = false; errs.push(String(e).slice(0, 150));
  }
  await page.close();
  return { label, urlPath, status, ok, errs: errs.slice(0, 3) };
}

console.log(`\nCapturing ${CORE.length} core pages...`);
for (const item of CORE) {
  const r = await capture(item.key, item.path);
  results.push({ ...item, ...r });
  console.log(`  ${r.ok ? "✓" : "✗"} ${item.key} (${r.status}) ${r.urlPath}`);
}

console.log(`\nCapturing ${PDPS.length} PDPs...`);
for (const item of PDPS) {
  const r = await capture(item.key, `/products/${item.sku}`);
  results.push({ ...item, urlPath: `/products/${item.sku}`, status: r.status, ok: r.ok, errs: r.errs });
  console.log(`  ${r.ok ? "✓" : "✗"} ${item.key} (${r.status}) ${item.sku}`);
}

await browser.close();
writeFileSync(join(OUT, "results.json"), JSON.stringify(results, null, 2));
console.log(`\nDone. ${results.filter(r => r.ok).length}/${results.length} captured. results.json + ${results.length} PNGs in ${OUT}/`);
