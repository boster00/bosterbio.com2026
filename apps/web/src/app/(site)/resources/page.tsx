import Link from "next/link"

const sections = [
  {
    id: "protocols",
    title: "Protocols",
    body: "Western blot, IHC, ICC, ELISA, flow cytometry, and more — step-by-step methods and troubleshooting from our applications team.",
  },
  {
    id: "faq",
    title: "FAQs",
    body: "Storage, dilutions, species cross-reactivity, and secondary selection — answers to common antibody and kit questions.",
  },
  {
    id: "western-blot",
    title: "Western blot",
    body: "Primary and secondary antibody selection, blocking buffers, and troubleshooting high background or weak signal.",
  },
  {
    id: "ihc",
    title: "IHC & ICC",
    body: "Antigen retrieval, permeabilization, and multiplex panel design for tissue and cultured cells.",
  },
  {
    id: "elisa",
    title: "ELISA",
    body: "Standard curves, sample dilution strategies, and Picokine® sensitivity for low-abundance analytes.",
  },
  {
    id: "flow",
    title: "Flow cytometry",
    body: "Fluorophore choice, compensation, and gating fundamentals for multicolor panels.",
  },
  {
    id: "blog",
    title: "Blog & updates",
    body: "Application notes and method updates from our technical team.",
  },
  {
    id: "citations",
    title: "Citations",
    body: "Explore how researchers use BosterBio reagents in peer-reviewed literature.",
  },
] as const

export default function ResourcesPage() {
  return (
    <main id="main-content">
      <div className="border-b border-surface-muted bg-gradient-to-br from-brand-muted to-white">
        <div className="container-content py-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">Resources</p>
          <h1 className="mt-2 font-display text-display-md text-ink">Protocols &amp; learning hub</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-secondary">
            Practical guidance for the assays you run every week — written for working scientists, not sales decks.
          </p>
        </div>
      </div>

      <div className="container-content py-12">
        <ul className="grid gap-6 md:grid-cols-2">
          {sections.map((s) => (
            <li key={s.id} id={s.id} className="scroll-mt-28 rounded-xl border border-surface-muted bg-surface p-6 shadow-card">
              <h2 className="font-display text-title text-ink">{s.title}</h2>
              <p className="mt-3 text-sm text-ink-secondary">{s.body}</p>
              <Link href="/contact" className="mt-4 inline-block text-sm font-semibold text-brand hover:underline">
                Request a protocol →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
