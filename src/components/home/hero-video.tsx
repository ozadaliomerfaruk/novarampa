"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
export function HeroVideo({ src }: { src: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reducedMotion) video.current?.pause();
  }, [reducedMotion]);
  return (
    <>
      <div
        className="absolute inset-0 -z-10 bg-[var(--brand-ink)]"
        aria-hidden="true"
      >
        <video
          ref={video}
          key={src}
          autoPlay={!reducedMotion}
          loop
          muted
          playsInline
          preload="metadata"
          poster="/videos/hero-poster.jpg"
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          className="size-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-ink)]/75 via-[var(--brand-ink)]/50 to-[var(--brand-ink)]/80" />
      </div>
      <button
        type="button"
        onClick={() => {
          if (video.current?.paused) {
            void video.current.play().catch(() => {});
          } else video.current?.pause();
        }}
        aria-label={
          paused ? "Arka plan videosunu oynat" : "Arka plan videosunu duraklat"
        }
        className="absolute bottom-6 right-5 z-20 flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white/80 backdrop-blur-sm hover:bg-black/40 sm:right-8"
      >
        {paused ? <Play size={16} /> : <Pause size={16} />}
      </button>
    </>
  );
}
