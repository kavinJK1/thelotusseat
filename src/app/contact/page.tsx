'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-warm-white pt-24 min-h-screen">
      <section className="py-20 max-w-2xl mx-auto px-6">
        <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-5">Contact</p>
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-near-black mb-4">
          Reserve your seat.
        </h1>
        <p className="text-warm-grey text-lg leading-relaxed mb-12">
          The Lotus Seat is in pre-order. Fill in the form below and we will send you all the details — including pricing, shipping timelines, and how to secure your place in the first production run.
        </p>

        {submitted ? (
          <div className="bg-surface rounded-3xl border border-warm-border p-10 text-center">
            <div className="w-12 h-12 rounded-full bg-sand/20 flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4 4 8-8" stroke="#C4A882" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-medium text-near-black mb-2">Thank you.</h2>
            <p className="text-warm-grey">We have received your message and will be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-near-black mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-warm-white border border-warm-border rounded-xl px-4 py-3 text-near-black placeholder:text-warm-grey/50 focus:outline-none focus:border-sand transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-near-black mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-warm-white border border-warm-border rounded-xl px-4 py-3 text-near-black placeholder:text-warm-grey/50 focus:outline-none focus:border-sand transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-near-black mb-2">
                Message <span className="text-warm-grey font-normal">(optional)</span>
              </label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-warm-white border border-warm-border rounded-xl px-4 py-3 text-near-black placeholder:text-warm-grey/50 focus:outline-none focus:border-sand transition-colors resize-none"
                placeholder="Any questions about the product?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-near-black text-warm-white py-4 rounded-full text-sm font-medium hover:bg-near-black/80 transition-colors"
            >
              Send Message
            </button>
          </form>
        )}

        <div className="mt-12 pt-10 border-t border-warm-border">
          <p className="text-sm text-warm-grey">
            Prefer email? Write to us at{' '}
            <a href="mailto:hello@thelotusseat.com" className="text-near-black underline underline-offset-2">
              hello@thelotusseat.com
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
