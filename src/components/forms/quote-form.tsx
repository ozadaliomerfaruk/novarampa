"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { quoteRequestSchema, type QuoteRequestInput } from "@/lib/form-schemas";
import locations from "@/lib/turkey-locations.json";
import { FormField } from "./form-field";
export function QuoteForm({
  products,
  defaultProduct = "",
}: {
  products: { name: string }[];
  defaultProduct?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteRequestInput>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: { quantity: 1, productType: defaultProduct },
  });
  const field = (name: keyof QuoteRequestInput) => ({
    id: "quote-" + name,
    className: "field-control",
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? "quote-" + name + "-error" : undefined,
    ...register(name),
  });
  async function onSubmit(data: QuoteRequestInput) {
    setSubmitError("");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Gönderilemedi");
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Talebiniz gönderilemedi. Lütfen tekrar deneyin veya iletişim sayfasından bize ulaşın.",
      );
    }
  }
  if (submitted)
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto mb-4 text-brand-orange" size={40} />
        <h2 className="font-heading text-2xl font-semibold">
          Teklif talebiniz alındı.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Ekibimiz en kısa zamanda sizinle iletişime geçecek.
        </p>
      </div>
    );
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      <input
        type="text"
        {...register("website")}
        hidden
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="quote-fullName"
          label="Ad Soyad *"
          error={errors.fullName?.message}
        >
          <input
            {...field("fullName")}
            required
            autoComplete="name"
            placeholder="Adınız Soyadınız"
          />
        </FormField>
        <FormField
          id="quote-companyName"
          label="Firma"
          error={errors.companyName?.message}
        >
          <input
            {...field("companyName")}
            autoComplete="organization"
            placeholder="Firma adınız"
          />
        </FormField>
        <FormField
          id="quote-phone"
          label="Telefon *"
          error={errors.phone?.message}
        >
          <input
            {...field("phone")}
            required
            type="tel"
            autoComplete="tel"
            placeholder="0 5XX XXX XX XX"
          />
        </FormField>
        <FormField
          id="quote-email"
          label="E-posta"
          error={errors.email?.message}
        >
          <input
            {...field("email")}
            type="email"
            autoComplete="email"
            placeholder="ornek@firma.com"
          />
        </FormField>
        <FormField id="quote-city" label="İl" error={errors.city?.message}>
          <select {...field("city")}>
            <option value="">İl seçin</option>
            {locations.map((p) => (
              <option key={p.name}>{p.name}</option>
            ))}
          </select>
        </FormField>
        <FormField
          id="quote-productType"
          label="Rampa Tipi"
          error={errors.productType?.message}
        >
          <select {...field("productType")}>
            <option value="">Rampa tipi seçin</option>
            {products.map((p) => (
              <option key={p.name}>{p.name}</option>
            ))}
            <option>Bilmiyorum</option>
          </select>
        </FormField>
        <FormField
          id="quote-capacity"
          label="Kapasite"
          error={errors.capacity?.message}
        >
          <input {...field("capacity")} placeholder="Örn: 6 ton" />
        </FormField>
        <FormField
          id="quote-quantity"
          label="Adet"
          error={errors.quantity?.message}
        >
          <input
            id="quote-quantity"
            className="field-control"
            {...register("quantity", { valueAsNumber: true })}
            type="number"
            min={1}
            max={999}
            aria-invalid={!!errors.quantity}
            aria-describedby={
              errors.quantity ? "quote-quantity-error" : undefined
            }
          />
        </FormField>
      </div>
      <FormField
        id="quote-message"
        label="Mesaj / İhtiyacınızı kısaca anlatın"
        error={errors.message?.message}
      >
        <textarea
          {...field("message")}
          rows={5}
          placeholder="Projenizden ve ihtiyacınızdan bahsedin."
        />
      </FormField>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Bilgileriniz talebinize dönüş yapmak için kullanılır.{" "}
        <Link href="/kvkk" className="underline underline-offset-4">
          KVKK Aydınlatma Metni
        </Link>
      </p>
      {submitError && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/30 p-4 text-sm text-destructive"
        >
          {submitError}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-brand-orange px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-orange-hover)] disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Gönderiliyor…
          </>
        ) : (
          <>
            Teklif Talebimi Gönder
            <ArrowRight size={20} />
          </>
        )}
      </button>
    </form>
  );
}
