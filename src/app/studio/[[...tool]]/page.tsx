/**
 * Sanity Studio - sadece /studio yolunda çalışan, Eren'in admin paneli.
 *
 * Tek sayfa — Studio kendi içinde route'lama yapar.
 * Force dynamic — bu sayfa statik üretilmemeli.
 */

"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
