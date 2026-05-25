import type { Metadata } from "next";
import { Calendar, MessageCircle, Phone, Wrench } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ServiceForm } from "@/components/forms/service-form";
import { ExternalLinkButton } from "@/components/ui/link-button";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { company, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Servis Talep — Bakım, Onarım, Yedek Parça",
  description:
    "Mevcut rampanız için arıza, bakım veya yedek parça talebinizi iletin. Konumunuza göre saha ekibi yönlendiriyoruz.",
  alternates: { canonical: `${siteConfig.url}/servis` },
};

const flow = [
  {
    icon: Wrench,
    title: "Arızayı Tarif Edin",
    description: "Hangi parça, ne zaman, hangi sıklıkta — kısa anlatım yeterli.",
  },
  {
    icon: Phone,
    title: "Ekibimiz Sizi Arasın",
    description: "Tercih ettiğiniz iletişim yolundan, hızlıca dönüş yaparız.",
  },
  {
    icon: Calendar,
    title: "Servis Planlansın",
    description: "Uygun tarihte konumunuza ekip gelsin ya da uzaktan destek alın.",
  },
];

export default function ServisPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Servis", url: `${siteConfig.url}/servis` },
        ]}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Servis" }]} />

        <section className="container-wide py-12">
          <div className="max-w-3xl">
            <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
              Servis Talep
            </div>
            <h1 className="mt-3 text-5xl sm:text-6xl font-heading font-bold tracking-tight">
              Rampanıza bir göz atalım.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              İster bakım, ister arıza, ister yedek parça — bize iletmeniz yeterli.
              Konum bilginize göre saha ekibi planlıyoruz.
            </p>
          </div>
        </section>

        <section className="container-wide pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {flow.map((f, i) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border border-border bg-card"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center justify-center size-12 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]">
                    <f.icon size={22} />
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    0{i + 1}.
                  </div>
                </div>
                <h3 className="mt-5 text-base font-heading font-semibold">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-wide pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-10">
                <h2 className="text-2xl font-heading font-semibold mb-2">
                  Servis Talep Formu
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Bilgilerinizi paylaşın, uygun ilk fırsatta dönüş yapalım.
                </p>
                <ServiceForm />
              </div>
            </div>
            <aside className="lg:col-span-4">
              <div className="sticky top-32 p-6 rounded-2xl border border-border bg-card">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  Acil Durum
                </div>
                <h3 className="mt-2 text-xl font-heading font-semibold">
                  Üretim durduysa direkt arayın.
                </h3>
                <a
                  href={`tel:${company.contact.phone}`}
                  className="mt-4 inline-flex items-center gap-2 text-base font-medium text-foreground hover:text-[var(--brand-orange)] transition-colors"
                >
                  <Phone size={16} />
                  {company.contact.phoneDisplay}
                </a>
                <ExternalLinkButton
                  href={company.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className="mt-5 w-full h-12 border-border bg-background/40"
                >
                  <MessageCircle className="mr-1" />
                  WhatsApp + Foto Gönder
                </ExternalLinkButton>
                <p className="mt-4 text-xs text-muted-foreground">
                  WhatsApp&apos;tan fotoğraf yollamak en hızlı yoldur.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
