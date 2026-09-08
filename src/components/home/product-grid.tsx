import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductCards } from "@/components/products/product-cards";
import { isPublicProduct } from "@/lib/catalog";
import { productCategories } from "@/lib/products";
import type { ProductSummary } from "@/sanity/lib/types";
export function ProductGrid({
  sanityProducts,
}: {
  sanityProducts?: ProductSummary[] | null;
}) {
  const products = sanityProducts
    ? sanityProducts.filter(isPublicProduct)
    : productCategories.map((p) => ({
        _id: p.slug,
        name: p.name,
        shortName: p.shortName,
        slug: { _type: "slug" as const, current: p.slug },
        shortDescription: p.description,
      }));
  return (
    <section className="py-20 sm:py-28">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="section-title">Ürünlerimiz</h2>
          <p className="mt-5 text-xl text-muted-foreground">
            Her yüke bir çözüm
          </p>
          <Link
            href="/urunler"
            className="mt-6 inline-flex items-center gap-2 font-medium hover:text-brand-orange"
          >
            Tüm ürünleri gör <ArrowUpRight size={18} />
          </Link>
        </div>
        <ProductCards products={products} home />
      </div>
    </section>
  );
}
