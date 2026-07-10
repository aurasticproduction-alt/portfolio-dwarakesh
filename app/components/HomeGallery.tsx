'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

interface Photo {
  id: string
  title: string
  storage_path: string
  orientation?: 'portrait' | 'landscape'
}

const BUCKET_URL = `https://wwyzktxyczlfkrieeerk.supabase.co/storage/v1/object/public/gallery`
const getUrl = (p: string) => `${BUCKET_URL}/${p}`

export default function HomeGallery() {
  const [photos,   setPhotos]   = useState<Photo[]>([])
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('photos').select('*').order('sort_order', { ascending: true })
      if (!data?.length) return
      const withOri = await Promise.all(
        data.map((p: Photo) => new Promise<Photo>((resolve) => {
          const img = new window.Image()
          img.onload  = () => resolve({ ...p, orientation: img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape' })
          img.onerror = () => resolve({ ...p, orientation: 'landscape' })
          img.src = getUrl(p.storage_path)
        }))
      )
      setPhotos(withOri)
    }
    load()
  }, [])

  const portraits  = photos.filter(p => p.orientation === 'portrait')
  const landscapes = photos.filter(p => p.orientation === 'landscape')
  const row1 = [...portraits,  ...portraits]
  const row2 = [...landscapes, ...landscapes]

  const close = () => setLightbox(null)
  const prev  = () => setLightbox(i => i !== null ? (i - 1 + photos.length) % photos.length : null)
  const next  = () => setLightbox(i => i !== null ? (i + 1) % photos.length : null)

  useEffect(() => {
    if (lightbox === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     close()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [lightbox])

  if (!photos.length) return null

  return (
    <section className="hg-section" id="gallery">

      {/* Header */}
      <div className="hg-header">
        <p className="section-label">Visual Archive</p>
        <h2 className="section-title">Gallery</h2>
      </div>

      <div className="hg-rows">
        {/* Row 1 — portraits LTR */}
        {row1.length > 0 && (
          <div className="hg-row-mask">
            <div className="hg-row-track hg-row-track--ltr">
              {row1.map((photo, i) => (
                <button
                  key={`p-${photo.id}-${i}`}
                  className="hg-card hg-card--portrait"
                  onClick={() => setLightbox(photos.findIndex(p => p.id === photo.id))}
                  aria-label={`View photo`}
                >
                  <img src={getUrl(photo.storage_path)} alt="" loading="lazy" />
                  <div className="hg-card-shine" />
                  <div className="hg-card-overlay">
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Row 2 — landscapes RTL */}
        {row2.length > 0 && (
          <div className="hg-row-mask">
            <div className="hg-row-track hg-row-track--rtl">
              {row2.map((photo, i) => (
                <button
                  key={`l-${photo.id}-${i}`}
                  className="hg-card hg-card--landscape"
                  onClick={() => setLightbox(photos.findIndex(p => p.id === photo.id))}
                  aria-label={`View photo`}
                >
                  <img src={getUrl(photo.storage_path)} alt="" loading="lazy" />
                  <div className="hg-card-shine" />
                  <div className="hg-card-overlay">
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen lightbox */}
      {lightbox !== null && photos[lightbox] && (
        <div className="fsl" onClick={e => { if ((e.target as HTMLElement).classList.contains('fsl')) close() }}>
          <div className="fsl-img-wrap">
            <img src={getUrl(photos[lightbox].storage_path)} alt="" className="fsl-img" />
          </div>
          <button className="fsl-close" onClick={close} aria-label="Close">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <button className="fsl-nav fsl-nav--prev" onClick={prev} aria-label="Previous">
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="fsl-nav fsl-nav--next" onClick={next} aria-label="Next">
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="fsl-counter">{lightbox + 1} / {photos.length}</div>
        </div>
      )}
    </section>
  )
}
