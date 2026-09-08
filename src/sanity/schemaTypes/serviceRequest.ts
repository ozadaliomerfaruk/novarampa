import { defineField, defineType } from "sanity";
import { WrenchIcon } from "@sanity/icons";

// Müşteri "Servis Talep Formu" doldurduğunda buraya kayıt düşer.
// Eren admin panelinde takip eder.
export const serviceRequestType = defineType({
  name: "serviceRequest",
  title: "Servis Talebi",
  type: "document",
  icon: WrenchIcon,
  readOnly: false,
  fields: [
    defineField({
      name: "submittedAt",
      title: "Talep Tarihi",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Durum",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "🆕 Yeni", value: "new" },
          { title: "👀 İncelendi", value: "reviewed" },
          { title: "📞 İletişime geçildi", value: "contacted" },
          { title: "🔧 Servis planlandı", value: "scheduled" },
          { title: "✅ Tamamlandı", value: "completed" },
          { title: "❌ İptal", value: "cancelled" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "fullName",
      title: "Ad Soyad",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "companyName",
      title: "Firma",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "email",
      title: "E-posta",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "Şehir",
      type: "string",
    }),
    defineField({ name: "district", title: "İlçe", type: "string" }),
    defineField({
      name: "brand",
      title: "Ürün Markası",
      type: "string",
      options: {
        list: [
          { title: "Novarampa", value: "novarampa" },
          { title: "Farklı marka", value: "other" },
          { title: "Bilmiyorum", value: "unknown" },
        ],
      },
    }),
    defineField({
      name: "serialNumber",
      title: "Ürün Seri No",
      type: "string",
      hidden: ({ document }) => document?.brand !== "novarampa",
    }),
    defineField({
      name: "brandName",
      title: "Diğer Marka",
      type: "string",
      hidden: ({ document }) => document?.brand !== "other",
    }),
    defineField({
      name: "productType",
      title: "Rampa Tipi",
      type: "string",
    }),
    defineField({
      name: "issueDescription",
      title: "Arıza Tanımı",
      type: "text",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "photos",
      title: "Foto",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "preferredDate",
      title: "Tercih Edilen Tarih",
      type: "date",
    }),
    defineField({
      name: "internalNotes",
      title: "Dahili Notlar (sadece ekip)",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      company: "companyName",
      status: "status",
      city: "city",
    },
    prepare({ title, company, status, city }) {
      const statusMap: Record<string, string> = {
        new: "🆕",
        reviewed: "👀",
        contacted: "📞",
        scheduled: "🔧",
        completed: "✅",
        cancelled: "❌",
      };
      return {
        title: `${statusMap[status as string] ?? ""} ${title ?? "İsimsiz"}`,
        subtitle: [company, city].filter(Boolean).join(" — "),
      };
    },
  },
});
