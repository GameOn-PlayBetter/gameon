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
}

module.exports = nextConfig