import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { productCategories } from "@/lib/products";
import { serviceCities } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/hakkimizda`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/urunler`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/yedek-parca`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/servis`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/referanslar`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/sss`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/iletisim`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/teklif-al`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const productPages: MetadataRoute.Sitemap = productCategories.map((p) => ({
    url: `${base}/urunler/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cityPages: MetadataRoute.Sitemap = serviceCities
    .filter((c) => c.priority === "primary")
    .map((c) => ({
      url: `${base}/hizmet-bolgeleri/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticPages, ...productPages, ...cityPages];
}
