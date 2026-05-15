/** GuildOS biomarker weapon–style URL map for Phase 1 hydration POST + local fallbacks. */
export type BiomarkerUrlMap = {
  gene: string
  uniprotAccession: string
  /** Empty string when Ensembl gene ID cannot be resolved */
  ensemblGeneId: string
  uniprotUrl: string
  proteinAtlasUrl: string
  /** Empty string when Ensembl ID is unknown */
  proteinAtlasJsonUrl: string
  uniprotJsonUrl: string
  bosterByGeneUrl: string
}

export function buildUrlMap(params: {
  gene: string
  uniprotAccession: string
  ensemblGeneId: string | null
}): BiomarkerUrlMap {
  const gene = params.gene.trim().toUpperCase()
  const acc = params.uniprotAccession.trim()
  const ens = (params.ensemblGeneId ?? "").replace(/\.\d+$/, "")
  const hasEns = ens.length > 0
  return {
    gene,
    uniprotAccession: acc,
    ensemblGeneId: hasEns ? ens : "",
    uniprotUrl: `https://www.uniprot.org/uniprotkb/${acc}`,
    proteinAtlasUrl: hasEns
      ? `https://www.proteinatlas.org/${ens}`
      : `https://www.proteinatlas.org/search/${encodeURIComponent(gene)}`,
    proteinAtlasJsonUrl: hasEns ? `https://www.proteinatlas.org/${ens}.json` : "",
    uniprotJsonUrl: `https://rest.uniprot.org/uniprotkb/${acc}.json`,
    bosterByGeneUrl: `https://www.bosterbio.com/products/by-gene/${encodeURIComponent(gene)}`,
  }
}
