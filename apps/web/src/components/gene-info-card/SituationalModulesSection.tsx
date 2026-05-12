interface Module {
  question: string
  answer: string
  decisions: string[]
}

interface Props {
  gene: string
  situationalModulesJson: string
}

export default function SituationalModulesSection({ gene, situationalModulesJson }: Props) {
  let modules: Module[] = []
  try {
    modules = JSON.parse(situationalModulesJson)
  } catch {
    return null
  }
  if (!modules.length) return null

  return (
    <section aria-labelledby="situations-heading">
      <div className="bg-card rounded-2xl shadow-boster overflow-hidden">
        {/* Header */}
        <div
          className="px-6 pt-6 pb-4 border-b border-border flex items-center gap-3"
          style={{ borderLeft: '4px solid #8B5CF6' }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: '#f5f3ff' }}
          >
            {/* Question / magnifier icon */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 8v3m0 3h.01" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h2
              id="situations-heading"
              className="font-heading font-bold text-lg text-ink tracking-tight"
            >
              Common {gene} Experiment Challenges
            </h2>
            <p className="text-xs text-ink-secondary mt-0.5">
              Situations researchers actually encounter — and how to resolve them
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {modules.map((mod, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: '#fafbfc', border: '1px solid #e2e8f0' }}
            >
              {/* Question header */}
              <h3 className="font-heading font-bold text-base text-ink mb-2">
                {mod.question}
              </h3>

              {/* Answer */}
              <p className="text-sm text-ink-secondary leading-relaxed mb-3">
                {mod.answer}
              </p>

              {/* Decision lines */}
              {mod.decisions.length > 0 && (
                <div className="space-y-1.5 border-t border-border pt-3 mt-1">
                  {mod.decisions.map((d, j) => (
                    <p key={j} className="text-sm text-ink-secondary flex gap-2">
                      <span className="font-bold shrink-0" style={{ color: '#7C3AED' }}>→</span>
                      <span>{d}</span>
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
