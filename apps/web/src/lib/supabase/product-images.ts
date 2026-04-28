// Fetch all gallery images for a product (hero + secondary).
// PDP uses this to render a thumbnail strip below the hero.
import "server-only";
import { supabaseService } from "./server";

export type ProductImage = {
  image_url: string;
  alt_text: string | null;
  type: string;
  position: number;
};

export async function getAllImagesForProduct(skuOrHandle: string): Promise<ProductImage[]> {
  const sb = supabaseService();
  // Resolve product id
  let { data: prod, error } = await sb.from("products").select("id").eq("sku", skuOrHandle).maybeSingle();
  if (!prod && !error) {
    ({ data: prod, error } = await sb.from("products").select("id").eq("handle", skuOrHandle).maybeSingle());
  }
  if (error || !prod) return [];

  const { data, error: imgErr } = await sb
    .from("product_images")
    .select("image_url, alt_text, type, position")
    .eq("product_id", (prod as { id: number }).id)
    .order("position", { ascending: true })
    .limit(8); // Cap at 8 per product
  if (imgErr) return [];
  return (data ?? []) as ProductImage[];
}
