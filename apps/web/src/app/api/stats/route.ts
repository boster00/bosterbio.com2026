// GET /api/stats — public JSON endpoint with catalog totals.
// Used by external embeds (status badges, internal dashboards).
import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/server";
import { supabaseCatalogConfigured } from "@/lib/supabase/catalog-env";

export const revalidate = 600; // 10 minutes

export async function GET() {
  if (!supabaseCatalogConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  try {
    const sb = supabaseService();
    const [products, antibodies, elisaKits, proteins, lysates, cmsPages, publications] = await Promise.all([
      sb.from("products").select("*", { count: "exact", head: true }).eq("status", "enabled"),
      sb.from("products").select("*", { count: "exact", head: true }).eq("status", "enabled").eq("product_template", "antibodies"),
      sb.from("products").select("*", { count: "exact", head: true }).eq("status", "enabled").eq("product_template", "elisa-kits"),
      sb.from("products").select("*", { count: "exact", head: true }).eq("status", "enabled").eq("product_template", "proteins"),
      sb.from("products").select("*", { count: "exact", head: true }).eq("status", "enabled").eq("product_template", "over-expression-lysates"),
      sb.from("cms_pages").select("*", { count: "exact", head: true }).eq("is_active", true),
      sb.from("publications").select("*", { count: "exact", head: true }),
    ]);

    return NextResponse.json({
      total_products: products.count ?? 0,
      antibodies: antibodies.count ?? 0,
      elisa_kits: elisaKits.count ?? 0,
      recombinant_proteins: proteins.count ?? 0,
      cell_lysates: lysates.count ?? 0,
      cms_pages: cmsPages.count ?? 0,
      publications: publications.count ?? 0,
      generated_at: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
