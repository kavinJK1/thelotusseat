import type { PaidOrder } from './types'

/**
 * Where a confirmed order goes.
 *
 * IMPORTANT — read before launch:
 *
 * There is no database in this project yet, so this function does not persist
 * anything of its own. That is a deliberate, temporary choice rather than an
 * oversight, and it is only survivable because of one fact: the full order,
 * including the shipping address, is already durably stored at Razorpay in the
 * order's `notes` (see razorpay.ts). The Razorpay dashboard is the order book.
 * You can export it, and it outlives this app.
 *
 * What that does NOT give you:
 *   - a confirmation email to the customer
 *   - a notification to you that a sale happened
 *   - idempotency (Razorpay retries webhooks; a naive email sender here would
 *     mail the customer twice)
 *
 * Before taking real money, add persistence and make this function idempotent
 * on `gatewayPaymentId`. The webhook already treats a throw from here as
 * "retry me", so a failed write will not silently lose an order.
 */
export async function recordPaidOrder(order: PaidOrder): Promise<void> {
  // Serialised into the message string rather than passed as a second argument:
  // some log transports (including Next's dev logger) drop extra args, and this
  // line is currently our only searchable trace of a sale. Keep it self-contained.
  console.info(
    `[order] payment captured ${JSON.stringify({
      gatewayOrderId: order.gatewayOrderId,
      gatewayPaymentId: order.gatewayPaymentId,
      amountMinorUnits: order.amountMinorUnits,
      currency: order.currency,
      email: order.customer.email,
      shipTo: order.shipping.country,
    })}`,
  )

  // TODO(persistence): insert into a real store, keyed on gatewayPaymentId so
  // that a retried webhook is a no-op rather than a duplicate.
  // TODO(email): send the customer their confirmation and the ship estimate.
  await Promise.resolve()
}
