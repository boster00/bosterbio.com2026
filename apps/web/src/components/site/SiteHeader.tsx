import Link from "next/link"
import { MobileNav } from "./MobileNav"
import { cn } from "@/lib/cn"

const navItems = [
  { label: "Primary Antibodies", href: "/products?category=primary" },
  { label: "Secondary Antibodies", href: "/products?category=secondary" },
  { label: "ELISA Kits", href: "/products?category=elisa" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
] as const

export function SiteHeader() {
  return (
    <header className="relative sticky top-0 z-50 bg-surface shadow-nav">
      <div className="bg-brand-dark text-white">
        <div className="container-content flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 text-center text-xs sm:justify-between sm:text-left">
          <p className="font-medium">
            Same-day shipping on in-stock orders —{" "}
            <Link href="/contact" className="underline decoration-white/60 underline-offset-2 hover:decoration-white">
              Contact us for details
            </Link>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/90">
            <a href="tel:+19256772200" className="hover:text-white">
              +1 (925) 677-2200
            </a>
            <span className="hidden sm:inline" aria-hidden>
              |
            </span>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="container-content flex items-center gap-4 py-3 md:py-4">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-brand md:text-2xl"
          aria-label="BosterBio home"
        >
          Boster<span className="text-accent">Bio</span>
        </Link>

        <form
          className="mx-auto hidden min-w-0 flex-1 max-w-xl md:flex"
          role="search"
          action="/products"
          method="get"
        >
          <label htmlFor="site-search" className="sr-only">
            Search catalog
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            placeholder="Search by gene, catalog #, or application…"
            className="h-11 w-full min-w-0 rounded-l-md border border-surface-muted border-r-0 bg-surface-subtle px-4 text-sm text-ink placeholder:text-ink-tertiary focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="submit"
            className="shrink-0 rounded-r-md bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-light"
          >
            Search
          </button>
        </form>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <Link
            href="/account"
            className={cn(
              "hidden rounded-md px-3 py-2 text-sm font-medium text-ink-secondary hover:bg-surface-subtle sm:inline-block",
            )}
          >
            Sign in
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-md border border-surface-muted bg-surface px-3 py-2 text-sm font-semibold text-ink hover:border-brand/30"
          >
            <span aria-hidden>Cart</span>
            <span className="rounded-full bg-brand-muted px-2 py-0.5 text-xs font-bold text-brand">0</span>
          </Link>
          <div className="relative flex items-center md:static">
            <MobileNav items={navItems} />
          </div>
        </div>
      </div>

      <div className="container-content pb-3 md:hidden">
        <form className="flex" role="search" action="/products" method="get">
          <label htmlFor="mobile-search" className="sr-only">
            Search catalog
          </label>
          <input
            id="mobile-search"
            name="q"
            type="search"
            placeholder="Search catalog…"
            className="h-10 w-full min-w-0 rounded-l-md border border-surface-muted border-r-0 bg-surface-subtle px-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="submit"
            className="shrink-0 rounded-r-md bg-brand px-4 text-sm font-semibold text-white"
          >
            Search
          </button>
        </form>
      </div>

      <nav
        className="border-t border-surface-muted bg-surface-subtle/80 backdrop-blur-sm"
        aria-label="Primary"
      >
        <div className="container-content hidden md:block">
          <ul className="flex flex-wrap items-center gap-1 py-0">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-3 py-3 text-sm font-medium text-ink-secondary transition hover:bg-white hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
