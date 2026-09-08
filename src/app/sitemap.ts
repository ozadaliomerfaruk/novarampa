import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getProducts } from "@/lib/catalog";
import { comparisons } from "@/lib/comparisons";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  blogPostSlugsQuery,
  allPublishedPagesQuery,
} from "@/sanity/lib/queries";

/**
 * Sitemap — Google ve diğer crawler'lar için site haritası.
 *
 * İçerik:
 *  - Statik sayfalar (anasayfa, hakkımızda, vb)
 *  - Hardcoded ürün detayları + karşılaştırma sayfaları
 *  - Sanity'den blog yazıları (revalidate ile dinamik)
 *  - Sanity'den özel sayfalar (Eren'in oluşturdukları, status: published)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();
  const products = await getProducts();

  // Statik sayfalar
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    {
      url: `${base}/hakkimizda`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/urunler`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/yedek-parca`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/yedek-parca-talep`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/servis`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/referanslar`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${base}/iletisim`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/teklif-al`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/karsilastir`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/kvkk`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/gizlilik`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/cerez`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Ürün detayları (kod tabanlı + Sanity sonradan üzerine yazar)
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/urunler/${p.slug.current}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ─── Sanity'den dinamik içerik ───

  // Blog yazıları — Sanity'de yayında olanlar
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogs = await sanityFetch<{ slug: string; publishedAt?: string }[]>(
      blogPostSlugsQuery,
      {},
      { revalidate: 300 },
    );
    blogPages = (blogs ?? []).map((b) => ({
      url: `${base}/blog/${b.slug}`,
      lastModified: b.publishedAt ? new Date(b.publishedAt) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // Sanity erişimi başarısız olursa sitemap yine de döner.
  }

  // Eren'in özel sayfaları — yayında (status: published) olanlar
  let customPages: MetadataRoute.Sitemap = [];
  try {
    const pages = await sanityFetch<{ slug: string; _updatedAt?: string }[]>(
      allPublishedPagesQuery,
      {},
      { revalidate: 300 },
    );
    customPages = (pages ?? []).map((p) => ({
      url: `${base}/${p.slug}`,
      lastModified: p._updatedAt ? new Date(p._updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // Sanity erişimi başarısız olursa sitemap yine de döner.
  }

  // Karşılaştırma sayfaları
  const comparisonPages: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${base}/karsilastir/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...productPages,
    ...blogPages,
    ...customPages,
    ...comparisonPages,
  ];
}
