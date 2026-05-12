import type { Metadata } from 'next'
import GeneInfoCard from '@/components/gene-info-card/GeneInfoCard'
import type { GeneCardProps } from '@/components/gene-info-card/types'

export const metadata: Metadata = {
  title: 'ADAMTS14 Western Blot & IHC Guide — Expected Bands, Controls & Protocol',
  description:
    'ADAMTS14 WB and IHC experiment design: expect an 87–92 kDa band on reducing SDS-PAGE, use placenta lysate as positive control, 8–10% gel, BSA blocking. Validated with antibody A11543 (188 citations). Band interpretation, protocol troubleshooting, and antibody selection in one place.',
}

const adamts14: GeneCardProps = {
  // ── Core identity ─────────────────────────────────────────────────────────
  gene: 'ADAMTS14',
  fullName: 'A Disintegrin And Metalloproteinase With Thrombospondin Motifs 14',
  aliases: 'ADAM-TS14, ADAMTS-14',
  superfamily: 'Peptidase M12B',
  uniprotId: 'Q8WXS8',

  // ── Structural properties ─────────────────────────────────────────────────
  mwKda: '87.3',
  signalPeptide: '1-26',
  glycosylation: 'N-linked at Asn-362, Asn-395, Asn-421',
  domains: 'Metalloprotease, Disintegrin-like, TSP type-1 (×3), PLAC',
  localization: 'Secreted, extracellular space, extracellular matrix',
  isoformCount: '3',

  // ── Tissue expression ─────────────────────────────────────────────────────
  tissueHigh: '',
  tissueMed: 'placenta, gallbladder',
  tissueLow: 'brain, lung, spleen, kidney, ovary',

  // ── Product data ──────────────────────────────────────────────────────────
  wbImageUrl: null,
  ihcImageUrl: null,
  relatedLysateImageUrl: 'https://www.bosterbio.com/media/catalog/product/l/s/ls140766-adamts14-human-over-expression-lysates-nm-139155-wb-testing-1.jpg',
  relatedLysateUrl: 'https://www.bosterbio.com/adamts14-nm-139155-human-over-expression-lysate-ls140766-boster.html',
  relatedLysateSku: 'LS140766',
  mainSkuWb: 'A11543',
  wbCitations: '188',
  wbAntibodyUrl: 'https://www.bosterbio.com/anti-ats14-adamts14-antibody-a11543-boster.html',
  pubCount: '47',
  assayApps: 'WB, IHC, ELISA, ICC',

  // ── External links ────────────────────────────────────────────────────────
  uniprotUrl: 'https://rest.uniprot.org/uniprotkb/Q8WXS8.json',
  proteinAtlasUrl: 'https://www.proteinatlas.org/ENSG00000138316-ADAMTS14',
  bosterGeneUrl: 'https://www.bosterbio.com/bosterbio-gene-info-cards/ADAMTS14',

  // ── WB narratives (decision-compressed) ──────────────────────────────────
  geoWbMw: 'ADAMTS14 runs at approximately 87–92 kDa on denaturing SDS-PAGE under reducing conditions — about 5 kDa above the UniProt predicted mass of 87.3 kDa, due to N-glycosylation at Asn-362, Asn-395, and Asn-421. A minor band near 60 kDa in some lysates is the processed propeptide form, not a contaminant. If your band is running lower than 87 kDa, check whether your sample was fully denatured — incomplete reduction is the most common cause of downward band shifts in secreted proteases.',

  geoDimer: 'Under non-reducing conditions, ADAMTS14 migrates as a higher-MW species — expect a band shift of 15–20 kDa upward compared to reducing conditions, reflecting intermolecular disulfide bridges in the native extracellular form. If your non-reducing gel shows two bands, the upper is the dimer and the lower is the propeptide — both are expected. If both bands collapse to a single 87–92 kDa species under reducing conditions, your antibody is working correctly.',

  geoWbExpected: 'A correct ADAMTS14 WB under reducing conditions shows: a strong primary band at 87–92 kDa, an optional faint band at ~60 kDa (processed propeptide), and clean background above 100 kDa. Placenta lysate should show strong signal; peripheral blood lymphocyte lysate should show none. Under non-reducing conditions, the primary band shifts to ~105–110 kDa. If your result matches this profile, your detection is working.',

  // ── Tissue narrative (decision-compressed) ────────────────────────────────
  geoTissue: 'ADAMTS14 is most abundantly expressed in placenta — consistent with its role in remodeling the collagen-rich ECM during placentation. Gallbladder tissue shows moderate expression. Brain, lung, spleen, kidney, and ovary all show low but detectable levels. If your target tissue is not on this list, expression is likely below the threshold for reliable WB detection in whole-tissue lysate — IHC may still detect pericellular deposits even when WB is negative.',

  // ── SEO / GEO metadata ───────────────────────────────────────────────────
  seoTitle: 'ADAMTS14 Western Blot & IHC Guide — Expected Bands, Controls & Protocol',
  seoDescription: 'ADAMTS14 WB and IHC experiment design: expect an 87–92 kDa band on reducing SDS-PAGE, use placenta lysate as positive control, 8–10% gel, BSA blocking. Validated with antibody A11543 (188 citations). Band interpretation, protocol troubleshooting, and antibody selection in one place.',

  // ── Page purpose (problem-first) ─────────────────────────────────────────
  pagePurpose: 'Researchers struggle with ADAMTS14 because WB signal is often weaker than expected and band position shifts between reducing and non-reducing conditions — both consequences of its secreted, extracellular nature. This page walks through what to expect at each step: correct band sizes, which tissues to use as controls, how to choose the right assay, and what a passing result actually looks like.',

  // ── Controls (decision-compressed) ───────────────────────────────────────
  posControlTissues: 'placenta, gallbladder',
  negControlTissues: 'peripheral blood lymphocytes, spleen',
  loadingControl: 'GAPDH or β-actin',
  geoControls: 'For Western blot, placenta lysate is the most reliable positive control — ADAMTS14 is highly expressed during placentation and consistently gives a clean 87–92 kDa band. Gallbladder works as a secondary positive. If your placenta control shows weak signal, investigate your denaturation protocol before troubleshooting antibody specificity. Peripheral blood lymphocytes and spleen are the recommended negatives — if either shows signal, check for cross-reactivity in the metalloprotease family using a peptide competition assay.',

  // ── IHC pattern ──────────────────────────────────────────────────────────
  ihcPatternTitle: 'Extracellular / pericellular',
  ihcPatternDetail: 'ADAMTS14 staining should appear in the extracellular matrix and pericellular space around stromal fibroblasts — not inside cell nuclei. Any nuclear signal is non-specific. Cytoplasmic Golgi/ER staining may be visible in actively secreting cells. For FFPE sections, citrate antigen retrieval at pH 6.0 (95°C, 20 min) is the validated protocol.',

  // ── Antibody selection (reasoning-first) ─────────────────────────────────
  geoAbSelection: 'ADAMTS14 is a secreted extracellular protease — antibody choice depends on whether you\'re detecting the secreted form in conditioned media or ECM extracts, or the intracellular pool in cell lysates during active synthesis. For WB under reducing conditions on tissue extracts or cell lysates, you need an antibody validated for the denatured secreted form; not all anti-ADAMTS14 antibodies meet this bar. A11543 is validated under these conditions and carries the strongest citation record for both WB and IHC across published literature. For FFPE IHC, the same antibody performs with citrate retrieval at pH 6.0. ELISA is viable for quantifying secreted ADAMTS14 in conditioned media. Flow cytometry is not validated — the protein\'s extracellular nature makes consistent intracellular staining unreliable.',

  // ── Common mistakes ───────────────────────────────────────────────────────
  gotchaNote: 'ADAMTS14 runs 87–92 kDa under reducing conditions — about 5 kDa above predicted MW due to N-glycosylation; do not flag this as a non-specific band. Under non-reducing conditions, the band shifts 15–20 kDa upward; this confirms native dimer structure. A faint ~60 kDa band in some lysates is the processed propeptide. Ensure complete denaturation: heat at 95°C for at least 5 minutes with fresh β-ME or DTT. Avoid serum-containing samples for secreted ADAMTS14 detection — serum introduces variable high-MW background that can mask the target band.',

  // ── Situational mini-modules ──────────────────────────────────────────────
  situationalModulesJson: JSON.stringify([
    {
      question: 'Why is my ADAMTS14 WB signal weak?',
      answer: 'ADAMTS14 is a secreted extracellular protein — most of the expressed protein is exported from cells rather than retained intracellularly. This means whole-cell lysates often show much weaker signal than expected, even when the gene is actively transcribed.',
      decisions: [
        'If using whole-cell lysate → switch to conditioned media or an ECM-enriched fraction for higher signal yield',
        'If using tissue lysate → placenta should show strong signal; weak signal there points to a denaturation or loading issue, not expression absence',
        'If signal appears only under non-reducing conditions → your reducing agent may be disrupting the antibody epitope; try titrating DTT down from 100 mM to 50 mM',
      ],
    },
    {
      question: 'What gel and protocol settings work best for ADAMTS14 WB?',
      answer: 'ADAMTS14 is an 87–92 kDa glycoprotein. Gel percentage and lysis conditions have an outsized effect on resolution and signal at this size range. The following settings are validated for ADAMTS14 detection.',
      decisions: [
        'Gel: use 8–10% SDS-PAGE; 12% compresses the 87–92 kDa band into a crowded zone that reduces resolution',
        'Lysis: RIPA buffer supplemented with protease inhibitors; avoid NP-40-only lysis — it underextracts ADAMTS14 from ECM-associated fractions',
        'Blocking: 5% BSA in TBST is preferred over milk; milk casein can cross-react with anti-metalloprotease antibodies and raise background',
        'Loading: use 20–30 μg total protein per lane; overloading causes smearing at the 87–92 kDa zone for this glycoprotein',
      ],
    },
    {
      question: 'I see multiple bands in my ADAMTS14 WB — which one is real?',
      answer: 'ADAMTS14 naturally produces multiple bands due to its propeptide processing and propensity to form intermolecular disulfide bonds. Each band has a known identity — identifying them correctly is more useful than eliminating them.',
      decisions: [
        '87–92 kDa = the full-length processed form; this is your primary target band; slightly higher than predicted (87.3 kDa) due to N-glycosylation',
        '~60 kDa = the cleaved propeptide fragment; appears in some tissue lysates; expected and not a non-specific band',
        '>105 kDa under non-reducing conditions = intermolecular disulfide-bonded dimer; collapses to 87–92 kDa under reducing conditions, confirming it is specific',
        'Any band below 50 kDa = likely non-specific; perform a peptide competition assay to confirm; check for metalloprotease family cross-reactivity',
      ],
    },
  ]),
}

export default function TestPage() {
  return <GeneInfoCard {...adamts14} />
}
