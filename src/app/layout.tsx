import type { Metadata, Viewport } from "next";
import { Open_Sans, Work_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

// Google Analytics 4 + Search Console doğrulama — env'den okunur.
// Boşsa hiç yüklenmez (dev'de izleme yok). Eren ID alınca Vercel'e env girer.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

// Body — Open Sans (RonI/Lift-O-Flex DNA'sı; humanist, okunaklı)
const fontSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Display — Work Sans (RonI DNA; geometric ama warm, kurumsal modern)
const fontHeading = Work_Sans({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Mono — teknik annotation için
const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Display — Space Grotesk (modern geometrik; hero "NOVARAMPA" wordmark için)
const fontDisplay = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    // images: opengraph-image.tsx convention'ı sayesinde otomatik dahil edilir
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    // images: opengraph-image.tsx convention'ı otomatik kullanılır
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    // /favicon.svg statik + /icon (icon.tsx) programmatic = ikisi de çalışır
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    // apple-icon.tsx convention ile otomatik /apple-icon route'u oluşur
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteConfig.url,
  },
  // Google Search Console doğrulama — env'de NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  // varsa <meta name="google-site-verification"> otomatik basılır.
  ...(GSC_VERIFICATION
    ? { verification: { google: GSC_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#0D0F13",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Yeni resmi marka navy'si (#142235) — diğer yerlerde brand-ink/--foreground
// olarak otomatik gelir; bu sabit referans amaçlıdır.
export const BRAND_NAVY = "#142235";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${fontSans.variable} ${fontHeading.variable} ${fontMono.variable} ${fontDisplay.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* Atmosfer: animated film grain, tüm sitede sabit */}
          <div className="grain-overlay" aria-hidden="true" />
          <ScrollProgress />
          {children}
          <Toaster richColors position="top-center" />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
      {/* Google Analytics 4 — sadece NEXT_PUBLIC_GA_ID tanımlıysa yüklenir */}
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </html>
  );
}
