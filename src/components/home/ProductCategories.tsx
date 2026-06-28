import { getTranslations, getLocale } from "next-intl/server";

export default async function ProductCategories() {
  const t = await getTranslations("home.categories");
  const locale = await getLocale();

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Home Series — Pillows */}
          <div className="group relative bg-brand-beige rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/pillows/classic-cotton-pillow/1.png"
                alt={t("pillowsTitle")}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-navy mb-2">
                {t("pillowsTitle")}
              </h3>
              <p className="text-muted mb-4 leading-relaxed">{t("pillowsDesc")}</p>
              <a
                href={`/${locale}/products/pillows`}
                className="inline-flex items-center gap-2 text-brand-coral font-semibold hover:text-brand-coral/80 transition-colors"
              >
                {t("viewMore")}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Fashion Accessories — Scarves */}
          <div className="group relative bg-brand-beige rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/scarves/silk-square-scarf/1.png"
                alt={t("scarvesTitle")}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-navy mb-2">
                {t("scarvesTitle")}
              </h3>
              <p className="text-muted mb-4 leading-relaxed">{t("scarvesDesc")}</p>
              <a
                href={`/${locale}/products/scarves`}
                className="inline-flex items-center gap-2 text-brand-coral font-semibold hover:text-brand-coral/80 transition-colors"
              >
                {t("viewMore")}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
