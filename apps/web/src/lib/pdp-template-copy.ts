/** Short labels for PDP hero eyebrow (Magento `product_template` slug). */
export const PDP_TEMPLATE_EYEBROW: Record<string, string> = {
  antibodies: "Antibody",
  "over-expression-lysates": "Over-expression lysate",
  proteins: "Recombinant protein",
  "elisa-kits": "ELISA kit",
  "cell-based-elisa-kits": "Cell-based ELISA",
  "cell-based-phospho-elisa-kits": "Cell-based phospho ELISA",
  "custom-description": "Product",
  "ez-set": "EZ-Set ELISA pair",
  "tag-quick-elisa-kits": "Tag-Quick ELISA",
  "veterinary-diagnostic-kits": "Veterinary diagnostic kit",
  "elisa-kits-custom-components": "ELISA component",
  consumables: "Consumable",
  "detection-kits": "Detection kit",
  "isotype-control-antibodies": "Isotype control",
  "quick-elisa-kits": "Quick ELISA",
  "reporter-cell-lines": "Reporter cell line",
  "multiplex-elisa-kits": "Multiplex ELISA",
  beads: "Beads",
  "antibody-quick-elisa-kits": "Antibody-Quick ELISA",
  "instruments-and-machines": "Instrument",
  "hs-elisa-kits": "High-sensitivity ELISA",
  "secondary-antibodies": "Secondary antibody",
}

const ELISA_LIKE = new Set([
  "elisa-kits",
  "cell-based-elisa-kits",
  "cell-based-phospho-elisa-kits",
  "tag-quick-elisa-kits",
  "ez-set",
  "veterinary-diagnostic-kits",
  "elisa-kits-custom-components",
  "quick-elisa-kits",
  "multiplex-elisa-kits",
  "antibody-quick-elisa-kits",
  "hs-elisa-kits",
])

export function pdpTemplateEyebrow(template: string): string {
  return PDP_TEMPLATE_EYEBROW[template] ?? "Product"
}

export function showSupplementalProductImage(template: string): boolean {
  return ELISA_LIKE.has(template)
}

export function tagFromMetadata(meta: Record<string, unknown> | null): string | null {
  if (!meta) return null
  const t = meta.tag
  return typeof t === "string" && t.trim() ? t.trim() : null
}

export function conjugateFromMetadata(meta: Record<string, unknown> | null): string | null {
  if (!meta) return null
  const c = meta.conjugate
  return typeof c === "string" && c.trim() ? c.trim() : null
}

export function sourceFromMetadata(meta: Record<string, unknown> | null): string | null {
  if (!meta) return null
  const s = meta.source
  return typeof s === "string" && s.trim() ? s.trim() : null
}
