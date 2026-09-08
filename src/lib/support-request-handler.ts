import { NextResponse } from "next/server";
import { serviceRequestSchema } from "@/lib/form-schemas";
import { deliverRequest } from "@/lib/request-delivery";
import { getProducts, getSpareParts } from "@/lib/catalog";
export async function handleSupportRequest(
  req: Request,
  kind: "service" | "sparePart",
) {
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
  const parsed = serviceRequestSchema.safeParse({ ...body, requestKind: kind });
  if (!parsed.success)
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 },
    );
  const data = Object.fromEntries(
    Object.entries(parsed.data).filter(
      ([key]) => key !== "website" && key !== "requestKind",
    ),
  ) as Omit<typeof parsed.data, "website" | "requestKind">;
  // Form seçenekleri ile sunucu kayıtları aynı güncel katalogdan gelir.
  const products = await getProducts();
  if (
    data.productType &&
    !["Bilmiyorum", "Diğer", ...products.map((p) => p.name)].includes(
      data.productType,
    )
  )
    return NextResponse.json(
      { ok: false, error: "Geçerli bir rampa tipi seçin." },
      { status: 400 },
    );
  if (kind === "sparePart") {
    const parts = await getSpareParts();
    if (
      !["Diğer / Bilmiyorum", ...parts.map((p) => p.name)].includes(
        data.sparePart || "",
      )
    )
      return NextResponse.json(
        { ok: false, error: "Geçerli bir yedek parça seçin." },
        { status: 400 },
      );
  }
  try {
    const title = kind === "sparePart" ? "Yedek Parça Talebi" : "Servis Talebi";
    await deliverRequest(
      kind === "sparePart" ? "sparePartRequest" : "serviceRequest",
      data,
      title,
      [
        "Ad Soyad: " + data.fullName,
        "Firma: " + (data.companyName || "-"),
        "Telefon: " + data.phone,
        "E-posta: " + (data.email || "-"),
        "İl / İlçe: " + data.city + " / " + data.district,
        "Rampa Tipi: " + (data.productType || "-"),
        "Marka: " +
          {
            novarampa: "Novarampa",
            other: data.brandName,
            unknown: "Bilmiyorum",
          }[data.brand],
        ...(data.serialNumber ? ["Ürün Seri No: " + data.serialNumber] : []),
        ...(data.sparePart ? ["Yedek Parça: " + data.sparePart] : []),
        ...(data.preferredDate
          ? ["Tercih Edilen Tarih: " + data.preferredDate]
          : []),
        "",
        "Talep Açıklaması:",
        data.issueDescription,
      ],
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Talep kaydedilemedi. Lütfen tekrar deneyin." },
      { status: 503 },
    );
  }
}
