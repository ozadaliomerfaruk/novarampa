import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export const referenceType = defineType({
  name: "referenceCompany",
  title: "Referans / Proje",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "name",
      title: "Firma Adı",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sector",
      title: "Sektör",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "featured",
      title: "Öne çıkar",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "caseStudy",
      title: "Proje Hikayesi (opsiyonel)",
      type: "object",
      fields: [
        { name: "title", title: "Başlık", type: "string" },
        { name: "summary", title: "Kısa Özet", type: "text", rows: 3 },
        { name: "productInstalled", title: "Kurulan Ürün", type: "string" },
        { name: "year", title: "Yıl", type: "number" },
        {
          name: "images",
          title: "Foto",
          type: "array",
          of: [{ type: "image", options: { hotspot: true } }],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "sector", media: "logo" },
  },
});
