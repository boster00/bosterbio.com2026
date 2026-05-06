import type { GeneCardProps } from './types'

type Props = Pick<
  GeneCardProps,
  | 'superfamily'
  | 'uniprotId'
  | 'mwKda'
  | 'signalPeptide'
  | 'glycosylation'
  | 'domains'
  | 'localization'
  | 'isoformCount'
  | 'uniprotUrl'
>

const DASH = '—'

function val(v: string) {
  return v && v.trim() ? v : DASH
}

interface RowProps {
  label: string
  value: string
  mono?: boolean
}

function Row({ label, value, mono = false }: RowProps) {
  const isEmpty = value === DASH
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-4 py-3 border-b border-border last:border-0">
      <dt className="w-full sm:w-44 shrink-0 text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </dt>
      <dd
        className={`text-sm leading-relaxed ${
          isEmpty ? 'text-ink-muted italic' : 'text-ink'
        } ${mono ? 'font-mono text-xs' : ''}`}
      >
        {value}
      </dd>
    </div>
  )
}

export default function GeneOverviewCard({
  superfamily,
  uniprotId,
  mwKda,
  signalPeptide,
  glycosylation,
  domains,
  localization,
  isoformCount,
  uniprotUrl,
}: Props) {
  return (
    <section aria-labelledby="overview-heading">
      <div
        className="bg-card rounded-2xl shadow-boster overflow-hidden"
        style={{ borderLeft: '4px solid #EA8D28' }}
      >
        {/* Card header */}
        <div className="px-6 pt-6 pb-4 border-b border-border flex items-center justify-between gap-4">
          <div>
            <h2
              id="overview-heading"
              className="font-heading font-bold text-lg text-ink tracking-tight"
            >
              Gene Overview
            </h2>
            <p className="text-xs text-ink-secondary mt-0.5">
              Protein properties &amp; structural annotations
            </p>
          </div>
          {uniprotId && (
            <a
              href={uniprotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:opacity-80"
              style={{ background: '#e8f1fa', color: '#004C95' }}
            >
              <svg
                className="w-3.5 h-3.5 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                  clipRule="evenodd"
                />
              </svg>
              UniProt {uniprotId}
            </a>
          )}
        </div>

        {/* Data rows */}
        <dl className="px-6 py-2">
          <Row label="Superfamily" value={val(superfamily)} />
          <Row label="UniProt ID" value={val(uniprotId)} mono />
          <Row label="MW (kDa)" value={mwKda ? `${mwKda} kDa` : DASH} />
          <Row label="Signal Peptide" value={val(signalPeptide)} />
          <Row label="Glycosylation" value={val(glycosylation)} />
          <Row label="Domains" value={val(domains)} />
          <Row label="Localization" value={val(localization)} />
          <Row label="Isoforms" value={isoformCount ? `${isoformCount} isoform${Number(isoformCount) !== 1 ? 's' : ''}` : DASH} />
        </dl>
      </div>
    </section>
  )
}
