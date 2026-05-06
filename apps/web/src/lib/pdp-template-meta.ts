/** Magento `product_template` slug → short PDP eyebrow label (above H1). */
const EYEBROW: Record<string, string> = {
  antibodies: "Primary antibody",
  "elisa-kits": "ELISA kit",
  proteins: "Recombinant protein",
  "over-expression-lysates": "Over-expression lysate",
  "cell-based-elisa-kits": "Cell-based ELISA kit",
  "cell-based-phospho-elisa-kits": "Cell-based phospho ELISA kit",
  "custom-description": "Product",
  "ez-set": "EZ-Set kit",
  "tag-quick-elisa-kits": "Tag ELISA kit",
  "veterinary-diagnostic-kits": "Veterinary diagnostic kit",
  "elisa-kits-custom-components": "ELISA kit components",
  consumables: "Consumable",
  "detection-kits": "Detection kit",
  "isotype-control-antibodies": "Isotype control",
  "quick-elisa-kits": "Quick ELISA kit",
  "reporter-cell-lines": "Reporter cell line",
  "multiplex-elisa-kits": "Multiplex ELISA kit",
  beads: "Beads",
  "antibody-quick-elisa-kits": "Antibody Quick ELISA kit",
  "instruments-and-machines": "Instrument",
  "hs-elisa-kits": "High-sensitivity ELISA kit",
  "secondary-antibodies": "Secondary antibody",
}

export function pdpEyebrowLabel(templateSlug: string): string {
  const key = templateSlug.trim().toLowerCase()
  if (EYEBROW[key]) return EYEBROW[key]
  return templateSlug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

/** Whether the primary PDP spec block should emphasize antibody-style fields. */
export function pdpShowAntibodyCoreFields(templateSlug: string): boolean {
  const t = templateSlug.trim().toLowerCase()
  return (
    t === "antibodies" ||
    t === "isotype-control-antibodies" ||
    t === "secondary-antibodies"
  )
}
