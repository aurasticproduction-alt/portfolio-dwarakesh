import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Local /public/images — no remote domains needed
    unoptimized: false,
  },
}

export default nextConfig
