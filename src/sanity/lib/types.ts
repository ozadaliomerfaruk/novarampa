/**
 * Minimal TypeScript tipleri — Sanity belgelerinden döneceği şekilde.
 * Daha sonra `sanity typegen` ile otomatik üretilebilir; şimdilik elle.
 */
export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  fit?: "cover" | "contain";
  hotspot?: { x: number; y: number };
  crop?: { top: number; right: number; bottom: number; left: number };
};

export type SanitySlug = {
  _type: "slug";
  current: string;
};

export type PortableTextBlock = {
  _type: string;
  [key: string]: unknown;
};

// ─── Settings ───────────────────────────────────────────────────────
export type WorkshopPhoto = {
  asset?: { url?: string; _ref?: string };
  alt?: string;
  caption?: string;
};

export type TimelineMilestone = {
  year: number;
  title: string;
  description?: string;
};

export type ContactInfo = {
  phone?: string;
  phoneDisplay?: string;
  email?: string;
  whatsapp?: string;
};

export type SocialLinks = {
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
};

export type SiteSettings = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaLabel?: string;
  heroVideoUrl?: string;
  logo?: SanityImage;
  logoUrl?: string;
  companyName?: string;
  tagline?: string;
  workshopPhotos?: WorkshopPhoto[];
  brandTimeline?: TimelineMilestone[];
  featuredProducts?: ProductSummary[];
  contact?: ContactInfo;
  locations?: CompanyLocation[];
  workingHours?: WorkingHoursRow[];
  socials?: SocialLinks;
  homeFaqs?: HomeFaqItem[];
  announcement?: {
    enabled?: boolean;
    text?: string;
    link?: string;
  };
};

export type HomeFaqItem = {
  question: string;
  answer: string;
};

export type HowToStep = {
  name: string;
  text: string;
};

// ─── Product ────────────────────────────────────────────────────────
export type ProductSummary = {
  _id: string;
  name: string;
  slug: SanitySlug;
  shortName?: string;
  tagline?: string;
  shortDescription?: string;
  capacities?: string[];
  dimensions?: string;
  mainImage?: SanityImage;
};

export type Product = ProductSummary & {
  description?: PortableTextBlock[];
  features?: string[];
  bestFor?: string[];
  gallery?: SanityImage[];
  technicalSpecs?: { label: string; value: string }[];
  faqs?: { question: string; answer: string }[];
};

// ─── Blog ───────────────────────────────────────────────────────────
export type BlogPostSummary = {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  author?: string;
  readTime?: number;
  tags?: string[];
};

export type BlogPost = BlogPostSummary & {
  body?: PortableTextBlock[];
  howToSteps?: HowToStep[];
  totalTime?: string;
  seo?: { title?: string; description?: string };
};

// ─── Reference Company ──────────────────────────────────────────────
export type ReferenceCompany = {
  _id: string;
  name: string;
  sector?: string;
  logo?: SanityImage;
  logoBackground?: "light" | "dark";
  logoDimensions?: { width: number; height: number };
  logoScale?: number;
  featured?: boolean;
  caseStudy?: {
    title?: string;
    summary?: string;
    productInstalled?: string;
    year?: number;
    images?: SanityImage[];
  };
};

// ─── Spare Part ─────────────────────────────────────────────────────
export type SparePart = {
  _id: string;
  name: string;
  slug?: SanitySlug;
  description?: string;
  image?: SanityImage;
  available?: boolean;
  compatibleWith?: { _id: string; name: string; slug: SanitySlug }[];
};

export type CustomPage = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  heroImage?: SanityImage;
  body?: unknown[]; // Portable Text
  seo?: { title?: string; description?: string };
  _updatedAt?: string;
};

export type NavbarPage = {
  _id: string;
  slug: string;
  title: string;
  navbarLabel?: string;
};

export type CompanyLocation = {
  label: string;
  type?: "workshop" | "office" | "showroom" | "warehouse";
  addressLine1: string;
  city: string;
  district: string;
  googleMapsUrl?: string;
};

export type WorkingHoursRow = {
  day: string;
  hours: string;
};
