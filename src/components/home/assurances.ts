import { SHIP_ESTIMATE } from '@/lib/commerce/product'

/**
 * The pre-order terms, in one place.
 *
 * These are the promises the page makes on the way to checkout, so they have to be
 * the promises checkout actually keeps. The ship window is imported rather than
 * retyped: card networks date the dispute window from the expected delivery date,
 * and a marketing page that quotes a different one than the order confirmation is
 * the exact discrepancy that loses a chargeback.
 *
 * The homepage previously told visitors there was "no charge until your unit is
 * ready" while the checkout charged the card on submit. That is now stated the way
 * it actually works — the reassurance has to come from the cancellation right, not
 * from a claim the payment flow contradicts.
 */
export const ASSURANCES: ReadonlyArray<{ term: string; detail: string }> = [
  { term: SHIP_ESTIMATE.label, detail: 'First production run, fulfilled in order of receipt' },
  { term: 'Cancel any time before dispatch', detail: 'Full refund, no questions asked' },
  { term: '30-day returns', detail: 'From delivery, if it does not suit your practice' },
  { term: '2-year warranty', detail: 'Materials and workmanship' },
]
