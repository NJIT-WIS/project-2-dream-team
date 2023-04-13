const locales = ["en", "fr", "es"];

module.exports = {
  i18n: {
    locales,
    defaultLocale: "en",
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // Generate a mapping of paths to exported HTML pages for each locale
    const pathMap = {};

    for (const locale of locales) {
      for (const [path, page] of Object.entries(defaultPathMap)) {
        // Add the locale prefix to the path for each locale
        const localePath = `/${locale}${path === "/" ? "" : path}`;

        // Add the page to the pathMap for the current locale
        pathMap[localePath] = { ...page, query: { ...page.query, locale } };
      }
    }

    return pathMap;
  },
};
