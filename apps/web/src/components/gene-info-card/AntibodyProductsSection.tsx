import Image from 'next/image'
import type { GeneCardProps } from './types'

type Props = Pick<
  GeneCardProps,
  | 'gene'
  | 'mainSkuWb'
  | 'wbCitations'
  | 'wbAntibodyUrl'
  | 'pubCount'
  | 'assayApps'
  | 'wbImageUrl'
  | 'ihcImageUrl'
  | 'geoAbSelection'
  | 'bosterGeneUrl'
  | 'relatedLysateImageUrl'
  | 'relatedLysateUrl'
  | 'relatedLysateSku'
>

export default function AntibodyProductsSection({
  gene,
  mainSkuWb,
  wbCitations,
  wbAntibodyUrl,
  pubCount,
  assayApps,
  wbImageUrl,
  ihcImageUrl,
  geoAbSelection,
  bosterGeneUrl,
  relatedLysateImageUrl,
  relatedLysateUrl,
  relatedLysateSku,
}: Props) {
  const hasProduct = Boolean(mainSkuWb || wbImageUrl)

  const apps = assayApps
    ? assayApps.split(',').map((a) => a.trim()).filter(Boolean)
    : []

  return (
    <section aria-labelledby="products-heading">
      <div className="bg-card rounded-2xl shadow-boster overflow-hidden">
        {/* Header */}
        <div
          className="px-6 pt-6 pb-4 border-b border-border flex items-center justify-between gap-4"
          style={{ borderLeft: '4px solid #EA8D28' }}
        >
          <div className="flex items-center gap-3">
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
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h2
                id="products-heading"
                className="font-heading font-bold text-lg text-ink tracking-tight"
              >
                Antibody Products
              </h2>
              <p className="text-xs text-ink-secondary mt-0.5">
                Which antibody should I use for my {gene} experiment?
              </p>
            </div>
          </div>

          {pubCount && (
            <div className="shrink-0 text-right">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: '#e8f1fa', color: '#004C95' }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
                </svg>
                {pubCount} Publications
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Reasoning narrative — leads the section, product is the conclusion */}
          {geoAbSelection && (
            <p className="text-sm text-ink-secondary leading-relaxed mb-5 line-clamp-4">{geoAbSelection}</p>
          )}

          {/* Product card */}
          {hasProduct ? (
            <div
              className="rounded-xl border border-border overflow-hidden"
              style={{ boxShadow: '0 1px 3px rgba(0,76,149,0.06)' }}
            >
              <div className="flex flex-col sm:flex-row">
                {/* Thumbnail */}
                {wbImageUrl && (
                  <div
                    className="sm:w-40 shrink-0 relative bg-surface-subtle border-r border-border"
                    style={{ minHeight: '140px' }}
                  >
                    <Image
                      src={wbImageUrl}
                      alt={`WB result for ${gene} antibody ${mainSkuWb}`}
                      fill
                      className="object-contain p-2"
                      sizes="160px"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 p-4 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                          Product SKU
                        </span>
                        <p className="font-heading font-bold text-xl text-ink mt-0.5 tracking-wide">
                          {mainSkuWb}
                        </p>
                      </div>
                      {wbCitations && (
                        <div
                          className="inline-flex flex-col items-center px-3 py-1.5 rounded-xl text-center"
                          style={{ background: '#f0fdf4' }}
                        >
                          <span className="font-heading font-bold text-lg leading-none text-green-700">
                            {wbCitations}
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-green-600 mt-0.5">
                            Citations
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Application chips */}
                    {apps.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {apps.map((app) => (
                          <span
                            key={app}
                            className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold"
                            style={{ background: '#e8f1fa', color: '#004C95' }}
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  {wbAntibodyUrl && (
                    <a
                      href={wbAntibodyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:opacity-90"
                      style={{ background: '#EA8D28', color: '#fff' }}
                    >
                      View Product Page
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
          ) : (
            <div className="rounded-xl border border-dashed border-border p-6 text-center">
              <p className="text-sm italic text-ink-muted">
                No validated antibody data available for this gene yet.
              </p>
              <p className="text-xs text-ink-muted mt-1">
                Check back as we expand our catalog coverage.
              </p>
            </div>
          )}

          {/* Related lysate — positive control product */}
          {(relatedLysateSku || relatedLysateUrl) && (
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
                WB Positive Control
              </p>
              <div
                className="rounded-xl border border-border overflow-hidden flex flex-col sm:flex-row"
                style={{ boxShadow: '0 1px 3px rgba(0,76,149,0.06)' }}
              >
                {relatedLysateImageUrl && (
                  <div
                    className="sm:w-28 shrink-0 relative bg-surface-subtle border-r border-border"
                    style={{ minHeight: '100px' }}
                  >
                    <Image
                      src={relatedLysateImageUrl}
                      alt={`WB gel for ${gene} over-expression lysate ${relatedLysateSku}`}
                      fill
                      className="object-contain p-2"
                      sizes="112px"
                    />
                  </div>
                )}
                <div className="flex-1 p-3 flex flex-col justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                      Over-Expression Lysate
                    </p>
                    <p className="font-heading font-bold text-base text-ink mt-0.5 tracking-wide font-mono">
                      {relatedLysateSku}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Human {gene} — use as WB positive control
                    </p>
                  </div>
                  {relatedLysateUrl && (
                    <a
                      href={relatedLysateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:opacity-90"
                      style={{ background: '#e8f1fa', color: '#004C95' }}
                    >
                      View Lysate
                      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Catalog browse link */}
          {bosterGeneUrl && (
            <div className="mt-5 pt-4 border-t border-border">
              <a
                href={bosterGeneUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:underline"
              >
                Browse all {gene} products at Boster
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
