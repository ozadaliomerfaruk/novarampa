import { getSiteData } from "@/lib/site-data";
import { getSiteCopy } from "@/lib/site-copy-server";
import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { PageIntro } from "@/components/layout/page-intro";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { LinkButton, ExternalLinkButton } from "@/components/ui/link-button";
import {
  BreadcrumbJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo/structured-data";
import { company, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "İletişim — Nova Rampa",
  description: `Çorlu/Tekirdağ atölye, Sultanbeyli/İstanbul ofis. ${company.contact.phoneDisplay} — ${company.contact.email}`,
  alternates: { canonical: `${siteConfig.url}/iletisim` },
};

export default async function IletisimPage() {
  const copy = await getSiteCopy();
  const { contact, locations } = await getSiteData();
  return (
    <>
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "İletişim", url: `${siteConfig.url}/iletisim` },
        ]}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "İletişim" }]} />

        <PageIntro
          title={copy.contactPage.title}
          description={copy.contactPage.description}
        />

        <section className="container-wide pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <a
              href={`tel:${contact.phone}`}
              className="group p-8 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/40 transition-colors"
            >
              <Phone className="text-[var(--brand-orange)]" />
              <div className="mt-6 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Telefon
              </div>
              <div className="mt-2 text-2xl font-heading font-semibold group-hover:text-[var(--brand-orange)] transition-colors">
                {contact.phoneDisplay}
              </div>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="group p-8 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/40 transition-colors"
            >
              <Mail className="text-[var(--brand-orange)]" />
              <div className="mt-6 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                E-posta
              </div>
              <div className="mt-2 text-2xl font-heading font-semibold group-hover:text-[var(--brand-orange)] transition-colors break-all">
                {contact.email}
              </div>
            </a>

            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/40 transition-colors"
            >
              <MessageCircle className="text-[var(--brand-orange)]" />
              <div className="mt-6 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                WhatsApp
              </div>
              <div className="mt-2 text-2xl font-heading font-semibold group-hover:text-[var(--brand-orange)] transition-colors">
                Mesaj gönder →
              </div>
            </a>
          </div>
        </section>

        <section className="container-wide pb-20">
          <h2 className="text-3xl font-heading font-bold tracking-tight mb-8">
            {copy.contactPage.locationsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((loc) => {
              const mapsQuery = encodeURIComponent(
                `${loc.addressLine1}, ${loc.city} ${loc.district}`,
              );
              return (
                <div
                  key={loc.label}
                  className="p-8 rounded-2xl border border-border bg-card"
                >
                  <div className="flex items-start gap-4">
                    <MapPin
                      className="text-[var(--brand-orange)] shrink-0 mt-1"
                      size={28}
                    />
                    <div className="flex-1">
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                        {loc.label}
                      </div>
                      <h3 className="mt-2 text-2xl font-heading font-semibold">
                        {loc.city} / {loc.district}
                      </h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        {loc.addressLine1}
                      </p>
                      <a
                        href={
                          loc.googleMapsUrl ||
                          `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-orange)] hover:text-[var(--brand-orange-hover)]"
                      >
                        Haritada aç →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="container-wide pb-20">
          <div className="rounded-3xl border border-[var(--brand-orange)]/30 bg-gradient-to-br from-[var(--brand-orange)]/10 to-transparent p-6 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight">
              {copy.contactPage.ctaTitle}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              {copy.contactPage.ctaDescription}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center">
              <LinkButton
                href="/teklif-al"
                size="lg"
                className="h-14 px-8 text-base bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold"
              >
                {copy.contactPage.ctaLabel}
              </LinkButton>
              <ExternalLinkButton
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base border-border bg-background/40"
              >
                <MessageCircle className="mr-1" />
                WhatsApp
              </ExternalLinkButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
