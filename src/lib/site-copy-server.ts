import "server-only";
import { cache } from "react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { resolveSiteCopy } from "./site-copy";
export const getSiteCopy = cache(async () =>
  resolveSiteCopy(
    await sanityFetch(
      '*[_type == "siteCopy" && _id == "siteCopy"][0]',
      {},
      { revalidate: 30, tags: ["site-copy"] },
    ),
  ),
);
