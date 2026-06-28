import { setRequestLocale, getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getAllProductSlugs, getProductImages, localizeProduct, type ProductFrontmatter } from "@/lib/products";
import { ProductSchema } from "@/components/shared/JsonLd";
import ImageGallery from "@/components/product/ImageGallery";

type Props = {
  params: Promise<{
    locale: string;
    category: "pillows" | "scarves";
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllProductSlugs().map(({ slug, category }) => ({
    category,
    slug,
    // locale will be combined by next-intl
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const product = getProduct(slug, category);

  if (!product) {
    const t = await getTranslations("pages");
    return { title: t("notFound.title") };
  }

  const fm = product.frontmatter;
  const imgs = getProductImages(slug, category, fm.images);
  return {
    title: fm.seoTitle || fm.name,
    description: fm.seoDescription,
    keywords: fm.seoKeywords,
    openGraph: {
      title: fm.name,
      description: fm.seoDescription,
      images: imgs.length > 0 ? [{ url: imgs[0], width: 1200, height: 630 }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");
  const currentLocale = await getLocale();

  const product = getProduct(slug, category);

  if (!product) {
    notFound();
  }

  const fm = localizeProduct(product.frontmatter, locale);
  const imgs = getProductImages(slug, category, product.frontmatter.images);

  return (
    <>
      <ProductSchema product={product.frontmatter} images={imgs} />
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted mb-8">
            <a href={`/${currentLocale}`} className="hover:text-brand-coral transition-colors">
              {t("breadcrumbHome")}
            </a>
            <span className="mx-2">/</span>
            <a
              href={`/${currentLocale}/products/${category}`}
              className="hover:text-brand-coral transition-colors"
            >
              {t(category)}
            </a>
            <span className="mx-2">/</span>
            <span className="text-brand-navy">{fm.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images — client component with thumbnail swapping */}
            <ImageGallery images={imgs} productName={fm.name} />

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-brand-navy mb-4">{fm.name}</h1>
              <p className="text-muted leading-relaxed mb-8">{fm.description}</p>

              {/* Specifications */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-brand-navy mb-4">
                  {t("specifications")}
                </h2>
                <div className="bg-brand-beige rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted">{t("material")}</span>
                      <p className="font-medium text-brand-navy">{fm.material}</p>
                    </div>
                    <div>
                      <span className="text-muted">{t("size")}</span>
                      <p className="font-medium text-brand-navy">{fm.size}</p>
                    </div>
                    <div>
                      <span className="text-muted">{t("color")}</span>
                      <p className="font-medium text-brand-navy">{fm.color}</p>
                    </div>
                    <div>
                      <span className="text-muted">{t("moq")}</span>
                      <p className="font-medium text-brand-navy">{fm.moq}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customization */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-brand-navy mb-4">
                  {t("customization")}
                </h2>
                <p className="text-muted leading-relaxed text-sm">{fm.customization}</p>
                <p className="text-brand-coral text-sm mt-3 font-medium">💡 {t("negotiable")}</p>
              </div>

              {/* CTA Button */}
              <a
                href={`/${currentLocale}/contact`}
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-brand-coral text-white font-semibold rounded-lg hover:bg-brand-coral/90 transition-colors shadow-lg"
              >
                {t("inquiry")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
