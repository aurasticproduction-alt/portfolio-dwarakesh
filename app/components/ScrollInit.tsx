'use client'

import { useEffect } from 'react'

/* ─────────────────────────────────────────────
   ScrollInit — wires up all scroll-based effects:
   1. Intersection Observer → fade/slide/scale reveals
   2. Parallax on hero name
   3. Text scramble on section titles
   4. Magnetic buttons
   ───────────────────────────────────────────── */

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'

function scrambleText(el: HTMLElement) {
  const original = el.innerText
  let frame = 0
  const totalFrames = 18
  const interval = setInterval(() => {
    el.innerText = original
      .split('')
      .map((char, i) => {
        if (char === ' ' || char === '\n') return char
        if (i < (frame / totalFrames) * original.length) return char
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      .join('')
    frame++
    if (frame > totalFrames) {
      el.innerText = original
      clearInterval(interval)
    }
  }, 35)
}

export default function ScrollInit() {
  useEffect(() => {
    // ── 1. Intersection observer — reveal animations ──
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    )

    // Stagger delays
    document.querySelectorAll('.stagger').forEach((container) => {
      const ANIMATE = '[class*="fade-in"]'
      Array.from(container.querySelectorAll(`:scope > ${ANIMATE}, :scope > * > ${ANIMATE}`)).forEach((child, i) => {
        const el = child as HTMLElement
        if (!el.style.transitionDelay) el.style.transitionDelay = `${i * 0.08}s`
      })
    })

    const SELECTORS = '.fade-in, .fade-in--left, .fade-in--right, .fade-in--scale, .fade-in--label, .fade-in--blur'
    document.querySelectorAll(SELECTORS).forEach((el) => obs.observe(el))

    // Also observe bento stat tiles individually for staggered entrance
    document.querySelectorAll('.bento-grid .bt').forEach((el, i) => {
      const tile = el as HTMLElement
      tile.style.transitionDelay = `${i * 0.07}s`
      obs.observe(tile)
    })

    // Observe software track wrapper
    const sfwTrack = document.querySelector('.sfw-track-wrap')
    if (sfwTrack) obs.observe(sfwTrack)

    // ── 2. Parallax on hero name ──
    const heroName = document.querySelector('.hero-name') as HTMLElement | null
    const heroBg   = document.querySelector('.hero-canvas') as HTMLElement | null

    const onScroll = () => {
      const y = window.scrollY
      if (heroName) heroName.style.transform = `translateY(${y * 0.18}px)`
      if (heroBg)   heroBg.style.transform   = `translateY(${y * 0.08}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── 3. Text scramble on section titles ──
    const scrambleObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement
            setTimeout(() => scrambleText(el), 100)
            scrambleObs.unobserve(el)
          }
        })
      },
      { threshold: 0.6 }
    )
    // Only scramble the plain text node of section titles (not those with <em> children that would break)
    document.querySelectorAll('.section-label').forEach((el) => scrambleObs.observe(el))

    // ── 4. Magnetic buttons ──
    const magneticEls = document.querySelectorAll<HTMLElement>('.btn-primary, .btn-glass, .nav-cta')
    const cleanups: (() => void)[] = []

    magneticEls.forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top  + rect.height / 2
        const dx = (e.clientX - cx) * 0.25
        const dy = (e.clientY - cy) * 0.25
        el.style.transform = `translate(${dx}px, ${dy}px)`
      }
      const onLeave = () => {
        el.style.transform = ''
        el.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)'
      }
      const onEnter = () => {
        el.style.transition = 'transform 0.1s ease'
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      el.addEventListener('mouseenter', onEnter)
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
        el.removeEventListener('mouseenter', onEnter)
      })
    })

    // ── 5. Smooth anchor scroll ──
    const handleClick = (e: Event) => {
      const anchor = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
      if (anchor?.startsWith('#')) {
        e.preventDefault()
        document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    anchors.forEach((a) => a.addEventListener('click', handleClick))

    return () => {
      obs.disconnect()
      scrambleObs.disconnect()
      window.removeEventListener('scroll', onScroll)
      cleanups.forEach((fn) => fn())
      anchors.forEach((a) => a.removeEventListener('click', handleClick))
      if (heroName) heroName.style.transform = ''
      if (heroBg)   heroBg.style.transform = ''
    }
  }, [])

  return null
}
