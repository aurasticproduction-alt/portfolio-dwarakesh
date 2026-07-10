const steps = [
  {
    num: '01',
    era: 'School',
    tag: 'Stage & Screen',
    title: 'Where It All Began',
    body: 'Dancer, choreographer, and self-taught editor — discovering the electric energy between a performer and a crowd on school stages.',
    detail: 'Dance · Choreography · Cultural Competitions · Video Editing · Photography',
  },
  {
    num: '02',
    era: 'Age 15',
    tag: 'Editor',
    title: 'Self-Taught Creator',
    body: 'Self-taught in photography, video editing, and audio mixing. Adobe Suite, Filmora, Audition — building a technical vocabulary before he had a name for it.',
    detail: 'Adobe Premiere · After Effects · Filmora · Adobe Audition · Lightroom',
  },
  {
    num: '03',
    era: '2023',
    tag: 'Disc Jockey',
    title: 'Two Tracks, One Life',
    body: 'Bought his own gear, played every campus event at Vel Tech. Two tracks of one life — music and technology — braiding into one craft.',
    detail: 'DJ Training · Campus Events · Vel Tech University · AI & ML B.Tech',
  },
  {
    num: '04',
    era: '2024',
    tag: 'Lavaza 2024',
    title: 'Production Scale',
    body: 'Core production team across three concert nights — Thaman, Ram Miriyala, DJ Gautham. First exposure to the precision required behind large-scale live experiences.',
    detail: 'Stage Coordination · Artist Management · Sound · Lighting · Production Planning',
  },
  {
    num: '05',
    era: '2025',
    tag: 'Lavaza 2025 · VDS',
    title: 'The Defining Moment',
    body: 'On-stage host at the Veera Dheera Sooran audio launch alongside Vikram, SJ Suryah, and GV Prakash. Console DJ as DJ Dwara — Karthick Live, then 20,000+ crowd on final night.',
    detail: 'L-Acoustics · DiGiCo SD338 · GrandMA3 · 20,000+ Crowd · Karthick Live',
    highlight: true,
  },
  {
    num: '06',
    era: '15 Oct 2025',
    tag: 'Aurastic Launches',
    title: 'Born on the Founder\'s Birthday',
    body: 'Every skill from a decade of learning — unified under one banner, one aura. Aurastic Productions officially launched. The vision became a company.',
    detail: 'Aurastic Productions · Event Production · Creative Direction · Brand Identity',
    highlight: true,
  },
  {
    num: '07',
    era: '2026',
    tag: 'Lavaza 2026 · Anirudh',
    title: 'Professional Scale',
    body: 'Console DJ and production lead at Lavaza 2026 and the Anirudh audio launch. Continued building in fully professional live environments at scale.',
    detail: 'Lavaza 2026 · Anirudh Audio Launch · Console DJ · Production Lead',
  },
]

export default function Journey() {
  return (
    <section className="journey-section" id="journey">
      <div className="section-label fade-in--label">The Journey</div>
      <h2 className="section-title fade-in">
        One Decade.
        <br />
        <em style={{ fontStyle: 'italic', color: 'var(--accent2)' }}>Seven Chapters.</em>
      </h2>

      <div className="journey-list">
        {steps.map((step, i) => (
          <div
            key={step.num}
            className={`journey-item fade-in${step.highlight ? ' journey-item--highlight' : ''}`}
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            {/* Left: number + era */}
            <div className="ji-left">
              <span className="ji-num">{step.num}</span>
              <span className="ji-era">{step.era}</span>
            </div>

            {/* Centre: content */}
            <div className="ji-body">
              <div className="ji-tag">{step.tag}</div>
              <h3 className="ji-title">{step.title}</h3>
              <p className="ji-text">{step.body}</p>
              <p className="ji-detail">{step.detail}</p>
            </div>

            {/* Right: connector dot */}
            <div className="ji-dot" aria-hidden="true">
              <div className="ji-dot-inner" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
