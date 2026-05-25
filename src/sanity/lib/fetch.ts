import { client } from "./client";

/**
 * Type-safe Sanity fetch wrapper.
 *
 * - Dev: anlık veri (useCdn=false + revalidate=0 etkisi gibi)
 * - Prod: ISR ile cache'lenir, varsayılan 30 sn revalidate
 * - Hata durumunda null döner, sayfa default fallback ile render olur
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: { revalidate?: number; tags?: string[] } = {}
): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: options.revalidate ?? 30,
        tags: options.tags,
      },
    });
  } catch (err) {
    console.error("[sanityFetch] Sorgu başarısız:", err);
    return null;
  }
}
