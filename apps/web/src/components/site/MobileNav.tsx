"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/cn"

type NavItem = { label: string; href: string }

export function MobileNav({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand/15 text-brand hover:bg-brand-tint md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sr-only">Menu</span>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          {open ? (
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
          "fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col border-l border-brand/10 bg-white shadow-card transition-transform duration-200 ease-out md:hidden",
          open ? "translate-x-0" : "translate-x-full pointer-events-none",
        )}
      >
        <div className="flex items-center justify-between border-b border-brand/10 bg-brand-tint/50 px-4 py-3">
          <span className="font-display text-lg font-bold text-brand">Menu</span>
          <button
            type="button"
            className="rounded-full p-2 text-brand hover:bg-white"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="flex-1 divide-y divide-brand/10 overflow-y-auto py-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-4 py-3 text-sm font-semibold text-brand hover:bg-brand-tint/80 hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/account"
              className="block px-4 py-3 text-sm font-semibold text-brand hover:bg-brand-tint/80"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
          </li>
        </ul>
      </div>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-brand-deep/40 md:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </>
  )
}
