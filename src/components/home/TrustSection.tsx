import { getTranslations } from "next-intl/server";
import { Shield, Truck, PenTool, Award } from "lucide-react";

const ICON_MAP = [Shield, PenTool, Award, Truck];

export default async function TrustSection() {
  const t = await getTranslations("home");

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-3">
            {t("trustTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {([
            { titleKey: "trustItems.0.title" as const, descKey: "trustItems.0.desc" as const },
            { titleKey: "trustItems.1.title" as const, descKey: "trustItems.1.desc" as const },
            { titleKey: "trustItems.2.title" as const, descKey: "trustItems.2.desc" as const },
            { titleKey: "trustItems.3.title" as const, descKey: "trustItems.3.desc" as const },
          ] as const).map((item, index) => {
            const Icon = ICON_MAP[index];
            return (
              <div key={index} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-brand-coral/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-brand-coral" />
                </div>
                <h3 className="font-semibold text-brand-navy mb-2">{t(item.titleKey)}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t(item.descKey)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Certifications bar */}
        <div className="mt-14 pt-10 border-t border-zinc-200">
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <span className="text-sm font-semibold text-brand-navy uppercase tracking-wider">
              ISO 9001:2015
            </span>
            <span className="text-sm font-semibold text-brand-navy uppercase tracking-wider">
              OEKO-TEX Standard 100
            </span>
            <span className="text-sm font-semibold text-brand-navy uppercase tracking-wider">
              CE Certified
            </span>
            <span className="text-sm font-semibold text-brand-navy uppercase tracking-wider">
              SGS Tested
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
