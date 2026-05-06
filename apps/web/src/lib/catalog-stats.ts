import "server-only"

import { supabaseService } from "@/lib/supabase/server"

/** All Magento `template` slugs referenced in the full-catalog migration quest. */
export const PRODUCT_TEMPLATE_SLUGS = [
  "antibodies",
  "over-expression-lysates",
  "proteins",
  "elisa-kits",
  "cell-based-elisa-kits",
  "custom-description",
  "cell-based-phospho-elisa-kits",
  "ez-set",
  "tag-quick-elisa-kits",
  "veterinary-diagnostic-kits",
  "elisa-kits-custom-components",
  "consumables",
  "detection-kits",
  "isotype-control-antibodies",
  "quick-elisa-kits",
  "reporter-cell-lines",
  "multiplex-elisa-kits",
  "beads",
  "antibody-quick-elisa-kits",
  "instruments-and-machines",
  "hs-elisa-kits",
  "secondary-antibodies",
] as const

export type ProductTemplateSlug = (typeof PRODUCT_TEMPLATE_SLUGS)[number]

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
