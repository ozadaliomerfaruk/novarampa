"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";

import { LinkButton, ExternalLinkButton } from "@/components/ui/link-button";
import { company } from "@/lib/site-config";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

type HeroProps = {
  /** Sanity'den gelen override başlık. Tanımsızsa default stilize başlık gösterilir. */
  title?: string | null;
  subtitle?: string | null;
  ctaLabel?: string | null;
};

export function Hero({ title, subtitle, ctaLabel }: HeroProps = {}) {
  const defaultSubtitle =
    "Marmara'dan Türkiye geneline; menteşeli, teleskopik, dikey, mobil rampa ve makaslı platform imalatı. CE & TSE belgeli, EN 1398 uyumlu çözümler.";
  const cta = ctaLabel ?? "Hemen Teklif Al";

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10 grid-bg mask-fade-bottom" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--brand-orange)] rounded-full opacity-[0.08] blur-[120px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container-wide w-full"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/40 backdrop-blur text-xs font-medium text-foreground/80"
        >
          <span className="size-1.5 rounded-full bg-[var(--brand-orange)] animate-pulse" />
          {company.heritageSince} – {new Date().getFullYear()} arası saha deneyimi
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold tracking-tight leading-[1.02] max-w-5xl"
        >
          {title ? (
            // Sanity'den gelen ham başlık — düz metin
            <span>{title}</span>
          ) : (
            <>
              Yükünüzü{" "}
              <span className="text-gradient-orange">hafifletiyoruz</span>,
              <br className="hidden sm:block" />
              geçmişin gücüyle.
            </>
          )}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
        >
          {subtitle ?? defaultSubtitle}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <LinkButton
            href="/teklif-al"
            size="lg"
            className="h-14 px-8 text-base bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-[var(--brand-black)] font-semibold shadow-[0_0_0_0_var(--brand-orange)] hover:shadow-[0_12px_36px_-8px_var(--brand-orange)] transition-all group"
          >
            {cta}
            <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
          </LinkButton>
          <ExternalLinkButton
            href={company.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
            className="h-14 px-8 text-base border-border bg-background/40 backdrop-blur hover:bg-muted"
          >
            <MessageCircle className="mr-1" />
            WhatsApp'tan Yaz
          </ExternalLinkButton>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl"
        >
          {[
            { value: "20+", label: "yıllık miras" },
            { value: "Yüzlerce", label: "proje teslim" },
            { value: "20 ton", label: "kapasiteye kadar" },
            { value: "Marmara", label: "+ Türkiye geneli" },
          ].map((s, i) => (
            <div key={i} className="border-l border-border pl-4">
              <div className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
      >
        <span className="text-[10px] uppercase tracking-widest">Aşağı kaydır</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
