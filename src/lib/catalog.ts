import { cache } from "react";
import { productCategories } from "@/lib/products";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allProductsQuery, sparePartsQuery } from "@/sanity/lib/queries";
import type { ProductSummary, SparePart } from "@/sanity/lib/types";
export function isPublicProduct(
  p: Pick<ProductSummary, "_id" | "name" | "slug">,
) {
  return (
    !!p?.slug?.current &&
    p._id !== "product-makasli-platform" &&
    !/makas[lł][iı]/i.test(p.slug.current) &&
    !p.name.toLocaleLowerCase("tr-TR").includes("makaslı platform")
  );
}
export const getProducts = cache(async (): Promise<ProductSummary[]> => {
  const products = await sanityFetch<ProductSummary[]>(allProductsQuery);
  if (products !== null) return products.filter(isPublicProduct);
  return productCategories.map((p) => ({
    _id: "product-" + p.slug,
    name: p.name,
    shortName: p.shortName,
    slug: { _type: "slug", current: p.slug },
    tagline: p.tagline,
    shortDescription: p.description,
  }));
});
export const getSpareParts = cache(
  async (): Promise<SparePart[]> =>
    (await sanityFetch<SparePart[]>(sparePartsQuery)) ?? [],
);
