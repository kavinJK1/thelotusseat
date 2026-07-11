'use client'

import { useEffect, useRef } from 'react'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const ENTER = 'cubic-bezier(0.22,1,0.36,1)'

/**
 * Reveal-on-enter that enhances an already-visible default.
 *
 * The element ships visible in the markup and is only *hidden* once JS has run,
 * so a headless render, a failed hydration, or a disabled-JS client still gets the
 * content — the reveal can never strand a section blank.
 *
 * The hide/reveal is written straight to the node rather than held in state: this
 * is a one-way animation on an external system, and routing it through setState
 * would cascade a render through every wrapped section on mount.
 */
export default function FadeIn({ children, className = '', delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const t = `640ms ${ENTER} ${delay}ms`
    el.style.transition = `opacity ${t}, transform ${t}, filter 640ms ease ${delay}ms`
    el.style.willChange = 'opacity, transform'
    el.style.opacity = '0'
    el.style.transform = 'translateY(14px)'
    el.style.filter = 'blur(4px)'

    const reveal = () => {
      el.style.opacity = '1'
      el.style.transform = 'none'
      el.style.filter = 'none'
      el.style.willChange = ''
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        reveal()
        observer.disconnect()
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
