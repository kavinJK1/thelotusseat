import { createHmac, timingSafeEqual } from 'node:crypto'

import type { PriceBreakdown } from './product'
import { PRODUCT, SHIP_ESTIMATE } from './product'
import type {
  CheckoutRequest,
  PaidOrder,
  PaymentGateway,
  PendingOrder,
} from './types'
import { PaymentConfigError, PaymentGatewayError } from './types'

const RAZORPAY_API = 'https://api.razorpay.com/v1'

/** Razorpay caps notes at 15 keys, 256 chars per value. Truncate rather than get rejected. */
const NOTE_MAX_LENGTH = 256

function note(value: string): string {
  return value.slice(0, NOTE_MAX_LENGTH)
}

interface RazorpayCredentials {
  readonly keyId: string
  readonly keySecret: string
  readonly webhookSecret: string
}

function loadCredentials(): RazorpayCredentials {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

  const missing = [
    ['RAZORPAY_KEY_ID', keyId],
    ['RAZORPAY_KEY_SECRET', keySecret],
    ['RAZORPAY_WEBHOOK_SECRET', webhookSecret],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name)

  if (missing.length > 0) {
    throw new PaymentConfigError(
      `Razorpay is not configured. Missing environment variables: ${missing.join(', ')}`,
    )
  }

  return {
    keyId: keyId as string,
    keySecret: keySecret as string,
    webhookSecret: webhookSecret as string,
  }
}

interface RazorpayOrderResponse {
  readonly id: string
  readonly amount: number
  readonly currency: string
}

interface RazorpayWebhookEnvelope {
  readonly event?: string
  readonly payload?: {
    readonly payment?: {
      readonly entity?: {
        readonly id?: string
        readonly order_id?: string
        readonly amount?: number
        readonly currency?: string
        readonly email?: string
        readonly contact?: string
        readonly notes?: Record<string, string>
      }
    }
  }
}

export function createRazorpayGateway(): PaymentGateway {
  const credentials = loadCredentials()

  const authHeader = `Basic ${Buffer.from(
    `${credentials.keyId}:${credentials.keySecret}`,
  ).toString('base64')}`

  return {
    id: 'razorpay',

    publicKey(): string {
      // The key ID is public by design — it identifies the merchant to the
      // checkout widget. The secret never leaves the server.
      return credentials.keyId
    },

    async createOrder(
      request: CheckoutRequest,
      price: PriceBreakdown,
    ): Promise<PendingOrder> {
      // The shipping address rides along in `notes` so that a paid order is
      // fully self-describing inside the Razorpay dashboard. Until there is a
      // database, this *is* the order book — and it survives our app being down.
      const body = {
        amount: price.totalMinorUnits,
        currency: price.currency,
        receipt: `${PRODUCT.sku}-${Date.now()}`,
        notes: {
          sku: PRODUCT.sku,
          ship_estimate: SHIP_ESTIMATE.isoDate,
          customer_name: note(request.customer.fullName),
          customer_email: note(request.customer.email),
          customer_phone: note(request.customer.phone),
          ship_line1: note(request.shipping.line1),
          ship_line2: note(request.shipping.line2 ?? ''),
          ship_city: note(request.shipping.city),
          ship_state: note(request.shipping.state),
          ship_postal_code: note(request.shipping.postalCode),
          ship_country: note(request.shipping.country),
        },
      }

      let response: Response
      try {
        response = await fetch(`${RAZORPAY_API}/orders`, {
          method: 'POST',
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
      } catch (error: unknown) {
        throw new PaymentGatewayError(
          `Could not reach Razorpay: ${error instanceof Error ? error.message : 'network error'}`,
          502,
        )
      }

      if (!response.ok) {
        // Razorpay's error bodies can contain merchant-identifying detail, so
        // this message is for our logs — the route handler must not forward it
        // verbatim to the browser.
        const detail = await response.text()
        throw new PaymentGatewayError(
          `Razorpay rejected the order (HTTP ${response.status}): ${detail}`,
          502,
        )
      }

      const order = (await response.json()) as RazorpayOrderResponse

      if (!order.id) {
        throw new PaymentGatewayError('Razorpay returned an order with no id', 502)
      }

      return { gatewayOrderId: order.id, price }
    },

    verifyWebhook(rawBody: string, signature: string): boolean {
      const expected = createHmac('sha256', credentials.webhookSecret)
        .update(rawBody)
        .digest()

      let received: Buffer
      try {
        received = Buffer.from(signature, 'hex')
      } catch {
        return false
      }

      // timingSafeEqual throws on length mismatch, which would itself leak a
      // bit of information — so check length first and bail uniformly.
      if (received.length !== expected.length) {
        return false
      }

      return timingSafeEqual(expected, received)
    },

    parsePaidOrder(rawBody: string): PaidOrder | null {
      let envelope: RazorpayWebhookEnvelope
      try {
        envelope = JSON.parse(rawBody) as RazorpayWebhookEnvelope
      } catch {
        return null
      }

      // Razorpay sends many event types down the same webhook. `payment.captured`
      // is the only one that means "the money is actually ours".
      if (envelope.event !== 'payment.captured') {
        return null
      }

      const payment = envelope.payload?.payment?.entity
      if (!payment?.id || !payment.order_id || typeof payment.amount !== 'number') {
        return null
      }

      const notes = payment.notes ?? {}

      return {
        gatewayOrderId: payment.order_id,
        gatewayPaymentId: payment.id,
        amountMinorUnits: payment.amount,
        currency: payment.currency ?? 'INR',
        customer: {
          fullName: notes.customer_name,
          email: notes.customer_email ?? payment.email,
          phone: notes.customer_phone ?? payment.contact,
        },
        shipping: {
          line1: notes.ship_line1,
          line2: notes.ship_line2 || undefined,
          city: notes.ship_city,
          state: notes.ship_state,
          postalCode: notes.ship_postal_code,
          country: notes.ship_country,
        },
      }
    },
  }
}
