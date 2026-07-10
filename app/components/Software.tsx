'use client'

const ROW1 = [
  { name: 'Adobe Audition',  color: '#00E4BB', url: 'https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/audition.svg' },
  { name: 'After Effects',   color: '#9999FF', url: 'https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/after-effects.svg' },
  { name: 'Premiere Pro',    color: '#9999FF', url: 'https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/premiere-pro.svg' },
  { name: 'Illustrator',     color: '#FF9A00', url: 'https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/illustrator.svg' },
  { name: 'Photoshop',       color: '#31A8FF', url: 'https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/photoshop.svg' },
]

const ROW2 = [
  { name: 'Traktor Pro',   color: '#EF3340', url: 'https://wwyzktxyczlfkrieeerk.supabase.co/storage/v1/object/public/gallery/Traktor.png' },
  { name: 'Filmora',       color: '#00C4E8', url: 'https://wwyzktxyczlfkrieeerk.supabase.co/storage/v1/object/public/gallery/filmora.png' },
  { name: 'SketchUp',      color: '#4A9EDB', url: 'https://wwyzktxyczlfkrieeerk.supabase.co/storage/v1/object/public/gallery/sketchup.png' },
  { name: 'Serato DJ Pro', color: '#cccccc', url: 'https://wwyzktxyczlfkrieeerk.supabase.co/storage/v1/object/public/gallery/Serato%20DJ%20Pro%20.png' },
  { name: 'Rekordbox',     color: '#EF0E2B', url: 'https://wwyzktxyczlfkrieeerk.supabase.co/storage/v1/object/public/gallery/reckord%20box.png' },
]

function SoftwareItem({ s }: { s: typeof ROW1[0] }) {
  return (
    <div
      className="sfw-pill"
      style={{ '--c': s.color } as React.CSSProperties}
      title={s.name}
    >
      <div className="sfw-pill-glow" />
      <div className="sfw-pill-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.url} alt={s.name} />
      </div>
      <span className="sfw-pill-name">{s.name}</span>
    </div>
  )
}

export default function Software() {
  return (
    <section className="sfw-section">
      <div className="sfw-header">
        <p className="section-label">Tools of the Trade</p>
        <h2 className="section-title">Software</h2>
      </div>

      <div className="sfw-rows">
        {/* Row 1 — Adobe suite */}
        <div className="sfw-row sfw-row--1">
          {ROW1.map((s) => <SoftwareItem key={s.name} s={s} />)}
        </div>

        {/* Divider */}
        <div className="sfw-row-divider" />

        {/* Row 2 — DJ / Creative tools */}
        <div className="sfw-row sfw-row--2">
          {ROW2.map((s) => <SoftwareItem key={s.name} s={s} />)}
        </div>
      </div>
    </section>
  )
}
