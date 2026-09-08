import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageIntro } from "@/components/layout/page-intro";
import { SanityImage } from "@/components/sanity/sanity-image";
import { ExpandableText } from "@/components/products/expandable-text";
import { getSpareParts } from "@/lib/catalog";
export const metadata: Metadata = {
  title: "Yedek Parça — Yükleme Rampası Parçaları",
  description:
    "Tüm Novarampa ürünleri ve diğer uyumlu modeller için yedek parça desteği.",
  alternates: { canonical: "/yedek-parca" },
};
export const revalidate = 30;
export default async function SparePartsPage() {
  const parts = await getSpareParts();
  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Yedek Parça" }]} />
        <PageIntro
          eyebrow="Yedek Parça"
          title="Rampanız susmasın, üretiminiz durmasın."
          description="Tüm Novarampa ürünleri ve diğer uyumlu modeller için yedek parça desteği alın."
        />
        <section className="container-wide pb-12" aria-label="Yedek parçalar">
          <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {parts.map((p) => (
              <article
                id={p.slug?.current}
                key={p._id}
                className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand-orange"
              >
                {p.image && (
                  <div className="relative aspect-[4/3] bg-[var(--brand-charcoal)]">
                    <SanityImage
                      image={p.image}
                      fill
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-heading text-xl font-semibold">
                      {p.name}
                    </h2>
                    {typeof p.available === "boolean" && (
                      <span className="shrink-0 rounded border border-border px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {p.available ? "Stokta" : "Stok yok"}
                      </span>
                    )}
                  </div>
                  {p.description && <ExpandableText text={p.description} />}
                  {!!p.compatibleWith?.length && (
                    <div className="mt-5 border-t border-border pt-4">
                      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Uyumlu ürünler
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.compatibleWith.map((c) => (
                          <Link
                            key={c._id}
                            href={"/urunler/" + c.slug.current}
                            className="rounded border border-border px-2 py-1 text-xs hover:border-brand-orange"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <Link
                    href={
                      "/yedek-parca-talep?parca=" + encodeURIComponent(p._id)
                    }
                    className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand-orange"
                  >
                    Bu parçayı talep et
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {!parts.length && (
            <p className="text-center text-muted-foreground">
              Parça ihtiyacınızı aşağıdaki formdan bize iletebilirsiniz.
            </p>
          )}
        </section>
        <section className="container-wide pb-20">
          <div className="rounded-3xl border border-brand-orange/30 bg-brand-orange/5 p-6 text-center sm:p-12">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Yedek parça ihtiyacınızı bildirin.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Parça adını veya modelinizi seçin, talebinizi bize iletin.
            </p>
            <Link
              href="/yedek-parca-talep"
              className="mt-7 inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-brand-orange px-7 font-semibold text-white hover:bg-[var(--brand-orange-hover)]"
            >
              Parça Talep Formu
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
