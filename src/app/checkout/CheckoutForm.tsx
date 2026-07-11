'use client'

import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import type { Currency } from '@/lib/commerce/product'
import {
  PRODUCT,
  SHIP_ESTIMATE,
  SUPPORTED_CURRENCIES,
  formatMinorUnits,
  priceFor,
} from '@/lib/commerce/product'

interface RazorpayHandlerResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  order_id: string
  name: string
  description: string
  prefill: { name: string; email: string; contact: string }
  theme: { color: string }
  handler: (response: RazorpayHandlerResponse) => void
  modal: { ondismiss: () => void }
}

interface RazorpayInstance {
  open: () => void
  on: (event: string, callback: (payload: unknown) => void) => void
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance
  }
}

const FIELDS = [
  { name: 'fullName', label: 'Full name', autoComplete: 'name', group: 'customer' },
  { name: 'email', label: 'Email', autoComplete: 'email', type: 'email', group: 'customer' },
  { name: 'phone', label: 'Phone', autoComplete: 'tel', type: 'tel', group: 'customer' },
  { name: 'line1', label: 'Address', autoComplete: 'address-line1', group: 'shipping' },
  { name: 'line2', label: 'Address line 2', autoComplete: 'address-line2', group: 'shipping', optional: true },
  { name: 'city', label: 'City', autoComplete: 'address-level2', group: 'shipping' },
  { name: 'state', label: 'State / region', autoComplete: 'address-level1', group: 'shipping' },
  { name: 'postalCode', label: 'Postal code', autoComplete: 'postal-code', group: 'shipping' },
  { name: 'country', label: 'Country code', autoComplete: 'country', group: 'shipping', hint: 'Two letters — IN, US, DE' },
] as const

type FieldName = (typeof FIELDS)[number]['name']

const EMPTY_FORM: Record<FieldName, string> = {
  fullName: '',
  email: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
}

