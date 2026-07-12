import type { Metadata } from 'next'
import Link from 'next/link'

import { SHIP_ESTIMATE } from '@/lib/commerce/product'

export const metadata: Metadata = {
  title: 'Reserved',
  robots: { index: false, follow: false },
}

export default function CheckoutSuccessPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 pt-32 pb-24">
      <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-5">Confirmed</p>

      <h1 className="font-serif text-4xl md:text-5xl font-medium text-near-black leading-tight mb-6">
        Your seat is reserved.
      </h1>

      <p className="text-warm-grey text-lg leading-relaxed mb-4">
        Payment received. {SHIP_ESTIMATE.label}, to the address you gave us — we&apos;ll email you
        a receipt now and a dispatch note when it leaves the workshop.
      </p>

      <p className="text-warm-grey leading-relaxed mb-10">
        Changed your mind? You can cancel for a full refund any time before dispatch. Reply to the
        receipt, or reach us from the contact page.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center bg-near-black text-warm-white px-8 py-4 rounded-full text-sm font-medium hover:bg-near-black/80 transition-colors"
        >
          Back to the site
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center border border-warm-border text-near-black px-8 py-4 rounded-full text-sm font-medium hover:bg-surface transition-colors"
        >
          Contact us
        </Link>
      </div>
    </main>
  )
}
