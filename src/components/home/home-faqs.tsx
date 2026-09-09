import type { SiteCopy } from "@/lib/site-copy";
import { ChevronDown } from "lucide-react";
import type { HomeFaqItem } from "@/sanity/lib/types";

/**
 * Anasayfa SSS bölümü — Sanity'den gelen sorular & cevaplar.
 *
 * Aynı veri FaqJsonLd (structured-data.tsx) tarafından da basılır
 * → AI motorları + Google rich snippet'i için çift kaynak.
 *
 * Ana sayfa boş CMS listesini yerel sorularla tamamlayarak bu bileşene verir.
 */
export function HomeFaqs({
  faqs,
  copy,
}: {
  faqs?: HomeFaqItem[] | null;
  copy: SiteCopy["home"];
}) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section
      id="sss"
      aria-labelledby="anasayfa-sss-baslik"
      className="container-wide scroll-mt-40 py-20 md:py-28"
    >
      <div className="flex flex-col items-center">
        {/* Başlık — ortalı (Eren isteği) */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 id="anasayfa-sss-baslik" className="section-title">
            {copy.faqTitle}
          </h2>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
            {copy.faqDescription}
          </p>
        </div>

        {/* Accordion — tam genişlik, ortalı */}
        <div className="w-full max-w-3xl mx-auto">
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5 sm:py-6">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="text-base sm:text-lg font-heading font-semibold leading-snug pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className="mt-0.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-4 text-sm sm:text-base text-foreground/80 leading-relaxed max-w-2xl">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
