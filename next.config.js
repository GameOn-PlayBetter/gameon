/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // ✅ Route /brand/privacy-policy to /privacy-policy
      {
        source: '/brand/:slug*',
        destination: '/:slug*',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lwpvjfokhjkmjruvqosq.supabase.co',
        pathname: '/storage/v1/object/public/brand-images/**',
      },
    ],
  },
}

module.exports = nextConfig