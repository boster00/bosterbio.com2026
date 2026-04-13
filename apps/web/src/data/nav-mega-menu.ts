/**
 * Primary navigation — matches live bosterbio.com IA (mega menu).
 * Paths are Next-friendly (no .html); add routes or redirects as pages ship.
 */

export type NavLink = { label: string; href: string }
export type NavColumn = { title: string; links: NavLink[] }
export type PromoCard = { label: string; href: string; imageSrc?: string }

export const promotionsPopularPages: NavLink[] = [
  { label: "Western blot troubleshooting", href: "/protocol-and-troubleshooting/western-blot-troubleshooting" },
  { label: "Western blot protocol", href: "/western-blotting-technical-resource-center" },
  { label: "ELISA sample preparation", href: "/protocol-and-troubleshooting/elisa-sample-preparation-guide" },
  { label: "ELISA troubleshooting", href: "/protocol-and-troubleshooting/elisa-troubleshooting" },
  { label: "IHC protocol & troubleshooting", href: "/immunohistochemistry-ihc-technical-resource-center" },
  { label: "Flow cytometry resources", href: "/flow-technical-resource-center" },
  { label: "PCR technical center", href: "/pcr-technical-resource-center" },
  { label: "Antibody dilution buffer", href: "/protocol-and-troubleshooting/antibody-dilution-buffer" },
  { label: "Blocking buffers", href: "/protocol-and-troubleshooting/blocking-buffer" },
  { label: "Secondary antibody selection", href: "/protocol-and-troubleshooting/secondary-antibody-selection" },
  { label: "Epitope retrieval", href: "/protocol-and-troubleshooting/epitope-retrieval" },
  { label: "Immunofluorescence (ICC/IF)", href: "/protocol-and-troubleshooting/immunofluorescence-if-protocol" },
  { label: "ChIP protocol", href: "/protocol-and-troubleshooting/chip-protocol" },
  { label: "Total protein assay", href: "/protocol-and-troubleshooting/total-protein-assay" },
]

export const promotionsCards: PromoCard[] = [
  {
    label: "Free antibody validation",
    href: "/promotions/free-validation-for-picoband-antibodies",
  },
  { label: "Zebrafish Abs collective", href: "/programs/zebrafish-antibodies-collective" },
  { label: "WELCOME50", href: "/promotions/welcome50" },
  {
    label: "$600 custom antibodies",
    href: "/services/custom-antibody-for-rare-species-and-discontinued-antibodies",
  },
  { label: "Top 100 ELISA kits 40% off", href: "/promotions/top-100-elisa-40off" },
  { label: "Referral program", href: "/promotions/referral-program" },
  { label: "Review rewards", href: "/promotions/review-and-interview-rewards" },
  { label: "Switching savings", href: "/promotions/switching-savings" },
]

