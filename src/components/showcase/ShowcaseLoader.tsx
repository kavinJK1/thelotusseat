'use client'

import dynamic from 'next/dynamic'

const ProductShowcase = dynamic(
  () => import('./ProductShowcase'),
  { ssr: false, loading: () => <div className="h-screen bg-[#0E0B08]" /> }
)

export default function ShowcaseLoader() {
  return <ProductShowcase />
}
