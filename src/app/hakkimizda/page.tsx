import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageIntro } from "@/components/layout/page-intro";
import { CtaSection } from "@/components/home/cta-section";
import { aboutParagraphs } from "@/lib/about";
import { siteConfig } from "@/lib/site-config";
export const metadata: Metadata = {
  title: "Hakkımızda",
  description: aboutParagraphs[0],
  alternates: { canonical: siteConfig.url + "/hakkimizda" },
};
export default function HakkimizdaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Hakkımızda" }]} />
        <PageIntro
          eyebrow="Hakkımızda"
          title="Geçmişin gücüyle, yükünüzü hafifletiyoruz."
        />
        <section className="container-wide pb-16 sm:pb-24">
          <div className="mx-auto max-w-3xl space-y-7 text-center text-lg leading-[1.85] text-foreground/85">
            {aboutParagraphs.map((p) => (
              <p key={p.slice(0, 30)} className="whitespace-pre-wrap">
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
