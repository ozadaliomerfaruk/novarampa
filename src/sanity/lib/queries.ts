import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "settings"][0]{
  heroTitle,
  heroSubtitle,
  heroCtaLabel,
  "heroVideoUrl": heroVideo.asset->url,
  logo,
  "logoUrl": logo.asset->url,
  companyName,
  tagline,
  "featuredProducts": (featuredProducts[]->)[coalesce(visible, true) && _id != "product-makasli-platform" && defined(slug.current)] {
    _id,
    name,
    "slug": slug,
    shortName,
    tagline,
    shortDescription,
    capacities,
    mainImage
  },
  workshopPhotos[]{ asset->, alt, caption },
  brandTimeline[]{ year, title, description },
  contact{ phone, phoneDisplay, email, whatsapp },
  locations[]{ label, type, addressLine1, city, district, googleMapsUrl },
  workingHours[]{ day, hours },
  socials{ instagram, linkedin, youtube, facebook, twitter, tiktok },
  homeFaqs[]{ question, answer },
  announcement
}`;

export const allProductsQuery = groq`*[_type == "product" && coalesce(visible, true) && _id != "product-makasli-platform" && slug.current != "makasli-platform"] | order(orderRank asc) {
  _id,
  name,
  slug,
  shortName,
  tagline,
  shortDescription,
  capacities,
  dimensions,
  mainImage
}`;

export const productBySlugQuery = groq`*[_type == "product" && coalesce(visible, true) && _id != "product-makasli-platform" && slug.current != "makasli-platform" && (slug.current == $slug || _id == "product-" + $slug)][0]{
  _id,
  name,
  slug,
  shortName,
  tagline,
  shortDescription,
  description,
  capacities,
  dimensions,
  features,
  bestFor,
  mainImage,
  gallery,
  technicalSpecs,
  faqs
}`;

export const productSlugsQuery = groq`*[_type == "product" && coalesce(visible, true) && _id != "product-makasli-platform" && slug.current != "makasli-platform" && defined(slug.current)]{ "slug": slug.current }`;

export const allBlogPostsQuery = groq`*[_type == "blogPost" && defined(publishedAt) && publishedAt < now()] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  author,
  readTime,
  tags
}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  body,
  mainImage,
  publishedAt,
  author,
  readTime,
  tags,
  howToSteps[]{ name, text },
  totalTime,
  seo
}`;

export const blogPostSlugsQuery = groq`*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, publishedAt }`;

export const allReferencesQuery = groq`*[_type == "referenceCompany"] | order(featured desc, name asc) {
  _id,
  name,
  logo,
  logoBackground,
  sector,
  featured,
  caseStudy
}`;

export const featuredReferencesQuery = groq`*[_type == "referenceCompany" && featured == true] | order(name asc) {
  _id,
  name,
  logo,
  logoBackground,
  sector
}`;

export const sparePartsQuery = groq`*[_type == "sparePart" && !(_id in ["sparePart-elik-halat", "sparePart-lastik-flap", "sparePart-kap-contas", "sparePart-arpma-tamponu", "sparePart-k-e-koruyucu"])] | order(orderRank asc, name asc) {
  _id,
  name,
  slug,
  description,
  image,
  available,
  "compatibleWith": (compatibleWith[]->)[coalesce(visible, true) && _id != "product-makasli-platform" && defined(slug.current)]{ _id, name, slug }
}`;

// ─── Özel Sayfalar (Eren CMS) ───
// Sadece yayında (published) olanlar site'de görünür.
export const allPublishedPagesQuery = groq`*[_type == "page" && status == "published"] | order(navbarOrder asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  heroImage,
  showInNavbar,
  navbarLabel,
  navbarOrder
}`;

// Navbar'a yerleşecek sayfalar — kompakt liste
export const navbarPagesQuery = groq`*[_type == "page" && status == "published" && showInNavbar == true] | order(navbarOrder asc) {
  _id,
  "slug": slug.current,
  title,
  navbarLabel
}`;

// Tek sayfa — slug ile
export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug && status == "published"][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  heroImage,
  body,
  seo,
  _updatedAt
}`;
