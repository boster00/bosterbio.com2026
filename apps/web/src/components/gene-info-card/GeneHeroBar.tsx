import type { GeneCardProps } from './types'

type Props = Pick<GeneCardProps, 'gene' | 'fullName' | 'aliases'>

export default function GeneHeroBar({ gene, fullName, aliases }: Props) {
  return (
    <header
      className="w-full"
      style={{
        background: 'linear-gradient(105deg, #003366 0%, #004C95 55%, #1a6ab5 100%)',
      }}
    >
      {/* Subtle top accent stripe */}
      <div className="h-1 w-full" style={{ background: '#EA8D28' }} />

      <div className="max-w-[1200px] mx-auto px-4 py-10 md:py-14">
        <div className="flex flex-col gap-3">
          {/* Breadcrumb-style label */}
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-200/70 font-heading">
            Gene / Protein Reference
          </p>

          {/* Gene symbol */}
          <h1
            className="font-heading font-bold leading-none tracking-tight text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            {gene}
          </h1>

          {/* Full name */}
          <p
            className="font-sans text-blue-100 leading-snug max-w-2xl break-words"
            style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.05rem)' }}
          >
            {fullName}
          </p>

          {/* Aliases pill */}
          {aliases ? (
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-200/60 self-center">
                Also known as:
              </span>
              {aliases.split(',').map((alias) => (
                <span
                  key={alias.trim()}
                  className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold font-sans"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    color: '#bfdbfe',
                    border: '1px solid rgba(255,255,255,0.18)',
                  }}
                >
                  {alias.trim()}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
