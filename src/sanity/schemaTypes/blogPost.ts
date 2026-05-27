import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

/**
 * Blog yazısı — Site'deki /blog ve /blog/[slug] sayfaları bu belgelerden gelir.
 * SEO için çok değerli — Google'da arama sonuçlarında çıkar.
 */
export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog Yazısı",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "İçerik", default: true },
    { name: "meta", title: "Etiket & Tarih" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Yazı Başlığı",
      description:
        "Net ve merak uyandıran bir başlık. Örn: 'Yükleme rampası seçerken nelere dikkat etmeli?'",
      type: "string",
      group: "content",
      validation: (r) => r.required().max(140),
    }),
    defineField({
      name: "slug",
      title: "URL Kısaltması",
      description:
        "'Yeni Oluştur'a basın, otomatik gelir. Sonradan değiştirmeyin — Google bağlantıyı kaybeder.",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Özet",
      description:
        "Blog liste sayfasında ve sosyal medya paylaşımlarında gözüken 1-2 cümle. Yazıyı okuma isteği uyandırsın.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (r) => r.max(280),
    }),
    defineField({
      name: "mainImage",
      title: "Kapak Görseli",
      description:
        "Yazının üstünde gözüken büyük foto. 16:9 oran önerilir (örn 1600×900 px). Sosyal medyada da bu görsel paylaşılır.",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Metin",
          description: "Fotoğrafta ne olduğunu kısa anlatın.",
          type: "string",
        },
      ],
      group: "content",
    }),
    defineField({
      name: "author",
      title: "Yazar",
      description: "Yazıyı kim yazdı? Genelde 'Nova Rampa' bırakılır.",
      type: "string",
      group: "meta",
      initialValue: "Nova Rampa",
    }),
    defineField({
      name: "publishedAt",
      title: "Yayın Tarihi",
      description:
        "Yayınlanma tarihi/saati. İleri tarih verirseniz o tarihte canlıya çıkar.",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readTime",
      title: "Okuma Süresi (dakika)",
      description: "Yaklaşık okuma süresi. Genelde 3-7 dakika.",
      type: "number",
      group: "meta",
      initialValue: 5,
      validation: (r) => r.min(1).max(60),
    }),
    defineField({
      name: "tags",
      title: "Etiketler",
      description:
        "Yazının ait olduğu konular. Örn: 'bakım', 'hidrolik', 'sektörel rehber'. Etiketler aynı konudaki diğer yazılarla bağ kurar.",
      type: "array",
      group: "meta",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "body",
      title: "Yazı İçeriği",
      description:
        "Yazının asıl gövdesi. Üst toolbar'dan paragraf, kalın, italik, başlık, liste ekleyebilir; ara araya fotoğraf veya vurgu kutusu yerleştirebilirsiniz.",
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
            },
            { name: "text", title: "Vurgulanacak Metin", type: "text" },
          ],
          preview: {
            select: { title: "text", subtitle: "tone" },
          },
        },
      ],
    }),
    defineField({
      name: "howToSteps",
      title: "Rehber Adımları (HowTo — opsiyonel)",
      description:
        "Bu yazı bir 'nasıl yapılır' rehberi ise adımları buraya yaz. Google ve AI motorları bu yazıyı 'rehber yazı' olarak işaretler, arama sonuçlarında numaralı liste olarak gösterir. Boş bırakırsan normal yazı olarak kalır.",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            {
              name: "name",
              title: "Adım Başlığı",
              description:
                "Kısa, eylem belirten cümle. Örn: '1. Rampa konumunu belirleyin'",
              type: "string",
              validation: (r) => r.required().max(120),
            },
            {
              name: "text",
              title: "Adım Açıklaması",
              description: "Adımı detaylı anlat. 2-4 cümle.",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            },
          ],
          preview: {
            select: { title: "name", subtitle: "text" },
          },
        },
      ],
    }),
    defineField({
      name: "totalTime",
      title: "Toplam Süre (rehber yazıları için)",
      description:
        "Rehberi uygulamak ne kadar sürer? Örn: '30 dakika', '2 saat'. Sadece HowTo rehber yazılarında doldur.",
      type: "string",
      group: "content",
      hidden: ({ document }) => {
        const doc = document as { howToSteps?: unknown[] } | undefined;
        return !doc?.howToSteps?.length;
      },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      description: "Google sonuçlarında nasıl gözükeceğini kontrol eder.",
      type: "object",
      group: "seo",
      fields: [
        {
          name: "title",
          title: "SEO Başlık",
          description: "Boş bırakılırsa yazı başlığı kullanılır. Maks 60 karakter.",
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
    select: { title: "title", subtitle: "publishedAt", media: "mainImage" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle
        ? new Date(subtitle).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "Tarih yok",
      media,
    }),
  },
  orderings: [
    {
      title: "Yeniden eskiye (yayın tarihi)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
