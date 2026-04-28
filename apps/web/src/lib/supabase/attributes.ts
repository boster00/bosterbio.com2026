// Fetch the labelled Type B attribute table for a product on its template.
// Joins attribute_definitions (per template) with the product's attr_1..attr_25
// values and returns only the rows that have a non-empty value.
import "server-only";
import { supabaseService } from "./server";

export type LabelledAttribute = {
  attr_key: string; // attr_1 .. attr_25
  label: string;
  value: string;
  type: string; // "text" | "html"
  display_order: number;
};

type ProductAttrRow = Record<string, unknown> & {
  product_template?: string;
};

export async function getProductAttributesByTemplate(
  productSkuOrHandle: string,
): Promise<LabelledAttribute[]> {
  const sb = supabaseService();
  // 1. Fetch product row
  let { data: product, error } = await sb
    .from("products")
    .select(
      "product_template, attr_1, attr_2, attr_3, attr_4, attr_5, attr_6, attr_7, attr_8, attr_9, attr_10, attr_11, attr_12, attr_13, attr_14, attr_15, attr_16, attr_17, attr_18, attr_19, attr_20, attr_21, attr_22, attr_23, attr_24, attr_25",
    )
    .eq("sku", productSkuOrHandle)
    .maybeSingle();
  if (!product && !error) {
    ({ data: product, error } = await sb
      .from("products")
      .select(
        "product_template, attr_1, attr_2, attr_3, attr_4, attr_5, attr_6, attr_7, attr_8, attr_9, attr_10, attr_11, attr_12, attr_13, attr_14, attr_15, attr_16, attr_17, attr_18, attr_19, attr_20, attr_21, attr_22, attr_23, attr_24, attr_25",
      )
      .eq("handle", productSkuOrHandle)
      .maybeSingle());
  }
  if (error || !product) return [];

  const p = product as ProductAttrRow;
  const template = p.product_template;
  if (!template) return [];

  // 2. Fetch labels for this template
  const { data: defs, error: defError } = await sb
    .from("attribute_definitions")
    .select("attr_key, label, type, display_order")
    .eq("template", template)
    .order("display_order", { ascending: true });
  if (defError || !defs) return [];

  // 3. Filter to only attrs that have a non-empty value
  const out: LabelledAttribute[] = [];
  for (const d of defs as { attr_key: string; label: string; type: string; display_order: number }[]) {
    const value = p[d.attr_key];
    if (typeof value === "string" && value.trim().length > 0) {
      out.push({ attr_key: d.attr_key, label: d.label, value, type: d.type, display_order: d.display_order });
    }
  }
  return out;
}
