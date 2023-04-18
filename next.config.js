const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([
  [optimizedImages, {
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    optimizeImages: false,
    optimizeImagesInDev: false,
    mozjpeg: {
      quality: 80
    },
    pngquant: {
      speed: 3,
      strip: false,
      verbose: false
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
    disableStaticImages: true
  }
})
