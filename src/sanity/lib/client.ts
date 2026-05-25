import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN dev'de kapalı (anlık değişim için), prod'da ISR ile yönetilir
  useCdn: false,
  perspective: "published",
  stega: false,
});
