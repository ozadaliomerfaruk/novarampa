import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Info,
  MessageCircle,
} from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { LinkButton, ExternalLinkButton } from "@/components/ui/link-button";
import { CtaSection } from "@/components/home/cta-section";
import { SanityImage } from "@/components/sanity/sanity-image";
import {
  BreadcrumbJsonLd,
  ProductJsonLd,
  FaqJsonLd,
} from "@/components/seo/structured-data";
import { productCategories, getProductBySlug } from "@/lib/products";
import { company, siteConfig } from "@/lib/site-config";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  productBySlugQuery,
  productSlugsQuery,
  allProductsQuery,
} from "@/sanity/lib/queries";
import type { Product, ProductSummary } from "@/sanity/lib/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 30;

export async function generateStaticParams() {
  // Sanity'deki slug'ları + statik slug'ları birleştir
  const sanitySlugs = await sanityFetch<{ slug: string }[]>(
    productSlugsQuery,
    {},
    { revalidate: 60 },
  );
  const sanityList = (sanitySlugs ?? []).map((s) => ({ slug: s.slug }));
  const staticList = productCategories.map((p) => ({ slug: p.slug }));
  const seen = new Set<string>();
  return [...sanityList, ...staticList].filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sanity = await sanityFetch<Product>(productBySlugQuery, { slug });
  const fallback = getProductBySlug(slug);

  const name = sanity?.name ?? fallback?.name ?? "Ürün";
  const desc =
    sanity?.shortDescription ?? fallback?.description ?? siteConfig.description;

  return {
    title: name,
    description: desc,
    alternates: { canonical: `${siteConfig.url}/urunler/${slug}` },
    openGraph: {
      title: name,
      description: desc,
      type: "website",
    },
  };
}

