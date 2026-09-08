import { z } from "zod";
import locations from "@/lib/turkey-locations.json";

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));
const contactFields = {
  fullName: z.string().trim().min(2, "Adınızı yazın.").max(120),
  companyName: optionalText(160),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9\s()-]{10,20}$/, "Geçerli bir telefon numarası girin."),
  email: z
    .string()
    .trim()
    .email("Geçerli bir e-posta adresi girin.")
    .optional()
    .or(z.literal("")),
  website: optionalText(200),
};
export const quoteRequestSchema = z.object({
  ...contactFields,
  city: optionalText(80),
  productType: optionalText(120),
  capacity: optionalText(40),
  quantity: z.number().int().min(1, "En az 1 adet seçin.").max(999),
  message: optionalText(2000),
});
export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export const serviceRequestSchema = z
  .object({
    ...contactFields,
    requestKind: z.enum(["service", "sparePart"]),
    city: z.string().min(1, "İl seçin.").max(80),
    district: z.string().min(1, "İlçe seçin.").max(80),
    brand: z.enum(["novarampa", "other", "unknown"], {
      error: "Ürün markası seçeneğini belirtin.",
    }),
    serialNumber: optionalText(120),
    brandName: optionalText(120),
    productType: optionalText(120),
    sparePart: optionalText(160),
    issueDescription: z
      .string()
      .trim()
      .min(10, "Talebinizi biraz daha açıklayın.")
      .max(2000),
    preferredDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Geçerli bir tarih seçin.")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const province = locations.find((p) => p.name === data.city);
    if (data.city && !province)
      ctx.addIssue({
        code: "custom",
        path: ["city"],
        message: "Geçerli bir il seçin.",
      });
    if (data.district && !province?.districts.includes(data.district))
      ctx.addIssue({
        code: "custom",
        path: ["district"],
        message: "Seçtiğiniz ile ait bir ilçe seçin.",
      });
    if (data.brand === "other" && !data.brandName)
      ctx.addIssue({
        code: "custom",
        path: ["brandName"],
        message: "Markayı belirtin.",
      });
    if (data.requestKind === "sparePart" && !data.sparePart)
      ctx.addIssue({
        code: "custom",
        path: ["sparePart"],
        message: "Talep ettiğiniz yedek parçayı seçin.",
      });
  })
  .transform((data) => ({
    ...data,
    serialNumber: data.brand === "novarampa" ? data.serialNumber : undefined,
    brandName: data.brand === "other" ? data.brandName : undefined,
    sparePart: data.requestKind === "sparePart" ? data.sparePart : undefined,
    preferredDate:
      data.requestKind === "service" ? data.preferredDate : undefined,
  }));
export type ServiceRequestInput = z.input<typeof serviceRequestSchema>;
