import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "settings"][0]{
  heroTitle,
  heroSubtitle,
  heroCtaLabel,
  featuredProducts[]->{ _id, slug, name, shortDescription, mainImage },
  highlights,
  contactInfo
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
  mainImage,
  gallery,
  features,
  bestFor
}`;

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  shortName,
  tagline,
  description,
  capacities,
  dimensions,
  features,
  bestFor,
  mainImage,
  gallery,
  technicalSpecs,
  faqs[]{ question, answer }
}`;

export const allBlogPostsQuery = groq`*[_type == "blogPost" && publishedAt < now()] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  author,
  readTime
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
  seo
}`;

export const allReferencesQuery = groq`*[_type == "referenceCompany"] | order(featured desc, name asc) {
  _id,
  name,
  logo,
  sector,
  featured,
  caseStudy
}`;

export const sparePartsQuery = groq`*[_type == "sparePart"] | order(orderRank asc) {
  _id,
  name,
  slug,
  description,
  compatibleWith,
  image
}`;
