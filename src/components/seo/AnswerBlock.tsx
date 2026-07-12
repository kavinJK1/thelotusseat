/**
 * The direct-answer block that opens every editorial page.
 *
 * This exists for extraction, not decoration. A model summarising the page — or
 * Google building a featured snippet — reaches for the first self-contained
 * passage that answers the query outright. So this paragraph never says "as we
 * discussed above" or "our seat": it names the subject, gives the numbers, and
 * survives being lifted out of the page with zero surrounding context.
 *
 * `data-answer` is what the Article schema's `speakable` selector points at.
 */
export default function AnswerBlock({ children }: { children: React.ReactNode }) {
  return (
    <div data-answer className="reg-frame border border-line bg-surface/60 px-6 py-6 max-w-2xl">
      <p className="mono-label text-[0.62rem] mb-3 flex items-center gap-2">
        <span className="text-cork-deep">SHORT ANSWER</span>
        <span className="w-6 h-px bg-line-strong" />
      </p>
      <p className="text-ink text-[1.06rem] leading-relaxed">{children}</p>
    </div>
  )
}
