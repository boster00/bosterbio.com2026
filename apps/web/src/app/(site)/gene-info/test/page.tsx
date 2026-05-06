// Layout stress-test page — renders three gene card scenarios side-by-side
import GeneInfoCard from '@/components/gene-info-card/GeneInfoCard'
import type { GeneCardProps } from '@/components/gene-info-card/types'

// Scenario A: minimal / short content (no images, no narratives, few tissues)
const shortContent: GeneCardProps = {
  gene: 'IL6',
  fullName: 'Interleukin 6',
  aliases: 'IFN-B2, BSF2',
  superfamily: 'IL-6 superfamily',
  uniprotId: 'P05231',
  mwKda: '21.7',
  signalPeptide: '1-29',
  glycosylation: 'N-linked at Asn-73',
  domains: 'Cytokine',
  localization: 'Secreted',
  isoformCount: '1',
  tissueHigh: 'liver',
  tissueMed: 'spleen',
  tissueLow: 'kidney',
  wbImageUrl: null,
  ihcImageUrl: null,
  mainSkuWb: null,
  wbCitations: null,
  wbAntibodyUrl: null,
  pubCount: null,
  assayApps: null,
  uniprotUrl: 'https://www.uniprot.org/uniprot/P05231',
  proteinAtlasUrl: 'https://www.proteinatlas.org/ENSG00000136244-IL6',
  bosterGeneUrl: 'https://www.bosterbio.com/bosterbio-gene-info-cards/IL6',
  geoWbMw: '',
  geoDimer: '',
  geoTissue: '',
}

// Scenario B: real ADAMTS14 data (medium content, with product SKU)
const medContent: GeneCardProps = {
  gene: 'ADAMTS14',
  fullName: 'A Disintegrin And Metalloproteinase With Thrombospondin Motifs 14',
  aliases: 'ADAM-TS14, ADAMTS-14',
  superfamily: 'Peptidase M12B',
  uniprotId: 'Q8WXS8',
  mwKda: '87.3',
  signalPeptide: '1-26',
  glycosylation: 'N-linked at Asn-362, Asn-395, Asn-421',
  domains: 'Metalloprotease, Disintegrin-like, TSP type-1 (×3), PLAC',
  localization: 'Secreted, extracellular space, extracellular matrix',
  isoformCount: '3',
  tissueHigh: '',
  tissueMed: 'placenta, gallbladder',
  tissueLow: 'brain, lung, spleen, kidney, ovary',
  wbImageUrl: null,
  ihcImageUrl: null,
  mainSkuWb: 'A11645',
  wbCitations: '188',
  wbAntibodyUrl: 'https://www.bosterbio.com/anti-adamts14-antibody-a11645.html',
  pubCount: '47',
  assayApps: 'WB, IHC, ELISA, ICC',
  uniprotUrl: 'https://rest.uniprot.org/uniprotkb/Q8WXS8.json',
  proteinAtlasUrl: 'https://www.proteinatlas.org/ENSG00000138316-ADAMTS14',
  bosterGeneUrl: 'https://www.bosterbio.com/bosterbio-gene-info-cards/ADAMTS14',
  geoWbMw: 'ADAMTS14 runs at approximately 87–92 kDa on denaturing SDS-PAGE under reducing conditions. The slight upward shift from the predicted 87.3 kDa is consistent with extensive N-glycosylation at Asn-362, Asn-395, and Asn-421. A minor band near 60 kDa can occasionally be observed in certain lysates representing the processed propeptide form.',
  geoDimer: 'Under non-reducing conditions, ADAMTS14 may appear as a higher-molecular-weight species due to intermolecular disulfide bridges formed through its cysteine-rich domain. When comparing reducing and non-reducing gels, a band shift of 15–20 kDa is expected, confirming the presence of disulfide-linked dimers in native extracellular preparations.',
  geoTissue: 'ADAMTS14 shows highest transcript and protein expression in placenta, consistent with its role in remodeling extracellular collagen matrices in metabolically active tissues. Moderate expression in placenta supports a function in vascular remodeling during pregnancy. Lower levels across CNS tissues suggest limited neurological roles under normal physiological conditions.',
}

