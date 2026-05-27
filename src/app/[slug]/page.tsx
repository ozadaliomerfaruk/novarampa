import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaSection } from "@/components/home/cta-section";
import { SanityImage } from "@/components/sanity/sanity-image";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { siteConfig } from "@/lib/site-config";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  allPublishedPagesQuery,
  pageBySlugQuery,
} from "@/sanity/lib/queries";
import type {
  CustomPage,
  SanityImage as SanityImageType,
} from "@/sanity/lib/types";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

/**
 * Eren'in Sanity'de oluşturduğu özel sayfalar — /<slug>
 *
 * Next.js routing: bu dinamik route SADECE eşleşmeyen URL'ler için çalışır.
 * /urunler, /hakkimizda gibi mevcut static route'lar otomatik öncelikli.
 *
 * Sanity'de "Yayında" (status: published) olmayan sayfalar 404 verir.
 */

export async function generateStaticParams() {
  const pages = await sanityFetch<{ slug: string }[]>(
    allPublishedPagesQuery,
    {},
    { revalidate: 60 }
  );
  return (pages ?? []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await sanityFetch<CustomPage>(pageBySlugQuery, { slug });
  if (!page) return { title: "Sayfa Bulunamadı" };

  const title = page.seo?.title?.trim() || page.title;
  const description =
    page.seo?.description?.trim() || page.excerpt || siteConfig.description;

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/${slug}` },
    openGraph: { title, description, type: "article" },
  };
}

const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageType & { alt?: string } }) => (
      <div className="my-8 rounded-2xl overflow-hidden border border-border">
        <SanityImage
          image={value}
          width={1200}
          height={750}
          alt={value.alt ?? ""}
          className="w-full h-auto"
        />
      </div>
    ),
    callout: ({
      value,
    }: {
      value: { tone?: "info" | "warning" | "success"; text?: string };
    }) => {
      const tone = value.tone ?? "info";
      const styles: Record<string, string> = {
        info: "border-blue-500/20 bg-blue-500/5 text-blue-900 dark:text-blue-200",
        warning:
          "border-yellow-500/20 bg-yellow-500/5 text-yellow-900 dark:text-yellow-200",
        success:
          "border-green-500/20 bg-green-500/5 text-green-900 dark:text-green-200",
      };
      return (
        <div className={`my-6 p-5 rounded-xl border ${styles[tone]}`}>
          {value.text}
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-heading font-bold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-2 text-xl font-heading font-semibold">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-heading font-semibold">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-5 border-l-4 border-[var(--brand-orange)] italic text-foreground/85">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-4 text-base sm:text-lg leading-relaxed text-foreground/85">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-1.5 text-foreground/85">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-1.5 text-foreground/85">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-[var(--brand-orange)] hover:underline"
      >
        {children}
      </a>
    ),
  },
};

export default async function CustomPageRoute({ params }: Props) {
  const { slug } = await params;
  const page = await sanityFetch<CustomPage>(pageBySlugQuery, { slug });

  if (!page) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: page.title, url: `${siteConfig.url}/${slug}` },
        ]}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: page.title }]} />

        {/* HERO — varsa görselli, yoksa sade başlık */}
        {page.heroImage ? (
          <section className="container-wide pt-8 pb-4">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-border">
              <SanityImage
                image={page.heroImage}
                fill
                priority
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-ink)]/80 via-[var(--brand-ink)]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 max-w-3xl">
                <h1 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight leading-[1.05] text-white">
                  {page.title}
                </h1>
                {page.excerpt && (
                  <p className="mt-3 text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed">
                    {page.excerpt}
                  </p>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="container-wide py-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight leading-[1.05]">
                {page.title}
              </h1>
              {page.excerpt && (
                <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                  {page.excerpt}
                </p>
              )}
            </div>
          </section>
        )}

        {/* GÖVDE — Portable Text içerik */}
        <article className="container-wide py-8 pb-20">
          <div className="max-w-3xl mx-auto">
            {page.body && page.body.length > 0 ? (
              <PortableText
                value={page.body}
                components={portableComponents}
              />
            ) : (
              <p className="text-muted-foreground italic">
                Bu sayfanın içeriği henüz eklenmedi.
              </p>
            )}
            {page._updatedAt && (
              <div className="mt-12 pt-6 border-t border-border text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Son güncelleme:{" "}
                {new Date(page._updatedAt).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            )}
          </div>
        </article>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
