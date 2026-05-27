import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

/**
 * Müşteri Sektörü — /cozumler sayfasındaki sektör kartları.
 * Her sektörün kendi alt sayfası da var (/cozumler/[slug]).
 */
export const customerSegmentType = defineType({
  name: "customerSegment",
  title: "Müşteri Sektörü",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Sektör Adı",
      description: "Tam adı. Örn: 'Lojistik ve Depo İşletmecisi'",
      type: "string",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "URL Kısaltması",
      description:
        "'Yeni Oluştur'a basın, otomatik gelir. Örn: novarampa.com/cozumler/'lojistik-depo'",
      type: "slug",
      options: { source: "name", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Kısa Açıklama",
      description:
        "Bu sektörün kim olduğunu ve ne aradığını tek paragrafta anlatın. Kart üzerinde gözükür.",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: "share",
      title: "Müşteri Payı (%)",
      description:
        "Bu sektörün toplam müşteriler içindeki yüzdesi. Anasayfa dropdown'unda 'Tahmini ~%35' olarak gözükür. Yaklaşık değer yeterli.",
      type: "number",
      validation: (r) => r.required().min(0).max(100),
    }),
    defineField({
      name: "image",
      title: "Kart Görseli",
      description:
        "Sektörü temsil eden bir fotoğraf. /cozumler sayfasında kart üzerinde gözükür. Min 800×1000 px (dikey) önerilir.",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Metin", type: "string" }],
    }),
    defineField({
      name: "keywords",
      title: "SEO Anahtar Kelimeleri",
      description:
        "Google aramalarında ilişkili olduğumuz kelimeler. Örn: 'depo rampası', 'antrepo rampası'",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "recommendedProducts",
      title: "Önerilen Ürünler",
      description:
        "Bu sektör için en uygun ürünler. Sektör detay sayfasında 'Önerilen çözümler' bölümünde gösterilir.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "orderRank",
      title: "Sıralama (küçük = önce)",
      description: "Listede gösterim sırası. 1 önce, 100 sonra.",
      type: "number",
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "share", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle ? `~%${subtitle} müşteri payı` : "Pay belirtilmemiş",
      media,
    }),
  },
});
