import { getSiteCopy } from "@/lib/site-copy-server";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageIntro } from "@/components/layout/page-intro";
import { ServiceForm } from "@/components/forms/service-form";
import { getProducts, getSpareParts } from "@/lib/catalog";
export const metadata: Metadata = {
  title: "Yedek Parça Talep Formu",
  description:
    "Rampanız için ihtiyacınız olan yedek parçayı seçin ve talebinizi iletin.",
  alternates: { canonical: "/yedek-parca-talep" },
};
export default async function SparePartRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ parca?: string }>;
}) {
  const copy = await getSiteCopy();
  const [products, parts, params] = await Promise.all([
    getProducts(),
    getSpareParts(),
    searchParams,
  ]);
  const part = parts.find(
    (p) => p._id === params.parca || p.slug?.current === params.parca,
  );
  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumb
          items={[
            { label: "Yedek Parça", href: "/yedek-parca" },
            { label: "Yedek Parça Talebi" },
          ]}
        />
        <PageIntro
          title={copy.spareRequestPage.title}
          description={copy.spareRequestPage.description}
        />
        <section className="container-wide pb-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-10">
            <ServiceForm
              kind="sparePart"
              products={products}
              parts={parts}
              defaultPart={part?.name}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
