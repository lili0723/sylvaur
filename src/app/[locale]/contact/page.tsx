import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";
import ContactForm from "@/components/contact/ContactForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return {
    title: t("contact.title"),
    description: t("contact.description"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-8">
            {/* WhatsApp — shown only when number is configured */}
            {(COMPANY.whatsapp as string).length > 0 && (
            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="font-semibold text-brand-navy mb-3 flex items-center gap-2">
                <span>💬</span> {t("whatsapp")}
              </h3>
              <a
                href={`https://wa.me/${(COMPANY.whatsapp as string).replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
              >
                Chat Now: {COMPANY.whatsapp}
              </a>
              <p className="text-sm text-muted mt-3">{t("responseTime")}</p>
            </div>
            )}

            {/* Email */}
            <div className="bg-brand-beige rounded-2xl p-6">
              <h3 className="font-semibold text-brand-navy mb-3 flex items-center gap-2">
                <span>✉️</span> {t("email")}
              </h3>
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-brand-coral font-medium hover:underline"
              >
                {COMPANY.email}
              </a>
            </div>

            {/* Address */}
            <div className="bg-brand-beige rounded-2xl p-6">
              <h3 className="font-semibold text-brand-navy mb-3 flex items-center gap-2">
                <span>📍</span> {t("address")}
              </h3>
              <p className="text-muted text-sm">{COMPANY.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
