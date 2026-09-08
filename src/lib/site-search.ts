import { getProducts, getSpareParts } from "@/lib/catalog";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  allBlogPostsQuery,
  allPublishedPagesQuery,
} from "@/sanity/lib/queries";
import type { BlogPostSummary, CustomPage } from "@/sanity/lib/types";
export type SearchResult = {
  title: string;
  href: string;
  type: string;
  description: string;
};
export function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i");
}
export async function searchSite(query: string): Promise<SearchResult[]> {
  const terms = normalizeSearch(query.trim()).split(/\s+/).filter(Boolean);
  if (query.trim().length < 2 || !terms.length) return [];
  const [products, parts, posts, pages] = await Promise.all([
    getProducts(),
    getSpareParts(),
    sanityFetch<BlogPostSummary[]>(allBlogPostsQuery),
    sanityFetch<CustomPage[]>(allPublishedPagesQuery),
  ]);
  const staticPages: SearchResult[] = [
    {
      title: "Ürünler",
      href: "/urunler",
      type: "Sayfa",
      description: "Yükleme rampası çözümlerimiz.",
    },
    {
      title: "Yedek Parça Talep Formu",
      href: "/yedek-parca-talep",
      type: "Form",
      description: "İhtiyacınız olan parçayı talep edin.",
    },
    {
      title: "Servis Talep Formu",
      href: "/servis",
      type: "Form",
      description: "Rampa bakımı ve onarımı için servis talebi.",
    },
    {
      title: "Teklif Al",
      href: "/teklif-al",
      type: "Form",
      description: "Projenize uygun rampa için teklif alın.",
    },
    {
      title: "İletişim",
      href: "/iletisim",
      type: "Sayfa",
      description: "Telefon, e-posta, WhatsApp ve adreslerimiz.",
    },
    {
      title: "Hakkımızda",
      href: "/hakkimizda",
      type: "Sayfa",
      description: "NOVARAMPA'nın hikâyesi ve misyonu.",
    },
    {
      title: "Referanslar",
      href: "/referanslar",
      type: "Sayfa",
      description: "Birlikte çalıştığımız firmalar.",
    },
    {
      title: "SSS — Sıkça Sorulan Sorular",
      href: "/#sss",
      type: "Sayfa",
      description: "Rampa seçimi ve kullanımına ilişkin cevaplar.",
    },
  ];
  const index: SearchResult[] = [
    ...staticPages,
    ...products.map((p) => ({
      title: p.name,
      href: "/urunler/" + p.slug.current,
      type: "Ürün",
      description: p.tagline || p.shortDescription || "",
    })),
    ...parts.map((p) => ({
      title: p.name,
      href: "/yedek-parca" + (p.slug?.current ? "#" + p.slug.current : ""),
      type: "Yedek Parça",
      description: p.description || "",
    })),
    ...(posts ?? [])
      .filter((p) => p.slug?.current)
      .map((p) => ({
        title: p.title,
        href: "/blog/" + p.slug.current,
        type: "Blog",
        description: p.excerpt || "",
      })),
    ...(pages ?? [])
      .filter((p) => p.slug)
      .map((p) => ({
        title: p.title,
        href: "/" + p.slug,
        type: "Sayfa",
        description: p.excerpt || "",
      })),
  ];
  return index
    .filter((p) =>
      terms.every((t) =>
        normalizeSearch(p.title + " " + p.description + " " + p.type).includes(
          t,
        ),
      ),
    )
    .sort(
      (a, b) =>
        Number(normalizeSearch(b.title).includes(normalizeSearch(query))) -
        Number(normalizeSearch(a.title).includes(normalizeSearch(query))),
    );
}
