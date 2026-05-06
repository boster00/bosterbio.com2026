import type { GeneCardProps } from './types'
import GeneHeroBar from './GeneHeroBar'
import GeneOverviewCard from './GeneOverviewCard'
import WesternBlotSection from './WesternBlotSection'
import TissueExpressionSection from './TissueExpressionSection'
import AntibodyProductsSection from './AntibodyProductsSection'
import ExternalLinksFooter from './ExternalLinksFooter'

export type { GeneCardProps }

export default function GeneInfoCard(props: GeneCardProps) {
  const {
    gene,
    fullName,
    aliases,
    superfamily,
    uniprotId,
    mwKda,
    signalPeptide,
    glycosylation,
    domains,
    localization,
    isoformCount,
    tissueHigh,
    tissueMed,
    tissueLow,
    wbImageUrl,
    ihcImageUrl,
    mainSkuWb,
    wbCitations,
    wbAntibodyUrl,
    pubCount,
    assayApps,
    uniprotUrl,
    proteinAtlasUrl,
    bosterGeneUrl,
    geoWbMw,
    geoDimer,
    geoTissue,
  } = props

  return (
    <main className="min-h-screen bg-background">
      {/* Hero bar — full bleed */}
      <GeneHeroBar gene={gene} fullName={fullName} aliases={aliases} />

      {/* Main content */}
      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
        {/* Top two-col grid: Overview left, WB right on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 mb-6 items-start">
          <GeneOverviewCard
            superfamily={superfamily}
            uniprotId={uniprotId}
            mwKda={mwKda}
            signalPeptide={signalPeptide}
            glycosylation={glycosylation}
            domains={domains}
            localization={localization}
            isoformCount={isoformCount}
            uniprotUrl={uniprotUrl}
          />
          <WesternBlotSection
            gene={gene}
            wbImageUrl={wbImageUrl}
            ihcImageUrl={ihcImageUrl}
            mwKda={mwKda}
            isoformCount={isoformCount}
            geoWbMw={geoWbMw}
            geoDimer={geoDimer}
            mainSkuWb={mainSkuWb}
            wbAntibodyUrl={wbAntibodyUrl}
          />
        </div>

        {/* Bottom two-col grid: Tissue left, Antibody right on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 mb-6 items-start">
          <TissueExpressionSection
            tissueHigh={tissueHigh}
            tissueMed={tissueMed}
            tissueLow={tissueLow}
            geoTissue={geoTissue}
          />
          <AntibodyProductsSection
            gene={gene}
            mainSkuWb={mainSkuWb}
            wbCitations={wbCitations}
            wbAntibodyUrl={wbAntibodyUrl}
            pubCount={pubCount}
            assayApps={assayApps}
            wbImageUrl={wbImageUrl}
            ihcImageUrl={ihcImageUrl}
          />
        </div>

        {/* External links footer row */}
        <ExternalLinksFooter
          gene={gene}
          uniprotUrl={uniprotUrl}
          proteinAtlasUrl={proteinAtlasUrl}
          bosterGeneUrl={bosterGeneUrl}
        />
      </div>
    </main>
  )
}
