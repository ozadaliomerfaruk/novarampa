import Link from "next/link";
import { ArrowUpRight, Package } from "lucide-react";
import { SanityImage } from "@/components/sanity/sanity-image";
import type { ProductSummary } from "@/sanity/lib/types";
export function ProductCards({
  products,
  home = false,
}: {
  products: ProductSummary[];
  home?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((p) => (
        <Link
          key={p._id}
          href={"/urunler/" + p.slug.current}
          className="group block overflow-hidden rounded-2xl border-2 border-border bg-card transition-colors hover:border-brand-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-brand-paper">
            {p.mainImage ? (
              <SanityImage
                image={p.mainImage}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <Package size={64} strokeWidth={1} aria-hidden="true" />
                <span className="sr-only">{p.name}</span>
              </div>
            )}
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl sm:text-3xl font-heading font-semibold leading-tight group-hover:text-brand-orange">
                {p.shortName || p.name}
              </h3>
              <ArrowUpRight
                className="mt-1 shrink-0 text-brand-orange"
                size={26}
              />
            </div>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {home
                ? p.shortDescription || p.tagline
                : p.tagline || p.shortDescription}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
