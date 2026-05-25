import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

// "Teklif Al" formundan gelen kayıtlar.
export const quoteRequestType = defineType({
  name: "quoteRequest",
  title: "Teklif Talebi",
  type: "document",
  icon: CommentIcon,
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
          { title: "📞 Aranıyor", value: "calling" },
          { title: "📨 Teklif gönderildi", value: "quoted" },
          { title: "✅ Kazanıldı", value: "won" },
          { title: "❌ Kaybedildi", value: "lost" },
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
    defineField({
      name: "sector",
      title: "Sektör",
      type: "string",
      options: {
        list: [
          { title: "Lojistik / Depo", value: "lojistik-depo" },
          { title: "Fabrika / Sanayi", value: "fabrika-sanayi" },
          { title: "Müteahhit / Proje", value: "muteahhit-proje" },
          { title: "Soğuk Hava / Gıda", value: "soguk-hava-gida" },
          { title: "Süpermarket / Perakende", value: "supermarket-perakende" },
          { title: "Küçük İşletme", value: "kucuk-isletme" },
          { title: "Diğer", value: "diger" },
        ],
      },
    }),
    defineField({
      name: "productType",
      title: "İlgilendiği Rampa Tipi",
      type: "string",
    }),
    defineField({
      name: "capacity",
      title: "İhtiyaç Duyulan Tonaj",
      type: "string",
    }),
    defineField({
      name: "dimensions",
      title: "Ölçü Notu",
      type: "string",
    }),
    defineField({
      name: "quantity",
      title: "Adet",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "message",
      title: "Mesaj / Notlar",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "source",
      title: "Geldiği Sayfa",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "internalNotes",
      title: "Dahili Notlar",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      company: "companyName",
      status: "status",
      product: "productType",
    },
    prepare({ title, company, status, product }) {
      const statusMap: Record<string, string> = {
        new: "🆕",
        calling: "📞",
        quoted: "📨",
        won: "✅",
        lost: "❌",
      };
      return {
        title: `${statusMap[status as string] ?? ""} ${title ?? "İsimsiz"}`,
        subtitle: [company, product].filter(Boolean).join(" — "),
      };
    },
  },
});
