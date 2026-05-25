"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { productCategories } from "@/lib/products";

export function ProductGrid() {
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
          {productCategories.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={`/urunler/${p.slug}`}
                className="group block h-full rounded-2xl border border-border bg-card hover:bg-card/80 hover:border-[var(--brand-orange)]/40 transition-all p-6 relative overflow-hidden"
              >
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
