/**
 * Payment Module — Swappable Provider Abstraction
 *
 * This module registers a payment provider via Medusa's AbstractPaymentProvider
 * interface. Stripe is the current placeholder. To swap providers before launch:
 *
 *   1. Add a new class in ./providers/ that extends AbstractPaymentProvider
 *   2. Update the PAYMENT_PROVIDER env var
 *   3. No storefront or other backend code needs to change
 *
 * Medusa's payment module handles all provider lifecycle; this file only
 * registers which provider implementation to use.
 */

import { Module } from "@medusajs/framework/utils"
import { StripePaymentProvider } from "./providers/stripe"

// Registry — add new providers here as they are implemented
const PROVIDERS: Record<string, unknown> = {
  stripe: StripePaymentProvider,
}

export default Module("payment", {
  // The active provider is selected at runtime via config options.
  // See medusa-config.ts for how options are passed in.
  service: StripePaymentProvider,
})

export { PROVIDERS }
