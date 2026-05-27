import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

/**
 * Yedek Parça — /yedek-parca sayfasında listelenir.
 * Müşteri arızalı parça için bu sayfadan ulaşır.
 */
export const sparePartType = defineType({
  name: "sparePart",
  title: "Yedek Parça",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "name",
      title: "Parça Adı",
      description:
        "Yedek parçanın net adı. Örn: 'Hidrolik Silindir — 80mm Çap'",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Kısaltması",
      description: "'Yeni Oluştur'a basın, otomatik gelir.",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      description:
        "Parçanın özellikleri, ölçü ve kullanım yeri. Örn: 'Standart hidrolik rampa silindiri. 80mm çap, 300mm strok.'",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "compatibleWith",
      title: "Hangi Ürünlerle Uyumlu",
      description:
        "Bu parçanın çalıştığı ürünleri seçin. Müşteri ürün sayfasından da bu parçaya ulaşabilir.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "image",
      title: "Parça Fotoğrafı",
      description: "Net, tek başına parça çekimi. Min 800×800 px önerilir.",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Metin", type: "string" }],
    }),
    defineField({
      name: "available",
      title: "Stokta",
      description:
        "Açıksa 'Stokta var', kapalıysa 'Stok dışı / siparişe özel' yazısı gözükür.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "orderRank",
      title: "Sıralama (küçük = önce)",
      type: "number",
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "available", media: "image" },
    prepare(sel) {
      return {
        title: sel.title,
        subtitle: sel.subtitle ? "✓ Stokta" : "Stok dışı",
        media: sel.media,
      };
    },
  },
});
