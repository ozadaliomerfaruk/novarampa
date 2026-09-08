import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { PageIntro } from "@/components/layout/page-intro";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CtaSection } from "@/components/home/cta-section";
import { SanityImage } from "@/components/sanity/sanity-image";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { siteConfig } from "@/lib/site-config";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allBlogPostsQuery } from "@/sanity/lib/queries";
import type { BlogPostSummary } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Blog — Yükleme Rampası Rehberi",
  description:
    "Rampa seçimi, tonaj hesabı, montaj, bakım — yükleme rampası hakkında ihtiyacınız olan her şey saha tecrübesiyle.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export const revalidate = 60;

const upcomingTopics = [
  "Yükleme Rampası Nedir, Ne İşe Yarar?",
  "Yükleme Rampası Çeşitleri ve Fonksiyonları",
  "Yükleme Rampası Nasıl Seçilir? 5 Adımda Karar Rehberi",
  "Menteşeli ve Teleskopik Rampa Arasındaki 5 Önemli Fark",
  "Yükleme Rampası Ölçüleri: Standart mı, Özel Üretim mi?",
  "Yükleme Rampası Montajı Nasıl Yapılır?",
  "Yükleme Rampası Bakımı: Yıllık Kontrol Listesi",
];

export default async function BlogPage() {
  const posts = await sanityFetch<BlogPostSummary[]>(
    allBlogPostsQuery,
    {},
    { revalidate: 60 },
  );

  const hasPosts = (posts?.length ?? 0) > 0;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
        ]}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Blog" }]} />

        <PageIntro
          title="İşinizi kolaylaştıracak rampa rehberi"
          description="Rampa seçiminde işinizi kolaylaştıracak 7 temel soruyu cevaplandırıyoruz."
        />

        {hasPosts ? (
          <section className="container-wide pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts!.map((p) => (
                <Link
                  key={p._id}
                  href={`/blog/${p.slug.current}`}
                  className="group block rounded-2xl border border-border bg-card overflow-hidden hover:border-[var(--brand-orange)]/40 transition-colors"
                >
                  {p.mainImage && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--brand-charcoal)]">
                      <SanityImage
                        image={p.mainImage}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                      <time dateTime={p.publishedAt}>
                        {new Date(p.publishedAt).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      {p.readTime && (
                        <>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock size={12} />
                            {p.readTime} dk
                          </span>
                        </>
                      )}
                    </div>
                    <h2 className="mt-3 text-xl font-heading font-semibold leading-snug group-hover:text-[var(--brand-orange)] transition-colors">
                      {p.title}
                    </h2>
                    {p.excerpt && (
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                        {p.excerpt}
                      </p>
                    )}
                    <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground/80 group-hover:text-[var(--brand-orange)] transition-colors">
                      Yazıyı oku
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="container-wide pb-20">
            <div className="rounded-3xl border border-border bg-card p-12 text-center">
              <div className="text-4xl mb-4">📝</div>
              <h2 className="text-2xl font-heading font-semibold">
                Yakında ilk yazılar yayında.
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Aşağıdaki başlıkları yakın zamanda yayınlayacağız. İçeriklerimiz
                hazır olduğunda buradan erişebileceksiniz.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
              {upcomingTopics.map((topic, i) => (
                <div
                  key={topic}
                  className="p-5 rounded-xl border border-border bg-card flex items-start gap-4"
                >
                  <div className="text-xs font-mono text-muted-foreground shrink-0 mt-0.5">
                    0{i + 1}.
                  </div>
                  <div className="text-base font-heading font-medium leading-snug">
                    {topic}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
