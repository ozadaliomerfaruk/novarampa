import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { ProductGrid } from "@/components/home/product-grid";
import { WorkshopSection } from "@/components/home/workshop-section";
import { ReferencesStrip } from "@/components/home/references-strip";
import { WhyUs } from "@/components/home/why-us";
import { CtaSection } from "@/components/home/cta-section";
import { HomeFaqs } from "@/components/home/home-faqs";
import { SectionDivider } from "@/components/layout/section-divider";
import {
  LocalBusinessJsonLd,
  OrganizationJsonLd,
  WebSiteJsonLd,
  ServiceMasterJsonLd,
  FaqJsonLd,
} from "@/components/seo/structured-data";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  settingsQuery,
  allProductsQuery,
  featuredReferencesQuery,
} from "@/sanity/lib/queries";
import type {
  ProductSummary,
  ReferenceCompany,
  SiteSettings,
} from "@/sanity/lib/types";

// ISR: 30 sn'de bir yenile (Eren admin'de değiştirdiğinde yarım dakikada canlıya çıkar)
export const revalidate = 30;

export default async function HomePage() {
  // Sanity'den verileri paralel çek
  const [settings, sanityProducts, sanityRefs] = await Promise.all([
    sanityFetch<SiteSettings>(settingsQuery, {}, { revalidate: 30 }),
    sanityFetch<ProductSummary[]>(allProductsQuery, {}, { revalidate: 30 }),
    sanityFetch<ReferenceCompany[]>(featuredReferencesQuery, {}, { revalidate: 60 }),
  ]);

  // Featured products varsa onları, yoksa tüm ürünleri göster
  const products =
    (settings?.featuredProducts?.length ?? 0) > 0
      ? settings?.featuredProducts
      : sanityProducts;

  return (
    <>
      <OrganizationJsonLd
        socials={
          settings?.socials
            ? (Object.values(settings.socials).filter(
                (v) => typeof v === "string" && v.trim().length > 0
              ) as string[])
            : undefined
        }
      />
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />
      <ServiceMasterJsonLd />
      {settings?.homeFaqs && settings.homeFaqs.length > 0 && (
        <FaqJsonLd faqs={settings.homeFaqs} />
      )}
      <Header />
      <main className="flex-1">
        <Hero
          title={settings?.heroTitle}
          subtitle={settings?.heroSubtitle}
          ctaLabel={settings?.heroCtaLabel}
          videoUrl={settings?.heroVideoUrl}
        />
        <ProductGrid sanityProducts={products} />
        <SectionDivider variant="measure" />
        <WorkshopSection photos={settings?.workshopPhotos} />
        <SectionDivider variant="measure" />
        <WhyUs />
        <ReferencesStrip sanityReferences={sanityRefs} />
        <HomeFaqs faqs={settings?.homeFaqs} />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
