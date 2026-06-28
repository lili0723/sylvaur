import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return {
    title: t("products.title"),
    description: t("products.description"),
  };
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");

  const categories = [
    {
      key: "pillows",
      href: "/products/pillows",
      label: t("pillows"),
      desc: t("categoryDesc.pillows"),
      img: "/images/pillows/classic-cotton-pillow/1.png",
    },
    {
      key: "scarves",
      href: "/products/scarves",
      label: t("scarves"),
      desc: t("categoryDesc.scarves"),
      img: "/images/scarves/silk-square-scarf/1.png",
    },
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-8 text-center">
          {t("title")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <a
              key={cat.key}
              href={cat.href}
              className="group bg-brand-beige rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-coral transition-colors">
                  {cat.label}
                </h2>
                <p className="text-muted text-sm leading-relaxed">{cat.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
