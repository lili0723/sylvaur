import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ProductCard from "@/components/product/ProductCard";
import { getProducts, localizeProduct } from "@/lib/products";
import type { Locale } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return {
    title: t("pillows.title"),
    description: t("pillows.description"),
  };
}

export default async function PillowsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");

  const products = getProducts("pillows").filter(p => p.frontmatter?.slug).map((p) => ({
    ...p,
    frontmatter: localizeProduct(p.frontmatter, locale),
  }));

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Hero */}
        <div className="bg-brand-beige rounded-2xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4">
                {t("pillows")}
              </h1>
              <p className="text-muted leading-relaxed text-lg">
                {t("categoryDesc.pillows")}
              </p>
            </div>
            <div className="hidden sm:block h-64 lg:h-[500px] overflow-hidden">
              <img
                src="/images/pillows/classic-cotton-pillow/1.png"
                alt={t("pillows")}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p.frontmatter.slug}
                product={p.frontmatter}
                href={`/${locale}/products/pillows/${p.frontmatter.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted text-lg">{t("noProducts")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
