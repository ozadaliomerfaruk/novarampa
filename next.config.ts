import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Çözümler + Bölgeler sayfaları kaldırıldı — eski indexlenmiş URL'ler
  // SEO kaybı olmadan en yakın içeriğe yönlensin.
  async redirects() {
    return [
      { source: "/cozumler", destination: "/urunler", permanent: true },
      { source: "/cozumler/:path*", destination: "/urunler", permanent: true },
      { source: "/hizmet-bolgeleri", destination: "/iletisim", permanent: true },
      { source: "/hizmet-bolgeleri/:path*", destination: "/iletisim", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
