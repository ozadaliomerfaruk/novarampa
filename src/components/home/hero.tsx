"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Award,
  Wrench,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

import { LinkButton, ExternalLinkButton } from "@/components/ui/link-button";
import { Magnetic } from "@/components/ui/magnetic";
import { company } from "@/lib/site-config";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type HeroProps = {
  title?: string | null;
  subtitle?: string | null;
  ctaLabel?: string | null;
  videoUrl?: string | null;
  certifications?: string[] | null;
};

const trustChips: { icon: LucideIcon; label: string }[] = [
  { icon: Award, label: "CE & TSE Belgeli" },
  { icon: ShieldCheck, label: "EN 1398 Uyumlu" },
  { icon: Wrench, label: "2 Yıl Garanti" },
];

export function Hero({
  title,
  subtitle,
  ctaLabel,
  videoUrl,
  certifications,
}: HeroProps = {}) {
  const defaultSubtitle =
    "Hidrolik yükleme rampası, teleskopik, makaslı platform — fabrika ve depo girişleri için anahtar teslim imalat, montaj ve servis.";
  const cta = ctaLabel ?? "Hemen Teklif Al";
  const videoSrc = videoUrl ?? "/videos/hero-bg.mp4";

  // Sanity'den gelen sertifika listesi varsa onu kullan, yoksa default trust chips
  const sanityChips =
    certifications && certifications.length > 0
      ? certifications.map((label, i) => ({
          icon: i === 0 ? Award : i === 1 ? ShieldCheck : Wrench,
          label,
        }))
      : null;
  const chips = sanityChips ?? trustChips;

  return (
    <section className="relative min-h-[88svh] flex items-center justify-center overflow-hidden">
      {/* ─── Background video (full-bleed, autoplay, muted, looped) ─── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[var(--brand-ink)]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          key={videoSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Dark gradient overlay — content readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-ink)]/85 via-[var(--brand-ink)]/55 to-[var(--brand-ink)]/85" />
        {/* Subtle radial highlight at center to draw focus to copy */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(20,34,53,0.4)_70%)]" />
        {/* Soft orange glow accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[var(--brand-orange)] rounded-full opacity-[0.08] blur-[160px] pointer-events-none" />
      </div>

      {/* ─── Centered content ─── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container-wide relative z-10 text-center flex flex-col items-center pt-28 md:pt-36 pb-16"
      >
        {/* Eyebrow */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md text-xs font-medium text-white/85 font-mono"
        >
          <span className="size-1.5 rounded-full bg-[var(--brand-orange)] animate-pulse" />
          <span className="tabular-nums tracking-wider">
            {company.heritageSince} — {new Date().getFullYear()} · SAHA TECRÜBESİ
          </span>
        </motion.div>

        {/* H1 — centered, white */}
        <motion.h1
          variants={itemVariants}
          className="mt-6 text-[clamp(2.5rem,6vw,5rem)] font-heading font-bold leading-[1.02] tracking-tight max-w-4xl text-white"
          style={{ letterSpacing: "-0.035em" }}
        >
          {title ? (
            <span>{title}</span>
          ) : (
            <>
              Yükleme rampası{" "}
              <span className="italic font-medium text-gradient-orange">
                imalatçısı.
              </span>
              <br className="hidden sm:block" />
              Marmara&apos;dan Türkiye geneline.
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-base sm:text-lg text-white/75 leading-relaxed"
        >
          {subtitle ?? defaultSubtitle}
        </motion.p>

        {/* Trust chips */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {chips.map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md text-xs font-medium text-white/85"
            >
              <chip.icon size={12} className="text-[var(--brand-orange)]" />
              {chip.label}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Magnetic strength={0.22}>
            <LinkButton
              href="/teklif-al"
              size="lg"
              className="h-13 px-7 text-base bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold shadow-[0_8px_30px_-8px_var(--brand-orange)] hover:shadow-[0_16px_44px_-10px_var(--brand-orange)] transition-all group"
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
            className="h-13 px-7 text-base border-white/25 bg-white/[0.04] backdrop-blur-md text-white hover:bg-white/[0.12] hover:border-white/40"
          >
            <MessageCircle className="mr-1" />
            WhatsApp&apos;tan Yaz
          </ExternalLinkButton>
        </motion.div>
      </motion.div>

      {/* ─── Scroll cue ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/70 z-10"
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
