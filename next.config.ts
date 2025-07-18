import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.storyblok.com',
        port: '',
        pathname: '/f/**',
      },
    ],
  },
  /* config options here */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors 'self' https://app.storyblok.com`,
          },
        ],
      },
    ]
  },
}

export default nextConfig
