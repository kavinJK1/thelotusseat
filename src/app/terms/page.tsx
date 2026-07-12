import { pageMetadata } from '@/lib/seo/metadata'

export const metadata = pageMetadata({
  title: 'Terms & Conditions',
  description: 'Terms and conditions for The Lotus Seat website and services.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <div className="bg-warm-white pt-24 min-h-screen">
      <section className="py-20 max-w-3xl mx-auto px-6">
        <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-5">Legal</p>
        <h1 className="font-serif text-4xl font-medium text-near-black mb-3">Terms & Conditions</h1>
        <p className="text-warm-grey mb-12 text-sm">Last updated: June 2026</p>

        <div className="space-y-10 text-warm-grey leading-relaxed">
          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">1. Agreement to terms</h2>
            <p>
              By accessing or using the thelotusseat.com website, or by placing a pre-order, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">2. Pre-orders</h2>
            <p className="mb-3">
              A pre-order constitutes an agreement to purchase The Lotus Seat at the price specified at the time of order. Pre-orders are subject to availability. In the event that we are unable to fulfil your order, we will issue a full refund.
            </p>
            <p>
              Shipping timelines for pre-orders are estimates and may change. We will communicate any material changes directly to pre-order customers via email.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">3. Pricing</h2>
            <p>
              All prices are shown in the currency indicated at checkout. We reserve the right to change prices at any time, but confirmed pre-orders will be honoured at the price shown at the time of order.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">4. Returns and refunds</h2>
            <p>
              Returns and refunds are governed by our Shipping & Returns policy, which forms part of these Terms. The 30-day satisfaction guarantee and 2-year warranty apply as described therein.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">5. Intellectual property</h2>
            <p>
              All content on this website — including text, images, design, and the Lotus Seat name and mark — is the property of The Lotus Seat and protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">6. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, The Lotus Seat shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or our products. Our total liability to you shall not exceed the amount paid for the product in question.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">7. Governing law</h2>
            <p>
              These Terms are governed by and construed in accordance with applicable law. Any disputes shall be resolved through the appropriate courts in our jurisdiction of incorporation.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">8. Changes to terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised Terms. The date of the last update is shown at the top of this page.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-medium text-near-black mb-3">9. Contact</h2>
            <p>
              Questions about these Terms should be directed to{' '}
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
