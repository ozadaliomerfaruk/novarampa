import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, MessageCircle, ShieldCheck } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { LinkButton, ExternalLinkButton } from "@/components/ui/link-button";
import { CtaSection } from "@/components/home/cta-section";
import {
  BreadcrumbJsonLd,
  ProductJsonLd,
} from "@/components/seo/structured-data";
import {
  productCategories,
  getProductBySlug,
  capacityNote,
} from "@/lib/products";
import { company, siteConfig } from "@/lib/site-config";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return productCategories.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Ürün Bulunamadı" };

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `${siteConfig.url}/urunler/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = productCategories.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Ürünler", url: `${siteConfig.url}/urunler` },
          {
            name: product.shortName,
            url: `${siteConfig.url}/urunler/${product.slug}`,
          },
        ]}
      />
      <ProductJsonLd
        name={product.name}
        description={product.description}
        slug={product.slug}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb
          items={[
            { label: "Ürünler", href: "/urunler" },
            { label: product.shortName },
          ]}
        />

        {/* Hero */}
        <section className="container-wide pt-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Ürün 0{product.order}
              </div>
              <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.05]">
                {product.name}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {product.tagline}
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
                {product.description}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <LinkButton
                  href={`/teklif-al?urun=${product.slug}`}
                  size="lg"
                  className="h-14 px-8 text-base bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-[var(--brand-black)] font-semibold group"
                >
                  Bu ürün için teklif al
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
                  WhatsApp'tan sor
                </ExternalLinkButton>
              </div>
            </div>

            {/* Görsel placeholder (Sanity'den gelecek) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl border border-border bg-gradient-to-br from-[var(--brand-charcoal)] to-background overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--brand-orange)] rounded-full opacity-[0.12] blur-[80px]" />
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40 font-mono text-xs uppercase tracking-widest">
                  Görsel — yakında
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="text-xs text-muted-foreground">
                    <div className="font-mono">{product.shortName.toUpperCase()}</div>
                    <div className="mt-1 text-foreground/60">{product.dimensions}</div>
                  </div>
                  <ShieldCheck size={20} className="text-[var(--brand-orange)]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teknik Detaylar */}
        <section className="container-wide pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                Kapasite (Taşıma)
              </div>
              <div className="mt-4 space-y-2">
                {product.capacities.map((c) => (
                  <div key={c} className="flex items-center gap-2 text-foreground">
                    <ChevronRight
                      size={14}
                      className="text-[var(--brand-orange)]"
                    />
                    <span className="font-mono">{c}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground italic">
                {capacityNote}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                Standart Ölçü
              </div>
              <div className="mt-4 text-foreground font-mono text-sm leading-relaxed">
                {product.dimensions}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Özel ölçü üretim için iletişime geçin.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                Sertifikalar
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {company.certifications.map((c) => (
                  <span
                    key={c}
                    className="text-xs font-medium px-2 py-1 rounded border border-border bg-background/60"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                {company.warrantyYears} yıl garanti. {company.warrantyNote}
              </p>
            </div>
          </div>
        </section>

        {/* Özellikler */}
        <section className="container-wide pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                Öne Çıkan Özellikler
              </div>
              <h2 className="mt-3 text-3xl font-heading font-bold tracking-tight">
                Sahanın istediği şekilde.
              </h2>
              <ul className="mt-8 space-y-4">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="mt-0.5 inline-flex items-center justify-center size-6 rounded-full bg-[var(--brand-orange)]/15 text-[var(--brand-orange)] shrink-0">
                      <Check size={14} />
                    </div>
                    <span className="text-foreground/90 leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                Uygun Sektörler
              </div>
              <h2 className="mt-3 text-3xl font-heading font-bold tracking-tight">
                Kimler tercih ediyor?
              </h2>
              <ul className="mt-8 space-y-3">
                {product.bestFor.map((b) => (
                  <li
                    key={b}
                    className="p-4 rounded-xl border border-border bg-card text-sm text-foreground/90"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* İlgili Ürünler */}
        <section className="container-wide pb-20">
          <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
            Benzer Ürünler
          </div>
          <h2 className="mt-3 text-3xl font-heading font-bold tracking-tight">
            Diğer rampa çözümlerimiz
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/urunler/${r.slug}`}
                className="group block p-6 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/40 transition-colors"
              >
                <div className="text-xs font-mono text-muted-foreground">
                  0{r.order}.
                </div>
                <h3 className="mt-2 text-lg font-heading font-semibold group-hover:text-[var(--brand-orange)] transition-colors">
                  {r.shortName}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {r.tagline}
                </p>
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
