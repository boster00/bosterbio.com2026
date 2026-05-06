import "server-only"

import { supabaseService } from "@/lib/supabase/server"
import { PRODUCT_TEMPLATE_SLUGS, type ProductTemplateSlug } from "@/lib/product-template-slugs"

export type { ProductTemplateSlug }

export async function getEnabledProductCount(): Promise<number> {
  const sb = supabaseService()
  const { count, error } = await sb
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("status", "enabled")
  if (error) {
    console.warn("[catalog-stats] count failed:", error.message)
    return 0
  }
  return count ?? 0
}

export async function getEnabledCountsByTemplate(): Promise<Partial<Record<ProductTemplateSlug, number>>> {
  const sb = supabaseService()
  const pairs = await Promise.all(
    PRODUCT_TEMPLATE_SLUGS.map(async (template) => {
      const { count } = await sb
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("status", "enabled")
        .eq("product_template", template)
      return [template, count ?? 0] as const
    }),
  )
  return Object.fromEntries(pairs)
}
