import Link from "next/link"
import { DesktopMegaNav } from "./DesktopMegaNav"
import { MobileNav } from "./MobileNav"
import { cn } from "@/lib/cn"

export function SiteHeader() {
  return (
    <header className="site-nav-header relative sticky top-0 z-50 max-w-[100vw] border-b border-brand-primary/10 bg-[#004C95] shadow-nav">
      <div className="bg-brand-deep text-white">
        <div className="container-content flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2.5 text-center text-xs sm:justify-between sm:text-left">
          <p className="font-medium text-white/95">
            Same-day shipping on in-stock orders —{" "}
            <Link
              href="/contact-us"
              className="nav-link-animate font-semibold text-accent-warm underline decoration-accent-warm/50 underline-offset-2 hover:decoration-accent-warm"
            >
              Contact us for details
            </Link>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/90">
            <a href="tel:+19256772200" className="nav-link-animate hover:text-accent-warm">
              +1 (925) 677-2200
            </a>
            <span className="hidden text-white/40 sm:inline" aria-hidden>
              |
            </span>
            <Link href="/contact-us" className="nav-link-animate hover:text-accent-warm">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#004C95] text-white">
        <div className="container-content flex min-w-0 items-center gap-2 py-3 sm:gap-4 md:py-4">
        <Link
          href="/"
          className="min-w-0 shrink font-heading text-lg font-bold tracking-tight text-white sm:text-xl md:text-2xl"
          aria-label="BosterBio home"
        >
          Boster<span className="text-accent-warm">Bio</span>
        </Link>

        <form
          className="mx-auto hidden min-w-0 flex-1 max-w-xl md:flex"
          role="search"
          action="/search"
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
            className="h-11 w-full min-w-0 rounded-l-full border border-white/25 border-r-0 bg-white/10 px-5 text-sm text-white placeholder:text-white/60 focus:border-accent-warm focus:outline-none focus:ring-2 focus:ring-accent-warm/40"
          />
          <button
            type="submit"
            className="shrink-0 rounded-r-full bg-accent-warm px-6 text-sm font-bold text-white transition hover:bg-accent-hover"
          >
            Search
          </button>
        </form>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <Link
            href="/account"
            className={cn(
              "nav-link-animate hidden rounded-full px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 sm:inline-block",
            )}
          >
            Sign in
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:border-accent-warm/60 hover:bg-white/15"
          >
            <span aria-hidden>Cart</span>
            <span className="rounded-full bg-accent-warm px-2 py-0.5 text-xs font-bold text-white">0</span>
          </Link>
          <div className="relative flex items-center md:static text-white [&_button]:text-white">
            <MobileNav />
          </div>
        </div>
      </div>
      </div>

      <div className="border-t border-white/10 bg-[#004C95] pb-3 md:hidden">
        <div className="container-content pt-3">
        <form className="flex" role="search" action="/search" method="get">
          <label htmlFor="mobile-search" className="sr-only">
            Search catalog
          </label>
          <input
            id="mobile-search"
            name="q"
            type="search"
            placeholder="Search catalog…"
            className="h-10 w-full min-w-0 rounded-l-full border border-white/25 border-r-0 bg-white/10 px-4 text-sm text-white placeholder:text-white/60 focus:border-accent-warm focus:outline-none focus:ring-2 focus:ring-accent-warm/40"
          />
          <button type="submit" className="shrink-0 rounded-r-full bg-accent-warm px-5 text-sm font-bold text-white">
            Search
          </button>
        </form>
        </div>
      </div>

      <div className="hidden md:block">
        <DesktopMegaNav />
      </div>
    </header>
  )
}
