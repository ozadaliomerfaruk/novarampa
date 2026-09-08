import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

/**
 * Özel Sayfa — Eren'in Studio'dan oluşturduğu serbest sayfalar.
 *
 * URL: /<slug> (örn: /garanti, /surdurulebilirlik)
 * Navbar'a eklenip eklenmeyeceği "Navbar'da Göster" ile kontrol edilir.
 *
 * Rezervli slug'lar (mevcut site sayfaları) kullanılamaz:
 * urunler, cozumler, hizmet-bolgeleri, hakkimizda, iletisim, blog, servis,
 * yedek-parca, teklif-al, referanslar, studio, kvkk, gizlilik, cerez
 */

const RESERVED_SLUGS = [
  "urunler",
  "cozumler",
  "hizmet-bolgeleri",
  "hakkimizda",
  "iletisim",
  "blog",
  "servis",
  "yedek-parca",
  "yedek-parca-talep",
  "arama",
  "teklif-al",
  "referanslar",
  "studio",
  "kvkk",
  "gizlilik",
  "cerez",
  "karsilastir",
  "sayfalar",
  "_next",
  "api",
];

export const pageType = defineType({
  name: "page",
  title: "Özel Sayfa",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "content", title: "İçerik", default: true },
    { name: "nav", title: "Menü & Yayın" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Sayfa Başlığı",
      description:
        "Sayfanın tam başlığı. Hem sayfa üstünde hem tarayıcı sekmesinde gözükür. Örn: 'Garanti Koşulları'",
      type: "string",
      group: "content",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "URL Kısaltması",
      description:
        "'Yeni Oluştur'a basın. Site adresi: novarampa.com/<bu-değer>. Örn: 'garanti', 'surdurulebilirlik'. Mevcut sayfalarla çakışmamalı.",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 60,
        isUnique: async (slug, context) => {
          if (RESERVED_SLUGS.includes(slug.toLowerCase())) return false;
          // Sanity içinde tekil olduğunu doğrula
          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2025-01-01" });
          const id = document?._id?.replace(/^drafts\./, "");
          const existing = await client.fetch(
            `*[_type=="page" && slug.current==$slug && !(_id in [$id, "drafts." + $id])][0]._id`,
            { slug, id },
          );
          return !existing;
        },
      },
      validation: (r) =>
        r.required().custom((slug) => {
          if (!slug?.current) return "URL gerekli.";
          if (RESERVED_SLUGS.includes(slug.current.toLowerCase())) {
            return `'${slug.current}' rezerve edilmiş. Site'nin mevcut bir sayfası bu URL'i kullanıyor.`;
          }
          return true;
        }),
    }),
    defineField({
      name: "status",
      title: "Yayın Durumu",
      description:
        "**Yayında**: Herkes görebilir. **Taslak**: Sadece sen görüyorsun, site'de gözükmez. **Arşivli**: Site'den kaldırıldı ama silinmedi (URL 404 verir).",
      type: "string",
      group: "nav",
      options: {
        list: [
          { value: "published", title: "🟢 Yayında (görünür)" },
          { value: "draft", title: "🟡 Taslak (gözükmez)" },
          { value: "archived", title: "⚫ Arşivli (kaldırıldı)" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "showInNavbar",
      title: "Navbar'da Göster",
      description:
        "Açıkken bu sayfa üst menüye (Blog'un yanına) eklenir. Kapalıyken sadece URL ile erişilebilir.",
      type: "boolean",
      group: "nav",
      initialValue: false,
    }),
    defineField({
      name: "navbarLabel",
      title: "Navbar Yazısı (opsiyonel)",
      description:
        "Sayfa başlığı uzunsa, navbar için kısa versiyon. Örn: başlık 'Garanti ve Servis Koşulları' → navbar yazısı 'Garanti'. Boş bırakırsanız başlık kullanılır.",
      type: "string",
      group: "nav",
      hidden: ({ document }) => !document?.showInNavbar,
      validation: (r) => r.max(24),
    }),
    defineField({
      name: "navbarOrder",
      title: "Navbar Sırası (küçük = önce)",
      description:
        "Birden fazla özel sayfa navbar'da gözükecekse, sıralama için. 1 önce, 100 sonra.",
      type: "number",
      group: "nav",
      initialValue: 100,
      hidden: ({ document }) => !document?.showInNavbar,
    }),
    defineField({
      name: "heroImage",
      title: "Sayfa Üst Görseli (opsiyonel)",
      description:
        "Sayfanın üstünde gözüken büyük foto. 16:9 oran önerilir (örn 1600×900 px). Boş bırakılırsa sade bir başlık alanı gösterilir.",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Metin", type: "string" }],
    }),
    defineField({
      name: "excerpt",
      title: "Kısa Özet (opsiyonel)",
      description:
        "1-2 cümlelik özet. Sayfanın başında ve sosyal medya paylaşımlarında gözükür.",
      type: "text",
      group: "content",
      rows: 3,
      validation: (r) => r.max(280),
    }),
    defineField({
      name: "body",
      title: "Sayfa İçeriği",
      description:
        "Sayfanın gövdesi. Üst toolbar'dan başlık, paragraf, kalın, italik, liste, link, foto ekleyebilirsiniz. Vurgu kutusu için '+' butonu.",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt Metin", type: "string" }],
        },
        {
          type: "object",
          name: "callout",
          title: "Vurgu Kutusu",
          fields: [
            {
              name: "tone",
              title: "Ton",
              type: "string",
              options: {
                list: [
                  { value: "info", title: "Bilgi (mavi)" },
                  { value: "warning", title: "Uyarı (sarı)" },
                  { value: "success", title: "Onay (yeşil)" },
                ],
              },
              initialValue: "info",
            },
            { name: "text", title: "Metin", type: "text" },
          ],
          preview: { select: { title: "text", subtitle: "tone" } },
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      description: "Google sonuçlarında nasıl gözüksün?",
      type: "object",
      group: "seo",
      fields: [
        {
          name: "title",
          title: "SEO Başlık",
          description:
            "Boş bırakılırsa sayfa başlığı kullanılır. Maks 60 karakter.",
          type: "string",
        },
        {
          name: "description",
          title: "SEO Açıklama",
          description: "Boş bırakılırsa özet kullanılır. Maks 160 karakter.",
          type: "text",
          rows: 3,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      status: "status",
      nav: "showInNavbar",
      media: "heroImage",
    },
    prepare: ({ title, slug, status, nav, media }) => {
      const statusEmoji =
        status === "published" ? "🟢" : status === "draft" ? "🟡" : "⚫";
      const navMark = nav ? " · 📌 Navbar'da" : "";
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: `/${slug ?? "?"}${navMark}`,
        media,
      };
    },
  },
});
