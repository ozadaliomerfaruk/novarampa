"use client";

import Image from "next/image";
import { HeroVideo } from "./hero-video";
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
  const cta = ctaLabel ?? "Teklif Al";
  const videoSrc = videoUrl?.trim() || "/videos/hero-workshop-loop.mp4";

  return (
    <section className="relative isolate min-h-[100svh] flex items-center justify-center overflow-hidden">
      <HeroVideo src={videoSrc} />

      {/* ─── Centered content ─── */}
      <motion.div
        variants={containerVariants}
        initial={false}
        animate="show"
        className="container-wide relative z-10 text-center flex flex-col items-center pt-32 md:pt-44 pb-24"
      >
        {/* Baskerville Old Face Bold: outlines keep the exact wordmark on every device. */}
        <motion.h1
          variants={itemVariants}
          className="w-full max-w-5xl text-[clamp(2.5rem,8.5vw,7rem)] font-bold leading-[0.98] text-white"
          style={{
            fontFamily: '"Baskerville Old Face", Baskerville, Georgia, serif',
          }}
        >
          {heading.toLocaleUpperCase("tr-TR") === "NOVARAMPA" ? (
            <>
              <span className="sr-only">NOVARAMPA</span>
              <Image
                src="/brand/novarampa-baskerville.svg"
                width={1193}
                height={134}
                alt=""
                priority
                unoptimized
                className="h-auto w-full"
              />
            </>
          ) : (
            heading
          )}
        </motion.h1>

        {/* Slogan — italik, bir tık büyük */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-xl sm:text-[1.7rem] italic text-white/85 leading-relaxed"
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
              className="h-13 px-7 text-base bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-primary-foreground font-semibold transition-all group"
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
            WhatsApp
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
