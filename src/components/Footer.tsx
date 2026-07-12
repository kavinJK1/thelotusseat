import Link from 'next/link'

const footerLinks = {
  Product: [
    { href: '/product', label: 'The Seat' },
    { href: '/science', label: 'The Science' },
    { href: '/faq', label: 'FAQ' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  Legal: [
    { href: '/shipping', label: 'Shipping & Returns' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-surface text-ink border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-lg font-semibold tracking-[-0.01em] uppercase block mb-4">
              Lotus&thinsp;Seat
            </Link>
            <p className="text-ink-soft text-sm leading-relaxed max-w-xs">
              An ergonomic meditation seat engineered around the biomechanics of seated
              posture. Sit better, meditate longer.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" aria-label="Instagram" className="w-11 h-11 flex items-center justify-center border border-line rounded-[3px] text-ink-soft hover:text-ink hover:border-line-strong transition-colors">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-11 h-11 flex items-center justify-center border border-line rounded-[3px] text-ink-soft hover:text-ink hover:border-line-strong transition-colors">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="mono-label text-[0.66rem] uppercase text-ink-soft mb-4">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft hover:text-ink transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-line pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p className="mono-label text-[0.68rem] text-ink-soft">
            © {new Date().getFullYear()} THE LOTUS SEAT · ALL RIGHTS RESERVED
          </p>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 bg-cork text-graphite text-sm px-5 py-2.5 rounded-[3px] hover:bg-cork-bright transition-colors font-medium"
          >
            Pre-Order Now
            <span className="text-graphite/60">↗</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
