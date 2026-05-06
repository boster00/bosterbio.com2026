/** Short PDP eyebrow label from Supabase `products.product_template` slug. */
const TEMPLATE_LABELS: Record<string, string> = {
  antibodies: "Antibody",
  "over-expression-lysates": "Over-expression lysate",
  proteins: "Recombinant protein",
  "elisa-kits": "ELISA kit",
  "cell-based-elisa-kits": "Cell-based ELISA kit",
  "cell-based-phospho-elisa-kits": "Cell-based phospho ELISA kit",
  "custom-description": "Product",
  "ez-set": "EZ-SET kit",
  "tag-quick-elisa-kits": "Tag-Quick ELISA kit",
  "veterinary-diagnostic-kits": "Veterinary diagnostic kit",
  "elisa-kits-custom-components": "ELISA kit — custom components",
  consumables: "Consumable",
  "detection-kits": "Detection kit",
  "isotype-control-antibodies": "Isotype control antibody",
  "quick-elisa-kits": "Quick ELISA kit",
  "reporter-cell-lines": "Reporter cell line",
  "multiplex-elisa-kits": "Multiplex ELISA kit",
  beads: "Beads",
  "antibody-quick-elisa-kits": "Antibody Quick ELISA kit",
  "instruments-and-machines": "Instrument",
  "hs-elisa-kits": "High-sensitivity ELISA kit",
  "secondary-antibodies": "Secondary antibody",
}

export function pdpTemplateEyebrow(productTemplate: string | undefined | null): string {
  const slug = (productTemplate ?? "").trim().toLowerCase()
  if (!slug) return "Product"
  return TEMPLATE_LABELS[slug] ?? slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}
