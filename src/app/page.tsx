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

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductGrid />
        <ReferencesStrip />
        <WhyUs />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
