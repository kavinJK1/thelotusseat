/*
 * Devotional line-motifs, drawn on currentColor so a parent can tint them white on
 * the deep-sky sections and indigo on the pale ones. Purely decorative — every use
 * is aria-hidden.
 */

const PETALS = Array.from({ length: 16 }, (_, i) => i * 22.5)
const INNER = Array.from({ length: 8 }, (_, i) => i * 45)

/** An om-in-lotus mandala — the emblem in the reference decks' corners. */
export function OmMandala({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-hidden focusable="false"
      fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="100" cy="100" r="94" opacity="0.5" />
      <circle cx="100" cy="100" r="86" strokeDasharray="1 5" opacity="0.7" />
      {PETALS.map((deg) => (
        <path key={deg} transform={`rotate(${deg} 100 100)`}
          d="M100,100 C88,66 88,44 100,20 C112,44 112,66 100,100 Z" opacity="0.55" />
      ))}
      <circle cx="100" cy="100" r="58" opacity="0.6" />
      {INNER.map((deg) => (
        <path key={deg} transform={`rotate(${deg} 100 100)`}
          d="M100,100 C93,78 93,64 100,50 C107,64 107,78 100,100 Z" opacity="0.7" />
      ))}
      <circle cx="100" cy="100" r="34" opacity="0.8" />
      <text x="100" y="114" textAnchor="middle" fontSize="40" fill="currentColor" stroke="none"
        style={{ fontFamily: '"Noto Sans Devanagari", "Kohinoor Devanagari", system-ui, sans-serif' }}>
        ॐ
      </text>
    </svg>
  )
}

/** A small eight-petal lotus — the little mark at the foot of each reference slide. */
export function LotusMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-hidden focusable="false"
      fill="currentColor" opacity="0.75">
      {Array.from({ length: 8 }, (_, i) => i * 45).map((deg) => (
        <ellipse key={deg} cx="50" cy="30" rx="7" ry="18" transform={`rotate(${deg} 50 50)`} opacity="0.7" />
      ))}
      <circle cx="50" cy="50" r="6" />
    </svg>
  )
}
