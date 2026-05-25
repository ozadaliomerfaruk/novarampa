import type { Metadata } from "next";
import { CheckCircle2, Clock, MessageCircle, Phone } from "lucide-react";

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

type SearchParams = Promise<{ urun?: string }>;

const benefits = [
  { icon: Clock, text: "Aynı gün dönüş" },
  { icon: CheckCircle2, text: "Ücretsiz keşif" },
  { icon: MessageCircle, text: "WhatsApp desteği" },
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
        <Breadcrumb items={[{ label: "Teklif Al" }]} />

        <section className="container-wide py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-10">
                <h2 className="text-2xl font-heading font-semibold mb-2">
                  Bilgilerinizi paylaşın, size hızla dönelim.
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  * işaretli alanlar zorunludur. Diğerlerini sonra konuşabiliriz.
                </p>
                <QuoteForm defaultProduct={urun} />
              </div>
            </div>

            <aside className="lg:col-span-5 order-1 lg:order-2">
              <div className="sticky top-32 space-y-6">
                <div>
                  <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                    Teklif Al
                  </div>
                  <h1 className="mt-3 text-4xl sm:text-5xl font-heading font-bold tracking-tight">
                    Projenize özel
                    <br />
                    <span className="text-gradient-orange">çözüm hazırlayalım.</span>
                  </h1>
                </div>

                <ul className="space-y-3">
                  {benefits.map((b) => (
                    <li
                      key={b.text}
                      className="flex items-center gap-3 text-foreground/90"
                    >
                      <div className="inline-flex items-center justify-center size-9 rounded-lg bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]">
                        <b.icon size={16} />
                      </div>
                      <span>{b.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-6 rounded-2xl border border-border bg-card">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    Hızlı İletişim
                  </div>
                  <div className="mt-4 space-y-3">
                    <a
                      href={`tel:${company.contact.phone}`}
                      className="flex items-center gap-3 text-sm hover:text-[var(--brand-orange)] transition-colors"
                    >
                      <Phone size={16} />
                      {company.contact.phoneDisplay}
                    </a>
                  </div>
                  <ExternalLinkButton
                    href={company.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 w-full bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold h-12"
                  >
                    <MessageCircle className="mr-1" />
                    WhatsApp&apos;tan Yaz
                  </ExternalLinkButton>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
