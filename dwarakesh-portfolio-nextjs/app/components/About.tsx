export default function About() {
  return (
    <section id="about">
      <div className="section-label fade-in--label">About</div>

      <div className="about-grid">
        {/* ── Left: sticky portrait ── */}
        <div className="about-left fade-in--left">
          <div className="about-photo-frame">
            <div className="about-photo-name">
              <span className="apn-main">Dwarakesh</span>
            </div>
            <div className="about-photo-role">Founder &amp; Artistic Director</div>
          </div>
          <p className="photo-caption">Dwarakesh · Founder, Aurastic Productions</p>

          {/* Role chips below photo */}
          <div className="about-roles">
            {[
              'Artistic Director',
              'Event Organiser',
              'DJ Dwara',
              'Dancer',
              'AI & ML',
              'Editor',
              'Designer',
              'Photographer',
            ].map((r) => (
              <span key={r} className="about-role-tag">{r}</span>
            ))}
          </div>
        </div>

        {/* ── Right: biography ── */}
        <div className="about-body fade-in--right" style={{ transitionDelay: '0.12s' }}>
          <h2 className="section-title">
            The Story Behind
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent2)' }}>Every Identity.</em>
          </h2>

          <p>
            The story began on <span>school stages</span> — through dance, choreography, cultural
            competitions, and live performances — where Dwarakesh first discovered the energy that
            exists between a performer and a crowd. Dance was never just an extracurricular
            activity. It was the first time he experienced how rhythm, timing, movement, and
            atmosphere could completely shift the emotion inside a room.
          </p>

          <p>
            While performing, his attention slowly moved beyond the stage itself toward the
            invisible elements shaping the feeling around it — lighting, visuals, music,
            transitions, and audience reactions. That curiosity led him into{' '}
            <span>editing, visual storytelling, creative design, and event-related media</span>{' '}
            during school. Over time, none of it felt like separate skills. Visuals, music,
            movement, timing, stage flow, and audience energy all began feeling like different
            expressions of the same emotion.
          </p>

          <p>
            At <span>Vel Tech University</span> — pursuing a B.Tech in AI &amp; ML — another side
            of his thinking began to grow. Technology introduced him to systems, workflows, and
            structured problem-solving, while college culturals pulled him deeper into live events.
            In his first year he began training as a DJ, carrying forward a dream held since
            school. By his second year he was performing across campus events while simultaneously
            handling stage coordination, production planning, creative direction, artist
            management, and backstage execution. He became one of the unofficial creative forces
            behind major cultural events inside the university.
          </p>

          <p>
            That understanding deepened through <span>Lavaza 2024</span>, the{' '}
            <span>Veera Dheera Sooran audio launch</span> (on stage alongside Vikram, SJ Suryah,
            GV Prakash), <span>Lavaza 2025</span>, the{' '}
            <span>Anirudh audio launch in 2026</span>, and <span>Lavaza 2026</span>. Working
            alongside major artists exposed him to the pressure, discipline, and synchronization
            required behind large-scale live experiences — how backstage precision creates
            front-stage magic.
          </p>

          <p>
            <span>Lavaza 2025</span> became the defining turning point. Performing as DJ Dwara
            across all three nights on L-Acoustics, DiGiCo SD338, and GrandMA3, he played in
            front of more than{' '}
            <span>twenty thousand people on the final night</span> — immediately after Karthick
            Live. That moment permanently changed the scale of his vision.
          </p>

          <p>
            One realisation became impossible to ignore: dance, visuals, editing, DJing, stage
            flow, production, technology, creative direction, and crowd psychology were never
            separate worlds. They were all connected by one invisible purpose —{' '}
            <span>creating human feeling</span>. That realisation became{' '}
            <span>Aurastic Productions</span>, officially launched on 15 October 2025.
          </p>

          <blockquote className="about-quote">
            &ldquo;People may forget the schedule, the stage, or the equipment — but they never
            forget how an experience made them feel. Leadership at Aurastic is defined by
            presence, not distance.&rdquo;
          </blockquote>

          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-num">8</span>
              <span className="stat-label">Artistic Identities</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">20K+</span>
              <span className="stat-label">Crowd · Lavaza 2025</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">2025</span>
              <span className="stat-label">Aurastic Founded</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
