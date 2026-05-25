import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, MessageCircle } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { LinkButton, ExternalLinkButton } from "@/components/ui/link-button";
import { CtaSection } from "@/components/home/cta-section";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { customerSegments } from "@/lib/services";
import { productCategories, getProductBySlug } from "@/lib/products";
import { company, siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ sektor: string }> };

export async function generateStaticParams() {
  return customerSegments.map((s) => ({ sektor: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sektor } = await params;
  const segment = customerSegments.find((s) => s.slug === sektor);
  if (!segment) return { title: "Çözüm Bulunamadı" };

  return {
    title: `${segment.name} İçin Yükleme Rampası Çözümleri`,
    description: segment.description,
    alternates: { canonical: `${siteConfig.url}/cozumler/${sektor}` },
  };
}

export default async function SektorelCozumPage({ params }: Props) {
  const { sektor } = await params;
  const segment = customerSegments.find((s) => s.slug === sektor);
  if (!segment) notFound();

  const recommended = segment.recommendedProducts
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[];

  const otherSegments = customerSegments.filter((s) => s.slug !== sektor);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Çözümler", url: `${siteConfig.url}/cozumler` },
          { name: segment.name, url: `${siteConfig.url}/cozumler/${sektor}` },
        ]}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb
          items={[
            { label: "Çözümler", href: "/cozumler" },
            { label: segment.name },
          ]}
        />

        <section className="container-wide pt-8 pb-20">
          <div className="max-w-3xl">
            <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
              {segment.name}
            </div>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.05]">
              {segment.name} için
              <br />
              <span className="text-gradient-orange">doğru rampa.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {segment.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <LinkButton
                href={`/teklif-al?sektor=${segment.slug}`}
                size="lg"
                className="h-14 px-8 text-base bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold group"
              >
                {segment.name} Teklifi Al
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
                WhatsApp&apos;tan sor
              </ExternalLinkButton>
            </div>
          </div>
        </section>

        {/* Önerilen ürünler */}
        {recommended.length > 0 && (
          <section className="container-wide pb-20">
            <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
              Önerilen Ürünler
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold tracking-tight">
              Bu segment için tasarlanmış çözümler
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommended.map((p) => (
                <Link
                  key={p.slug}
                  href={`/urunler/${p.slug}`}
                  className="group block p-8 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-heading font-semibold group-hover:text-[var(--brand-orange)] transition-colors">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {p.tagline}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-muted-foreground group-hover:text-[var(--brand-orange)] transition-all shrink-0"
                    />
                  </div>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {p.capacities.slice(0, 4).map((c) => (
                      <span
                        key={c}
                        className="text-[11px] font-mono px-2 py-0.5 rounded border border-border bg-background/60"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Sektörel detaylar */}
        <section className="container-wide pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="text-xs font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                Aranan Çözüm
              </div>
              <h3 className="mt-3 text-lg font-heading font-semibold">
                {segment.name} ne tür rampa arar?
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                {segment.keywords.map((k) => (
                  <li key={k} className="flex items-start gap-2">
                    <Check size={14} className="mt-1 text-[var(--brand-orange)] shrink-0" />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="text-xs font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                Müşteri Tabanımız
              </div>
              <div className="mt-3 text-5xl font-heading font-bold tracking-tight">
                ~%{segment.share}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Müşterilerimizin yaklaşık {segment.share}&apos;i bu segmente
                ait — yani bu işi defalarca yaptık, ihtiyacınızı biliyoruz.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/5 p-8">
              <div className="text-xs font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                Bizimle Çalışın
              </div>
              <h3 className="mt-3 text-lg font-heading font-semibold">
                Projenizi anlatın.
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {company.contact.phoneDisplay} numarasından arayın veya
                aşağıdaki formdan ulaşın.
              </p>
              <LinkButton
                href={`/teklif-al?sektor=${segment.slug}`}
                size="default"
                className="mt-5 w-full bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold h-11"
              >
                Teklif Al
              </LinkButton>
            </div>
          </div>
        </section>

        {/* Diğer çözümler */}
        <section className="container-wide pb-20">
          <h2 className="text-2xl font-heading font-semibold mb-6">
            Diğer Sektörel Çözümler
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {otherSegments.map((s) => (
              <Link
                key={s.slug}
                href={`/cozumler/${s.slug}`}
                className="group p-4 rounded-xl border border-border bg-card hover:border-[var(--brand-orange)]/40 transition-colors"
              >
                <div className="text-sm font-heading font-semibold group-hover:text-[var(--brand-orange)] transition-colors line-clamp-2">
                  {s.name}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  ~%{s.share}
                </div>
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
