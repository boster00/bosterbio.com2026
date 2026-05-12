import Image from 'next/image'
import type { GeneCardProps } from './types'

type Props = Pick<
  GeneCardProps,
  | 'gene'
  | 'wbImageUrl'
  | 'ihcImageUrl'
  | 'mwKda'
  | 'isoformCount'
  | 'geoWbMw'
  | 'geoDimer'
  | 'geoWbExpected'
  | 'mainSkuWb'
  | 'wbAntibodyUrl'
  | 'localization'
>

function NarrativeBlock({ text, label }: { text: string; label: string }) {
  if (!text) return null
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
        {label}
      </p>
      <p className="text-sm text-ink-secondary leading-relaxed">{text}</p>
    </div>
  )
}

export default function WesternBlotSection({
  gene,
  wbImageUrl,
  ihcImageUrl,
  mwKda,
  isoformCount,
  geoWbMw,
  geoDimer,
  geoWbExpected,
  mainSkuWb,
  wbAntibodyUrl,
  localization,
}: Props) {
  const hasImage = Boolean(wbImageUrl || ihcImageUrl)
  const activeImageUrl = wbImageUrl ?? ihcImageUrl
  const imageLabel = wbImageUrl ? 'Western Blot' : 'IHC'
  const isSecreted = localization
    ? localization.toLowerCase().includes('secreted')
    : false

  return (
    <section aria-labelledby="wb-heading">
      <div className="bg-card rounded-2xl shadow-boster overflow-hidden">
        {/* Header */}
        <div
          className="px-6 pt-6 pb-4 border-b border-border flex items-center gap-3"
          style={{ borderLeft: '4px solid #3CA9D6' }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: '#e8f1fa' }}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#004C95"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="7" height="18" rx="1" />
              <rect x="14" y="3" width="7" height="18" rx="1" />
              <line x1="6.5" y1="7" x2="6.5" y2="9" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="6.5" y1="12" x2="6.5" y2="16" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="17.5" y1="6" x2="17.5" y2="11" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="17.5" y1="14" x2="17.5" y2="17" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h2
              id="wb-heading"
              className="font-heading font-bold text-lg text-ink tracking-tight"
            >
              Western Blot Reference
            </h2>
            <p className="text-xs text-ink-secondary mt-0.5">
              What WB bands should I expect for {gene}?
            </p>
          </div>
        </div>

        <div className="p-6">
          {/* Secreted protein alert — shown before everything else */}
          {isSecreted && (
            <div
              className="mb-5 rounded-xl px-4 py-3 flex items-start gap-3"
              style={{ background: '#fffbeb', border: '1px solid #fde68a' }}
            >
              <span className="text-base mt-0.5 shrink-0">⚠</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-0.5">
                  Secreted Protein — WB Tip
                </p>
                <p className="text-sm text-amber-900 leading-relaxed">
                  {gene} is secreted into the extracellular space, so whole-cell lysates often
                  underrepresent it. Use tissue lysate (placenta) or conditioned media for
                  strongest signal. If signal is weak, this is the first variable to address.
                </p>
              </div>
            </div>
          )}

          <div className={`flex flex-col ${hasImage ? 'lg:flex-row' : ''} gap-6`}>
            {/* Left: Image panel */}
            {hasImage && activeImageUrl ? (
              <div className="lg:w-56 xl:w-64 shrink-0">
                <div
                  className="relative w-full rounded-xl overflow-hidden border border-border bg-surface-subtle"
                  style={{ aspectRatio: '3/4', maxHeight: '320px' }}
                >
                  <Image
                    src={activeImageUrl}
                    alt={`${imageLabel} image for ${gene}`}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 1024px) 100vw, 288px"
                  />
                  {/* Label overlay */}
                  <span
                    className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                    style={{ background: '#004C95', color: '#fff' }}
                  >
                    {imageLabel}
                  </span>
                </div>
              </div>
            ) : null}

            {/* Right: Metadata + narratives */}
            <div className="flex-1 min-w-0 overflow-hidden">
              {/* Badge row */}
              <div className="flex flex-wrap gap-3 mb-5">
                {mwKda && (
                  <div
                    className="inline-flex flex-col items-center justify-center px-4 py-2.5 rounded-xl text-center"
                    style={{ background: '#e8f1fa', minWidth: '100px' }}
                  >
                    <span className="font-heading font-bold text-2xl leading-none text-brand-primary">
                      {mwKda}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-secondary mt-0.5">
                      kDa
                    </span>
                    <span className="text-[10px] text-ink-muted mt-0.5">Predicted MW</span>
                  </div>
                )}
                {isoformCount && (
                  <div
                    className="inline-flex flex-col items-center justify-center px-4 py-2.5 rounded-xl text-center"
                    style={{ background: '#fff7ed', minWidth: '100px' }}
                  >
                    <span className="font-heading font-bold text-2xl leading-none text-accent-orange">
                      {isoformCount}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-secondary mt-0.5">
                      Isoform{Number(isoformCount) !== 1 ? 's' : ''}
                    </span>
                    <span className="text-[10px] text-ink-muted mt-0.5">Splice variants</span>
                  </div>
                )}
                {mainSkuWb && (
                  <div
                    className="inline-flex flex-col items-center justify-center px-4 py-2.5 rounded-xl text-center"
                    style={{ background: '#f0fdf4', minWidth: '100px' }}
                  >
                    <span className="font-heading font-bold text-sm leading-snug text-green-700 font-mono tracking-wide">
                      {mainSkuWb}
                    </span>
                    <span className="text-[10px] text-ink-muted mt-1">WB Antibody SKU</span>
                  </div>
                )}
              </div>

              {/* Narrative blocks — order: MW → Correct result → Dimer */}
              {!geoWbMw && !geoDimer && (
                <p className="text-sm italic text-ink-muted">
                  Detailed WB narrative not yet generated for this gene.
                </p>
              )}
              <NarrativeBlock
                label="Expected Band Size"
                text={geoWbMw}
              />
              {geoWbExpected && (
                <div className="mt-4 rounded-xl px-4 py-3" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                  <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-1.5">
                    ✓ What a Correct Result Looks Like
                  </p>
                  <p className="text-sm text-green-900 leading-relaxed">{geoWbExpected}</p>
                </div>
              )}
              <NarrativeBlock
                label="Reducing vs. Non-Reducing Conditions"
                text={geoDimer}
              />

              {/* Link to antibody */}
              {wbAntibodyUrl && mainSkuWb && (
                <a
                  href={wbAntibodyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:opacity-90"
                  style={{ background: '#004C95', color: '#fff' }}
                >
                  View Antibody {mainSkuWb}
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
