const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return defaultPathMap;
  },
  images: {
    disableStaticImages: true,
  },
  /* Your additional config options here */
});
