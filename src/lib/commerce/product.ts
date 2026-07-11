/**
 * Single source of truth for what we sell and what it costs.
 *
 * Prices live on the server and are never accepted from the client. The
 * checkout API looks the amount up here using only the currency code the
 * browser sends, so a tampered request can at worst pick the wrong currency.
 */

export const SUPPORTED_CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'] as const

export type Currency = (typeof SUPPORTED_CURRENCIES)[number]

/**
 * Amounts are in each currency's *minor unit* (paise, cents, pence), because
 * that is what every payment gateway expects and it keeps us off floating
 * point for money.
 *
 * EUR 199 is the anchor price. The others are held at approximately that value
 * and rounded to a clean local price point — they are deliberately NOT computed
 * from a live FX rate, because a price that moves with the market reads as
 * unserious and makes refunds ambiguous. Revisit them when FX drifts far enough
 * to matter.
 */
const PRICE_MINOR_UNITS: Record<Currency, number> = {
  EUR: 19_900, //    €199 — the anchor
  USD: 21_900, //    $219
  GBP: 17_500, //    £175
  INR: 1_899_000, // ₹18,990
}

/**
 * Shipping is charged separately from the seat so the two can move
 * independently — international freight on a 2kg object is not trivial.
 *
 * TODO(shipping): replace with real rates once a courier is chosen.
 */
const SHIPPING_MINOR_UNITS: Record<Currency, number> = {
  INR: 0, // free domestic
  USD: 3_500,
  EUR: 3_200,
  GBP: 2_800,
}

export const PRODUCT = {
  sku: 'LOTUS-SEAT-01',
  name: 'The Lotus Seat',
  description: 'Ergonomic meditation seat — cork base, natural latex cushion system.',
} as const

/**
 * The delivery window shown at checkout and recorded against the order.
 *
 * This is load-bearing for more than UX: card networks date the dispute
 * window from the *expected delivery date*, so this is the promise we are
 * held to on a chargeback. Keep it honest and keep it current.
 *
 * TODO(fulfilment): replace with the real committed ship date.
 */
export const SHIP_ESTIMATE = {
  label: 'Ships March 2027',
  isoDate: '2027-03-31',
} as const

export function isSupportedCurrency(value: unknown): value is Currency {
  return (
    typeof value === 'string' &&
    (SUPPORTED_CURRENCIES as readonly string[]).includes(value)
  )
}

export interface PriceBreakdown {
  readonly currency: Currency
  readonly itemMinorUnits: number
  readonly shippingMinorUnits: number
  readonly totalMinorUnits: number
}

export function priceFor(currency: Currency): PriceBreakdown {
  const itemMinorUnits = PRICE_MINOR_UNITS[currency]
  const shippingMinorUnits = SHIPPING_MINOR_UNITS[currency]

  return {
    currency,
    itemMinorUnits,
    shippingMinorUnits,
    totalMinorUnits: itemMinorUnits + shippingMinorUnits,
  }
}

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
}

export function formatMinorUnits(minorUnits: number, currency: Currency): string {
  const major = minorUnits / 100
  const formatted = new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    minimumFractionDigits: major % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(major)

  return `${CURRENCY_SYMBOLS[currency]}${formatted}`
}
