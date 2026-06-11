"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";

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
};

export function Hero({ title, subtitle, ctaLabel, videoUrl }: HeroProps = {}) {
  const heading = title?.trim() || "NOVARAMPA";
  const tagline =
    subtitle?.trim() || "Geçmişin Gücüyle, Yükünüzü Hafifletiyoruz...";
  const cta = ctaLabel ?? "Hemen Teklif Al";
  const videoSrc = videoUrl ?? "/videos/hero-bg.mp4";

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
        {/* H1 — wordmark, centered, white */}
        <motion.h1
          variants={itemVariants}
          className="text-[clamp(2.75rem,7vw,5.5rem)] font-heading font-bold leading-[1.02] max-w-5xl text-white"
          style={{ letterSpacing: "0.02em" }}
        >
          {heading}
        </motion.h1>

        {/* Slogan */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-lg sm:text-2xl text-white/85 leading-relaxed"
        >
          {tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
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

      {/* ─── Scroll cue (sadece ok) ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
