import Link from "next/link"
import { CategoryBadgeIcon } from "@/components/ui/CategoryBadgeIcon"

const sections = [
  {
    id: "protocols",
    title: "Protocols",
    body: "Western blot, IHC, ICC, ELISA, flow cytometry, and more — step-by-step methods and troubleshooting from our applications team.",
    badge: "protocols" as const,
  },
  {
    id: "faq",
    title: "FAQs",
    body: "Storage, dilutions, species cross-reactivity, and secondary selection — answers to common antibody and kit questions.",
    badge: "resources" as const,
  },
  {
    id: "western-blot",
    title: "Western blot",
    body: "Primary and secondary antibody selection, blocking buffers, and troubleshooting high background or weak signal.",
    badge: "antibodies" as const,
  },
  {
    id: "ihc",
    title: "IHC & ICC",
    body: "Antigen retrieval, permeabilization, and multiplex panel design for tissue and cultured cells.",
    badge: "protocols" as const,
  },
  {
    id: "elisa",
    title: "ELISA",
    body: "Standard curves, sample dilution strategies, and Picokine® sensitivity for low-abundance analytes.",
    badge: "elisa" as const,
  },
  {
    id: "flow",
    title: "Flow cytometry",
    body: "Fluorophore choice, compensation, and gating fundamentals for multicolor panels.",
    badge: "resources" as const,
  },
  {
    id: "blog",
    title: "Blog & updates",
    body: "Application notes and method updates from our technical team.",
    badge: "resources" as const,
  },
  {
    id: "citations",
    title: "Citations",
    body: "Explore how researchers use BosterBio reagents in peer-reviewed literature.",
    badge: "resources" as const,
  },
] as const

export default function ResourcesPage() {
  return (
    <main id="main-content">
      <div className="page-hero-bar border-b border-brand/10">
        <div className="container-content py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Resources</p>
          <h1 className="mt-2 font-display text-display-md text-brand">Protocols, FAQs &amp; blog</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-secondary">
            Protocols, frequently asked questions, technical articles, and citation resources — written for working
            scientists, not sales decks.
          </p>
        </div>
      </div>

      <div className="container-content py-12">
        <ul className="grid gap-6 md:grid-cols-2">
          {sections.map((s) => (
            <li
              key={s.id}
              id={s.id}
              className="scroll-mt-28 flex gap-4 rounded-2xl border border-brand/10 bg-white p-6 shadow-card"
            >
              <CategoryBadgeIcon variant={s.badge} size="sm" />
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-title text-brand">{s.title}</h2>
                <p className="mt-3 text-sm text-ink-secondary">{s.body}</p>
                <Link href="/contact" className="mt-4 inline-block text-sm font-bold text-accent hover:underline">
                  Contact applications →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
