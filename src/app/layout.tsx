import type { Metadata, Viewport } from "next";
import { Open_Sans, Work_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
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
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteConfig.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F4",
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
      className={`${fontSans.variable} ${fontHeading.variable} ${fontMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative">
        {/* Atmosfer: animated film grain, tüm sitede sabit */}
        <div className="grain-overlay" aria-hidden="true" />
        <ScrollProgress />
        {children}
        <Toaster richColors position="top-center" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
