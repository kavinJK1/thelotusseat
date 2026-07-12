import type { Metadata } from 'next'
import { Archivo, Caveat, Spline_Sans_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JsonLd from '@/components/seo/JsonLd'
import StickyPreorderBar from '@/components/StickyPreorderBar'
import { formatMinorUnits, priceFor } from '@/lib/commerce/product'
import { graph, organizationSchema, websiteSchema } from '@/lib/seo/schema'
import { SITE } from '@/lib/seo/site'

// Engineered grotesque — display + body, carried on weight/width contrast.
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  axes: ['wdth'],
})

// Technical mono, reserved for real measurement data (angles, dimensions, ILD).
const splineMono = Spline_Sans_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

// Marker hand — used in exactly one place: the designer's sketch chapter, where
// the annotations are meant to read as the drawing's own handwriting.
const caveat = Caveat({
  variable: '--font-hand',
  subsets: ['latin'],
  weight: ['500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    // Inner pages supply only their own title; the brand suffix is appended here
    // so no page has to remember it and none of them can disagree about it.
    default: 'Ergonomic Meditation Seat for Posture & Back Pain | The Lotus Seat',
    template: '%s | The Lotus Seat',
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Ergonomic Meditation Seat for Posture & Back Pain | The Lotus Seat',
    description: SITE.description,
    locale: 'en',
    images: [{ url: '/images/product/cushion-full.jpg', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ergonomic Meditation Seat for Posture & Back Pain | The Lotus Seat',
    description: SITE.description,
    images: ['/images/product/cushion-full.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Uncapped previews: snippet length and image size are the levers that decide
      // whether we win a featured snippet, and the defaults quietly cap both.
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  category: 'Meditation & Wellness Equipment',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${splineMono.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased">
        {/* Site-wide identity graph. Page-level nodes (Product, FAQPage, Article)
            reference these by @id rather than redeclaring the brand. */}
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* Price is resolved here, on the server, from the same table checkout
            charges against — a sticky bar quoting a number the cart disagrees with
            is worse than no sticky bar. */}
        <StickyPreorderBar
          priceLabel={formatMinorUnits(priceFor('EUR').itemMinorUnits, 'EUR')}
        />
      </body>
    </html>
  )
}
