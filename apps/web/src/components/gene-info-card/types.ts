export interface GeneCardProps {
  // Core gene identity
  gene: string
  fullName: string
  aliases: string
  superfamily: string
  uniprotId: string

  // Protein properties
  mwKda: string
  signalPeptide: string
  glycosylation: string
  domains: string
  localization: string
  isoformCount: string

  // Tissue expression
  tissueHigh: string
  tissueMed: string
  tissueLow: string

  // WB / product data
  wbImageUrl: string | null
  ihcImageUrl: string | null
  mainSkuWb: string | null
  wbCitations: string | null
  wbAntibodyUrl: string | null
  pubCount: string | null
  assayApps: string | null

  // External links
  uniprotUrl: string
  proteinAtlasUrl: string
  bosterGeneUrl: string

  // LLM narrative fields (empty string = not yet generated)
  geoWbMw: string
  geoDimer: string
  geoTissue: string

  // Experiment design / page purpose (optional — only set for enriched pages)
  pagePurpose?: string          // 1–2 sentence stated goal shown at top of card

  // Controls section
  geoControls?: string          // LLM narrative covering positive + negative controls
  posControlTissues?: string    // Comma-separated tissues (e.g. "placenta, gallbladder")
  negControlTissues?: string    // Comma-separated tissues (e.g. "peripheral blood lymphocytes")
  loadingControl?: string       // Recommended loading control (e.g. "GAPDH or β-actin")

  // IHC staining pattern
  ihcPatternTitle?: string      // Short label: "Cytoplasmic", "Nuclear + cytoplasmic", etc.
  ihcPatternDetail?: string     // 1–2 sentence description of expected IHC pattern

  // Antibody selection guide
  geoAbSelection?: string       // LLM narrative: WB vs IHC vs flow antibody recommendation

  // Common gotchas
  gotchaNote?: string           // Common detection mistakes or interpretation pitfalls

  // "What a correct result looks like" — WB/IHC expected output description
  geoWbExpected?: string        // Describes what a passing WB/IHC result looks like for this gene

  // Situational mini-modules — JSON array of {question, answer, decisions: string[]}
  situationalModulesJson?: string

  // Related lysate / positive control product (optional)
  relatedLysateImageUrl?: string | null
  relatedLysateUrl?: string | null
  relatedLysateSku?: string | null

  // SEO / GEO metadata (optional — override the site defaults)
  seoTitle?: string              // <title> tag — full string including brand
  seoDescription?: string        // <meta name="description"> — 150–160 chars
}
