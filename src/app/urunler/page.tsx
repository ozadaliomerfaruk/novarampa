import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { CtaSection } from "@/components/home/cta-section";
import { SanityImage } from "@/components/sanity/sanity-image";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { productCategories, capacityNote } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allProductsQuery } from "@/sanity/lib/queries";
import type { ProductSummary } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Ürünlerimiz — Yükleme Rampası ve Platform İmalatı",
  description:
    "Menteşeli, teleskopik, dikey, mobil rampa, makaslı platform, gömme rampa ve konteyner geçiş rampası. CE & TSE belgeli, EN 1398 uyumlu imalat.",
  alternates: { canonical: `${siteConfig.url}/urunler` },
};

export const revalidate = 30;

type Item = {
  slug: string;
  shortName: string;
  tagline: string;
  capacities: string[];
  order: number;
  image: ProductSummary["mainImage"] | null;
};

export default async function UrunlerPage() {
  const sanityProducts = await sanityFetch<ProductSummary[]>(
    allProductsQuery,
    {},
    { revalidate: 30 }
  );

  const items: Item[] =
    sanityProducts && sanityProducts.length > 0
      ? sanityProducts.map((p, i) => ({
          slug: p.slug?.current ?? "",
          shortName: p.shortName ?? p.name,
          tagline: p.tagline ?? p.shortDescription ?? "",
          capacities: p.capacities ?? [],
          order: i + 1,
          image: p.mainImage ?? null,
        }))
      : productCategories.map((p) => ({
          slug: p.slug,
          shortName: p.shortName,
          tagline: p.tagline,
          capacities: p.capacities,
          order: p.order,
          image: null,
        }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Ürünlerimiz", url: `${siteConfig.url}/urunler` },
        ]}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Ürünler" }]} />

        <section className="container-wide py-12">
          <SectionHeader
            eyebrow="Ürünlerimiz"
            title="Her yüke, her kapıya bir çözüm."
            description="Standart üretimin ötesinde, ölçü ve kapasite olarak sahaya göre uyarlanabilen yükleme ve dikey transfer çözümleri. Her ürün CE ve TSE belgeli, EN 1398 uyumlu olarak üretilir."
          />
        </section>

        <section className="container-wide pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p) => (
              <Link
                key={p.slug}
                href={`/urunler/${p.slug}`}
                className="group block rounded-2xl border border-border bg-card hover:bg-card/80 hover:border-[var(--brand-orange)]/40 transition-all relative overflow-hidden"
              >
                {p.image && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--brand-charcoal)]">
                    <SanityImage
                      image={p.image}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                )}
                <div className="p-6 sm:p-8 relative">
                  <div className="absolute -top-16 -right-16 size-56 rounded-full bg-[var(--brand-orange)]/0 group-hover:bg-[var(--brand-orange)]/10 blur-3xl transition-all duration-500" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono text-muted-foreground">
                        0{p.order}.
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-muted-foreground group-hover:text-[var(--brand-orange)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                    <h3 className="mt-4 text-2xl font-heading font-semibold tracking-tight group-hover:text-[var(--brand-orange)] transition-colors">
                      {p.shortName}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {p.tagline}
                    </p>

                    {p.capacities.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-border/50">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                          Kapasite
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {p.capacities.map((c) => (
                            <span
                              key={c}
                              className="text-[11px] font-mono px-2 py-0.5 rounded border border-border bg-background/60"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-xs text-muted-foreground italic max-w-2xl">
            ℹ️ {capacityNote}
          </p>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
