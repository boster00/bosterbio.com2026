export default function ContactPage() {
  return (
    <main id="main-content">
      <div className="border-b border-surface-muted bg-surface-subtle">
        <div className="container-content py-12 md:py-16">
          <h1 className="font-display text-display-md text-ink">Contact us</h1>
          <p className="mt-4 max-w-2xl text-ink-secondary">
            Questions about an antibody, ELISA kit, or bulk order? Our applications team typically responds within one
            business day.
          </p>
        </div>
      </div>

      <div className="container-content grid gap-12 py-12 lg:grid-cols-2">
        <section aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="font-display text-title text-ink">
            Send a message
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
              Submit
            </button>
            <p className="text-xs text-ink-tertiary">
              This form is a UI placeholder; wire it to your CRM or email service when ready.
            </p>
          </form>
        </section>

        <section aria-labelledby="contact-details" className="space-y-10">
          <div>
            <h2 id="contact-details" className="font-display text-title text-ink">
              Direct lines
            </h2>
            <ul className="mt-4 space-y-3 text-ink-secondary">
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
