import type { Metadata } from "next"
import { CheckoutFlow } from "./CheckoutFlow"
import { EditorialPageHeader } from "@/components/cms/EditorialPageHeader"

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Place an order. Sandbox payment for now (no real charge); orders capture to Boster's order database and sync to Zoho Books.",
  robots: { index: false, follow: false },
}

/**
 * Multi-step checkout flow for the smoke 3.x.next "ready-to-test checkout"
 * smoke test. Steps: contact + shipping → payment (sandbox) → review → submit.
 *
 * No real payment-gateway connection wired yet. The "Pay" button just records
 * payment_method='sandbox' and the backend captures the order to Supabase
 * `orders` + `order_items`, then fires a best-effort Zoho Books sync (which
 * is in stub mode until ZOHO_BOOKS_REFRESH_TOKEN + ZOHO_BOOKS_ORG_ID are
 * provisioned).
 */
export default function CheckoutPage({
  searchParams: _searchParams,
}: {
  searchParams: Promise<{ sku?: string; q?: string }>
}) {
  return (
    <main id="main-content" className="bg-white">
      <EditorialPageHeader
        id="checkout-title"
        title="Checkout"
        subtitle="Sandbox payment for now — no real charge. Orders capture to the Boster order database and sync to Zoho Books once payment integration is wired."
      />
      <section className="container-content py-10 md:py-14">
        <CheckoutFlow />
      </section>
    </main>
  )
}
