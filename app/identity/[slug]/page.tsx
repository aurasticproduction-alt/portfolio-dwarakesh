import { notFound } from 'next/navigation'
import Link from 'next/link'
import { identityData } from '../../components/Identities'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return identityData.map((i) => ({ slug: i.slug }))
}

const detailContent: Record<string, { long: string; skills: string[]; quote: string }> = {
  'artistic-director': {
    long: 'As Artistic Director, Dwarakesh conceives the complete emotional arc of every production — from the opening visual to the closing beat. Every lighting cue, stage transition, costume decision, and audio swell is part of one choreographed intent. This role sits at the intersection of all eight disciplines: it draws on editing instincts for pacing, design thinking for aesthetics, DJ sensibility for crowd energy, and AI systems for execution efficiency.',
    skills: ['Concept Development', 'Production Design', 'Creative Direction', 'Stage Blocking', 'Lighting Design', 'Artist Management', 'Mood Architecture'],
    quote: 'The best artistic direction is invisible. The audience only feels the result.',
  },
  'event-organiser': {
    long: 'Founder of Aurastic Productions (est. 15 Oct 2025), Dwarakesh has end-to-end produced major institutional cultural events including Lavaza 2024, 2025, and 2026. Event organisation at Aurastic means owning every moving part — vendor coordination, sound & lighting deployment, stage management, artist hospitality, timeline execution, and real-time troubleshooting under pressure.',
    skills: ['End-to-End Production', 'Vendor Management', 'Sound System Deployment', 'L-Acoustics · DiGiCo · GrandMA3', 'Artist Coordination', 'Budget Planning', 'On-Ground Execution'],
    quote: 'The schedule is for the team. The experience is for the crowd.',
  },
  'dj-dwara': {
    long: 'DJ Dwara is the live performance persona of Dwarakesh — built across years of campus events, college proshows, and large-format festival stages. Performing at Lavaza 2025 in front of 20,000+ people immediately after Karthick Live was the defining moment of this identity. Every set is a live composition — built on crowd reading, energy management, and the ability to hold a room.',
    skills: ['Live DJ Sets', 'Crowd Reading', 'Set Programming', 'Festival Stage Performance', 'Console Operation', 'Energy Architecture', 'Transition Design'],
    quote: 'A great set doesn\'t just play music. It writes a room\'s collective memory.',
  },
  'dancer': {
    long: 'Dance was Dwarakesh\'s first creative language — long before editing, DJing, or production. Trained in multiple styles and active on competitive cultural stages since school, dance is where he first felt the invisible conversation between performer and audience. That instinct now lives inside every event he directs and every set he plays.',
    skills: ['Classical & Contemporary Styles', 'Choreography', 'Stage Performance', 'Cultural Competitions', 'Movement Direction', 'Performer-Audience Energy'],
    quote: 'Every other discipline I practice is just dance in a different costume.',
  },
  'ai-ml': {
    long: 'Currently pursuing B.Tech in Artificial Intelligence & Machine Learning at Vel Tech University, Dwarakesh brings a systems thinker\'s mind to creative production. He is actively developing AI-powered tools for Aurastic — including automated event quotation engines, production planning assistants, and client onboarding systems that reduce friction between idea and execution.',
    skills: ['Machine Learning', 'Python · TensorFlow', 'AI Product Development', 'Automated Workflow Systems', 'Event Intelligence Tools', 'Data-Driven Production Planning'],
    quote: 'Technology should remove the friction between creative intent and real-world execution.',
  },
  'editor': {
    long: 'Self-taught since age 15 across Adobe Premiere, After Effects, Audition, and DaVinci Resolve, Dwarakesh edits with a performer\'s instinct for timing and rhythm. His editorial work spans event aftermovies, highlight reels, proshow teasers, and cinematic recaps — all cut to carry the emotional weight of the live experience forward.',
    skills: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Adobe Audition', 'Aftermovie Production', 'Highlight Reels', 'Pacing & Rhythm Editing'],
    quote: 'Editing is not cutting footage. It\'s sculpting time.',
  },
  'designer': {
    long: 'From the complete Aurastic Productions brand identity to stage visuals, LED wall content, event creatives, and digital assets — Dwarakesh designs with intent. Every visual decision is a creative argument for the emotion the event is meant to produce. The design work spans print, digital, stage, and motion.',
    skills: ['Brand Identity', 'Adobe Photoshop · Illustrator', 'Stage Visual Design', 'LED Wall Content', 'Event Creatives', 'Typography Systems', 'Motion Graphics'],
    quote: 'Good design doesn\'t decorate. It argues.',
  },
  'photographer': {
    long: 'Photography for Dwarakesh is an extension of his performer\'s eye — knowing exactly when the decisive moment arrives because he\'s been on the other side of the lens. His work is candid, cinematic, and emotionally honest. He shoots events, performers, behind-the-scenes production, and portraiture across South India.',
    skills: ['Event Photography', 'Candid & Documentary', 'Adobe Lightroom', 'Cinematic Framing', 'Portrait Photography', 'Behind-the-Scenes', 'Post Processing'],
    quote: 'A great photograph holds the atmosphere of an entire night in a single frame.',
  },
}

export default async function IdentityPage({ params }: Props) {
  const { slug } = await params
  const identity = identityData.find((i) => i.slug === slug)
  if (!identity) notFound()

  const detail = detailContent[slug]
  const currentIndex = identityData.findIndex((i) => i.slug === slug)
  const prev = identityData[currentIndex - 1]
  const next = identityData[currentIndex + 1]

  return (
    <div className="identity-page">
      {/* Background glows */}
      <div className="identity-page-glow" style={{ '--card-color': identity.color } as React.CSSProperties} />
      <div className="identity-page-glow-2" />

      {/* Back nav */}
      <nav className="identity-page-nav">
        <Link href="/#identities" className="identity-back-btn">
          ← All Identities
        </Link>
        <span className="identity-page-num">{identity.num} / 08</span>
      </nav>

      <main className="identity-page-main">
        {/* Hero block */}
        <div className="identity-hero-block fade-in">
          <span className="identity-page-icon">{identity.emoji}</span>
          <p className="identity-page-label">{identity.sub}</p>
          <h1 className="identity-page-title">{identity.title}</h1>
        </div>

        {/* Content grid */}
        <div className="identity-content-grid">
          {/* Long description */}
          <div className="identity-body-card fade-in">
            <p className="identity-page-label">Overview</p>
            <p className="identity-long-text">{detail.long}</p>
            <blockquote className="identity-quote">
              &ldquo;{detail.quote}&rdquo;
            </blockquote>
          </div>

          {/* Skills */}
          <div className="identity-skills-card fade-in">
            <p className="identity-page-label">Skills &amp; Tools</p>
            <ul className="identity-skills-list">
              {detail.skills.map((s) => (
                <li key={s} className="identity-skill-item">
                  <span className="identity-skill-dot" style={{ background: identity.color }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="identity-sibling-nav fade-in">
          {prev ? (
            <Link href={`/identity/${prev.slug}`} className="identity-sibling-btn">
              <span className="isb-dir">← Previous</span>
              <span className="isb-name">{prev.emoji} {prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/identity/${next.slug}`} className="identity-sibling-btn identity-sibling-btn--right">
              <span className="isb-dir">Next →</span>
              <span className="isb-name">{next.emoji} {next.title}</span>
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  )
}
