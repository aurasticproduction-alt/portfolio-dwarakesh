import HeroCanvas from './HeroCanvas'
import DisciplineTags from './DisciplineTags'

export default function Hero() {
  return (
    <section className="hero" id="top">

      {/* ── Cinematic canvas background ── */}
      <HeroCanvas />

      {/* Vertical side text */}
      <div className="hero-vert" aria-hidden="true">Aurastic Productions — Est. 2025</div>

      <div className="hero-inner">

        {/* TOP: eyebrow */}
        <div className="hero-top">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Multi-Disciplinary Artist
            <span className="hero-eyebrow-sep">·</span>
            Chennai, South India
          </p>
        </div>

        {/* MID: name + meta */}
        <div className="hero-mid">
          <div className="hero-mid-content">
            <h1 className="hero-name">Dwarakesh</h1>
            <div className="hero-rule" />
            <div className="hero-meta-row">
              <div className="hero-meta-left">
                <p className="hero-meta-role">Founder &amp; Artistic Director</p>
                <p className="hero-meta-company">Aurastic Productions</p>
                <DisciplineTags />
              </div>
              <div className="hero-meta-right">
                <p className="hero-tagline">
                  &ldquo;Every identity is a lens.<br />
                  I use them all.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: CTAs + pills */}
        <div className="hero-bottom">
          <div className="hero-cta-row">
            <a href="#works" className="btn-primary">Explore My Work</a>
            <a href="#about" className="btn-glass">My Story</a>
          </div>
          <div className="hero-pills">
            {[
              { num: '20K+', label: 'Live Crowd'  },
              { num: '8',    label: 'Disciplines' },
              { num: '200+',  label: 'Events'      },
            ].map((p) => (
              <div key={p.label} className="hero-pill">
                <span className="hp-num">{p.num}</span>
                <span className="hp-label">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="hero-scroll" aria-hidden="true">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
