import { pageMetadata } from '@/lib/seo/metadata'

/**
 * The contact page is a client component (it owns form state), and a client
 * component cannot export `metadata`. A route-segment layout is the supported way
 * to attach metadata to it without dragging the form onto the server.
 */
export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Questions about The Lotus Seat — materials, sizing, pre-orders or shipping? Reach us at hello@thelotusseat.com.',
  path: '/contact',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
