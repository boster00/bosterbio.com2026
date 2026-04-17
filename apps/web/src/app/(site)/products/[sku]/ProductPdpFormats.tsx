"use client"

import { useState } from "react"

type Props = {
  formats: string[]
  catalog: string
}

export function ProductPdpFormats({ formats, catalog }: Props) {
  const list = formats.length ? formats : ["Default"]
  const [selected, setSelected] = useState(list[0] ?? "Default")

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-[#004C95]/80">Format</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {list.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setSelected(f)}
            className={`min-h-[40px] rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
              selected === f
                ? "border-[#EA8D28] bg-[#EA8D28]/10 text-[#004C95]"
                : "border-[#004C95]/20 bg-white text-[#0f172a] hover:border-[#004C95]/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="mt-6 min-h-[48px] w-full max-w-md rounded-md px-6 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:opacity-95"
        style={{ backgroundColor: "#EA8D28" }}
        onClick={() => {
          window.location.href = `/cart?add=${encodeURIComponent(catalog)}&format=${encodeURIComponent(selected)}`
        }}
      >
        Add to cart
      </button>
      <p className="mt-2 text-xs text-slate-500">
        Selected: <span className="font-mono text-slate-700">{selected}</span> — cart wiring is stubbed for smoke test.
      </p>
    </div>
  )
}
