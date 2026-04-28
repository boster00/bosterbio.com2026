import Link from "next/link"

export const metadata = {
  title: "Shopping cart",
  description: "Your cart and checkout for Boster Bio antibodies, ELISA kits, and reagents.",
}

export default function CartPage() {
  return (
    <main id="main-content" className="min-h-[50vh]">
      <div className="container-content py-12 md:py-16">
        <h1 className="font-display text-display-md text-ink">Shopping cart</h1>
        <div className="mt-10 rounded-xl border border-dashed border-surface-muted bg-surface-subtle/60 p-12 text-center">
          <p className="font-display text-lg font-semibold text-ink">Your cart is empty</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-secondary">
            Online checkout is being wired up. In the meantime, request a quote for any product
            and we&rsquo;ll get back to you within one business day.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-light"
            >
              Browse products
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-md border-2 border-brand px-6 py-3 text-sm font-semibold text-brand hover:bg-brand/5"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
