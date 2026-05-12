import type { GeneCardProps } from './types'

type Props = Pick<
  GeneCardProps,
  | 'gene'
  | 'geoControls'
  | 'posControlTissues'
  | 'negControlTissues'
  | 'loadingControl'
  | 'ihcPatternTitle'
  | 'ihcPatternDetail'
  | 'geoAbSelection'
  | 'gotchaNote'
  | 'mainSkuWb'
  | 'wbCitations'
  | 'assayApps'
>

function ChipList({ items, color }: { items: string[]; color: 'green' | 'red' }) {
  if (!items.length) return null
  const styles =
    color === 'green'
      ? { bg: '#f0fdf4', text: '#15803d', dot: '#16a34a' }
      : { bg: '#fef2f2', text: '#b91c1c', dot: '#ef4444' }
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {items.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{ background: styles.bg, color: styles.text }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: styles.dot }}
          />
          {t.trim()}
        </span>
      ))}
    </div>
  )
}

export default function ExperimentDesignSection({
  gene,
  geoControls,
  posControlTissues,
  negControlTissues,
  loadingControl,
  ihcPatternTitle,
  ihcPatternDetail,
  geoAbSelection,
  gotchaNote,
  mainSkuWb,
  wbCitations,
  assayApps,
}: Props) {
  const hasControls = Boolean(geoControls || posControlTissues || negControlTissues)
  const hasIhc = Boolean(ihcPatternTitle || ihcPatternDetail)
  const hasAbGuide = Boolean(geoAbSelection || mainSkuWb)
  const hasGotcha = Boolean(gotchaNote)

  if (!hasControls && !hasIhc && !hasAbGuide && !hasGotcha) return null

  const posTissues = posControlTissues ? posControlTissues.split(',') : []
  const negTissues = negControlTissues ? negControlTissues.split(',') : []
  const apps = assayApps ? assayApps.split(',').map((a) => a.trim()).filter(Boolean) : []

  return (
    <section aria-labelledby="expdesign-heading">
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
            {/* Flask icon */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#004C95"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path
                d="M9 3h6M9 3v8L5.5 16.5A2 2 0 007 20h10a2 2 0 001.5-3.5L15 11V3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line x1="9" y1="12" x2="15" y2="12" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h2
              id="expdesign-heading"
              className="font-heading font-bold text-lg text-ink tracking-tight"
            >
              Experiment Design Guide
            </h2>
            <p className="text-xs text-ink-secondary mt-0.5">
              How should I design a {gene} experiment to get interpretable results?
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Controls subsection */}
          {hasControls && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3">
                Positive &amp; Negative Controls
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {posTissues.length > 0 && (
                  <div
                    className="rounded-xl p-4"
                    style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-1">
                      ✓ Positive controls
                    </p>
                    <ChipList items={posTissues} color="green" />
                  </div>
                )}
                {negTissues.length > 0 && (
                  <div
                    className="rounded-xl p-4"
                    style={{ background: '#fef2f2', border: '1px solid #fecaca' }}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-red-700 mb-1">
                      ✗ Negative controls
                    </p>
                    <ChipList items={negTissues} color="red" />
                  </div>
                )}
              </div>
              {loadingControl && (
                <p className="text-xs text-ink-muted mt-2">
                  <span className="font-semibold">Loading control:</span> {loadingControl}
                </p>
              )}
              {geoControls && (
                <p className="text-sm text-ink-secondary leading-relaxed mt-3">
                  {geoControls}
                </p>
              )}
            </div>
          )}

          {/* IHC staining pattern */}
          {hasIhc && (
            <div className="border-t border-border pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
                Expected IHC Staining Pattern
              </h3>
              {ihcPatternTitle && (
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-2"
                  style={{ background: '#e8f1fa', color: '#004C95' }}
                >
                  {ihcPatternTitle}
                </span>
              )}
              {ihcPatternDetail && (
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {ihcPatternDetail}
                </p>
              )}
            </div>
          )}

          {/* Antibody selection guide */}
          {hasAbGuide && (
            <div className="border-t border-border pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3">
                Which Antibody for Your Experiment?
              </h3>
              {apps.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                  {apps.map((app) => (
                    <div
                      key={app}
                      className="rounded-lg p-2.5 text-center"
                      style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                    >
                      <p className="text-xs font-bold text-brand-primary">{app}</p>
                      <p className="text-[10px] text-ink-muted mt-0.5">
                        {mainSkuWb && (app === 'WB') ? mainSkuWb : '→ validated'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {geoAbSelection && (
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {geoAbSelection}
                </p>
              )}
            </div>
          )}

          {/* Gotcha / common mistakes */}
          {hasGotcha && (
            <div
              className="rounded-xl p-4 border-t border-border pt-4"
              style={{ background: '#fffbeb', border: '1px solid #fde68a' }}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1.5">
                ⚠ Common Detection Mistakes
              </p>
              <p className="text-sm leading-relaxed text-amber-900">
                {gotchaNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
