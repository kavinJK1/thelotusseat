import type { Metadata } from 'next'
import { Archivo, Caveat, Spline_Sans_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
  title: 'The Lotus Seat — Sit Better. Meditate Longer.',
  description:
    'A premium ergonomic meditation seat combining an inclined cork composite base with a responsive natural latex cushion. Supports natural posture and longer, deeper meditation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${splineMono.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
