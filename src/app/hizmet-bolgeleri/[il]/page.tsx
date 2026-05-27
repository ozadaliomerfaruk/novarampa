import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { LinkButton, ExternalLinkButton } from "@/components/ui/link-button";
import { CtaSection } from "@/components/home/cta-section";
import {
  BreadcrumbJsonLd,
  CityLocalBusinessJsonLd,
} from "@/components/seo/structured-data";
import { serviceCities } from "@/lib/services";
import { productCategories } from "@/lib/products";
import { company, siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ il: string }> };

export async function generateStaticParams() {
  return serviceCities.map((c) => ({ il: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { il } = await params;
  const city = serviceCities.find((c) => c.slug === il);
  if (!city) return { title: "Şehir Bulunamadı" };

  return {
    title: `${city.name} Yükleme Rampası İmalatı — Hidrolik, Teleskopik, Mobil`,
    description: `${city.name} ve çevresine yükleme rampası imalatı ve montajı. Menteşeli, teleskopik, dikey, mobil rampa. CE & TSE belgeli. Hızlı keşif ve teklif.`,
    alternates: { canonical: `${siteConfig.url}/hizmet-bolgeleri/${il}` },
  };
}

export default async function IlLandingPage({ params }: Props) {
  const { il } = await params;
  const city = serviceCities.find((c) => c.slug === il);
  if (!city) notFound();

  const isPrimary = city.priority === "primary";
  const otherCities = serviceCities
    .filter((c) => c.slug !== il && c.priority === "primary")
    .slice(0, 5);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Hizmet Bölgeleri", url: `${siteConfig.url}/hizmet-bolgeleri` },
          { name: city.name, url: `${siteConfig.url}/hizmet-bolgeleri/${il}` },
        ]}
      />
      <CityLocalBusinessJsonLd
        cityName={city.name}
        slug={city.slug}
        industrialZones={city.industrialZones}
        priority={city.priority}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb
          items={[
            { label: "Hizmet Bölgeleri", href: "/hizmet-bolgeleri" },
            { label: city.name },
          ]}
        />

        <section className="container-wide pt-8 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
              <MapPin size={14} />
              {city.name}
            </div>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.05]">
              {city.name}&apos;da
              <br />
              <span className="text-gradient-orange">yükleme rampası imalatı.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {isPrimary
                ? `${city.name} ve çevresine montajlı yükleme rampası, teleskopik rampa, dikey rampa ve mobil platform tedarikçisiyiz. CE & TSE belgeli imalat, hızlı keşif.`
                : `${city.name}'ya yükleme rampası sevkiyatı yapıyoruz. Montaj koşulları talebinize göre planlanır.`}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <LinkButton
                href={`/teklif-al?sehir=${city.slug}`}
                size="lg"
                className="h-14 px-8 text-base bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold group"
              >
                {city.name} İçin Teklif Al
                <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
              </LinkButton>
              <ExternalLinkButton
                href={company.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base border-border bg-background/40"
              >
                <MessageCircle className="mr-1" />
                WhatsApp&apos;tan Sor
              </ExternalLinkButton>
            </div>
          </div>
        </section>

        {city.industrialZones && city.industrialZones.length > 0 && (
          <section className="container-wide pb-16">
            <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
              Hizmet Verdiğimiz Bölgeler
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-heading font-bold tracking-tight">
              {city.name}&apos;nın sanayi bölgeleri
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {city.industrialZones.map((z) => (
                <span
                  key={z}
                  className="text-sm font-medium px-3 py-1.5 rounded-full border border-border bg-card text-foreground/80"
                >
                  {z}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Ürün showcase */}
        <section className="container-wide pb-16">
          <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
            Ürün Yelpazemiz
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold tracking-tight">
            {city.name} için tüm rampa çözümlerimiz
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productCategories.map((p) => (
              <Link
                key={p.slug}
                href={`/urunler/${p.slug}`}
                className="group block p-6 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/40 transition-colors"
              >
                <h3 className="text-lg font-heading font-semibold group-hover:text-[var(--brand-orange)] transition-colors">
                  {p.shortName}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {p.tagline}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm text-foreground/70 group-hover:text-[var(--brand-orange)]">
                  İncele
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Hızlı iletişim */}
        <section className="container-wide pb-20">
          <div className="rounded-3xl border border-[var(--brand-orange)]/30 bg-gradient-to-br from-[var(--brand-orange)]/10 to-transparent p-12">
            <h2 className="text-3xl font-heading font-bold tracking-tight">
              {city.name} için hızlı iletişim
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Saha keşfi, ölçü alımı ve teklif için doğrudan iletişime
              geçebilirsiniz. Çorlu atölyemiz ve Sultanbeyli ofisimizden
              koordinasyon sağlanır.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <a
                href={`tel:${company.contact.phone}`}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-border bg-background/40 text-base font-medium hover:bg-muted transition-colors"
              >
                <Phone size={16} />
                {company.contact.phoneDisplay}
              </a>
              <LinkButton
                href={`/teklif-al?sehir=${city.slug}`}
                className="h-12 px-6 bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold"
              >
                Teklif Formu
              </LinkButton>
            </div>
          </div>
        </section>

        {/* Diğer iller */}
        {otherCities.length > 0 && (
          <section className="container-wide pb-20">
            <h2 className="text-xl font-heading font-semibold mb-4">
              Hizmet Verdiğimiz Diğer İller
            </h2>
            <div className="flex flex-wrap gap-2">
              {otherCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/hizmet-bolgeleri/${c.slug}`}
                  className="text-sm font-medium px-4 py-2 rounded-full border border-border bg-card text-foreground/80 hover:border-[var(--brand-orange)]/40 hover:text-foreground transition-colors"
                >
                  {c.name} Yükleme Rampası
                </Link>
              ))}
              <Link
                href="/hizmet-bolgeleri"
                className="text-sm font-medium px-4 py-2 rounded-full border border-[var(--brand-orange)]/40 bg-[var(--brand-orange)]/5 text-[var(--brand-orange)]"
              >
                Tüm bölgeler →
              </Link>
            </div>
          </section>
        )}

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
