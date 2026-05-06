import type { GeneCardProps } from './types'

type Props = Pick<GeneCardProps, 'tissueHigh' | 'tissueMed' | 'tissueLow' | 'geoTissue'>

interface LevelRowProps {
  label: string
  tissues: string
  chipBg: string
  chipText: string
  dotColor: string
  levelLabel: string
}

const MAX_CHIPS = 8

function LevelRow({ label, tissues, chipBg, chipText, dotColor, levelLabel }: LevelRowProps) {
  const items = tissues
    ? tissues
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : []

  const visible = items.slice(0, MAX_CHIPS)
  const overflow = items.length - MAX_CHIPS

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 min-w-0">
      {/* Level indicator */}
      <div className="flex items-center gap-2 w-full sm:w-36 shrink-0">
        <span
          className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
          style={{ background: dotColor }}
          aria-hidden="true"
        />
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: dotColor }}>
          {levelLabel}
        </span>
        <span className="text-xs text-ink-muted ml-0.5">
          ({items.length})
        </span>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-1.5 min-w-0" role="list" aria-label={`${label} expression tissues`}>
        {items.length > 0 ? (
          <>
            {visible.map((tissue) => (
              <span
                key={tissue}
                role="listitem"
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap"
                style={{ background: chipBg, color: chipText }}
              >
                {tissue}
              </span>
            ))}
            {overflow > 0 && (
              <span
                role="listitem"
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: '#e2eaf3', color: '#475569' }}
                title={items.slice(MAX_CHIPS).join(', ')}
              >
                +{overflow} more
              </span>
            )}
          </>
        ) : (
          <span className="text-xs italic text-ink-muted">—</span>
        )}
      </div>
    </div>
  )
}

export default function TissueExpressionSection({
  tissueHigh,
  tissueMed,
  tissueLow,
  geoTissue,
}: Props) {
  return (
    <section aria-labelledby="tissue-heading">
      <div className="bg-card rounded-2xl shadow-boster overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: '#fff7ed' }}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EA8D28"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3" fill="#EA8D28" stroke="none" />
            </svg>
          </div>
          <div>
            <h2
              id="tissue-heading"
              className="font-heading font-bold text-lg text-ink tracking-tight"
            >
              Tissue Expression
            </h2>
            <p className="text-xs text-ink-secondary mt-0.5">
              RNA &amp; protein expression by tissue type
            </p>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* High expression */}
          <LevelRow
            label="High"
            levelLabel="High"
            tissues={tissueHigh}
            chipBg="#fee2e2"
            chipText="#991b1b"
            dotColor="#dc2626"
          />

          {/* Medium expression */}
          <LevelRow
            label="Medium"
            levelLabel="Medium"
            tissues={tissueMed}
            chipBg="#ffedd5"
            chipText="#9a3412"
            dotColor="#ea580c"
          />

          {/* Low expression */}
          <LevelRow
            label="Low"
            levelLabel="Low"
            tissues={tissueLow}
            chipBg="#dbeafe"
            chipText="#1e40af"
            dotColor="#3b82f6"
          />

          {/* GEO narrative */}
          {geoTissue && (
            <div
              className="mt-4 rounded-xl px-4 py-3 border-l-2"
              style={{ background: '#f4f8fc', borderLeftColor: '#3CA9D6' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                Expression Summary
              </p>
              <p className="text-sm text-ink-secondary leading-relaxed line-clamp-5">{geoTissue}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
