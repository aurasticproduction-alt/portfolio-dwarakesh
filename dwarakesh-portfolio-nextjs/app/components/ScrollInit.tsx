'use client'

import { useEffect } from 'react'

export default function ScrollInit() {
  useEffect(() => {
    // Fire 80px before element hits viewport bottom — animations land before eyes reach it
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -80px 0px' }
    )

    // Auto-assign stagger delays to grid/list children that don't already have one
    const ANIMATE = '[class*="fade-in"]'
    document.querySelectorAll('.stagger').forEach((container) => {
      Array.from(container.querySelectorAll(`:scope > ${ANIMATE}, :scope > * > ${ANIMATE}`)).forEach((child, i) => {
        const el = child as HTMLElement
        if (!el.style.transitionDelay) {
          el.style.transitionDelay = `${i * 0.07}s`
        }
      })
    })

    const SELECTORS = '.fade-in, .fade-in--left, .fade-in--right, .fade-in--scale, .fade-in--label'
    document.querySelectorAll(SELECTORS).forEach((el) => obs.observe(el))

    // Smooth scroll for anchor links
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
      anchors.forEach((a) => a.removeEventListener('click', handleClick))
    }
  }, [])

  return null
}
