/** All Magento `template` slugs referenced in the full-catalog migration quest (client-safe). */

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
