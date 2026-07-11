import type { Currency, PriceBreakdown } from './product'

export interface ShippingAddress {
  readonly line1: string
  readonly line2?: string
  readonly city: string
  readonly state: string
  readonly postalCode: string
  /** ISO 3166-1 alpha-2, uppercase. */
  readonly country: string
}

export interface Customer {
  readonly fullName: string
  readonly email: string
  readonly phone: string
}

export interface CheckoutRequest {
  readonly currency: Currency
  readonly customer: Customer
  readonly shipping: ShippingAddress
}

/**
 * An order that has been created at the gateway but not yet paid.
 * `gatewayOrderId` is what the browser hands to the gateway's checkout widget.
 */
export interface PendingOrder {
  readonly gatewayOrderId: string
  readonly price: PriceBreakdown
}

/** A payment the gateway has told us — and we have cryptographically verified — is captured. */
export interface PaidOrder {
  readonly gatewayOrderId: string
  readonly gatewayPaymentId: string
  readonly amountMinorUnits: number
  readonly currency: string
  readonly customer: Partial<Customer>
  readonly shipping: Partial<ShippingAddress>
}

/**
 * The seam that keeps us from being married to one provider.
 *
 * Stripe is invite-only for Indian businesses, so we ship on Razorpay — but
 * that may change, and the rest of the app should never need to know.
 */
export interface PaymentGateway {
  readonly id: string

  /** Public identifier the browser needs to open the checkout widget. */
  publicKey(): string

  createOrder(request: CheckoutRequest, price: PriceBreakdown): Promise<PendingOrder>

  /**
   * Verify a webhook delivery is genuinely from the gateway.
   * Must be constant-time; a naive `===` here is a forgery vector.
   */
  verifyWebhook(rawBody: string, signature: string): boolean

  /** Parse an already-verified webhook body into a PaidOrder, or null if it isn't a payment capture. */
  parsePaidOrder(rawBody: string): PaidOrder | null
}

export class PaymentConfigError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PaymentConfigError'
  }
}

export class PaymentGatewayError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'PaymentGatewayError'
    this.status = status
  }
}
