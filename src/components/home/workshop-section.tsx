"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

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
  title,
}: {
  photos?: WorkshopPhoto[] | null;
  title: string;
}) {
  const reduce = useReducedMotion();

  // Sanity'den 4 foto geldiyse onları kullan; yoksa default stok görseller.
  const sanityTiles: Tile[] | null =
    photos && photos.length === 4
      ? photos.map((p, i) => ({
          src: p.asset?.url
            ? p.asset.url
            : urlFor(p as unknown as { _ref?: string })
                .width(1200)
                .url(),
          alt: p.alt ?? "Atölye fotoğrafı",
          caption: `0${i + 1} — ${p.caption ?? "Saha"}`,
          label: p.caption ?? "Atölyeden",
          span: i === 0 ? "wide" : i === 3 ? "tall" : undefined,
        }))
      : null;
  const items = sanityTiles ?? tiles;

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-wide">
        <h2 className="section-title text-center mb-12">{title}</h2>

        {/* Editorial grid: 2x2 with asymmetric spans on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4">
          {items.map((t, i) => {
            const spanCls =
              t.span === "wide"
                ? "lg:col-span-7"
                : t.span === "tall"
                  ? "lg:col-span-7"
                  : "lg:col-span-5";
            const aspectCls = "aspect-[4/3] lg:aspect-auto lg:h-[360px]";

            // Scroll-reveal: tek/çift karolar yanlardan, son karo aşağıdan,
            // yumuşak ease ile içeri kayar.
            const fromSide = i % 2 === 0 ? -64 : 64;
            const initial = reduce
              ? false
              : t.span === "tall"
                ? { opacity: 0, y: 64 }
                : { opacity: 0, x: fromSide };

            return (
              <motion.figure
                key={t.src}
                initial={initial}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
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
                  {/* Hover edge glow */}
                  <div className="absolute inset-0 ring-0 ring-[var(--brand-orange)] group-hover:ring-2 transition-all duration-500 rounded-2xl pointer-events-none" />
                </div>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
