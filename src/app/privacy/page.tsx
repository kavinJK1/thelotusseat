import { pageMetadata } from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for The Lotus Seat website and services.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <div className="bg-warm-white pt-24 min-h-screen">
      <section className="py-20 max-w-3xl mx-auto px-6">
        <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-5">Legal</p>
        <h1 className="font-serif text-4xl font-medium text-near-black mb-3">Privacy Policy</h1>
        <p className="text-warm-grey mb-12 text-sm">Last updated: June 2026</p>

        <div className="space-y-10 text-warm-grey leading-relaxed">
          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">1. Information we collect</h2>
            <p className="mb-3">
              We collect information you provide directly when you submit our contact or pre-order form, including your name and email address. We may also collect your message content.
            </p>
            <p>
              We collect basic usage data automatically, including your IP address, browser type, pages visited, and time spent on those pages. This data is used in aggregate and is not linked to personal identifiers.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">2. How we use your information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-none space-y-2 pl-4">
              {[
                'Respond to your enquiries and pre-order requests',
                'Send you order updates, shipping notifications, and product news',
                'Improve our website and user experience',
                'Comply with legal obligations',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-sand mt-2.5 shrink-0 inline-block" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">3. Data sharing</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. We may share data with service providers who assist in operating our website (such as email delivery services) under strict confidentiality agreements. We will disclose information if required by law.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">4. Data retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfil the purposes described in this policy, or as required by law. Pre-order information is retained until your order is fulfilled and the warranty period expires.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">5. Your rights</h2>
            <p className="mb-3">
              Depending on your location, you may have rights to access, correct, or delete your personal data, or to object to its processing. To exercise these rights, contact us at{' '}
              <a href="mailto:hello@thelotusseat.com" className="text-near-black underline underline-offset-2">
                hello@thelotusseat.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">6. Cookies</h2>
            <p>
              Our website uses essential cookies required for basic functionality. We do not use advertising or tracking cookies. You can disable cookies in your browser settings, though some features may not function correctly.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">7. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify registered users of material changes via email. The date of the last update is shown at the top of this page.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">8. Contact</h2>
            <p>
              Questions about this Privacy Policy should be directed to{' '}
              <a href="mailto:hello@thelotusseat.com" className="text-near-black underline underline-offset-2">
                hello@thelotusseat.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