type DisplayProduct = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  capacities: string[];
  dimensions: string;
  features: string[];
  bestFor: string[];
  order: number;
  slug: string;
  mainImage?: Product["mainImage"];
  gallery?: Product["gallery"];
  body?: Product["description"];
  faqs?: Product["faqs"];
  technicalSpecs?: Product["technicalSpecs"];
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const [sanity, related] = await Promise.all([
    sanityFetch<Product>(productBySlugQuery, { slug }, { revalidate: 30 }),
    sanityFetch<ProductSummary[]>(allProductsQuery, {}, { revalidate: 60 }),
  ]);

  const fallback = getProductBySlug(slug);

  if (!sanity && !fallback) notFound();

  const product: DisplayProduct = sanity
    ? {
        name: sanity.name,
        shortName: sanity.shortName ?? sanity.name,
        tagline: sanity.tagline ?? "",
        description: sanity.shortDescription ?? "",
        capacities: sanity.capacities ?? [],
        dimensions: sanity.dimensions ?? "",
        features: sanity.features ?? [],
        bestFor: sanity.bestFor ?? [],
        order: 0,
        slug,
        mainImage: sanity.mainImage,
        gallery: sanity.gallery,
        body: sanity.description,
        faqs: sanity.faqs,
        technicalSpecs: sanity.technicalSpecs,
      }
    : {
        name: fallback!.name,
        shortName: fallback!.shortName,
        tagline: fallback!.tagline,
        description: fallback!.description,
        capacities: fallback!.capacities,
        dimensions: fallback!.dimensions,
        features: fallback!.features,
        bestFor: fallback!.bestFor,
        order: fallback!.order,
        slug: fallback!.slug,
        technicalSpecs: fallback!.technicalSpecs,
      };

  // İlgili ürünler — Sanity'den varsa orayı kullan, yoksa statik
  const relatedItems =
    related && related.length > 0
      ? related
          .filter((r) => (r.slug?.current ?? "") !== slug)
          .slice(0, 3)
          .map((r) => ({
            slug: r.slug?.current ?? "",
            shortName: r.shortName ?? r.name,
            tagline: r.tagline ?? r.shortDescription ?? "",
            order: 0,
          }))
      : productCategories
          .filter((p) => p.slug !== slug)
          .slice(0, 3)
          .map((p) => ({
            slug: p.slug,
            shortName: p.shortName,
            tagline: p.tagline,
            order: p.order,
          }));

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
        description={product.description || product.tagline}
        slug={product.slug}
      />
      {product.faqs && product.faqs.length > 0 && (
        <FaqJsonLd faqs={product.faqs} />
      )}
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
          <h1 className="page-title mb-12 text-center">{product.name}</h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7">
              {product.tagline && (
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {product.tagline}
                </p>
              )}
              {product.description && (
                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {product.description}
                </p>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <LinkButton
                  href={`/teklif-al?urun=${product.slug}`}
                  size="lg"
                  className="h-14 px-8 text-base bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold group"
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
                  WhatsApp&apos;tan sor
                </ExternalLinkButton>
              </div>
              {product.features.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-heading font-semibold">
                    Öne çıkan özellikler
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check
                          size={19}
                          className="mt-1 shrink-0 text-brand-orange"
                        />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl border border-border bg-gradient-to-br from-[var(--brand-charcoal)] to-background overflow-hidden">
                {product.mainImage ? (
                  <SanityImage
                    image={product.mainImage}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 grid-bg opacity-50" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--brand-orange)] rounded-full opacity-[0.12] blur-[80px]" />
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40 font-mono text-xs uppercase tracking-widest">
                      Görsel — yakında
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Sanity'den rich text gövde */}
        {product.body && (
          <section className="container-wide pb-16">
            <article className="prose prose-invert max-w-3xl">
              <PortableText value={product.body} />
            </article>
          </section>
        )}

        {/* Teknik Özellikler — etiket + değer tablosu */}
        {product.technicalSpecs && product.technicalSpecs.length > 0 && (
          <section className="container-wide pb-20">
            <div className="max-w-3xl">
              <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                Teknik Detay
              </div>
              <h2 className="mt-3 text-3xl font-heading font-bold tracking-tight">
                Teknik Özellikler
              </h2>
              <dl className="mt-8 divide-y divide-border border-y border-border">
                {product.technicalSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="py-5 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-6"
                  >
                    <dt className="text-sm font-semibold text-[var(--brand-orange)] leading-snug">
                      {spec.label}
                    </dt>
                    <dd className="sm:col-span-2 text-foreground/90 leading-relaxed">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* SSS — Sanity'den FAQ'lar varsa göster (FaqJsonLd ile birlikte) */}
        {product.faqs && product.faqs.length > 0 && (
          <section className="container-wide pb-20">
            <div className="max-w-3xl">
              <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                Sıkça Sorulan Sorular
              </div>
              <h2 className="mt-3 text-3xl font-heading font-bold tracking-tight">
                {product.shortName} hakkında merak edilenler
              </h2>
              <div className="mt-8 divide-y divide-border border-y border-border">
                {product.faqs.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                      <h3 className="text-base sm:text-lg font-heading font-semibold leading-snug">
                        {faq.question}
                      </h3>
                      <ChevronRight
                        size={18}
                        className="mt-1 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
                      />
                    </summary>
                    <p className="mt-3 text-sm sm:text-base text-foreground/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="container-wide pb-16">
          <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-6">
            <Info size={20} className="mt-1 shrink-0 text-brand-orange" />
            <p className="text-sm sm:text-base leading-relaxed text-foreground/80">
              Araç tipi, forklift özellikleri, kot farkı vs. gibi faktörler
              rampa tasarımında belirleyici rol oynar.
            </p>
          </div>
        </section>

        {/* İlgili ürünler */}
        <section className="container-wide pb-20">
          <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
            Benzer Ürünler
          </div>
          <h2 className="mt-3 text-3xl font-heading font-bold tracking-tight">
            Diğer rampa çözümlerimiz
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedItems.map((r) => (
              <Link
                key={r.slug}
                href={`/urunler/${r.slug}`}
                className="group block p-6 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/40 transition-colors"
              >
                {r.order > 0 && (
                  <div className="text-xs font-mono text-muted-foreground">
                    0{r.order}.
                  </div>
                )}
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
