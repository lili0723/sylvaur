import { COMPANY, SITE_URL } from "@/lib/constants";
import type { ProductFrontmatter } from "@/lib/products";

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: COMPANY.name,
          url: SITE_URL,
          logo: `${SITE_URL}/logo.svg`,
          contactPoint: {
            "@type": "ContactPoint",
            telephone: COMPANY.whatsapp,
            contactType: "sales",
            availableLanguage: ["English", "Chinese"],
          },
          sameAs: [
            "https://www.linkedin.com/company/xxx",
            "https://www.facebook.com/xxx",
            "https://www.instagram.com/xxx",
            "https://twitter.com/xxx",
          ],
        }),
      }}
    />
  );
}

export function ProductSchema({
  product,
  images,
}: {
  product: ProductFrontmatter;
  images: string[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: images,
          description: product.description,
          brand: {
            "@type": "Brand",
            name: COMPANY.shortName,
          },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            businessFunction:
              "https://purl.org/goodrelations/v1#ProvideService",
          },
        }),
      }}
    />
  );
}

export function BreadcrumbListSchema({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: `${SITE_URL}${item.href}`,
          })),
        }),
      }}
    />
  );
}
