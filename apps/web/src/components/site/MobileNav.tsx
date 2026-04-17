"use client"

import Link from "next/link"
import { useState } from "react"
import {
  aboutLinks,
  analyticalServicesLinks,
  productsColumns,
  promotionsCards,
  promotionsPopularPages,
  servicesColumns,
  supportEducational,
  supportResourceBlocks,
} from "@/data/nav-mega-menu"
import { cn } from "@/lib/cn"

function AccordionSection({
  title,
  accent,
  children,
  defaultOpen,
}: {
  title: string
  accent?: boolean
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="border-b border-brand/10">
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between px-4 py-3 text-left font-heading text-sm font-bold uppercase tracking-wide",
          accent ? "bg-accent-warm text-white" : "bg-brand-tint/60 text-brand",
        )}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {title}
        <span className="text-lg leading-none">{open ? "−" : "+"}</span>
      </button>
      {open ? <div className="bg-white px-4 py-3">{children}</div> : null}
    </div>
  )
}

export function MobileNav() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand/20 text-brand hover:bg-brand-tint md:hidden"
        aria-expanded={drawerOpen}
        aria-controls="mobile-menu"
        onClick={() => setDrawerOpen((o) => !o)}
      >
        <span className="sr-only">Menu</span>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          {drawerOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[min(100%,22rem)] flex-col border-l border-brand/15 bg-white shadow-card transition-transform duration-200 ease-out md:hidden",
          drawerOpen ? "translate-x-0" : "translate-x-full pointer-events-none",
        )}
      >
        <div className="flex items-center justify-between border-b border-brand/10 bg-brand px-4 py-3 text-white">
          <span className="font-heading text-lg font-bold">Menu</span>
          <button
            type="button"
            className="rounded-full p-2 hover:bg-white/10"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AccordionSection title="Promotions" accent defaultOpen>
            <p className="mb-2 text-xs font-bold uppercase text-ink-tertiary">Popular pages</p>
            <ul className="space-y-2">
              {promotionsPopularPages.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-brand hover:underline"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mb-2 mt-4 text-xs font-bold uppercase text-ink-tertiary">Promotions</p>
            <ul className="space-y-2">
              {promotionsCards.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm text-brand hover:underline" onClick={() => setDrawerOpen(false)}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/promotions"
              className="mt-3 inline-block text-sm font-bold text-accent-warm"
              onClick={() => setDrawerOpen(false)}
            >
              View all promotions →
            </Link>
          </AccordionSection>

          <AccordionSection title="Products">
            {productsColumns.map((col) => (
              <div key={col.title} className="mb-4">
                <strong className="text-sm text-brand">{col.title}</strong>
                <ul className="mt-1 space-y-1.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-ink-secondary hover:underline" onClick={() => setDrawerOpen(false)}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </AccordionSection>

          <AccordionSection title="Services">
            {servicesColumns.map((col) => (
              <div key={col.title} className="mb-4">
                <strong className="text-sm text-brand">{col.title}</strong>
                <ul className="mt-1 space-y-1.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-ink-secondary hover:underline" onClick={() => setDrawerOpen(false)}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="mb-4">
              <strong className="text-sm text-brand">Analytical services</strong>
              <ul className="mt-1 space-y-1.5">
                {analyticalServicesLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink-secondary hover:underline" onClick={() => setDrawerOpen(false)}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionSection>

          <AccordionSection title="Support">
            {supportResourceBlocks.map((b) => (
              <div key={b.title} className="mb-3">
                <Link href={b.href} className="text-sm font-bold text-brand hover:underline" onClick={() => setDrawerOpen(false)}>
                  {b.title}
                </Link>
                <ul className="mt-1 space-y-1">
                  {b.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-ink-secondary hover:underline" onClick={() => setDrawerOpen(false)}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <strong className="text-sm text-brand">Educational</strong>
            <ul className="mt-1 space-y-1">
              {supportEducational.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-secondary hover:underline" onClick={() => setDrawerOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 border-t border-brand/10 pt-3">
              <Link href="/resources/troubleshooting-ebooks" className="block text-sm font-bold text-accent-warm" onClick={() => setDrawerOpen(false)}>
                Troubleshooting eBooks →
              </Link>
              <Link href="/supportformpage" className="block text-sm font-bold text-accent-warm" onClick={() => setDrawerOpen(false)}>
                Technical support form →
              </Link>
            </div>
          </AccordionSection>

          <div className="border-b border-brand/10">
            <Link
              href="/blog"
              className="block bg-brand-tint/60 px-4 py-3 font-heading text-sm font-bold uppercase tracking-wide text-brand"
              onClick={() => setDrawerOpen(false)}
            >
              Blog
            </Link>
          </div>

          <AccordionSection title="About">
            <ul className="space-y-2">
              {aboutLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-brand hover:underline" onClick={() => setDrawerOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionSection>

          <div className="border-b border-brand/10">
            <Link
              href="/distributors"
              className="block bg-brand-tint/60 px-4 py-3 font-heading text-sm font-bold uppercase tracking-wide text-brand"
              onClick={() => setDrawerOpen(false)}
            >
              Distributors
            </Link>
          </div>

          <div className="p-4">
            <Link href="/account" className="block py-2 text-sm font-semibold text-brand" onClick={() => setDrawerOpen(false)}>
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {drawerOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-brand-deep/40 md:hidden"
          aria-label="Close menu"
          onClick={() => setDrawerOpen(false)}
        />
      ) : null}
    </>
  )
}
