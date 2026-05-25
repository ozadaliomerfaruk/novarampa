import { NextResponse } from "next/server";
import { serviceRequestSchema } from "@/lib/form-schemas";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = serviceRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }
    if (parsed.data.website && parsed.data.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const data = parsed.data;

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    const token = process.env.SANITY_API_WRITE_TOKEN;

    if (projectId && projectId !== "placeholder" && token) {
      const { createClient } = await import("next-sanity");
      const client = createClient({
        projectId,
        dataset,
        apiVersion: "2025-01-01",
        token,
        useCdn: false,
      });
      await client.create({
        _type: "serviceRequest",
        submittedAt: new Date().toISOString(),
        status: "new",
        fullName: data.fullName,
        companyName: data.companyName || undefined,
        phone: data.phone,
        email: data.email || undefined,
        city: data.city || undefined,
        productType: data.productType || undefined,
        issueDescription: data.issueDescription,
        preferredDate: data.preferredDate || undefined,
      });
    } else {
      console.log("[Service Request — Sanity not configured]", data);
    }

    const resendKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_RECIPIENT || "info@novarampa.com";
    const sender =
      process.env.CONTACT_SENDER || "Nova Rampa <onboarding@resend.dev>";

    if (resendKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: sender,
        to: recipient,
        replyTo: data.email || undefined,
        subject: `🔧 Servis Talebi — ${data.fullName}`,
        text: [
          `Ad Soyad: ${data.fullName}`,
          `Firma: ${data.companyName || "-"}`,
          `Telefon: ${data.phone}`,
          `E-posta: ${data.email || "-"}`,
          `Şehir: ${data.city || "-"}`,
          `Rampa Tipi: ${data.productType || "-"}`,
          `Tercih Edilen Tarih: ${data.preferredDate || "-"}`,
          ``,
          `Arıza Tanımı:`,
          data.issueDescription,
        ].join("\n"),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/service] Hata:", err);
    return NextResponse.json(
      { ok: false, error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
