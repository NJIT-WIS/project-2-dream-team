const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([
  withImages,
  [optimizedImages, {
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    optimizeImages: true,
    optimizeImagesInDev: true,
    mozjpeg: {
      quality: 80
    },
    pngquant: {
      speed: 3,
      strip: true,
      verbose: true
    },
    svgo: {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              cleanupIDs: false
            }
          }
        }
      ]
    }
  }]
], {
  images: {
    disableStaticImages: false
  }
})
