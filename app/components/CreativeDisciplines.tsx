'use client'
import { useState } from 'react'
import Icon from './Icon'

const BUCKET = 'https://wwyzktxyczlfkrieeerk.supabase.co/storage/v1/object/public/gallery'

const DISCIPLINES = [
  {
    num: '01', bg: 'AD', icon: 'director',
    title: 'Artistic Director',
    line: 'The architect of atmosphere and vision.',
    story: "I don't just run shows. I architect emotional arcs — from the first sound check to the final bow. Every lighting cue, every transition, every silence on stage is a deliberate choice that serves one unified feeling. The audience never sees the architecture. They only feel what it builds inside them.",
    accent: '#a78bfa', tag: 'Direction',
    image: `${BUCKET}/artistic director.jpeg`,
  },
  {
    num: '02', bg: 'EO', icon: 'events',
    title: 'Event Organiser',
    line: 'Building living experiences from the ground up.',
    story: "Every event is a living organism. I build the skeleton, pulse the heartbeat, and set the atmosphere breathing. Aurastic Productions was born from the conviction that logistics and artistry are not separate disciplines — they are the same act of creation performed at two different scales.",
    accent: '#818cf8', tag: 'Production',
    image: `${BUCKET}/event organizer.jpg`,
  },
  {
    num: '03', bg: 'DJ', icon: 'dj',
    title: 'DJ DWARA',
    line: 'Where twenty thousand people become one body.',
    story: "Twenty thousand people. One night. One mix. The crowd becomes one body and the decks become the nervous system. I don't play music at people — I read the room, build pressure, find the peak, and release it at exactly the right second.",
    accent: '#c084fc', tag: 'Live Sets',
    image: `${BUCKET}/dj%20.jpg`,
  },
  {
    num: '04', bg: 'DA', icon: 'dancer',
    title: 'Dancer',
    line: 'Movement as the first honest language.',
    story: "Before I ever touched a mixing desk or directed a stage, my body was already speaking in frequencies. Dance was my first language — raw, physical, and impossible to fake. It taught me everything I know about timing, crowd energy, and what it means to be completely present in a moment.",
    accent: '#f0abfc', tag: 'Performance',
    image: `${BUCKET}/dancer.jpeg`,
  },
  {
    num: '05', bg: 'AI', icon: 'ai',
    title: 'AI & ML',
    line: 'Engineering intelligence to amplify creativity.',
    story: "I build systems that think so I can focus on creating things that feel. Studying AI & ML at Vel Tech didn't pull me away from the arts — it gave me a new lens to understand them. Algorithms and artistic instinct are both about recognising patterns, predicting emotion, and making precise decisions under pressure.",
    accent: '#7dd3fc', tag: 'Technology',
    image: `${BUCKET}/aiml.jpeg`,
  },
  {
    num: '06', bg: 'ED', icon: 'editor',
    title: 'Editor',
    line: 'The cut where time stops.',
    story: "The raw footage already holds the emotion. My job is to find the single frame where time stops — and hold it just long enough that the audience feels it before they understand it. Every aftermovie I cut carries the precise atmosphere of that night forward in time, permanently.",
    accent: '#6ee7b7', tag: 'Narrative',
    image: `${BUCKET}/editor.jpeg?v=2`,
  },
  {
    num: '07', bg: 'DS', icon: 'designer',
    title: 'Designer',
    line: 'Identities that are impossible to unsee.',
    story: "Every visual identity I create carries a signature: unmistakable, intentional, and impossible to unsee. Design is the silent language that speaks before any performer takes the stage, before any music plays. It sets the tone for everything that follows — and the audience never realises it's working on them.",
    accent: '#fcd34d', tag: 'Visual',
    image: `${BUCKET}/designer.jpeg`,
  },
  {
    num: '08', bg: 'PH', icon: 'photographer',
    title: 'Photographer',
    line: 'The moment the atmosphere peaks.',
    story: "I wait for the precise second when the atmosphere peaks and the subject forgets the camera exists. That's the only shot worth taking — the one where the emotion is so complete it needs no caption. Every frame I keep is a room someone can walk back into.",
    accent: '#fb923c', tag: 'Frame',
    image: `${BUCKET}/photographer.jpg`,
  },
]

