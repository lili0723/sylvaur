import { getTranslations, getLocale } from "next-intl/server";

export default async function CTASection() {
  const t = await getTranslations("home");
  const locale = await getLocale();

  return (
    <section className="py-16 sm:py-20 bg-brand-navy">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          {t("ctaBottomTitle")}
        </h2>
        <p className="text-lg text-white/70 mb-8">{t("ctaBottomDesc")}</p>
        <a
          href={`/${locale}/contact`}
          className="inline-flex items-center justify-center px-8 py-3 bg-brand-coral text-white font-semibold rounded-lg hover:bg-brand-coral/90 transition-colors shadow-lg"
        >
          {t("ctaBottomButton")}
        </a>
      </div>
    </section>
  );
}
