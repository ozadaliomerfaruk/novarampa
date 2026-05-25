import { defineField, defineType } from "sanity";
import { PackageIcon } from "@sanity/icons";

export const productType = defineType({
  name: "product",
  title: "Ürün",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "general", title: "Genel" },
    { name: "specs", title: "Teknik" },
    { name: "media", title: "Görseller" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Ürün Adı",
      type: "string",
      group: "general",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "shortName",
      title: "Kısa Ad",
      description: "Menü ve listelerde kullanılacak kısa ad",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "slug",
      title: "URL Kısaltması (slug)",
      type: "slug",
      group: "general",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Slogan/Vitrin Cümlesi",
      type: "string",
      group: "general",
      validation: (r) => r.max(200),
    }),
    defineField({
      name: "shortDescription",
      title: "Kısa Açıklama",
      description: "Liste sayfasında, kart görünümünde gösterilir.",
      type: "text",
      rows: 3,
      group: "general",
    }),
    defineField({
      name: "description",
      title: "Detaylı Açıklama",
      type: "array",
      group: "general",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "capacities",
      title: "Kapasiteler (taşıma)",
      description: "Örn: 6 ton, 9 ton, 12 ton",
      type: "array",
      of: [{ type: "string" }],
      group: "specs",
    }),
    defineField({
      name: "dimensions",
      title: "Standart Ölçü",
      type: "string",
      group: "specs",
    }),
    defineField({
      name: "features",
      title: "Öne Çıkan Özellikler",
      type: "array",
      of: [{ type: "string" }],
      group: "specs",
    }),
    defineField({
      name: "bestFor",
      title: "Uygun Sektörler",
      type: "array",
      of: [{ type: "string" }],
      group: "specs",
    }),
    defineField({
      name: "technicalSpecs",
      title: "Teknik Tablo",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Özellik", type: "string" },
            { name: "value", title: "Değer", type: "string" },
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
      group: "specs",
    }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", title: "Alternatif Metin (Alt)", type: "string" },
      ],
      group: "media",
    }),
    defineField({
      name: "gallery",
      title: "Galeri",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt", type: "string" }],
        },
      ],
      group: "media",
    }),
    defineField({
      name: "faqs",
      title: "Sıkça Sorulan Sorular",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Soru", type: "string" },
            { name: "answer", title: "Cevap", type: "text", rows: 3 },
          ],
        },
      ],
      group: "general",
    }),
    defineField({
      name: "orderRank",
      title: "Sıralama",
      type: "number",
      initialValue: 100,
      group: "general",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Başlık",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Açıklama",
      type: "text",
      rows: 3,
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline", media: "mainImage" },
  },
});
