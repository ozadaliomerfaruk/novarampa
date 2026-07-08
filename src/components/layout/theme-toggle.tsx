"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

/**
 * Koyu/açık tema geçiş butonu.
 * İkonlar CSS ile değişir (dark'ta güneş, light'ta ay) — böylece `mounted`
 * state'i / effect'i gerekmez ve hydration uyumsuzluğu oluşmaz.
 * `onDark`: buton koyu bir zeminin (hero videosu) üzerindeyse beyaz stil kullanır.
 */
export function ThemeToggle({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      aria-label="Temayı değiştir"
      title="Koyu / açık tema"
      className={cn(
        "inline-flex items-center justify-center size-10 rounded-lg border transition-colors",
        onDark
          ? "border-white/20 text-white/85 hover:bg-white/10 hover:text-white"
          : "border-border text-foreground/70 hover:bg-muted hover:text-foreground",
        className
      )}
    >
      <Sun size={18} className="hidden dark:block" />
      <Moon size={18} className="block dark:hidden" />
    </button>
  );
}
