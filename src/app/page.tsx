import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { StatStrip } from "@/components/home/stat-strip";
import { ProductGrid } from "@/components/home/product-grid";
import { ReferencesStrip } from "@/components/home/references-strip";
import { WhyUs } from "@/components/home/why-us";
import { CtaSection } from "@/components/home/cta-section";
import {
  LocalBusinessJsonLd,
  OrganizationJsonLd,
  WebSiteJsonLd,
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
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />
      <Header />
      <main className="flex-1">
        <Hero
          title={settings?.heroTitle}
          subtitle={settings?.heroSubtitle}
          ctaLabel={settings?.heroCtaLabel}
        />
        <StatStrip />
        <ProductGrid sanityProducts={products} />
        <ReferencesStrip sanityReferences={sanityRefs} />
        <WhyUs />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
