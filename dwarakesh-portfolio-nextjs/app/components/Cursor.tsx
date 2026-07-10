'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0
    let animId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px,${my}px)`
      }
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px,${ry}px)`
      }
      animId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    animId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}
