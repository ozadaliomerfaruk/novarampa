"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";

import { LinkButton, ExternalLinkButton } from "@/components/ui/link-button";
import { Magnetic } from "@/components/ui/magnetic";
import { company } from "@/lib/site-config";
import { InteractiveRamp } from "./interactive-ramp";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type HeroProps = {
  title?: string | null;
  subtitle?: string | null;
  ctaLabel?: string | null;
};

export function Hero({ title, subtitle, ctaLabel }: HeroProps = {}) {
  const defaultSubtitle =
    "Marmara'dan Türkiye geneline; menteşeli, teleskopik, dikey, mobil rampa ve makaslı platform imalatı. CE & TSE belgeli, EN 1398 uyumlu çözümler.";
  const cta = ctaLabel ?? "Hemen Teklif Al";

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 pb-12">
      {/* Atmosphere layers */}
      <div className="blueprint-lines" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[30%] left-[20%] w-[700px] h-[700px] bg-[var(--brand-orange)] rounded-full opacity-[0.06] blur-[140px]" />
        <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-blue-500 rounded-full opacity-[0.04] blur-[120px]" />
      </div>

      {/* Interactive ramp on the right */}
      <InteractiveRamp />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container-wide w-full relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/40 backdrop-blur text-xs font-medium text-foreground/80 font-mono"
        >
          <span className="size-1.5 rounded-full bg-[var(--brand-orange)] animate-pulse" />
          <span className="tabular-nums tracking-wider">
            {company.heritageSince} — {new Date().getFullYear()} · SAHA TECRÜBESİ
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mt-6 text-[clamp(3rem,9vw,9rem)] font-heading font-bold leading-[0.92] max-w-5xl"
          style={{ letterSpacing: "-0.045em" }}
        >
          {title ? (
            <span>{title}</span>
          ) : (
            <>
              Yükünüzü{" "}
              <span className="italic font-medium text-gradient-orange">
                hafifletiyoruz
              </span>
              ,
              <br className="hidden sm:block" />
              geçmişin gücüyle.
            </>
          )}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
        >
          {subtitle ?? defaultSubtitle}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <Magnetic strength={0.22}>
            <LinkButton
              href="/teklif-al"
              size="lg"
              className="h-14 px-8 text-base bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold shadow-[0_0_0_0_var(--brand-orange)] hover:shadow-[0_12px_36px_-8px_var(--brand-orange)] transition-all group"
            >
              {cta}
              <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
            </LinkButton>
          </Magnetic>
          <ExternalLinkButton
            href={company.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
            className="h-14 px-8 text-base border-border bg-background/40 backdrop-blur hover:bg-muted"
          >
            <MessageCircle className="mr-1" />
            WhatsApp&apos;tan Yaz
          </ExternalLinkButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground z-10"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
          Aşağı kaydır
        </span>
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
