import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export interface ProductFrontmatter {
  name: string;
  slug: string;
  category: "pillows" | "scarves";
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  images: number;
  material: string;
  size: string;
  color: string;
  moq: string;
  highlight?: string;
  customization: string;
  description: string;
  [key: string]: unknown; // Allow _zh, _vi, _th etc. locale fields
}

const LOCALIZED_FIELDS = ["name", "material", "size", "color", "moq", "customization", "description", "highlight"] as const;

/** Resolve localized frontmatter fields — locale match → en default */
export function localizeProduct(fm: ProductFrontmatter, locale: string) {
  const result = { ...fm } as Record<string, unknown>;
  for (const field of LOCALIZED_FIELDS) {
    const enVal = fm[field as keyof ProductFrontmatter];
    const localeVal = fm[`${field}_${locale}`];
    result[field] = (typeof localeVal === "string" && localeVal) || enVal;
  }
  return result as unknown as ProductFrontmatter;
}

/** Auto-generate image paths from slug + count */
export function getProductImages(
  slug: string,
  category: "pillows" | "scarves",
  count: number
): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/images/${category}/${slug}/${i + 1}.png`
  );
}

export interface Product {
  frontmatter: ProductFrontmatter;
  content: string;
}

const CONTENT_DIR = join(process.cwd(), "content", "products");

export function getProducts(category?: "pillows" | "scarves"): Product[] {
  const baseDir = category ? join(CONTENT_DIR, category) : CONTENT_DIR;
  const products: Product[] = [];

  try {
    const entries = readdirSync(baseDir, { withFileTypes: true });

    if (category) {
      // Reading files from a specific category directory
      for (const entry of entries) {
        if (entry.isFile() && entry.name.endsWith(".mdx")) {
          const filePath = join(baseDir, entry.name);
          const raw = readFileSync(filePath, "utf-8");
          const { data, content } = matter(raw);
          products.push({
            frontmatter: data as ProductFrontmatter,
            content,
          });
        }
      }
    } else {
      // Reading from both category subdirectories
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const subdir = join(baseDir, entry.name);
          const files = readdirSync(subdir).filter((f) => f.endsWith(".mdx"));
          for (const file of files) {
            const filePath = join(subdir, file);
            const raw = readFileSync(filePath, "utf-8");
            const { data, content } = matter(raw);
            products.push({
              frontmatter: data as ProductFrontmatter,
              content,
            });
          }
        }
      }
    }
  } catch {
    // Content directory doesn't exist yet — return empty array
    return [];
  }

  return products;
}

export function getProduct(
  slug: string,
  category: "pillows" | "scarves"
): Product | null {
  try {
    const filePath = join(CONTENT_DIR, category, `${slug}.mdx`);
    const raw = readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    return {
      frontmatter: data as ProductFrontmatter,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllProductSlugs(): {
  slug: string;
  category: "pillows" | "scarves";
}[] {
  const slugs: { slug: string; category: "pillows" | "scarves" }[] = [];
  const categories = ["pillows", "scarves"] as const;

  for (const cat of categories) {
    const dir = join(CONTENT_DIR, cat);
    try {
      const files = readdirSync(dir).filter((f) => f.endsWith(".mdx"));
      for (const file of files) {
        slugs.push({
          slug: file.replace(".mdx", ""),
          category: cat,
        });
      }
    } catch {
      // Directory doesn't exist yet
    }
  }

  return slugs;
}
