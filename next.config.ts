import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    // Sharp is installed — enable Next.js image optimisation.
    // This auto-converts PNG/JPG → WebP/AVIF and resizes to the requested width.
    // unoptimized was previously true which served raw files (3–4 MB per page load).
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.propabridge.com' },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
      // Old /categories/[slug] URLs that Google indexed — redirect to listings
      {
        source: '/categories/:slug',
        destination: '/listings',
        permanent: true, // 301 — passes link equity to /listings
      },
      // Guard against any /category/ (singular) variants too
      {
        source: '/category/:slug',
        destination: '/listings',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