// Scenario C: stress — very long content, many tissues, long domains, all narratives
const longContent: GeneCardProps = {
  gene: 'VEGFA',
  fullName: 'Vascular Endothelial Growth Factor A — Pro-Angiogenic Growth Factor and Vasculogenesis Regulator',
  aliases: 'VEGF, VPF, MVCD1, Vascular Permeability Factor, Vasculotropin, VEGF-A',
  superfamily: 'Cystine-knot growth factor superfamily / PDGF superfamily',
  uniprotId: 'P15692',
  mwKda: '27.0',
  signalPeptide: '1-26',
  glycosylation: 'N-linked at Asn-74 (by similarity), N-linked at Asn-130 (by similarity), O-linked at Thr-120 (by similarity), Phosphoserine at Ser-249',
  domains: 'VEGF homology domain, Heparin-binding domain, Neuropilin-1 binding domain, Receptor binding domain (VEGFR-1/KDR), C-terminal matrix-binding domain, Cystine-knot motif',
  localization: 'Secreted, extracellular space; Cell surface; Cytoplasm; Nucleus',
  isoformCount: '14',
  tissueHigh: 'liver, kidney, placenta, testis, ovary, adrenal gland, thyroid, pituitary',
  tissueMed: 'brain, heart, lung, spleen, pancreas, stomach, small intestine, colon, bone marrow, lymph node',
  tissueLow: 'skeletal muscle, skin, tonsil, prostate, uterus, bladder, peripheral blood',
  wbImageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=600&fit=crop',
  ihcImageUrl: null,
  mainSkuWb: 'PA1080',
  wbCitations: '435',
  wbAntibodyUrl: 'https://www.bosterbio.com/anti-vegfa-picoband-antibody-pb9029.html',
  pubCount: '435',
  assayApps: 'WB, IHC, ELISA, FC, IF, ChIP',
  uniprotUrl: 'https://rest.uniprot.org/uniprotkb/P15692.json',
  proteinAtlasUrl: 'https://www.proteinatlas.org/ENSG00000112715-VEGFA',
  bosterGeneUrl: 'https://www.bosterbio.com/bosterbio-gene-info-cards/VEGFA',
  geoWbMw: 'In a Western blot, the VEGFA band typically appears between 27 and 38 kDa, not at the UniProt predicted mass of 27 kDa, because the predominant secreted isoform VEGF165 carries N-linked glycosylation at Asn-74 that adds 5–11 kDa to the apparent molecular weight. When VEGFA is expressed in bacteria or measured as a non-glycosylated recombinant standard, the band runs at approximately 23 kDa — significantly lower than what you will see in mammalian cell lysates or conditioned media. A smear or doublet anywhere in the 27–38 kDa range is therefore expected and does not indicate a non-specific band; it reflects the co-migration of multiple glycoforms of VEGF121 and VEGF165.',
  geoDimer: 'Under non-reducing gel conditions, VEGFA migrates as a ~50–60 kDa homodimer because VEGF165 is a disulfide-linked homodimer in its native secreted form. Adding beta-mercaptoethanol or DTT to the loading buffer disrupts these intermolecular disulfide bonds, collapsing the band to the 27–38 kDa monomer range. If you are running a non-reduced gel and see a band around 50–60 kDa, that is the expected native dimer and confirms antibody specificity. A mixture of reduced and non-reduced bands can appear in improperly denatured samples — ensure complete denaturation at 95 °C for 5–10 minutes with fresh reducing agent.',
  geoTissue: 'VEGFA is most abundantly expressed in metabolically active, highly vascularized tissues: liver, kidney, adrenal gland, and placenta consistently rank among the highest nTPM tissues in both RNA-seq (GTEx, HPA) and protein-level (HPA antibody) datasets. Moderately high expression in heart, lung, and brain reflects the continuous angiogenic maintenance demands of these organs. Skeletal muscle and skin express VEGFA at lower but functionally significant levels, particularly in response to hypoxia or exercise. Expression is markedly upregulated in virtually all solid tumor microenvironments, making VEGFA a key prognostic and therapeutic target in oncology.',
}

export default function TestPage() {
  return (
    <div className="min-h-screen bg-surface-subtle">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <h1 className="font-heading text-2xl font-bold text-ink mb-2">Layout Stress Test</h1>
        <p className="text-sm text-ink-secondary mb-8">
          Three scenarios: minimal (IL6), medium (ADAMTS14), max stress (VEGFA with all fields at max length).
        </p>

        <div className="space-y-16">
          <section>
            <h2 className="font-heading text-lg font-bold text-ink-secondary mb-4 uppercase tracking-wide text-xs">
              A — Short content (no image, no narratives, few tissues)
            </h2>
            <div className="border-2 border-dashed border-brand-muted rounded-2xl overflow-hidden">
              <GeneInfoCard {...shortContent} />
            </div>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-ink-secondary mb-4 uppercase tracking-wide text-xs">
              B — Medium content (ADAMTS14 — with SKU, citations, 2 narratives)
            </h2>
            <div className="border-2 border-dashed border-brand-muted rounded-2xl overflow-hidden">
              <GeneInfoCard {...medContent} />
            </div>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-ink-secondary mb-4 uppercase tracking-wide text-xs">
              C — Max stress (VEGFA — long name, many aliases, 14 isoforms, 25+ tissues, 6 apps, very long narratives)
            </h2>
            <div className="border-2 border-dashed border-brand-muted rounded-2xl overflow-hidden">
              <GeneInfoCard {...longContent} />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
