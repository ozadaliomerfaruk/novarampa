import type { Metadata } from "next";
import { ArrowRight, MessageCircle, Wrench } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { LinkButton, ExternalLinkButton } from "@/components/ui/link-button";
import { SanityImage } from "@/components/sanity/sanity-image";
import { BreadcrumbJsonLd } from "@/components/seo/structured-data";
import { company, siteConfig } from "@/lib/site-config";
import { sanityFetch } from "@/sanity/lib/fetch";
import { sparePartsQuery } from "@/sanity/lib/queries";
import type { SparePart } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Yedek Parça — Yükleme Rampası Parçaları",
  description:
    "Hidrolik silindir, motor, contalar, lastik flap, kontrol kutusu ve daha fazlası. Tüm rampa modellerimize uyumlu orijinal yedek parça.",
  alternates: { canonical: `${siteConfig.url}/yedek-parca` },
};

export const revalidate = 60;

const placeholderCategories = [
  {
    name: "Hidrolik Sistem",
    items: ["Hidrolik silindir", "Hidrolik motor", "Hidrolik hortum", "Yağ contası"],
  },
  {
    name: "Elektrik Sistem",
    items: ["Kontrol kutusu", "Buton paneli", "Limit anahtarı", "Kablo seti"],
  },
  {
    name: "Mekanik Aksam",
    items: ["Menteşe pimleri", "Dil mekanizması", "Yay sistemi", "Çelik halat"],
  },
  {
    name: "Tampon & Conta",
    items: ["Lastik flap", "Kapı contası", "Çarpma tamponu", "Köşe koruyucu"],
  },
];

export default async function YedekParcaPage() {
  const parts = await sanityFetch<SparePart[]>(
    sparePartsQuery,
    {},
    { revalidate: 60 }
  );
  const hasParts = (parts?.length ?? 0) > 0;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana sayfa", url: siteConfig.url },
          { name: "Yedek Parça", url: `${siteConfig.url}/yedek-parca` },
        ]}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Yedek Parça" }]} />

        <section className="container-wide py-12">
          <div className="max-w-3xl">
            <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
              Yedek Parça
            </div>
            <h1 className="mt-3 text-5xl sm:text-6xl font-heading font-bold tracking-tight">
              Rampanız susmasın,
              <br />
              <span className="text-gradient-orange">üretiminiz durmasın.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Tüm Nova Rampa ürünlerimize ve sektörün standart rampalarına
              uyumlu yedek parça stoğumuz mevcuttur.
            </p>
          </div>
        </section>

        {hasParts ? (
          <section className="container-wide pb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {parts!.map((p) => (
                <div
                  key={p._id}
                  className="rounded-2xl border border-border bg-card overflow-hidden hover:border-[var(--brand-orange)]/30 transition-colors"
                >
                  {p.image && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--brand-charcoal)]">
                      <SanityImage
                        image={p.image}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-heading font-semibold">{p.name}</h3>
                      {typeof p.available === "boolean" && (
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                            p.available
                              ? "border-emerald-500/30 text-emerald-400"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          {p.available ? "Stokta" : "Stok yok"}
                        </span>
                      )}
                    </div>
                    {p.description && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                        {p.description}
                      </p>
                    )}
                    {p.compatibleWith && p.compatibleWith.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                          Uyumlu Ürünler
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {p.compatibleWith.map((c) => (
                            <span
                              key={c._id}
                              className="text-[11px] font-mono px-2 py-0.5 rounded border border-border bg-background/60"
                            >
                              {c.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="container-wide pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {placeholderCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="p-6 rounded-2xl border border-border bg-card"
                >
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center size-10 rounded-lg bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]">
                      <Wrench size={18} />
                    </div>
                    <h3 className="text-lg font-heading font-semibold">{cat.name}</h3>
                  </div>
                  <ul className="mt-5 space-y-2 text-sm text-foreground/85">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="size-1 rounded-full bg-[var(--brand-orange)]/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="container-wide pb-20">
          <div className="rounded-3xl border border-[var(--brand-orange)]/30 bg-gradient-to-br from-[var(--brand-orange)]/10 to-transparent p-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-heading font-bold tracking-tight">
                Yedek parça ihtiyacınızı bildirin.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Parça adını veya modelinizi yazın, stok durumumuzu ve teslimat
                süresini hızlıca paylaşalım.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <LinkButton
                  href="/servis"
                  size="lg"
                  className="h-14 px-8 text-base bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-[var(--brand-black)] font-semibold group"
                >
                  Parça Talep Formu
                  <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                </LinkButton>
                <ExternalLinkButton
                  href={company.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base border-border bg-background/40"
                >
                  <MessageCircle className="mr-1" />
                  WhatsApp&apos;tan Yaz
                </ExternalLinkButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
