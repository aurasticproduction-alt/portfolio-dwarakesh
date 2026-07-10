const principles = [
  { num: '001', text: 'Atmosphere before', emphasis: 'everything', rest: ' else.', tag: 'Direction' },
  { num: '002', text: 'Technology should ', emphasis: 'feel', rest: ', not just function.', tag: 'AI & Design' },
  { num: '003', text: 'Every discipline ', emphasis: 'feeds', rest: ' every other.', tag: 'Multidisciplinary' },
  { num: '004', text: 'The invisible work ', emphasis: 'holds', rest: ' the visible work.', tag: 'Production' },
  { num: '005', text: 'Craft is the only ', emphasis: 'currency', rest: ' that matters.', tag: 'Standard' },
  { num: '006', text: 'Art is precise. ', emphasis: 'Emotion', rest: ' is the goal.', tag: 'Art' },
]

export default function Philosophy() {
  return (
    <section className="philosophy-section">
      <div className="section-label">Philosophy</div>
      <h2 className="section-title fade-in">The Way I Work</h2>

      <div className="philosophy-list fade-in">
        {principles.map((p) => (
          <div key={p.num} className="philosophy-item">
            <span className="phi-num">{p.num}</span>
            <span className="phi-text">
              {p.text}
              <span>{p.emphasis}</span>
              {p.rest}
            </span>
            <span className="phi-tag">{p.tag}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
