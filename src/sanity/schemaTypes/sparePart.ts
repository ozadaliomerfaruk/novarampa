import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const sparePartType = defineType({
  name: "sparePart",
  title: "Yedek Parça",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "name",
      title: "Parça Adı",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL (slug)",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "compatibleWith",
      title: "Uyumlu Ürünler",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "image",
      title: "Görsel",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "available",
      title: "Stokta",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "orderRank",
      title: "Sıralama",
      type: "number",
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "available", media: "image" },
    prepare(sel) {
      return {
        title: sel.title,
        subtitle: sel.subtitle ? "Stokta" : "Stokta yok",
        media: sel.media,
      };
    },
  },
});
