"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { productCategories, type ProductCategory } from "@/lib/products";
import { SanityImage } from "@/components/sanity/sanity-image";
import type { ProductSummary } from "@/sanity/lib/types";

type Props = {
  /** Sanity'den gelen ürünler. Boş veya null ise statik config gösterilir. */
  sanityProducts?: ProductSummary[] | null;
};

type Item = {
  slug: string;
  shortName: string;
  tagline: string;
  capacities: string[];
  order: number;
  image: ProductSummary["mainImage"] | null;
};

function toItems(sanity: ProductSummary[] | null | undefined): Item[] {
  if (sanity && sanity.length > 0) {
    return sanity.map((p, i) => ({
      slug: p.slug?.current ?? "",
      shortName: p.shortName ?? p.name,
      tagline: p.tagline ?? p.shortDescription ?? "",
      capacities: p.capacities ?? [],
      order: i + 1,
      image: p.mainImage ?? null,
    }));
  }
  return productCategories.map((p: ProductCategory) => ({
    slug: p.slug,
    shortName: p.shortName,
    tagline: p.tagline,
    capacities: p.capacities,
    order: p.order,
    image: null,
  }));
}

export function ProductGrid({ sanityProducts }: Props) {
  const reduce = useReducedMotion();
  const items = toItems(sanityProducts);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
              Ürünlerimiz
            </div>
            <h2 className="mt-3 text-4xl sm:text-5xl font-heading font-bold tracking-tight">
              Her yüke, her kapıya bir çözüm.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Standart üretimin ötesinde, ölçü ve kapasite olarak sahaya göre uyarlanabilen
              yükleme ve dikey transfer çözümleri.
            </p>
          </div>
          <Link
            href="/urunler"
            className="group inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-[var(--brand-orange)] transition-colors"
          >
            Tüm ürünleri gör
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={reduce ? false : { y: 16 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <Link
                href={`/urunler/${p.slug}`}
                className="group block h-full rounded-2xl border border-border bg-card hover:bg-card/80 hover:border-[var(--brand-orange)]/40 transition-all relative overflow-hidden"
              >
                {p.image && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--brand-charcoal)]">
                    <SanityImage
                      image={p.image}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                )}
                <div className="p-6 relative">
                  <div className="absolute -top-12 -right-12 size-48 rounded-full bg-[var(--brand-orange)]/0 group-hover:bg-[var(--brand-orange)]/10 blur-2xl transition-all duration-500" />

                  <div className="relative">
                    <div className="text-xs font-mono text-muted-foreground">
                      0{p.order}.
                    </div>
                    <h3 className="mt-2 text-lg font-heading font-semibold tracking-tight group-hover:text-[var(--brand-orange)] transition-colors">
                      {p.shortName}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                      {p.tagline}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {p.capacities.slice(0, 3).map((c) => (
                        <span
                          key={c}
                          className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border border-border bg-background/60"
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground/80 group-hover:text-[var(--brand-orange)] transition-colors">
                      İncele
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
