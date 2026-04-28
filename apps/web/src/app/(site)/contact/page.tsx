import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Contact BosterBio for antibodies, ELISA kits, and custom services — Pleasanton, CA. Phone, email, and contact form.",
}

type Props = { searchParams: Promise<{ ok?: string; product?: string }> }

export default async function ContactPage({ searchParams }: Props) {
  const sp = await searchParams
  const submitted = sp.ok === "1"
  const prefillProduct = typeof sp.product === "string" ? sp.product : ""
  return (
    <main id="main-content">
      <div className="page-hero-bar border-b border-brand/10">
        <div className="container-content py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">We are here to help</p>
          <h1 className="mt-2 font-display text-display-md text-brand">Contact us</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-secondary">
            Questions about an antibody, ELISA kit, custom project, or distributor in your region? Reach us by phone or
            the form below — our team typically responds within one business day.
          </p>
          <p className="mt-4 text-sm font-medium text-brand">
            3942 Valley Ave, Suite B · Pleasanton, CA 94566
          </p>
        </div>
      </div>

      <div className="container-content grid gap-12 py-12 lg:grid-cols-2">
        <section
          aria-labelledby="contact-form-heading"
          className="rounded-2xl border border-brand/10 bg-white p-8 shadow-card"
        >
          <h2 id="contact-form-heading" className="font-display text-title text-brand">
            Send a message
          </h2>
          {submitted ? (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              <p className="font-semibold">Thanks — your message has been received.</p>
              <p className="mt-1">
                We typically respond within one business day. For urgent issues, call{" "}
                <a href="tel:+19256772200" className="underline">
                  +1 (925) 677-2200
                </a>
                .
              </p>
            </div>
          ) : null}
          <form className="mt-6 space-y-4" action="/api/contact" method="post">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-brand">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="mt-1.5 h-11 w-full rounded-xl border border-brand/15 bg-brand-tint/30 px-4 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-brand">
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-1.5 h-11 w-full rounded-xl border border-brand/15 bg-brand-tint/30 px-4 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-brand">
                Institution (optional)
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className="mt-1.5 h-11 w-full rounded-xl border border-brand/15 bg-brand-tint/30 px-4 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
              />
            </div>
            {prefillProduct ? (
              <input type="hidden" name="product_sku" value={prefillProduct} />
            ) : null}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-brand">
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="mt-1.5 w-full rounded-xl border border-brand/15 bg-brand-tint/30 px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-accent py-3 text-sm font-bold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-hover sm:w-auto sm:px-10"
            >
              Send message
            </button>
            <p className="text-xs text-ink-tertiary">
              {prefillProduct
                ? `Product reference ${prefillProduct} will be included with your message.`
                : "We'll include any context from the page you came from."}
            </p>
          </form>
        </section>

        <section aria-labelledby="contact-details" className="space-y-10">
          <div className="rounded-2xl border border-brand/10 bg-white p-8 shadow-card">
            <h2 id="contact-details" className="font-display text-title text-brand">
              Visit &amp; phone
            </h2>
            <address className="mt-4 not-italic text-ink-secondary">
              <p className="font-semibold text-brand">Boster Biological Technology</p>
              <p className="mt-2">
                3942 Valley Ave, Suite B
                <br />
                Pleasanton, CA 94566
                <br />
                United States
              </p>
            </address>
            <ul className="mt-6 space-y-3 text-ink-secondary">
              <li>
                <span className="font-semibold text-brand">Phone: </span>
                <a href="tel:+19256772200" className="font-medium text-accent hover:underline">
                  +1 (925) 677-2200
                </a>
              </li>
              <li>
                <span className="font-semibold text-brand">Email: </span>
                <a href="mailto:support@bosterbio.com" className="font-medium text-accent hover:underline">
                  support@bosterbio.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-brand">Map</h3>
            <p className="mt-2 text-sm text-ink-tertiary">
              Map embed placeholder — add Google Maps or Mapbox iframe when API keys are configured.
            </p>
            <div
              className="relative mt-4 flex h-64 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-accent/40 bg-gradient-to-b from-sky-100/90 via-brand-tint to-accent-soft text-center shadow-inner"
              role="img"
              aria-label="Map placeholder for 3942 Valley Ave Suite B Pleasanton CA 94566"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%231a365d' fill-opacity='.08' d='M0 50 Q25 30 50 50 T100 50V100H0z'/%3E%3C/svg%3E")`,
                  backgroundSize: "cover",
                }}
                aria-hidden
              />
              <p className="relative px-4 text-sm font-medium text-brand">
                3942 Valley Ave, Suite B
                <br />
                Pleasanton, CA 94566
              </p>
            </div>
          </div>

          <div
            id="distributors"
            className="scroll-mt-28 rounded-2xl border border-brand/10 bg-brand-tint/50 p-6 shadow-card"
          >
            <h3 className="font-display text-lg font-semibold text-brand">Distributors</h3>
            <p className="mt-2 text-sm text-ink-secondary">
              International customers can order through authorized distributors. Contact us for the partner in your
              region.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
