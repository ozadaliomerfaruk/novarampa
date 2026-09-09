import { getSiteCopy } from "@/lib/site-copy-server";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageIntro } from "@/components/layout/page-intro";
import { QuoteForm } from "@/components/forms/quote-form";
import { getProducts } from "@/lib/catalog";
export const metadata: Metadata = {
  title: "Teklif Al",
  description: "Projenize uygun rampayı birlikte seçelim.",
  alternates: { canonical: "/teklif-al" },
};
export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ urun?: string }>;
}) {
  const copy = await getSiteCopy();
  const [products, params] = await Promise.all([getProducts(), searchParams]);
  const product = products.find(
    (p) =>
      p.slug.current === params.urun ||
      p._id === "product-" + params.urun ||
      p.name === params.urun,
  );
  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Teklif Al" }]} />
        <PageIntro
          title={copy.quotePage.title}
          description={copy.quotePage.description}
        />
        <section className="container-wide pb-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-10">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-brand-orange">
              {copy.quotePage.formEyebrow}
            </p>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {copy.quotePage.formTitle}
            </h2>
            <p className="mt-3 mb-8 text-sm text-muted-foreground">
              {copy.quotePage.formDescription}
            </p>
            <QuoteForm products={products} defaultProduct={product?.name} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