export const productsColumns: NavColumn[] = [
  {
    title: "Antibodies",
    links: [
      { label: "Primary antibodies", href: "/primary-antibodies" },
      { label: "Secondary antibodies", href: "/secondary-antibodies" },
      { label: "Monoclonal primary", href: "/products/primary-antibodies/monoclonal-primary-antibodies" },
      { label: "Rabbit monoclonal", href: "/products/primary-antibodies/rabbit-monoclonal-antibodies" },
      { label: "Loading controls", href: "/products/primary-antibodies/loading-control-antibodies" },
      { label: "ELISA antibody pairs", href: "/products/ez-set-elisa-kits-antibody-pairs" },
      { label: "Recombinant monoclonal", href: "/products/primary-antibodies/recombinant-monoclonal-antibodies" },
      { label: "Search by research field", href: "/antibody-categories" },
      { label: "Zebrafish antibodies", href: "/products/primary-antibodies/zebrafish-antibodies" },
    ],
  },
  {
    title: "Assay kits",
    links: [
      { label: "Veterinary diagnostics", href: "/products/veterinary-diagnostic-kits" },
      { label: "Western blot kits", href: "/products/western-blot-kits" },
      { label: "IHC kits", href: "/products/ihc-kits" },
      { label: "Enzyme activity kits", href: "/products/enzyme-activity-assay-kits" },
      { label: "Total protein kits", href: "/products/total-protein-assay-kits" },
      { label: "ELISA kits", href: "/elisa_kits_landing_page" },
      { label: "Quick ELISA kits", href: "/picokine-elisa-kits/picokine-fast-elisa-kits" },
      { label: "PicoKine ELISA kits", href: "/picokine-elisa-kits" },
      { label: "High sensitivity ELISA", href: "/products/high-sensitivity-elisa-kits" },
      { label: "EZ Set antibody pairs", href: "/products/ez-set-elisa-kits-antibody-pairs" },
    ],
  },
  {
    title: "Proteins & viral tools",
    links: [
      { label: "Recombinant proteins", href: "/recombinant-proteins" },
      { label: "Over-expression lysates", href: "/products/overexpression-lysates" },
      { label: "AAV packaging", href: "/services/aav-packaging-service" },
    ],
  },
  {
    title: "Hot & new",
    links: [
      { label: "Reporter cell lines", href: "/products/reporter-cell-lines" },
      { label: "Buffers", href: "/products/buffers" },
      { label: "Consumables", href: "/products/consumables" },
      { label: "Instruments", href: "/products/instruments" },
      { label: "All product categories", href: "/all-product-categories" },
      { label: "A–Z by biomarker", href: "/products/az-biomarker" },
    ],
  },
]

export const analyticalServicesLinks: NavLink[] = [
  { label: "Western blot service", href: "/services/assay-services/western-blotting-service" },
  { label: "ELISA testing", href: "/services/assay-services/elisa-testing-service" },
  { label: "ELISA development", href: "/services/elisa-development" },
  { label: "Multiplex assays", href: "/services/multiplex-assay-services" },
  { label: "Compound screening", href: "/services/compound-screening-services" },
  { label: "IHC & histology", href: "/services/assay-services/ihc-histology-services" },
  { label: "Pathologist review", href: "/services/pathologist-review-service" },
  { label: "Multiplex IHC", href: "/services/multiplex-ihc" },
  { label: "qPCR services", href: "/services/qpcr-services" },
  { label: "Sample guidelines", href: "/services/sample-submission-guidelines" },
]

/** Cols 1–2; analytical spans cols 3–4 in UI */
export const servicesColumns: NavColumn[] = [
  {
    title: "Antibody services",
    links: [
      {
        label: "$600 rare species custom",
        href: "/services/custom-antibody-for-rare-species-and-discontinued-antibodies",
      },
      { label: "Custom antibody production", href: "/services/custom-antibody-production-services" },
      { label: "Polyclonal production", href: "/services/custom-polyclonal-antibody-production-services" },
      { label: "Monoclonal development", href: "/services/monoclonal-antibody-development-services" },
      { label: "Rabbit monoclonal", href: "/services/rabbit-monoclonal-antibody-services" },
      { label: "Nanobody development", href: "/services/nanobody-development-services" },
      { label: "Antibody pair development", href: "/services/antibody-pair-development-services" },
      { label: "Recombinant antibody", href: "/services/recombinant-antibody-services" },
      { label: "Conjugation", href: "/services/conjugation" },
      { label: "Zebrafish antibodies", href: "/services/zebrafish-antibody-services" },
    ],
  },
  {
    title: "Custom production",
    links: [
      { label: "Protein expression", href: "/services/recombinant-protein-expression-service" },
      { label: "Peptide synthesis", href: "/services/peptide-synthesis-service" },
      { label: "Reporter cell lines", href: "/services/reporter-cell-line-development" },
      { label: "AAV packaging", href: "/services/aav-packaging-service" },
      { label: "Gene synthesis", href: "/services/gene-synthesis-service" },
    ],
  },
]

export type SupportResourceBlock = {
  title: string
  href: string
  links: NavLink[]
}

