const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

const nextConfig = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return defaultPathMap
  },
  images: {
    disableStaticImages: true
  }
}

module.exports = withPlugins([
  optimizedImages
], nextConfig)
