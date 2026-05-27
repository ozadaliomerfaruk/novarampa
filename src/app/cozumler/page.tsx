import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { CtaSection } from "@/components/home/cta-section";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { customerSegments } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sektörel Çözümler — Yükleme Rampası",
  description:
    "Lojistik, fabrika, soğuk hava deposu, müteahhit, perakende ve küçük işletmeler için sektöre özel rampa çözümleri.",
  alternates: { canonical: `${siteConfig.url}/cozumler` },
};

/**
 * Roni.com /industries DNA: her segment için thematic foto + gradient overlay.
 * Unsplash industrial stockları — Eren kendi foto/case studies ekleyince
 * Sanity'den override edilir (gelecek iyileştirme).
 */
const segmentMedia: Record<string, string> = {
  "lojistik-depo":
    "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=85&auto=format&fit=crop",
  "fabrika-sanayi":
    "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=85&auto=format&fit=crop",
  "muteahhit-proje":
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=85&auto=format&fit=crop",
  "soguk-hava-gida":
    "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=85&auto=format&fit=crop",
  "supermarket-perakende":
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=85&auto=format&fit=crop",
  "kucuk-isletme":
    "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=85&auto=format&fit=crop",
};

export default function CozumlerPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Çözümler", url: `${siteConfig.url}/cozumler` },
        ]}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Çözümler" }]} />

        <section className="container-wide py-12">
          <SectionHeader
            eyebrow="Çözümler"
            title="Her sektörün kendine özel rampası."
            description="Lojistik depodan soğuk hava deposuna, fabrika girişinden inşaat sahasına — sektörünüze göre kapasitesi, ölçüsü ve montajı şekillenen rampa çözümlerimiz."
          />
        </section>

        {/* Fotolu industries grid — RonI DNA */}
        <section className="container-wide pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customerSegments.map((s) => (
              <Link
                key={s.slug}
                href={`/cozumler/${s.slug}`}
                className="group relative block aspect-[5/6] rounded-2xl overflow-hidden border border-border bg-card hover:border-[var(--brand-orange)]/40 transition-colors"
              >
                {/* Foto */}
                <Image
                  src={segmentMedia[s.slug] || segmentMedia["lojistik-depo"]}
                  alt={s.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy-dark)] via-[var(--brand-navy-dark)]/40 to-transparent" />

                {/* Üst meta */}
                <div className="absolute inset-x-0 top-0 p-6 flex items-start justify-between">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[10px] font-mono uppercase tracking-widest text-white">
                    <span className="size-1.5 rounded-full bg-[var(--brand-orange)]" />
                    ~%{s.share}
                  </div>
                  <div className="inline-flex items-center justify-center size-9 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white group-hover:bg-[var(--brand-orange)] group-hover:border-[var(--brand-orange)] transition-all">
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>

                {/* Alt içerik */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-heading font-bold leading-tight tracking-tight">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/80 line-clamp-2 leading-relaxed">
                    {s.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-[var(--brand-orange)] group-hover:gap-2 transition-all">
                    Çözümü incele
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-xs text-muted-foreground italic max-w-2xl">
            ℹ️ Yukarıdaki görseller temsili stok görsellerdir. Saha
            fotoğraflarımız yakın zamanda eklenecektir.
          </p>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
