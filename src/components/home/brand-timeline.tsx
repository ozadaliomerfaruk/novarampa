"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Award, Building2, Rocket, GitBranch } from "lucide-react";

type Milestone = {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  featured?: boolean;
};

const milestones: Milestone[] = [
  {
    year: "2003",
    title: "Dinamik Mühendislik",
    description:
      "İlk montaj. Demir, kaynak, hidrolik. Sektörle ilk tanışma — sahada çıraklık.",
    icon: GitBranch,
  },
  {
    year: "2008",
    title: "İlk Kurumsal Atılım",
    description:
      "Otomotiv ve gıda sanayinin büyük markalarıyla ilk seri projeler. Standartlar olgunlaştı.",
    icon: Building2,
  },
  {
    year: "2015",
    title: "Yüzlerce Saha",
    description:
      "Yüzlerce rampa teslim edildi. Marmara'nın haritası çıktı; her ilin ihtiyacı tanıdık.",
    icon: Award,
  },
  {
    year: "2022",
    title: "Nova Rampa",
    description:
      "Köklü ustalığın üzerine yeni nesil marka. 'Nova' yeniliği, 'Rampa' yolu temsil eder.",
    icon: Sparkles,
    featured: true,
  },
  {
    year: "2026",
    title: "Dijital Sayfa",
    description:
      "novarampa.com canlıda. Bugüne kadar yapılan her şey artık tek bir adresten görülebilir.",
    icon: Rocket,
  },
];

export function BrandTimeline() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-24 sm:py-32 surface-dark overflow-hidden">
      {/* Atmosfer — koyu fon üzerinde turuncu glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[var(--brand-orange)] rounded-full opacity-[0.06] blur-[160px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-wide relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono uppercase tracking-[0.22em] text-white/70">
            <span className="size-1.5 rounded-full bg-[var(--brand-orange)]" />
            Miras
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.05] text-white">
            Üç kuşağın
            <br />
            <span className="text-gradient-orange">demir kokusu.</span>
          </h2>
          <p className="mt-5 text-white/65 leading-relaxed max-w-xl">
            2003&apos;te bir atölyede başladık. Bugün Nova Rampa olarak aynı
            tutkuyla, daha geniş bir vizyonla yola devam ediyoruz.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-16 relative">
          {/* Yatay çizgi */}
          <div className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent hidden md:block" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 relative">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group relative"
              >
                {/* Nokta */}
                <div className="flex items-center justify-center md:justify-start mb-6 md:mb-8">
                  <div
                    className={`relative inline-flex items-center justify-center size-12 rounded-full transition-all duration-500 ${
                      m.featured
                        ? "bg-[var(--brand-orange)] text-white shadow-[0_0_0_4px_rgba(249,115,22,0.18)] group-hover:shadow-[0_0_0_8px_rgba(249,115,22,0.25)] group-hover:scale-110"
                        : "bg-white/10 text-white/80 border border-white/15 group-hover:bg-white/20 group-hover:scale-110"
                    }`}
                  >
                    <m.icon size={18} />
                    {m.featured && (
                      <span className="absolute -top-1 -right-1 size-3 bg-[var(--brand-orange)] rounded-full animate-ping opacity-75" />
                    )}
                  </div>
                </div>

                {/* Yıl */}
                <div
                  className={`font-heading font-bold tabular-nums leading-none transition-colors ${
                    m.featured
                      ? "text-[var(--brand-orange)]"
                      : "text-white"
                  } text-3xl md:text-4xl`}
                >
                  {m.year}
                </div>

                {/* Başlık */}
                <h3 className="mt-3 text-base font-heading font-semibold text-white">
                  {m.title}
                </h3>

                {/* Açıklama */}
                <p className="mt-2 text-xs sm:text-sm text-white/55 leading-relaxed">
                  {m.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
