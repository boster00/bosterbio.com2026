import "server-only"

import type { GeneCardProps } from "@/components/gene-info-card/types"
import { bucketTissuesFromHpa, fetchProteinAtlasJson, hpaSummaryLines } from "./protein-atlas"
import { postGuildOsBiomarkerHydrate } from "./guild-os-hydrate"
import { generatePhase2Narratives, mergePhase2ForCard } from "./phase2-narratives"
import { findSpotlightProduct } from "./boster-product"
import { sanitizeGeneProps, sanitizeDisplayText } from "./sanitize"
import { buildUrlMap, type BiomarkerUrlMap } from "./url-map"
import {
  extractAliasesCsv,
  extractDomainsSummary,
  extractEnsemblGeneId,
  extractFullName,
  extractGlycosylation,
  extractIsoformCount,
  extractLocalization,
  extractSignalPeptide,
  extractSuperfamily,
  fetchUniProtEntry,
  molWeightToKda,
  searchHumanReviewedGene,
} from "./uniprot"

export async function loadGeneCardProps(rawGene: string): Promise<GeneCardProps | null> {
  const gene = decodeURIComponent(rawGene).trim().toUpperCase()
  if (!gene || !/^[A-Z0-9][A-Z0-9._-]*$/i.test(gene)) return null

  const hit = await searchHumanReviewedGene(gene)
  if (!hit?.primaryAccession) return null

  const entry = await fetchUniProtEntry(hit.primaryAccession)
  if (!entry) return null

  const ens = extractEnsemblGeneId(entry)
  const acc = entry.primaryAccession

  const urlMap: BiomarkerUrlMap = buildUrlMap({
    gene,
    uniprotAccession: acc,
    ensemblGeneId: ens,
  })

  const guildPayload = await postGuildOsBiomarkerHydrate(gene, urlMap)

  const hpa = ens ? await fetchProteinAtlasJson(ens) : null
  const buckets = hpa ? bucketTissuesFromHpa(hpa) : { high: "", med: "", low: "" }
  const hpaNotes = hpa ? hpaSummaryLines(hpa).join(" | ") : ""

  const spotlight = await findSpotlightProduct(gene)

  const mwKda = molWeightToKda(entry.sequence?.molWeight)
  const fullName = extractFullName(entry)
  const aliases = extractAliasesCsv(entry, gene)

  const phase1Facts: Record<string, string> = {
    gene_symbol: gene,
    uniprot_accession: acc,
    protein_name: sanitizeDisplayText(fullName),
    aliases: sanitizeDisplayText(aliases),
    mw_kda: mwKda,
    isoform_count: extractIsoformCount(entry),
    localization: sanitizeDisplayText(extractLocalization(entry)),
    domains: sanitizeDisplayText(extractDomainsSummary(entry)),
    signal_peptide: extractSignalPeptide(entry),
    glycosylation: extractGlycosylation(entry),
    superfamily: sanitizeDisplayText(extractSuperfamily(entry)),
    tissue_high: buckets.high || "—",
    tissue_med: buckets.med || "—",
    tissue_low: buckets.low || "—",
    hpa_summary: sanitizeDisplayText(hpaNotes),
    ensembl_gene: ens || "",
    guild_os_hydration_json: guildPayload ? JSON.stringify(guildPayload).slice(0, 8000) : "",
    spotlight_sku: spotlight?.sku ?? "",
    spotlight_title: spotlight?.title ?? "",
    spotlight_applications: spotlight?.applications.join(", ") ?? "",
  }

  const p2 = await generatePhase2Narratives(phase1Facts)
  const geo = mergePhase2ForCard(p2)

  const proteinAtlasUrl = ens
    ? `https://www.proteinatlas.org/${ens}`
    : `https://www.proteinatlas.org/search/${encodeURIComponent(gene)}`

  const props: GeneCardProps = {
    gene,
    fullName: fullName || gene,
    aliases,
    superfamily: extractSuperfamily(entry),
    uniprotId: acc,
    mwKda: mwKda,
    signalPeptide: extractSignalPeptide(entry),
    glycosylation: extractGlycosylation(entry),
    domains: extractDomainsSummary(entry),
    localization: extractLocalization(entry),
    isoformCount: extractIsoformCount(entry),
    tissueHigh: buckets.high,
    tissueMed: buckets.med,
    tissueLow: buckets.low,
    wbImageUrl: spotlight?.wbImageUrl ?? null,
    ihcImageUrl: spotlight?.ihcImageUrl ?? null,
    mainSkuWb: spotlight?.sku ?? null,
    wbCitations: spotlight?.wbCitations ?? null,
    wbAntibodyUrl: spotlight?.wbAntibodyPath ?? null,
    pubCount: spotlight?.pubCount ?? null,
    assayApps: spotlight?.assayApps ?? null,
    uniprotUrl: `https://www.uniprot.org/uniprotkb/${acc}`,
    proteinAtlasUrl,
    bosterGeneUrl: `/products/by-gene/${encodeURIComponent(gene)}`,
    geoWbMw: geo.geoWbMw,
    geoDimer: geo.geoDimer,
    geoTissue: geo.geoTissue,
  }

  return sanitizeGeneProps(props)
}
