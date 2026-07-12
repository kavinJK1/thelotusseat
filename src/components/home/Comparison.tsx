import PostureProof from '@/components/showcase/PostureProof'

/**
 * The scroll showcase already makes this argument — but it makes it 300vh deep,
 * where a visitor who is skimming never arrives. This is the same measured plate,
 * both end states side by side, stated once and early.
 *
 * Every row below is a claim the rest of the page already earns: the angles and the
 * head offset come from the same sagittal geometry the plate is drawn from, so this
 * table and that drawing cannot disagree.
 */
const ROWS: ReadonlyArray<{ metric: string; zafu: string; seat: string }> = [
  { metric: 'Pelvis', zafu: 'Rolls back, −14°', seat: 'Rotated forward, +8°' },
  { metric: 'Lumbar spine', zafu: 'Collapses into a C-curve', seat: 'Segments stack, neutral' },
  { metric: 'Head carriage', zafu: '55 mm ahead of the sacrum', seat: 'Over the sacrum' },
  { metric: 'Tailbone', zafu: 'Bears contact pressure', seat: 'Lifted clear by the relief channel' },
  { metric: 'Holding it up', zafu: 'Your back does the work', seat: 'The wedge does the work' },
]

export default function Comparison() {
  return (
    <section className="py-20 md:py-28 bg-paper border-y border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <p className="mono-label text-[0.66rem] mb-5 flex items-center gap-2">
          <span className="text-cork-deep">FIG. 01</span>
          <span className="w-6 h-px bg-line-strong" />
          FLAT ZAFU vs THE LOTUS SEAT
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.9rem,4vw,3rem)] max-w-lg">
            The same spine, on two cushions.
          </h2>
          <p className="text-ink-soft text-sm max-w-xs leading-relaxed">
            Both drawn from the same sagittal section. The only thing that changes between
            them is what the pelvis is sitting on.
          </p>
        </div>

        {/* The two end states, stated plainly rather than animated. */}
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {[
            { t: 0, cap: 'ON A FLAT ZAFU', fig: 'A' },
            { t: 1, cap: 'ON THE LOTUS SEAT', fig: 'B' },
          ].map((s) => (
            <figure key={s.cap} className="reg-frame border border-line bg-surface/60">
              <figcaption className="flex items-center justify-between border-b border-line px-3 py-2">
                <span className="mono-label text-[0.62rem]">{s.cap}</span>
                <span className="mono-label text-[0.62rem] text-cork-deep">FIG. 01{s.fig}</span>
              </figcaption>
              <div className="p-3 aspect-[435/375]">
                <PostureProof staticT={s.t} />
              </div>
            </figure>
          ))}
        </div>

        {/* The same comparison as a table, for anyone who reads rather than looks. */}
        <div className="mt-10 border-t border-line">
          {ROWS.map((r) => (
            <div
              key={r.metric}
              className="grid grid-cols-1 sm:grid-cols-[11rem_1fr_1fr] gap-x-8 gap-y-1 py-5 border-b border-line"
            >
              <h3 className="mono-label text-[0.66rem] text-ink sm:pt-0.5">{r.metric}</h3>
              <p className="text-ink-soft text-[0.95rem] leading-relaxed">{r.zafu}</p>
              <p className="text-ink text-[0.95rem] leading-relaxed font-medium">{r.seat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
