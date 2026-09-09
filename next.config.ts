import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Çözümler + Bölgeler sayfaları kaldırıldı — eski indexlenmiş URL'ler
  // SEO kaybı olmadan en yakın içeriğe yönlensin.
  async redirects() {
    return [
      // Old WordPress URLs observed in the sitemap; ready for the domain migration.
      { source: "/home", destination: "/", permanent: true },
      { source: "/about", destination: "/hakkimizda", permanent: true },
      { source: "/about-2", destination: "/hakkimizda", permanent: true },
      { source: "/contact", destination: "/iletisim", permanent: true },
      { source: "/contact-2", destination: "/iletisim", permanent: true },
      { source: "/services", destination: "/urunler", permanent: true },
      { source: "/services-2", destination: "/urunler", permanent: true },
      { source: "/portfolio", destination: "/referanslar", permanent: true },
      {
        source: "/sitemap_index.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      { source: "/cozumler", destination: "/urunler", permanent: true },
      { source: "/cozumler/:path*", destination: "/urunler", permanent: true },
      {
        source: "/hizmet-bolgeleri",
        destination: "/iletisim",
        permanent: true,
      },
      {
        source: "/hizmet-bolgeleri/:path*",
        destination: "/iletisim",
        permanent: true,
      },
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
