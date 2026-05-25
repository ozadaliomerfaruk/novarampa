import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog Yazısı",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      validation: (r) => r.required().max(140),
    }),
    defineField({
      name: "slug",
      title: "URL (slug)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Özet",
      type: "text",
      rows: 3,
      description: "Liste ve önizlemelerde gösterilir.",
    }),
    defineField({
      name: "mainImage",
      title: "Kapak Görseli",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    }),
    defineField({
      name: "author",
      title: "Yazar",
      type: "string",
      initialValue: "Nova Rampa",
    }),
    defineField({
      name: "publishedAt",
      title: "Yayın Tarihi",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readTime",
      title: "Okuma Süresi (dk)",
      type: "number",
      initialValue: 5,
    }),
    defineField({
      name: "tags",
      title: "Etiketler",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt", type: "string" }],
        },
        {
          type: "object",
          name: "callout",
          title: "Vurgu Kutusu",
          fields: [
            { name: "tone", title: "Ton", type: "string", options: { list: ["info", "warning", "success"] } },
            { name: "text", title: "Metin", type: "text" },
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", title: "SEO Başlık", type: "string" },
        { name: "description", title: "SEO Açıklama", type: "text", rows: 3 },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "mainImage" },
  },
});
