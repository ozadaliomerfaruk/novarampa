import { NextResponse } from "next/server";
import { quoteRequestSchema } from "@/lib/form-schemas";
import { deliverRequest } from "@/lib/request-delivery";
export const runtime = "nodejs";
export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Geçersiz form." },
      { status: 400 },
    );
  }
  if (!body || typeof body !== "object" || Array.isArray(body))
    return NextResponse.json({ ok: false }, { status: 400 });
  if (typeof body.website === "string" && body.website)
    return NextResponse.json({ ok: true });
  const parsed = quoteRequestSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 },
    );
  const data = quoteRequestSchema.omit({ website: true }).parse(parsed.data);
  try {
    await deliverRequest("quoteRequest", data, "Yeni Teklif Talebi", [
      "Ad Soyad: " + data.fullName,
      "Firma: " + (data.companyName || "-"),
      "Telefon: " + data.phone,
      "E-posta: " + (data.email || "-"),
      "İl: " + (data.city || "-"),
      "Rampa Tipi: " + (data.productType || "-"),
      "Kapasite: " + (data.capacity || "-"),
      "Adet: " + data.quantity,
      "",
      "Mesaj:",
      data.message || "-",
    ]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Talep kaydedilemedi. Lütfen tekrar deneyin." },
      { status: 503 },
    );
  }
}