export function CheckoutForm() {
  const router = useRouter()

  const [currency, setCurrency] = useState<Currency>('INR')
  const [form, setForm] = useState<Record<FieldName, string>>(EMPTY_FORM)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scriptReady, setScriptReady] = useState(false)

  const price = useMemo(() => priceFor(currency), [currency])

  function updateField(name: FieldName, value: string) {
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!scriptReady || !window.Razorpay) {
      setFormError('The payment window is still loading. Give it a moment and try again.')
      return
    }

    setIsSubmitting(true)
    setFormError(null)
    setFieldErrors({})

    try {
      // Note what we send: a currency, not a price. The server decides the amount.
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currency,
          customer: { fullName: form.fullName, email: form.email, phone: form.phone },
          shipping: {
            line1: form.line1,
            line2: form.line2 || undefined,
            city: form.city,
            state: form.state,
            postalCode: form.postalCode,
            country: form.country,
          },
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        if (Array.isArray(result.fieldErrors)) {
          const mapped: Record<string, string> = {}
          for (const issue of result.fieldErrors as { path: string; message: string }[]) {
            // Server paths are nested ("customer.email"); the form is flat.
            const key = issue.path.split('.').pop() ?? issue.path
            mapped[key] = issue.message
          }
          setFieldErrors(mapped)
        }
        setFormError(result.error ?? 'We could not start your payment.')
        setIsSubmitting(false)
        return
      }

      const { gatewayOrderId, publicKey, amountMinorUnits } = result.data

      const razorpay = new window.Razorpay({
        key: publicKey,
        amount: amountMinorUnits,
        currency,
        order_id: gatewayOrderId,
        name: PRODUCT.name,
        description: `Pre-order — ${SHIP_ESTIMATE.label}`,
        prefill: { name: form.fullName, email: form.email, contact: form.phone },
        theme: { color: '#1f2430' },
        handler: () => {
          // Payment succeeded in the widget. This is a UX signal only — the
          // order is confirmed by the webhook, which has already fired or will
          // shortly, regardless of what this browser does next.
          router.push('/checkout/success')
        },
        modal: {
          ondismiss: () => {
            // The customer closed the widget without paying. The pending order
            // at Razorpay simply expires; nothing to clean up.
            setIsSubmitting(false)
          },
        },
      })

      razorpay.on('payment.failed', () => {
        setFormError('That payment did not go through. No money has been taken — please try again.')
        setIsSubmitting(false)
      })

      razorpay.open()
    } catch (error: unknown) {
      console.error('[checkout] submit failed', error)
      setFormError('Something went wrong reaching our server. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onReady={() => setScriptReady(true)}
        onError={() =>
          setFormError('The payment provider failed to load. Check your connection and reload.')
        }
      />

      <form onSubmit={handleSubmit} noValidate className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-10">
          <fieldset className="space-y-5">
            <legend className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-5">
              Contact
            </legend>
            {FIELDS.filter((f) => f.group === 'customer').map((field) => (
              <Field
                key={field.name}
                field={field}
                value={form[field.name]}
                error={fieldErrors[field.name]}
                onChange={updateField}
              />
            ))}
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-5">
              Ship to
            </legend>
            {FIELDS.filter((f) => f.group === 'shipping').map((field) => (
              <Field
                key={field.name}
                field={field}
                value={form[field.name]}
                error={fieldErrors[field.name]}
                onChange={updateField}
              />
            ))}
          </fieldset>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit border border-warm-border rounded-2xl p-6 bg-surface">
          <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-6">Order</p>

          <label className="block mb-6">
            <span className="text-warm-grey text-xs mb-2 block">Currency</span>
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value as Currency)}
              className="w-full bg-warm-white border border-warm-border rounded-lg px-3 py-2 text-sm text-near-black"
            >
              {SUPPORTED_CURRENCIES.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </label>

          <dl className="space-y-3 text-sm border-t border-warm-border pt-5">
            <Row label={PRODUCT.name} value={formatMinorUnits(price.itemMinorUnits, currency)} />
            <Row
              label="Shipping"
              value={
                price.shippingMinorUnits === 0
                  ? 'Included'
                  : formatMinorUnits(price.shippingMinorUnits, currency)
              }
            />
            <div className="flex justify-between border-t border-warm-border pt-3 text-near-black font-medium">
              <dt>Total</dt>
              <dd className="tabular-nums">
                {formatMinorUnits(price.totalMinorUnits, currency)}
              </dd>
            </div>
          </dl>

          <p className="text-warm-grey text-xs leading-relaxed mt-5 border-t border-warm-border pt-5">
            This is a pre-order. Your card is charged today and the seat{' '}
            {SHIP_ESTIMATE.label.toLowerCase()}. Cancel any time before dispatch for a full refund.
          </p>

          {formError ? (
            <p role="alert" className="text-sm text-cork-deep mt-5">
              {formError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-near-black text-warm-white px-6 py-4 rounded-full text-sm font-medium hover:bg-near-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Opening payment…' : 'Reserve yours'}
          </button>
        </aside>
      </form>
    </>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-warm-grey">
      <dt>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  )
}

interface FieldProps {
  field: (typeof FIELDS)[number]
  value: string
  error?: string
  onChange: (name: FieldName, value: string) => void
}

function Field({ field, value, error, onChange }: FieldProps) {
  const id = `field-${field.name}`
  const describedBy = error ? `${id}-error` : 'hint' in field ? `${id}-hint` : undefined

  return (
    <div>
      <label htmlFor={id} className="text-warm-grey text-xs mb-2 block">
        {field.label}
        {'optional' in field && field.optional ? (
          <span className="text-warm-grey/60"> — optional</span>
        ) : null}
      </label>
      <input
        id={id}
        name={field.name}
        type={'type' in field ? field.type : 'text'}
        autoComplete={field.autoComplete}
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="w-full bg-warm-white border border-warm-border rounded-lg px-3 py-2.5 text-sm text-near-black focus:outline-none focus:border-near-black transition-colors aria-[invalid]:border-cork-deep"
      />
      {error ? (
        <p id={`${id}-error`} className="text-cork-deep text-xs mt-1.5">
          {error}
        </p>
      ) : 'hint' in field ? (
        <p id={`${id}-hint`} className="text-warm-grey/60 text-xs mt-1.5">
          {field.hint}
        </p>
      ) : null}
    </div>
  )
}
