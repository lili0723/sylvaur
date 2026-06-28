import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { OrganizationSchema } from "@/components/shared/JsonLd";
import { Search, ClipboardCheck, Truck, MessageCircle } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return {
    title: t("about.title"),
    description: t("about.description"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const st = await getTranslations("about.services");

  const stats = [
    { labelKey: "stats.0.label" as const, valueKey: "stats.0.value" as const },
    { labelKey: "stats.1.label" as const, valueKey: "stats.1.value" as const },
    { labelKey: "stats.2.label" as const, valueKey: "stats.2.value" as const },
    { labelKey: "stats.3.label" as const, valueKey: "stats.3.value" as const },
  ];

  return (
    <>
      <OrganizationSchema />
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

          {/* Intro */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-muted leading-relaxed">{t("intro")}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-brand-beige rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-brand-coral mb-1">
                  {t(stat.valueKey)}
                </div>
                <div className="text-sm text-muted">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>

          {/* How We Work — 4 service cards */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-brand-navy mb-8 text-center">
              {t("factory")}
            </h2>
            <p className="text-muted text-center max-w-2xl mx-auto mb-10">
              {t("factoryDesc")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Search, key: "source" as const },
                { icon: ClipboardCheck, key: "inspect" as const },
                { icon: Truck, key: "ship" as const },
                { icon: MessageCircle, key: "support" as const },
              ].map(({ icon: Icon, key }) => (
                <div key={key} className="bg-white border-2 border-brand-beige hover:border-brand-coral/30 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-coral/15 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brand-coral" />
                  </div>
                  <h3 className="font-semibold text-brand-navy mb-2">{st(key + ".title" as Parameters<typeof st>[0])}</h3>
                  <p className="text-sm text-muted">{st(key + ".desc" as Parameters<typeof st>[0])}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team — text only */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-2xl font-bold text-brand-navy mb-4">
              {t("team")}
            </h2>
            <p className="text-muted leading-relaxed">{t("teamDesc")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
