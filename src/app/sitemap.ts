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
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const products = await getProducts();

  // Statik sayfalar
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1.0 },
    {
      url: `${base}/hakkimizda`,

      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/urunler`,

      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/yedek-parca`,

      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/yedek-parca-talep`,

      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/servis`,

      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/referanslar`,

      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/blog`,

      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${base}/iletisim`,

      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/teklif-al`,

      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/karsilastir`,

      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/kvkk`,

      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/gizlilik`,

      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/cerez`,

      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Ürün detayları (kod tabanlı + Sanity sonradan üzerine yazar)
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/urunler/${p.slug.current}`,

    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ─── Sanity'den dinamik içerik ───

  // Blog yazıları — Sanity'de yayında olanlar
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogs = await sanityFetch<
      { slug: string; publishedAt?: string; _updatedAt?: string }[]
    >(blogPostSlugsQuery, {}, { revalidate: 300 });
    blogPages = (blogs ?? []).map((b) => ({
      url: `${base}/blog/${b.slug}`,
      lastModified: b._updatedAt ?? b.publishedAt,
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
      lastModified: p._updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // Sanity erişimi başarısız olursa sitemap yine de döner.
  }

  // Karşılaştırma sayfaları
  const comparisonPages: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${base}/karsilastir/${c.slug}`,

    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...productPages,
    ...blogPages,
    ...customPages,
    ...comparisonPages,
  ].filter(
    (entry, index, entries) =>
      entries.findIndex((other) => other.url === entry.url) === index,
  );
}
