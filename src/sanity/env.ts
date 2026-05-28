// apiVersion'ı kurşun geçirmez yap:
// Vercel'de env boş/boşluklu/geçersiz set edilse bile (örn " " gibi truthy
// ama geçersiz değer) zorla geçerli bir değere düşer. Sanity sadece "1" veya
// YYYY-MM-DD formatını kabul eder; aksi halde "Invalid API version" hatası verir.
const rawApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim();
const isValidApiVersion =
  !!rawApiVersion &&
  (/^\d{4}-\d{2}-\d{2}$/.test(rawApiVersion) || rawApiVersion === "1");
export const apiVersion = isValidApiVersion ? rawApiVersion : "2025-01-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const studioUrl = "/studio";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    // Build sırasında env yoksa placeholder döndür, runtime'da kullanıcı uyarısı
    if (process.env.NODE_ENV === "production") {
      console.warn(errorMessage);
    }
    return "" as unknown as T;
  }
  return v;
}
