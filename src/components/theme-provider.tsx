"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * next-themes sarmalayıcısı. `attribute="class"` ile <html>'e .dark/.light
 * eklenir; tercih localStorage'da ("theme" anahtarı) saklanır.
 */
export function ThemeProvider(
  props: ComponentProps<typeof NextThemesProvider>
) {
  return <NextThemesProvider {...props} />;
}
