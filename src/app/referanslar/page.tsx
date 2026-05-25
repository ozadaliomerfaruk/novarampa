import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaSection } from "@/components/home/cta-section";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { referenceCompanies, totalProjectsApprox } from "@/lib/references";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Referanslar — Türkiye'nin Önde Gelen Markaları",
  description: `Arçelik, Şişecam, Hayat Kimya, Roketsan, THY ve daha pek çok kurumun yükleme rampası tedarikçisi. ${totalProjectsApprox} teslim.`,
  alternates: { canonical: `${siteConfig.url}/referanslar` },
};

export default function ReferanslarPage() {
  const featured = referenceCompanies.filter((c) => c.featured);
  const others = referenceCompanies.filter((c) => !c.featured);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Referanslar", url: `${siteConfig.url}/referanslar` },
        ]}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Referanslar" }]} />

        <section className="container-wide py-12">
          <div className="max-w-3xl">
            <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
              Referanslar
            </div>
            <h1 className="mt-3 text-5xl sm:text-6xl font-heading font-bold tracking-tight">
              Türkiye&apos;nin yükünü taşıyan firmalar,
              <br />
              <span className="text-gradient-orange">bizi tercih ediyor.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {totalProjectsApprox} aşkın proje teslim ettiğimiz, sanayinin farklı
              dallarından kurumsal firmalardan bazıları.
            </p>
          </div>
        </section>

        <section className="container-wide pb-20">
          <h2 className="text-2xl font-heading font-semibold mb-6">
            Öne Çıkan Referanslarımız
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {featured.map((c) => (
              <div
                key={c.name}
                className="p-6 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/30 transition-colors text-center"
              >
                <div className="text-base font-heading font-semibold">
                  {c.name.replace(/\(.*\)/, "").trim()}
                </div>
                {c.sector && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    {c.sector}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="container-wide pb-20">
          <h2 className="text-2xl font-heading font-semibold mb-6">
            Diğer Referanslar
          </h2>
          <div className="flex flex-wrap gap-2">
            {others.map((c) => (
              <span
                key={c.name}
                className="text-sm font-medium px-3 py-1.5 rounded-full border border-border bg-card text-foreground/80 hover:border-[var(--brand-orange)]/30 hover:text-foreground transition-colors"
              >
                {c.name.replace(/\(.*\)/, "").trim()}
              </span>
            ))}
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
