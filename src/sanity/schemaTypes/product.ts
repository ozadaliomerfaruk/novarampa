import { defineField, defineType } from "sanity";
import { PackageIcon } from "@sanity/icons";

/**
 * Ürün tipi — Site'deki her ürün kartı/sayfası bu belgeden gelir.
 * Sol menüden "Ürünler" → "Yeni Ürün" ile eklenir.
 */
export const productType = defineType({
  name: "product",
  title: "Ürün",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "general", title: "Genel Bilgiler", default: true },
    { name: "specs", title: "Teknik Özellikler" },
    { name: "media", title: "Görseller" },
    { name: "faqs", title: "Sıkça Sorulan Sorular" },
    { name: "seo", title: "SEO (Google için)" },
  ],
  fields: [
    defineField({
      name: "visible",
      title: "Sitede göster",
      type: "boolean",
      initialValue: true,
      description: "Kapalı ürünler katalog, arama ve formlarda gösterilmez.",
    }),
    defineField({
      name: "name",
      title: "Ürün Adı (Tam)",
      description:
        "Ürünün resmi tam adı. Örn: 'Menteşeli (Dilli) Yükleme Rampası'",
      type: "string",
      group: "general",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "shortName",
      title: "Kısa Ad",
      description:
        "Menülerde ve listelerde kullanılır. 1-2 kelime. Örn: 'Menteşeli Rampa'",
      type: "string",
      group: "general",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "slug",
      title: "URL Kısaltması",
      description:
        "Sayfanın internet adresi. 'Yeni Oluştur' butonuna basın; otomatik gelir. Örn: novarampa.com/urunler/'mentereli-yukleme-rampasi'",
      type: "slug",
      group: "general",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Slogan / Vitrin Cümlesi",
      description:
        "Ürün kartında, başlığın altındaki kısa cümle. Örn: 'Sektörün en yaygın, en güvenilir tipi.'",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "shortDescription",
      title: "Kısa Açıklama",
      description:
        "Liste sayfasında kart görünümünde gösterilir. 1-2 cümle. Müşteri kararını burada verir, abartmadan net yazın.",
      type: "text",
      rows: 3,
      group: "general",
      validation: (r) => r.max(280),
    }),
    defineField({
      name: "description",
      title: "Detaylı Açıklama",
      description:
        "Ürün detay sayfasındaki uzun açıklama. Paragraflar, kalın yazılar, listeler kullanabilirsiniz. Üst toolbar'dan biçimlendirin.",
      type: "array",
      group: "general",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "capacities",
      title: "Kapasiteler (taşıma)",
      description:
        "Bu ürünün hangi kapasitelerde üretildiği. Her seçeneği ayrı yazın. Örn: '6 ton', '9 ton', '12 ton'",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "specs",
    }),
    defineField({
      name: "dimensions",
      title: "Standart Ölçü",
      description:
        "Üretilen standart boyut. Örn: '2000 × 2500 mm — 60 cm beton çukuru'",
      type: "string",
      group: "specs",
    }),
    defineField({
      name: "features",
      title: "Öne Çıkan Özellikler",
      description:
        "Madde madde liste. Her satıra 1 özellik. Örn: 'Hidrolik silindirli, sessiz çalışma'",
      type: "array",
      of: [{ type: "string" }],
      group: "specs",
    }),
    defineField({
      name: "bestFor",
      title: "Uygun Sektörler",
      description:
        "Bu ürünün en çok kullanıldığı sektörler. Örn: 'Fabrika sevkiyat', 'Lojistik depo'",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "specs",
    }),
    defineField({
      name: "technicalSpecs",
      title: "Teknik Tablo",
      description:
        "Detay sayfasındaki teknik tablo. Sol sütun özellik adı, sağ sütun değeri. Örn: 'Çukur Derinliği' → '60 cm'",
      type: "array",
      of: [
        {
          type: "object",
          name: "specRow",
          fields: [
            { name: "label", title: "Özellik (sol)", type: "string" },
            { name: "value", title: "Değer (sağ)", type: "string" },
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
      description:
        "Liste ve detay sayfasının üstünde gözüken kapak fotoğrafı. Net, açık, ürünü tek başına gösteren bir foto seçin. Min 1200×900 px önerilir.",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "fit",
          title: "Görsel Yerleşimi",
          type: "string",
          description:
            "Tamamını göster seçeneği ürünün uçlarının kesilmesini önler.",
          initialValue: "cover",
          options: {
            list: [
              { title: "Alanı doldur", value: "cover" },
              { title: "Tamamını göster", value: "contain" },
            ],
            layout: "radio",
          },
        },

        {
          name: "alt",
          title: "Alt Metin (görme engelliler için)",
          description: "Fotoğrafta ne olduğunu kısa anlatın.",
          type: "string",
        },
      ],
      group: "media",
    }),
    defineField({
      name: "gallery",
      title: "Galeri (ek fotoğraflar)",
      description:
        "Detay sayfasında, ana görselin altında galeride gösterilir. Farklı açılar, kurulum sahnesi, detay çekimleri.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt Metin", type: "string" }],
        },
      ],
      group: "media",
    }),
    defineField({
      name: "faqs",
      title: "Sıkça Sorulan Sorular",
      description:
        "Müşterilerin bu ürün hakkında en çok sorduğu sorular ve cevapları. Google'da arama sonuçlarında öne çıkar (SEO).",
      type: "array",
      group: "faqs",
      of: [
        {
          type: "object",
          name: "faq",
          fields: [
            { name: "question", title: "Soru", type: "string" },
            { name: "answer", title: "Cevap", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "question", subtitle: "answer" },
          },
        },
      ],
    }),
    defineField({
      name: "orderRank",
      title: "Sıralama (küçük = önce)",
      description:
        "Ürün listelerinde gösterim sırası. 1 en başta, 100 sonra gelir. Aynı sıralı ürünler isim alfabetik sıralanır.",
      type: "number",
      initialValue: 100,
      group: "general",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Başlık (Google'da gözüken)",
      description:
        "Google sonuçlarında gözükecek başlık. Boş bırakılırsa otomatik ürün adı kullanılır. Maks 60 karakter önerilir.",
      type: "string",
      group: "seo",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Açıklama (Google'da gözüken)",
      description:
        "Google sonuçlarında, başlığın altındaki 1-2 cümlelik açıklama. Maks 160 karakter önerilir.",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (r) => r.max(180),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline", media: "mainImage" },
  },
});
