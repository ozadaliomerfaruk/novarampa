import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, MessageCircle } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { LinkButton, ExternalLinkButton } from "@/components/ui/link-button";
import { CtaSection } from "@/components/home/cta-section";
import {
  BreadcrumbJsonLd,
  ComparisonJsonLd,
} from "@/components/seo/structured-data";
import { comparisons, getComparisonBySlug } from "@/lib/comparisons";
import { getProductBySlug } from "@/lib/products";
import { company, siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cmp = getComparisonBySlug(slug);
  if (!cmp) return { title: "Karşılaştırma Bulunamadı" };

  return {
    title: cmp.title,
    description: cmp.intro,
    alternates: { canonical: `${siteConfig.url}/karsilastir/${slug}` },
  };
}

export default async function ComparisonDetailPage({ params }: Props) {
  const { slug } = await params;
  const cmp = getComparisonBySlug(slug);
  if (!cmp) notFound();

  const a = getProductBySlug(cmp.productASlug);
  const b = getProductBySlug(cmp.productBSlug);
  if (!a || !b) notFound();

  const rows: { label: string; a: string; b: string }[] = [
    {
      label: "Kapasite (taşıma)",
      a: a.capacities.join(", "),
      b: b.capacities.join(", "),
    },
    { label: "Standart ölçü", a: a.dimensions, b: b.dimensions },
    { label: "Tipik kullanım", a: a.bestFor.join(" · "), b: b.bestFor.join(" · ") },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Karşılaştırma", url: `${siteConfig.url}/karsilastir` },
          { name: cmp.shortTitle, url: `${siteConfig.url}/karsilastir/${cmp.slug}` },
        ]}
      />
      <ComparisonJsonLd
        productA={{
          name: a.name,
          slug: a.slug,
          description: a.description,
        }}
        productB={{
          name: b.name,
          slug: b.slug,
          description: b.description,
        }}
        slug={cmp.slug}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb
          items={[
            { label: "Karşılaştırma", href: "/karsilastir" },
            { label: cmp.shortTitle },
          ]}
        />

        {/* Hero */}
        <section className="container-wide pt-8 pb-12">
          <div className="max-w-4xl">
            <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
              {cmp.shortTitle}
            </div>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.05]">
              {cmp.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {cmp.intro}
            </p>
          </div>
        </section>

        {/* Karşılaştırma tablosu */}
        <section className="container-wide pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Ürün A */}
            <article className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--brand-orange)]">
                Seçenek A
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-heading font-bold leading-tight">
                {a.name}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {a.tagline}
              </p>
              <div className="mt-6 space-y-3">
                {rows.map((r) => (
                  <div
                    key={r.label}
                    className="flex flex-col py-2 border-t border-border first:border-t-0"
                  >
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      {r.label}
                    </span>
                    <span className="mt-1 text-sm text-foreground font-medium">
                      {r.a}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href={`/urunler/${a.slug}`}
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-orange)] hover:text-[var(--brand-orange-hover)]"
              >
                Ürün detayı
                <ChevronRight size={14} />
              </Link>
            </article>

            {/* Ürün B */}
            <article className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--brand-orange)]">
                Seçenek B
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-heading font-bold leading-tight">
                {b.name}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {b.tagline}
              </p>
              <div className="mt-6 space-y-3">
                {rows.map((r) => (
                  <div
                    key={r.label}
                    className="flex flex-col py-2 border-t border-border first:border-t-0"
                  >
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      {r.label}
                    </span>
                    <span className="mt-1 text-sm text-foreground font-medium">
                      {r.b}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href={`/urunler/${b.slug}`}
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-orange)] hover:text-[var(--brand-orange-hover)]"
              >
                Ürün detayı
                <ChevronRight size={14} />
              </Link>
            </article>
          </div>
        </section>

        {/* Ne zaman hangisi */}
        <section className="container-wide pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/5 p-7">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--brand-orange)]">
                Ne zaman {a.shortName}?
              </div>
              <p className="mt-4 text-base text-foreground/90 leading-relaxed">
                {cmp.whenA}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/5 p-7">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--brand-orange)]">
                Ne zaman {b.shortName}?
              </div>
              <p className="mt-4 text-base text-foreground/90 leading-relaxed">
                {cmp.whenB}
              </p>
            </div>
          </div>
        </section>

        {/* Verdict */}
        {cmp.verdict && (
          <section className="container-wide pb-20">
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--brand-orange)]">
                Genel Öneri
              </div>
              <p className="mt-4 text-lg sm:text-xl font-heading leading-relaxed">
                {cmp.verdict}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <LinkButton
                  href="/teklif-al"
                  size="default"
                  className="bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold group"
                >
                  Karar veremedim, danışmak istiyorum
                  <ArrowRight
                    size={14}
                    className="ml-1 transition-transform group-hover:translate-x-1"
                  />
                </LinkButton>
                <ExternalLinkButton
                  href={company.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="default"
                >
                  <MessageCircle className="mr-1" />
                  WhatsApp&apos;tan sor
                </ExternalLinkButton>
              </div>
            </div>
          </section>
        )}

        {/* Diğer karşılaştırmalar */}
        <section className="container-wide pb-20">
          <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
            Diğer Karşılaştırmalar
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-heading font-bold tracking-tight">
            Hangisini seçeceğine başka kararlarda da yardımcı olalım
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparisons
              .filter((c) => c.slug !== slug)
              .slice(0, 3)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/karsilastir/${c.slug}`}
                  className="group block p-5 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/40 transition-colors"
                >
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {c.shortTitle}
                  </div>
                  <h3 className="mt-2 text-base font-heading font-semibold group-hover:text-[var(--brand-orange)] transition-colors">
                    {c.title}
                  </h3>
                </Link>
              ))}
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

// CSS: AI-friendly Check kullanmadık ama gelecekte feature compare için kalsın
void Check;
