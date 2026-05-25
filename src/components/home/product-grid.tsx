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
        {/*
          asastr DNA — 12-kolon split layout:
          - sol 5 kolon: sticky başlık + açıklama (scroll boyunca sabit)
          - sağ 7 kolon: ürün kartları akar
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Sticky tarafı */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                Ürünlerimiz
              </div>
              <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.05]">
                Her yüke, her kapıya bir çözüm.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
                Standart üretimin ötesinde, ölçü ve kapasite olarak sahaya göre
                uyarlanabilen yükleme ve dikey transfer çözümleri.
              </p>
              <Link
                href="/urunler"
                className="group mt-8 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-[var(--brand-orange)] transition-colors"
              >
                Tüm ürünleri gör
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              {/* Stats mini */}
              <div className="mt-12 hidden lg:grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div className="border-l-2 border-[var(--brand-orange)]/50 pl-3">
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Kategori
                  </div>
                  <div className="text-lg font-heading font-semibold">
                    {items.length} tip
                  </div>
                </div>
                <div className="border-l-2 border-[var(--brand-orange)]/50 pl-3">
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Kapasite
                  </div>
                  <div className="text-lg font-heading font-semibold">
                    6 – 20 ton
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Akan kartlar */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={reduce ? false : { y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.04 }}
              >
                <Link
                  href={`/urunler/${p.slug}`}
                  className="group flex items-stretch gap-0 rounded-2xl border border-border bg-card hover:bg-card hover:border-[var(--brand-orange)]/40 transition-all relative overflow-hidden"
                >
                  {p.image ? (
                    <div className="relative w-32 sm:w-48 shrink-0 overflow-hidden bg-[var(--brand-paper)]">
                      <SanityImage
                        image={p.image}
                        fill
                        sizes="(max-width: 640px) 128px, 192px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    </div>
                  ) : (
                    <div className="relative w-24 sm:w-32 shrink-0 flex items-center justify-center bg-[var(--brand-paper)] border-r border-border">
                      <div className="text-3xl sm:text-4xl font-heading font-bold text-muted-foreground/40 tabular-nums">
                        0{p.order}
                      </div>
                    </div>
                  )}

                  <div className="flex-1 p-5 sm:p-6 relative">
                    <div className="absolute -top-12 -right-12 size-48 rounded-full bg-[var(--brand-orange)]/0 group-hover:bg-[var(--brand-orange)]/10 blur-2xl transition-all duration-500" />

                    <div className="relative flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        {p.image && (
                          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
                            0{p.order} · ÜRÜN
                          </div>
                        )}
                        <h3 className="text-lg sm:text-xl font-heading font-semibold tracking-tight group-hover:text-[var(--brand-orange)] transition-colors leading-tight">
                          {p.shortName}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                          {p.tagline}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.capacities.slice(0, 4).map((c) => (
                            <span
                              key={c}
                              className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-border bg-background text-foreground/70"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="shrink-0 mt-1">
                        <div className="inline-flex items-center justify-center size-10 rounded-full border border-border bg-background text-foreground/70 group-hover:border-[var(--brand-orange)] group-hover:bg-[var(--brand-orange)] group-hover:text-white transition-all">
                          <ArrowUpRight
                            size={16}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
