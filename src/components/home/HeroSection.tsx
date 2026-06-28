import { getTranslations, getLocale } from "next-intl/server";

export default async function HeroSection() {
  const t = await getTranslations("home");
  const locale = await getLocale();

  return (
    <section className="relative bg-brand-navy overflow-hidden">
      {/* Background overlay — lighter so image shows through */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/70 via-brand-navy/40 to-brand-navy/20 z-10" />

      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/1.png"
          alt="Home textiles and fashion accessories showcase"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {t("heroTitle")}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-3 bg-brand-coral text-white font-semibold rounded-lg hover:bg-brand-coral/90 transition-colors shadow-lg text-center"
            >
              {t("ctaQuote")}
            </a>
            <a
              href={`/${locale}/products`}
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center"
            >
              {t("ctaExplore")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
