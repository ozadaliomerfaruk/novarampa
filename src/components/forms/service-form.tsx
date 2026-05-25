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
  serviceRequestSchema,
  type ServiceRequestInput,
} from "@/lib/form-schemas";
import { productCategories } from "@/lib/products";
import { serviceCities } from "@/lib/services";

export function ServiceForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceRequestInput>({
    resolver: zodResolver(serviceRequestSchema),
  });

  async function onSubmit(data: ServiceRequestInput) {
    try {
      const res = await fetch("/api/service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Form gönderilemedi");
      setSubmitted(true);
      reset();
      toast.success("Servis talebiniz alındı, ekibimiz iletişime geçecek.");
    } catch {
      toast.error("Bir aksaklık oldu. WhatsApp'tan da ulaşabilirsiniz.");
    }
  }

  if (submitted) {
    return (
      <div className="p-10 rounded-2xl border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/5 text-center">
        <div className="text-5xl mb-4">🛠️</div>
        <h3 className="text-2xl font-heading font-semibold">
          Servis talebiniz alındı.
        </h3>
        <p className="mt-2 text-muted-foreground">
          Ekibimiz tercih ettiğiniz tarih ve konuma göre dönüş yapacak.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
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
          <Input {...register("email")} type="email" placeholder="ornek@firma.com" />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Şehir / Konum" error={errors.city?.message}>
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
              <SelectItem value="diger">Diğer</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Rampa Tipi" error={errors.productType?.message}>
          <Select
            onValueChange={(v) => setValue("productType", v ?? "")}
            value={watch("productType") ?? ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Ürününüz" />
            </SelectTrigger>
            <SelectContent>
              {productCategories.map((p) => (
                <SelectItem key={p.slug} value={p.name}>
                  {p.shortName}
                </SelectItem>
              ))}
              <SelectItem value="bilmiyorum">Bilmiyorum</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field
        label="Arıza Tanımı *"
        error={errors.issueDescription?.message}
      >
        <Textarea
          {...register("issueDescription")}
          rows={6}
          placeholder="Yaşadığınız sorunu mümkün olduğunca detaylı anlatın. Örn: 'Hidrolik silindir kaçırıyor, dil tam kapanmıyor...'"
        />
      </Field>

      <Field label="Tercih Edilen Tarih" error={errors.preferredDate?.message}>
        <Input {...register("preferredDate")} type="date" />
      </Field>

      <p className="text-xs text-muted-foreground">
        Not: Fotoğraf eklemek isterseniz lütfen WhatsApp&apos;tan
        gönderin. (Foto yükleme yakında eklenecek.)
      </p>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 px-8 bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-1 animate-spin" />
              Gönderiliyor…
            </>
          ) : (
            <>
              Servis Talebimi Gönder
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
