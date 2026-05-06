/** Magento `template` column slugs → PDP eyebrow / PLP copy (single source for 26 templates). */

const LABELS: Record<string, string> = {
  antibodies: "Antibody",
  "over-expression-lysates": "Cell lysate",
  proteins: "Recombinant protein",
  "elisa-kits": "ELISA kit",
  "cell-based-elisa-kits": "Cell-based ELISA kit",
  "cell-based-phospho-elisa-kits": "Cell-based phospho-ELISA kit",
  "custom-description": "Product",
  "ez-set": "EZ-Set kit",
  "tag-quick-elisa-kits": "Tag-Quick ELISA kit",
  "veterinary-diagnostic-kits": "Veterinary diagnostic kit",
  "elisa-kits-custom-components": "ELISA kit component",
  consumables: "Consumable",
  "detection-kits": "Detection kit",
  "isotype-control-antibodies": "Isotype control antibody",
  "quick-elisa-kits": "Quick ELISA kit",
  "reporter-cell-lines": "Reporter cell line",
  "multiplex-elisa-kits": "Multiplex ELISA kit",
  beads: "Beads",
  "antibody-quick-elisa-kits": "Antibody-Quick ELISA kit",
  "instruments-and-machines": "Instrument",
  "hs-elisa-kits": "High-sensitivity ELISA kit",
  "secondary-antibodies": "Secondary antibody",
}

function titleCaseSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Short category line above the product title on PDP (matches template, not category). */
export function productTemplateEyebrow(productTemplate: string): string {
  const t = productTemplate.trim();
  if (LABELS[t]) return LABELS[t];
  return titleCaseSlug(t);
}

/** Whether Type A “antibody-style” quick facts (clone, reactivity, …) are primary for this template. */
export function isAntibodyFamilyTemplate(productTemplate: string): boolean {
  const t = productTemplate.trim();
  return (
    t === "antibodies" ||
    t === "isotype-control-antibodies" ||
    t === "secondary-antibodies"
  );
}
