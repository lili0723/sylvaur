/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://sylvaur.cn",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
  alternateRefs: [
    { href: "https://sylvaur.cn/en", hreflang: "en" },
    { href: "https://sylvaur.cn/zh", hreflang: "zh" },
    { href: "https://sylvaur.cn/vi", hreflang: "vi" },
    { href: "https://sylvaur.cn/th", hreflang: "th" },
    { href: "https://sylvaur.cn/id", hreflang: "id" },
    { href: "https://sylvaur.cn/de", hreflang: "de" },
    { href: "https://sylvaur.cn/fr", hreflang: "fr" },
    { href: "https://sylvaur.cn/es", hreflang: "es" },
  ],
  additionalPaths: async () => {
    const locales = ["en", "zh", "vi", "th", "id", "de", "fr", "es"];
    const staticPages = [
      "",
      "/about",
      "/contact",
      "/certifications",
      "/products",
      "/products/pillows",
      "/products/scarves",
    ];
    const products = [
      { category: "pillows", slugs: ["classic-cotton-pillow", "linen-decorative-cushion"] },
      { category: "scarves", slugs: ["silk-square-scarf", "cotton-blend-wrap"] },
    ];

    const paths = [];
    for (const locale of locales) {
      for (const page of staticPages) {
        paths.push({ loc: `/${locale}${page}`, lastmod: new Date().toISOString() });
      }
      for (const cat of products) {
        for (const slug of cat.slugs) {
          paths.push({
            loc: `/${locale}/products/${cat.category}/${slug}`,
            lastmod: new Date().toISOString(),
          });
        }
      }
    }
    return paths;
  },
};
