/**
 * Sanity Site Settings + site-config defaults'u birleştirir.
 *
 * Server components için: `await getSiteData()` çağır, döndürdüğü değeri
 * Header/Footer'a prop olarak geçir. Sanity'de boş olan alanlar için
 * site-config.ts'deki sabit değerler fallback olarak kullanılır.
 */
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery, navbarPagesQuery } from "@/sanity/lib/queries";
import type {
  CompanyLocation,
  ContactInfo,
  SiteSettings,
  SocialLinks,
  WorkingHoursRow,
  NavbarPage,
} from "@/sanity/lib/types";
import { company } from "./site-config";

export type MergedContact = {
  phone: string;
  phoneDisplay: string;
  email: string;
  whatsapp: string;
  whatsappLink: string;
};

export type SiteData = {
  contact: MergedContact;
  socials: SocialLinks;
  settings: SiteSettings | null;
  navbarPages: NavbarPage[];
  locations: CompanyLocation[];
  workingHours: WorkingHoursRow[];
  logoUrl?: string;
  companyName: string;
  tagline: string;
};

/**
 * Sanity'den çekilen Contact + Socials'u site-config defaults'la birleştirir.
 * Eğer Sanity boşsa veya bir alan boşsa, default kullanılır.
 */
function mergeContact(input?: ContactInfo | null): MergedContact {
  const phone = input?.phone?.trim() || company.contact.phone;
  const phoneDisplay =
    input?.phoneDisplay?.trim() || company.contact.phoneDisplay;
  const email = input?.email?.trim() || company.contact.email;
  const whatsappRaw = input?.whatsapp?.trim() || company.contact.whatsapp;
  // whatsappLink — wa.me/<phone without '+'>
  const waNumber = whatsappRaw.replace(/^\+/, "").replace(/\s/g, "");
  return {
    phone,
    phoneDisplay,
    email,
    whatsapp: whatsappRaw,
    whatsappLink: `https://wa.me/${waNumber}`,
  };
}

function mergeSocials(input?: SocialLinks | null): SocialLinks {
  const safeUrl = (v?: string) =>
    typeof v === "string" && v.trim().length > 0 ? v.trim() : undefined;
  return {
    instagram: safeUrl(input?.instagram) ?? safeUrl(company.socials.instagram),
    linkedin: safeUrl(input?.linkedin) ?? safeUrl(company.socials.linkedin),
    youtube: safeUrl(input?.youtube) ?? safeUrl(company.socials.youtube),
    facebook: safeUrl(input?.facebook) ?? safeUrl(company.socials.facebook),
    twitter: safeUrl(input?.twitter),
    tiktok: safeUrl(input?.tiktok),
  };
}

function mergeLocations(input?: CompanyLocation[] | null): CompanyLocation[] {
  if (input && input.length > 0) return input;
  // Hardcoded fallback'i Sanity formatına çevir
  return company.locations.map((loc) => ({
    label: loc.label,
    type: loc.type,
    addressLine1: loc.addressLine1,
    city: loc.city,
    district: loc.district,
  }));
}

function mergeHours(input?: WorkingHoursRow[] | null): WorkingHoursRow[] {
  if (input && input.length > 0) return input;
  return company.workingHours.map((h) => ({ day: h.day, hours: h.hours }));
}

/**
 * Server component'lerden çağrılır. Tüm site genelinde paylaşılan veri.
 * Sanity'den paralel çekim yapar (2 query birlikte).
 */
export async function getSiteData(): Promise<SiteData> {
  const [settings, navbarPages] = await Promise.all([
    sanityFetch<SiteSettings>(settingsQuery, {}, { revalidate: 60 }),
    sanityFetch<NavbarPage[]>(navbarPagesQuery, {}, { revalidate: 60 }),
  ]);

  return {
    contact: mergeContact(settings?.contact),
    socials: mergeSocials(settings?.socials),
    settings: settings ?? null,
    navbarPages: navbarPages ?? [],
    locations: mergeLocations(settings?.locations),
    workingHours: mergeHours(settings?.workingHours),
    logoUrl: settings?.logoUrl?.trim() || undefined,
    companyName: settings?.companyName?.trim() || company.name,
    tagline: settings?.tagline?.trim() || company.shortPitch,
  };
}
