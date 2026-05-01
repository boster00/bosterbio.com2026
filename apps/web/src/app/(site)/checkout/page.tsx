import type { Metadata } from "next"
import Link from "next/link"
import { EditorialPageHeader } from "@/components/cms/EditorialPageHeader"

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Online checkout is being wired up. Request a quote and our team will respond within one business day.",
  robots: { index: false, follow: false },
}

/**
 * Placeholder for the checkout flow.
 *
 * Online checkout requires Medusa to be deployed and an Authorize.Net Accept.js
 * payment form to be wired in. Until then, /cart's "Proceed to checkout" CTA
 * lands here and offers the quote-request alternative the live store already
 * uses for B2B research orders.
 *
 * When checkout is built, replace this body with the multi-step flow
 * (shipping → payment → review). Keep the header.
 */
export default function CheckoutPlaceholderPage() {
  return (
    <main id="main-content" className="bg-white">
      <EditorialPageHeader
        id="checkout-title"
        title="Checkout"
        subtitle="Online checkout is launching with the new storefront. In the meantime, our team can complete your order by quote — typically within one business day."
      />

      <section className="container-content py-14 md:py-20">
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-surface-muted bg-surface-subtle p-8 shadow-card">
            <h2 className="font-heading text-xl text-brand-primary">Request a quote</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              Tell us which catalog numbers and quantities you need. We&apos;ll confirm pricing,
              shipping, and your institution&apos;s payment terms.
            </p>
            <Link
              href="/contact?intent=quote"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-accent-hover"
            >
              Request quote
            </Link>
          </div>

          <div className="rounded-2xl border border-surface-muted bg-surface-subtle p-8 shadow-card">
            <h2 className="font-heading text-xl text-brand-primary">Order by phone or email</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              For faster turnaround on a single-product order, our customer service team can take
              your purchase order directly.
            </p>
            <p className="mt-6 space-y-1 text-sm">
              <span className="block text-ink">
                <span className="font-semibold text-brand-primary">Phone:</span>{" "}
                <a className="hover:underline" href="tel:+19256772200">
                  +1 (925) 677-2200
                </a>
              </span>
              <span className="block text-ink">
                <span className="font-semibold text-brand-primary">Email:</span>{" "}
                <a className="hover:underline" href="mailto:support@bosterbio.com">
                  support@bosterbio.com
                </a>
              </span>
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline"
          >
            ← Continue browsing the catalog
          </Link>
        </div>
      </section>
    </main>
  )
}
