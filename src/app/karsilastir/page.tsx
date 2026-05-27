import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaSection } from "@/components/home/cta-section";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { siteConfig } from "@/lib/site-config";
import { comparisons } from "@/lib/comparisons";

export const metadata: Metadata = {
  title: "Ürün Karşılaştırma — Hangi Yükleme Rampası Size Uygun?",
  description:
    "Menteşeli, teleskopik, dikey, mobil, makaslı: ürün karşılaştırmaları ile sahanız için doğru çözümü bulun. Kullanım senaryosu, kapasite ve fiyat değerlendirmesi.",
  alternates: { canonical: `${siteConfig.url}/karsilastir` },
};

export default function KarsilastirPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Karşılaştırma", url: `${siteConfig.url}/karsilastir` },
        ]}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Karşılaştırma" }]} />

        <section className="container-wide py-12">
          <div className="max-w-3xl">
            <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
              Karşılaştırma
            </div>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.05]">
              Hangi rampa
              <br />
              <span className="text-gradient-orange">size uygun?</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Karar verirken hangi modeli seçmeniz gerektiğine dair net
              karşılaştırmalar. Hangi durumda hangisini öneriyoruz, kullanım
              senaryosu, kapasite ve maliyet farkları.
            </p>
          </div>
        </section>

        <section className="container-wide pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/karsilastir/${c.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-[var(--brand-orange)]/40 hover:bg-card/80"
              >
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
                  {c.shortTitle}
                </div>
                <h2 className="mt-3 text-2xl font-heading font-bold leading-tight group-hover:text-[var(--brand-orange)] transition-colors">
                  {c.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {c.intro}
                </p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-orange)]">
                  Karşılaştırmayı oku
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
