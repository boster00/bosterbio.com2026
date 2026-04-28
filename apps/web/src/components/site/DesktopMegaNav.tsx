"use client"

import Link from "next/link"
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

function DropMenuTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "dropmenu_title font-heading text-[11px] font-bold uppercase tracking-[0.14em] sm:text-xs",
        className,
      )}
    >
      {children}
    </p>
  )
}

function ColumnHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <strong className={cn("mb-2 block text-sm font-bold text-white", className)}>{children}</strong>
}

function MegaPanel({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode
  className?: string
  innerClassName?: string
}) {
  return (
    <div
      className={cn(
        "pointer-events-none invisible absolute left-0 right-0 top-full z-[60] pt-1 opacity-0 shadow-xl transition-[opacity,visibility] duration-150",
        "group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100",
        "group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100",
        className,
      )}
    >
      <div className={cn("mx-auto w-full max-w-[1440px] px-[var(--container-px)] pb-6 pt-4", innerClassName)}>
        {children}
      </div>
    </div>
  )
}

export function DesktopMegaNav() {
  const analyticalHalf = Math.ceil(analyticalServicesLinks.length / 2)
  const analyticalCol1 = analyticalServicesLinks.slice(0, analyticalHalf)
  const analyticalCol2 = analyticalServicesLinks.slice(analyticalHalf)

  return (
    <nav className="relative border-t border-brand-primary/10 bg-brand-primary text-white" aria-label="Primary">
      <div className="mx-auto flex w-full max-w-[1440px] items-stretch px-[var(--container-px)]">
        {/* 1. Promotions */}
        <div className="group flex-1">
          <button
            type="button"
            className="flex h-full w-full items-center justify-center gap-1 bg-accent-warm px-2 py-3.5 text-center font-heading text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-accent-hover sm:px-3 sm:text-xs"
            aria-haspopup="true"
          >
            Promotions
            <Chevron />
          </button>
          <MegaPanel className="bg-accent-warm text-white" innerClassName="bg-accent-warm">
            <div className="grid gap-8 border-t border-white/20 pt-6 lg:grid-cols-2">
              <div>
                <DropMenuTitle className="mb-4 text-white/95">Popular pages</DropMenuTitle>
                <ul className="columns-1 gap-x-6 sm:columns-2">
                  {promotionsPopularPages.map((l) => (
                    <li key={l.href} className="mb-2 break-inside-avoid">
                      <Link
                        href={l.href}
                        className="nav-link-animate text-sm font-medium text-white/95 hover:text-white hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <DropMenuTitle className="mb-4 text-white/95">Promotions</DropMenuTitle>
                <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {promotionsCards.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="flex flex-col overflow-hidden rounded-lg border border-white/25 bg-white/10 p-2 text-center transition hover:bg-white/20"
                      >
                        <div className="mb-2 flex aspect-[4/3] items-center justify-center rounded bg-white/15 text-[10px] font-semibold uppercase text-white/80">
                          Image
                        </div>
                        <span className="line-clamp-2 text-xs font-semibold leading-snug text-white">{c.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-right">
                  <Link
                    href="/promotions"
                    className="text-sm font-bold text-white underline decoration-white/50 hover:decoration-white"
                  >
                    View all →
                  </Link>
                </div>
              </div>
            </div>
          </MegaPanel>
        </div>

        {/* 2. Products */}
        <div className="group flex-1 border-l border-white/15">
          <button
            type="button"
            className="flex h-full w-full items-center justify-center gap-1 px-2 py-3.5 text-center font-heading text-[11px] font-bold uppercase tracking-wide text-white/95 transition hover:bg-white/10 sm:px-3 sm:text-xs"
            aria-haspopup="true"
          >
            Products
            <Chevron />
          </button>
          <MegaPanel className="bg-brand-primary" innerClassName="bg-brand-primary">
            <div className="grid gap-6 border-t border-white/15 pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {productsColumns.map((col) => (
                <div key={col.title}>
                  <DropMenuTitle className="mb-3 text-brand-sky">{col.title}</DropMenuTitle>
                  <ColumnHeader>{col.title}</ColumnHeader>
                  <ul className="space-y-1.5">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="nav-link-animate text-sm text-white/90 hover:text-white hover:underline"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </MegaPanel>
        </div>

        {/* 3. Services — 4 columns: antibody | custom | analytical | analytical */}
        <div className="group flex-1 border-l border-white/15">
          <button
            type="button"
            className="flex h-full w-full items-center justify-center gap-1 px-2 py-3.5 text-center font-heading text-[11px] font-bold uppercase tracking-wide text-white/95 transition hover:bg-white/10 sm:px-3 sm:text-xs"
            aria-haspopup="true"
          >
            Services
            <Chevron />
          </button>
          <MegaPanel className="bg-brand-primary" innerClassName="bg-brand-primary">
            <div className="grid gap-6 border-t border-white/15 pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {servicesColumns.map((col) => (
                <div key={col.title}>
                  <DropMenuTitle className="mb-3 text-brand-sky">{col.title}</DropMenuTitle>
                  <ColumnHeader>{col.title}</ColumnHeader>
                  <ul className="space-y-1.5">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="nav-link-animate text-sm text-white/90 hover:text-white hover:underline"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <DropMenuTitle className="mb-3 text-brand-sky">Analytical services</DropMenuTitle>
                <ColumnHeader>Analytical services</ColumnHeader>
                <ul className="space-y-1.5">
                  {analyticalCol1.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-white/90 hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="sr-only">Analytical services continued</span>
                <DropMenuTitle className="mb-3 text-brand-sky lg:invisible" aria-hidden>
                  —
                </DropMenuTitle>
                <ColumnHeader className="sr-only">More links</ColumnHeader>
                <ul className="space-y-1.5">
                  {analyticalCol2.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-white/90 hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </MegaPanel>
        </div>

        {/* 4. Support */}
        <div className="group flex-1 border-l border-white/15">
          <button
            type="button"
            className="flex h-full w-full items-center justify-center gap-1 px-2 py-3.5 text-center font-heading text-[11px] font-bold uppercase tracking-wide text-white/95 transition hover:bg-white/10 sm:px-3 sm:text-xs"
            aria-haspopup="true"
          >
            Support
            <Chevron />
          </button>
          <MegaPanel className="bg-brand-primary" innerClassName="bg-brand-primary">
            <div className="grid gap-8 border-t border-white/15 pt-6 lg:grid-cols-4">
              <div className="lg:col-span-3">
                <DropMenuTitle className="mb-4 text-brand-sky">Application resource centers</DropMenuTitle>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {supportResourceBlocks.map((b) => (
                    <div key={b.title}>
                      <Link href={b.href} className="font-heading text-sm font-bold text-white hover:underline">
                        {b.title}
                      </Link>
                      <ul className="mt-2 space-y-1">
                        {b.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="text-sm text-white/85 hover:text-white hover:underline">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <DropMenuTitle className="mb-3 text-brand-sky">Educational resources</DropMenuTitle>
                  <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    {supportEducational.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="text-sm text-white/90 hover:underline">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-6 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <DropMenuTitle className="mb-3 text-brand-sky">Troubleshooting &amp; support</DropMenuTitle>
                <Link
                  href="/resources/troubleshooting-ebooks"
                  className="block overflow-hidden rounded-xl border border-white/20 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <div className="mb-3 flex aspect-video items-center justify-center rounded-lg bg-brand-sky/30 text-xs font-semibold text-white">
                    eBook downloads
                  </div>
                  <span className="text-sm font-bold text-accent-warm">Troubleshooting eBooks →</span>
                </Link>
                <Link
                  href="/supportformpage"
                  className="block overflow-hidden rounded-xl border border-white/20 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <div className="mb-3 flex aspect-video items-center justify-center rounded-lg bg-brand-sky/30 text-xs font-semibold text-white">
                    Technical support
                  </div>
                  <span className="text-sm font-bold text-accent-warm">Technical support form →</span>
                </Link>
              </div>
            </div>
          </MegaPanel>
        </div>

        {/* 5. Blog */}
        <div className="flex flex-1 border-l border-white/15">
          <Link
            href="/blog"
            className="flex flex-1 items-center justify-center px-2 py-3.5 text-center font-heading text-[11px] font-bold uppercase tracking-wide text-white/95 transition hover:bg-white/10 sm:px-3 sm:text-xs"
          >
            Blog
          </Link>
        </div>

        {/* 6. About */}
        <div className="group flex-1 border-l border-white/15">
          <button
            type="button"
            className="flex h-full w-full items-center justify-center gap-1 px-2 py-3.5 text-center font-heading text-[11px] font-bold uppercase tracking-wide text-white/95 transition hover:bg-white/10 sm:px-3 sm:text-xs"
            aria-haspopup="true"
          >
            About
            <Chevron />
          </button>
          <MegaPanel className="bg-brand-primary" innerClassName="bg-brand-primary">
            <div className="max-w-md border-t border-white/15 pt-6">
              <DropMenuTitle className="mb-4 text-brand-sky">About BosterBio</DropMenuTitle>
              <ul className="space-y-2">
                {aboutLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/90 hover:text-white hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </MegaPanel>
        </div>

        {/* 7. Distributors */}
        <div className="flex flex-1 border-l border-white/15">
          <Link
            href="/distributors"
            className="flex flex-1 items-center justify-center px-2 py-3.5 text-center font-heading text-[11px] font-bold uppercase tracking-wide text-white/95 transition hover:bg-white/10 sm:px-3 sm:text-xs"
          >
            Distributors
          </Link>
        </div>
      </div>
    </nav>
  )
}

function Chevron() {
  return (
    <svg className="h-3 w-3 shrink-0 opacity-80" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M6 8L1 3h10z" />
    </svg>
  )
}
