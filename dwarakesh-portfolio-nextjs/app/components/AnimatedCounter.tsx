'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  to: number
  duration?: number
  suffix?: string
  prefix?: string
}

export default function AnimatedCounter({ to, duration = 1.8, suffix = '', prefix = '' }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const totalMs = duration * 1000

          const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / totalMs, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * to))
            if (progress < 1) requestAnimationFrame(tick)
            else setCount(to)
          }

          requestAnimationFrame(tick)
          obs.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [to, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}
