"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { WorkshopPhoto } from "@/sanity/lib/types";

type Tile = {
  src: string;
  alt: string;
  caption: string;
  label: string;
  span?: "wide" | "tall";
};

// Şimdilik Unsplash industrial stock görseller — Eren kendi fotoğrafları
// hazır olunca Sanity üzerinden değiştirebilir.
const tiles: Tile[] = [
  {
    src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=85&auto=format&fit=crop",
    alt: "Atölyede kaynak çalışması — kıvılcımlar uçuşuyor",
    caption: "01 — Atölye",
    label: "Kaynak ve çelik konstrüksiyon",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=900&q=85&auto=format&fit=crop",
    alt: "Hidrolik silindir ve mekanizma yakın çekim",
    caption: "02 — Üretim",
    label: "Hidrolik montaj hattı",
  },
  {
    src: "https://images.unsplash.com/photo-1597844808175-13d4ba6e02cb?w=900&q=85&auto=format&fit=crop",
    alt: "Yükleme rampası montajı — saha çalışması",
    caption: "03 — Montaj",
    label: "Sahaya kurulum ve test",
  },
  {
    src: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=1200&q=85&auto=format&fit=crop",
    alt: "Tamamlanmış rampa — kamyon yanaşmış teslim sahnesi",
    caption: "04 — Teslim",
    label: "İşletmeye devir ve eğitim",
    span: "tall",
  },
];

export function WorkshopSection({
  photos,
}: {
  photos?: WorkshopPhoto[] | null;
}) {
  const reduce = useReducedMotion();

  // Sanity'den 4 foto geldiyse onları kullan; yoksa default stok görseller.
  const sanityTiles: Tile[] | null =
    photos && photos.length === 4
      ? photos.map((p, i) => ({
          src: p.asset?.url
            ? p.asset.url
            : urlFor(p as unknown as { _ref?: string }).width(1200).url(),
          alt: p.alt ?? "Atölye fotoğrafı",
          caption: `0${i + 1} — ${p.caption ?? "Saha"}`,
          label: p.caption ?? "Atölyeden",
          span: i === 0 ? "wide" : i === 3 ? "tall" : undefined,
        }))
      : null;
  const items = sanityTiles ?? tiles;
  const usingDefaults = sanityTiles === null;

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
              Atölyeden
            </div>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.05]">
              Demirin sesi,
              <br />
              hidroliğin nefesi.
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl">
              Çorlu atölyemizde üretim, Sultanbeyli ofisimizden koordinasyon,
              sahada kurulum — her aşamasını biz yapıyoruz. Aşağıda kısa bir
              kesit.
            </p>
          </div>
          <Link
            href="/hakkimizda"
            className="group inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-[var(--brand-orange)] transition-colors"
          >
            Hakkımızda
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Editorial grid: 2x2 with asymmetric spans on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4">
          {items.map((t, i) => {
            const spanCls =
              t.span === "wide"
                ? "lg:col-span-7"
                : t.span === "tall"
                ? "lg:col-span-7 lg:row-span-2"
                : "lg:col-span-5";
            const aspectCls = t.span === "tall" ? "lg:aspect-[4/5]" : "aspect-[4/3]";

            return (
              <motion.figure
                key={t.src}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`${spanCls} group relative overflow-hidden rounded-2xl border border-border bg-card`}
              >
                <div className={`relative ${aspectCls} overflow-hidden`}>
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy-dark)]/85 via-[var(--brand-navy-dark)]/0 to-transparent" />
                  {/* Caption */}
                  <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <div className="text-xs font-mono uppercase tracking-[0.22em] text-white/70">
                      {t.caption}
                    </div>
                    <div className="mt-1 text-lg sm:text-xl font-heading font-semibold">
                      {t.label}
                    </div>
                  </figcaption>
                  {/* Hover edge glow */}
                  <div className="absolute inset-0 ring-0 ring-[var(--brand-orange)] group-hover:ring-2 transition-all duration-500 rounded-2xl pointer-events-none" />
                </div>
              </motion.figure>
            );
          })}
        </div>

        {usingDefaults && (
          <p className="mt-8 text-xs text-muted-foreground italic max-w-2xl">
            ℹ️ Yukarıdaki görseller geçici olarak stok foto kullanmaktadır.
            Sanity → Site Ayarları → Atölye Fotoğrafları üzerinden değiştirilebilir.
          </p>
        )}
      </div>
    </section>
  );
}
