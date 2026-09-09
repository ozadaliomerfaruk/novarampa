import { getSiteCopy } from "@/lib/site-copy-server";
import { getSiteData } from "@/lib/site-data";
import { CtaSectionView } from "./cta-section-view";
export async function CtaSection() {
  const [copy, { contact }] = await Promise.all([getSiteCopy(), getSiteData()]);
  return <CtaSectionView copy={copy.sharedCta} contact={contact} />;
}
