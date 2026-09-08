import { createClient } from "next-sanity";
import { Resend } from "resend";

/** A request is successful only when it is durably saved or delivered. */
export async function deliverRequest(
  type: "quoteRequest" | "serviceRequest" | "sparePartRequest",
  data: Record<string, unknown>,
  title: string,
  lines: string[],
) {
  let saved = false;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (projectId && projectId !== "placeholder" && token) {
    try {
      const client = createClient({
        projectId,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
        apiVersion: "2025-01-01",
        token,
        useCdn: false,
      });
      await client.create({
        _type: type,
        submittedAt: new Date().toISOString(),
        status: "new",
        ...data,
      });
      saved = true;
    } catch {
      console.error("Talep kaydı oluşturulamadı:", type);
    }
  }
  if (process.env.RESEND_API_KEY) {
    try {
      const { error } = await new Resend(
        process.env.RESEND_API_KEY,
      ).emails.send({
        from:
          process.env.CONTACT_SENDER || "Nova Rampa <onboarding@resend.dev>",
        to: process.env.CONTACT_RECIPIENT || "info@novarampa.com",
        replyTo:
          typeof data.email === "string" && data.email ? data.email : undefined,
        subject: title + " — " + data.fullName,
        text: lines.join("\n"),
      });
      if (error) throw new Error("E-posta teslim edilemedi");
      saved = true;
    } catch {
      console.error("Talep e-posta bildirimi gönderilemedi:", type);
    }
  }
  if (!saved) throw new Error("Talep kaydedilemedi");
}
