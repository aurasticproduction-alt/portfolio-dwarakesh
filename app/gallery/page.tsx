'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

interface Photo {
  id: string
  title: string
  storage_path: string
  category: string
  sort_order: number
  orientation?: 'portrait' | 'landscape'
}

const BUCKET_URL = `https://wwyzktxyczlfkrieeerk.supabase.co/storage/v1/object/public/gallery`

function getImageUrl(p: string) {
  return `${BUCKET_URL}/${p}`
}

export default function GalleryPage() {
  const [photos,   setPhotos]   = useState<Photo[]>([])
  const [loading,  setLoading]  = useState(true)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    async function fetchPhotos() {
      const { data, error } = await supabase
        .from('photos').select('*').order('sort_order', { ascending: true })
      if (error) { setLoading(false); return }
      if (data?.length) {
        const withOri = await Promise.all(
          data.map((photo: Photo) => new Promise<Photo>((resolve) => {
            const img = new window.Image()
            img.onload  = () => resolve({ ...photo, orientation: img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape' })
            img.onerror = () => resolve({ ...photo, orientation: 'landscape' })
            img.src = getImageUrl(photo.storage_path)
          }))
        )
        setPhotos(withOri)
      }
      setLoading(false)
    }
    fetchPhotos()
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

  return (
    <>
      <Nav />
      <main className="gallery-page">

        {/* ── Hero ── */}
        <div className="gal-hero">
          <h1 className="gal-hero-title">Gallery</h1>
          <p className="gal-hero-sub">A curated archive of moments, events &amp; creative work</p>
        </div>

        {loading ? (
          <div className="gallery-loading">
            <div className="gallery-spinner" />
            <p>Loading…</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="gallery-empty"><p>No photos yet.</p></div>
        ) : (
          <div className="gal-rows">

            {/* Row 1 — portrait, LTR */}
            {row1.length > 0 && (
              <div className="gal-row-mask">
                <div className="gal-row-track gal-row-track--ltr">
                  {row1.map((photo, i) => (
                    <button
                      key={`p-${photo.id}-${i}`}
                      className="gal-card gal-card--portrait"
                      onClick={() => setLightbox(photos.findIndex(p => p.id === photo.id))}
                      aria-label={`View ${photo.title}`}
                    >
                      <img src={getImageUrl(photo.storage_path)} alt={photo.title} loading="lazy" />
                      <div className="gal-card-shine" />
                      <div className="gal-card-overlay">
                        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Row 2 — landscape, RTL */}
            {row2.length > 0 && (
              <div className="gal-row-mask">
                <div className="gal-row-track gal-row-track--rtl">
                  {row2.map((photo, i) => (
                    <button
                      key={`l-${photo.id}-${i}`}
                      className="gal-card gal-card--landscape"
                      onClick={() => setLightbox(photos.findIndex(p => p.id === photo.id))}
                      aria-label={`View ${photo.title}`}
                    >
                      <img src={getImageUrl(photo.storage_path)} alt={photo.title} loading="lazy" />
                      <div className="gal-card-shine" />
                      <div className="gal-card-overlay">
                        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ── Fullscreen lightbox ── */}
        {lightbox !== null && photos[lightbox] && (
          <div className="fsl"
            onClick={e => { if ((e.target as HTMLElement).classList.contains('fsl')) close() }}>

            {/* top bar */}
            <div className="fsl-bar">
              <span className="fsl-bar-title">{photos[lightbox].title}</span>
              <div className="fsl-bar-right">
                <span className="fsl-counter">{lightbox + 1} / {photos.length}</span>
                <button className="fsl-close" onClick={close} aria-label="Close">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* image */}
            <div className="fsl-img-wrap">
              <img src={getImageUrl(photos[lightbox].storage_path)}
                alt={photos[lightbox].title} className="fsl-img" />
            </div>

            {/* nav */}
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

          </div>
        )}

      </main>
      <Footer />
    </>
  )
}
