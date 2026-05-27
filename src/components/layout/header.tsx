import { getSiteData } from "@/lib/site-data";
import { HeaderClient } from "./header-client";

/**
 * Server wrapper — Sanity'den contact + segments + cities + navbar sayfaları + logo çeker,
 * HeaderClient'a aktarır.
 */
export async function Header() {
  const { contact, segments, cities, navbarPages, logoUrl, workingHours } =
    await getSiteData();
  return (
    <HeaderClient
      contact={contact}
      segments={segments}
      cities={cities}
      navbarPages={navbarPages}
      logoUrl={logoUrl}
      workingHours={workingHours}
    />
  );
}
