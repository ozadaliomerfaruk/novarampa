import type { Metadata } from "next";
import { Award, Building2, Hammer, Heart } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { CtaSection } from "@/components/home/cta-section";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { company, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Hakkımızda — Köklü Ustalığın Yeni Nesil Adı",
  description:
    "Nova Rampa, 2003'ten beri yükleme rampası sektörüne öncülük eden Dinamik Mühendislik'in mirası üzerine 2022'de kurulan yeni nesil bir markadır.",
  alternates: { canonical: `${siteConfig.url}/hakkimizda` },
};

const values = [
  {
    icon: Hammer,
    title: "Saha Tecrübesi",
    description:
      "İki kuşağın birikimi; her montajda, her dilde, her çukurda öğrendiklerimiz.",
  },
  {
    icon: Award,
    title: "Belgeli Üretim",
    description: "CE, TSE ve EN 1398 uyumlu üretim. Standartların bir adım önünde.",
  },
  {
    icon: Building2,
    title: "Türkiye Geneli",
    description:
      "Marmara'da güçlü, Türkiye'nin her noktasına sevkiyat ağıyla erişim.",
  },
  {
    icon: Heart,
    title: "Müşteri Odaklılık",
    description:
      "Ürün satmak değil, çözüm kurmak. Her projeyi kendi atölyemizmiş gibi düşünürüz.",
  },
];

export default function HakkimizdaPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Hakkımızda", url: `${siteConfig.url}/hakkimizda` },
        ]}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Hakkımızda" }]} />

        <section className="container-wide py-12">
          <div className="max-w-3xl">
            <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
              Hakkımızda
            </div>
            <h1 className="mt-3 text-5xl sm:text-6xl font-heading font-bold tracking-tight leading-[1.05]">
              Köklü ustalığın
              <br />
              <span className="text-gradient-orange">yeni nesil adı.</span>
            </h1>
          </div>
        </section>

        <section className="container-wide pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-6 text-lg text-foreground/85 leading-relaxed">
              <p>
                <strong className="text-foreground">NOVARAMPA</strong>, köklü bir
                ustalığın üzerine inşa edilen yeni nesil bir vizyonun adıdır.
                Temelleri, {company.heritageSince} yılında{" "}
                <strong className="text-foreground">Dinamik Mühendislik</strong>{" "}
                çatısı altında atıldı.
              </p>
              <p>
                Sahada kazanılan tecrübe, her montajda verilen emek, atölyenin
                sesi, demirin kokusu — bu mesleği bizim için sadece bir iş
                olmaktan çıkarıp bir tutkuya dönüştürdü ve anladık ki bu sadece
                devam ettirilecek bir iş değil, daha ileri taşınması gereken bir
                yolculuktu.
              </p>
              <p>
                İşte Nova Rampa tam olarak bu noktada doğdu. <em>&quot;Nova&quot;</em>{" "}
                yeniliği temsil eder, <em>&quot;Rampa&quot;</em> ise yolun başladığı
                yeri, köklerimizi ve yıllardır değişmeyen işimizi.
              </p>
              <p>
                Misyonumuz, geçmişin deneyimini geleceğin ihtiyaçlarıyla
                buluşturmak ve her projede daha sağlam, daha verimli ve
                sürdürülebilir çözümler üretmektir. Müşterilerimize sadece bir
                ürün sağlamayı değil, uzun vadeli çözümlerle işlerine katkıda
                bulunmayı hedefliyoruz.
              </p>
            </div>
            <aside className="lg:col-span-5">
              <div className="sticky top-32 space-y-4">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="text-xs font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                    Hızlı Bilgi
                  </div>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <dt className="text-muted-foreground">Kuruluş</dt>
                      <dd className="text-foreground font-medium">
                        {company.founded}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <dt className="text-muted-foreground">Saha Mirası</dt>
                      <dd className="text-foreground font-medium">
                        {company.heritageSince}&apos;ten beri
                      </dd>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <dt className="text-muted-foreground">Sertifikalar</dt>
                      <dd className="text-foreground font-medium">
                        {company.certifications.join(" · ")}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Garanti</dt>
                      <dd className="text-foreground font-medium">
                        {company.warrantyYears} yıl
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="rounded-2xl border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/5 p-6">
                  <div className="text-2xl font-heading font-bold leading-tight">
                    {company.slogan}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="container-wide pb-20">
          <SectionHeader
            eyebrow="Değerlerimiz"
            title="Bizi her gün motive eden dört prensip."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/30 transition-colors"
              >
                <div className="inline-flex items-center justify-center size-12 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]">
                  <v.icon size={22} />
                </div>
                <h3 className="mt-5 text-base font-heading font-semibold">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
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
