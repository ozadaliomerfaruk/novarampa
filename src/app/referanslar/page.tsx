import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaSection } from "@/components/home/cta-section";
import { SanityImage } from "@/components/sanity/sanity-image";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { referenceCompanies, totalProjectsApprox } from "@/lib/references";
import { siteConfig } from "@/lib/site-config";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allReferencesQuery } from "@/sanity/lib/queries";
import type { ReferenceCompany } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Referanslar — Türkiye'nin Önde Gelen Markaları",
  description: `Arçelik, Şişecam, Hayat Kimya, Roketsan, THY ve daha pek çok kurumun yükleme rampası tedarikçisi. ${totalProjectsApprox} teslim.`,
  alternates: { canonical: `${siteConfig.url}/referanslar` },
};

export const revalidate = 60;

export default async function ReferanslarPage() {
  const sanity = await sanityFetch<ReferenceCompany[]>(
    allReferencesQuery,
    {},
    { revalidate: 60 }
  );

  const hasSanity = (sanity?.length ?? 0) > 0;

  const featured = hasSanity
    ? sanity!.filter((r) => r.featured)
    : referenceCompanies.filter((c) => c.featured);
  const others = hasSanity
    ? sanity!.filter((r) => !r.featured)
    : referenceCompanies.filter((c) => !c.featured);

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
            {featured.map((c, i) => {
              const isSanity = hasSanity;
              const name = isSanity
                ? (c as ReferenceCompany).name
                : (c as { name: string }).name;
              const sector = isSanity
                ? (c as ReferenceCompany).sector
                : (c as { sector?: string }).sector;
              const logo = isSanity ? (c as ReferenceCompany).logo : undefined;

              return (
                <div
                  key={isSanity ? (c as ReferenceCompany)._id : `${name}-${i}`}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/30 transition-colors text-center"
                >
                  {logo ? (
                    <div className="relative h-16 mb-3">
                      <SanityImage
                        image={logo}
                        fill
                        sizes="160px"
                        className="object-contain"
                      />
                    </div>
                  ) : null}
                  <div className="text-base font-heading font-semibold">
                    {name.replace(/\(.*\)/, "").trim()}
                  </div>
                  {sector && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {sector}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {others.length > 0 && (
          <section className="container-wide pb-20">
            <h2 className="text-2xl font-heading font-semibold mb-6">
              Diğer Referanslar
            </h2>
            <div className="flex flex-wrap gap-2">
              {others.map((c, i) => {
                const name = hasSanity
                  ? (c as ReferenceCompany).name
                  : (c as { name: string }).name;
                const key = hasSanity
                  ? (c as ReferenceCompany)._id
                  : `${name}-${i}`;
                return (
                  <span
                    key={key}
                    className="text-sm font-medium px-3 py-1.5 rounded-full border border-border bg-card text-foreground/80 hover:border-[var(--brand-orange)]/30 hover:text-foreground transition-colors"
                  >
                    {name.replace(/\(.*\)/, "").trim()}
                  </span>
                );
              })}
            </div>
          </section>
        )}

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
