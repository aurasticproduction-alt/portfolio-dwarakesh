'use client'
import { useState } from 'react'

const DISCIPLINES = [
  {
    num: '01',
    title: 'Artistic Director',
    line: 'The architect of atmosphere and vision.',
    story:
      "I don't just run shows. I architect emotional arcs — from the first sound check to the final bow. Every lighting cue, every transition, every silence on stage is a deliberate choice that serves one unified feeling. The audience never sees the architecture. They only feel what it builds inside them.",
    accent: '#a78bfa',
    tag: 'Direction',
  },
  {
    num: '02',
    title: 'Event Organiser',
    line: 'Building living experiences from the ground up.',
    story:
      "Every event is a living organism. I build the skeleton, pulse the heartbeat, and set the atmosphere breathing. Aurastic Productions was born from the conviction that logistics and artistry are not separate disciplines — they are the same act of creation performed at two different scales.",
    accent: '#818cf8',
    tag: 'Production',
  },
  {
    num: '03',
    title: 'DJ DWARA',
    line: 'Where twenty thousand people become one body.',
    story:
      "Twenty thousand people. One night. One mix. The crowd becomes one body and the decks become the nervous system. I don't play music at people — I read the room, build pressure, find the peak, and release it at exactly the right second. Lavaza 2025 taught me what that responsibility feels like at full scale.",
    accent: '#c084fc',
    tag: 'Live Sets',
  },
  {
    num: '04',
    title: 'Dancer',
    line: 'Movement as the first honest language.',
    story:
      "Before I ever touched a mixing desk or directed a stage, my body was already speaking in frequencies. Dance was my first language — raw, physical, and impossible to fake. It taught me everything I know about timing, crowd energy, and what it means to be completely present in a moment.",
    accent: '#f0abfc',
    tag: 'Performance',
  },
  {
    num: '05',
    title: 'AI & ML',
    line: 'Engineering intelligence to amplify creativity.',
    story:
      "I build systems that think so I can focus on creating things that feel. Studying AI & ML at Vel Tech didn't pull me away from the arts — it gave me a new lens to understand them. Algorithms and artistic instinct are both about recognising patterns, predicting emotion, and making precise decisions under pressure.",
    accent: '#7dd3fc',
    tag: 'Technology',
  },
  {
    num: '06',
    title: 'Editor',
    line: 'The cut where time stops.',
    story:
      "The raw footage already holds the emotion. My job is to find the single frame where time stops — and hold it just long enough that the audience feels it before they understand it. Every aftermovie I cut carries the precise atmosphere of that night forward in time, permanently.",
    accent: '#6ee7b7',
    tag: 'Narrative',
  },
  {
    num: '07',
    title: 'Designer',
    line: 'Identities that are impossible to unsee.',
    story:
      "Every visual identity I create carries a signature: unmistakable, intentional, and impossible to unsee. Design is the silent language that speaks before any performer takes the stage, before any music plays. It sets the tone for everything that follows — and the audience never realises it's working on them.",
    accent: '#fcd34d',
    tag: 'Visual',
  },
  {
    num: '08',
    title: 'Photographer',
    line: 'The moment the atmosphere peaks.',
    story:
      "I wait for the precise second when the atmosphere peaks and the subject forgets the camera exists. That's the only shot worth taking — the one where the emotion is so complete it needs no caption. Every frame I keep is a room someone can walk back into.",
    accent: '#fb923c',
    tag: 'Frame',
  },
]

export default function CreativeDisciplines() {
  const [active, setActive] = useState<number>(0)

  return (
    <section className="cd-section" id="disciplines">
      {/* Section header */}
      <div className="cd-header">
        <p className="section-label fade-in--label">Creative Disciplines</p>
        <h2 className="section-title fade-in">
          Eight Worlds.<br /><em>One Creator.</em>
        </h2>
        <p className="cd-subtitle fade-in">
          Not a skills list. Not a résumé. A map of the creative identities<br />
          that belong to one person — and move through him simultaneously.
        </p>
      </div>

      {/* Two-panel layout */}
      <div className="cd-layout">

        {/* LEFT: discipline list */}
        <nav className="cd-list" aria-label="Creative Disciplines">
          {DISCIPLINES.map((d, i) => (
            <button
              key={d.num}
              className={`cd-item${active === i ? ' cd-item--active' : ''}`}
              style={{ '--cd-accent': d.accent } as React.CSSProperties}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-current={active === i ? 'true' : undefined}
            >
              {/* Active indicator bar */}
              <span className="cd-item-bar" aria-hidden="true" />

              <span className="cd-item-num">{d.num}</span>

              <div className="cd-item-body">
                <span className="cd-item-title">{d.title}</span>
                <span className="cd-item-line">{d.line}</span>
              </div>

              <span className="cd-item-tag">{d.tag}</span>
              <span className="cd-item-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </nav>

        {/* RIGHT: story panel */}
        <div
          className="cd-panel"
          style={{ '--cd-accent': DISCIPLINES[active].accent } as React.CSSProperties}
        >
          {/* Background glow orb */}
          <div className="cd-panel-orb" />

          {/* Shimmer top edge */}
          <div className="cd-panel-shimmer" />

          {/* Content — key forces remount → CSS entry animation plays */}
          <div className="cd-panel-inner" key={active}>
            <div className="cd-panel-eyebrow">
              <span className="cd-panel-num">{DISCIPLINES[active].num}</span>
              <span className="cd-panel-tag">{DISCIPLINES[active].tag}</span>
            </div>

            <h3 className="cd-panel-title">{DISCIPLINES[active].title}</h3>
            <p className="cd-panel-line">{DISCIPLINES[active].line}</p>

            <div className="cd-panel-rule" />

            <p className="cd-panel-story">{DISCIPLINES[active].story}</p>

            {/* Progress dots */}
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

          {/* Watermark number */}
          <div className="cd-panel-bg-num" aria-hidden="true">
            {DISCIPLINES[active].num}
          </div>
        </div>

      </div>
    </section>
  )
}
