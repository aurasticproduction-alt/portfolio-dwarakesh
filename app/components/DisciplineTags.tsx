'use client'
import { useRef, useState } from 'react'

const DISCIPLINES = [
  { label: 'Artistic Director', micro: 'Shaping visions into reality' },
  { label: 'Event Organiser',   micro: 'Building atmospheres that breathe' },
  { label: 'DJ Dwara',          micro: 'Moving crowds through sound' },
  { label: 'Dancer',            micro: 'Speaking what words cannot' },
  { label: 'AI & ML',           micro: 'Coding the edge of tomorrow' },
  { label: 'Editor',            micro: 'Crafting the narrative arc' },
  { label: 'Designer',          micro: 'Designing unmissable identities' },
  { label: 'Photographer',      micro: 'Capturing the soul of a moment' },
]

function DisciplinePill({
  label,
  micro,
  index,
}: {
  label: string
  micro: string
  index: number
}) {
  const pillRef = useRef<HTMLSpanElement>(null)
  const [hovered, setHovered] = useState(false)
  const [magnet, setMagnet] = useState({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = pillRef.current
    if (!el) return
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = ((e.clientX - cx) / rect.width) * 7
      const dy = ((e.clientY - cy) / rect.height) * 7
      setMagnet({ x: dx, y: dy })
    })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setMagnet({ x: 0, y: 0 })
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
  }

  return (
    <span
      ref={pillRef}
      className={`hero-disc-pill${hovered ? ' hero-disc-pill--active' : ''}`}
      style={{
        transform: `translate(${magnet.x}px, ${magnet.y}px)`,
        animationDelay: `${index * 0.09}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className="hero-disc-pill__label">{label}</span>
      <span className="hero-disc-pill__micro" aria-hidden="true">{micro}</span>
    </span>
  )
}

export default function DisciplineTags() {
  return (
    <div className="hero-disc-row">
      {DISCIPLINES.map((d, i) => (
        <DisciplinePill key={d.label} label={d.label} micro={d.micro} index={i} />
      ))}
    </div>
  )
}
