import Link from "next/link"

export default function CartPage() {
  return (
    <main id="main-content" className="min-h-[50vh]">
      <div className="container-content py-12 md:py-16">
        <h1 className="font-display text-display-md text-ink">Shopping cart</h1>
        <div className="mt-10 rounded-xl border border-dashed border-surface-muted bg-surface-subtle/60 p-12 text-center">
          <p className="font-display text-lg font-semibold text-ink">Your cart is empty</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-secondary">
            When Medusa checkout is wired up, line items, quantities, and totals will appear here.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-light"
          >
            Browse products
          </Link>
        </div>
      </div>
    </main>
  )
}
