import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

// Tek belge: site geneli içerik ayarları.
export const settingsType = defineType({
  name: "settings",
  title: "Site Ayarları",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "heroTitle",
      title: "Ana Sayfa — Başlık",
      type: "string",
      initialValue: "Yükünüzü Hafifletiyoruz",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Ana Sayfa — Alt Başlık",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Ana Sayfa — Buton Yazısı",
      type: "string",
      initialValue: "Teklif Al",
    }),
    defineField({
      name: "featuredProducts",
      title: "Vitrindeki Ürünler",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "highlights",
      title: "Vurgular (rakamlar)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Değer", type: "string" },
            { name: "label", title: "Etiket", type: "string" },
          ],
        },
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "announcement",
      title: "Duyuru Bandı (üst)",
      type: "object",
      fields: [
        { name: "enabled", title: "Aktif", type: "boolean", initialValue: false },
        { name: "text", title: "Metin", type: "string" },
        { name: "link", title: "Link", type: "url" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Ayarları" };
    },
  },
});
