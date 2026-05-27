import { defineField, defineType } from "sanity";
import { PinIcon } from "@sanity/icons";

/**
 * Hizmet Bölgesi (İl) — /hizmet-bolgeleri sayfasındaki iller.
 * Her ilin kendi alt sayfası da var (/hizmet-bolgeleri/[slug]).
 */
export const serviceCityType = defineType({
  name: "serviceCity",
  title: "Hizmet Bölgesi (İl)",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({
      name: "name",
      title: "İl Adı",
      description: "Türkçe karakterlerle. Örn: 'İstanbul', 'Tekirdağ', 'Kocaeli'",
      type: "string",
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: "slug",
      title: "URL Kısaltması",
      description:
        "'Yeni Oluştur'a basın. Türkçe karakter olmadan oluşur. Örn: 'istanbul', 'tekirdag'",
      type: "slug",
      options: { source: "name", maxLength: 40 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "region",
      title: "Bölge",
      description: "Coğrafi bölge. Örn: 'Marmara', 'Ege', 'İç Anadolu'",
      type: "string",
      initialValue: "Marmara",
    }),
    defineField({
      name: "priority",
      title: "Öncelik",
      description:
        "**Öncelikli** = montaj + servis veriyoruz, header'da öne çıkar. **İkincil** = sevkiyat var, ama serviste konuma göre değerlendirilir. **Türkiye geneli** = sadece sevkiyat.",
      type: "string",
      options: {
        list: [
          { value: "primary", title: "Öncelikli (Montaj + Servis)" },
          { value: "secondary", title: "İkincil (Sevkiyat)" },
          { value: "national", title: "Türkiye Geneli" },
        ],
        layout: "radio",
      },
      initialValue: "secondary",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "industrialZones",
      title: "Sanayi Bölgeleri / OSB",
      description:
        "Bu ildeki başlıca sanayi/OSB bölgeleri. Örn: 'İkitelli, Hadımköy, Tuzla'",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "description",
      title: "Açıklama (opsiyonel)",
      description:
        "İl detay sayfasında uzun açıklama. Hangi bölgelerde, hangi sektörlerde aktif olduğumuz vb.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "orderRank",
      title: "Sıralama (küçük = önce)",
      type: "number",
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "priority",
      region: "region",
    },
    prepare: ({ title, subtitle, region }) => {
      const label =
        subtitle === "primary"
          ? "⭐ Öncelikli"
          : subtitle === "secondary"
            ? "Sevkiyat"
            : "Türkiye geneli";
      return {
        title,
        subtitle: `${label} · ${region ?? ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Öncelik (önce öncelikli)",
      name: "priorityFirst",
      by: [
        { field: "priority", direction: "asc" },
        { field: "orderRank", direction: "asc" },
      ],
    },
  ],
});
