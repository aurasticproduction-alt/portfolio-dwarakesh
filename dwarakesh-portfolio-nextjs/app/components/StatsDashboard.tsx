import AnimatedCounter from './AnimatedCounter'
import Icon from './Icon'

const stats = [
  { to: 20,  suffix: '+',  label: 'Events Organised', icon: 'events',       color: '#a78bfa' },
  { to: 100,  suffix: '+',  label: 'DJ Gigs Played',   icon: 'dj',           color: '#818cf8' },
  { to: 50,  suffix: '+',  label: 'Dance Shows',       icon: 'dancer',       color: '#f0abfc' },
  { to: 20,  suffix: '+',  label: 'AI Projects',       icon: 'ai',           color: '#7dd3fc' },
  { to: 300, suffix: '+',  label: 'Edits Delivered',   icon: 'editor',       color: '#6ee7b7' },
  { to: 600, suffix: '+',  label: 'Designs Created',   icon: 'designer',     color: '#fcd34d' },
  { to: 1000, suffix: '+',  label: 'Frames Captured',   icon: 'photographer', color: '#fb923c' },
  { to: 20,  suffix: 'K+', label: 'Live Crowd Peak',   icon: 'crowd',        color: '#f87171' },
]

export default function StatsDashboard() {
  return (
    <section className="stats-section">
      <div className="stats-header">
        <p className="section-label fade-in--label">Life In Numbers</p>
        <h2 className="stats-title fade-in" style={{ transitionDelay: '0.1s' }}>
          Every number tells<br />
          <em>a story.</em>
        </h2>
      </div>

      <div className="stats-grid stagger">
        {stats.map((s, i) => (
          <div
            key={i}
            className="stat-card fade-in--scale"
            style={{ '--c': s.color } as React.CSSProperties}
          >
            {/* Layered glass background */}
            <div className="sc-bg" />

            {/* Colored glow */}
            <div className="sc-glow" />

            {/* Top gradient border */}
            <div className="sc-border-top" />

            {/* Icon */}
            <span className="sc-icon"><Icon name={s.icon} size={20} /></span>

            {/* Number */}
            <div className="sc-count">
              <AnimatedCounter to={s.to} suffix={s.suffix} duration={1.6 + i * 0.1} />
            </div>

            {/* Label */}
            <p className="sc-label">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
