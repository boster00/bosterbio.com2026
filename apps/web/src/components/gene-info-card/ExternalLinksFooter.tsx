import type { GeneCardProps } from './types'

type Props = Pick<GeneCardProps, 'gene' | 'uniprotUrl' | 'proteinAtlasUrl' | 'bosterGeneUrl'>

interface LinkButtonProps {
  href: string
  label: string
  sublabel: string
  iconPath: string
  bg: string
  color: string
  hoverBg: string
}

function LinkButton({ href, label, sublabel, iconPath, bg, color, hoverBg }: LinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 px-5 py-3.5 rounded-xl border border-border transition-all hover:shadow-boster-sm hover:-translate-y-0.5"
      style={{ background: bg, color }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
        style={{ background: hoverBg }}
      >
        <svg
          className="w-4.5 h-4.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d={iconPath} />
        </svg>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold leading-tight truncate">{label}</p>
        <p className="text-xs opacity-60 leading-tight mt-0.5">{sublabel}</p>
      </div>
      <svg
        className="w-4 h-4 ml-auto opacity-40 group-hover:opacity-70 shrink-0 transition-opacity"
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
    </a>
  )
}

export default function ExternalLinksFooter({
  gene,
  uniprotUrl,
  proteinAtlasUrl,
  bosterGeneUrl,
}: Props) {
  return (
    <section aria-labelledby="links-heading" className="mt-2">
      <div className="bg-card rounded-2xl shadow-boster p-6">
        <h2
          id="links-heading"
          className="font-heading font-bold text-base text-ink tracking-tight mb-4"
        >
          External Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <LinkButton
            href={uniprotUrl}
            label="UniProt"
            sublabel={`${gene} protein record`}
            iconPath="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 2a8 8 0 100 16A8 8 0 0012 4zm-1 4h2v6h-2V8zm0 8h2v2h-2v-2z"
            bg="#e8f1fa"
            color="#004C95"
            hoverBg="#c7daf5"
          />
          <LinkButton
            href={proteinAtlasUrl}
            label="Protein Atlas"
            sublabel={`${gene} expression atlas`}
            iconPath="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 3a4 4 0 100 8 4 4 0 000-8z"
            bg="#f0fdf4"
            color="#166534"
            hoverBg="#bbf7d0"
          />
          <LinkButton
            href={bosterGeneUrl}
            label="Boster Gene Card"
            sublabel={`All ${gene} products`}
            iconPath="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            bg="#fff7ed"
            color="#9a3412"
            hoverBg="#fed7aa"
          />
        </div>
      </div>
    </section>
  )
}
