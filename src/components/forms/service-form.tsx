"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import {
  serviceRequestSchema,
  type ServiceRequestInput,
} from "@/lib/form-schemas";
import locations from "@/lib/turkey-locations.json";
import { FormField } from "./form-field";

type Option = { name: string };
export function ServiceForm({
  kind = "service",
  products,
  parts = [],
  defaultPart = "",
}: {
  kind?: "service" | "sparePart";
  products: Option[];
  parts?: Option[];
  defaultPart?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ServiceRequestInput>({
    resolver: zodResolver(serviceRequestSchema),
    shouldUnregister: true,
    defaultValues: {
      requestKind: kind,
      city: "",
      district: "",
      sparePart: defaultPart,
    },
  });
  const city = useWatch({ control, name: "city" });
  const brand = useWatch({ control, name: "brand" });
  const districts = locations.find((p) => p.name === city)?.districts ?? [];
  const isPart = kind === "sparePart";
  const field = (name: keyof ServiceRequestInput) => ({
    id: "support-" + name,
    className: "field-control",
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? "support-" + name + "-error" : undefined,
    ...register(name),
  });
  async function onSubmit(data: ServiceRequestInput) {
    setSubmitError("");
    try {
      const response = await fetch(
        isPart ? "/api/spare-part" : "/api/service",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
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
        <h2 className="text-2xl font-heading font-semibold">
          {isPart
            ? "Yedek parça talebiniz alındı."
            : "Servis talebiniz alındı."}
        </h2>
        <p className="mt-3 text-muted-foreground">
          Ekibimiz en kısa zamanda sizinle iletişime geçecek.
        </p>
      </div>
    );
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      <input type="hidden" {...register("requestKind")} value={kind} />
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
          id="support-fullName"
          label="Ad Soyad *"
          error={errors.fullName?.message}
        >
          <input
            {...field("fullName")}
            autoComplete="name"
            required
            placeholder="Adınız Soyadınız"
          />
        </FormField>
        <FormField
          id="support-companyName"
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
          id="support-phone"
          label="Telefon *"
          error={errors.phone?.message}
        >
          <input
            {...field("phone")}
            type="tel"
            autoComplete="tel"
            required
            placeholder="0 5XX XXX XX XX"
          />
        </FormField>
        <FormField
          id="support-email"
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
        <FormField id="support-city" label="İl *" error={errors.city?.message}>
          <select
            {...field("city")}
            required
            onChange={(e) => {
              void register("city").onChange(e);
              setValue("district", "", { shouldValidate: false });
            }}
          >
            <option value="">İl seçin</option>
            {locations.map((p) => (
              <option key={p.name}>{p.name}</option>
            ))}
          </select>
        </FormField>
        <FormField
          id="support-district"
          label="İlçe *"
          error={errors.district?.message}
        >
          <select {...field("district")} required disabled={!city}>
            <option value="">{city ? "İlçe seçin" : "Önce il seçin"}</option>
            {districts.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </FormField>
      </div>
      <fieldset
        aria-describedby={errors.brand ? "support-brand-error" : undefined}
      >
        <legend className="mb-3 text-sm font-medium">
          Ürün markası Novarampa mı? *
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { value: "novarampa", label: "Evet, Novarampa ürünü" },
            { value: "other", label: "Hayır, farklı marka" },
            { value: "unknown", label: "Bilmiyorum." },
          ].map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 text-sm transition-colors has-checked:border-brand-orange has-checked:bg-brand-orange/5 has-focus-visible:outline-2 has-focus-visible:outline-brand-orange"
            >
              <input
                type="radio"
                {...register("brand")}
                value={option.value}
                className="size-4 accent-[var(--brand-orange)]"
                required
              />
              {option.label}
            </label>
          ))}
        </div>
        {errors.brand && (
          <p
            id="support-brand-error"
            className="mt-2 text-sm text-destructive"
            role="alert"
          >
            {errors.brand.message}
          </p>
        )}
      </fieldset>
      {brand === "novarampa" && (
        <FormField
          id="support-serialNumber"
          label="Ürün Seri No"
          error={errors.serialNumber?.message}
        >
          <input
            {...field("serialNumber")}
            placeholder="Ürün üzerindeki etikette bulunur (isteğe bağlı)"
          />
        </FormField>
      )}
      {brand === "other" && (
        <FormField
          id="support-brandName"
          label="Hangi marka olduğunu belirtiniz *"
          error={errors.brandName?.message}
        >
          <input {...field("brandName")} required placeholder="Marka adı" />
        </FormField>
      )}
      <div className={isPart ? "grid gap-5 sm:grid-cols-2" : ""}>
        <FormField
          id="support-productType"
          label="Rampa Tipi"
          error={errors.productType?.message}
        >
          <select {...field("productType")}>
            <option value="">Rampa tipi seçin</option>
            {products.map((p) => (
              <option key={p.name}>{p.name}</option>
            ))}
            <option>Bilmiyorum</option>
            <option>Diğer</option>
          </select>
        </FormField>
        {isPart && (
          <FormField
            id="support-sparePart"
            label="Talep Edilen Yedek Parça *"
            error={errors.sparePart?.message}
          >
            <select {...field("sparePart")} required>
              <option value="">Yedek parça seçin</option>
              {parts.map((p) => (
                <option key={p.name}>{p.name}</option>
              ))}
              <option value="Diğer / Bilmiyorum">Diğer / Bilmiyorum</option>
            </select>
          </FormField>
        )}
      </div>
      <FormField
        id="support-issueDescription"
        label={isPart ? "Talep Açıklaması *" : "Arıza Tanımı *"}
        error={errors.issueDescription?.message}
      >
        <textarea
          {...field("issueDescription")}
          rows={5}
          required
          placeholder={
            isPart
              ? "İhtiyacınız olan parçayı, adedini ve varsa ilgili detayları yazın."
              : "Yaşadığınız sorunu açıklayın."
          }
        />
      </FormField>
      {!isPart && (
        <FormField
          id="support-preferredDate"
          label="Tercih Edilen Tarih"
          error={errors.preferredDate?.message}
        >
          <input {...field("preferredDate")} type="date" />
        </FormField>
      )}
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
            <Loader2 className="animate-spin" size={20} />
            Gönderiliyor…
          </>
        ) : (
          <>
            {isPart ? "Yedek Parça Talebimi Gönder" : "Servis Talebimi Gönder"}
            <ArrowRight size={20} />
          </>
        )}
      </button>
    </form>
  );
}
