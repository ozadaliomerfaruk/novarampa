import type { Metadata } from "next";
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

        <section className="container-wide pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customerSegments.map((s) => (
              <Link
                key={s.slug}
                href={`/cozumler/${s.slug}`}
                className="group block p-8 rounded-2xl border border-border bg-card hover:bg-card/80 hover:border-[var(--brand-orange)]/40 transition-all relative overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 size-56 rounded-full bg-[var(--brand-orange)]/0 group-hover:bg-[var(--brand-orange)]/10 blur-3xl transition-all duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      Segment Payı
                    </div>
                    <div className="text-xs font-mono text-[var(--brand-orange)]">
                      ~%{s.share}
                    </div>
                  </div>
                  <h3 className="mt-4 text-2xl font-heading font-semibold tracking-tight group-hover:text-[var(--brand-orange)] transition-colors">
                    {s.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                    {s.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground/80 group-hover:text-[var(--brand-orange)] transition-colors">
                    Çözümü incele
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
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
