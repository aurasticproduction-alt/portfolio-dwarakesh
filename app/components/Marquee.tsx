const items = [
  'Artistic Director',
  'Event Organiser',
  'DJ Dwara',
  'Dancer',
  'AI & ML',
  'Editor',
  'Designer',
  'Photographer',
  'Aurastic Productions',
]

const allItems = [...items, ...items]

export default function Marquee() {
  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-text">{item}</span>
            <span className="marquee-dot" aria-hidden="true">
              <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <path d="M5 0 6.18 3.82 10 5 6.18 6.18 5 10 3.82 6.18 0 5 3.82 3.82 5 0z"/>
              </svg>
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
