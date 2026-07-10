'use client'
import AnimatedCounter from './AnimatedCounter'
import Icon from './Icon'

// Bento layout:
// Row 1: [20K+ Live Crowd — wide hero] [50+ DJ Gigs] [20+ Events]
// Row 2: [100+ Edits] [500+ Frames — wide hero] [30+ Dance]
// Row 3: [200+ Designs] [10+ AI Projects] [quote tile]

export default function StatsDashboard() {
  return (
    <section className="bento-stats-section">
      <div className="bento-stats-header">
        <p className="section-label fade-in--label">Life In Numbers</p>
        <h2 className="bento-stats-title fade-in">
          Every number tells<br /><em>a story.</em>
        </h2>
      </div>

      <div className="bento-grid">

        {/* ── HERO 1: 20K+ Live Crowd ── spans 2 cols */}
        <div className="bt bt--hero bt--crowd" style={{ '--c': '#f87171' } as React.CSSProperties}>
          <div className="bt-glow" />
          <div className="bt-shimmer" />
          <div className="bt-inner">
            <span className="bt-icon"><Icon name="crowd" size={28} /></span>
            <div className="bt-num">
              <AnimatedCounter to={20} suffix="K+" duration={2} />
            </div>
            <p className="bt-label">Live Crowd Peak</p>
            <p className="bt-sub">Largest single event audience</p>
          </div>
          <div className="bt-bg-text" aria-hidden="true">20K</div>
        </div>

        {/* ── 100+ DJ Gigs ── */}
        <div className="bt bt--md" style={{ '--c': '#818cf8' } as React.CSSProperties}>
          <div className="bt-glow" />
          <div className="bt-shimmer" />
          <div className="bt-inner">
            <span className="bt-icon"><Icon name="dj" size={22} /></span>
            <div className="bt-num">
              <AnimatedCounter to={100} suffix="+" duration={1.8} />
            </div>
            <p className="bt-label">DJ Gigs Played</p>
          </div>
        </div>

        {/* ── 200+ Events ── */}
        <div className="bt bt--md" style={{ '--c': '#a78bfa' } as React.CSSProperties}>
          <div className="bt-glow" />
          <div className="bt-shimmer" />
          <div className="bt-inner">
            <span className="bt-icon"><Icon name="events" size={22} /></span>
            <div className="bt-num">
              <AnimatedCounter to={200} suffix="+" duration={1.7} />
            </div>
            <p className="bt-label">Events Organised</p>
          </div>
        </div>

        {/* ── 300+ Edits ── */}
        <div className="bt bt--md" style={{ '--c': '#6ee7b7' } as React.CSSProperties}>
          <div className="bt-glow" />
          <div className="bt-shimmer" />
          <div className="bt-inner">
            <span className="bt-icon"><Icon name="editor" size={22} /></span>
            <div className="bt-num">
              <AnimatedCounter to={300} suffix="+" duration={1.9} />
            </div>
            <p className="bt-label">Edits Delivered</p>
          </div>
        </div>

        {/* ── HERO 2: 1000+ Frames ── spans 2 cols */}
        <div className="bt bt--hero bt--frames" style={{ '--c': '#fb923c' } as React.CSSProperties}>
          <div className="bt-glow" />
          <div className="bt-shimmer" />
          <div className="bt-inner">
            <span className="bt-icon"><Icon name="photographer" size={28} /></span>
            <div className="bt-num">
              <AnimatedCounter to={1000} suffix="+" duration={2.2} />
            </div>
            <p className="bt-label">Frames Captured</p>
            <p className="bt-sub">Every frame a room to walk back into</p>
          </div>
          <div className="bt-bg-text" aria-hidden="true">1K</div>
        </div>

        {/* ── 50+ Dance Shows ── */}
        <div className="bt bt--md" style={{ '--c': '#f0abfc' } as React.CSSProperties}>
          <div className="bt-glow" />
          <div className="bt-shimmer" />
          <div className="bt-inner">
            <span className="bt-icon"><Icon name="dancer" size={22} /></span>
            <div className="bt-num">
              <AnimatedCounter to={50} suffix="+" duration={1.7} />
            </div>
            <p className="bt-label">Dance Shows</p>
          </div>
        </div>

        {/* ── 600+ Designs ── */}
        <div className="bt bt--md" style={{ '--c': '#fcd34d' } as React.CSSProperties}>
          <div className="bt-glow" />
          <div className="bt-shimmer" />
          <div className="bt-inner">
            <span className="bt-icon"><Icon name="designer" size={22} /></span>
            <div className="bt-num">
              <AnimatedCounter to={600} suffix="+" duration={2} />
            </div>
            <p className="bt-label">Designs Created</p>
          </div>
        </div>

        {/* ── 20+ AI Projects ── */}
        <div className="bt bt--md" style={{ '--c': '#7dd3fc' } as React.CSSProperties}>
          <div className="bt-glow" />
          <div className="bt-shimmer" />
          <div className="bt-inner">
            <span className="bt-icon"><Icon name="ai" size={22} /></span>
            <div className="bt-num">
              <AnimatedCounter to={20} suffix="+" duration={1.6} />
            </div>
            <p className="bt-label">AI Projects</p>
          </div>
        </div>

        {/* ── Quote tile ── */}
        <div className="bt bt--quote">
          <div className="bt-inner">
            <span className="bt-quote-mark">&ldquo;</span>
            <p className="bt-quote-text">Eight crafts.<br />One direction.</p>
          </div>
        </div>

      </div>
    </section>
  )
}
