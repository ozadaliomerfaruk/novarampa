import type { Metadata, Viewport } from "next";

// Studio kendi metasını ve viewport'unu yönetir, ana site CSS'inden bağımsız.
export const metadata: Metadata = {
  title: "Nova Rampa — İçerik Yönetimi",
  description: "Nova Rampa içerik yönetim paneli.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
