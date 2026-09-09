import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/page-intro";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaSection } from "@/components/home/cta-section";
import { ReferenceLogo } from "@/components/references/reference-logo";
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
    { revalidate: 60 },
  );

  const hasSanity = (sanity?.length ?? 0) > 0;

  const featured = hasSanity ? sanity! : referenceCompanies;

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

        <PageIntro
          eyebrow="Referanslar"
          title="Türkiye'nin yükünü taşıyan firmalar, bizi tercih ediyor."
        />

        <section className="container-wide pb-20">
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
                  className="p-3 sm:p-4 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/50 transition-colors text-center"
                >
                  <ReferenceLogo
                    company={{
                      name,
                      logo,
                      logoBackground: isSanity
                        ? (c as ReferenceCompany).logoBackground
                        : undefined,
                    }}
                    className="mb-5"
                  />
                  <div className="px-1 text-sm sm:text-base font-heading font-semibold">
                    {name.replace(/\(.*\)/, "").trim()}
                  </div>
                  {sector && (
                    <div className="mt-2 mb-2 text-xs text-muted-foreground">
                      {sector}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
