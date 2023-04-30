/**
 * @type {import('next').NextConfig}
 */
require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false
      }
    }
    return config
  }
}

module.exports = nextConfig