export const supportResourceBlocks: SupportResourceBlock[] = [
  {
    title: "Western blotting",
    href: "/western-blotting-technical-resource-center",
    links: [
      { label: "Principle", href: "/western-blotting-technical-resource-center#principle" },
      { label: "Glossary", href: "/western-blotting-technical-resource-center#glossary" },
      { label: "Protocol", href: "/western-blotting-technical-resource-center#protocol" },
      { label: "Troubleshooting", href: "/western-blotting-technical-resource-center#troubleshooting" },
      { label: "Optimization", href: "/western-blotting-technical-resource-center#optimization" },
    ],
  },
  {
    title: "IHC / ICC / IF",
    href: "/immunohistochemistry-ihc-technical-resource-center",
    links: [
      { label: "Principle", href: "/immunohistochemistry-ihc-technical-resource-center#principle" },
      { label: "Glossary", href: "/immunohistochemistry-ihc-technical-resource-center#glossary" },
      { label: "Protocol", href: "/immunohistochemistry-ihc-technical-resource-center#protocol" },
      { label: "Troubleshooting", href: "/immunohistochemistry-ihc-technical-resource-center#troubleshooting" },
      { label: "Optimization", href: "/immunohistochemistry-ihc-technical-resource-center#optimization" },
    ],
  },
  {
    title: "ELISA",
    href: "/elisa-technical-resource-center",
    links: [
      { label: "Principle", href: "/elisa-technical-resource-center#principle" },
      { label: "Glossary", href: "/elisa-technical-resource-center#glossary" },
      { label: "Protocol", href: "/elisa-technical-resource-center#protocol" },
      { label: "Troubleshooting", href: "/elisa-technical-resource-center#troubleshooting" },
      { label: "Data analysis", href: "/elisa-technical-resource-center#data-analysis" },
    ],
  },
  {
    title: "Flow cytometry",
    href: "/flow-technical-resource-center",
    links: [
      { label: "Principle", href: "/flow-technical-resource-center#principle" },
      { label: "Glossary", href: "/flow-technical-resource-center#glossary" },
      { label: "Protocol", href: "/flow-technical-resource-center#protocol" },
      { label: "Troubleshooting", href: "/flow-technical-resource-center#troubleshooting" },
      { label: "Optimization", href: "/flow-technical-resource-center#optimization" },
    ],
  },
  {
    title: "AAV & gene therapy",
    href: "/resources/aav-gene-therapy-principle",
    links: [{ label: "Principle overview", href: "/resources/aav-gene-therapy-principle" }],
  },
  {
    title: "PCR",
    href: "/pcr-technical-resource-center",
    links: [
      { label: "Principle", href: "/pcr-technical-resource-center#principle" },
      { label: "Sample prep", href: "/pcr-technical-resource-center#prep" },
      { label: "Protocol", href: "/pcr-technical-resource-center#protocol" },
      { label: "Troubleshooting", href: "/pcr-technical-resource-center#troubleshooting" },
    ],
  },
]

export const supportEducational: NavLink[] = [
  { label: "Pathway maps", href: "/pathway-maps" },
  { label: "ChIP guide", href: "/resources/chip-guide" },
  { label: "Model organism guide", href: "/resources/model-organism-guide" },
  { label: "Webinars", href: "/resources/webinars" },
  { label: "Science tips", href: "/resources/science-tips" },
  { label: "Buffers guide", href: "/resources/buffers-guide" },
  { label: "ELISA data analysis (online)", href: "/resources/elisa-data-analysis-online" },
  { label: "Product insert lookup", href: "/resources/product-insert-lookup" },
]

export const aboutLinks: NavLink[] = [
  { label: "About us", href: "/about-us" },
  { label: "Contact us", href: "/contact-us" },
  { label: "Boster guarantee", href: "/boster-guarantee" },
  { label: "Ordering FAQs", href: "/faqs" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Validation standards", href: "/validation-standards" },
  { label: "ELISA validation", href: "/elisa-validation" },
  { label: "Social media", href: "/social-media" },
  { label: "Terms and conditions", href: "/boster-terms-and-conditions" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of service", href: "/terms-of-service" },
  { label: "Career opportunities", href: "/career-opportunities" },
  { label: "Scholarships and grants", href: "/scholarships-and-grants" },
]
