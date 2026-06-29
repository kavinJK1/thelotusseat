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
    <footer className="bg-near-black text-warm-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-medium block mb-3">
              The Lotus Seat
            </Link>
            <p className="text-warm-grey text-sm leading-relaxed max-w-xs">
              Sit Better. Meditate Longer. A premium ergonomic meditation seat designed for serious practitioners.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="text-warm-grey hover:text-warm-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-warm-grey hover:text-warm-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-medium tracking-widest uppercase text-warm-grey mb-4">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-warm-white/70 hover:text-warm-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-grey">
            © {new Date().getFullYear()} The Lotus Seat. All rights reserved.
          </p>
          <Link
            href="/contact"
            className="bg-sand text-near-black text-sm px-6 py-2.5 rounded-full hover:bg-sand-light transition-colors font-medium"
          >
            Pre-Order Now
          </Link>
        </div>
      </div>
    </footer>
  )
}
