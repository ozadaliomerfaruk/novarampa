import { z } from "zod";

const phoneRegex = /^[+0-9\s()-]{10,20}$/;

export const quoteRequestSchema = z.object({
  fullName: z.string().min(2, "Adınızı yazın.").max(120),
  companyName: z.string().max(160).optional().or(z.literal("")),
  phone: z.string().regex(phoneRegex, "Geçerli bir telefon numarası girin."),
  email: z
    .string()
    .email("Geçerli bir e-posta adresi girin.")
    .optional()
    .or(z.literal("")),
  city: z.string().max(80).optional().or(z.literal("")),
  sector: z.string().max(80).optional().or(z.literal("")),
  productType: z.string().max(120).optional().or(z.literal("")),
  capacity: z.string().max(40).optional().or(z.literal("")),
  dimensions: z.string().max(120).optional().or(z.literal("")),
  quantity: z.number().int().min(1).max(999),
  message: z.string().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export const serviceRequestSchema = z.object({
  fullName: z.string().min(2).max(120),
  companyName: z.string().max(160).optional().or(z.literal("")),
  phone: z.string().regex(phoneRegex, "Geçerli bir telefon numarası girin."),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().max(80).optional().or(z.literal("")),
  productType: z.string().max(120).optional().or(z.literal("")),
  issueDescription: z
    .string()
    .min(10, "Arıza tanımını biraz daha açıklayın.")
    .max(2000),
  preferredDate: z.string().optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;
