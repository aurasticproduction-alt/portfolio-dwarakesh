/* Clean minimal SVG icon set — stroke-based, 24×24, currentColor */

const paths: Record<string, React.ReactNode> = {

  /* Artistic Director — clapperboard */
  director: (
    <>
      <path d="M4 7h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
      <path d="M4 7 7 3h10l3 4" />
      <path d="M8 3v4M12 3v4M16 3v4" />
    </>
  ),

  /* Event Organiser — calendar */
  events: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
      <path d="M8 13h2M12 13h2M8 17h2M12 17h2" strokeLinecap="round" />
    </>
  ),

  /* DJ Dwara — headphones */
  dj: (
    <>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M3 18a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
      <path d="M21 18a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" />
    </>
  ),

  /* Dancer — audio waveform (movement, rhythm) */
  dancer: (
    <>
      <path d="M2 12h1.5" strokeLinecap="round" />
      <path d="M5.5 7v10" strokeLinecap="round" />
      <path d="M9 4v16" strokeLinecap="round" />
      <path d="M12.5 8v8" strokeLinecap="round" />
      <path d="M16 5v14" strokeLinecap="round" />
      <path d="M19.5 9v6" strokeLinecap="round" />
      <path d="M22.5 12h-1.5" strokeLinecap="round" />
    </>
  ),

  /* AI & ML — neural network nodes */
  ai: (
    <>
      <circle cx="12" cy="3" r="1.5" />
      <circle cx="4" cy="12" r="1.5" />
      <circle cx="20" cy="12" r="1.5" />
      <circle cx="8" cy="20" r="1.5" />
      <circle cx="16" cy="20" r="1.5" />
      <path d="M12 4.5 5.2 10.8M12 4.5l6.8 6.3M5.5 13.4l2 5M18.5 13.4l-2 5M9.5 20h5" />
    </>
  ),

  /* Editor — film strip */
  editor: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M8 6v12M16 6v12M2 10h4M18 10h4M2 14h4M18 14h4" />
    </>
  ),

  /* Designer — pen nib */
  designer: (
    <>
      <path d="M12 19 3 21l2-9L17 4l4 4L12 19z" />
      <path d="M5 12l7 7" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </>
  ),

  /* Photographer — camera with aperture */
  photographer: (
    <>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),

  /* Microphone */
  mic: (
    <>
      <rect x="9" y="1" width="6" height="12" rx="3" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
    </>
  ),

  /* Music / audio wave */
  music: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),

  /* Star — featured work */
  star: (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 6.18 21.02 7 14.14 2 9.27l6.91-1.01L12 2z" />
  ),

  /* Crowd — group of people */
  crowd: (
    <>
      <path d="M17 20h5v-2a4 4 0 0 0-4.9-3.9M17 20H7m10 0v-2c0-.7-.1-1.4-.3-2M7 20H2v-2a4 4 0 0 1 4.9-3.9M7 20v-2c0-.7.1-1.4.3-2m0 0a5 5 0 0 1 9.4 0" />
      <circle cx="12" cy="7" r="3" />
      <circle cx="19" cy="8" r="2.5" />
      <circle cx="5" cy="8" r="2.5" />
    </>
  ),

  /* Diamond — decorative separator (replaces ✦) */
  diamond: (
    <path d="M12 2 22 12 12 22 2 12 12 2z" />
  ),
}

interface IconProps {
  name: string
  size?: number
  className?: string
}

export default function Icon({ name, size = 22, className = '' }: IconProps) {
  const content = paths[name]
  if (!content) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {content}
    </svg>
  )
}
