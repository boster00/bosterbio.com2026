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
                <br />
                3942 Valley Ave, Suite B
                <br />
                Pleasanton, CA 94566
              </p>
              <a href="tel:+19256772200" className="block font-medium text-white hover:text-accent">
                +1 (925) 677-2200
              </a>
              <a href="mailto:support@bosterbio.com" className="block hover:text-accent">
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
                    <Link href={link.href} className="text-sm text-white/88 hover:text-accent">
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
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-accent">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-accent">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
