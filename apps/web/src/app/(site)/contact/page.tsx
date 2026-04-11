export default function ContactPage() {
  return (
    <main id="main-content">
      <div className="border-b border-surface-muted bg-surface-subtle">
        <div className="container-content py-12 md:py-16">
          <h1 className="font-display text-display-md text-ink">Contact us</h1>
          <p className="mt-4 max-w-2xl text-ink-secondary">
            Questions about an antibody, ELISA kit, custom project, or distributor in your region? Reach us by phone or
            the form below — our team typically responds within one business day.
          </p>
        </div>
      </div>

      <div className="container-content grid gap-12 py-12 lg:grid-cols-2">
        <section aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="font-display text-title text-ink">
            Email us
          </h2>
          <form className="mt-6 space-y-4" action="#" method="post">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-ink">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="mt-1 h-11 w-full rounded-md border border-surface-muted px-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink">
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-1 h-11 w-full rounded-md border border-surface-muted px-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-ink">
                Institution (optional)
              </label>
              <input
                id="institution"
                name="institution"
                type="text"
                autoComplete="organization"
                className="mt-1 h-11 w-full rounded-md border border-surface-muted px-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-ink">
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="mt-1 w-full rounded-md border border-surface-muted px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-light"
            >
              Send message
            </button>
            <p className="text-xs text-ink-tertiary">
              Form submission is a UI placeholder — connect to your CRM, help desk, or email API for production.
            </p>
          </form>
        </section>

        <section aria-labelledby="contact-details" className="space-y-10">
          <div>
            <h2 id="contact-details" className="font-display text-title text-ink">
              Visit &amp; phone
            </h2>
            <address className="mt-4 not-italic text-ink-secondary">
              <p className="font-medium text-ink">Boster Biological Technology</p>
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
                <span className="font-medium text-ink">Phone: </span>
                <a href="tel:+19256772200" className="text-brand hover:underline">
                  +1 (925) 677-2200
                </a>
              </li>
              <li>
                <span className="font-medium text-ink">Email: </span>
                <a href="mailto:support@bosterbio.com" className="text-brand hover:underline">
                  support@bosterbio.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-ink">Map</h3>
            <p className="mt-2 text-sm text-ink-tertiary">
              Map embed placeholder — add Google Maps or Mapbox iframe when API keys are configured.
            </p>
            <div
              className="mt-4 flex h-64 items-center justify-center rounded-xl border border-dashed border-surface-muted bg-surface-subtle text-center text-sm text-ink-tertiary"
              role="img"
              aria-label="Map placeholder for 3942 Valley Ave Suite B Pleasanton CA 94566"
            >
              Map: 3942 Valley Ave, Suite B
              <br />
              Pleasanton, CA 94566
            </div>
          </div>

          <div id="distributors" className="scroll-mt-28 rounded-xl border border-surface-muted bg-white p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold text-ink">Distributors</h3>
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
