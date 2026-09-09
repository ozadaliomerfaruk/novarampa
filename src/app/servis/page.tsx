import { getSiteCopy } from "@/lib/site-copy-server";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageIntro } from "@/components/layout/page-intro";
import { ServiceForm } from "@/components/forms/service-form";
import { getProducts } from "@/lib/catalog";
export const metadata: Metadata = {
  title: "Servis Talep — Bakım ve Onarım",
  description:
    "Servis talepleriniz için formu doldurmanız yeterli. Ekibimiz en kısa zamanda dönüş sağlayacaktır.",
  alternates: { canonical: "/servis" },
};
export default async function ServicePage() {
  const copy = await getSiteCopy();
  const products = await getProducts();
  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Servis" }]} />
        <PageIntro
          eyebrow="Servis"
          title={copy.servicePage.title}
          description={copy.servicePage.description}
        />
        <section className="container-wide pb-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-10">
            <h2 className="mb-8 font-heading text-2xl font-bold sm:text-3xl">
              {copy.servicePage.formTitle}
            </h2>
            <ServiceForm products={products} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
