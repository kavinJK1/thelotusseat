'use client'

import { useState } from 'react'
import FadeIn from '@/components/FadeIn'
import type { Faq } from '@/lib/seo/schema'

interface FaqAccordionProps {
  readonly faqs: readonly Faq[]
  readonly heading: string
  readonly label?: string
}

/**
 * The visible half of the FAQ pattern — its JSON-LD twin is emitted by the page.
 *
 * Collapsed answers stay in the DOM under `hidden` rather than being unmounted.
 * That is load-bearing for this component's entire purpose: markup a crawler
 * cannot see is markup that cannot be quoted, and FAQ structured data whose text
 * has no visible counterpart on the page is an invitation to lose the rich result.
 */
export default function FaqAccordion({ faqs, heading, label = 'FAQ' }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <p className="mono-label text-[0.66rem] mb-5 flex items-center gap-2">
            <span className="text-cork-deep">REFERENCE</span>
            <span className="w-6 h-px bg-line-strong" />
            {label}
          </p>
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.9rem,4vw,3rem)] mb-11">
            {heading}
          </h2>
        </FadeIn>

        <div className="border-t border-line-strong">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    className="w-full flex items-start justify-between text-left py-5 gap-5 group"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.72rem] text-cork-deep tabular-nums pt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display font-medium text-ink text-[1.02rem] tracking-[-0.01em] group-hover:text-cork-deep transition-colors">
                        {faq.q}
                      </span>
                    </span>
                    <span
                      className={`shrink-0 mt-1 w-5 h-5 flex items-center justify-center border transition-colors ${
                        isOpen ? 'bg-ink border-ink text-paper' : 'border-line-strong text-ink-soft'
                      }`}
                      aria-hidden
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        {isOpen ? (
                          <path d="M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        ) : (
                          <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        )}
                      </svg>
                    </span>
                  </button>
                </h3>
                <div id={`faq-panel-${i}`} hidden={!isOpen} className="grid grid-cols-[3.15rem_1fr] pb-6">
                  <span aria-hidden />
                  <p className="text-ink-soft leading-relaxed text-[0.95rem] max-w-xl">{faq.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
