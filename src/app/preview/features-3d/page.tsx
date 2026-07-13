import type { Metadata } from 'next'
import Link from 'next/link'
import Features from '@/components/home/Features'

/**
 * A throwaway route for judging one decision: should "Five systems. One long sit."
 * argue with the photographs of the real unit, or with the 3D model?
 *
 * Not linked from anywhere and marked noindex — it exists to be looked at and then
 * deleted once the call is made.
 */
export const metadata: Metadata = {
  title: 'Preview — Features with the 3D model',
  robots: { index: false, follow: false },
}

export default function FeaturesModelPreview() {
  return (
    <>
      <div className="bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 pt-24 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mono-label text-[0.66rem] text-cork-deep">PREVIEW · NOT LINKED · NOINDEX</p>
            <h1 className="mt-2 font-display font-semibold text-ink text-xl tracking-[-0.02em]">
              Five systems, argued with the 3D model
            </h1>
            <p className="mt-1.5 text-ink-soft text-sm max-w-xl leading-relaxed">
              The same section, same copy, same measured insets — the photograph swapped for the
              live model, flying to the view each system is best seen from.
            </p>
          </div>
          <Link
            href="/#engineering"
            className="inline-flex items-center gap-2 border border-line-strong text-ink px-5 py-2.5 rounded-[3px] text-sm font-medium hover:border-ink transition-colors"
          >
            Compare with the photo version ↗
          </Link>
        </div>
      </div>

      <Features figure="model" />
    </>
  )
}
