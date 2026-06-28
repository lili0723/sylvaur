import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { COMPANY, SITE_URL } from "@/lib/constants";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default:
        locale === "zh"
          ? "Sylvaur — 优质家居纺织品与时尚配件"
          : "Sylvaur — Premium Home Textiles & Fashion Accessories",
      template: `%s | ${COMPANY.shortName}`,
    },
    description:
      "Sylvaur — your sourcing partner for premium throw pillows and fashion scarves in China's textile hub. OEM/ODM, low MOQ, worldwide export.",
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      siteName: COMPANY.shortName,
      images: [{ url: "/images/og/og-home.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/images/og/og-home.jpg"],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        zh: "/zh",
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </div>
    </NextIntlClientProvider>
  );
}
