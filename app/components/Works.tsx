import Icon from './Icon'

const works = [
  {
    type: 'Event Production · Aurastic',
    tag: 'Featured',
    title: 'Lavaza 2025',
    meta: 'Vel Tech University · 3 Nights · 20,000+ Final Night',
    desc: 'Console DJ across all three nights on L-Acoustics, DiGiCo SD338, and GrandMA3. Performed immediately after Karthick Live to the largest crowd of his career.',
    icon: 'star',
    size: 'hero',
    color: '#a78bfa',
  },
  {
    type: 'On-Stage Appearance',
    tag: 'Live 2025',
    title: 'Veera Dheera Sooran Audio Launch',
    meta: 'Vikram · SJ Suryah · GV Prakash',
    desc: 'On-stage host at the VDS audio launch alongside some of Tamil cinema\'s biggest names.',
    icon: 'mic',
    size: 'md',
    color: '#818cf8',
  },
  {
    type: 'Event Production',
    tag: '2026',
    title: 'Anirudh Audio Launch + Lavaza 2026',
    meta: '2026 · Console DJ · Production Lead',
    desc: 'Console DJ and production lead in fully professional live environments at scale.',
    icon: 'music',
    size: 'md',
    color: '#c084fc',
  },
  {
    type: 'Brand & Design',
    tag: 'Identity',
    title: 'Aurastic Brand System',
    meta: 'Logo · Type · Digital · Stage',
    desc: 'Complete visual identity for Aurastic Productions — from logo and typography system to event creatives and stage branding.',
    icon: 'designer',
    size: 'sm',
    color: '#fcd34d',
  },
  {
    type: 'AI & Technology',
    tag: 'Build',
    title: 'AI-Powered Event Tools',
    meta: 'Aurastic AI · 2025–26',
    desc: 'Intelligent systems for automated event quotation, production planning, and client onboarding.',
    icon: 'ai',
    size: 'sm',
    color: '#7dd3fc',
  },
  {
    type: 'Film & Post',
    tag: 'Cinematic',
    title: 'Event Aftermovies',
    meta: 'Highlight · Candid · Cinematic',
    desc: 'Post-production that carries the emotional weight of every production forward in time.',
    icon: 'editor',
    size: 'sm',
    color: '#6ee7b7',
  },
]

export default function Works() {
  return (
    <section id="works">
      <div className="bento-header">
        <p className="section-label fade-in--label">Selected Works</p>
        <h2 className="section-title fade-in--blur">
          What I&apos;ve <em>Built.</em>
        </h2>
      </div>

      <div className="works-bento-new">
        {/* Hero tile — full width */}
        {works.filter(w => w.size === 'hero').map((w) => (
          <article
            key={w.title}
            className="work-card work-card--hero fade-in"
            style={{ '--wc': w.color, transitionDelay: '0.1s' } as React.CSSProperties}
          >
            <div className="work-card-glow" />
            <div className="work-card-shimmer" />
            <div className="work-card-body">
              <div className="work-card-top">
                <span className="work-card-type">{w.type}</span>
                <span className="work-card-tag">{w.tag}</span>
              </div>
              <div className="work-card-icon-wrap" aria-hidden="true">
                <Icon name={w.icon} size={22} />
              </div>
              <h3 className="work-card-title">{w.title}</h3>
              <p className="work-card-meta">{w.meta}</p>
              <p className="work-card-desc">{w.desc}</p>
            </div>
            <div className="work-card-accent-bar" style={{ background: w.color }} />
          </article>
        ))}

        {/* 2-col row */}
        <div className="works-row-2 stagger">
          {works.filter(w => w.size === 'md').map((w) => (
            <article
              key={w.title}
              className="work-card work-card--md fade-in--scale"
              style={{ '--wc': w.color } as React.CSSProperties}
            >
              <div className="work-card-glow" />
              <div className="work-card-shimmer" />
              <div className="work-card-top">
                <span className="work-card-type">{w.type}</span>
                <span className="work-card-tag">{w.tag}</span>
              </div>
              <div className="work-card-icon-wrap" aria-hidden="true">
                <Icon name={w.icon} size={22} />
              </div>
              <h3 className="work-card-title">{w.title}</h3>
              <p className="work-card-meta">{w.meta}</p>
              <p className="work-card-desc">{w.desc}</p>
              <div className="work-card-accent-bar" style={{ background: w.color }} />
            </article>
          ))}
        </div>

        {/* 3-col row */}
        <div className="works-row-3 stagger">
          {works.filter(w => w.size === 'sm').map((w) => (
            <article
              key={w.title}
              className="work-card work-card--sm fade-in--scale"
              style={{ '--wc': w.color } as React.CSSProperties}
            >
              <div className="work-card-glow" />
              <div className="work-card-shimmer" />
              <div className="work-card-top">
                <span className="work-card-type">{w.type}</span>
                <span className="work-card-tag">{w.tag}</span>
              </div>
              <div className="work-card-icon-wrap work-card-icon-wrap--sm" aria-hidden="true">
                <Icon name={w.icon} size={22} />
              </div>
              <h3 className="work-card-title">{w.title}</h3>
              <p className="work-card-meta">{w.meta}</p>
              <p className="work-card-desc">{w.desc}</p>
              <div className="work-card-accent-bar" style={{ background: w.color }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
