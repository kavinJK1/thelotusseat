'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

/**
 * A persistent buy action for mobile only.
 *
 * On desktop the fixed navbar already carries a Pre-Order button, so this would be
 * redundant there — it is `md:hidden` for that reason, not as an afterthought. On
 * mobile that navbar CTA lives inside the collapsed hamburger menu, which means
 * that from the moment the hero scrolls away there is no visible way to buy. This
 * closes that gap.
 *
 * The reassurance line is the cancellation right, not a claim about payment timing:
 * the card IS charged on submit (see lib/commerce/razorpay.ts), and the page must
 * not say otherwise. What de-risks a pre-order here is that you can cancel for a
 * full refund at any point before the unit ships.
 */
export default function StickyPreorderBar({ priceLabel }: { priceLabel: string }) {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  // Never shown inside the funnel it points at, or on the confirmation page.
  const inCheckout = pathname.startsWith('/checkout')

  useEffect(() => {
    if (inCheckout) return

    // Roughly one viewport: the bar appears once the hero — which has its own CTA —
    // has left the screen, so the two are never on screen competing at once.
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [inCheckout])

  if (inCheckout) return null

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-[30] border-t border-line-strong bg-paper/95 backdrop-blur-md transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      // Hidden from assistive tech and from tab order while it is off-screen —
      // a keyboard user must not land on a control they cannot see.
      inert={!visible ? true : undefined}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3">
        <div className="min-w-0">
          <p className="font-mono text-[0.95rem] text-ink tabular-nums leading-none">{priceLabel}</p>
          <p className="mono-label text-[0.6rem] mt-1.5 truncate">CANCEL ANY TIME BEFORE DISPATCH</p>
        </div>
        <Link
          href="/checkout"
          className="shrink-0 inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 rounded-[3px] text-sm font-medium min-h-11"
        >
          Pre-Order
          <span className="text-paper/55">↗</span>
        </Link>
      </div>
    </div>
  )
}
