import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaSection } from "@/components/home/cta-section";
import { SanityImage } from "@/components/sanity/sanity-image";
import {
  BreadcrumbJsonLd,
  BlogPostingJsonLd,
  HowToJsonLd,
} from "@/components/seo/structured-data";
import { siteConfig } from "@/lib/site-config";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  blogPostBySlugQuery,
  blogPostSlugsQuery,
} from "@/sanity/lib/queries";
import type { BlogPost, SanityImage as SanityImageType } from "@/sanity/lib/types";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(
    blogPostSlugsQuery,
    {},
    { revalidate: 60 }
  );
  return (slugs ?? []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>(blogPostBySlugQuery, { slug });
  if (!post) return { title: "Yazı Bulunamadı" };

  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt ?? siteConfig.description;

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
    },
  };
}

const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageType }) => (
      <div className="my-8 rounded-2xl overflow-hidden border border-border">
        <SanityImage
          image={value}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
    ),
    callout: ({ value }: { value: { tone?: string; text?: string } }) => {
      const tones: Record<string, string> = {
        info: "border-blue-500/30 bg-blue-500/5",
        warning: "border-amber-500/30 bg-amber-500/5",
        success: "border-emerald-500/30 bg-emerald-500/5",
      };
      const cls = tones[value.tone ?? "info"] ?? tones.info;
      return (
        <aside className={`my-6 p-5 rounded-xl border ${cls}`}>
          <p className="text-sm leading-relaxed text-foreground/85">{value.text}</p>
        </aside>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 text-3xl font-heading font-bold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-2xl font-heading font-semibold tracking-tight">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="my-4 text-lg leading-relaxed text-foreground/85">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-5 border-l-2 border-[var(--brand-orange)] text-foreground/80 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--brand-orange)] underline underline-offset-2 hover:text-[var(--brand-orange-hover)]"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="text-foreground">{children}</strong>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 space-y-2 list-disc list-inside text-foreground/85">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 space-y-2 list-decimal list-inside text-foreground/85">{children}</ol>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>(blogPostBySlugQuery, { slug });
  if (!post) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
          { name: post.title, url: `${siteConfig.url}/blog/${slug}` },
        ]}
      />
      <BlogPostingJsonLd
        title={post.title}
        description={post.excerpt ?? post.title}
        slug={slug}
        publishedAt={post.publishedAt}
        author={post.author}
        readTimeMinutes={post.readTime}
        tags={post.tags}
      />
      {post.howToSteps && post.howToSteps.length > 0 && (
        <HowToJsonLd
          name={post.title}
          description={post.excerpt}
          steps={post.howToSteps}
          totalTime={post.totalTime}
        />
      )}
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

        <article className="container-wide pt-8 pb-20 max-w-4xl">
          <header className="mb-10">
            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.readTime && (
                <>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime} dk okuma
                  </span>
                </>
              )}
              {post.author && (
                <>
                  <span>·</span>
                  <span>{post.author}</span>
                </>
              )}
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.05]">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-border text-foreground/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </header>

          {post.mainImage && (
            <div className="relative aspect-[16/9] mb-10 overflow-hidden rounded-3xl border border-border bg-[var(--brand-charcoal)]">
              <SanityImage
                image={post.mainImage}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {post.body ? (
            <div className="prose prose-invert max-w-none">
              <PortableText value={post.body} components={portableComponents} />
            </div>
          ) : (
            <p className="text-muted-foreground italic">
              Bu yazının içeriği henüz hazırlanıyor.
            </p>
          )}

          {/* HowTo adımları — varsa ekstra olarak göster */}
          {post.howToSteps && post.howToSteps.length > 0 && (
            <section className="mt-16 pt-10 border-t border-border">
              <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
                Adım Adım Rehber
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-heading font-bold tracking-tight">
                Nasıl yapılır?
              </h2>
              {post.totalTime && (
                <div className="mt-3 text-sm text-muted-foreground">
                  ⏱ Toplam süre: <strong className="text-foreground">{post.totalTime}</strong>
                </div>
              )}
              <ol className="mt-8 space-y-6">
                {post.howToSteps.map((step, i) => (
                  <li
                    key={step.name}
                    className="relative pl-14 pr-2 py-2"
                  >
                    <div className="absolute left-0 top-2 inline-flex items-center justify-center size-10 rounded-full bg-[var(--brand-orange)] text-white text-base font-heading font-bold">
                      {i + 1}
                    </div>
                    <h3 className="text-lg sm:text-xl font-heading font-semibold leading-tight">
                      {step.name}
                    </h3>
                    <p className="mt-2 text-base text-foreground/80 leading-relaxed">
                      {step.text}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <div className="mt-16 pt-8 border-t border-border">
            <Link
              href="/blog"
              className="text-sm font-medium text-foreground/80 hover:text-[var(--brand-orange)] transition-colors"
            >
              ← Tüm yazılara dön
            </Link>
          </div>
        </article>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
