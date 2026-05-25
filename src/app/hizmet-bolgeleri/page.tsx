import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { CtaSection } from "@/components/home/cta-section";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { serviceCities, serviceCoverageNote } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Hizmet Bölgeleri — Marmara ve Türkiye Geneli",
  description:
    "İstanbul, Kocaeli, Bursa, Tekirdağ başta olmak üzere Marmara'nın tüm illerine montajlı sevkiyat. Türkiye genelinde ürün gönderimi.",
  alternates: { canonical: `${siteConfig.url}/hizmet-bolgeleri` },
};

export default function HizmetBolgeleriPage() {
  const primary = serviceCities.filter((c) => c.priority === "primary");
  const secondary = serviceCities.filter((c) => c.priority === "secondary");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Hizmet Bölgeleri", url: `${siteConfig.url}/hizmet-bolgeleri` },
        ]}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Hizmet Bölgeleri" }]} />

        <section className="container-wide py-12">
          <SectionHeader
            eyebrow="Hizmet Bölgeleri"
            title="Marmara öncelikli, Türkiye geneli."
            description={serviceCoverageNote}
          />
        </section>

        <section className="container-wide pb-12">
          <h2 className="text-xl font-heading font-semibold mb-6">
            Öncelikli Bölgeler (Montaj + Servis)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {primary.map((c) => (
              <Link
                key={c.slug}
                href={`/hizmet-bolgeleri/${c.slug}`}
                className="group block p-6 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <MapPin
                    size={20}
                    className="text-[var(--brand-orange)]"
                  />
                  <ArrowUpRight
                    size={16}
                    className="text-muted-foreground group-hover:text-[var(--brand-orange)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                <h3 className="mt-5 text-xl font-heading font-semibold group-hover:text-[var(--brand-orange)] transition-colors">
                  {c.name}
                </h3>
                {c.industrialZones && (
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                    {c.industrialZones.join(", ")}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>

        <section className="container-wide pb-12">
          <h2 className="text-xl font-heading font-semibold mb-6">
            Diğer Marmara İlleri
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {secondary.map((c) => (
              <Link
                key={c.slug}
                href={`/hizmet-bolgeleri/${c.slug}`}
                className="group p-4 rounded-xl border border-border bg-card hover:border-[var(--brand-orange)]/40 transition-colors text-center"
              >
                <div className="text-base font-heading font-semibold group-hover:text-[var(--brand-orange)] transition-colors">
                  {c.name}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="container-wide pb-20">
          <div className="rounded-3xl border border-[var(--brand-orange)]/30 bg-gradient-to-br from-[var(--brand-orange)]/10 to-transparent p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight max-w-2xl mx-auto">
              Marmara dışı misiniz?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Türkiye&apos;nin her noktasına ürün sevkiyatı yapıyoruz. Montaj
              için ekip yönlendirebilir veya tarafınızdan montaj için detaylı
              rehberlik sağlayabiliriz.
            </p>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
