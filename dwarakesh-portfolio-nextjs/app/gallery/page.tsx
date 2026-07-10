'use client'

import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Image from 'next/image'

// Landscape (horizontal) photos → Row 1
const row1 = [
  'IMG_9029.jpg',
  'IMG_5622.jpg',
  'DSC02423.jpg',
  'IMG-20250323-WA0023.jpg',
  'IMG_3857.jpg',
  '20250215_172827.jpg',
  '20250215_225238.jpg',
  'IMG_0436.jpg',
]

// Portrait (vertical) photos → Row 2
const row2 = [
  'IMG_9803.jpg',
  'IMG_9709.jpg',
  'IMG_3705.jpg',
  'IMG_1232.jpg',
  'IMG_1337.jpg',
  'IMG_6321.jpg',
  'DSC08739.jpg',
  'IMG_0502.jpg',
]

const allPhotos = [...row1, ...row2]

function PhotoRow({
  images,
  direction = 'left',
  speed = 40,
  orientation = 'landscape',
  onImageClick,
}: {
  images: string[]
  direction?: 'left' | 'right'
  speed?: number
  orientation?: 'landscape' | 'portrait'
  onImageClick: (img: string) => void
}) {
  const doubled = [...images, ...images]

  return (
    <div className={`gallery-row-wrap gallery-row-wrap--${orientation}`}>
      <div
        className="gallery-row-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className="gallery-row-item"
            onClick={() => onImageClick(img)}
          >
            <Image
              src={`/images/${img}`}
              alt={`Photo ${(i % images.length) + 1}`}
              fill
              sizes={orientation === 'landscape' ? '420px' : '240px'}
              className="gallery-row-img"
              loading={i < 8 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function Lightbox({ image, onClose }: { image: string | null; onClose: () => void }) {
  if (!image) return null

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <Image
          src={`/images/${image}`}
          alt="Full size"
          fill
          sizes="100vw"
          className="lightbox-img"
          quality={95}
          priority
        />
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  return (
    <>
      <Nav />
      <main className="gallery-page">
        <div className="gallery-hero">
          <p className="section-label">Visual Archive</p>
          <h1 className="gallery-title">Gallery</h1>
          <p className="gallery-sub">Moments, events &amp; creative work</p>
        </div>

        <div className="gallery-rows">
          <PhotoRow images={row1} direction="left"  speed={40} orientation="landscape" onImageClick={setLightboxImage} />
          <PhotoRow images={row2} direction="right" speed={35} orientation="portrait"  onImageClick={setLightboxImage} />
        </div>
      </main>
      <Footer />

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  )
}
