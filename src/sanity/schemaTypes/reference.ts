import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

/**
 * Referans / Proje — Tamamlanan projeler ve müşteri firmalar.
 * /referanslar sayfasında ve anasayfanın 'Referanslar' bantında gözükür.
 */
export const referenceType = defineType({
  name: "referenceCompany",
  title: "Referans / Proje",
  type: "document",
  icon: StarIcon,
  groups: [
    { name: "basic", title: "Temel Bilgiler", default: true },
    { name: "story", title: "Proje Hikayesi (opsiyonel)" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Firma Adı",
      description: "Müşteri firmanın resmi adı. Örn: 'XYZ Lojistik A.Ş.'",
      type: "string",
      group: "basic",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sector",
      title: "Sektör",
      description:
        "Firmanın faaliyet alanı. Örn: 'Lojistik / Depo', 'Gıda / Soğuk Hava', 'Fabrika / Üretim'",
      type: "string",
      group: "basic",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description:
        "Firmanın özgün logosu. Tercihen şeffaf PNG. Referanslar sayfasında ve anasayfa bandında gösterilir.",
      type: "image",
      group: "basic",
      options: { hotspot: false },
    }),
    defineField({
      name: "logoBackground",
      title: "Logo Zemini",
      description:
        "Beyaz veya açık renkli logolar için koyu zemin seçin. Bu zemin her iki temada da korunur.",
      type: "string",
      group: "basic",
      options: {
        list: [
          { title: "Açık", value: "light" },
          { title: "Koyu", value: "dark" },
        ],
        layout: "radio",
      },
      initialValue: "light",
    }),
    defineField({
      name: "featured",
      title: "Öne Çıkar",
      description:
        "Açıksa anasayfa 'Referanslar' bandında öne çıkar. Maks 8 firma için açın.",
      type: "boolean",
      group: "basic",
      initialValue: false,
    }),
    defineField({
      name: "caseStudy",
      title: "Proje Hikayesi",
      description:
        "İsteğe bağlı detaylı vaka çalışması. Doldurursanız ayrı bir hikaye sayfası açılır.",
      type: "object",
      group: "story",
      fields: [
        {
          name: "title",
          title: "Hikaye Başlığı",
          description:
            "Örn: 'XYZ Lojistik için 12 ton hidrolik rampa kurulumu'",
          type: "string",
        },
        {
          name: "summary",
          title: "Kısa Özet",
          description: "1-2 cümle. Hangi sorunu nasıl çözdük?",
          type: "text",
          rows: 3,
        },
        {
          name: "productInstalled",
          title: "Kurulan Ürün",
          description: "Örn: 'Menteşeli Yükleme Rampası — 12 ton'",
          type: "string",
        },
        {
          name: "year",
          title: "Proje Yılı",
          type: "number",
          validation: (r) => r.min(2003).max(2100),
        },
        {
          name: "images",
          title: "Saha Fotoğrafları",
          description: "Kurulum ve teslim sahnelerinden fotoğraflar.",
          type: "array",
          of: [
            {
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt Metin", type: "string" }],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "sector",
      media: "logo",
      featured: "featured",
    },
    prepare: ({ title, subtitle, media, featured }) => ({
      title: featured ? `⭐ ${title}` : title,
      subtitle,
      media,
    }),
  },
});
