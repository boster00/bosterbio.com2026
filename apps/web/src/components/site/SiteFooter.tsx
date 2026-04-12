import Link from "next/link"

const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "Primary Antibodies", href: "/products?category=primary" },
      { label: "Secondary Antibodies", href: "/products?category=secondary" },
      { label: "ELISA Kits", href: "/products?category=elisa" },
      { label: "Conjugation Kits", href: "/products?category=conjugation" },
      { label: "Custom Services", href: "/services" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Custom antibody", href: "/services/custom-antibody" },
      { label: "ELISA development", href: "/services/elisa-development" },
      { label: "Conjugation", href: "/services/conjugation" },
      { label: "Multiplex IHC", href: "/services/multiplex-ihc" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Protocols", href: "/resources#protocols" },
      { label: "FAQs", href: "/resources#faq" },
      { label: "Blog", href: "/resources#blog" },
      { label: "Citations", href: "/resources#citations" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About BosterBio", href: "/about" },
      { label: "Careers", href: "/about#careers" },
      { label: "Contact & distributors", href: "/contact#distributors" },
    ],
  },
] as const

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 4.17 4.42 9.92 6.24 12.11.4.43 1.12.43 1.52 0C14.58 18.92 19 13.17 19 9c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer id="footer" className="border-t border-brand/20 bg-brand-deep text-white">
      <div className="container-content py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-2xl font-bold tracking-tight">
              Boster<span className="text-accent">Bio</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
              Trusted antibodies for life science research — 15,000+ catalog products, custom services, and same-day
              shipping on qualifying in-stock orders.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/85">
              <p>
                <span className="font-semibold text-accent">Headquarters</span>
              </p>
              <p className="flex list-none items-start gap-2.5 leading-relaxed">
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>
                  3942 Valley Ave, Suite B
                  <br />
                  Pleasanton, CA 94566
                </span>
              </p>
              <a href="tel:+19256772200" className="nav-link-animate block font-medium text-white hover:text-accent">
                +1 (925) 677-2200
              </a>
              <a href="mailto:support@bosterbio.com" className="nav-link-animate block hover:text-accent">
                support@bosterbio.com
              </a>
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h2 className="text-xs font-bold uppercase tracking-wider text-accent">{col.title}</h2>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="nav-link-animate text-sm text-white/88 hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Boster Biological Technology. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="nav-link-animate hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="nav-link-animate hover:text-accent">
              Terms
            </Link>
            <Link href="/contact" className="nav-link-animate hover:text-accent">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
