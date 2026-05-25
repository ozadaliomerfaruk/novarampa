import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaSection } from "@/components/home/cta-section";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Blog — Yükleme Rampası Rehberi",
  description:
    "Rampa seçimi, tonaj hesabı, montaj, bakım — yükleme rampası hakkında ihtiyacınız olan her şey saha tecrübesiyle.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

// Eren'in onayladığı 7 başlık — içerikler ileride Sanity'den çekilecek.
const upcomingTopics = [
  "Yükleme Rampası Nedir, Ne İşe Yarar?",
  "Yükleme Rampası Çeşitleri ve Fonksiyonları",
  "Yükleme Rampası Nasıl Seçilir? 5 Adımda Karar Rehberi",
  "Menteşeli ve Teleskopik Rampa Arasındaki 5 Önemli Fark",
  "Yükleme Rampası Ölçüleri: Standart mı, Özel Üretim mi?",
  "Yükleme Rampası Montajı Nasıl Yapılır?",
  "Yükleme Rampası Bakımı: Yıllık Kontrol Listesi",
];

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
        ]}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Blog" }]} />

        <section className="container-wide py-12">
          <div className="max-w-3xl">
            <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
              Blog
            </div>
            <h1 className="mt-3 text-5xl sm:text-6xl font-heading font-bold tracking-tight">
              Sahanın diliyle,
              <br />
              <span className="text-gradient-orange">rampa rehberi.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Yükleme rampası seçimi, tonaj hesabı, bakım — sektörde 20 yıllık
              tecrübemizden damıttığımız pratik bilgiler.
            </p>
          </div>
        </section>

        <section className="container-wide pb-20">
          <div className="rounded-3xl border border-border bg-card p-12 text-center">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-2xl font-heading font-semibold">
              Yakında ilk yazılar yayında.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Aşağıdaki başlıkları yakın zamanda yayınlayacağız. İçeriklerimiz
              hazır olduğunda buradan erişebileceksiniz.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
            {upcomingTopics.map((topic, i) => (
              <div
                key={topic}
                className="p-5 rounded-xl border border-border bg-card flex items-start gap-4"
              >
                <div className="text-xs font-mono text-muted-foreground shrink-0 mt-0.5">
                  0{i + 1}.
                </div>
                <div className="text-base font-heading font-medium leading-snug">
                  {topic}
                </div>
              </div>
            ))}
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
