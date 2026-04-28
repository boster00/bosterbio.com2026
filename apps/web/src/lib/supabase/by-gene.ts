// Find products by gene name (case-insensitive lookup against target_info.gene_name).
// Used by /products/by-gene/[gene] for genomics-search landing pages.
import "server-only";
import { supabaseService } from "./server";
import { decodeEntities } from "./utils";
import type { CatalogProduct } from "../catalog-product-types";

type ProductRow = {
  id: number;
  sku: string;
  title: string;
  handle: string;
  product_template: string;
  reactivity: string[] | null;
  applications: string[] | null;
  clone: string | null;
  host_species: string | null;
  badges: string | null;
  target_info: { gene_name?: string; protein_name?: string } | null;
  description: string | null;
  short_description: string | null;
  storage: string | null;
};

export async function findProductsByGene(gene: string, limit = 60): Promise<CatalogProduct[]> {
  const sb = supabaseService();
  const cleaned = gene.trim().toUpperCase();
  if (!cleaned) return [];
  // Magento gene_name is usually compact (e.g. "IL6", "GAPDH"); accept both
  // dashed/dotted user input and compact form.
  const compact = cleaned.replace(/[-_.\s]/g, "");

  // Use a simple title ILIKE — Supabase JS doesn't reliably support
  // target_info->>gene_name in OR clauses; the title contains gene name in
  // a vast majority of cases. Then de-dup and prioritize exact-target matches.
  const patterns = [`%${compact}%`];
  if (cleaned !== compact) patterns.push(`%${cleaned}%`);
  const orClause = patterns.map((p) => `title.ilike.${p}`).join(",");

  const { data, error } = await sb
    .from("products")
    .select("*")
    .eq("status", "enabled")
    .or(orClause)
    .limit(limit);
  if (error || !data) {
    if (error) console.error("[by-gene]", error.message);
    return [];
  }

  // Map to CatalogProduct shape
  return (data as ProductRow[]).map((p) => ({
    id: String(p.id),
    catalog: p.sku,
    name: decodeEntities(p.title),
    target: p.target_info?.gene_name || p.target_info?.protein_name || "—",
    host: p.host_species || "—",
    applications: p.applications ?? [],
    reactivity: p.reactivity ?? [],
    priceLabel: "Contact for price",
    imageUrl: null,
    shortDescription: p.short_description,
    description: p.description,
    clone: p.clone,
    formats: [],
    badges: p.badges ? p.badges.split(",").map((s) => s.trim()).filter(Boolean) : [],
    storage: p.storage,
  }));
}
