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
export type SiteSettings = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaLabel?: string;
  highlights?: { value: string; label: string }[];
  featuredProducts?: ProductSummary[];
  announcement?: {
    enabled?: boolean;
    text?: string;
    link?: string;
  };
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
  seo?: { title?: string; description?: string };
};

// ─── Reference Company ──────────────────────────────────────────────
export type ReferenceCompany = {
  _id: string;
  name: string;
  sector?: string;
  logo?: SanityImage;
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
