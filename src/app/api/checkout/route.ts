import { getPaymentGateway } from '@/lib/commerce/gateway'
import { priceFor } from '@/lib/commerce/product'
import { PaymentConfigError, PaymentGatewayError } from '@/lib/commerce/types'
import { checkoutRequestSchema, toFieldErrors } from '@/lib/commerce/validation'

/**
 * Creates a pending order at the gateway and hands the browser the id it needs
 * to open the payment widget.
 *
 * This route never trusts an amount from the client — it derives the price from
 * the currency alone. It also does not confirm anything: a successful response
 * means "we are ready to take payment", not "we have been paid". Only the
 * webhook can say that.
 */
export async function POST(request: Request): Promise<Response> {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json(
      { success: false, error: 'Request body must be valid JSON.' },
      { status: 400 },
    )
  }

  const parsed = checkoutRequestSchema.safeParse(payload)
  if (!parsed.success) {
    return Response.json(
      {
        success: false,
        error: 'Please check the highlighted fields.',
        fieldErrors: toFieldErrors(parsed.error),
      },
      { status: 400 },
    )
  }

  const checkout = parsed.data
  const price = priceFor(checkout.currency)

  try {
    const gateway = getPaymentGateway()
    const order = await gateway.createOrder(checkout, price)

    return Response.json({
      success: true,
      data: {
        gatewayOrderId: order.gatewayOrderId,
        publicKey: gateway.publicKey(),
        amountMinorUnits: price.totalMinorUnits,
        currency: price.currency,
      },
    })
  } catch (error: unknown) {
    if (error instanceof PaymentConfigError) {
      // A deployment problem, not a customer problem. Loud on our side, opaque
      // on theirs — the message names our env vars.
      console.error('[checkout] gateway misconfigured:', error.message)
      return Response.json(
        { success: false, error: 'Checkout is temporarily unavailable. Please try again shortly.' },
        { status: 503 },
      )
    }

    if (error instanceof PaymentGatewayError) {
      console.error('[checkout] gateway error:', error.message)
      return Response.json(
        { success: false, error: 'We could not start your payment. Please try again.' },
        { status: error.status },
      )
    }

    console.error('[checkout] unexpected error:', error)
    return Response.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
