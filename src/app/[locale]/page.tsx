import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import ProductCategories from "@/components/home/ProductCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TrustSection from "@/components/home/TrustSection";
import CTASection from "@/components/home/CTASection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ProductCategories />
      <FeaturedProducts />
      <TrustSection />
      <CTASection />
    </>
  );
}
