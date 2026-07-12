'use client'

import { useState } from 'react'
import type { FaqCategory } from './faqs'

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const panelId = `faq-${q.slice(0, 24).replace(/\W+/g, '-').toLowerCase()}`

  return (
    <div className="border-b border-line last:border-b-0">
      <h3>
        <button
          type="button"
          className="w-full flex items-start justify-between text-left py-5 gap-5 group"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={panelId}
        >
          <span className="font-display font-medium text-ink text-[1.02rem] tracking-[-0.01em] group-hover:text-cork-deep transition-colors">
            {q}
          </span>
          <span
            className={`shrink-0 mt-1 w-5 h-5 flex items-center justify-center border transition-colors ${
              open ? 'bg-ink border-ink text-paper' : 'border-line-strong text-ink-soft'
            }`}
            aria-hidden
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              {open ? (
                <path d="M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              ) : (
                <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              )}
            </svg>
          </span>
        </button>
      </h3>
      {/* `hidden` rather than unmounting: a collapsed answer must still be in the
          HTML, or the FAQPage schema is describing text no crawler can find. */}
      <p id={panelId} hidden={!open} className="text-ink-soft leading-relaxed text-[0.95rem] pb-6 max-w-xl">
        {a}
      </p>
    </div>
  )
}

export default function FaqCategories({ categories }: { categories: readonly FaqCategory[] }) {
  return (
    <div className="space-y-14">
      {categories.map((category) => (
        <section key={category.category}>
          <h2 className="mono-label text-[0.66rem] uppercase mb-4 flex items-center gap-2">
            <span className="text-cork-deep">{category.category}</span>
            <span className="flex-1 h-px bg-line" />
          </h2>
          <div className="border-t border-line-strong">
            {category.faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
