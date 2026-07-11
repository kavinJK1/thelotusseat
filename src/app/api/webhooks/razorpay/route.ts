import { getPaymentGateway } from '@/lib/commerce/gateway'
import { recordPaidOrder } from '@/lib/commerce/orders'
import { PaymentConfigError } from '@/lib/commerce/types'

/**
 * The payment source of truth.
 *
 * The browser redirect after payment is UX; it can be lost to a dropped
 * connection, a closed tab, or a dead battery. This endpoint cannot be — the
 * gateway retries it until we return 2xx. An order is real when this fires,
 * and at no other moment.
 */
export async function POST(request: Request): Promise<Response> {
  // Must be the raw, unparsed body: the HMAC is computed over the exact bytes
  // Razorpay sent. Calling request.json() first and re-stringifying would
  // change key order and whitespace, and every signature would fail.
  const rawBody = await request.text()

  const signature = request.headers.get('x-razorpay-signature')
  if (!signature) {
    return Response.json({ error: 'Missing signature' }, { status: 400 })
  }

  let gateway
  try {
    gateway = getPaymentGateway()
  } catch (error: unknown) {
    if (error instanceof PaymentConfigError) {
      console.error('[webhook] gateway misconfigured:', error.message)
      // 500 rather than 503: we want Razorpay to retry this one, because a
      // dropped webhook is a paid customer we never ship to.
      return Response.json({ error: 'Not configured' }, { status: 500 })
    }
    throw error
  }

  if (!gateway.verifyWebhook(rawBody, signature)) {
    // Either a forgery or a secret mismatch after a key rotation. Both are
    // worth shouting about; neither should be retried.
    console.error('[webhook] signature verification failed')
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const paidOrder = gateway.parsePaidOrder(rawBody)

  // A verified event we don't act on — payment.failed, order.paid, refunds.
  // Acknowledge it, or Razorpay will retry it forever.
  if (!paidOrder) {
    return Response.json({ received: true }, { status: 200 })
  }

  try {
    await recordPaidOrder(paidOrder)
  } catch (error: unknown) {
    // Do NOT swallow this. Returning non-2xx makes Razorpay retry, which is
    // exactly what we want — the alternative is silently losing an order we
    // have already taken money for.
    console.error('[webhook] failed to record paid order', {
      gatewayOrderId: paidOrder.gatewayOrderId,
      gatewayPaymentId: paidOrder.gatewayPaymentId,
      error,
    })
    return Response.json({ error: 'Could not record order' }, { status: 500 })
  }

  return Response.json({ received: true }, { status: 200 })
}
