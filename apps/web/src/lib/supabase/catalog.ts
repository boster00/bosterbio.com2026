// Supabase-backed catalog data adapter — produces CatalogProduct rows for the
// existing PDP/PLP/search UIs without changing those components.
import "server-only";
import { supabaseService } from "./server";
import type { CatalogProduct } from "../catalog-product-types";

type ProductRow = {
  id: number;
  sku: string;
  title: string;
  handle: string;
  product_template: string;
  category: string | null;
  status: string;
  reactivity: string[] | null;
  applications: string[] | null;
  clone: string | null;
  host_species: string | null;
  badges: string | null;
  target_info: { gene_name?: string; protein_name?: string; uniprot_id?: string } | null;
  description: string | null;
  short_description: string | null;
  storage: string | null;
};

type ImageRow = { product_id: number; image_url: string; type: string; position: number };

import { decodeEntities } from "./utils";

function rowToCatalog(p: ProductRow, imageUrl: string | null): CatalogProduct {
  const target = p.target_info?.gene_name || p.target_info?.protein_name || "—";
  return {
    id: String(p.id),
    catalog: p.sku,
    productTemplate: p.product_template || "antibodies",
    name: decodeEntities(p.title),
    target,
    host: p.host_species || "—",
    applications: p.applications ?? [],
    reactivity: p.reactivity ?? [],
    priceLabel: "Contact for price", // wire when Medusa variants are loaded
    imageUrl,
    shortDescription: p.short_description,
    description: p.description,
    clone: p.clone,
    formats: [], // Medusa-driven
    badges: p.badges ? p.badges.split(",").map((s) => s.trim()).filter(Boolean) : [],
    storage: p.storage,
  };
}

async function loadHeroImagesByProductId(productIds: number[]): Promise<Map<number, string>> {
  if (productIds.length === 0) return new Map();
  const sb = supabaseService();
  const { data, error } = await sb
    .from("product_images")
    .select("product_id, image_url, type, position")
    .in("product_id", productIds)
    .order("position", { ascending: true });
  if (error) {
    console.warn("[catalog/supabase] image fetch failed:", error.message);
    return new Map();
  }
  const map = new Map<number, string>();
  for (const r of (data ?? []) as ImageRow[]) {
    if (!map.has(r.product_id) && r.image_url) map.set(r.product_id, r.image_url);
  }
  return map;
}

export async function listProductsFromSupabase(opts: { limit?: number; template?: string; category?: string; withImagesOnly?: boolean } = {}): Promise<CatalogProduct[]> {
  const sb = supabaseService();
  let q = sb.from("products").select("*").eq("status", "enabled").limit(opts.limit ?? 50);
  if (opts.template) q = q.eq("product_template", opts.template);
  if (opts.category) q = q.eq("category", opts.category);
  const { data, error } = await q;
  if (error) {
    console.error("[catalog/supabase] list failed:", error.message);
    return [];
  }
  const rows = (data ?? []) as ProductRow[];
  const images = await loadHeroImagesByProductId(rows.map((r) => r.id));
  let mapped = rows.map((r) => rowToCatalog(r, images.get(r.id) ?? null));
  if (opts.withImagesOnly) mapped = mapped.filter((p) => p.imageUrl);
  return mapped;
}

export async function getProductFromSupabase(skuOrHandle: string): Promise<CatalogProduct | null> {
  const sb = supabaseService();
  // Try by SKU first, then handle
  let { data, error } = await sb
    .from("products")
    .select("*")
    .eq("sku", skuOrHandle)
    .maybeSingle();
  if (!data && !error) {
    ({ data, error } = await sb
      .from("products")
      .select("*")
      .eq("handle", skuOrHandle)
      .maybeSingle());
  }
  if (error) {
    console.error("[catalog/supabase] get failed:", error.message);
    return null;
  }
  if (!data) return null;
  const row = data as ProductRow;
  const images = await loadHeroImagesByProductId([row.id]);
  return rowToCatalog(row, images.get(row.id) ?? null);
}

export async function getSimilarProducts(skuOrHandle: string, limit = 4): Promise<CatalogProduct[]> {
  const sb = supabaseService();
  // Find current product's template + first reactivity for "similar" definition
  let { data: cur } = await sb
    .from("products")
    .select("id, product_template, reactivity, applications")
    .eq("sku", skuOrHandle)
    .maybeSingle();
  if (!cur) {
    ({ data: cur } = await sb
      .from("products")
      .select("id, product_template, reactivity, applications")
      .eq("handle", skuOrHandle)
      .maybeSingle());
  }
  if (!cur) return [];

  const c = cur as { id: number; product_template: string; reactivity: string[] | null; applications: string[] | null };
  // Pick other products in same template, prefer same reactivity
  let q = sb
    .from("products")
    .select("*")
    .eq("status", "enabled")
    .eq("product_template", c.product_template)
    .neq("id", c.id);
  if (c.reactivity && c.reactivity.length > 0) {
    q = q.contains("reactivity", [c.reactivity[0]]);
  }
  const { data, error } = await q.limit(limit);
  if (error || !data?.length) return [];
  const rows = data as ProductRow[];
  const images = await loadHeroImagesByProductId(rows.map((r) => r.id));
  return rows.map((r) => rowToCatalog(r, images.get(r.id) ?? null));
}

export async function searchProductsInSupabase(query: string, limit = 50): Promise<CatalogProduct[]> {
  const sb = supabaseService();
  const q = query.trim();
  if (!q) return listProductsFromSupabase({ limit });
  // Use full-text search on search_tsv index built by trigger
  const { data, error } = await sb
    .from("products")
    .select("*")
    .eq("status", "enabled")
    .textSearch("search_tsv", q.split(/\s+/).join(" & "), { type: "websearch" })
    .limit(limit);
  if (error) {
    console.warn("[catalog/supabase] search fallback to ilike:", error.message);
    const { data: fb } = await sb
      .from("products")
      .select("*")
      .eq("status", "enabled")
      .or(`title.ilike.%${q}%,sku.ilike.%${q}%`)
      .limit(limit);
    const rows = (fb ?? []) as ProductRow[];
    const images = await loadHeroImagesByProductId(rows.map((r) => r.id));
    return rows.map((r) => rowToCatalog(r, images.get(r.id) ?? null));
  }
  const rows = (data ?? []) as ProductRow[];
  const images = await loadHeroImagesByProductId(rows.map((r) => r.id));
  return rows.map((r) => rowToCatalog(r, images.get(r.id) ?? null));
}
