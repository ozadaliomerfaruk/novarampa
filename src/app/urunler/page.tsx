import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageIntro } from "@/components/layout/page-intro";
import { ProductCards } from "@/components/products/product-cards";
import { CtaSection } from "@/components/home/cta-section";
import { getProducts } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";
export const metadata: Metadata = {
  title: "Ürünlerimiz — Yükleme Rampası İmalatı",
  description:
    "Menteşeli, teleskopik, dikey, mobil, gömme ve konteyner geçiş rampaları.",
  alternates: { canonical: siteConfig.url + "/urunler" },
};
export const revalidate = 30;
export default async function UrunlerPage() {
  const products = await getProducts();
  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Ürünler" }]} />
        <PageIntro
          eyebrow="Ürünler"
          title="Her yüke bir çözüm..."
          description="Yükünüz ağır, biliyoruz. Gelin pratik rampa çözümlerimizden ihtiyacınıza yönelik olanı belirleyelim ve yükünüzü birlikte hafifletelim. Bizim için her teslimat, sizinle büyüyen bir ortaklık demek"
        />
        <section className="container-wide pb-16">
          <ProductCards products={products} />
        </section>
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
