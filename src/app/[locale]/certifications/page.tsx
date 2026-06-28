import { setRequestLocale, getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Shield, Leaf, FileCheck, FlaskConical } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return {
    title: t("certifications.title"),
    description: t("certifications.description"),
  };
}

const CERT_ICONS = [Shield, Leaf, FileCheck, FlaskConical];

export default async function CertificationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("certifications");
  const currentLocale = await getLocale();

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {([
            { nameKey: "items.0.name" as const, descKey: "items.0.desc" as const },
            { nameKey: "items.1.name" as const, descKey: "items.1.desc" as const },
            { nameKey: "items.2.name" as const, descKey: "items.2.desc" as const },
            { nameKey: "items.3.name" as const, descKey: "items.3.desc" as const },
          ] as const).map((item, index) => {
            const Icon = CERT_ICONS[index];
            return (
              <div
                key={index}
                className="bg-white border border-zinc-200 rounded-2xl p-8 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 mb-4 rounded-xl bg-brand-coral/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-brand-coral" />
                </div>
                <h3 className="text-xl font-semibold text-brand-navy mb-2">
                  {t(item.nameKey)}
                </h3>
                <p className="text-muted leading-relaxed">
                  {t(item.descKey)}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted mb-6">{t("ctaText")}</p>
          <a
            href={`/${currentLocale}/contact`}
            className="inline-flex items-center px-6 py-3 bg-brand-coral text-white font-semibold rounded-lg hover:bg-brand-coral/90 transition-colors"
          >
            {t("ctaButton")}
          </a>
        </div>
      </div>
    </div>
  );
}
