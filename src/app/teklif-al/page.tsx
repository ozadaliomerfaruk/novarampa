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
        {/* ─── HERO ─── (açık zemin; header kontrast için light tema) */}
        <section className="relative overflow-hidden pt-28 md:pt-32 pb-12 md:pb-16 bg-[var(--brand-paper)]/40">
          {/* Soft turuncu glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[var(--brand-orange)] rounded-full opacity-[0.06] blur-[140px] pointer-events-none" />

          <div className="container-wide relative">
            <Breadcrumb items={[{ label: "Teklif Al" }]} />
            <div className="mt-6 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--brand-orange)]/20 bg-[var(--brand-orange)]/5 text-xs font-mono uppercase tracking-[0.22em] text-[var(--brand-orange)] mb-5">
                <span className="size-1.5 rounded-full bg-[var(--brand-orange)]" />
                Teklif Talebi
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight leading-[1.1]">
                Projenize özel çözümü{" "}
                <span className="text-gradient-orange">birlikte tasarlayalım.</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Aşağıdaki kısa formu doldurun — uzun evrak veya taahhüt yok.
                Sahanızı, yükünüzü ve ihtiyacınızı paylaşın, gerisini biz halledelim.
              </p>
            </div>
          </div>
        </section>

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
