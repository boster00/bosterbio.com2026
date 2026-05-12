const POPULAR_MARKERS = [
  { name: 'VEGFA', href: '/gene-info/VEGFA' },
  { name: 'IL6', href: '/gene-info/IL6' },
  { name: 'TP53', href: '/gene-info/TP53' },
  { name: 'TNF', href: '/gene-info/TNF' },
  { name: 'GAPDH', href: '/gene-info/GAPDH' },
  { name: 'ACTB', href: '/gene-info/ACTB' },
  { name: 'MKI67', href: '/gene-info/MKI67' },
  { name: 'CDH1', href: '/gene-info/CDH1' },
]

interface Props {
  currentGene?: string
}

export default function BiomarkerLibraryBanner({ currentGene }: Props) {
  const markers = POPULAR_MARKERS.filter((m) => m.name !== currentGene)

  return (
    <section aria-labelledby="library-heading">
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #004C95 0%, #006cbf 60%, #3CA9D6 100%)',
        }}
      >
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Left: Copy */}
            <div className="flex-1">
              {/* Eyebrow */}
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-3">
                Boster WB &amp; IHC Reference Library
              </p>

              <h2
                id="library-heading"
                className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight mb-3"
              >
                The only biomarker reference built<br className="hidden sm:block" /> for bench researchers
              </h2>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-xl">
                Most databases tell you what a protein does. We tell you what band to expect on
                your gel, which tissue to use as a positive control, and how to know if your
                result is real. Built for researchers who run Western blots and IHC — not just
                those who read about them.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/gene-info"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: '#fff', color: '#004C95' }}
                >
                  Search 5,000+ Biomarkers
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="/gene-info"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-white/10 border border-white/30"
                  style={{ color: '#fff' }}
                >
                  Browse library
                </a>
              </div>
            </div>

            {/* Right: Popular markers */}
            <div className="lg:w-64 xl:w-72 shrink-0">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-3">
                Popular biomarkers
              </p>
              <div className="flex flex-wrap gap-2">
                {markers.map((m) => (
                  <a
                    key={m.name}
                    href={m.href}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:bg-white/20"
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    {m.name}
                  </a>
                ))}
              </div>

              <div
                className="mt-5 rounded-xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <p className="text-xs font-bold text-white mb-1">What every page includes:</p>
                <ul className="space-y-0.5">
                  {[
                    'Expected band sizes & MW shifts',
                    'Validated positive control tissues',
                    'Protocol troubleshooting guide',
                    'Antibody selection reasoning',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-blue-100">
                      <span className="text-green-300 font-bold shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
