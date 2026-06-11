import { getSiteData } from "@/lib/site-data";
import { HeaderClient } from "./header-client";

/**
 * Server wrapper — Sanity'den contact + navbar sayfaları + logo çeker,
 * HeaderClient'a aktarır.
 */
export async function Header() {
  const { contact, navbarPages, logoUrl, workingHours } = await getSiteData();
  return (
    <HeaderClient
      contact={contact}
      navbarPages={navbarPages}
      logoUrl={logoUrl}
      workingHours={workingHours}
    />
  );
}
