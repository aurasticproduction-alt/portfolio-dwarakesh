'use client'

import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────
   Cinematic hero canvas — floating identity silhouettes merging
   into a central glowing presence. Purple/white volumetric light.
   ───────────────────────────────────────────────────────────── */

const IDENTITIES = [
  // [label, icon path commands relative to 0,0 bounding 40x40]
  'photographer', 'filmmaker', 'AI engineer', 'musician',
  'designer', 'creative director', 'event producer', 'dancer',
  'artist', 'editor', 'architect', 'visionary',
]

interface Silhouette {
  x: number; y: number
  vx: number; vy: number
  targetX: number; targetY: number
  size: number
  opacity: number
  rotation: number
  rotSpeed: number
  colorPhase: number
  type: number       // which icon shape 0-5
  merging: number    // 0-1, how much pulled toward center
  phase: number      // life phase
  age: number
  maxAge: number
  pulseOffset: number
}

interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  size: number
  hue: number
}

interface LightRay {
  angle: number
  width: number
  length: number
  opacity: number
  speed: number
  offset: number
  hue: number
}

function drawSilhouette(ctx: CanvasRenderingContext2D, type: number, x: number, y: number, size: number) {
  const s = size / 40
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(s, s)

  switch (type % 6) {
    case 0: // Camera (photographer/filmmaker)
      ctx.beginPath()
      ctx.roundRect(-16, -10, 32, 20, 3)
      ctx.rect(-6, -14, 12, 6)
      ctx.arc(0, 0, 7, 0, Math.PI * 2)
      ctx.fill()
      break
    case 1: // Human silhouette (dancer/artist)
      ctx.beginPath()
      ctx.arc(0, -14, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(0, -8); ctx.lineTo(0, 8)
      ctx.moveTo(0, -4); ctx.lineTo(-10, 4)
      ctx.moveTo(0, -4); ctx.lineTo(10, 4)
      ctx.moveTo(0, 8);  ctx.lineTo(-6, 18)
      ctx.moveTo(0, 8);  ctx.lineTo(6, 18)
      ctx.lineWidth = 3 / s
      ctx.stroke()
      break
    case 2: // Music note (musician)
      ctx.beginPath()
      ctx.ellipse(-4, 10, 5, 3.5, -0.4, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(1, 10); ctx.lineTo(1, -10)
      ctx.lineTo(14, -14); ctx.lineTo(14, -4)
      ctx.lineWidth = 2.5 / s
      ctx.stroke()
      break
    case 3: // Pen/Design tool (designer/director)
      ctx.beginPath()
      ctx.moveTo(0, -18); ctx.lineTo(6, -4)
      ctx.lineTo(4, 18); ctx.lineTo(0, 14)
      ctx.lineTo(-4, 18); ctx.lineTo(-6, -4)
      ctx.closePath()
      ctx.fill()
      break
    case 4: // Circuit/AI (AI engineer/editor)
      ctx.beginPath()
      ctx.roundRect(-14, -14, 28, 28, 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(0,0,0,0.35)'
      ctx.lineWidth = 1.5 / s
      ctx.beginPath()
      ctx.moveTo(-8, 0); ctx.lineTo(8, 0)
      ctx.moveTo(0, -8); ctx.lineTo(0, 8)
      ctx.moveTo(-6, -6); ctx.lineTo(6, 6)
      ctx.stroke()
      break
    case 5: // Star/Event (event producer)
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const a = (i * 4 * Math.PI) / 5 - Math.PI / 2
        const b = a + (2 * Math.PI) / 5
        i === 0 ? ctx.moveTo(Math.cos(a)*16, Math.sin(a)*16)
                : ctx.lineTo(Math.cos(a)*16, Math.sin(a)*16)
        ctx.lineTo(Math.cos(b)*7, Math.sin(b)*7)
      }
      ctx.closePath()
      ctx.fill()
      break
  }
  ctx.restore()
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0
    const silhouettes: Silhouette[] = []
    const particles: Particle[]   = []
    const rays: LightRay[]        = []

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Init light rays
    for (let i = 0; i < 8; i++) {
      rays.push({
        angle: (i / 8) * Math.PI * 2,
        width: 0.04 + Math.random() * 0.06,
        length: 0.5 + Math.random() * 0.3,
        opacity: 0.015 + Math.random() * 0.025,
        speed: 0.0003 + Math.random() * 0.0004,
        offset: Math.random() * Math.PI * 2,
        hue: 260 + Math.random() * 60,
      })
    }

    const spawnSilhouette = () => {
      // Spawn from random edge or orbit position
      const edge = Math.random()
      let sx: number, sy: number
      if (edge < 0.25)      { sx = -60;    sy = Math.random() * H }
      else if (edge < 0.5)  { sx = W + 60; sy = Math.random() * H }
      else if (edge < 0.75) { sx = Math.random() * W; sy = -60 }
      else                  { sx = Math.random() * W; sy = H + 60 }

      const cx = W / 2 + (Math.random() - 0.5) * W * 0.15
      const cy = H / 2 + (Math.random() - 0.5) * H * 0.15

      silhouettes.push({
        x: sx, y: sy,
        vx: (cx - sx) * 0.0008,
        vy: (cy - sy) * 0.0008,
        targetX: cx, targetY: cy,
        size: 22 + Math.random() * 32,
        opacity: 0,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        colorPhase: Math.random(),
        type: Math.floor(Math.random() * 6),
        merging: 0,
        phase: 0,  // 0=entering, 1=floating, 2=merging
        age: 0,
        maxAge: 320 + Math.random() * 200,
        pulseOffset: Math.random() * Math.PI * 2,
      })
    }

    // Seed initial silhouettes
    for (let i = 0; i < 16; i++) spawnSilhouette()

    const spawnParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.3 + Math.random() * 1.2
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        life: 0, maxLife: 60 + Math.random() * 80,
        size: 0.5 + Math.random() * 1.8,
        hue: 260 + Math.random() * 80,
      })
    }

    let t = 0
    let frame = 0

    const draw = () => {
      t    += 0.01
      frame++

      const cx = W / 2
      const cy = H / 2

      // ── Deep background fill ──
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(3,1,8,0.22)'
      ctx.fillRect(0, 0, W, H)

      // ── Volumetric light rays from center ──
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      rays.forEach(ray => {
        ray.angle += ray.speed
        const a1 = ray.angle + ray.offset + Math.sin(t * 0.3) * 0.08
        const a2 = a1 + ray.width
        const r  = Math.max(W, H) * ray.length

        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.arc(cx, cy, r, a1, a2)
        ctx.closePath()

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        grad.addColorStop(0,   `hsla(${ray.hue},80%,70%,${ray.opacity * 4})`)
        grad.addColorStop(0.3, `hsla(${ray.hue},70%,60%,${ray.opacity * 1.5})`)
        grad.addColorStop(1,   `hsla(${ray.hue},60%,50%,0)`)
        ctx.fillStyle = grad
        ctx.fill()
      })
      ctx.restore()

      // ── Central core glow ──
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      const breath = 1 + 0.07 * Math.sin(t * 0.7)

      // Outer halo — deep purple
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.55 * breath)
      halo.addColorStop(0,   `hsla(275,85%,65%,0.10)`)
      halo.addColorStop(0.25,`hsla(270,80%,55%,0.07)`)
      halo.addColorStop(0.55,`hsla(260,70%,45%,0.03)`)
      halo.addColorStop(1,   `hsla(250,60%,30%,0)`)
      ctx.fillStyle = halo
      ctx.fillRect(0, 0, W, H)

      // Mid glow — violet
      const mid = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.28 * breath)
      mid.addColorStop(0,   `hsla(290,90%,75%,0.14)`)
      mid.addColorStop(0.4, `hsla(275,85%,65%,0.08)`)
      mid.addColorStop(1,   `hsla(260,70%,50%,0)`)
      ctx.fillStyle = mid
      ctx.fillRect(0, 0, W, H)

      // Inner core — bright white-violet
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.10 * breath)
      core.addColorStop(0,   `hsla(300,100%,90%,0.18)`)
      core.addColorStop(0.5, `hsla(285,90%,75%,0.10)`)
      core.addColorStop(1,   `hsla(270,80%,60%,0)`)
      ctx.fillStyle = core
      ctx.fillRect(0, 0, W, H)
      ctx.restore()

      // ── Silhouettes ──
      if (frame % 40 === 0 && silhouettes.length < 24) spawnSilhouette()

      ctx.save()
      ctx.globalCompositeOperation = 'screen'

      silhouettes.forEach((s, si) => {
        s.age++
        s.rotation += s.rotSpeed

        const lifeRatio = s.age / s.maxAge
        const distToCenter = Math.hypot(s.x - cx, s.y - cy)

        // Phase transitions
        if (s.phase === 0 && s.opacity >= 0.08) s.phase = 1
        if (s.phase === 1 && lifeRatio > 0.6) s.phase = 2

        // Opacity
        if (s.phase === 0) s.opacity = Math.min(s.opacity + 0.003, 0.22)
        else if (s.phase === 2) {
          s.merging = Math.min(s.merging + 0.006, 1)
          s.opacity = Math.max(s.opacity - 0.002, 0)
        }

        // Drift — gentle float + pull toward center when merging
        const pullStrength = s.phase === 2 ? 0.012 : 0.0015
        s.vx += (cx - s.x) * pullStrength * 0.01
        s.vy += (cy - s.y) * pullStrength * 0.01
        s.vx += Math.sin(t * 0.4 + si * 1.3) * 0.015
        s.vy += Math.cos(t * 0.35 + si * 0.9) * 0.012
        // Damping
        s.vx *= 0.97
        s.vy *= 0.97
        s.x  += s.vx
        s.y  += s.vy

        // Pulse
        const pulse = 1 + 0.06 * Math.sin(t * 1.2 + s.pulseOffset)
        const drawSize = s.size * pulse * (1 + s.merging * 0.3)

        if (s.opacity <= 0.005 && s.phase === 2) {
          // Spawn burst particles at merge point
          for (let p = 0; p < 5; p++) spawnParticle(s.x, s.y)
          silhouettes.splice(si, 1)
          return
        }

        // Color: deep violet → white as merging increases
        const hue = 270 + s.merging * 30
        const sat = 80 - s.merging * 40
        const lum = 55 + s.merging * 35

        // Glow aura behind silhouette
        const glowR = drawSize * 1.8
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR)
        glow.addColorStop(0,   `hsla(${hue},${sat}%,${lum}%,${s.opacity * 0.6})`)
        glow.addColorStop(0.5, `hsla(${hue},${sat}%,${lum - 10}%,${s.opacity * 0.2})`)
        glow.addColorStop(1,   `hsla(${hue},${sat}%,${lum - 20}%,0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2)
        ctx.fill()

        // Draw silhouette
        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.rotate(s.rotation)
        ctx.translate(-s.x, -s.y)
        ctx.fillStyle   = `hsla(${hue},${sat}%,${lum}%,${s.opacity})`
        ctx.strokeStyle = `hsla(${hue},${sat}%,${lum + 20}%,${s.opacity * 0.5})`
        ctx.lineWidth   = 0.8
        drawSilhouette(ctx, s.type, s.x, s.y, drawSize)
        ctx.restore()

        // Connecting line to center when close/merging
        if (distToCenter < Math.min(W, H) * 0.4 && s.phase >= 1) {
          const lineOpacity = s.opacity * 0.15 * (1 - distToCenter / (Math.min(W, H) * 0.4))
          ctx.beginPath()
          ctx.moveTo(s.x, s.y)
          ctx.lineTo(cx, cy)
          ctx.strokeStyle = `hsla(${hue},80%,70%,${lineOpacity})`
          ctx.lineWidth   = 0.4
          ctx.stroke()
        }
      })
      ctx.restore()

      // ── Particles ──
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      if (frame % 6 === 0 && particles.length < 80) {
        // Ambient particles from center
        const a = Math.random() * Math.PI * 2
        const r = Math.random() * Math.min(W, H) * 0.15
        spawnParticle(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p  = particles[i]
        p.x     += p.vx
        p.y     += p.vy
        p.vy    -= 0.01
        p.vx    *= 0.99
        p.life++
        if (p.life > p.maxLife) { particles.splice(i, 1); continue }
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.55
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},85%,75%,${alpha})`
        ctx.fill()
      }
      ctx.restore()

      // ── Floating dust / nebula micro-particles ──
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      if (frame % 2 === 0 && particles.length < 120) {
        const nx = Math.random() * W
        const ny = Math.random() * H
        particles.push({
          x: nx, y: ny,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          life: 0, maxLife: 200 + Math.random() * 150,
          size: 0.3 + Math.random() * 0.8,
          hue: 265 + Math.random() * 60,
        })
      }
      ctx.restore()

      // ── Vignette ──
      ctx.save()
      ctx.globalCompositeOperation = 'source-over'
      const vig = ctx.createRadialGradient(cx, cy, H * 0.25, cx, cy, H * 0.9)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(2,0,6,0.72)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)
      ctx.restore()

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      aria-hidden="true"
    />
  )
}
