const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([
  [optimizedImages, {
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    optimizeImages: true,
    optimizeImagesInDev: true,
    loader: 'sharp'
  }]
], {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return defaultPathMap
  },
  images: {
    disableStaticImages: false
  }
})
