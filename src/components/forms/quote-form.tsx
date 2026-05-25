"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  quoteRequestSchema,
  type QuoteRequestInput,
} from "@/lib/form-schemas";
import { productCategories } from "@/lib/products";
import { customerSegments, serviceCities } from "@/lib/services";

export function QuoteForm({ defaultProduct }: { defaultProduct?: string }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteRequestInput>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      quantity: 1,
      productType: defaultProduct ?? "",
    },
  });

  async function onSubmit(data: QuoteRequestInput) {
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      if (!res.ok) throw new Error("Form gönderilemedi");
      setSubmitted(true);
      reset();
      toast.success("Talebiniz alındı, en kısa sürede size döneceğiz.");
    } catch {
      toast.error(
        "Bir aksaklık oldu. Lütfen tekrar deneyin ya da WhatsApp'tan yazın."
      );
    }
  }

  if (submitted) {
    return (
      <div className="p-10 rounded-2xl border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/5 text-center">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-heading font-semibold">
          Talebiniz alındı.
        </h3>
        <p className="mt-2 text-muted-foreground">
          Ekibimiz en kısa sürede size dönecektir. Aynı zamanda{" "}
          <a
            href="https://wa.me/905348676693"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--brand-orange)] underline"
          >
            WhatsApp
          </a>
          &apos;tan da iletişime geçebilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Honeypot — gizli alan, gerçek kullanıcı doldurmaz */}
      <input
        type="text"
        {...register("website")}
        className="hidden"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Ad Soyad *" error={errors.fullName?.message}>
          <Input {...register("fullName")} placeholder="Adınız Soyadınız" />
        </Field>
        <Field label="Firma" error={errors.companyName?.message}>
          <Input {...register("companyName")} placeholder="Firma adınız" />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Telefon *" error={errors.phone?.message}>
          <Input
            {...register("phone")}
            type="tel"
            placeholder="0 5XX XXX XX XX"
          />
        </Field>
        <Field label="E-posta" error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="ornek@firma.com"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Şehir" error={errors.city?.message}>
          <Select
            onValueChange={(v) => setValue("city", v ?? "")}
            value={watch("city") ?? ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Şehir seçin" />
            </SelectTrigger>
            <SelectContent>
              {serviceCities.map((c) => (
                <SelectItem key={c.slug} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
              <SelectItem value="diger">Diğer / Türkiye geneli</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Sektör" error={errors.sector?.message}>
          <Select
            onValueChange={(v) => setValue("sector", v ?? "")}
            value={watch("sector") ?? ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sektörünüz" />
            </SelectTrigger>
            <SelectContent>
              {customerSegments.map((s) => (
                <SelectItem key={s.slug} value={s.name}>
                  {s.name}
                </SelectItem>
              ))}
              <SelectItem value="diger">Diğer</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <Field label="Rampa Tipi" error={errors.productType?.message}>
            <Select
              onValueChange={(v) => setValue("productType", v ?? "")}
              value={watch("productType") ?? ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Hangi rampa tipi?" />
              </SelectTrigger>
              <SelectContent>
                {productCategories.map((p) => (
                  <SelectItem key={p.slug} value={p.name}>
                    {p.shortName}
                  </SelectItem>
                ))}
                <SelectItem value="ozel">Özel / Bilmiyorum</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field label="Kapasite" error={errors.capacity?.message}>
          <Input
            {...register("capacity")}
            placeholder="örn: 6 ton"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <Field label="Ölçü Notu" error={errors.dimensions?.message}>
            <Input
              {...register("dimensions")}
              placeholder="örn: 2000×2500 mm veya özel ölçü"
            />
          </Field>
        </div>
        <Field label="Adet" error={errors.quantity?.message}>
          <Input
            {...register("quantity", { valueAsNumber: true })}
            type="number"
            min={1}
            max={999}
            defaultValue={1}
          />
        </Field>
      </div>

      <Field
        label="Mesaj / İhtiyacınızı kısaca anlatın"
        error={errors.message?.message}
      >
        <Textarea
          {...register("message")}
          rows={5}
          placeholder="Projeniz hakkında daha fazla bilgi..."
        />
      </Field>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <p className="text-xs text-muted-foreground">
          Form gönderildiğinde bilgileriniz yalnızca teklif amacıyla kullanılır.
        </p>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 px-8 bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-[var(--brand-black)] font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-1 animate-spin" />
              Gönderiliyor…
            </>
          ) : (
            <>
              Teklif Talebimi Gönder
              <ArrowRight className="ml-1" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
