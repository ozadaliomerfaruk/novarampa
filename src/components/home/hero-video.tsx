"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type Connection = { saveData?: boolean; effectiveType?: string };

export function HeroVideo({ src }: { src: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const userControlled = useRef(false);
  const [paused, setPaused] = useState(true);
  const [hasFrame, setHasFrame] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: Connection })
      .connection;
    let cancelled = false;
    let idle: number | undefined;
    let frame: number | undefined;

    // No src is present in the server HTML: the movie cannot compete with
    // the first screen's text, fonts and responsive poster.
    const start = () => {
      if (
        cancelled ||
        userControlled.current ||
        motion.matches ||
        connection?.saveData ||
        ["slow-2g", "2g"].includes(connection?.effectiveType ?? "") ||
        document.visibilityState !== "visible"
      )
        return;
      const rect = element.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      element.src = src;
      void element.play().catch(() => {
        // Autoplay can be denied. The poster and manual play button remain usable.
      });
    };
    const afterLoad = () => {
      void document.fonts.ready.then(() => {
        if (cancelled) return;
        // Let the fully loaded first screen paint before starting background media.
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            if ("requestIdleCallback" in window) {
              idle = window.requestIdleCallback(start, { timeout: 1500 });
            } else {
              start();
            }
          });
        });
      });
    };
    const onMotionChange = () => {
      if (motion.matches) element.pause();
    };
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });
    motion.addEventListener("change", onMotionChange);

    return () => {
      cancelled = true;
      window.removeEventListener("load", afterLoad);
      motion.removeEventListener("change", onMotionChange);
      if (frame !== undefined) cancelAnimationFrame(frame);
      if (idle !== undefined) window.cancelIdleCallback(idle);
    };
  }, [src]);

  return (
    <>
      <div
        className="absolute inset-0 -z-10 bg-[var(--brand-ink)]"
        aria-hidden="true"
      >
        <Image
          src="/videos/hero-poster.jpg"
          alt=""
          fill
          sizes="100vw"
          preload
          className="object-cover"
        />
        <video
          ref={video}
          loop
          muted
          playsInline
          preload="none"
          onPlay={() => setPaused(false)}
          onPlaying={() => setHasFrame(true)}
          onPause={() => setPaused(true)}
          onError={() => {
            setHasFrame(false);
            setPaused(true);
          }}
          className={`absolute inset-0 size-full object-cover ${hasFrame ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-ink)]/75 via-[var(--brand-ink)]/50 to-[var(--brand-ink)]/80" />
      </div>
      <button
        type="button"
        onClick={() => {
          const element = video.current;
          if (!element) return;
          userControlled.current = true;
          if (element.paused) {
            if (!element.getAttribute("src")) element.src = src;
            void element.play().catch(() => {});
          } else element.pause();
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
