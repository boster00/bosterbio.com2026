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
}