export default function CreativeDisciplines() {
  const [active, setActive] = useState<number>(0)
  const d = DISCIPLINES[active]

  return (
    <section className="cd-section" id="disciplines">
      {/* Section header */}
      <div className="cd-header">
        <p className="section-label fade-in--label">Creative Disciplines</p>
        <h2 className="section-title fade-in">
          Eight Artistry.<br /><em>One Artist.</em>
        </h2>
        <p className="cd-subtitle fade-in">
          Not a skills list. Not a resume. A map of the creative identities<br />
          that belong to one person — and move through him simultaneously.
        </p>
      </div>

      {/* Two-panel layout */}
      <div className="cd-layout">

        {/* LEFT: discipline list */}
        <nav className="cd-list" aria-label="Creative Disciplines">
          {DISCIPLINES.map((item, i) => (
            <button
              key={item.num}
              className={`cd-item${active === i ? ' cd-item--active' : ''}`}
              style={{ '--cd-accent': item.accent } as React.CSSProperties}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-current={active === i ? 'true' : undefined}
            >
              <span className="cd-item-bar" aria-hidden="true" />
              <div className="cd-item-body">
                <span className="cd-item-title">{item.title}</span>
                <span className="cd-item-line">{item.line}</span>
              </div>
              <span className="cd-item-tag">{item.tag}</span>
              <span className="cd-item-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </nav>

        {/* RIGHT: story panel */}
        <div className="cd-panel" style={{ '--cd-accent': d.accent } as React.CSSProperties}>
          <div className="cd-panel-orb" />
          <div className="cd-panel-shimmer" />

          <div className="cd-panel-inner" key={active}>

            {/* Top row: tag badge left, icon right */}
            <div className="cd-panel-toprow">
              <span className="cd-panel-tag">{d.tag}</span>
              <span className="cd-panel-icon-box">
                <Icon name={d.icon} size={20} />
              </span>
            </div>

            {/* Two-column body */}
            <div className="cd-panel-body">

              {/* Left 55% */}
              <div className="cd-panel-left">
                <h3 className="cd-panel-title">{d.title}</h3>
                <p className="cd-panel-line">{d.line}</p>
                <div className="cd-panel-rule" />
                <p className="cd-panel-story">{d.story}</p>

                {/* Spacer that holds the initials zone */}
                <div className="cd-initials-zone">
                  <span className="cd-panel-bg-initials" aria-hidden="true">{d.bg}</span>
                </div>

                {/* Pagination dots */}
                <div className="cd-dots" aria-hidden="true">
                  {DISCIPLINES.map((_, i) => (
                    <button
                      key={i}
                      className={`cd-dot${active === i ? ' cd-dot--on' : ''}`}
                      onClick={() => setActive(i)}
                      tabIndex={-1}
                    />
                  ))}
                </div>
              </div>

              {/* Right 45% — image (outside key so it transitions cleanly) */}
              <div className="cd-panel-right">
                <div className="cd-panel-img-placeholder">
                  {d.image
                    ? /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        key={active}
                        src={d.image}
                        alt={d.title}
                        className="cd-panel-photo"
                        onError={(e) => {
                          // stop retry loop — show nothing on error
                          (e.currentTarget as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    : <div className="cd-panel-photo-fallback">
                        <svg width={32} height={32} viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth={1} strokeLinecap="round">
                          <rect x={3} y={3} width={18} height={18} rx={3} />
                          <circle cx={8.5} cy={8.5} r={1.5} />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                        <span>Photo coming soon</span>
                      </div>
                  }
                </div>
              </div>

            </div>{/* end cd-panel-body */}

          </div>{/* end cd-panel-inner */}
        </div>

      </div>
    </section>
  )
}
