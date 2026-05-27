"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Stat = {
  /** Sayısal hedef (animasyon için) ya da string vurgu */
  value: number | string;
  suffix?: string;
  label: string;
  caption?: string;
};

// Default — Sanity'de "Site Ayarları → İstatistikler" boşsa bunlar kullanılır.
const defaultStats: Stat[] = [
  { value: 23, suffix: "+", label: "Yıllık Miras", caption: "2003'ten beri sahada" },
  { value: 150, suffix: "+", label: "Proje Teslimi", caption: "İmalat + montaj" },
  { value: 20, suffix: "T", label: "Kapasiteye Kadar", caption: "Mobil + Makaslı dahil" },
  { value: 11, suffix: " İL", label: "Marmara + Türkiye", caption: "Genelinde sevkiyat" },
];

function CountUp({ to, duration = 1500 }: { to: number; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  // amount: 0.1 → element'in %10'u görünür olduğunda tetikle, margin yok
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  // Fallback: mobile'da IntersectionObserver bir sebepten tetiklenmezse,
  // 2.5sn sonra hedef değere snap et (kullanıcı "0+" görmesin).
  useEffect(() => {
    const timer = setTimeout(() => {
      setN((current) => (current === 0 && to !== 0 ? to : current));
    }, 2500);
    return () => clearTimeout(timer);
  }, [to]);

  // Reduced motion: hedef değeri direkt göster (animasyonsuz)
  return <span ref={ref}>{reduce ? to : n}</span>;
}

export function StatStrip({ stats }: { stats?: Stat[] | null }) {
  // Sanity'den gelen stat varsa onu kullan, yoksa default
  const items: Stat[] =
    stats && stats.length === 4 ? stats : defaultStats;

  return (
    <section
      aria-label="Şirket istatistikleri"
      className="relative border-y border-border bg-[var(--brand-charcoal)]/30 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="container-wide relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border/60">
          {items.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="px-6 py-10 lg:py-16 first:pl-0 last:pr-0 lg:px-10 flex flex-col justify-between gap-4 min-h-[180px] group"
            >
              <div className="flex items-baseline gap-2 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
                <span className="text-[var(--brand-orange)]">0{i + 1}</span>
                <span>/04</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-0 leading-none font-heading font-bold tabular-nums overflow-hidden">
                  <span className="text-[clamp(2.75rem,5.5vw,5rem)] tracking-[-0.045em] text-foreground group-hover:text-[var(--brand-orange)] transition-colors duration-500">
                    {typeof s.value === "number" ? <CountUp to={s.value} /> : s.value}
                  </span>
                  {s.suffix && (
                    <span className="text-[clamp(1rem,2vw,1.75rem)] text-muted-foreground ml-1 font-medium">
                      {s.suffix}
                    </span>
                  )}
                </div>
                <div className="text-sm font-medium text-foreground/80">
                  {s.label}
                </div>
                {s.caption && (
                  <div className="text-xs text-muted-foreground">
                    {s.caption}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
