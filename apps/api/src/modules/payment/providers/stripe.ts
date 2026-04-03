/**
 * Stripe Payment Provider — PLACEHOLDER
 *
 * Implements Medusa's AbstractPaymentProvider interface.
 * This is a structural placeholder only — Stripe is NOT the intended
 * long-term provider. A lower-fee vendor will replace this before launch.
 *
 * All payment logic lives here and nowhere else. The storefront and the
 * rest of the backend use Medusa's payment session API exclusively,
 * so swapping this class is the only change required to change providers.
 */

import { AbstractPaymentProvider, MedusaError } from "@medusajs/framework/utils"
import type {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
} from "@medusajs/framework/types"

export class StripePaymentProvider extends AbstractPaymentProvider {
  static identifier = "stripe"

  // Stripe SDK instance — initialized lazily to keep the module loadable
  // without a valid API key (e.g. in CI / test environments)
  private stripe: unknown = null

  private getStripe() {
    if (!this.stripe) {
      const apiKey = (this.options as { apiKey?: string }).apiKey
      if (!apiKey) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "STRIPE_API_KEY is not set. Set it in .env or replace this provider."
        )
      }
      // Lazy import — avoids hard Stripe SDK dependency at module load time
      // Replace this entire block when swapping providers
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Stripe = require("stripe")
      this.stripe = new Stripe(apiKey, { apiVersion: "2024-06-20" })
    }
    return this.stripe as import("stripe").default
  }

  async initiatePayment(
    _input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    // TODO: create Stripe PaymentIntent
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "StripePaymentProvider.initiatePayment not yet implemented"
    )
  }

  async authorizePayment(
    _input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "StripePaymentProvider.authorizePayment not yet implemented"
    )
  }

  async capturePayment(
    _input: CapturePaymentInput
  ): Promise<CapturePaymentOutput> {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "StripePaymentProvider.capturePayment not yet implemented"
    )
  }

  async cancelPayment(
    _input: CancelPaymentInput
  ): Promise<CancelPaymentOutput> {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "StripePaymentProvider.cancelPayment not yet implemented"
    )
  }

  async refundPayment(
    _input: RefundPaymentInput
  ): Promise<RefundPaymentOutput> {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "StripePaymentProvider.refundPayment not yet implemented"
    )
  }

  async deletePayment(
    _input: DeletePaymentInput
  ): Promise<DeletePaymentOutput> {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "StripePaymentProvider.deletePayment not yet implemented"
    )
  }

  async retrievePayment(
    _input: RetrievePaymentInput
  ): Promise<RetrievePaymentOutput> {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "StripePaymentProvider.retrievePayment not yet implemented"
    )
  }

  async updatePayment(
    _input: UpdatePaymentInput
  ): Promise<UpdatePaymentOutput> {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "StripePaymentProvider.updatePayment not yet implemented"
    )
  }

  async getPaymentStatus(
    _input: GetPaymentStatusInput
  ): Promise<GetPaymentStatusOutput> {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "StripePaymentProvider.getPaymentStatus not yet implemented"
    )
  }

  async getWebhookActionAndData(
    _payload: { data: Record<string, unknown>; rawData: string | Buffer; headers: Record<string, unknown> }
  ): Promise<WebhookActionResult> {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "StripePaymentProvider.getWebhookActionAndData not yet implemented"
    )
  }
}
