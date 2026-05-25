import { NextResponse } from "next/server";
import { quoteRequestSchema } from "@/lib/form-schemas";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = quoteRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Honeypot: dolu ise bot — başarılı görünmesi için 200 dön ama hiçbir şey yapma
    if (parsed.data.website && parsed.data.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const data = parsed.data;

    // Sanity'e yaz (token + projectId varsa)
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
        _type: "quoteRequest",
        submittedAt: new Date().toISOString(),
        status: "new",
        fullName: data.fullName,
        companyName: data.companyName || undefined,
        phone: data.phone,
        email: data.email || undefined,
        city: data.city || undefined,
        sector: data.sector || undefined,
        productType: data.productType || undefined,
        capacity: data.capacity || undefined,
        dimensions: data.dimensions || undefined,
        quantity: data.quantity ?? 1,
        message: data.message || undefined,
      });
    } else {
      // Sanity bağlanmadan önce — sunucu loguna düşür
      console.log("[Quote Request — Sanity not configured]", data);
    }

    // Mail bildirimi (Resend varsa)
    const resendKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_RECIPIENT || "info@novarampa.com";
    const sender =
      process.env.CONTACT_SENDER ||
      "Nova Rampa <onboarding@resend.dev>";

    if (resendKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: sender,
        to: recipient,
        replyTo: data.email || undefined,
        subject: `🆕 Yeni Teklif Talebi — ${data.fullName}${data.companyName ? ` (${data.companyName})` : ""}`,
        text: [
          `Ad Soyad: ${data.fullName}`,
          `Firma: ${data.companyName || "-"}`,
          `Telefon: ${data.phone}`,
          `E-posta: ${data.email || "-"}`,
          `Şehir: ${data.city || "-"}`,
          `Sektör: ${data.sector || "-"}`,
          `Rampa Tipi: ${data.productType || "-"}`,
          `Kapasite: ${data.capacity || "-"}`,
          `Ölçü: ${data.dimensions || "-"}`,
          `Adet: ${data.quantity}`,
          ``,
          `Mesaj:`,
          data.message || "-",
        ].join("\n"),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/quote] Hata:", err);
    return NextResponse.json(
      { ok: false, error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
