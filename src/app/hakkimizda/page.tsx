import { getSiteCopy } from "@/lib/site-copy-server";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageIntro } from "@/components/layout/page-intro";
import { CtaSection } from "@/components/home/cta-section";
import { siteConfig } from "@/lib/site-config";
export async function generateMetadata(): Promise<Metadata> {
  const copy = await getSiteCopy();
  return {
    title: "Hakkımızda",
    description: copy.about.body.split(/\r?\n\s*\r?\n/)[0],
    alternates: { canonical: siteConfig.url + "/hakkimizda" },
  };
}
export default async function HakkimizdaPage() {
  const copy = await getSiteCopy();
  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Hakkımızda" }]} />
        <PageIntro eyebrow="Hakkımızda" title={copy.about.title} />
        <section className="container-wide pb-16 sm:pb-24">
          <div className="mx-auto max-w-3xl space-y-7 text-center text-lg leading-[1.85] text-foreground/85">
            {copy.about.body
              .split(/\r?\n\s*\r?\n/)
              .filter((p) => p.trim())
              .map((p, i) => (
                <p key={i} className="whitespace-pre-wrap">
                  {p}
                </p>
              ))}
          </div>
        </section>
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
