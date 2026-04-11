import Link from "next/link"

const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "Primary Antibodies", href: "/products?category=primary-antibodies" },
      { label: "ELISA Kits", href: "/products?category=elisa" },
      { label: "Recombinant Proteins", href: "/products?category=proteins" },
      { label: "Reagents & Buffers", href: "/products?category=reagents" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Protocols & guides", href: "/resources" },
      { label: "Technical blog", href: "/resources#blog" },
      { label: "Citation database", href: "/resources#citations" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About BosterBio", href: "/about" },
      { label: "Careers", href: "/about#careers" },
      { label: "Distributors", href: "/contact#distributors" },
    ],
  },
] as const

export function SiteFooter() {
  return (
    <footer id="footer" className="border-t border-surface-muted bg-ink text-white">
      <div className="container-content py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-2xl font-bold tracking-tight">
              Boster<span className="text-accent">Bio</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Antibodies, ELISA kits, and reagents validated for your research — with transparent data you can trust.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/80">
              <p>
                <span className="text-white/50">US HQ</span>
                <br />
                Pleasanton, CA
              </p>
              <a href="tel:+19256772200" className="block font-medium text-white hover:underline">
                +1 (925) 677-2200
              </a>
              <a href="mailto:support@bosterbio.com" className="block hover:underline">
                support@bosterbio.com
              </a>
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">{col.title}</h2>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/85 hover:text-white hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Boster Biological Technology. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
