'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/product', label: 'Product' },
  { href: '/about', label: 'About' },
  { href: '/science', label: 'The Science' },
  { href: '/faq', label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[50] transition-colors duration-300 ${
        scrolled
          ? 'bg-paper/85 backdrop-blur-md border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="group flex items-baseline gap-2.5">
          <span className="font-display text-[0.95rem] font-semibold tracking-[-0.01em] text-ink uppercase">
            Lotus&thinsp;Seat
          </span>
          <span className="mono-label hidden sm:inline text-[0.62rem] text-ink-soft group-hover:text-cork-deep transition-colors">
            LS&#8209;01
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[0.82rem] text-ink-soft hover:text-ink transition-colors duration-200 py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/checkout"
            className="hidden md:inline-flex items-center gap-2 bg-ink text-paper text-[0.8rem] font-medium px-4 py-2 rounded-[3px] hover:bg-graphite-soft transition-colors duration-200"
          >
            Pre&#8209;Order
            <span className="mono-label text-[0.62rem] text-paper/55">↗</span>
          </Link>

          <button
            className="md:hidden -mr-2 grid place-items-center w-11 h-11 text-ink"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M3 6.5H17M3 13.5H17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden bg-paper border-t border-line px-5 py-6 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 text-ink-soft hover:text-ink transition-colors text-base py-3 min-h-11"
              onClick={() => setMenuOpen(false)}
            >
              <span className="mono-label text-[0.66rem] text-ink-soft w-7">
                {String(i + 1).padStart(2, '0')}
              </span>
              {link.label}
            </Link>
          ))}
          <Link
            href="/checkout"
            className="mt-4 bg-ink text-paper text-sm font-medium px-5 py-3.5 rounded-[3px] text-center"
            onClick={() => setMenuOpen(false)}
          >
            Pre-Order Now
          </Link>
        </div>
      )}
    </header>
  )
}
