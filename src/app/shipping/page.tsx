import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shipping & Returns — The Lotus Seat',
  description: 'Shipping information and returns policy for The Lotus Seat.',
}

export default function ShippingPage() {
  return (
    <div className="bg-warm-white pt-24 min-h-screen">
      <section className="py-20 max-w-3xl mx-auto px-6">
        <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-5">Policies</p>
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-near-black mb-12">
          Shipping & Returns
        </h1>

        <div className="space-y-12 text-warm-grey leading-relaxed">
          <div>
            <h2 className="font-serif text-2xl font-medium text-near-black mb-4">Pre-Order Shipping</h2>
            <p className="mb-4">
              The Lotus Seat is currently available for pre-order. All pre-orders will be fulfilled in order of receipt once production of the first run is complete. We will contact each customer individually with confirmed shipping timelines and tracking information.
            </p>
            <p>
              To stay updated on production progress and shipping schedules, please ensure your email address is correct at the time of order. We send regular updates to all pre-order customers.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-near-black mb-4">Shipping Coverage</h2>
            <p className="mb-4">
              We ship internationally. Shipping costs and estimated delivery times will be confirmed at the time of dispatch based on your location. All orders are carefully packaged to protect the product in transit.
            </p>
            <p>
              Import duties and taxes for international shipments are the responsibility of the customer and vary by country. We recommend checking your local customs regulations before ordering.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-near-black mb-4">30-Day Satisfaction Guarantee</h2>
            <p className="mb-4">
              We are confident that The Lotus Seat will make a meaningful difference to your practice. If after 30 days of regular use you are not satisfied, contact us and we will arrange a full refund — no questions asked.
            </p>
            <p>
              The 30-day period begins from the date of delivery. Products must be returned in a clean condition. Return shipping costs are the responsibility of the customer unless the product is defective.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-near-black mb-4">Manufacturing Defects</h2>
            <p>
              If your Lotus Seat arrives with a defect in materials or workmanship, we will replace it or issue a full refund at no additional cost, including return shipping. Please contact us within 14 days of delivery with photographs of the defect.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-near-black mb-4">2-Year Warranty</h2>
            <p>
              The Lotus Seat carries a 2-year limited warranty covering defects in materials and workmanship under normal use and care. This warranty does not cover damage resulting from improper use, accidents, or normal wear. To make a warranty claim, please contact us with your order details.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-near-black mb-4">Contact</h2>
            <p>
              For any shipping, returns, or warranty enquiries, please{' '}
              <Link href="/contact" className="text-near-black underline underline-offset-2">
                contact us
              </Link>{' '}
              or email{' '}
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
