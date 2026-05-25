import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "settings"][0]{
  heroTitle,
  heroSubtitle,
  heroCtaLabel,
  "featuredProducts": featuredProducts[]->{
    _id,
    name,
    "slug": slug,
    shortName,
    tagline,
    shortDescription,
    capacities,
    mainImage
  },
  highlights,
  announcement
}`;

export const allProductsQuery = groq`*[_type == "product"] | order(orderRank asc) {
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

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{
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

export const productSlugsQuery = groq`*[_type == "product" && defined(slug.current)]{ "slug": slug.current }`;

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
  seo
}`;

export const blogPostSlugsQuery = groq`*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }`;

export const allReferencesQuery = groq`*[_type == "referenceCompany"] | order(featured desc, name asc) {
  _id,
  name,
  logo,
  sector,
  featured,
  caseStudy
}`;

export const featuredReferencesQuery = groq`*[_type == "referenceCompany" && featured == true] | order(name asc) {
  _id,
  name,
  logo,
  sector
}`;

export const sparePartsQuery = groq`*[_type == "sparePart"] | order(orderRank asc, name asc) {
  _id,
  name,
  slug,
  description,
  image,
  available,
  "compatibleWith": compatibleWith[]->{ _id, name, slug }
}`;
