import { getTranslations, getLocale } from "next-intl/server";
import { getProducts, getProductImages, localizeProduct } from "@/lib/products";

export default async function FeaturedProducts() {
  const t = await getTranslations("home");
  const locale = await getLocale();

  const pillows = getProducts("pillows").filter(p => p.frontmatter?.slug).slice(0, 2);
  const scarves = getProducts("scarves").filter(p => p.frontmatter?.slug).slice(0, 2);
  const featured = [...pillows, ...scarves].map((p) => ({
    ...p,
    fm: localizeProduct(p.frontmatter, locale),
  }));

  return (
    <section className="py-16 sm:py-20 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-3">
            {t("featuredTitle")}
          </h2>
          <p className="text-muted text-lg">{t("featuredSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => {
            const img = getProductImages(p.frontmatter.slug, p.frontmatter.category, p.frontmatter.images)[0];
            return (
              <a
                key={`${p.frontmatter.category}-${p.frontmatter.slug}`}
                href={`/${locale}/products/${p.frontmatter.category}/${p.frontmatter.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square overflow-hidden bg-white">
                  <img
                    src={img}
                    alt={p.fm.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-brand-navy group-hover:text-brand-coral transition-colors text-sm">
                    {p.fm.name}
                  </h3>
                  <p className="text-xs text-muted mt-1 line-clamp-2">{p.fm.highlight as string || p.fm.customization}</p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <a
            href={`/${locale}/products`}
            className="inline-flex items-center px-6 py-3 border-2 border-brand-navy text-brand-navy font-semibold rounded-lg hover:bg-brand-navy hover:text-white transition-colors"
          >
            {t("viewAll")}
          </a>
        </div>
      </div>
    </section>
  );
}
