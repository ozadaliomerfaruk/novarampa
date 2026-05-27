import type { Metadata } from "next";
import {
  Award,
  Clock,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { QuoteForm } from "@/components/forms/quote-form";
import { ExternalLinkButton } from "@/components/ui/link-button";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { company, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Teklif Al — Yükleme Rampası Teklifi",
  description:
    "Projeniz için ücretsiz teklif alın. Tonaj, ölçü, sektör bilgilerinizi paylaşın, ekibimiz aynı gün size dönsün.",
  alternates: { canonical: `${siteConfig.url}/teklif-al` },
};

type SearchParams = Promise<{ urun?: string; sektor?: string; sehir?: string }>;

const whyUs = [
  {
    icon: Clock,
    title: "Aynı gün dönüş",
    description:
      "Mesai saatlerinde gelen taleplere genellikle 1 iş günü içinde özel teklifle dönüş yaparız.",
  },
  {
    icon: ShieldCheck,
    title: "Belgeli üretim, 2 yıl garanti",
    description:
      "CE, TSE belgeli üretim. EN 1398 uyumlu. İmalat hatalarına karşı iki yıl tam garanti.",
  },
  {
    icon: Award,
    title: "Sahanıza özel tasarım",
    description:
      "Standart ölçü çıkmıyorsa özel imalat. Sahanızı, yüklerinizi, araç tipinizi dinler, ona göre öneririz.",
  },
  {
    icon: Wrench,
    title: "Teslim sonrası destek",
    description:
      "Montaj, eğitim, yedek parça ve servis — projeyi teslim ettikten sonra bırakmıyoruz.",
  },
];

export default async function TeklifAlPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { urun } = await searchParams;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Teklif Al", url: `${siteConfig.url}/teklif-al` },
        ]}
      />
      <Header />
      <main className="flex-1">
        {/* ─── HERO ─── (RonI DNA: koyu navy banner + tek satır mesaj) */}
        <section className="surface-dark relative overflow-hidden pt-28 md:pt-32 pb-16 md:pb-20">
          {/* Atmosfer */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[var(--brand-orange)] rounded-full opacity-[0.08] blur-[140px] pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="container-wide relative text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono uppercase tracking-[0.22em] text-white/70 mb-6">
              <span className="size-1.5 rounded-full bg-[var(--brand-orange)]" />
              Teklif Talebi
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.1] text-white max-w-3xl mx-auto">
              Projenize özel çözümü
              <br />
              <span className="text-gradient-orange">birlikte tasarlayalım.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Aşağıdaki kısa formu doldurun — uzun evrak veya taahhüt yok.
              Sahanızı, yükünüzü ve ihtiyacınızı paylaşın, gerisini biz halledelim.
            </p>
          </div>
        </section>

        <Breadcrumb items={[{ label: "Teklif Al" }]} />

        {/* ─── İKİ-KOLON: WHY + FORM ─── (RonI DNA) */}
        <section className="container-wide py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* SOL — Why */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-8">
                <div>
                  <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                    Neden Nova Rampa
                  </div>
                  <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold tracking-tight leading-[1.15]">
                    Neden bizden teklif almalısınız?
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    20 yılı aşkın saha tecrübesi, kurumsal müşteri portföyü ve
                    sahip olduğumuz sertifikalar farkımızı oluşturur.
                  </p>
                </div>

                <ul className="space-y-5">
                  {whyUs.map((w) => (
                    <li key={w.title} className="flex items-start gap-4">
                      <div className="inline-flex items-center justify-center size-11 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] shrink-0">
                        <w.icon size={18} />
                      </div>
                      <div>
                        <div className="text-base font-heading font-semibold">
                          {w.title}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {w.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="p-6 rounded-2xl border border-border bg-card">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    Telefonla daha hızlı
                  </div>
                  <a
                    href={`tel:${company.contact.phone}`}
                    className="mt-3 inline-flex items-center gap-2 text-2xl font-heading font-bold hover:text-[var(--brand-orange)] transition-colors"
                  >
                    <Phone size={20} />
                    {company.contact.phoneDisplay}
                  </a>
                  <ExternalLinkButton
                    href={company.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    className="mt-5 w-full h-11"
                  >
                    <MessageCircle className="mr-1" />
                    WhatsApp&apos;tan Yaz
                  </ExternalLinkButton>
                </div>
              </div>
            </aside>

            {/* SAĞ — Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm">
                <div className="mb-8">
                  <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--brand-orange)]">
                    Teklif Formu · ~ 2 dakika
                  </div>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-heading font-bold tracking-tight">
                    Bilgilerinizi paylaşın
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    * işaretli alanlar zorunludur. Diğerlerini sonra
                    konuşabiliriz.
                  </p>
                </div>

                <QuoteForm defaultProduct={urun} />
              </div>

              <p className="mt-6 text-xs text-muted-foreground text-center leading-relaxed">
                Form gönderildiğinde bilgileriniz yalnızca teklif amacıyla
                kullanılır. Detaylar için{" "}
                <a href="/kvkk" className="underline hover:text-foreground">
                  KVKK
                </a>{" "}
                aydınlatma metnimize bakın.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
