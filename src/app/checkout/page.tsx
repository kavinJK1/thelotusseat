import type { Metadata } from 'next'

import { CheckoutForm } from './CheckoutForm'

export const metadata: Metadata = {
  title: 'Reserve — The Lotus Seat',
  description: 'Pre-order The Lotus Seat.',
  // A checkout page has no business being indexed or shared as a preview.
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
      <header className="mb-14">
        <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-5">Pre-order</p>
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-near-black leading-tight">
          Reserve your seat.
        </h1>
      </header>

      <CheckoutForm />
    </main>
  )
}
