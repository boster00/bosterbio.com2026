import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Design guide | BosterBio 2026",
  description: "Internal reference for typography, color, and UI patterns used on bosterbio.com2026.",
}

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-16 w-full rounded-xl border border-brand/10 shadow-sm" style={{ backgroundColor: hex }} />
      <p className="font-mono text-xs text-ink-secondary">{name}</p>
      <p className="font-mono text-xs text-ink-tertiary">{hex}</p>
    </div>
  )
}

export default function DesignGuidePage() {
  return (
    <main id="main-content" className="min-h-screen bg-surface-subtle pb-20">
      <div className="border-b border-brand/10 bg-gradient-to-br from-brand via-brand-deep to-brand-dark text-white">
        <div className="container-content py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-soft">BosterBio · 2026</p>
          <h1 className="mt-3 font-display text-display-lg">Design system guide</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Typography (Inter), brand colors, buttons, cards, and form patterns used across the storefront.
          </p>
        </div>
      </div>

      <div className="container-content space-y-16 py-12">
        <section className="rounded-2xl border border-brand/10 bg-white p-8 shadow-card">
          <h2 className="font-display text-display-md text-brand">Typography</h2>
          <p className="mt-2 text-ink-secondary">
            <strong className="text-ink">Inter</strong> for body and headings (via Next.js <code className="font-mono text-xs">next/font</code> —{" "}
            <code className="font-mono text-xs">--font-sans</code> and <code className="font-mono text-xs">--font-heading</code>).
          </p>
          <div className="mt-8 space-y-6 border-t border-brand/10 pt-8">
            <div>
              <p className="font-display text-display-lg text-brand">Display large</p>
              <p className="mt-1 font-mono text-xs text-ink-tertiary">font-display text-display-lg</p>
            </div>
            <div>
              <p className="font-display text-display-md text-brand">Display medium</p>
              <p className="mt-1 font-mono text-xs text-ink-tertiary">font-display text-display-md</p>
            </div>
            <div>
              <p className="font-display text-title text-brand">Title / section heading</p>
              <p className="mt-1 font-mono text-xs text-ink-tertiary">font-display text-title</p>
            </div>
            <div>
              <p className="text-base text-ink">
                Body — Inter at base size for readable paragraphs, support text, and navigation labels. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </p>
              <p className="mt-1 font-mono text-xs text-ink-tertiary">font-sans text-base text-ink</p>
            </div>
            <div>
              <p className="text-sm text-ink-secondary">Secondary body for captions and helper text.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-brand/10 bg-white p-8 shadow-card">
          <h2 className="font-display text-display-md text-brand">Color palette</h2>
          <p className="mt-2 text-sm text-ink-secondary">
            Figma primaries: deep blue <span className="font-mono text-ink">#1a365d</span>, accent orange{" "}
            <span className="font-mono text-ink">#f97316</span> (Tailwind <code className="font-mono text-xs">brand</code> /{" "}
            <code className="font-mono text-xs">accent</code>).
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Swatch name="brand.DEFAULT (Figma blue)" hex="#1a365d" />
            <Swatch name="brand.deep" hex="#15294a" />
            <Swatch name="brand.dark" hex="#0f1f36" />
            <Swatch name="accent.DEFAULT (Figma orange)" hex="#f97316" />
            <Swatch name="accent.hover" hex="#ea670c" />
            <Swatch name="brand.sky" hex="#3CA9D6" />
            <Swatch name="surface.subtle" hex="#f4f8fc" />
            <Swatch name="ink.DEFAULT" hex="#1e293b" />
            <Swatch name="accent.soft" hex="#fff7ed" />
            <Swatch name="brand.tint" hex="#f0f7fc" />
          </div>
        </section>

        <section className="rounded-2xl border border-brand/10 bg-white p-8 shadow-card">
          <h2 className="font-display text-display-md text-brand">Buttons & links</h2>
          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-brand/10 pt-8">
            <button
              type="button"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-accent-hover"
            >
              Primary filled
            </button>
            <button
              type="button"
              className="rounded-full border-2 border-brand px-6 py-2.5 text-sm font-bold text-brand transition hover:bg-brand-tint"
            >
              Outline
            </button>
            <Link href="/" className="text-sm font-bold text-accent underline-offset-4 transition hover:underline">
              Text link (hover underline)
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-brand/10 bg-white p-8 shadow-card">
          <h2 className="font-display text-display-md text-brand">Cards & badges</h2>
          <div className="mt-8 grid gap-6 border-t border-brand/10 pt-8 md:grid-cols-2">
            <article className="rounded-2xl border border-brand/10 border-l-4 border-l-accent bg-brand-tint/30 p-6 shadow-card">
              <h3 className="font-display text-title text-brand">Product-style card</h3>
              <p className="mt-2 text-sm text-ink-secondary">Left orange border, soft blue tint header row.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-bold text-brand">WB</span>
                <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-bold text-brand">IHC</span>
              </div>
            </article>
            <div className="flex flex-col justify-center gap-3 rounded-2xl border border-dashed border-brand/20 bg-surface-subtle p-6">
              <span className="inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 font-mono text-xs font-bold text-white">
                A00001-2
              </span>
              <span className="inline-flex w-fit rounded-full bg-brand-muted px-3 py-1 text-xs font-bold text-brand">Info pill</span>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-brand/10 bg-white p-8 shadow-card">
          <h2 className="font-display text-display-md text-brand">Form controls</h2>
          <div className="mt-8 grid max-w-xl gap-4 border-t border-brand/10 pt-8">
            <label className="block text-xs font-bold uppercase tracking-wide text-brand/80">
              Sample input
              <input
                type="text"
                placeholder="Search catalog…"
                readOnly
                className="mt-1.5 h-11 w-full rounded-xl border border-brand/15 bg-brand-tint/40 px-3 text-sm"
              />
            </label>
            <label className="block text-xs font-bold uppercase tracking-wide text-brand/80">
              Select
              <select className="mt-1.5 h-11 w-full rounded-xl border border-brand/15 bg-brand-tint/40 px-3 text-sm" disabled>
                <option>All applications</option>
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-brand/10 bg-gradient-to-b from-brand-tint to-white p-8 shadow-card">
          <h2 className="font-display text-display-md text-brand">Marketing strip</h2>
          <p className="mt-2 text-ink-secondary">Blue-to-white gradient panel (e.g. pricing sections).</p>
        </section>
      </div>
    </main>
  )
}
