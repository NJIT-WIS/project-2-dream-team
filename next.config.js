const nextConfig = {
  i18n: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    const localePaths = [];

    for (const locale of nextConfig.i18n.locales) {
      const localePathMap = {};

      for (const [path, page] of Object.entries(defaultPathMap)) {
        const localePath = `/${locale}${path === "/" ? "" : path}`;
        localePathMap[localePath] = { ...page, query: { ...page.query, locale } };
      }

      localePaths.push(localePathMap);
    }

    const pathMap = Object.assign({}, ...localePaths);

    return pathMap;
  },
};

module.exports = nextConfig;
