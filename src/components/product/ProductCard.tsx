import { getProductImages, type ProductFrontmatter } from "@/lib/products";

interface ProductCardProps {
  product: ProductFrontmatter;
  href: string;
}

export default function ProductCard({ product, href }: ProductCardProps) {
  const img = getProductImages(product.slug, product.category, product.images)[0];

  return (
    <a
      href={href}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
      <div className="w-full h-52 sm:h-56 lg:h-64 overflow-hidden bg-white">
        <img
          src={img}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 min-h-[4.5rem]">
        <h3 className="font-semibold text-brand-navy group-hover:text-brand-coral transition-colors text-sm line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-muted mt-1 line-clamp-1">
          {product.material} | MOQ: {product.moq}
        </p>
      </div>
    </a>
  );
}
