import { defineField, defineType } from "sanity";
import defaults from "@/lib/site-copy-defaults.json";
const groupTitles = {
  about: "Hakkımızda",
  home: "Ana sayfa bölümleri",
  productsPage: "Ürünler sayfası",
  referencesPage: "Referanslar sayfası",
  servicePage: "Servis sayfası",
  blogPage: "Blog sayfası",
  contactPage: "İletişim sayfası",
  quotePage: "Teklif sayfası",
  sparePartsPage: "Yedek parça sayfası",
  spareRequestPage: "Yedek parça talep sayfası",
  sharedCta: "Ortak teklif bölümü",
  footer: "Footer üstü kutucuklar",
};
const fieldTitles: Record<string, string> = {
  title: "Başlık",
  description: "Açıklama",
  body: "Hakkımızda metni",
  productsTitle: "Ürünler başlığı",
  productsDescription: "Ürünler açıklaması",
  productsLink: "Tüm ürünler bağlantısı",
  workshopTitle: "Atölye başlığı",
  whyTitle: "Neden Novarampa başlığı",
  qualityTitle: "Sertifikalar kutucuğu başlığı",
  qualityDescription: "Sertifikalar kutucuğu açıklaması",
  warrantyTitle: "Garanti kutucuğu başlığı",
  warrantyDescription: "Garanti kutucuğu açıklaması",
  supportTitle: "Servis kutucuğu başlığı",
  supportDescription: "Servis kutucuğu açıklaması",
  referencesTitle: "Referanslarımız başlığı",
  faqTitle: "SSS başlığı",
  faqDescription: "SSS açıklaması",
  formTitle: "Form başlığı",
  formEyebrow: "Form üst etiketi",
  formDescription: "Form açıklaması",
  locationsTitle: "Konumlar başlığı",
  ctaTitle: "Alt teklif bölümü başlığı",
  ctaDescription: "Alt teklif bölümü açıklaması",
  ctaLabel: "Alt teklif düğmesi",
  buttonLabel: "Teklif düğmesi",
  quoteTitle: "Teklif kutucuğu başlığı",
  quoteDescription: "Teklif kutucuğu açıklaması",
  serviceTitle: "Servis kutucuğu başlığı",
  serviceDescription: "Servis kutucuğu açıklaması",
  partsTitle: "Yedek parça kutucuğu başlığı",
  partsDescription: "Yedek parça kutucuğu açıklaması",
};
export const siteCopyType = defineType({
  name: "siteCopy",
  title: "Sayfa Metinleri",
  type: "document",
  groups: Object.entries(groupTitles).map(([name, title], index) => ({
    name,
    title,
    default: index === 0,
  })),
  fields: Object.entries(defaults).map(([name, fields]) =>
    defineField({
      name,
      title: groupTitles[name as keyof typeof groupTitles],
      group: name,
      type: "object",
      options: { collapsible: false },
      fields: Object.keys(fields).map((key) => {
        const field = { name: key, title: fieldTitles[key] ?? key };
        const required = /[Tt]itle$/.test(key) || key === "body";
        if (key === "body" || /[Dd]escription$/.test(key))
          return defineField({
            ...field,
            type: "text",
            rows: key === "body" ? 20 : 4,
            description:
              key === "body"
                ? "Paragraflar arasında bir boş satır bırakın. Noktalama ve metin içindeki boşluklar sitede korunur."
                : undefined,
            validation: (r) => (required ? r.required() : r),
          });
        return defineField({
          ...field,
          type: "string",
          validation: (r) => (required ? r.required() : r),
        });
      }),
    }),
  ),
  preview: {
    prepare: () => ({
      title: "Sayfa Metinleri",
      subtitle: "Başlıklar, açıklamalar ve Hakkımızda metni",
    }),
  },
});
