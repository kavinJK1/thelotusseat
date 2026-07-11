import { createRazorpayGateway } from './razorpay'
import type { PaymentGateway } from './types'

/**
 * Provider selection lives here and nowhere else.
 *
 * Today this is Razorpay, because Stripe has been invite-only for Indian
 * businesses since May 2024 and Razorpay holds the RBI PA-CB licence needed to
 * legally collect cross-border payments for an Indian exporter. If a Stripe
 * invite comes through, adding a `createStripeGateway()` that satisfies
 * `PaymentGateway` and switching on it here is the whole migration.
 */

let cached: PaymentGateway | null = null

export function getPaymentGateway(): PaymentGateway {
  // Memoised so we build the auth header and read env once per lambda instance,
  // not on every request.
  if (!cached) {
    cached = createRazorpayGateway()
  }

  return cached
}
