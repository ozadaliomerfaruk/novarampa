import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
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
import { settingsQuery } from "@/sanity/lib/queries";

type Settings = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaLabel?: string;
};

// ISR: 30 sn'de bir yenile (Eren admin'de değiştirdiğinde yarım dakikada canlıya çıkar)
export const revalidate = 30;

export default async function HomePage() {
  const settings = await sanityFetch<Settings>(settingsQuery, {}, { revalidate: 30 });

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
        <ProductGrid />
        <ReferencesStrip />
        <WhyUs />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
